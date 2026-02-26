import { pythonGenerator as Python } from 'blockly/python';

Python.forBlock['datasci_model_define'] = function (block) {
    const type = block.getFieldValue('TYPE');
    const params = Python.valueToCode(block, 'PARAMS', Python.ORDER_NONE) || '{}';
    let modelCode = '';
    switch (type) {
        case 'linear_regression':
            Python.addImport('from sklearn.linear_model import LinearRegression');
            modelCode = `LinearRegression(**${params})`;
            break;
        case 'logistic_regression':
            Python.addImport('from sklearn.linear_model import LogisticRegression');
            modelCode = `LogisticRegression(**${params})`;
            break;
        case 'random_forest':
            Python.addImport('from sklearn.ensemble import RandomForestClassifier');
            modelCode = `RandomForestClassifier(**${params})`;
            break;
        default:
            Python.addImport('from sklearn.linear_model import LinearRegression');
            modelCode = `LinearRegression()`;
    }
    return [modelCode, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['datasci_model_train'] = function (block) {
    const model = Python.valueToCode(block, 'MODEL', Python.ORDER_MEMBER) || 'None';
    const x = Python.valueToCode(block, 'X', Python.ORDER_NONE) || 'None';
    const y = Python.valueToCode(block, 'Y', Python.ORDER_NONE) || 'None';
    return `${model}.fit(${x}, ${y})\n`;
};

Python.forBlock['datasci_model_predict'] = function (block) {
    const model = Python.valueToCode(block, 'MODEL', Python.ORDER_MEMBER) || 'None';
    const x = Python.valueToCode(block, 'X', Python.ORDER_NONE) || 'None';
    return [`${model}.predict(${x})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['datasci_model_save'] = function (block) {
    Python.addImport('import joblib');
    const model = Python.valueToCode(block, 'MODEL', Python.ORDER_NONE) || 'None';
    const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || "''";
    return `joblib.dump(${model}, ${path})\n`;
};

Python.forBlock['datasci_model_load'] = function (block) {
    Python.addImport('import joblib');
    const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || "''";
    return [`joblib.load(${path})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['datasci_model_eval'] = function (block) {
    Python.addImport('from sklearn.metrics import accuracy_score');
    const metrics = Python.valueToCode(block, 'METRICS', Python.ORDER_NONE) || '{}';
    return [`accuracy_score(**${metrics})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['datasci_plot_line'] = function (block) {
    Python.addImport('import matplotlib.pyplot as plt');
    const x = Python.valueToCode(block, 'X', Python.ORDER_NONE) || '[]';
    const y = Python.valueToCode(block, 'Y', Python.ORDER_NONE) || '[]';
    return `plt.plot(${x}, ${y})\nplt.show()\n`;
};

Python.forBlock['datasci_plot_hist'] = function (block) {
    Python.addImport('import matplotlib.pyplot as plt');
    const values = Python.valueToCode(block, 'VALUES', Python.ORDER_NONE) || '[]';
    return `plt.hist(${values})\nplt.show()\n`;
};

Python.forBlock['datasci_plot_scatter'] = function (block) {
    Python.addImport('import matplotlib.pyplot as plt');
    const x = Python.valueToCode(block, 'X', Python.ORDER_NONE) || '[]';
    const y = Python.valueToCode(block, 'Y', Python.ORDER_NONE) || '[]';
    return `plt.scatter(${x}, ${y})\nplt.show()\n`;
};

Python.forBlock['datasci_df_load_csv'] = function (block) {
    Python.addImport('import pandas as pd');
    const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || "''";
    return [`pd.read_csv(${path})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['datasci_df_head'] = function (block) {
    const n = Python.valueToCode(block, 'N', Python.ORDER_NONE) || '5';
    const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'None';
    return [`${df}.head(${n})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['datasci_df_filter'] = function (block) {
    const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'None';
    const condition = Python.valueToCode(block, 'CONDITION', Python.ORDER_NONE) || 'None';
    return [`${df}[${condition}]`, Python.ORDER_MEMBER];
};

Python.forBlock['datasci_df_groupby_agg'] = function (block) {
    const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'None';
    const cols = Python.valueToCode(block, 'COLS', Python.ORDER_NONE) || '[]';
    const ops = Python.valueToCode(block, 'OPS', Python.ORDER_NONE) || '{}';
    return [`${df}.groupby(${cols}).agg(${ops})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['datasci_df_merge'] = function (block) {
    Python.addImport('import pandas as pd');
    const df1 = Python.valueToCode(block, 'DF1', Python.ORDER_NONE) || 'None';
    const df2 = Python.valueToCode(block, 'DF2', Python.ORDER_NONE) || 'None';
    const on = Python.valueToCode(block, 'ON', Python.ORDER_NONE) || 'None';
    return [`pd.merge(${df1}, ${df2}, on=${on})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['datasci_df_to_dict_list'] = function (block) {
    const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'None';
    const format = block.getFieldValue('FORMAT');
    return [`${df}.to_dict(orient='${format}')`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['datasci_df_apply'] = function (block) {
    const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'None';
    const fn = Python.valueToCode(block, 'FN', Python.ORDER_NONE) || 'None';
    return [`${df}.apply(${fn})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['datasci_array_create_from_list'] = function (block) {
    Python.addImport('import numpy as np');
    const list = Python.valueToCode(block, 'LIST', Python.ORDER_NONE) || '[]';
    return [`np.array(${list})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['datasci_array_shape'] = function (block) {
    const array = Python.valueToCode(block, 'ARRAY', Python.ORDER_MEMBER) || 'None';
    return [`${array}.shape`, Python.ORDER_MEMBER];
};

Python.forBlock['datasci_array_reshape'] = function (block) {
    const array = Python.valueToCode(block, 'ARRAY', Python.ORDER_MEMBER) || 'None';
    const shape = Python.valueToCode(block, 'SHAPE', Python.ORDER_NONE) || '()';
    return [`${array}.reshape(${shape})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['datasci_array_sum'] = function (block) {
    const array = Python.valueToCode(block, 'ARRAY', Python.ORDER_MEMBER) || 'None';
    return [`${array}.sum()`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['datasci_array_mean'] = function (block) {
    const array = Python.valueToCode(block, 'ARRAY', Python.ORDER_MEMBER) || 'None';
    return [`${array}.mean()`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['datasci_array_slice'] = function (block) {
    const array = Python.valueToCode(block, 'ARRAY', Python.ORDER_MEMBER) || 'None';
    const indices = Python.valueToCode(block, 'INDICES', Python.ORDER_NONE) || '()';
    return [`${array}[${indices}]`, Python.ORDER_MEMBER];
};

Python.forBlock['datasci_array_dot'] = function (block) {
    Python.addImport('import numpy as np');
    const array1 = Python.valueToCode(block, 'ARRAY1', Python.ORDER_NONE) || 'None';
    const array2 = Python.valueToCode(block, 'ARRAY2', Python.ORDER_NONE) || 'None';
    return [`np.dot(${array1}, ${array2})`, Python.ORDER_FUNCTION_CALL];
};
