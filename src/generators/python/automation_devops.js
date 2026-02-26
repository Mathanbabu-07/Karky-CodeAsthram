import { pythonGenerator as Python } from 'blockly/python';
// subprocess.run generator
Python.forBlock['automation_subprocess_run'] = function(block) {
  Python.addImport('import subprocess');
  const cmd = Python.valueToCode(block, 'CMD', Python.ORDER_NONE) || '"echo"';
  const capture = block.getFieldValue('CAPTURE') === 'TRUE';
  const text = block.getFieldValue('TEXT') === 'TRUE';
  const args = [cmd];
  if (capture) args.push('capture_output=True');
  if (text) args.push('text=True');
  const code = `subprocess.run(${args.join(', ')})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['automation_cmd_run_safe'] = function (block) {
    Python.addImport('import subprocess');
    const cmd_key = Python.valueToCode(block, 'CMD_KEY', Python.ORDER_NONE) || "''";
    const args = Python.valueToCode(block, 'ARGS', Python.ORDER_NONE) || '[]';
    return `subprocess.run([${cmd_key}] + ${args}, check=True)\n`;
};

Python.forBlock['automation_cmd_user_confirm'] = function (block) {
    const message = Python.valueToCode(block, 'MESSAGE', Python.ORDER_NONE) || "''";
    return [`input(f"{${message}} (y/n): ").lower() == 'y'`, Python.ORDER_RELATIONAL];
};

Python.forBlock['automation_cmd_capture_output'] = function (block) {
    Python.addImport('import subprocess');
    const cmd_key = Python.valueToCode(block, 'CMD_KEY', Python.ORDER_NONE) || "''";
    return [`subprocess.check_output(${cmd_key}, shell=True).decode()`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['automation_ssh_connect'] = function (block) {
    Python.addImport('import paramiko');
    const host_ref = Python.valueToCode(block, 'HOST_REF', Python.ORDER_NONE) || "''";
    const helperName = Python.nameDB_.getDistinctName('_ssh_connect', 'PROCEDURE');
    const funcDef = `def ${helperName}(host):\n` +
        `  client = paramiko.SSHClient()\n` +
        `  client.set_missing_host_key_policy(paramiko.AutoAddPolicy())\n` +
        `  client.connect(host)\n` +
        `  return client\n`;
    Python.definitions_ = Python.definitions_ || Object.create(null);
    if (!Python.definitions_[helperName]) {
        Python.definitions_[helperName] = funcDef;
    }
    return [`${helperName}(${host_ref})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['automation_ssh_run'] = function (block) {
    const conn = Python.valueToCode(block, 'CONN', Python.ORDER_MEMBER) || 'None';
    const cmd = Python.valueToCode(block, 'CMD', Python.ORDER_NONE) || "''";
    return [`${conn}.exec_command(${cmd})[1].read().decode()`, Python.ORDER_MEMBER];
};

Python.forBlock['automation_scp_upload'] = function (block) {
    Python.addImport('from paramiko import SFTPClient');
    const conn = Python.valueToCode(block, 'CONN', Python.ORDER_MEMBER) || 'None';
    const src = Python.valueToCode(block, 'SRC', Python.ORDER_NONE) || "''";
    const dst = Python.valueToCode(block, 'DST', Python.ORDER_NONE) || "''";
    return `SFTPClient.from_transport(${conn}.get_transport()).put(${src}, ${dst})\n`;
};

Python.forBlock['automation_scp_download'] = function (block) {
    Python.addImport('from paramiko import SFTPClient');
    const conn = Python.valueToCode(block, 'CONN', Python.ORDER_MEMBER) || 'None';
    const src = Python.valueToCode(block, 'SRC', Python.ORDER_NONE) || "''";
    const dst = Python.valueToCode(block, 'DST', Python.ORDER_NONE) || "''";
    return `SFTPClient.from_transport(${conn}.get_transport()).get(${src}, ${dst})\n`;
};

Python.forBlock['automation_docker_run'] = function (block) {
    Python.addImport('import docker');
    const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_NONE) || "''";
    const args = Python.valueToCode(block, 'ARGS', Python.ORDER_NONE) || '[]';
    return [`docker.from_env().containers.run(${image}, command=${args})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['automation_terraform_apply'] = function (block) {
    Python.addImport('import subprocess');
    const plan_ref = Python.valueToCode(block, 'PLAN_REF', Python.ORDER_NONE) || 'None';
    return `subprocess.run(['terraform', 'apply', '-auto-approve', ${plan_ref}])\n`;
};

Python.forBlock['automation_ansible_run'] = function (block) {
    Python.addImport('import subprocess');
    const playbook_ref = Python.valueToCode(block, 'PLAYBOOK_REF', Python.ORDER_NONE) || 'None';
    return `subprocess.run(['ansible-playbook', ${playbook_ref}])\n`;
};
