import { pythonGenerator as Python } from 'blockly/python';

Python.forBlock['security_hash_sha256'] = function (block) {
    Python.addImport('import hashlib');
    const data = Python.valueToCode(block, 'DATA', Python.ORDER_NONE) || "b''";
    return [`hashlib.sha256(${data}).hexdigest()`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['security_hmac_sha256'] = function (block) {
    Python.addImport('import hmac');
    Python.addImport('import hashlib');
    const key = Python.valueToCode(block, 'KEY', Python.ORDER_NONE) || "''";
    const data = Python.valueToCode(block, 'DATA', Python.ORDER_NONE) || "b''";
    return [`hmac.new(${key}.encode() if isinstance(${key}, str) else ${key}, ${data}, hashlib.sha256).hexdigest()`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['security_generate_random_bytes'] = function (block) {
    Python.addImport('import secrets');
    const n = Python.valueToCode(block, 'N', Python.ORDER_NONE) || '16';
    return [`secrets.token_bytes(${n})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['security_secrets_store_save'] = function (block) {
    const key_name = Python.valueToCode(block, 'KEY_NAME', Python.ORDER_NONE) || "''";
    const secret_ref = Python.valueToCode(block, 'SECRET_REF', Python.ORDER_NONE) || 'None';
    const helperName = '_secrets_store';
    Python.definitions_ = Python.definitions_ || Object.create(null);
    if (!Python.definitions_[helperName]) {
        Python.definitions_[helperName] = `${helperName} = {}\n`;
    }
    return `${helperName}[${key_name}] = ${secret_ref}\n`;
};

Python.forBlock['security_secrets_get_ref'] = function (block) {
    const key_name = Python.valueToCode(block, 'KEY_NAME', Python.ORDER_NONE) || "''";
    const helperName = '_secrets_store';
    Python.definitions_ = Python.definitions_ || Object.create(null);
    if (!Python.definitions_[helperName]) {
        Python.definitions_[helperName] = `${helperName} = {}\n`;
    }
    return [`${helperName}.get(${key_name})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['security_jwt_encode'] = function (block) {
    Python.addImport('import jwt');
    const payload = Python.valueToCode(block, 'PAYLOAD', Python.ORDER_NONE) || '{}';
    const key_ref = Python.valueToCode(block, 'KEY_REF', Python.ORDER_NONE) || 'None';
    const alg = block.getFieldValue('ALG');
    return [`jwt.encode(${payload}, ${key_ref}, algorithm='${alg}')`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['security_jwt_decode'] = function (block) {
    Python.addImport('import jwt');
    const token = Python.valueToCode(block, 'TOKEN', Python.ORDER_NONE) || "''";
    const key_ref = Python.valueToCode(block, 'KEY_REF', Python.ORDER_NONE) || 'None';
    return [`jwt.decode(${token}, ${key_ref}, algorithms=['HS256'])`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['security_encrypt_sym'] = function (block) {
    Python.addImport('from cryptography.fernet import Fernet');
    const plaintext = Python.valueToCode(block, 'PLAINTEXT', Python.ORDER_NONE) || "b''";
    const key_ref = Python.valueToCode(block, 'KEY_REF', Python.ORDER_NONE) || 'None';
    return [`Fernet(${key_ref}).encrypt(${plaintext})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['security_decrypt_sym'] = function (block) {
    Python.addImport('from cryptography.fernet import Fernet');
    const ciphertext = Python.valueToCode(block, 'CIPHERTEXT', Python.ORDER_NONE) || "b''";
    const key_ref = Python.valueToCode(block, 'KEY_REF', Python.ORDER_NONE) || 'None';
    return [`Fernet(${key_ref}).decrypt(${ciphertext})`, Python.ORDER_FUNCTION_CALL];
};
