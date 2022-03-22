import pandas as pd
from sklearn.neighbors import KNeighborsClassifier
from sklearn import preprocessing
from sklearn.metrics import accuracy_score
import xlrd

df = pd.read_excel("D:\IIT\Year 2 Sem 2\SDGP\ML-github-component\Intellignosis\EO-EC-TA-full\Fp1-full.xlsx")
df.head()
# print(df)
Val1 = df["Beta"].tolist()
# print(deltaVals)
Val2 = df["Gamma"].tolist()
# print(gammaVals)
Val3 = df["Alpha"].tolist()
depIndex = df["MDD/HEL"].tolist()
# print(depIndex)

le = preprocessing.LabelEncoder()

# Converting string labels into numbers.
val1_encoded=le.fit_transform(Val1)
val2_encoded=le.fit_transform(Val2)
val3_encoded=le.fit_transform(Val3)
# print(delta_encoded)

features = list(zip(val1_encoded, val2_encoded))

label=le.fit_transform(depIndex)
# print(label)

model = KNeighborsClassifier(n_neighbors=5)

# Train the model using the training sets
model.fit(features, label)

 
df2 = pd.read_excel("D:\IIT\Year 2 Sem 2\SDGP\ReadMDDEDF.xlsx")
df.head()
TestVar1 = df2["Beta"].tolist()
# print(deltaVals)
TestVar2 = df2["Gamma"].tolist()
TestVar3 = df2["Alpha"]

# loc = ("D:\IIT\Year 2 Sem 2\SDGP\ReadEDF.xlsx")
 
# wb = xlrd.open_workbook(loc)
# sheet = wb.sheet_by_index(0)
# sheet.cell_value(0, 0)
 
# for i in range(sheet.nrows):
#     TestVar1 = sheet.cell_value(i, 4)
#     TestVar2 = sheet.cell_value(i, 5)

for i in range(len(TestVar1)):
    predicted= model.predict([[ TestVar1[i], TestVar2[i]]])
    print(predicted)

# if (predicted==1):

# acc = accuracy_score(test_label, predicted)
    
#https://www.geeksforgeeks.org/saving-a-machine-learning-model/
#https://www.geeksforgeeks.org/how-to-deploy-a-machine-learning-model-using-node-js/    