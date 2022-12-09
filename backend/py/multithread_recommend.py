#평점 계산 분리한 코드, 전체 유저-음식 예측 행렬 csv에 저장

import pandas as pd
import numpy as np
import queue
import time
from threading import Thread
from sklearn.utils import shuffle
from sklearn.metrics.pairwise import cosine_similarity

start = time.time()

threads = []
readpath = "./csv/prefer.csv"
savepath = "multithread_Hybrid_predict.csv"

r_cols = ['userid', 'sex', 'foodid', 'survey', 'like', 'made', 'view']
a, b, c, d = 1, 1, 1, 2
ratings = pd.read_csv(readpath, names=r_cols, encoding='latin-1')
ratings=ratings.iloc[1:]
ratings = ratings[['userid', 'foodid', 'survey', 'like', 'made', 'view']].astype(float)
totalview = []
for id in range(1, len(ratings) + 1) :
  sum = ratings[(ratings['userid'] == ratings['userid'][id])]['view'].sum()
  if (sum == 0) :
    sum = 1
  totalview.append(sum)
ratings = ratings.assign(totalview = totalview)
rateview = ratings['view'] / ratings['totalview']
for i in range(1, len(ratings) + 1) :
  if(ratings['totalview'][i] <= 5) :
    rateview[i] = 0.5 * rateview[i]
ratings['rate'] = a * ratings['survey'] + b * ratings['like'] + c * ratings['made'] + d * rateview
ratings = ratings[['userid', 'foodid', 'rate']].astype(float)
for i in range(1, len(ratings) + 1) :
  if(ratings['rate'][i] < 0) :
    ratings['rate'][i] = 0

ratings = ratings.dropna()
TRAIN_SIZE = 0.75
ratings = shuffle(ratings, random_state=1)
cutoff = int(TRAIN_SIZE * len(ratings))
ratings_train = ratings.iloc[:cutoff]
ratings_test = ratings.iloc[cutoff:]

end = time.time()

# print("=====")
# print(f"rate calcul : {end-start:.5f} sec")

class MF_():
    def __init__(self, ratings, K, alpha, beta, iterations, verbose=True):
        self.R = np.array(ratings, dtype=np.float64)
        # user_id, item_id를 R의 index와 매핑하기 위한 dictionary 생성
        item_id_index = []
        index_item_id = []
        for i, one_id in enumerate(ratings):
            #one_id == column(foodid) (string)
            item_id_index.append([one_id, i])
            index_item_id.append([i, one_id])
        self.item_id_index = dict(item_id_index) #key가 foodid
        self.index_item_id = dict(index_item_id) #key가 index

        user_id_index = []
        index_user_id = []
        for i, one_id in enumerate(ratings.T):
            #one_id == row(uid)
            user_id_index.append([one_id, i])
            index_user_id.append([i, one_id])
        self.user_id_index = dict(user_id_index) #key가 userid
        self.index_user_id = dict(index_user_id) #key가 index

        self.num_users, self.num_items = np.shape(self.R)
        self.K = K
        self.alpha = alpha
        self.beta = beta
        self.iterations = iterations
        self.verbose = verbose

    # train set의 RMSE 계산
    def rmse(self):
        xs, ys = self.R.nonzero()
        self.predictions = []
        self.errors = []
        for x, y in zip(xs, ys):
            prediction = self.get_prediction(x, y)
            self.predictions.append(prediction)
            self.errors.append(self.R[x, y] - prediction)
        self.predictions = np.array(self.predictions)
        self.errors = np.array(self.errors)
        return np.sqrt(np.mean(self.errors**2))

    # Ratings for user i and item j
    def get_prediction(self, i, j):
        prediction = self.b + self.b_u[i] + self.b_d[j] + self.P[i, :].dot(self.Q[j, :].T)
        return prediction
    
    def sgd(self):
        for i, j, r in self.samples:
            prediction = self.get_prediction(i, j)
            e = (r - prediction)

            self.b_u[i] += self.alpha * (e - self.beta * self.b_u[i])
            self.b_d[j] += self.alpha * (e - self.beta * self.b_d[j])

            self.P[i, :] += self.alpha * (e * self.Q[j, :] - self.beta * self.P[i,:])
            self.Q[j, :] += self.alpha * (e * self.P[i, :] - self.beta * self.Q[j,:])

    # Test set을 선정
    def set_test(self, ratings_test):
        test_set = []
        for i in range(len(ratings_test)):      # test 데이터에 있는 각 데이터에 대해서
            x = self.user_id_index[ratings_test.iloc[i, 0]]
            y = self.item_id_index[ratings_test.iloc[i, 1]]
            z = ratings_test.iloc[i, 2]
            test_set.append([x, y, z])
            self.R[x, y] = 0                    # Setting test set ratings to 0
        self.test_set = test_set
        return test_set                         # Return test set

    # Test set의 RMSE 계산
    def test_rmse(self):
        error = 0
        for one_set in self.test_set:
            predicted = self.get_prediction(one_set[0], one_set[1])
            error += pow(one_set[2] - predicted, 2)
        return np.sqrt(error/len(self.test_set))
    
    # Training 하면서 test set의 정확도를 계산
    def test(self):
        # Initializing user-feature and item-feature matrix
        self.P = np.random.normal(scale=1./self.K, size=(self.num_users, self.K))
        self.Q = np.random.normal(scale=1./self.K, size=(self.num_items, self.K))

        # Initializing the bias terms
        self.b_u = np.zeros(self.num_users) #사용자 평가경향
        self.b_d = np.zeros(self.num_items) #아이템 평가경향
        self.b = np.mean(self.R[self.R.nonzero()]) #전체 평균

        # List of training samples
        rows, columns = self.R.nonzero()
        self.samples = [(i, j, self.R[i,j]) for i, j in zip(rows, columns)]

        # Stochastic gradient descent for given number of iterations
        training_process = []
        for i in range(self.iterations):
            np.random.shuffle(self.samples)
            self.sgd()
            rmse1 = self.rmse()
            rmse2 = self.test_rmse()
            training_process.append((i+1, rmse1, rmse2))
            if self.verbose:
                if (i+1) % 10 == 0:
                    print("Iteration: %d ; Train RMSE = %.4f ; Test RMSE = %.4f " % (i+1, rmse1, rmse2))
        return training_process

    # Full user-movie rating matrix
    def full_prediction(self):
        return self.b + self.b_u[:,np.newaxis] + self.b_d[np.newaxis,:] + self.P.dot(self.Q.T)

R_temp = ratings.pivot_table(index='userid', columns='foodid', values='rate').fillna(0)
# MF_matrix = []

def MF():
    alpha = 0.1
    beta = 0.05
    iterations = 250
    # K = 100
    global R_temp
    mf = MF_(R_temp, K=100, alpha=alpha, beta=beta, iterations=iterations, verbose=False)
    global test_set
    test_set = mf.set_test(ratings_test)
    result = mf.test()

    MF_predict = mf.full_prediction()
    col_foodid = mf.item_id_index.keys()
    global MF_matrix
    MF_matrix = pd.DataFrame(columns=col_foodid)
    for i in range(len(MF_predict)):
        uid = mf.index_user_id[i]
        MF_matrix.loc[uid] = MF_predict[mf.user_id_index[uid]]
    
    return MF_matrix

ibcfstart = time.time()
R_temp = ratings.pivot_table(index='userid', columns='foodid', values='rate').fillna(0)
rating_matrix_t = np.transpose(R_temp)
matrix_dummy = rating_matrix_t.copy()
matrix_dummy = matrix_dummy.fillna(0)
item_similarity = cosine_similarity(matrix_dummy)

for i in range(len(item_similarity[0])) :
    item_similarity[i, i] = 1.0
item_similarity = pd.DataFrame(item_similarity, index=rating_matrix_t.index, columns=rating_matrix_t.index)

end = time.time()
# print(f"calcul for ibcf : {end-ibcfstart:.5f} sec")

#KNN 을 활용한 iBCF
def ibcf_knn(userid, foodid):
    neighbor_size = 40
    if userid in rating_matrix_t:       # 사용자가 train set에 있는지 확인
      if foodid in item_similarity:     # 현재 음식이 train set에 있는지 확인
          # 현재 음식과 다른 영화의 similarity 값 가져오기
          sim_scores = item_similarity[foodid]
          # 현 사용자의 모든 rating 값 가져오기
          user_rating = rating_matrix_t[userid]
          # 사용자가 평가하지 않은 음식 index 가져오기
          non_rating_idx = user_rating[user_rating.isnull()].index
          # 사용자가 평가하지 않은 음식 제거
          user_rating = user_rating.dropna()
          # 사용자가 평가하지 않은 음식의 similarity 값 제거
          sim_scores = sim_scores.drop(non_rating_idx)
            
          #KNN
          # Neighbor size가 지정되지 않은 경우
          if neighbor_size == 0:
            # 현재 음식을 평가한 모든 사용자의 가중평균값 구하기
            mean_rating = np.dot(sim_scores, user_rating) / sim_scores.sum()
                
          # Neighbor size가 지정된 경우    
          else:                                
            # 지정된 neighbor size 값과 해당 음식을 평가한 총사용자 수 중 작은 것으로 결정
            neighbor_size = min(neighbor_size, len(sim_scores))
                
            # array로 바꾸기 (argsort를 사용하기 위함)
            sim_scores = np.array(sim_scores)
            user_rating = np.array(user_rating)
                
            # 유사도를 순서대로 정렬
            user_idx = np.argsort(sim_scores)
                
            # 유사도를 neighbor size만큼 받기
            sim_scores = sim_scores[user_idx][-neighbor_size:]
              
            # 음식 rating을 neighbor size만큼 받기
            user_rating = user_rating[user_idx][-neighbor_size:]
                
            # 최종 예측값 계산 
            mean_rating = np.dot(sim_scores, user_rating) / sim_scores.sum()
      else:
        mean_rating = 1.5
    else:
        mean_rating = 1.5
    return mean_rating


def recommend() :
    id_pairs = zip(ratings['userid'], ratings['foodid'])
    pred = []
    foodid = []
    userid = []
    res_df = pd.DataFrame()
    for (user, food) in id_pairs :
        foodid.append(food)
        userid.append(user)
        pred.append(ibcf_knn(user, food))
    pred = np.nan_to_num(pred)
    res_df = res_df.assign(foodid = foodid)
    res_df = res_df.assign(userid = userid)
    res_df = res_df.assign(pred = pred)
    return res_df

# IBCF_matrix = []

def IBCF():
    result = recommend()
    return result.pivot_table(index='userid', columns='foodid', values='pred').fillna(0)

threads = []
que = queue.Queue()
mftime = time.time()
MF_thread = Thread(target=lambda q : q.put(MF()), args=(que,))
# MF_thread.start()
threads.append(MF_thread)
# MF_thread.join()
MF_matrix = que.get()
mfend = time.time()
print(f"mf : {mfend-mftime:.5f} sec")
mfend = time.time()

IBCF_thread = Thread(target=lambda q : q.put(IBCF()), args=(que,))
# IBCF_thread.start()
threads.append(IBCF_thread)
# IBCF_thread.join()
IBCF_matrix = que.get()

for t in threads:
    t.start()
    t.join()

ibcftime = time.time()

# print(f"ibcf : {ibcftime-mfend:.5f} sec")

# print(f"rec : {ibcftime-mftime:.5f} sec")

Hybrid_matrix = IBCF_matrix.add(MF_matrix)

pred_mat = pd.DataFrame(columns = ['userid', 'foodid'])
idx = 0
for id in Hybrid_matrix.index :
  result = Hybrid_matrix.loc[id].nlargest(10, keep='first')
  out = []
  for i in result.index:
    out.append(i)
  pred_mat.loc[idx] = [id, out]
  idx = idx + 1

pred_mat.to_csv(savepath, index = True)

end = time.time()

print(f"time : {end-start:.5f} sec")