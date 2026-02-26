import { pythonGenerator as Python } from 'blockly/python';
Python.forBlock['pandas_sort_values'] = function(block) {
  const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
  const by = Python.valueToCode(block, 'BY', Python.ORDER_ATOMIC) || 'None';
  const ascending = block.getFieldValue('ASCENDING') === 'TRUE';
  return [`${df}.sort_values(by=${by}, ascending=${ascending})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['pandas_shape'] = function(block) {
    const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
    return [`${df}.shape`, Python.ORDER_MEMBER];
};

Python.forBlock['pandas_dtypes'] = function(block) {
    const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
    return [`${df}.dtypes`, Python.ORDER_MEMBER];
};

Python.forBlock['pandas_value_counts'] = function(block) {
    const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
    const col = Python.valueToCode(block, 'COL', Python.ORDER_ATOMIC) || "''";
    return [`${df}[${col}].value_counts()`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['pandas_corr'] = function(block) {
    const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
    return [`${df}.corr()`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['pandas_drop'] = function(block) {
    const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
    const labels = Python.valueToCode(block, 'LABELS', Python.ORDER_ATOMIC) || 'None';
    const axis = block.getFieldValue('AXIS');
    return [`${df}.drop(labels=${labels}, axis=${axis})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['pandas_rename'] = function(block) {
    const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
    const mapper = Python.valueToCode(block, 'MAPPER', Python.ORDER_ATOMIC) || '{}';
    const axis = block.getFieldValue('AXIS');
    return [`${df}.rename(${mapper}, axis='${axis}')`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['pandas_get_columns'] = function(block) {
    const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
    return [`${df}.columns`, Python.ORDER_MEMBER];
};

Python.forBlock['pandas_get_index'] = function(block) {
    const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
    return [`${df}.index`, Python.ORDER_MEMBER];
};

Python.forBlock['pandas_to_numpy'] = function(block) {
    const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
    return [`${df}.to_numpy()`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['pandas_get_dummies'] = function(block) {
    Python.addImport('import pandas as pd');
    const df = Python.valueToCode(block, 'DF', Python.ORDER_ATOMIC) || 'pd.DataFrame()';
    return [`pd.get_dummies(${df})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['pandas_factorize'] = function(block) {
    Python.addImport('import pandas as pd');
    const series = Python.valueToCode(block, 'SERIES', Python.ORDER_ATOMIC) || 'pd.Series()';
    return [`pd.factorize(${series})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['pandas_squeeze'] = function(block) {
    const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
    return [`${df}.squeeze()`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['pandas_compare'] = function(block) {
    const df1 = Python.valueToCode(block, 'DF1', Python.ORDER_MEMBER) || 'pd.DataFrame()';
    const df2 = Python.valueToCode(block, 'DF2', Python.ORDER_ATOMIC) || 'pd.DataFrame()';
    return [`${df1}.compare(${df2})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['pandas_set_index'] = function(block) {
    const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
    const keys = Python.valueToCode(block, 'KEYS', Python.ORDER_ATOMIC) || 'None';
    return [`${df}.set_index(${keys})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['pandas_reset_index'] = function(block) {
    const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
    return [`${df}.reset_index()`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['pandas_reindex'] = function(block) {
    const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
    const labels = Python.valueToCode(block, 'LABELS', Python.ORDER_ATOMIC) || 'None';
    return [`${df}.reindex(${labels})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['pandas_sort_index'] = function(block) {
    const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
    return [`${df}.sort_index()`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['pandas_isin'] = function(block) {
    const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
    const values = Python.valueToCode(block, 'VALUES', Python.ORDER_ATOMIC) || '[]';
    return [`${df}.isin(${values})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['pandas_where'] = function(block) {
    const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
    const cond = Python.valueToCode(block, 'COND', Python.ORDER_ATOMIC) || 'None';
    const other = Python.valueToCode(block, 'OTHER', Python.ORDER_ATOMIC) || 'None';
    return [`${df}.where(${cond}, ${other})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['pandas_mask'] = function(block) {
    const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
    const cond = Python.valueToCode(block, 'COND', Python.ORDER_ATOMIC) || 'None';
    const other = Python.valueToCode(block, 'OTHER', Python.ORDER_ATOMIC) || 'None';
    return [`${df}.mask(${cond}, ${other})`, Python.ORDER_FUNCTION_CALL];
};



Python.forBlock['pandas_drop_duplicates'] = function(block) {
    const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
    const keep = block.getFieldValue('KEEP');
    return [`${df}.drop_duplicates(keep='${keep}')`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['pandas_duplicated'] = function(block) {
    const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
    return [`${df}.duplicated()`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['pandas_astype'] = function(block) {
    const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
    const coerce = block.getFieldValue('COERCE') === 'TRUE';
    if (coerce) {
        Python.addImport('import pandas as pd');
        return [`pd.to_numeric(${df}, errors='coerce')`, Python.ORDER_FUNCTION_CALL];
    } else {
        const type = block.getFieldValue('TYPE');
        return [`${df}.astype('${type}')`, Python.ORDER_FUNCTION_CALL];
    }
};

Python.forBlock['pandas_round'] = function(block) {
    const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
    const decimals = block.getFieldValue('DECIMALS');
    return [`${df}.round(decimals=${decimals})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['pandas_clip'] = function(block) {
    const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
    const min = Python.valueToCode(block, 'MIN', Python.ORDER_ATOMIC) || 'None';
    const max = Python.valueToCode(block, 'MAX', Python.ORDER_ATOMIC) || 'None';
    return [`${df}.clip(lower=${min}, upper=${max})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['pandas_replace'] = function(block) {
    const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
    const old_val = Python.valueToCode(block, 'OLD', Python.ORDER_ATOMIC) || 'None';
    const new_val = Python.valueToCode(block, 'NEW', Python.ORDER_ATOMIC) || 'None';
    return [`${df}.replace(${old_val}, ${new_val})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['pandas_str_strip'] = function(block) {
    const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
    const col = Python.valueToCode(block, 'COL', Python.ORDER_ATOMIC) || "''";
    return [`${df}[${col}].str.strip()`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['pandas_str_replace'] = function(block) {
    const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
    const col = Python.valueToCode(block, 'COL', Python.ORDER_ATOMIC) || "''";
    const old_val = Python.valueToCode(block, 'OLD', Python.ORDER_ATOMIC) || "''";
    const new_val = Python.valueToCode(block, 'NEW', Python.ORDER_ATOMIC) || "''";
    return [`${df}[${col}].str.replace(${old_val}, ${new_val})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['pandas_merge_advanced'] = function(block) {
    Python.addImport('import pandas as pd');
    const left_df = Python.valueToCode(block, 'LEFT_DF', Python.ORDER_ATOMIC) || 'pd.DataFrame()';
    const right_df = Python.valueToCode(block, 'RIGHT_DF', Python.ORDER_ATOMIC) || 'pd.DataFrame()';
    const on = Python.valueToCode(block, 'ON', Python.ORDER_ATOMIC) || 'None';
    const logic = block.getFieldValue('LOGIC');
    if (logic === 'asof') {
        return [`pd.merge_asof(${left_df}, ${right_df}, on=${on})`, Python.ORDER_FUNCTION_CALL];
    } else {
        return [`pd.merge_ordered(${left_df}, ${right_df}, on=${on})`, Python.ORDER_FUNCTION_CALL];
    }
};

Python.forBlock['pandas_pivot'] = function(block) {
    const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
    const index = Python.valueToCode(block, 'INDEX', Python.ORDER_ATOMIC) || 'None';
    const columns = Python.valueToCode(block, 'COLUMNS', Python.ORDER_ATOMIC) || 'None';
    const values = Python.valueToCode(block, 'VALUES', Python.ORDER_ATOMIC) || 'None';
    return [`${df}.pivot(index=${index}, columns=${columns}, values=${values})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['pandas_melt'] = function(block) {
    const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
    const id_vars = Python.valueToCode(block, 'ID_VARS', Python.ORDER_ATOMIC) || 'None';
    const value_vars = Python.valueToCode(block, 'VALUE_VARS', Python.ORDER_ATOMIC) || 'None';
    return [`${df}.melt(id_vars=${id_vars}, value_vars=${value_vars})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['pandas_explode'] = function(block) {
    const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
    const column = Python.valueToCode(block, 'COLUMN', Python.ORDER_ATOMIC) || 'None';
    return [`${df}.explode(${column})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['pandas_transpose'] = function(block) {
    const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
    return [`${df}.T`, Python.ORDER_MEMBER];
};

Python.forBlock['pandas_crosstab'] = function(block) {
    Python.addImport('import pandas as pd');
    const index = Python.valueToCode(block, 'INDEX', Python.ORDER_ATOMIC) || 'None';
    const columns = Python.valueToCode(block, 'COLUMNS', Python.ORDER_ATOMIC) || 'None';
    return [`pd.crosstab(index=${index}, columns=${columns})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['pandas_apply'] = function(block) {
    const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
    const func = Python.valueToCode(block, 'FUNC', Python.ORDER_NONE) || 'None';
    const axis = block.getFieldValue('AXIS');
    return [`${df}.apply(${func}, axis=${axis})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['pandas_pivot_table'] = function(block) {
    Python.addImport('import pandas as pd');
    const df = Python.valueToCode(block, 'DF', Python.ORDER_NONE) || 'pd.DataFrame()';
    const values = Python.valueToCode(block, 'VALUES', Python.ORDER_NONE) || 'None';
    const index = Python.valueToCode(block, 'INDEX', Python.ORDER_NONE) || 'None';
    const columns = Python.valueToCode(block, 'COLUMNS', Python.ORDER_NONE) || 'None';
    const code = `pd.pivot_table(${df}, values=${values}, index=${index}, columns=${columns})`;
    return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['pandas_to_datetime'] = function(block) {
    Python.addImport('import pandas as pd');
    const arg = Python.valueToCode(block, 'ARG', Python.ORDER_NONE);
    const errors = block.getFieldValue('ERRORS');
    return [`pd.to_datetime(${arg}, errors='${errors}')`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['pandas_to_dict'] = function(block) {
    const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
    return [`${df}.to_dict()`, Python.ORDER_FUNCTION_CALL];
};


Python.forBlock['pandas_ndim'] = function(block) {
    const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
    return [`${df}.ndim`, Python.ORDER_MEMBER];
};

Python.forBlock['pandas_size'] = function(block) {
    const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
    return [`${df}.size`, Python.ORDER_MEMBER];
};

Python.forBlock['pandas_axes'] = function(block) {
    const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
    return [`${df}.axes`, Python.ORDER_MEMBER];
};

Python.forBlock['pandas_memory_usage'] = function(block) {
    const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
    return [`${df}.memory_usage()`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['pandas_idxmin'] = function(block) {
    const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
    return [`${df}.idxmin()`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['pandas_idxmax'] = function(block) {
    const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
    return [`${df}.idxmax()`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['pandas_unique'] = function(block) {
    const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
    const col = Python.valueToCode(block, 'COL', Python.ORDER_ATOMIC) || "''";
    return [`${df}[${col}].unique()`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['pandas_nunique'] = function(block) {
    const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
    const col = Python.valueToCode(block, 'COL', Python.ORDER_ATOMIC) || "''";
    return [`${df}[${col}].nunique()`, Python.ORDER_FUNCTION_CALL];
};


Python.forBlock['pandas_interval'] = function(block) {
  Python.addImport('import pandas as pd');
  const left = Python.valueToCode(block, 'LEFT', Python.ORDER_ATOMIC) || '0';
  const right = Python.valueToCode(block, 'RIGHT', Python.ORDER_ATOMIC) || '0';
  const closed = block.getFieldValue('CLOSED');
  return [`pd.Interval(${left}, ${right}, closed='${closed}')`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['pandas_windowing'] = function(block) {
  Python.addImport('import pandas as pd');
  const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
  const operation = block.getFieldValue('OPERATION');
  const size = Python.valueToCode(block, 'SIZE', Python.ORDER_ATOMIC) || 'None';
  const agg_func = block.getFieldValue('AGG_FUNC');
  return [`${df}.${operation}(${size}).${agg_func}()`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['pandas_resample'] = function(block) {
  Python.addImport('import pandas as pd');
  const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
  const rule = Python.valueToCode(block, 'RULE', Python.ORDER_ATOMIC) || "''";
  const agg_func = block.getFieldValue('AGG_FUNC');
  return [`${df}.resample(${rule}).${agg_func}()`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['pandas_time_series_operations'] = function(block) {
  Python.addImport('import pandas as pd');
  const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
  const operation = block.getFieldValue('OPERATION');
  const periods = Python.valueToCode(block, 'PERIODS', Python.ORDER_ATOMIC) || '1';
  return [`${df}.${operation}(periods=${periods})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['pandas_first_last'] = function(block) {
  Python.addImport('import pandas as pd');
  const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
  const operation = block.getFieldValue('OPERATION');
  const offset = Python.valueToCode(block, 'OFFSET', Python.ORDER_ATOMIC) || "''";
  return [`${df}.${operation}(${offset})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['pandas_set_freq'] = function(block) {
  Python.addImport('import pandas as pd');
  const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
  const freq = Python.valueToCode(block, 'FREQ', Python.ORDER_ATOMIC) || "''";
  return [`${df}.asfreq(${freq})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['dataframe_peek'] = function(block) {
  Python.addImport('import pandas as pd');
  const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
  const operation = block.getFieldValue('OPERATION');
  const n = block.getFieldValue('N');
  return [`${df}.${operation}(${n})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['missing_data_handler'] = function(block) {
  Python.addImport('import pandas as pd');
  const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
  const operation = block.getFieldValue('OPERATION');

  if (operation === 'isnull' || operation === 'notnull' || operation === 'interpolate') {
    return [`${df}.${operation}()`, Python.ORDER_FUNCTION_CALL];
  }

  if (operation === 'isnull_sum') {
    return [`${df}.isnull().sum()`, Python.ORDER_FUNCTION_CALL];
  }

  if (operation === 'dropna') {
    return [`${df}.dropna()`, Python.ORDER_FUNCTION_CALL];
  }

  if (operation === 'fillna') {
    const value = Python.valueToCode(block, 'VALUE', Python.ORDER_ATOMIC) || 'None';
    const method = block.getFieldValue('METHOD_DROPDOWN');
    if (method !== 'none') {
      return [`${df}.fillna(method='${method}')`, Python.ORDER_FUNCTION_CALL];
    }
    return [`${df}.fillna(value=${value})`, Python.ORDER_FUNCTION_CALL];
  }
};

Python.forBlock['series_str_accessor'] = function(block) {
  const series = Python.valueToCode(block, 'SERIES', Python.ORDER_MEMBER) || 'pd.Series()';
  const operation = block.getFieldValue('OPERATION');

  if (['lower', 'upper', 'strip', 'len', 'capitalize', 'title', 'swapcase', 'isnumeric', 'isalpha', 'isdigit', 'islower', 'isupper'].includes(operation)) {
    return [`${series}.str.${operation}()`, Python.ORDER_FUNCTION_CALL];
  }

  if (operation === 'get') {
    const index = Python.valueToCode(block, 'INDEX', Python.ORDER_ATOMIC) || '0';
    return [`${series}.str.get(${index})`, Python.ORDER_FUNCTION_CALL];
  }

  if (operation === 'contains' || operation === 'extract' || operation === 'findall') {
    const pattern = Python.valueToCode(block, 'PATTERN', Python.ORDER_ATOMIC) || "''";
    return [`${series}.str.${operation}(${pattern})`, Python.ORDER_FUNCTION_CALL];
  }

  if (operation === 'replace') {
    const old_val = Python.valueToCode(block, 'OLD', Python.ORDER_ATOMIC) || "''";
    const new_val = Python.valueToCode(block, 'NEW', Python.ORDER_ATOMIC) || "''";
    return [`${series}.str.replace(${old_val}, ${new_val})`, Python.ORDER_FUNCTION_CALL];
  }

  if (operation === 'split') {
    const separator = Python.valueToCode(block, 'SEPARATOR', Python.ORDER_ATOMIC) || "''";
    return [`${series}.str.split(${separator})`, Python.ORDER_FUNCTION_CALL];
  }
};

Python.forBlock['series_cat_accessor'] = function(block) {
  const series = Python.valueToCode(block, 'SERIES', Python.ORDER_MEMBER) || 'pd.Series()';
  const operation = block.getFieldValue('OPERATION');

  if (operation === 'add_categories' || operation === 'remove_categories' || operation === 'reorder_categories') {
    const categories = Python.valueToCode(block, 'CATEGORIES', Python.ORDER_ATOMIC) || '[]';
    return [`${series}.cat.${operation}(${categories})`, Python.ORDER_FUNCTION_CALL];
  }

  return [`${series}.cat.${operation}`, Python.ORDER_MEMBER];
};

Python.forBlock['pandas_astype_category'] = function(block) {
  const series = Python.valueToCode(block, 'SERIES', Python.ORDER_MEMBER) || 'pd.Series()';
  return [`${series}.astype('category')`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['dataframe_xs'] = function(block) {
  const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
  const key = Python.valueToCode(block, 'KEY', Python.ORDER_ATOMIC) || 'None';
  return [`${df}.xs(${key})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['dataframe_pipe'] = function(block) {
  const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
  const func = Python.valueToCode(block, 'FUNC', Python.ORDER_ATOMIC) || 'None';
  return [`${df}.pipe(${func})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['pandas_eval'] = function(block) {
  Python.addImport('import pandas as pd');
  const expr = Python.valueToCode(block, 'EXPR', Python.ORDER_ATOMIC) || 'None';
  return `pd.eval(${expr})\n`;
};

Python.forBlock['pandas_json_normalize'] = function(block) {
  Python.addImport('import pandas as pd');
  const json = Python.valueToCode(block, 'JSON', Python.ORDER_ATOMIC) || "'{}'";
  return [`pd.json_normalize(${json})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['series_map'] = function(block) {
  const series = Python.valueToCode(block, 'SERIES', Python.ORDER_MEMBER) || 'pd.Series()';
  const arg = Python.valueToCode(block, 'ARG', Python.ORDER_ATOMIC) || '{}';
  return [`${series}.map(${arg})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['combine_dataframes'] = function(block) {
  Python.addImport('import pandas as pd');
  const operation = block.getFieldValue('OPERATION');

  if (operation === 'MERGE') {
    const left = Python.valueToCode(block, 'ARG1', Python.ORDER_ATOMIC) || 'pd.DataFrame()';
    const right = Python.valueToCode(block, 'ARG2', Python.ORDER_ATOMIC) || 'pd.DataFrame()';
    const how = block.getFieldValue('HOW');
    const on = Python.valueToCode(block, 'ARG4', Python.ORDER_ATOMIC) || 'None';
    return [`pd.merge(${left}, ${right}, how='${how}', on=${on})`, Python.ORDER_FUNCTION_CALL];
  } else if (operation === 'JOIN') {
    const left = Python.valueToCode(block, 'ARG1', Python.ORDER_MEMBER) || 'pd.DataFrame()';
    const right = Python.valueToCode(block, 'ARG2', Python.ORDER_ATOMIC) || 'pd.DataFrame()';
    const how = block.getFieldValue('HOW');
    return [`${left}.join(${right}, how='${how}')`, Python.ORDER_FUNCTION_CALL];
  } else if (operation === 'CONCAT') {
    const dfs = Python.valueToCode(block, 'ARG1', Python.ORDER_ATOMIC) || '[]';
    const axis = block.getFieldValue('AXIS');
    return [`pd.concat(${dfs}, axis=${axis})`, Python.ORDER_FUNCTION_CALL];
  }
};

Python.forBlock['dataframe_swaplevel'] = function(block) {
  const i = Python.valueToCode(block, 'I', Python.ORDER_ATOMIC) || '0';
  const j = Python.valueToCode(block, 'J', Python.ORDER_ATOMIC) || '1';
  const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
  return [`${df}.swaplevel(${i}, ${j})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['dataframe_droplevel'] = function(block) {
  const level = Python.valueToCode(block, 'LEVEL', Python.ORDER_ATOMIC) || '0';
  const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
  return [`${df}.droplevel(${level})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['dataframe_set_names'] = function(block) {
  const names = Python.valueToCode(block, 'NAMES', Python.ORDER_ATOMIC) || '[]';
  const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
  return [`${df}.set_names(${names})`, Python.ORDER_FUNCTION_CALL];
};


Python.forBlock['pandas_plot'] = function(block) {
  const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
  const plotType = block.getFieldValue('PLOT_TYPE');

  if (plotType === 'hist' || plotType === 'box') {
    return `${df}.${plotType}()\n`;
  }

  let code = `${df}.plot(kind='${plotType}'`;
  if (plotType === 'scatter') {
    const x_col = block.getFieldValue('X_COL');
    const y_col = block.getFieldValue('Y_COL');
    code += `, x='${x_col}', y='${y_col}'`;
  }
  code += ')\n';
  return code;
};

Python.forBlock['dataframe_select_dtypes'] = function(block) {
  const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
  const dtype = block.getFieldValue('DTYPE');
  return [`${df}.select_dtypes(include=['${dtype}'])`, Python.ORDER_FUNCTION_CALL];
};


Python.forBlock['validate_property'] = function(block) {
  const series = Python.valueToCode(block, 'SERIES', Python.ORDER_MEMBER) || 'pd.Series()';
  const property = block.getFieldValue('PROPERTY');
  return [`${series}.${property}`, Python.ORDER_MEMBER];
};

Python.forBlock['dataframe_iterrows'] = function(block) {
  const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
  return [`${df}.iterrows()`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['dataframe_itertuples'] = function(block) {
  const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
  return [`${df}.itertuples()`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['dataframe_applymap'] = function(block) {
  const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
  const func = Python.valueToCode(block, 'FUNC', Python.ORDER_ATOMIC) || 'None';
  return [`${df}.applymap(${func})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['dataframe_simple_statistic'] = function(block) {
  const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
  const stat = block.getFieldValue('STAT');

  if (stat === 'quantile') {
    const q = Python.valueToCode(block, 'QUANTILE', Python.ORDER_ATOMIC) || '0.5';
    return [`${df}.quantile(q=${q})`, Python.ORDER_FUNCTION_CALL];
  }

  return [`${df}.${stat}()`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['dataframe_property_or_metadata'] = function(block) {
  const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
  const property = block.getFieldValue('PROPERTY');

  if (property === 'info' || property === 'describe') {
    return `${df}.${property}()\n`;
  }

  return [`${df}.${property}`, Python.ORDER_MEMBER];
};

Python.forBlock['pandas_stack_unstack'] = function(block) {
  const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
  const operation = block.getFieldValue('OPERATION');
  return [`${df}.${operation}()`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['pandas_period_index'] = function(block) {
  Python.addImport('import pandas as pd');
  const data = Python.valueToCode(block, 'DATA', Python.ORDER_ATOMIC) || '[]';
  return [`pd.PeriodIndex(${data})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['pandas_timedelta_index'] = function(block) {
  Python.addImport('import pandas as pd');
  const data = Python.valueToCode(block, 'DATA', Python.ORDER_ATOMIC) || '[]';
  return [`pd.TimedeltaIndex(${data})`, Python.ORDER_FUNCTION_CALL];
};


Python.forBlock['pandas_manage_option'] = function(block) {
  Python.addImport('import pandas as pd');
  const operation = block.getFieldValue('OPERATION');
  const option = block.getFieldValue('OPTION');

  if (operation === 'SET') {
    const value = Python.valueToCode(block, 'VALUE', Python.ORDER_ATOMIC) || 'None';
    return `pd.set_option('${option}', ${value})\n`;
  } else if (operation === 'GET') {
    return [`pd.get_option('${option}')`, Python.ORDER_FUNCTION_CALL];
  } else { // RESET
    return `pd.reset_option('${option}')\n`;
  }
};

Python.forBlock['pandas_io_format_transfer'] = function(block) {
  Python.addImport('import pandas as pd');
  const operation = block.getFieldValue('OPERATION');
  const format = block.getFieldValue('FORMAT').toLowerCase();

  if (operation === 'WRITE') {
    const df = Python.valueToCode(block, 'DF_INPUT', Python.ORDER_MEMBER) || 'pd.DataFrame()';
    if (format === 'sql') {
      const table = Python.valueToCode(block, 'TABLE', Python.ORDER_ATOMIC) || "''";
      const conn = Python.valueToCode(block, 'CONN', Python.ORDER_ATOMIC) || 'None';
      return `${df}.to_sql(${table}, ${conn}, if_exists='replace', index=False)\n`;
    } else {
      const path = Python.valueToCode(block, 'PATH', Python.ORDER_ATOMIC) || "''";
      return `${df}.to_${format}(${path}, index=False)\n`;
    }
  } else { // READ
    if (format === 'sql') {
      const table = Python.valueToCode(block, 'TABLE', Python.ORDER_ATOMIC) || "''";
      const conn = Python.valueToCode(block, 'CONN', Python.ORDER_ATOMIC) || 'None';
      return [`pd.read_sql(${table}, ${conn})`, Python.ORDER_FUNCTION_CALL];
    } else {
      const path = Python.valueToCode(block, 'PATH', Python.ORDER_ATOMIC) || "''";
      return [`pd.read_${format}(${path})`, Python.ORDER_FUNCTION_CALL];
    }
  }
};

Python.forBlock['pandas_structure_factory'] = function(block) {
  Python.addImport('import pandas as pd');
  const structureType = block.getFieldValue('STRUCTURE_TYPE');

  switch (structureType) {
    case 'DATAFRAME':
      const dict = Python.valueToCode(block, 'DICT', Python.ORDER_ATOMIC) || '{}';
      return [`pd.DataFrame(${dict})`, Python.ORDER_FUNCTION_CALL];
    case 'SERIES':
      const data = Python.valueToCode(block, 'DATA', Python.ORDER_ATOMIC) || '[]';
      const index = Python.valueToCode(block, 'INDEX', Python.ORDER_ATOMIC) || 'None';
      return [`pd.Series(${data}, index=${index})`, Python.ORDER_FUNCTION_CALL];
    case 'INDEX':
      const dataForIndex = Python.valueToCode(block, 'DATA', Python.ORDER_ATOMIC) || '[]';
      return [`pd.Index(${dataForIndex})`, Python.ORDER_FUNCTION_CALL];
    case 'MULTIINDEX':
      const tuples = Python.valueToCode(block, 'TUPLES', Python.ORDER_ATOMIC) || '[]';
      return [`pd.MultiIndex.from_tuples(${tuples})`, Python.ORDER_FUNCTION_CALL];
    case 'DATERANGE':
      const start = Python.valueToCode(block, 'START', Python.ORDER_ATOMIC) || 'None';
      const end = Python.valueToCode(block, 'END', Python.ORDER_ATOMIC) || 'None';
      const freq = block.getFieldValue('FREQ');
      return [`pd.date_range(start=${start}, end=${end}, freq='${freq}')`, Python.ORDER_FUNCTION_CALL];
    case 'TIMEDELTA':
      const value = Python.valueToCode(block, 'VALUE', Python.ORDER_ATOMIC) || '0';
      const unit = block.getFieldValue('UNIT');
      return [`pd.Timedelta(${value}, unit='${unit}')`, Python.ORDER_FUNCTION_CALL];
    case 'INTERVAL':
      const left = Python.valueToCode(block, 'LEFT', Python.ORDER_ATOMIC) || '0';
      const right = Python.valueToCode(block, 'RIGHT', Python.ORDER_ATOMIC) || '0';
      const closed = block.getFieldValue('CLOSED');
      return [`pd.Interval(${left}, ${right}, closed='${closed}')`, Python.ORDER_FUNCTION_CALL];
    case 'PERIODINDEX':
      const dataForPeriodIndex = Python.valueToCode(block, 'DATA', Python.ORDER_ATOMIC) || '[]';
      return [`pd.PeriodIndex(${dataForPeriodIndex})`, Python.ORDER_FUNCTION_CALL];
    case 'TIMEDELTAINDEX':
      const dataForTimedeltaIndex = Python.valueToCode(block, 'DATA', Python.ORDER_ATOMIC) || '[]';
      return [`pd.TimedeltaIndex(${dataForTimedeltaIndex})`, Python.ORDER_FUNCTION_CALL];
  }
};

Python.forBlock['timeseries_dt_accessor_unified'] = function(block) {
  const series = Python.valueToCode(block, 'SERIES', Python.ORDER_MEMBER) || 'pd.Series()';
  const operation = block.getFieldValue('OPERATION');

  if (['year', 'month', 'day', 'hour', 'minute', 'second', 'microsecond', 'nanosecond', 'dayofweek', 'weekday', 'isoweekday', 'day_name', 'dayofyear', 'month_name', 'quarter', 'weekofyear', 'date', 'time', 'tz', 'days', 'seconds', 'is_month_start', 'is_month_end', 'is_quarter_start', 'is_quarter_end', 'is_year_start', 'is_year_end'].includes(operation)) {
    return [`${series}.dt.${operation}`, Python.ORDER_MEMBER];
  }

  if (['to_period', 'to_timestamp', 'normalize', 'isocalendar'].includes(operation)) {
    return [`${series}.dt.${operation}()`, Python.ORDER_FUNCTION_CALL];
  }

  if (operation === 'tz_localize' || operation === 'tz_convert') {
    const tz = Python.valueToCode(block, 'TZ', Python.ORDER_ATOMIC) || 'None';
    return [`${series}.dt.${operation}(${tz})`, Python.ORDER_FUNCTION_CALL];
  }

  if (operation === 'strftime') {
    const format = Python.valueToCode(block, 'FORMAT', Python.ORDER_ATOMIC) || "''";
    return [`${series}.dt.strftime(${format})`, Python.ORDER_FUNCTION_CALL];
  }
};

Python.forBlock['dataframe_data_selector'] = function(block) {
  const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
  const accessMethod = block.getFieldValue('ACCESS_METHOD');

  switch (accessMethod) {
    case 'COLUMN':
      const col = Python.valueToCode(block, 'COL', Python.ORDER_ATOMIC) || "''";
      return [`${df}[${col}]`, Python.ORDER_MEMBER];
    case 'LOC':
      const rowsLoc = Python.valueToCode(block, 'ROWS', Python.ORDER_ATOMIC) || ':';
      const colsLoc = Python.valueToCode(block, 'COLS', Python.ORDER_ATOMIC) || ':';
      return [`${df}.loc[${rowsLoc}, ${colsLoc}]`, Python.ORDER_MEMBER];
    case 'ILOC':
      const rowsIloc = Python.valueToCode(block, 'ROWS', Python.ORDER_ATOMIC) || ':';
      const colsIloc = Python.valueToCode(block, 'COLS', Python.ORDER_ATOMIC) || ':';
      return [`${df}.iloc[${rowsIloc}, ${colsIloc}]`, Python.ORDER_MEMBER];
    case 'FILTER':
      const condition = Python.valueToCode(block, 'CONDITION', Python.ORDER_ATOMIC) || 'None';
      return [`${df}[${condition}]`, Python.ORDER_MEMBER];
    case 'TAKE':
      const indices = Python.valueToCode(block, 'INDICES', Python.ORDER_ATOMIC) || '[]';
      return [`${df}.take(${indices})`, Python.ORDER_FUNCTION_CALL];
  }
};

Python.forBlock['pandas_groupby'] = function(block) {
  const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
  const by = Python.valueToCode(block, 'BY', Python.ORDER_ATOMIC) || 'None';
  const operation = block.getFieldValue('OPERATION');

  let code = `${df}.groupby(${by})`;

  if (operation === 'agg') {
    const agg = Python.valueToCode(block, 'AGG_INPUT', Python.ORDER_ATOMIC) || '{}';
    code += `.agg(${agg})`;
  } else if (operation === 'transform' || operation === 'filter') {
    const func = Python.valueToCode(block, 'FUNC_INPUT', Python.ORDER_ATOMIC) || 'None';
    code += `.${operation}(${func})`;
  } else {
    code += `.${operation}()`;
  }

  if (operation === 'ngroups') {
      return [code.replace('()', ''), Python.ORDER_MEMBER];
  }

  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['pandas_date_offset'] = function(block) {
  Python.addImport('import pandas as pd');
  const kwargs = Python.valueToCode(block, 'KWARGS', Python.ORDER_ATOMIC) || '{}';
  return [`pd.DateOffset(**${kwargs})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['dataframe_items'] = function(block) {
  const df = Python.valueToCode(block, 'DF', Python.ORDER_MEMBER) || 'pd.DataFrame()';
  return [`${df}.items()`, Python.ORDER_FUNCTION_CALL];
};