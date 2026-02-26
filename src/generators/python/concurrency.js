import { pythonGenerator as Python } from 'blockly/python';

Python.forBlock['concurrency_thread_start'] = function (block) {
    Python.addImport('import threading');
    const fn = Python.valueToCode(block, 'FN', Python.ORDER_NONE) || 'None';
    const args = Python.valueToCode(block, 'ARGS', Python.ORDER_NONE) || '[]';
    const helperName = Python.nameDB_.getDistinctName('_thread_start', 'PROCEDURE');
    const funcDef = `def ${helperName}(fn, args):\n` +
        `  t = threading.Thread(target=fn, args=args)\n` +
        `  t.start()\n` +
        `  return t\n`;
    Python.definitions_ = Python.definitions_ || Object.create(null);
    if (!Python.definitions_[helperName]) {
        Python.definitions_[helperName] = funcDef;
    }
    return [`${helperName}(${fn}, ${args})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['concurrency_thread_join'] = function (block) {
    const handle = Python.valueToCode(block, 'HANDLE', Python.ORDER_MEMBER) || 'None';
    return `${handle}.join()\n`;
};

Python.forBlock['concurrency_thread_pool_submit'] = function (block) {
    Python.addImport('from concurrent.futures import ThreadPoolExecutor');
    const fn = Python.valueToCode(block, 'FN', Python.ORDER_NONE) || 'None';
    const args = Python.valueToCode(block, 'ARGS', Python.ORDER_NONE) || '[]';
    const helperName = '_thread_pool';
    Python.definitions_ = Python.definitions_ || Object.create(null);
    if (!Python.definitions_[helperName]) {
        Python.definitions_[helperName] = `${helperName} = ThreadPoolExecutor()\n`;
    }
    return [`${helperName}.submit(${fn}, *${args})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['concurrency_future_result'] = function (block) {
    const handle = Python.valueToCode(block, 'HANDLE', Python.ORDER_MEMBER) || 'None';
    const timeout = Python.valueToCode(block, 'TIMEOUT', Python.ORDER_NONE) || 'None';
    return [`${handle}.result(timeout=${timeout})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['concurrency_thread_lock_acquire'] = function (block) {
    const lock = Python.valueToCode(block, 'LOCK', Python.ORDER_MEMBER) || 'None';
    return `${lock}.acquire()\n`;
};

Python.forBlock['concurrency_thread_lock_release'] = function (block) {
    const lock = Python.valueToCode(block, 'LOCK', Python.ORDER_MEMBER) || 'None';
    return `${lock}.release()\n`;
};

Python.forBlock['concurrency_async_def'] = function (block) {
    // Add mutator for params later
    const name = block.getFieldValue('NAME');
    const branch = Python.statementToCode(block, 'DO') || '  pass';
    return `async def ${name}():\n${branch}\n`;
};

Python.forBlock['concurrency_await_block'] = function (block) {
    const expr = Python.valueToCode(block, 'EXPR', Python.ORDER_NONE) || 'None';
    return [`await ${expr}`, Python.ORDER_AWAIT];
};

Python.forBlock['concurrency_async_sleep'] = function (block) {
    Python.addImport('import asyncio');
    const seconds = Python.valueToCode(block, 'SECONDS', Python.ORDER_NONE) || '0';
    return `await asyncio.sleep(${seconds})\n`;
};

Python.forBlock['concurrency_async_gather'] = function (block) {
    Python.addImport('import asyncio');
    const tasks = Python.valueToCode(block, 'TASKS', Python.ORDER_NONE) || '[]';
    return [`await asyncio.gather(*${tasks})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['concurrency_async_http_get'] = function (block) {
    Python.addImport('import aiohttp');
    const url = Python.valueToCode(block, 'URL', Python.ORDER_NONE) || "''";
    const helperName = Python.nameDB_.getDistinctName('_async_http_get', 'PROCEDURE');
    const funcDef = `async def ${helperName}(url):\n` +
        `  async with aiohttp.ClientSession() as session:\n` +
        `    async with session.get(url) as resp:\n` +
        `      return await resp.text()\n`;
    Python.definitions_ = Python.definitions_ || Object.create(null);
    if (!Python.definitions_[helperName]) {
        Python.definitions_[helperName] = funcDef;
    }
    return [`await ${helperName}(${url})`, Python.ORDER_AWAIT];
};

Python.forBlock['concurrency_queue_put'] = function (block) {
    const queue = Python.valueToCode(block, 'QUEUE', Python.ORDER_MEMBER) || 'None';
    const item = Python.valueToCode(block, 'ITEM', Python.ORDER_NONE) || 'None';
    return `${queue}.put(${item})\n`;
};

Python.forBlock['concurrency_queue_get'] = function (block) {
    const queue = Python.valueToCode(block, 'QUEUE', Python.ORDER_MEMBER) || 'None';
    const timeout = Python.valueToCode(block, 'TIMEOUT', Python.ORDER_NONE) || 'None';
    return [`${queue}.get(timeout=${timeout})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['concurrency_event_wait_set_clear'] = function (block) {
    const action = block.getFieldValue('ACTION');
    const event = Python.valueToCode(block, 'EVENT', Python.ORDER_MEMBER) || 'None';
    let code = '';
    if (action === 'WAIT') {
        code = `${event}.wait()`;
    } else if (action === 'SET') {
        code = `${event}.set()`;
    } else if (action === 'CLEAR') {
        code = `${event}.clear()`;
    }
    return code + '\n';
};

Python.forBlock['concurrency_schedule_every'] = function (block) {
    Python.addImport('import schedule');
    const fn = Python.valueToCode(block, 'FN', Python.ORDER_NONE) || 'None';
    const interval = Python.valueToCode(block, 'INTERVAL', Python.ORDER_NONE) || '1';
    return `schedule.every(${interval}).seconds.do(${fn})\n`;
};

Python.forBlock['concurrency_schedule_once'] = function (block) {
    Python.addImport('import threading');
    const fn = Python.valueToCode(block, 'FN', Python.ORDER_NONE) || 'None';
    const delay = Python.valueToCode(block, 'DELAY', Python.ORDER_NONE) || '1';
    return `threading.Timer(${delay}, ${fn}).start()\n`;
};

// Extracted from lower fragment
Python.forBlock['concurrency_semaphore_acquire_release'] = function (block) {
    const action = block.getFieldValue('ACTION');
    const semaphore = Python.valueToCode(block, 'SEMAPHORE', Python.ORDER_MEMBER) || 'None';
    let code = '';
    if (action === 'ACQUIRE') {
        code = `${semaphore}.acquire()`;
    } else if (action === 'RELEASE') {
        code = `${semaphore}.release()`;
    }
    return code + '\n';
};
