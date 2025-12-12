import { pythonGenerator as Python } from 'blockly/python';

// --- Tensors ---
Python.forBlock['torch_tensor'] = function(block) {
    Python.addImport('import torch');
    const data = Python.valueToCode(block, 'DATA', Python.ORDER_ATOMIC) || '[]';
    const code = `torch.tensor(${data})`;
    return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['torch_tensor_shape'] = function(block) {
    const tensor = Python.valueToCode(block, 'TENSOR', Python.ORDER_MEMBER) || 'None';
    const code = `${tensor}.shape`;
    return [code, Python.ORDER_MEMBER];
};

Python.forBlock['torch_tensor_reshape'] = function(block) {
    const tensor = Python.valueToCode(block, 'TENSOR', Python.ORDER_ATOMIC) || 'None';
    const shape = Python.valueToCode(block, 'SHAPE', Python.ORDER_ATOMIC) || '()';
    const code = `${tensor}.reshape(${shape})`;
    return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['torch_zeros'] = function(block) {
    Python.addImport('import torch');
    const shape = Python.valueToCode(block, 'SHAPE', Python.ORDER_ATOMIC) || '()';
    const code = `torch.zeros(${shape})`;
    return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['torch_ones'] = function(block) {
    Python.addImport('import torch');
    const shape = Python.valueToCode(block, 'SHAPE', Python.ORDER_ATOMIC) || '()';
    const code = `torch.ones(${shape})`;
    return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['torch_randn'] = function(block) {
    Python.addImport('import torch');
    const shape = Python.valueToCode(block, 'SHAPE', Python.ORDER_ATOMIC) || '()';
    const code = `torch.randn(${shape})`;
    return [code, Python.ORDER_FUNCTION_CALL];
};

// --- NN Module & Layers ---
Python.forBlock['torch_nn_module'] = function(block) {
    Python.addImport('import torch.nn as nn');
    const networkName = block.getFieldValue('NAME');
    const initLayers = Python.statementToCode(block, 'INIT_LAYERS');
    const forwardPass = Python.statementToCode(block, 'FORWARD_PASS');
    const inputVar = Python.getVariableName(block.getFieldValue('VAR'));

    const code = `
class ${networkName}(nn.Module):
    def __init__(self):
        super(${networkName}, self).__init__()
${Python.prefixLines(initLayers, Python.INDENT)}
    def forward(self, ${inputVar}):
${Python.prefixLines(forwardPass || '        pass', Python.INDENT * 2)}
`;
    return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['torch_nn_linear'] = function(block) {
    Python.addImport('import torch.nn as nn');
    const in_features = Python.valueToCode(block, 'IN_FEATURES', Python.ORDER_ATOMIC) || '0';
    const out_features = Python.valueToCode(block, 'OUT_FEATURES', Python.ORDER_ATOMIC) || '0';
    const code = `nn.Linear(${in_features}, ${out_features})`;
    return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['torch_nn_conv2d'] = function(block) {
    Python.addImport('import torch.nn as nn');
    const in_channels = Python.valueToCode(block, 'IN_CHANNELS', Python.ORDER_ATOMIC) || '1';
    const out_channels = Python.valueToCode(block, 'OUT_CHANNELS', Python.ORDER_ATOMIC) || '1';
    const kernel_size = Python.valueToCode(block, 'KERNEL_SIZE', Python.ORDER_ATOMIC) || '3';
    const code = `nn.Conv2d(${in_channels}, ${out_channels}, kernel_size=${kernel_size})`;
    return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['torch_nn_maxpool2d'] = function(block) {
    Python.addImport('import torch.nn as nn');
    const kernel_size = Python.valueToCode(block, 'KERNEL_SIZE', Python.ORDER_ATOMIC) || '2';
    const code = `nn.MaxPool2d(kernel_size=${kernel_size})`;
    return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['torch_nn_relu'] = function(block) {
    Python.addImport('import torch.nn as nn');
    return ['nn.ReLU()', Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['torch_nn_dropout'] = function(block) {
    Python.addImport('import torch.nn as nn');
    const p = block.getFieldValue('P');
    const code = `nn.Dropout(p=${p})`;
    return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['torch_nn_embedding'] = function(block) {
    Python.addImport('import torch.nn as nn');
    const num_embeddings = Python.valueToCode(block, 'NUM_EMBEDDINGS', Python.ORDER_ATOMIC) || '1';
    const embedding_dim = Python.valueToCode(block, 'EMBEDDING_DIM', Python.ORDER_ATOMIC) || '1';
    const code = `nn.Embedding(${num_embeddings}, ${embedding_dim})`;
    return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['torch_nn_lstm'] = function(block) {
    Python.addImport('import torch.nn as nn');
    const input_size = Python.valueToCode(block, 'INPUT_SIZE', Python.ORDER_ATOMIC) || '1';
    const hidden_size = Python.valueToCode(block, 'HIDDEN_SIZE', Python.ORDER_ATOMIC) || '1';
    const code = `nn.LSTM(input_size=${input_size}, hidden_size=${hidden_size})`;
    return [code, Python.ORDER_FUNCTION_CALL];
};

// --- Data ---
Python.forBlock['torch_custom_dataset'] = function(block) {
    Python.addImport('from torch.utils.data import Dataset');
    const datasetName = block.getFieldValue('NAME');
    const initCode = Python.statementToCode(block, 'INIT');
    const lenCode = Python.statementToCode(block, 'LEN');
    const getItemCode = Python.statementToCode(block, 'GETITEM');
    const indexVar = Python.getVariableName(block.getFieldValue('VAR'));

    const code = `
class ${datasetName}(Dataset):
    def __init__(self):
${Python.prefixLines(initCode || '        pass', Python.INDENT * 2)}
    def __len__(self):
${Python.prefixLines(lenCode || '        return 0', Python.INDENT * 2)}
    def __getitem__(self, ${indexVar}):
${Python.prefixLines(getItemCode || '        pass', Python.INDENT * 2)}
`;
    return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['torch_dataloader'] = function(block) {
    Python.addImport('from torch.utils.data import DataLoader');
    const dataset = Python.valueToCode(block, 'DATASET', Python.ORDER_ATOMIC) || 'None';
    const batch_size = block.getFieldValue('BATCH_SIZE');
    const shuffle = block.getFieldValue('SHUFFLE') === 'TRUE';
    const code = `DataLoader(${dataset}, batch_size=${batch_size}, shuffle=${shuffle})`;
    return [code, Python.ORDER_FUNCTION_CALL];
};

// --- Training ---
Python.forBlock['torch_loss_function'] = function(block) {
    Python.addImport('import torch.nn as nn');
    const loss_fn = block.getFieldValue('LOSS');
    return [`nn.${loss_fn}()`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['torch_optimizer'] = function(block) {
    Python.addImport('import torch.optim as optim');
    const optimizer = block.getFieldValue('OPTIMIZER');
    const params = Python.valueToCode(block, 'PARAMS', Python.ORDER_ATOMIC) || 'None';
    const lr = Python.valueToCode(block, 'LR', Python.ORDER_ATOMIC) || '0.001';
    const code = `optim.${optimizer}(${params}, lr=${lr})`;
    return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['torch_train_loop'] = function(block) {
    const epochs = Python.valueToCode(block, 'EPOCHS', Python.ORDER_ATOMIC) || '1';
    const inputs_var = Python.getVariableName(block.getFieldValue('INPUTS_VAR'));
    const labels_var = Python.getVariableName(block.getFieldValue('LABELS_VAR'));
    const data_loader = Python.valueToCode(block, 'DATA_LOADER', Python.ORDER_ATOMIC) || 'None';
    const loop_body = Python.statementToCode(block, 'LOOP_BODY');

    const code = `
for epoch in range(${epochs}):
    for ${inputs_var}, ${labels_var} in ${data_loader}:
${Python.prefixLines(loop_body || '        pass', Python.INDENT * 2)}
`;
    return code;
};

// --- Model Management ---
Python.forBlock['torch_save'] = function(block) {
    Python.addImport('import torch');
    const model = Python.valueToCode(block, 'MODEL', Python.ORDER_ATOMIC) || 'None';
    const filepath = Python.valueToCode(block, 'FILEPATH', Python.ORDER_ATOMIC) || '""';
    const code = `torch.save(${model}.state_dict(), ${filepath})\n`;
    return code;
};

Python.forBlock['torch_load'] = function(block) {
    Python.addImport('import torch');
    const model = Python.valueToCode(block, 'MODEL', Python.ORDER_ATOMIC) || 'None';
    const filepath = Python.valueToCode(block, 'FILEPATH', Python.ORDER_ATOMIC) || '""';
    const code = `${model}.load_state_dict(torch.load(${filepath}))\n`;
    return code;
};