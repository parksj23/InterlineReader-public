import pandas as pd
import json

sanhaeng = "5f53fc3cceceb9573eaf8788"
story = sanhaeng
sent = ""
here = ""
pat = ""
gloss = ""

gram_arr = []

gram = pd.read_csv("./grammar/Sanhayng Grammar.csv", index_col=0, header=0)
print(gram.head())
# df1 = gram[1]
# df2 = gram[2]
# df3 = gram[3]
# df4 = gram[4]

gram_arr = []
for index, i in enumerate(gram.iterrows()):

    sent = (i[1][0])
    pat = i[1][1]
    gloss = i[1][2]
    here = i[1][3]
    if type(sent) == str:
        mod_kr = {"sentence": sent,
                  "createdDate": {"$date": {"$numberLong": "1599627469037"}}, "here": here,
                  "lastUpdated": {"$date": {"$numberLong": "1599627477133"}}, "order_id": index, "pattern": pat,
                  "gloss": gloss,
                  "storyList": [story]}
        gram_arr.append(mod_kr)
print(gram_arr)


with open('./grammar/sanhaeng_gram.json', 'w') as file:
    json.dump(gram_arr, file)