import * as Blockly from 'blockly';

Blockly.defineBlocksWithJsonArray([
  {
    'type': 'sklearn_train_test_split',
    'message0': 'split arrays %1 and labels %2 into train and test sets',
    'args0': [
      {
        'type': 'input_value',
        'name': 'ARRAYS',
        'check': 'Array'
      },
      {
        'type': 'input_value',
        'name': 'LABELS',
        'check': 'Array'
      }
    ],
    'message1': 'test size %1 random state %2',
    'args1': [
      {
        'type': 'field_number',
        'name': 'TEST_SIZE',
        'value': 0.2,
        'min': 0,
        'max': 1,
        'precision': 0.01
      },
      {
        'type': 'field_number',
        'name': 'RANDOM_STATE',
        'value': 42
      }
    ],
    'output': 'Array',
    'colour': '#42A5F5',
    'tooltip': 'Split arrays or matrices into random train and test subsets. Returns a list containing [X_train, X_test, y_train, y_test].',
    'helpUrl': 'https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.train_test_split.html'
  },
  {
    'type': 'sklearn_pipeline',
    'message0': 'create pipeline %1',
    'args0': [{
        'type': 'input_statement',
        'name': 'STEPS'
      }],
    'output': 'Pipeline',
    'colour': '#42A5F5',
    'tooltip': 'Construct a pipeline from a list of transformers and a final estimator.',
    'helpUrl': 'https://scikit-learn.org/stable/modules/generated/sklearn.pipeline.Pipeline.html'
  },
  {
    'type': 'sklearn_standard_scaler',
    'message0': 'create standard scaler',
    'output': 'Estimator',
    'colour': '#42A5F5',
    'tooltip': 'Standardize features by removing the mean and scaling to unit variance.',
    'helpUrl': 'https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.StandardScaler.html'
  },
  {
    'type': 'sklearn_min_max_scaler',
    'message0': 'create min-max scaler',
    'output': 'Estimator',
    'colour': '#42A5F5',
    'tooltip': 'Transform features by scaling each feature to a given range.',
    'helpUrl': 'https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.MinMaxScaler.html'
  },
  {
    'type': 'sklearn_one_hot_encoder',
    'message0': 'create one-hot encoder',
    'output': 'Estimator',
    'colour': '#42A5F5',
    'tooltip': 'Encode categorical features as a one-hot numeric array.',
    'helpUrl': 'https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.OneHotEncoder.html'
  },
  {
    'type': 'sklearn_label_encoder',
    'message0': 'create label encoder',
    'output': 'Estimator',
    'colour': '#42A5F5',
    'tooltip': 'Encode target labels with value between 0 and n_classes-1.',
    'helpUrl': 'https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.LabelEncoder.html'
  },
  {
    'type': 'sklearn_logistic_regression',
    'message0': 'logistic regression classifier',
    'output': 'Estimator',
    'colour': '#42A5F5',
    'tooltip': 'Logistic Regression (aka logit, MaxEnt) classifier.',
    'helpUrl': 'https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LogisticRegression.html'
  },
  {
    'type': 'sklearn_k_neighbors_classifier',
    'message0': 'k-neighbors classifier with %1 neighbors',
    'args0': [{
        'type': 'field_number',
        'name': 'N_NEIGHBORS',
        'value': 5,
        'min': 1
      }],
    'output': 'Estimator',
    'colour': '#42A5F5',
    'tooltip': 'Classifier implementing the k-nearest neighbors vote.',
    'helpUrl': 'https://scikit-learn.org/stable/modules/generated/sklearn.neighbors.KNeighborsClassifier.html'
  },
  {
    'type': 'sklearn_svc',
    'message0': 'support vector classifier (SVC)',
    'output': 'Estimator',
    'colour': '#42A5F5',
    'tooltip': 'C-Support Vector Classification.',
    'helpUrl': 'https://scikit-learn.org/stable/modules/generated/sklearn.svm.SVC.html'
  },
  {
    'type': 'sklearn_random_forest_classifier',
    'message0': 'random forest classifier with %1 estimators',
    'args0': [{
        'type': 'field_number',
        'name': 'N_ESTIMATORS',
        'value': 100,
        'min': 1
      }],
    'output': 'Estimator',
    'colour': '#42A5F5',
    'tooltip': 'A random forest classifier.',
    'helpUrl': 'https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestClassifier.html'
  },
  {
    'type': 'sklearn_linear_regression',
    'message0': 'linear regression model',
    'output': 'Estimator',
    'colour': '#42A5F5',
    'tooltip': 'Ordinary least squares Linear Regression.',
    'helpUrl': 'https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LinearRegression.html'
  },
  {
    'type': 'sklearn_ridge_regression',
    'message0': 'ridge regression model with alpha %1',
    'args0': [{
        'type': 'field_number',
        'name': 'ALPHA',
        'value': 1,
        'min': 0
      }],
    'output': 'Estimator',
    'colour': '#42A5F5',
    'tooltip': 'Linear least squares with l2 regularization.',
    'helpUrl': 'https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.Ridge.html'
  },
  {
    'type': 'sklearn_svr',
    'message0': 'support vector regression (SVR)',
    'output': 'Estimator',
    'colour': '#42A5F5',
    'tooltip': 'Epsilon-Support Vector Regression.',
    'helpUrl': 'https://scikit-learn.org/stable/modules/generated/sklearn.svm.SVR.html'
  },
  {
    'type': 'sklearn_kmeans',
    'message0': 'k-means clustering with %1 clusters',
    'args0': [{
        'type': 'field_number',
        'name': 'N_CLUSTERS',
        'value': 8,
        'min': 1
      }],
    'output': 'Estimator',
    'colour': '#42A5F5',
    'tooltip': 'K-Means clustering.',
    'helpUrl': 'https://scikit-learn.org/stable/modules/generated/sklearn.cluster.KMeans.html'
  },
  {
    'type': 'sklearn_grid_search_cv',
    'message0': 'grid search cross-validation for estimator %1',
    'args0': [{
        'type': 'input_value',
        'name': 'ESTIMATOR',
        'check': 'Estimator'
      }],
    'message1': 'parameter grid %1',
    'args1': [{
        'type': 'input_value',
        'name': 'PARAM_GRID',
        'check': 'Dictionary'
      }],
    'output': 'Estimator',
    'colour': '#42A5F5',
    'tooltip': 'Exhaustive search over specified parameter values for an estimator.',
    'helpUrl': 'https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.GridSearchCV.html'
  },
  {
    'type': 'sklearn_accuracy_score',
    'message0': 'accuracy score for y_true %1 y_pred %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'Y_TRUE',
        'check': 'Array'
      },
      {
        'type': 'input_value',
        'name': 'Y_PRED',
        'check': 'Array'
      }
    ],
    'output': 'Number',
    'colour': '#42A5F5',
    'tooltip': 'Accuracy classification score.',
    'helpUrl': 'https://scikit-learn.org/stable/modules/generated/sklearn.metrics.accuracy_score.html'
  },
  {
    'type': 'sklearn_precision_score',
    'message0': 'precision score for y_true %1 y_pred %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'Y_TRUE',
        'check': 'Array'
      },
      {
        'type': 'input_value',
        'name': 'Y_PRED',
        'check': 'Array'
      }
    ],
    'output': 'Number',
    'colour': '#42A5F5',
    'tooltip': 'Compute the precision.',
    'helpUrl': 'https://scikit-learn.org/stable/modules/generated/sklearn.metrics.precision_score.html'
  },
  {
    'type': 'sklearn_recall_score',
    'message0': 'recall score for y_true %1 y_pred %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'Y_TRUE',
        'check': 'Array'
      },
      {
        'type': 'input_value',
        'name': 'Y_PRED',
        'check': 'Array'
      }
    ],
    'output': 'Number',
    'colour': '#42A5F5',
    'tooltip': 'Compute the recall.',
    'helpUrl': 'https://scikit-learn.org/stable/modules/generated/sklearn.metrics.recall_score.html'
  },
  {
    'type': 'sklearn_f1_score',
    'message0': 'f1 score for y_true %1 y_pred %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'Y_TRUE',
        'check': 'Array'
      },
      {
        'type': 'input_value',
        'name': 'Y_PRED',
        'check': 'Array'
      }
    ],
    'output': 'Number',
    'colour': '#42A5F5',
    'tooltip': 'Compute the F1 score, also known as balanced F-score or F-measure.',
    'helpUrl': 'https://scikit-learn.org/stable/modules/generated/sklearn.metrics.f1_score.html'
  },
  {
    'type': 'sklearn_confusion_matrix',
    'message0': 'confusion matrix for y_true %1 y_pred %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'Y_TRUE',
        'check': 'Array'
      },
      {
        'type': 'input_value',
        'name': 'Y_PRED',
        'check': 'Array'
      }
    ],
    'output': 'Array',
    'colour': '#42A5F5',
    'tooltip': 'Compute confusion matrix to evaluate the accuracy of a classification.',
    'helpUrl': 'https://scikit-learn.org/stable/modules/generated/sklearn.metrics.confusion_matrix.html'
  },
  {
    'type': 'sklearn_mean_squared_error',
    'message0': 'mean squared error for y_true %1 y_pred %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'Y_TRUE',
        'check': 'Array'
      },
      {
        'type': 'input_value',
        'name': 'Y_PRED',
        'check': 'Array'
      }
    ],
    'output': 'Number',
    'colour': '#42A5F5',
    'tooltip': 'Mean squared error regression loss.',
    'helpUrl': 'https://scikit-learn.org/stable/modules/generated/sklearn.metrics.mean_squared_error.html'
  },
  {
    'type': 'sklearn_r2_score',
    'message0': 'r2 score for y_true %1 y_pred %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'Y_TRUE',
        'check': 'Array'
      },
      {
        'type': 'input_value',
        'name': 'Y_PRED',
        'check': 'Array'
      }
    ],
    'output': 'Number',
    'colour': '#42A5F5',
    'tooltip': 'R^2 (coefficient of determination) regression score function.',
    'helpUrl': 'https://scikit-learn.org/stable/modules/generated/sklearn.metrics.r2_score.html'
  }
]);