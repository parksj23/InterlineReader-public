import pandas as pd
import openpyxl

doc = pd.read_csv("./grammar/namwukwun_gram.csv", index_col=None, header=None)

print(doc.head())

gloss_arr = []
patt_arr = []
kor_arr = []
here_arr = []
for line in doc.iterrows():
    text = line[1][0]
    if "pattern:" in text.lower():
        text = text[(len("Pattern: ")):]
        patt_arr.append(text)
    elif "gloss" in text.lower():
        text = text[(len("Pattern Gloss: ")):]
        gloss_arr.append(text)
    elif "here:" in text.lower():
        text = text[(len("Here: ")):]
        here_arr.append(text)
    else:
        kor_arr.append(text)


arr = [kor_arr, patt_arr, gloss_arr, here_arr]
dict = {"Korean" : kor_arr, "Pattern" : patt_arr, "Gloss" : gloss_arr, "Here": here_arr}
gram_doc = pd.DataFrame(arr, index=["Korean", "Pattern", "Gloss", "Here"])
g = gram_doc.transpose()
print(g.head())

g.to_excel("./grammar/Namwukwun_gram.xlsx")