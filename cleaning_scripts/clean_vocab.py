import pandas as pd
import json

sanhaeng = "5f53fc3cceceb9573eaf8788"
story = sanhaeng
kor = ""
eng = ""
han = None
order = 0

vocab_arr = []

voc = pd.read_csv("./vocabulary/sanhaeng_voc.csv", index_col=None, header=None)
print(voc.head())
df1 = voc[1]
df2 = voc[2]
df3 = voc[3]
df4 = voc[4]

for index, i in enumerate(voc.iterrows()):
    kor = i[1][0]
    try:
        if "(" in kor:
            start = kor.find("(")
            end = kor.find(")")
            han = kor[start + 1:end]
            kor = kor[:start]
            # print(han, kor)
    except TypeError:
        pass

    k1 = i[1][1]
    k2 = i[1][2]
    k3 = i[1][3]
    k4 = i[1][4]
    if type(k1) == str:
        eng = k1
    elif type(k2) == str:
        eng = k2
    elif type(k3) == str:
        eng = k3
    elif type(k4) == str:
        eng = k4
    mod_kr = {"korean": kor,
              "stem": kor,
              "createdDate": {"$date": {"$numberLong": "1599430742443"}}, "english": eng, "hanja": han,
              "lastUpdated": {"$date": {"$numberLong": "1599430742443"}}, "order_id": {"$numberInt": index},
              "storyList": [story]}
    vocab_arr.append(mod_kr)


# print(vocab_arr)

with open('./vocabulary/sanhaeng_voc_stem_added.json', 'w') as file:
    json.dump(vocab_arr, file)