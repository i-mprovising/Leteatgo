import sys
from konlpy.tag import Okt
import json

def material(arg):
    recipe_path = "./newjoin.json"

    with open(recipe_path, 'r') as file:
        data = json.load(file)

    user_material = arg
    #print("this is in python : ",user_material)
    okt = Okt()
    oktnoun = okt.nouns(user_material)

    basic_material = {
        "소금" : "",
        "설탕" : "",
        "물" : "",
        "후춧가루" : "",
        "참기름" : "",
        "식초" : "",
        "우유" : "",
        "식용유" : "",
        "간장" : "",
        "올리브오일" : "",
        "후추" : "",
        "통깨" : "",
        "밥" : "",
        "가루" : "",
        "참깨" : "",
        "쌀" : "",
    }

    flag = 0
    #print("oktnoun : ",oktnoun)

    newnoun = []
    for i in range(len(oktnoun)) :
        #print(i, oktnoun[i])
        if (oktnoun[i] in basic_material) : newnoun.append(basic_material[oktnoun[i]])
        else : newnoun.append(oktnoun[i])
        if (oktnoun[i] == '계란') : newnoun.append('달걀')
        elif (oktnoun[i] == '달걀') : newnoun.append('계란')
        newnoun = [ele for ele in oktnoun if ele != '']

    #보유 식재료 기반으로 추천할 음식
    result_foodid = []

    #foodid : match_cnt
    match = {}

    for i in range(len(data)):
        materials = json.loads(data[i]['parcedmaterial'])
        orders = json.loads(data[i]['order'])
        match_cnt = 0 #사용자 식재료와 재료가 매치하는 개수
        for item in newnoun :
            for key, val in materials.items():
                if item in val :
                    match_cnt += 1
            for key, val in orders.items() :
                if item in val :
                    match_cnt += 1
        match[i] = match_cnt

    sorted_match = sorted(match.items(), key = lambda val: val[1], reverse = True)
    sorted_sim = sorted(sorted_match, key = lambda x : x[1], reverse=True)

    result = []
    for i in range(10):
        result.append(sorted_sim[i][0])
    # print(sorted_sim[i][1], data[sorted_sim[i][0]])
    print(result)
    # with open("/content/drive/Shareddrives/2022-2 파란학기/추천시스템/보유식재료/havematresult.csv",'w',newline='') as f:
    # writer = csv.writer(f)
    # writer.writerow(result)

if __name__ == '__main__':
    materials = sys.argv[1]
    material(materials)
    