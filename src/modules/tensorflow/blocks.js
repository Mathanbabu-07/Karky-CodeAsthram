import * as Blockly from 'blockly';

Blockly.defineBlocksWithJsonArray([
  {
    'type': 'tensorflow_keras_sequential_model',
    'message0': 'create sequential Keras model %1',
    'args0': [{
        'type': 'input_statement',
        'name': 'LAYERS'
      }],
    'output': 'Model',
    'colour': '#FF7043',
    'tooltip': 'Creates a Keras Sequential model.',
    'helpUrl': 'https://www.tensorflow.org/api_docs/python/tf/keras/Sequential'
  },
  {
    'type': 'tensorflow_keras_add_dense_layer',
    'message0': 'add dense layer with %1 units and %2 activation',
    'args0': [
      {
        'type': 'field_number',
        'name': 'UNITS',
        'value': 64,
        'min': 1
      },
      {
        'type': 'field_dropdown',
        'name': 'ACTIVATION',
        'options': [
          [
            'relu',
            'relu'
          ],
          [
            'sigmoid',
            'sigmoid'
          ],
          [
            'softmax',
            'softmax'
          ],
          [
            'tanh',
            'tanh'
          ],
          [
            'linear',
            'linear'
          ]
        ]
      }
    ],
    'previousStatement': null,
    'nextStatement': null,
    'colour': '#FF7043',
    'tooltip': 'Adds a Dense layer to the Keras model.',
    'helpUrl': 'https://www.tensorflow.org/api_docs/python/tf/keras/layers/Dense'
  },
  {
    'type': 'tensorflow_keras_compile_model',
    'message0': 'compile Keras model %1',
    'args0': [{
        'type': 'input_value',
        'name': 'MODEL',
        'check': 'Model'
      }],
    'message1': 'optimizer %1 loss %2',
    'args1': [
      {
        'type': 'field_dropdown',
        'name': 'OPTIMIZER',
        'options': [
          [
            'adam',
            'adam'
          ],
          [
            'sgd',
            'sgd'
          ],
          [
            'rmsprop',
            'rmsprop'
          ],
          [
            'adagrad',
            'adagrad'
          ],
          [
            'nadam',
            'nadam'
          ]
        ]
      },
      {
        'type': 'field_dropdown',
        'name': 'LOSS',
        'options': [
          [
            'sparse_categorical_crossentropy',
            'sparse_categorical_crossentropy'
          ],
          [
            'categorical_crossentropy',
            'categorical_crossentropy'
          ],
          [
            'binary_crossentropy',
            'binary_crossentropy'
          ],
          [
            'mean_squared_error',
            'mean_squared_error'
          ],
          [
            'mean_absolute_error',
            'mean_absolute_error'
          ]
        ]
      }
    ],
    'message2': 'metrics %1',
    'args2': [{
        'type': 'input_value',
        'name': 'METRICS',
        'check': 'Array'
      }],
    'inputsInline': false,
    'previousStatement': null,
    'nextStatement': null,
    'colour': '#FF7043',
    'tooltip': 'Configures the model for training.',
    'helpUrl': 'https://www.tensorflow.org/api_docs/python/tf/keras/Model#compile'
  },
  {
    'type': 'tensorflow_keras_fit_model',
    'message0': 'fit Keras model %1 to data %2 labels %3',
    'args0': [
      {
        'type': 'input_value',
        'name': 'MODEL',
        'check': 'Model'
      },
      {
        'type': 'input_value',
        'name': 'X',
        'check': [
          'Array',
          'DataFrame'
        ]
      },
      {
        'type': 'input_value',
        'name': 'Y',
        'check': [
          'Array',
          'DataFrame'
        ]
      }
    ],
    'message1': 'epochs %1 batch size %2',
    'args1': [
      {
        'type': 'field_number',
        'name': 'EPOCHS',
        'value': 10,
        'min': 1
      },
      {
        'type': 'field_number',
        'name': 'BATCH_SIZE',
        'value': 32,
        'min': 1
      }
    ],
    'message2': 'callbacks %1',
    'args2': [{
        'type': 'input_value',
        'name': 'CALLBACKS',
        'check': 'Array'
      }],
    'previousStatement': null,
    'nextStatement': null,
    'colour': '#FF7043',
    'tooltip': 'Trains the model for a fixed number of epochs (iterations on a dataset).',
    'helpUrl': 'https://www.tensorflow.org/api_docs/python/tf/keras/Model#fit'
  },
  {
    'type': 'keras_model_to_json',
    'message0': 'convert keras model %1 to JSON',
    'args0': [{
        'type': 'input_value',
        'name': 'MODEL',
        'check': 'Model'
      }],
    'output': 'String',
    'colour': '#FF7043',
    'tooltip': 'Serializes the model architecture to a JSON string.',
    'helpUrl': 'https://www.tensorflow.org/api_docs/python/tf/keras/Model#to_json'
  },
  {
    'type': 'keras_model_from_json',
    'message0': 'create keras model from JSON %1',
    'args0': [{
        'type': 'input_value',
        'name': 'JSON_STRING',
        'check': 'String'
      }],
    'output': 'Model',
    'colour': '#FF7043',
    'tooltip': 'Parses a JSON model configuration file and returns a model instance.',
    'helpUrl': 'https://www.tensorflow.org/api_docs/python/tf/keras/models/model_from_json'
  },
  {
    'type': 'keras_save_model',
    'message0': 'save keras model %1 to file %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'MODEL',
        'check': 'Model'
      },
      {
        'type': 'input_value',
        'name': 'FILEPATH',
        'check': 'String'
      }
    ],
    'previousStatement': null,
    'nextStatement': null,
    'colour': '#FF7043',
    'tooltip': 'Saves a model as a TensorFlow SavedModel or a single HDF5 file.',
    'helpUrl': 'https://www.tensorflow.org/api_docs/python/tf/keras/Model#save'
  },
  {
    'type': 'keras_load_model',
    'message0': 'load keras model from file %1',
    'args0': [{
        'type': 'input_value',
        'name': 'FILEPATH',
        'check': 'String'
      }],
    'output': 'Model',
    'colour': '#FF7043',
    'tooltip': 'Loads a model saved via model.save().',
    'helpUrl': 'https://www.tensorflow.org/api_docs/python/tf/keras/models/load_model'
  },
  {
    'type': 'keras_layer_conv2d',
    'message0': 'add Conv2D layer with %1 filters, kernel size %2, activation %3',
    'args0': [
      {
        'type': 'field_number',
        'name': 'FILTERS',
        'value': 32,
        'min': 1
      },
      {
        'type': 'input_value',
        'name': 'KERNEL_SIZE',
        'check': 'Array'
      },
      {
        'type': 'field_dropdown',
        'name': 'ACTIVATION',
        'options': [
          [
            'relu',
            'relu'
          ],
          [
            'sigmoid',
            'sigmoid'
          ],
          [
            'tanh',
            'tanh'
          ],
          [
            'linear',
            'linear'
          ]
        ]
      }
    ],
    'previousStatement': null,
    'nextStatement': null,
    'colour': '#FF7043',
    'tooltip': 'Adds a 2D convolution layer.',
    'helpUrl': 'https://www.tensorflow.org/api_docs/python/tf/keras/layers/Conv2D'
  },
  {
    'type': 'keras_layer_maxpooling2d',
    'message0': 'add MaxPooling2D layer with pool size %1',
    'args0': [{
        'type': 'input_value',
        'name': 'POOL_SIZE',
        'check': 'Array'
      }],
    'previousStatement': null,
    'nextStatement': null,
    'colour': '#FF7043',
    'tooltip': 'Max pooling operation for 2D spatial data.',
    'helpUrl': 'https://www.tensorflow.org/api_docs/python/tf/keras/layers/MaxPooling2D'
  },
  {
    'type': 'keras_layer_flatten',
    'message0': 'add flatten layer',
    'previousStatement': null,
    'nextStatement': null,
    'colour': '#FF7043',
    'tooltip': 'Flattens the input. Does not affect the batch size.',
    'helpUrl': 'https://www.tensorflow.org/api_docs/python/tf/keras/layers/Flatten'
  },
  {
    'type': 'keras_layer_dropout',
    'message0': 'add dropout layer with rate %1',
    'args0': [{
        'type': 'field_number',
        'name': 'RATE',
        'value': 0.5,
        'min': 0,
        'max': 1
      }],
    'previousStatement': null,
    'nextStatement': null,
    'colour': '#FF7043',
    'tooltip': 'Applies Dropout to the input.',
    'helpUrl': 'https://www.tensorflow.org/api_docs/python/tf/keras/layers/Dropout'
  },
  {
    'type': 'keras_layer_embedding',
    'message0': 'add embedding layer with input dim %1 and output dim %2',
    'args0': [
      {
        'type': 'field_number',
        'name': 'INPUT_DIM',
        'value': 1000,
        'min': 1
      },
      {
        'type': 'field_number',
        'name': 'OUTPUT_DIM',
        'value': 64,
        'min': 1
      }
    ],
    'previousStatement': null,
    'nextStatement': null,
    'colour': '#FF7043',
    'tooltip': 'Turns positive integers (indexes) into dense vectors of fixed size.',
    'helpUrl': 'https://www.tensorflow.org/api_docs/python/tf/keras/layers/Embedding'
  },
  {
    'type': 'keras_layer_lstm',
    'message0': 'add LSTM layer with %1 units',
    'args0': [{
        'type': 'field_number',
        'name': 'UNITS',
        'value': 64,
        'min': 1
      }],
    'previousStatement': null,
    'nextStatement': null,
    'colour': '#FF7043',
    'tooltip': 'Long Short-Term Memory layer.',
    'helpUrl': 'https://www.tensorflow.org/api_docs/python/tf/keras/layers/LSTM'
  },
  {
    'type': 'keras_callback_earlystopping',
    'message0': 'early stopping callback, monitor %1, patience %2',
    'args0': [
      {
        'type': 'field_input',
        'name': 'MONITOR',
        'text': 'val_loss'
      },
      {
        'type': 'field_number',
        'name': 'PATIENCE',
        'value': 3,
        'min': 0
      }
    ],
    'output': 'Callback',
    'colour': '#FF7043',
    'tooltip': 'Stop training when a monitored metric has stopped improving.',
    'helpUrl': 'https://www.tensorflow.org/api_docs/python/tf/keras/callbacks/EarlyStopping'
  },
  {
    'type': 'keras_callback_modelcheckpoint',
    'message0': 'model checkpoint callback, filepath %1, monitor %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'FILEPATH',
        'check': 'String'
      },
      {
        'type': 'field_input',
        'name': 'MONITOR',
        'text': 'val_loss'
      }
    ],
    'output': 'Callback',
    'colour': '#FF7043',
    'tooltip': 'Callback to save the Keras model or model weights at some frequency.',
    'helpUrl': 'https://www.tensorflow.org/api_docs/python/tf/keras/callbacks/ModelCheckpoint'
  },
  {
    'type': 'keras_image_dataset_from_directory',
    'message0': 'image dataset from directory %1',
    'args0': [{
        'type': 'input_value',
        'name': 'DIRECTORY',
        'check': 'String'
      }],
    'message1': 'image size %1 batch size %2',
    'args1': [
      {
        'type': 'input_value',
        'name': 'IMAGE_SIZE',
        'check': 'Array'
      },
      {
        'type': 'field_number',
        'name': 'BATCH_SIZE',
        'value': 32,
        'min': 1
      }
    ],
    'output': 'Dataset',
    'colour': '#FF7043',
    'tooltip': 'Generates a tf.data.Dataset from image files in a directory.',
    'helpUrl': 'https://www.tensorflow.org/api_docs/python/tf/keras/utils/image_dataset_from_directory'
  }
]);