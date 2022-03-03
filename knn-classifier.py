from math import gamma
import pandas as pd
from sklearn.neighbors import KNeighborsClassifier
from sklearn import preprocessing
df = pd.read_excel("Full-dataset.xlsx")
# print(df)
deltaVals = df["Delta"].tolist()
# print(deltaVals)
gammaVals = df["Gamma"].tolist()
# print(gammaVals)
depIndex = df["MDD/Healthy"].tolist()
# print(depIndex)

le = preprocessing.LabelEncoder()

# Converting string labels into numbers.
delta_encoded=le.fit_transform(deltaVals)
gamma_encoded=le.fit_transform(gammaVals)
# print(delta_encoded)


features = list(zip(delta_encoded, gamma_encoded))

label=le.fit_transform(depIndex)
print(label)

model = KNeighborsClassifier(n_neighbors=3)

# Train the model using the training sets
model.fit(features, label)

# value1 = df.cell(4, 3)
# value2 = df.cell(4, 8)
# print(value1)


#Sample output
predicted= model.predict([[0.788166, 0.00311]])
print(predicted)


