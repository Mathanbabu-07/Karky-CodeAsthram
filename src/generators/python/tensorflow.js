import { pythonGenerator as Python } from 'blockly/python';
// --- Existing Generators (Enhanced) ---

Python.forBlock['tensorflow_keras_sequential_model'] = function(block) {
  Python.addImport('from tensorflow.keras.models import Sequential');
  const layers = Python.statementToCode(block, 'LAYERS');
  const code = `Sequential([\n${layers}\n])`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['tensorflow_keras_add_dense_layer'] = function(block) {
  Python.addImport('from tensorflow.keras.layers import Dense');
  const units = block.getFieldValue('UNITS');
  const activation = block.getFieldValue('ACTIVATION');
  const code = `Dense(units=${units}, activation='${activation}'),\n`;
  return code;
};

Python.forBlock['tensorflow_keras_compile_model'] = function(block) {
  const model = Python.valueToCode(block, 'MODEL', Python.ORDER_ATOMIC) || 'None';
  const optimizer = block.getFieldValue('OPTIMIZER');
  const loss = block.getFieldValue('LOSS');
  const metrics = Python.valueToCode(block, 'METRICS', Python.ORDER_ATOMIC) || '[]';
  const code = `${model}.compile(optimizer='${optimizer}', loss='${loss}', metrics=${metrics})\n`;
  return code;
};

Python.forBlock['tensorflow_keras_fit_model'] = function(block) {
  const model = Python.valueToCode(block, 'MODEL', Python.ORDER_ATOMIC) || 'None';
  const x = Python.valueToCode(block, 'X', Python.ORDER_ATOMIC) || 'None';
  const y = Python.valueToCode(block, 'Y', Python.ORDER_ATOMIC) || 'None';
  const epochs = block.getFieldValue('EPOCHS');
  const batch_size = block.getFieldValue('BATCH_SIZE');
  const callbacks = Python.valueToCode(block, 'CALLBACKS', Python.ORDER_ATOMIC) || '[]';
  const code = `${model}.fit(${x}, ${y}, epochs=${epochs}, batch_size=${batch_size}, callbacks=${callbacks})\n`;
  return code;
};

// --- Model Management ---

Python.forBlock['keras_model_to_json'] = function(block) {
  const model = Python.valueToCode(block, 'MODEL', Python.ORDER_ATOMIC) || 'None';
  const code = `${model}.to_json()`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['keras_model_from_json'] = function(block) {
  Python.addImport('from tensorflow.keras.models import model_from_json');
  const json_string = Python.valueToCode(block, 'JSON_STRING', Python.ORDER_ATOMIC) || '""';
  const code = `model_from_json(${json_string})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['keras_save_model'] = function(block) {
  const model = Python.valueToCode(block, 'MODEL', Python.ORDER_ATOMIC) || 'None';
  const filepath = Python.valueToCode(block, 'FILEPATH', Python.ORDER_ATOMIC) || '""';
  return `${model}.save(${filepath})\n`;
};

Python.forBlock['keras_load_model'] = function(block) {
  Python.addImport('from tensorflow.keras.models import load_model');
  const filepath = Python.valueToCode(block, 'FILEPATH', Python.ORDER_ATOMIC) || '""';
  const code = `load_model(${filepath})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

// --- Layers ---

Python.forBlock['keras_layer_conv2d'] = function(block) {
  Python.addImport('from tensorflow.keras.layers import Conv2D');
  const filters = block.getFieldValue('FILTERS');
  const kernel_size = Python.valueToCode(block, 'KERNEL_SIZE', Python.ORDER_ATOMIC) || '(3, 3)';
  const activation = block.getFieldValue('ACTIVATION');
  const code = `Conv2D(filters=${filters}, kernel_size=${kernel_size}, activation='${activation}'),\n`;
  return code;
};

Python.forBlock['keras_layer_maxpooling2d'] = function(block) {
  Python.addImport('from tensorflow.keras.layers import MaxPooling2D');
  const pool_size = Python.valueToCode(block, 'POOL_SIZE', Python.ORDER_ATOMIC) || '(2, 2)';
  const code = `MaxPooling2D(pool_size=${pool_size}),\n`;
  return code;
};

Python.forBlock['keras_layer_flatten'] = function(block) {
  Python.addImport('from tensorflow.keras.layers import Flatten');
  return 'Flatten(),\n';
};

Python.forBlock['keras_layer_dropout'] = function(block) {
  Python.addImport('from tensorflow.keras.layers import Dropout');
  const rate = block.getFieldValue('RATE');
  const code = `Dropout(${rate}),\n`;
  return code;
};

Python.forBlock['keras_layer_embedding'] = function(block) {
  Python.addImport('from tensorflow.keras.layers import Embedding');
  const input_dim = block.getFieldValue('INPUT_DIM');
  const output_dim = block.getFieldValue('OUTPUT_DIM');
  const code = `Embedding(input_dim=${input_dim}, output_dim=${output_dim}),\n`;
  return code;
};

Python.forBlock['keras_layer_lstm'] = function(block) {
  Python.addImport('from tensorflow.keras.layers import LSTM');
  const units = block.getFieldValue('UNITS');
  const code = `LSTM(${units}),\n`;
  return code;
};

// --- Callbacks ---

Python.forBlock['keras_callback_earlystopping'] = function(block) {
  Python.addImport('from tensorflow.keras.callbacks import EarlyStopping');
  const monitor = block.getFieldValue('MONITOR');
  const patience = block.getFieldValue('PATIENCE');
  const code = `EarlyStopping(monitor='${monitor}', patience=${patience})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['keras_callback_modelcheckpoint'] = function(block) {
  Python.addImport('from tensorflow.keras.callbacks import ModelCheckpoint');
  const filepath = Python.valueToCode(block, 'FILEPATH', Python.ORDER_ATOMIC) || '""';
  const monitor = block.getFieldValue('MONITOR');
  const code = `ModelCheckpoint(filepath=${filepath}, monitor='${monitor}')`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

// --- Data Loading ---

Python.forBlock['keras_image_dataset_from_directory'] = function(block) {
  Python.addImport('from tensorflow.keras.utils import image_dataset_from_directory');
  const directory = Python.valueToCode(block, 'DIRECTORY', Python.ORDER_ATOMIC) || '""';
  const image_size = Python.valueToCode(block, 'IMAGE_SIZE', Python.ORDER_ATOMIC) || '(256, 256)';
  const batch_size = block.getFieldValue('BATCH_SIZE');
  const code = `image_dataset_from_directory(${directory}, image_size=${image_size}, batch_size=${batch_size})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};