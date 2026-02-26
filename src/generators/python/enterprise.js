import { pythonGenerator as Python } from 'blockly/python';
const pythonGenerator = Python;

Python.forBlock['enterprise_odoo_connect'] = function (block) {
    return [`# Odoo connection requires odoolib or xmlrpc.client`, Python.ORDER_ATOMIC];
};

Python.forBlock['enterprise_odoo_search_create'] = function (block) {
    const conn = Python.valueToCode(block, 'CONN', Python.ORDER_NONE) || 'None';
    const model = Python.valueToCode(block, 'MODEL', Python.ORDER_NONE) || "''";
    const data = Python.valueToCode(block, 'DATA', Python.ORDER_NONE) || '{}';
    return [`# Odoo search_create: ${conn}.create(${model}, ${data})`, Python.ORDER_ATOMIC];
};

Python.forBlock['enterprise_ros_init_node'] = function (block) {
    pythonGenerator.addImport('import rospy');
    const name = block.getFieldValue('NAME');
    return `rospy.init_node('${name}')\n`;
};

Python.forBlock['enterprise_ros_publish'] = function (block) {
    const topic = Python.valueToCode(block, 'TOPIC', Python.ORDER_NONE) || "''";
    const msg = Python.valueToCode(block, 'MSG', Python.ORDER_NONE) || '{}';
    return `# ROS publish requires rospy.Publisher(${topic}, MsgType).publish(${msg})\n`;
};

Python.forBlock['enterprise_quant_backtest_strategy'] = function (block) {
    const strategy = Python.valueToCode(block, 'STRATEGY', Python.ORDER_NONE) || 'None';
    const data = Python.valueToCode(block, 'DATA', Python.ORDER_NONE) || 'None';
    return [`# Backtesting requires zipline, backtrader, or similar library`, Python.ORDER_ATOMIC];
};

Python.forBlock['enterprise_quant_get_price_series'] = function (block) {
    pythonGenerator.addImport('import yfinance as yf');
    const ticker = Python.valueToCode(block, 'TICKER', Python.ORDER_NONE) || "''";
    return [`yf.download(${ticker})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['automation_ci_trigger'] = function (block) {
    const job_name = Python.valueToCode(block, 'JOB_NAME', Python.ORDER_NONE) || "''";
    const params = Python.valueToCode(block, 'PARAMS', Python.ORDER_NONE) || '{}';
    return `# CI trigger requires jenkins-cli or similar\n`;
};

Python.forBlock['automation_artifact_upload'] = function (block) {
    const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || "''";
    return `# Artifact upload requires CI/CD integration\n`;
};

Python.forBlock['automation_artifact_download'] = function (block) {
    const id = Python.valueToCode(block, 'ID', Python.ORDER_NONE) || "''";
    return [`# Artifact download requires CI/CD integration`, Python.ORDER_ATOMIC];
};
