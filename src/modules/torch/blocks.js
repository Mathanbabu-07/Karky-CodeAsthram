import * as Blockly from 'blockly';

Blockly.defineBlocksWithJsonArray([
  {
    'type': 'torch_tensor',
    'message0': 'create torch tensor from %1',
    'args0': [{
        'type': 'input_value',
        'name': 'DATA',
        'check': 'Array'
      }],
    'output': 'Tensor',
    'colour': '#F4511E',
    'tooltip': 'Creates a PyTorch tensor from a list or NumPy array.',
    'helpUrl': 'https://pytorch.org/docs/stable/tensors.html'
  },
  {
    'type': 'torch_tensor_shape',
    'message0': 'shape of tensor %1',
    'args0': [{
        'type': 'input_value',
        'name': 'TENSOR',
        'check': 'Tensor'
      }],
    'output': 'Array',
    'colour': '#F4511E',
    'tooltip': 'Returns the shape of a PyTorch tensor.',
    'helpUrl': 'https://pytorch.org/docs/stable/generated/torch.Tensor.shape.html'
  },
  {
    'type': 'torch_tensor_reshape',
    'message0': 'reshape tensor %1 to shape %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'TENSOR',
        'check': 'Tensor'
      },
      {
        'type': 'input_value',
        'name': 'SHAPE',
        'check': 'Array'
      }
    ],
    'output': 'Tensor',
    'colour': '#F4511E',
    'tooltip': 'Returns a tensor with the same data and number of elements as input, but with the specified shape.',
    'helpUrl': 'https://pytorch.org/docs/stable/generated/torch.reshape.html'
  },
  {
    'type': 'torch_zeros',
    'message0': 'create tensor of zeros with shape %1',
    'args0': [{
        'type': 'input_value',
        'name': 'SHAPE',
        'check': 'Array'
      }],
    'output': 'Tensor',
    'colour': '#F4511E',
    'tooltip': 'Creates a tensor filled with zeros.',
    'helpUrl': 'https://pytorch.org/docs/stable/generated/torch.zeros.html'
  },
  {
    'type': 'torch_ones',
    'message0': 'create tensor of ones with shape %1',
    'args0': [{
        'type': 'input_value',
        'name': 'SHAPE',
        'check': 'Array'
      }],
    'output': 'Tensor',
    'colour': '#F4511E',
    'tooltip': 'Creates a tensor filled with ones.',
    'helpUrl': 'https://pytorch.org/docs/stable/generated/torch.ones.html'
  },
  {
    'type': 'torch_randn',
    'message0': 'create random tensor with shape %1',
    'args0': [{
        'type': 'input_value',
        'name': 'SHAPE',
        'check': 'Array'
      }],
    'output': 'Tensor',
    'colour': '#F4511E',
    'tooltip': 'Creates a tensor with random numbers from a normal distribution.',
    'helpUrl': 'https://pytorch.org/docs/stable/generated/torch.randn.html'
  },
  {
    'type': 'torch_nn_module',
    'message0': 'define torch neural network %1',
    'args0': [{
        'type': 'field_input',
        'name': 'NAME',
        'text': 'MyNetwork'
      }],
    'message1': 'initialize layers: %1',
    'args1': [{
        'type': 'input_statement',
        'name': 'INIT_LAYERS'
      }],
    'message2': 'define forward pass with input %1: %2',
    'args2': [
      {
        'type': 'field_variable',
        'name': 'VAR',
        'variable': 'x'
      },
      {
        'type': 'input_statement',
        'name': 'FORWARD_PASS'
      }
    ],
    'output': 'Model',
    'colour': '#F4511E',
    'tooltip': 'Defines a neural network as a class that inherits from torch.nn.Module.',
    'helpUrl': 'https://pytorch.org/tutorials/beginner/introyt/models_layers_tutorial.html'
  },
  {
    'type': 'torch_nn_linear',
    'message0': 'linear layer: in %1 out %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'IN_FEATURES',
        'check': 'Number'
      },
      {
        'type': 'input_value',
        'name': 'OUT_FEATURES',
        'check': 'Number'
      }
    ],
    'output': 'Layer',
    'colour': '#F4511E',
    'tooltip': 'Applies a linear transformation to the incoming data.',
    'helpUrl': 'https://pytorch.org/docs/stable/generated/torch.nn.Linear.html'
  },
  {
    'type': 'torch_nn_conv2d',
    'message0': 'Conv2D layer: in_channels %1 out_channels %2 kernel_size %3',
    'args0': [
      {
        'type': 'input_value',
        'name': 'IN_CHANNELS',
        'check': 'Number'
      },
      {
        'type': 'input_value',
        'name': 'OUT_CHANNELS',
        'check': 'Number'
      },
      {
        'type': 'input_value',
        'name': 'KERNEL_SIZE',
        'check': [
          'Number',
          'Array'
        ]
      }
    ],
    'output': 'Layer',
    'colour': '#F4511E',
    'tooltip': 'Applies a 2D convolution over an input signal composed of several input planes.',
    'helpUrl': 'https://pytorch.org/docs/stable/generated/torch.nn.Conv2d.html'
  },
  {
    'type': 'torch_nn_maxpool2d',
    'message0': 'MaxPool2D layer: kernel_size %1',
    'args0': [{
        'type': 'input_value',
        'name': 'KERNEL_SIZE',
        'check': [
          'Number',
          'Array'
        ]
      }],
    'output': 'Layer',
    'colour': '#F4511E',
    'tooltip': 'Applies a 2D max pooling over an input signal.',
    'helpUrl': 'https://pytorch.org/docs/stable/generated/torch.nn.MaxPool2d.html'
  },
  {
    'type': 'torch_nn_relu',
    'message0': 'ReLU activation',
    'output': 'Layer',
    'colour': '#F4511E',
    'tooltip': 'Applies the rectified linear unit function element-wise.',
    'helpUrl': 'https://pytorch.org/docs/stable/generated/torch.nn.ReLU.html'
  },
  {
    'type': 'torch_nn_dropout',
    'message0': 'dropout layer: p %1',
    'args0': [{
        'type': 'field_number',
        'name': 'P',
        'value': 0.5,
        'min': 0,
        'max': 1
      }],
    'output': 'Layer',
    'colour': '#F4511E',
    'tooltip': 'During training, randomly zeroes some of the elements of the input tensor with probability p.',
    'helpUrl': 'https://pytorch.org/docs/stable/generated/torch.nn.Dropout.html'
  },
  {
    'type': 'torch_nn_embedding',
    'message0': 'embedding layer: num_embeddings %1 embedding_dim %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'NUM_EMBEDDINGS',
        'check': 'Number'
      },
      {
        'type': 'input_value',
        'name': 'EMBEDDING_DIM',
        'check': 'Number'
      }
    ],
    'output': 'Layer',
    'colour': '#F4511E',
    'tooltip': 'A simple lookup table that stores embeddings of a fixed dictionary and size.',
    'helpUrl': 'https://pytorch.org/docs/stable/generated/torch.nn.Embedding.html'
  },
  {
    'type': 'torch_nn_lstm',
    'message0': 'LSTM layer: input_size %1 hidden_size %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'INPUT_SIZE',
        'check': 'Number'
      },
      {
        'type': 'input_value',
        'name': 'HIDDEN_SIZE',
        'check': 'Number'
      }
    ],
    'output': 'Layer',
    'colour': '#F4511E',
    'tooltip': 'Applies a multi-layer long short-term memory (LSTM) RNN to an input sequence.',
    'helpUrl': 'https://pytorch.org/docs/stable/generated/torch.nn.LSTM.html'
  },
  {
    'type': 'torch_custom_dataset',
    'message0': 'define custom torch dataset %1',
    'args0': [{
        'type': 'field_input',
        'name': 'NAME',
        'text': 'MyDataset'
      }],
    'message1': 'initialize with: %1',
    'args1': [{
        'type': 'input_statement',
        'name': 'INIT'
      }],
    'message2': 'get length: %1',
    'args2': [{
        'type': 'input_statement',
        'name': 'LEN'
      }],
    'message3': 'get item at index %1: %2',
    'args3': [
      {
        'type': 'field_variable',
        'name': 'VAR',
        'variable': 'idx'
      },
      {
        'type': 'input_statement',
        'name': 'GETITEM'
      }
    ],
    'output': 'Dataset',
    'colour': '#F4511E',
    'tooltip': 'Defines a custom PyTorch dataset.',
    'helpUrl': 'https://pytorch.org/tutorials/beginner/basics/data_tutorial.html'
  },
  {
    'type': 'torch_dataloader',
    'message0': 'create DataLoader for dataset %1',
    'args0': [{
        'type': 'input_value',
        'name': 'DATASET',
        'check': 'Dataset'
      }],
    'message1': 'batch size %1 shuffle %2',
    'args1': [
      {
        'type': 'field_number',
        'name': 'BATCH_SIZE',
        'value': 64,
        'min': 1
      },
      {
        'type': 'field_checkbox',
        'name': 'SHUFFLE',
        'checked': true
      }
    ],
    'output': 'DataLoader',
    'colour': '#F4511E',
    'tooltip': 'Creates a DataLoader for iterating over a dataset.',
    'helpUrl': 'https://pytorch.org/docs/stable/data.html#torch.utils.data.DataLoader'
  },
  {
    'type': 'torch_loss_function',
    'message0': 'loss function %1',
    'args0': [{
        'type': 'field_dropdown',
        'name': 'LOSS',
        'options': [
          [
            'CrossEntropyLoss',
            'CrossEntropyLoss'
          ],
          [
            'MSELoss',
            'MSELoss'
          ]
        ]
      }],
    'output': 'Loss',
    'colour': '#F4511E',
    'tooltip': 'Creates a loss function instance.'
  },
  {
    'type': 'torch_optimizer',
    'message0': 'optimizer %1 for parameters %2 with learning rate %3',
    'args0': [
      {
        'type': 'field_dropdown',
        'name': 'OPTIMIZER',
        'options': [
          [
            'SGD',
            'SGD'
          ],
          [
            'Adam',
            'Adam'
          ]
        ]
      },
      {
        'type': 'input_value',
        'name': 'PARAMS',
        'check': 'Array'
      },
      {
        'type': 'input_value',
        'name': 'LR',
        'check': 'Number'
      }
    ],
    'output': 'Optimizer',
    'colour': '#F4511E',
    'tooltip': 'Creates an optimizer instance.'
  },
  {
    'type': 'torch_train_loop',
    'message0': 'train for %1 epochs:',
    'args0': [{
        'type': 'input_value',
        'name': 'EPOCHS',
        'check': 'Number'
      }],
    'message1': 'for each batch %1 , %2 in data loader %3 %4',
    'args1': [
      {
        'type': 'field_variable',
        'name': 'INPUTS_VAR',
        'variable': 'inputs'
      },
      {
        'type': 'field_variable',
        'name': 'LABELS_VAR',
        'variable': 'labels'
      },
      {
        'type': 'input_value',
        'name': 'DATA_LOADER',
        'check': 'DataLoader'
      },
      {
        'type': 'input_statement',
        'name': 'LOOP_BODY'
      }
    ],
    'previousStatement': null,
    'nextStatement': null,
    'colour': '#F4511E',
    'tooltip': 'A flexible training loop for a PyTorch model.'
  },
  {
    'type': 'torch_save',
    'message0': 'save model state %1 to file %2',
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
    'colour': '#F4511E',
    'tooltip': 'Saves a model\'s state dictionary.',
    'helpUrl': 'https://pytorch.org/tutorials/beginner/saving_loading_models.html'
  },
  {
    'type': 'torch_load',
    'message0': 'load model state for %1 from file %2',
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
    'colour': '#F4511E',
    'tooltip': 'Loads a model\'s state dictionary from a file.',
    'helpUrl': 'https://pytorch.org/tutorials/beginner/saving_loading_models.html'
  }
]);