from math import gamma
import pandas as pd
from sklearn.neighbors import KNeighborsClassifier
from sklearn import preprocessing
df = pd.read_excel("D:\IIT\Year 2 Sem 2\SDGP\ML-github-component\Intellignosis\EO-EC-TA-full\C3-full.xlsx")
# print(df)
Val1 = df["Beta"].tolist()
# print(deltaVals)
Val2 = df["Gamma"].tolist()
# print(gammaVals)
depIndex = df["MDD/HEL"].tolist()
# print(depIndex)

le = preprocessing.LabelEncoder()

# Converting string labels into numbers.
alpha_encoded=le.fit_transform(Val1)
gamma_encoded=le.fit_transform(Val2)
# print(delta_encoded)


features = list(zip(alpha_encoded, gamma_encoded))

label=le.fit_transform(depIndex)
print(label)

model = KNeighborsClassifier(n_neighbors=4)

# Train the model using the training sets
model.fit(features, label)

# value1 = df.cell(4, 3)
# value2 = df.cell(4, 8)
# print(value1)

#Sample output
predicted= model.predict([[4.11
, 3.60
]])
print(predicted)


