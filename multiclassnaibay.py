
# importing required libraries
import pandas as pd
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score

df = pd.read_excel("D:\IIT\Year 2 Sem 2\SDGP\ML-github-component\Intellignosis\EO-EC-TA-full\C3-full.xlsx")
print(df.head())
X = df.iloc[:,4:5].values
y = df.iloc[:, 12].values

from sklearn.preprocessing import LabelEncoder
le = LabelEncoder()
X[:,0] = le.fit_transform(X[:,0])

from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.20, random_state = 0)


# read the train and test dataset
# train_data = pd.read_csv('train-data.csv')
# test_data = pd.read_csv('test-data.csv')

# shape of the dataset
print('Shape of training data :',X_train.shape)
print('Shape of testing data :',X_test.shape)

# Now, we need to predict the missing target variable in the test data
# target variable - Survived

# seperate the independent and target variable on training data
# train_x = train_data.drop(columns=['Survived'],axis=1)
# train_y = train_data['Survived']

# # seperate the independent and target variable on testing data
# test_x = test_data.drop(columns=['Survived'],axis=1)
# test_y = test_data['Survived']

'''
Create the object of the K-Nearest Neighbor model
You can also add other parameters and test your code here
Some parameters are : n_neighbors, leaf_size
Documentation of sklearn K-Neighbors Classifier: 

https://scikit-learn.org/stable/modules/generated/sklearn.neighbors.KNeighborsClassifier.html

 '''
model = KNeighborsClassifier()  

# fit the model with the training data
model.fit(X_train,y_train)

# Number of Neighbors used to predict the target
print('\nThe number of neighbors used to predict the target : ',model.n_neighbors)

# predict the target on the train dataset
predict_train = model.predict(X_train)
print('\nTarget on train data',predict_train) 

# Accuray Score on train dataset
accuracy_train = accuracy_score(y_train,predict_train)
print('accuracy_score on train dataset : ', accuracy_train)

# predict the target on the test dataset
predict_test = model.predict(X_test)
print('Target on test data',predict_test) 

# Accuracy Score on test dataset
accuracy_test = accuracy_score(y_test,predict_test)
print('accuracy_score on test dataset : ', accuracy_test)