import { pythonGenerator as Python } from 'blockly/python';

// --- Existing Generators ---

Python.forBlock['sklearn_train_test_split'] = function(block) {
  Python.addImport('from sklearn.model_selection import train_test_split');
  const arrays = Python.valueToCode(block, 'ARRAYS', Python.ORDER_ATOMIC) || 'None';
  const labels = Python.valueToCode(block, 'LABELS', Python.ORDER_ATOMIC) || 'None';
  const test_size = block.getFieldValue('TEST_SIZE');
  const random_state = block.getFieldValue('RANDOM_STATE');
  const code = `train_test_split(${arrays}, ${labels}, test_size=${test_size}, random_state=${random_state})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['sklearn_pipeline'] = function(block) {
  Python.addImport('from sklearn.pipeline import Pipeline');
  const steps = Python.statementToCode(block, 'STEPS');
  const code = `Pipeline(steps=[${steps}])`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

// --- Preprocessing ---

Python.forBlock['sklearn_standard_scaler'] = function(block) {
  Python.addImport('from sklearn.preprocessing import StandardScaler');
  return ['StandardScaler()', Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['sklearn_min_max_scaler'] = function(block) {
  Python.addImport('from sklearn.preprocessing import MinMaxScaler');
  return ['MinMaxScaler()', Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['sklearn_one_hot_encoder'] = function(block) {
  Python.addImport('from sklearn.preprocessing import OneHotEncoder');
  return ['OneHotEncoder()', Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['sklearn_label_encoder'] = function(block) {
  Python.addImport('from sklearn.preprocessing import LabelEncoder');
  return ['LabelEncoder()', Python.ORDER_FUNCTION_CALL];
};

// --- Models: Classification ---

Python.forBlock['sklearn_logistic_regression'] = function(block) {
  Python.addImport('from sklearn.linear_model import LogisticRegression');
  return ['LogisticRegression()', Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['sklearn_k_neighbors_classifier'] = function(block) {
  Python.addImport('from sklearn.neighbors import KNeighborsClassifier');
  const n_neighbors = block.getFieldValue('N_NEIGHBORS');
  const code = `KNeighborsClassifier(n_neighbors=${n_neighbors})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['sklearn_svc'] = function(block) {
  Python.addImport('from sklearn.svm import SVC');
  return ['SVC()', Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['sklearn_random_forest_classifier'] = function(block) {
  Python.addImport('from sklearn.ensemble import RandomForestClassifier');
  const n_estimators = block.getFieldValue('N_ESTIMATORS');
  const code = `RandomForestClassifier(n_estimators=${n_estimators})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

// --- Models: Regression ---

Python.forBlock['sklearn_linear_regression'] = function(block) {
  Python.addImport('from sklearn.linear_model import LinearRegression');
  return ['LinearRegression()', Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['sklearn_ridge_regression'] = function(block) {
  Python.addImport('from sklearn.linear_model import Ridge');
  const alpha = block.getFieldValue('ALPHA');
  const code = `Ridge(alpha=${alpha})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['sklearn_svr'] = function(block) {
  Python.addImport('from sklearn.svm import SVR');
  return ['SVR()', Python.ORDER_FUNCTION_CALL];
};

// --- Models: Clustering ---

Python.forBlock['sklearn_kmeans'] = function(block) {
  Python.addImport('from sklearn.cluster import KMeans');
  const n_clusters = block.getFieldValue('N_CLUSTERS');
  const code = `KMeans(n_clusters=${n_clusters})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

// --- Model Selection ---

Python.forBlock['sklearn_grid_search_cv'] = function(block) {
  Python.addImport('from sklearn.model_selection import GridSearchCV');
  const estimator = Python.valueToCode(block, 'ESTIMATOR', Python.ORDER_ATOMIC) || 'None';
  const param_grid = Python.valueToCode(block, 'PARAM_GRID', Python.ORDER_ATOMIC) || '{}';
  const code = `GridSearchCV(estimator=${estimator}, param_grid=${param_grid})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

// --- Metrics ---

Python.forBlock['sklearn_accuracy_score'] = function(block) {
  Python.addImport('from sklearn.metrics import accuracy_score');
  const y_true = Python.valueToCode(block, 'Y_TRUE', Python.ORDER_ATOMIC) || 'None';
  const y_pred = Python.valueToCode(block, 'Y_PRED', Python.ORDER_ATOMIC) || 'None';
  const code = `accuracy_score(${y_true}, ${y_pred})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['sklearn_precision_score'] = function(block) {
  Python.addImport('from sklearn.metrics import precision_score');
  const y_true = Python.valueToCode(block, 'Y_TRUE', Python.ORDER_ATOMIC) || 'None';
  const y_pred = Python.valueToCode(block, 'Y_PRED', Python.ORDER_ATOMIC) || 'None';
  const code = `precision_score(${y_true}, ${y_pred})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['sklearn_recall_score'] = function(block) {
  Python.addImport('from sklearn.metrics import recall_score');
  const y_true = Python.valueToCode(block, 'Y_TRUE', Python.ORDER_ATOMIC) || 'None';
  const y_pred = Python.valueToCode(block, 'Y_PRED', Python.ORDER_ATOMIC) || 'None';
  const code = `recall_score(${y_true}, ${y_pred})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['sklearn_f1_score'] = function(block) {
  Python.addImport('from sklearn.metrics import f1_score');
  const y_true = Python.valueToCode(block, 'Y_TRUE', Python.ORDER_ATOMIC) || 'None';
  const y_pred = Python.valueToCode(block, 'Y_PRED', Python.ORDER_ATOMIC) || 'None';
  const code = `f1_score(${y_true}, ${y_pred})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['sklearn_confusion_matrix'] = function(block) {
  Python.addImport('from sklearn.metrics import confusion_matrix');
  const y_true = Python.valueToCode(block, 'Y_TRUE', Python.ORDER_ATOMIC) || 'None';
  const y_pred = Python.valueToCode(block, 'Y_PRED', Python.ORDER_ATOMIC) || 'None';
  const code = `confusion_matrix(${y_true}, ${y_pred})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['sklearn_mean_squared_error'] = function(block) {
  Python.addImport('from sklearn.metrics import mean_squared_error');
  const y_true = Python.valueToCode(block, 'Y_TRUE', Python.ORDER_ATOMIC) || 'None';
  const y_pred = Python.valueToCode(block, 'Y_PRED', Python.ORDER_ATOMIC) || 'None';
  const code = `mean_squared_error(${y_true}, ${y_pred})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['sklearn_r2_score'] = function(block) {
  Python.addImport('from sklearn.metrics import r2_score');
  const y_true = Python.valueToCode(block, 'Y_TRUE', Python.ORDER_ATOMIC) || 'None';
  const y_pred = Python.valueToCode(block, 'Y_PRED', Python.ORDER_ATOMIC) || 'None';
  const code = `r2_score(${y_true}, ${y_pred})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};