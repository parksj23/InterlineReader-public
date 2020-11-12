import pandas as pd
import json
import openpyxl

sanhaeng = "5f53fc3cceceb9573eaf8788"
story = sanhaeng
kor = ""
eng = ""
han = None
order = 0

vocab_arr = []

voc = pd.read_csv("./vocabulary/sanhaeng_voc.csv", index_col=None, header=None)

# for index, i in enumerate(voc.iterrows()):
#     kor = i[1][0]
#     try:
#         if "(" in kor:
#             start = kor.find("(")
#             end = kor.find(")")
#             han = kor[start + 1:end]
#             kor = kor[:start]
#         else:
#             han = None
#     except TypeError:
#         pass
#
#     k1 = i[1][1]
#     k2 = i[1][2]
#     k3 = i[1][3]
#     k4 = i[1][4]
#     if type(k1) == str:
#         eng = k1
#     elif type(k2) == str:
#         eng = k2
#     elif type(k3) == str:
#         eng = k3
#     elif type(k4) == str:
#         eng = k4
#     mod_kr = {"korean": kor,
#               "stem": kor,
#               "createdDate": {"$date": {"$numberLong": "1599430742443"}}, "english": eng, "hanja": han,
#               "lastUpdated": {"$date": {"$numberLong": "1599430742443"}}, "order_id": {"$numberInt": index},
#               "storyList": [story]}
#     vocab_arr.append(mod_kr)
#
#
# print(vocab_arr)
#
# with open('./vocabulary/sanhaeng_voc_stem_added.json', 'w') as file:
#     json.dump(vocab_arr, file)
#
#
#
# korean = pd.read_csv("./vocabulary/sanhaeng_kor_only.csv", index_col=None, header=None)
# edited_json = pd.read_json("./vocabulary/sanhaeng_voc_stem_added.json")
# print(edited_json.shape, korean.shape)
# print(edited_json.head())
# print(korean.head())
#
# for i, line in enumerate(korean.iterrows()):
#
#     k = line[1][0]
#     stem = edited_json["korean"][i]
#     # print(k, stem)
#     try:
#         if "(" in k:
#             start = k.find("(")
#             end = k.find(")")
#             k = k[:start]
#     except TypeError:
#         pass
#
#     if k[:1] in stem:
#         # print(k[:1], stem)
#         edited_json["korean"][i] = k
#     elif k == "쳐지":
#         edited_json["korean"][i] = k
#     else:
#         print("issue is: ", k, stem)
#
#
# edited_json.to_excel("./vocabulary/sanhaeng_vocab_text_stem.xlsx")
# edited_json.to_json("./vocabulary/sanhaeng_vocab_text_stem.json")


final = pd.read_csv("./vocabulary/sanhaeng_vocab_final.csv")

final_arr = []
for index, line in enumerate(final.iterrows()):
    kor = (line[1][0])
    stem = line[1][1]
    eng= line[1][3]
    han = line[1][4]

    mod_kr = {"korean": kor,
              "stem": kor,
              "createdDate": {"$date": {"$numberLong": "1599430742443"}}, "english": eng, "hanja": han,
              "lastUpdated": {"$date": {"$numberLong": "1599430742443"}}, "order_id": {"$numberInt": index},
              "storyList": [story]}
    final_arr.append(mod_kr)


with open('./vocabulary/sanhaeng_voc_final.json', 'w') as file:
    json.dump(final_arr, file)