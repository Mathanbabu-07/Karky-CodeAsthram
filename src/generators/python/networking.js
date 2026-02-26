import { pythonGenerator as Python } from 'blockly/python';
const pythonGenerator = Python;

Python.forBlock['net_http_get'] = function (block) {
    pythonGenerator.addImport('import requests');
    const url = Python.valueToCode(block, 'URL', Python.ORDER_NONE) || "''";
    const params = Python.valueToCode(block, 'PARAMS', Python.ORDER_NONE) || 'None';
    const headers = Python.valueToCode(block, 'HEADERS', Python.ORDER_NONE) || 'None';
    return [`requests.get(${url}, params=${params}, headers=${headers}).text`, Python.ORDER_MEMBER];
};

Python.forBlock['net_http_post'] = function (block) {
    pythonGenerator.addImport('import requests');
    const url = Python.valueToCode(block, 'URL', Python.ORDER_NONE) || "''";
    const headers = Python.valueToCode(block, 'HEADERS', Python.ORDER_NONE) || 'None';
    const body = Python.valueToCode(block, 'BODY', Python.ORDER_NONE) || 'None';
    return [`requests.post(${url}, headers=${headers}, data=${body}).text`, Python.ORDER_MEMBER];
};

Python.forBlock['net_http_json_get'] = function (block) {
    pythonGenerator.addImport('import requests');
    const url = Python.valueToCode(block, 'URL', Python.ORDER_NONE) || "''";
    return [`requests.get(${url}).json()`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['net_http_json_post'] = function (block) {
    pythonGenerator.addImport('import requests');
    const url = Python.valueToCode(block, 'URL', Python.ORDER_NONE) || "''";
    const data = Python.valueToCode(block, 'DATA', Python.ORDER_NONE) || '{}';
    return [`requests.post(${url}, json=${data}).json()`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['net_http_download_file'] = function (block) {
    pythonGenerator.addImport('import requests');
    const url = Python.valueToCode(block, 'URL', Python.ORDER_NONE) || "''";
    const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || "''";
    const helperName = Python.nameDB_.getDistinctName('_download_file', 'PROCEDURE');
    const funcDef = `def ${helperName}(url, path):\n` +
        `  with open(path, 'wb') as f:\n` +
        `    f.write(requests.get(url).content)\n`;
    Python.definitions_ = Python.definitions_ || Object.create(null);
    if (!Python.definitions_[helperName]) {
        Python.definitions_[helperName] = funcDef;
    }
    return `${helperName}(${url}, ${path})\n`;
};

Python.forBlock['net_http_with_retry'] = function (block) {
    return '# http_with_retry block is not fully implemented yet.\n';
};

Python.forBlock['net_http_rate_limit'] = function (block) {
    return '# http_rate_limit block is not fully implemented yet.\n';
};

Python.forBlock['net_ws_connect'] = function (block) {
    pythonGenerator.addImport('websockets');
    const url = Python.valueToCode(block, 'URL', Python.ORDER_NONE) || "''";
    const varName = pythonGenerator.getVariableName(block.getFieldValue('VAR'));
    return `${varName} = await websockets.connect(${url})\n`;
};

Python.forBlock['net_ws_send'] = function (block) {
    const conn = Python.valueToCode(block, 'CONN', Python.ORDER_NONE) || 'None';
    const msg = Python.valueToCode(block, 'MSG', Python.ORDER_NONE) || "''";
    return `await ${conn}.send(${msg})\n`;
};

Python.forBlock['net_ws_receive'] = function (block) {
    const conn = Python.valueToCode(block, 'CONN', Python.ORDER_NONE) || 'None';
    const varName = pythonGenerator.getVariableName(block.getFieldValue('VAR'));
    return `${varName} = await ${conn}.recv()\n`;
};

Python.forBlock['net_ws_close'] = function (block) {
    const conn = Python.valueToCode(block, 'CONN', Python.ORDER_NONE) || 'None';
    return `await ${conn}.close()\n`;
};

Python.forBlock['net_pubsub_publish'] = function (block) {
    const channel = Python.valueToCode(block, 'CHANNEL', Python.ORDER_NONE) || "''";
    const message = Python.valueToCode(block, 'MESSAGE', Python.ORDER_NONE) || "''";
    // Simple pub/sub using a global dict
    const helperName = '_pubsub_channels';
    Python.definitions_ = Python.definitions_ || Object.create(null);
    if (!Python.definitions_[helperName]) {
        Python.definitions_[helperName] = `${helperName} = {}\n`;
    }
    return `[cb(${message}) for cb in ${helperName}.get(${channel}, [])]\n`;
};

Python.forBlock['net_pubsub_subscribe'] = function (block) {
    const channel = Python.valueToCode(block, 'CHANNEL', Python.ORDER_NONE) || "''";
    const callback = Python.valueToCode(block, 'CALLBACK', Python.ORDER_NONE) || 'None';
    const helperName = '_pubsub_channels';
    Python.definitions_ = Python.definitions_ || Object.create(null);
    if (!Python.definitions_[helperName]) {
        Python.definitions_[helperName] = `${helperName} = {}\n`;
    }
    return `${helperName}.setdefault(${channel}, []).append(${callback})\n`;
};

Python.forBlock['net_pubsub_unsubscribe'] = function (block) {
    const channel = Python.valueToCode(block, 'CHANNEL', Python.ORDER_NONE) || "''";
    const helperName = '_pubsub_channels';
    Python.definitions_ = Python.definitions_ || Object.create(null);
    if (!Python.definitions_[helperName]) {
        Python.definitions_[helperName] = `${helperName} = {}\n`;
    }
    return `${helperName}.pop(${channel}, None)\n`;
};

Python.forBlock['net_socket_connect'] = function (block) {
    pythonGenerator.addImport('import socket');
    const host = Python.valueToCode(block, 'HOST', Python.ORDER_NONE) || "''";
    const port = Python.valueToCode(block, 'PORT', Python.ORDER_NONE) || '0';
    const helperName = Python.nameDB_.getDistinctName('_socket_connect', 'PROCEDURE');
    const funcDef = `def ${helperName}(host, port):\n` +
        `  s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\n` +
        `  s.connect((host, port))\n` +
        `  return s\n`;
    Python.definitions_ = Python.definitions_ || Object.create(null);
    if (!Python.definitions_[helperName]) {
        Python.definitions_[helperName] = funcDef;
    }
    return [`${helperName}(${host}, ${port})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['net_socket_send'] = function (block) {
    const conn = Python.valueToCode(block, 'CONN', Python.ORDER_MEMBER) || 'None';
    const data = Python.valueToCode(block, 'DATA', Python.ORDER_NONE) || "b''";
    return `${conn}.sendall(${data})\n`;
};

Python.forBlock['net_socket_receive'] = function (block) {
    const conn = Python.valueToCode(block, 'CONN', Python.ORDER_MEMBER) || 'None';
    const max_bytes = Python.valueToCode(block, 'MAX_BYTES', Python.ORDER_NONE) || '1024';
    return [`${conn}.recv(${max_bytes})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['net_socket_close'] = function (block) {
    const conn = Python.valueToCode(block, 'CONN', Python.ORDER_MEMBER) || 'None';
    return `${conn}.close()\n`;
};

Python.forBlock['net_http_auth_basic'] = function (block) {
    pythonGenerator.addImport('import base64');
    const user = Python.valueToCode(block, 'USER', Python.ORDER_NONE) || "''";
    const pass = Python.valueToCode(block, 'PASS', Python.ORDER_NONE) || "''";
    return [`{'Authorization': f'Basic {base64.b64encode(f"{${user}}:{${pass}}".encode()).decode()}'}`, Python.ORDER_ATOMIC];
};

Python.forBlock['net_http_auth_bearer'] = function (block) {
    const token = Python.valueToCode(block, 'TOKEN', Python.ORDER_NONE) || "''";
    return [`{'Authorization': f'Bearer {${token}}'}`, Python.ORDER_ATOMIC];
};

Python.forBlock['net_request_sign'] = function (block) {
    pythonGenerator.addImport('import hmac');
    pythonGenerator.addImport('import hashlib');
    const key = Python.valueToCode(block, 'KEY', Python.ORDER_NONE) || "''";
    const data = Python.valueToCode(block, 'DATA', Python.ORDER_NONE) || '{}';
    return [`hmac.new(${key}.encode(), str(${data}).encode(), hashlib.sha256).hexdigest()`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['net_multipart_upload'] = function (block) {
    pythonGenerator.addImport('import requests');
    const files = Python.valueToCode(block, 'FILES', Python.ORDER_NONE) || '{}';
    const data = Python.valueToCode(block, 'DATA', Python.ORDER_NONE) || '{}';
    return [`requests.post(url, files=${files}, data=${data})`, Python.ORDER_FUNCTION_CALL];
};
