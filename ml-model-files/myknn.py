from sklearn import preprocessing
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score
import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
import pickle
import sklearn.neighbors._distance_metric

#Reading dataset
df = pd.read_excel("D:\IIT\Year 2 Sem 2\SDGP\Backend\Intellignosis\src\ML\Fp1-full.xlsx")    
print(df.head())

#printing the unique labels
print(df["LEVEL"].unique())

#Mapping labels as integers
df["LEVEL"] = df["LEVEL"].map({"Minimal" :0, "Mild" :1, "Moderate" :2, "Severe" :3}).astype(int)
print(df["LEVEL"])

# #printing 1st plot
# plt.close();
# sns.set_style("whitegrid");
# sns.pairplot(df, hue="LEVEL", height=3);
# # plt.show()

#printing 2nd plot
# sns.set_style("whitegrid");
# sns.FacetGrid(df, hue="LEVEL", size=5) \
# .map(plt.scatter, "Beta", "Gamma") \
# .add_legend();
# plt.show()


#Printing the data in the specific bands
x_data = df[["Beta", "Gamma"]]
print("Xdata: ", x_data)
print("XdataTYPE: ", type(x_data))

#Printing label column
y_data = df["LEVEL"]

#normalization
MinMaxScaler = preprocessing.MinMaxScaler()
X_data_minmax = MinMaxScaler.fit_transform(x_data)
data = pd.DataFrame(X_data_minmax,columns=['Beta', 'Gamma'])

# 3rd plot
# sns.set_style("whitegrid");
# sns.FacetGrid(df, hue="LEVEL", height=5) \
# .map(plt.scatter, "Beta", "Gamma") \
# .add_legend();
# plt.show()

print("HEYYYY")
#Splitting dataset into training and testing data
X_train, X_test, y_train, y_test = train_test_split(x_data, y_data,test_size=0.15, random_state = 1)
print("HEYYYY2222222222222")
#TRAINING with knn = 5
knn_clf=KNeighborsClassifier(n_neighbors=5, weights="uniform", algorithm="auto", leaf_size=30, p=2, metric="minkowski", metric_params=None, n_jobs=None)
knn_clf.fit(X_train,y_train)
print("HEYYYY33333333333333333")

#Using pickle.dump to save and load the model
# pickle.dump(knn_clf, open("kNNModel.pk1", "wb"))
# model = pickle.load(open("kNNModel.pk1", "rb"))
# ypred=model.predict(X_test)

#PREDICTING 
ypred=knn_clf.predict(X_test)

#Printing the predicted test values
print("ypred: ", ypred)

#Printing the real test values 
print("Xtest:", X_test)

# #Testing accuracy 
result = confusion_matrix(y_test, ypred)
print("Confusion Matrix:")
print(result)
result1 = classification_report(y_test, ypred)
print("Classification Report:",)
print (result1)
result2 = accuracy_score(y_test,ypred)
print("Accuracy:",result2)

# Testing out with new data
# Comment out lines 63 to 79 
# Uncomment lines 84 to 87
# mydf = pd.read_excel("D:\IIT\Year 2 Sem 2\SDGP\Backend\Intellignosis\src\ML\Testing-files\Absolute-bands-3.xlsx")
# myData = mydf[["Beta", "Gamma"]]
# ypred=knn_clf.predict(myData)
# print(ypred)