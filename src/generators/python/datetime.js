// src/generators/python/datetime.js
import { pythonGenerator as Python } from 'blockly/python';

Python.forBlock['datetime_now'] = function(block) {
  Python.addImport('from datetime import datetime');
  return ['datetime.now()', Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['datetime_date'] = function(block) {
  Python.addImport('from datetime import date');
  const year = Python.valueToCode(block, 'YEAR', Python.ORDER_NONE) || '2000';
  const month = Python.valueToCode(block, 'MONTH', Python.ORDER_NONE) || '1';
  const day = Python.valueToCode(block, 'DAY', Python.ORDER_NONE) || '1';
  return [`date(${year}, ${month}, ${day})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['datetime_time'] = function(block) {
  Python.addImport('from datetime import time');
  const hour = Python.valueToCode(block, 'HOUR', Python.ORDER_NONE) || '0';
  const minute = Python.valueToCode(block, 'MINUTE', Python.ORDER_NONE) || '0';
  const second = Python.valueToCode(block, 'SECOND', Python.ORDER_NONE) || '0';
  return [`time(${hour}, ${minute}, ${second})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['datetime_datetime'] = function(block) {
  Python.addImport('from datetime import datetime');
  const year = Python.valueToCode(block, 'YEAR', Python.ORDER_NONE) || '2000';
  const month = Python.valueToCode(block, 'MONTH', Python.ORDER_NONE) || '1';
  const day = Python.valueToCode(block, 'DAY', Python.ORDER_NONE) || '1';
  const hour = Python.valueToCode(block, 'HOUR', Python.ORDER_NONE) || '0';
  const minute = Python.valueToCode(block, 'MINUTE', Python.ORDER_NONE) || '0';
  const second = Python.valueToCode(block, 'SECOND', Python.ORDER_NONE) || '0';
  return [`datetime(${year}, ${month}, ${day}, ${hour}, ${minute}, ${second})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['datetime_timedelta'] = function(block) {
  Python.addImport('from datetime import timedelta');
  const days = Python.valueToCode(block, 'DAYS', Python.ORDER_NONE) || '0';
  const seconds = Python.valueToCode(block, 'SECONDS', Python.ORDER_NONE) || '0';
  const microseconds = Python.valueToCode(block, 'MICROSECONDS', Python.ORDER_NONE) || '0';
  const milliseconds = Python.valueToCode(block, 'MILLISECONDS', Python.ORDER_NONE) || '0';
  const minutes = Python.valueToCode(block, 'MINUTES', Python.ORDER_NONE) || '0';
  const hours = Python.valueToCode(block, 'HOURS', Python.ORDER_NONE) || '0';
  const weeks = Python.valueToCode(block, 'WEEKS', Python.ORDER_NONE) || '0';
  const code = `timedelta(days=${days}, seconds=${seconds}, microseconds=${microseconds}, milliseconds=${milliseconds}, minutes=${minutes}, hours=${hours}, weeks=${weeks})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['datetime_strftime'] = function(block) {
  const dt = Python.valueToCode(block, 'DATETIME', Python.ORDER_MEMBER) || 'None';
  const fmt = Python.valueToCode(block, 'FORMAT', Python.ORDER_NONE) || "''";
  return [`${dt}.strftime(${fmt})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['datetime_strptime'] = function(block) {
  Python.addImport('from datetime import datetime');
  const dateString = Python.valueToCode(block, 'STRING', Python.ORDER_NONE) || "''";
  const fmt = Python.valueToCode(block, 'FORMAT', Python.ORDER_NONE) || "''";
  return [`datetime.strptime(${dateString}, ${fmt})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['datetime_fromtimestamp'] = function(block) {
  Python.addImport('from datetime import datetime');
  const timestamp = Python.valueToCode(block, 'TIMESTAMP', Python.ORDER_NONE) || '0';
  return [`datetime.fromtimestamp(${timestamp})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['datetime_timestamp'] = function(block) {
  const dt = Python.valueToCode(block, 'DATETIME', Python.ORDER_MEMBER) || 'None';
  return [`${dt}.timestamp()`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['time_sleep'] = function(block) {
  Python.addImport('import time');
  const secs = Python.valueToCode(block, 'SECS', Python.ORDER_NONE) || '1';
  return `time.sleep(${secs})\n`;
};

Python.forBlock['datetime_getattr'] = function(block) {
  const attr = block.getFieldValue('ATTR');
  const dt = Python.valueToCode(block, 'DATETIME', Python.ORDER_MEMBER) || 'None';
  return [`${dt}.${attr}`, Python.ORDER_MEMBER];
};

Python.forBlock['datetime_timezone'] = function(block) {
  Python.addImport('from datetime import timezone, timedelta');
  const offset = Python.valueToCode(block, 'OFFSET', Python.ORDER_NONE) || '0';
  return [`timezone(timedelta(hours=${offset}))`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['datetime_astimezone'] = function(block) {
  const dt = Python.valueToCode(block, 'DATETIME', Python.ORDER_MEMBER) || 'None';
  const tz = Python.valueToCode(block, 'TZ', Python.ORDER_NONE) || 'None';
  return [`${dt}.astimezone(${tz})`, Python.ORDER_FUNCTION_CALL];
};