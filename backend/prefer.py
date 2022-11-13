import sys
sys.path.append("/opt/homebrew/lib/python3.9/site-packages")
import numpy as np
import pandas as pd
import os


if __name__ == '__main__':
    r_cols = ['userid', 'foodid', 'survey', 'like', 'made', 'view']
    a, b, c, d = 1, 1, 1, 2
    ratings = pd.read_csv("./prefer.csv", names=r_cols, encoding='latin-1')
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

    df = ratings.pivot_table(index='userid', columns='foodid', values='rate').fillna(0)
    df = pd.DataFrame(df)

    result = df.sum().nlargest(6, keep='first')
    out = []
    for i in result.index:
        out.append(int(float(i)))

    for item in out:
        print(item)