import { pythonGenerator as Python } from 'blockly/python';
const pythonGenerator = Python;

Python.forBlock['tools_test_define_case'] = function (block) {
    const name = block.getFieldValue('NAME');
    const branch = Python.statementToCode(block, 'DO') || '  pass';
    return `def test_${name}():\n${pythonGenerator.prefixLines(branch, pythonGenerator.INDENT)}\n`;
};

Python.forBlock['tools_assert_equal'] = function (block) {
    const a = Python.valueToCode(block, 'A', Python.ORDER_NONE) || 'None';
    const b = Python.valueToCode(block, 'B', Python.ORDER_NONE) || 'None';
    return `assert ${a} == ${b}\n`;
};

Python.forBlock['tools_assert_true'] = function (block) {
    const cond = Python.valueToCode(block, 'COND', Python.ORDER_NONE) || 'False';
    return `assert ${cond}\n`;
};

Python.forBlock['tools_run_tests'] = function (block) {
    const helperName = Python.nameDB_.getDistinctName('_run_all_tests', 'PROCEDURE');
    const funcDef = `def ${helperName}(scope):\n` +
        `  tests = [f for k, f in scope.items() if k.startswith('test_') and callable(f)]\n` +
        `  for test in tests:\n` +
        `    try:\n` +
        `      test()\n` +
        `      print(f"✓ {test.__name__} passed")\n` +
        `    except Exception as e:\n` +
        `      print(f"✗ {test.__name__} failed: {e}")\n`;
    Python.definitions_ = Python.definitions_ || Object.create(null);
    if (!Python.definitions_[helperName]) {
        Python.definitions_[helperName] = funcDef;
    }
    return [`${helperName}(globals())`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['tools_test_fixture'] = function (block) {
    return '# test_fixture block is not fully implemented yet.\n';
};

Python.forBlock['tools_log_debug'] = function (block) {
    pythonGenerator.addImport('import logging');
    const msg = Python.valueToCode(block, 'MSG', Python.ORDER_NONE) || "''";
    const data = Python.valueToCode(block, 'DATA', Python.ORDER_NONE) || 'None';
    return `logging.debug(f"{${msg}}: {${data}}")\n`;
};

Python.forBlock['tools_log_to_file'] = function (block) {
    pythonGenerator.addImport('import logging');
    const msg = Python.valueToCode(block, 'MSG', Python.ORDER_NONE) || "''";
    const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || "''";
    const helperName = Python.nameDB_.getDistinctName('_log_to_file', 'PROCEDURE');
    const funcDef = `def ${helperName}(path, msg):\n` +
        `  handler = logging.FileHandler(path)\n` +
        `  logger = logging.getLogger()\n` +
        `  logger.addHandler(handler)\n` +
        `  logger.info(msg)\n`;
    Python.definitions_ = Python.definitions_ || Object.create(null);
    if (!Python.definitions_[helperName]) {
        Python.definitions_[helperName] = funcDef;
    }
    return `${helperName}(${path}, ${msg})\n`;
};

Python.forBlock['tools_capture_stacktrace'] = function (block) {
    pythonGenerator.addImport('import traceback');
    return [`traceback.format_exc()`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['tools_timeit_block'] = function (block) {
    pythonGenerator.addImport('import time');
    const branch = Python.statementToCode(block, 'DO') || 'pass';
    const startVar = Python.nameDB_.getDistinctName('_start_time', 'VARIABLE');
    let code = `${startVar} = time.time()\n`;
    code += branch;
    code += `print(f"Execution time: {time.time() - ${startVar}:.4f}s")\n`;
    return code;
};

Python.forBlock['tools_profile_start_stop'] = function (block) {
    pythonGenerator.addImport('import cProfile');
    const action = block.getFieldValue('ACTION');
    const profilerVar = '_profiler';
    Python.definitions_ = Python.definitions_ || Object.create(null);
    if (!Python.definitions_[profilerVar]) {
        Python.definitions_[profilerVar] = `${profilerVar} = cProfile.Profile()\n`;
    }
    if (action === 'START') {
        return `${profilerVar}.enable()\n`;
    } else {
        return `${profilerVar}.disable()\n${profilerVar}.print_stats()\n`;
    }
};

Python.forBlock['tools_memory_snapshot'] = function (block) {
    pythonGenerator.addImport('import tracemalloc');
    return [`tracemalloc.take_snapshot()`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['tools_trace_function'] = function (block) {
    pythonGenerator.addImport('import sys');
    const fn = Python.valueToCode(block, 'FN', Python.ORDER_NONE) || 'None';
    return `sys.settrace(${fn})\n`;
};

Python.forBlock['tools_argparse_define'] = function (block) {
    pythonGenerator.addImport('import argparse');
    const arg = Python.valueToCode(block, 'ARG', Python.ORDER_NONE) || "''";
    const parserVar = '_arg_parser';
    Python.definitions_ = Python.definitions_ || Object.create(null);
    if (!Python.definitions_[parserVar]) {
        Python.definitions_[parserVar] = `${parserVar} = argparse.ArgumentParser()\n`;
    }
    return `${parserVar}.add_argument(${arg})\n`;
};

Python.forBlock['tools_argparse_parse'] = function (block) {
    const parserVar = '_arg_parser';
    Python.definitions_ = Python.definitions_ || Object.create(null);
    if (!Python.definitions_[parserVar]) {
        pythonGenerator.addImport('import argparse');
        Python.definitions_[parserVar] = `${parserVar} = argparse.ArgumentParser()\n`;
    }
    return [`${parserVar}.parse_args()`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['tools_print_help'] = function (block) {
    const parserVar = '_arg_parser';
    Python.definitions_ = Python.definitions_ || Object.create(null);
    if (!Python.definitions_[parserVar]) {
        pythonGenerator.addImport('import argparse');
        Python.definitions_[parserVar] = `${parserVar} = argparse.ArgumentParser()\n`;
    }
    return `${parserVar}.print_help()\n`;
};
