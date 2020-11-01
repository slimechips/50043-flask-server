from sklearn.metrics import classification_report, confusion_matrix
from sklearn.metrics import roc_curve, roc_auc_score
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import classification_report, confusion_matrix
from sklearn.metrics import roc_curve, roc_auc_score
from sklearn.linear_model import LogisticRegression
import seaborn as sns
import matplotlib.pyplot as plt

data1 = pd.read_csv('output.csv')
data1.head()
#data1.loc[[1],['longitude']]=data1.loc[[1],['latitude']] - data1.loc[[1],['housing_median_age']]
#data1.dtypes
#data1.head()
def judgeLevel(df):
    if df['t7Close']-df['tClose']< 0:
        return -1
    elif df['t7Close']-df['tClose'] == 0:
        return 0
    else:
        return 1

def evaluate_on_training_set(y_test, y_pred):
  # Calculate AUC
  auc_score = roc_auc_score(y_test,y_pred)
  print("AUC is: ", auc_score ) #todo print AUC score

  
  # Plot ROC curve

  plt.plot([0, 1], [0, 1], 'k--')  # random predictions curve
  plt.xlim([0.0, 1.0])
  plt.ylim([0.0, 1.0])
  plt.xlabel('False Positive Rate or (1 - Specifity)')
  plt.ylabel('True Positive Rate or (Sensitivity)')
  plt.title('Receiver Operating Characteristic')

from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfVectorizer
from collections import Counter

corpus =data1['news']
print(corpus)

data1['trend']=data1.apply(lambda r:judgeLevel(r),axis=1)
data1['TFIDF']=TFIDF_2

X_train, X_test, y_train, y_test = train_test_split(data1['TFIDF'].values.reshape(478,1), 
                                                    data1['trend'],
                                                    test_size=0.3,
                                                    random_state=0) 
# define a new scaler: 
x_scaler = MinMaxScaler()

# fit the normalization on the training set: 
x_scaler.fit(X_train)     #todo

# then create new and normalized training/test sets: 
X_train_norm = x_scaler.transform(X_train)
X_test_norm = x_scaler.transform(X_test)

from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
model = KNeighborsClassifier(n_neighbors=33) # Define the model with parameters

model.fit(X_train_norm, y_train) # Training the model

# Evaluate the model: 
y_pred = model.predict(X_test_norm) # Predicting labels for our test set using trained model
evaluate_on_training_set(y_test, y_pred) #evaluate our model using newly defined function

from sklearn.naive_bayes import GaussianNB
model = GaussianNB() # Define the model with parameters
model.fit(X_train_norm, y_train) # Training the model

y_pred = model.predict(X_test_norm) # Predicting labels for our test set using trained model
evaluate_on_training_set(y_test, y_pred) #evaluate our model using newly defined function

from sklearn import tree

model = tree.DecisionTreeClassifier(max_depth=3, min_samples_leaf=1) 
model.fit(X_train, y_train)
y_pred = model.predict(X_test) # Predicting labels for our test set using model
print (y_pred)
evaluate_on_training_set(y_test, y_pred) #evaluate our model using new function

from sklearn.svm import SVC
model = SVC(C=10, gamma='auto', kernel='rbf')
model.fit(X_train_norm, y_train)
model.fit(X_train_norm, y_train) # Training SVM

y_pred = model.predict(X_test_norm) # Predicting labels for our test set using trained model
evaluate_on_training_set(y_test, y_pred) #evaluate our model using newly defined 

from sklearn.ensemble import AdaBoostClassifier
model = AdaBoostClassifier(n_estimators=1000, learning_rate=0.1) # Define the model with parameters
model.fit(X_train_norm, y_train) # Training the model

y_pred = model.predict(X_test_norm) # Predicting labels for our test set using trained model
evaluate_on_training_set(y_test, y_pred) #evaluate our model using newly defined function

from sklearn.ensemble import RandomForestClassifier
model = RandomForestClassifier(n_estimators = 50) # Define the model
#TODO fit the model, predict y and evaluate as before
model.fit(X_train_norm, y_train) # Training the model

y_pred = model.predict(X_test_norm) # Predicting labels for our test set using trained model
evaluate_on_training_set(y_test, y_pred) #evaluate our model using newly defined function