import { pythonGenerator as Python } from 'blockly/python';
Python.forBlock['matplotlib_plot'] = function(block) {
  Python.addImport('import matplotlib.pyplot as plt');
  const x = Python.valueToCode(block, 'X', Python.ORDER_ATOMIC) || '[]';
  const y = Python.valueToCode(block, 'Y', Python.ORDER_ATOMIC) || '[]';
  const label = block.getFieldValue('LABEL');
  const style = block.getFieldValue('STYLE');
  const color = Python.valueToCode(block, 'COLOR', Python.ORDER_ATOMIC) || 'None';
  const marker = block.getFieldValue('MARKER');

  let code = `plt.plot(${x}, ${y}, linestyle=${style}, color=${color}, marker=${marker}`;
  if (label) {
    code += `, label='${label}'`;
  }
  code += ')\n';

  return code;
};

Python.forBlock['matplotlib_show'] = function(block) {
  Python.addImport('import matplotlib.pyplot as plt');
  return 'plt.show()\n';
};

Python.forBlock['matplotlib_title'] = function(block) {
  Python.addImport('import matplotlib.pyplot as plt');
  const title = Python.valueToCode(block, 'TITLE', Python.ORDER_ATOMIC) || "''";
  return `plt.title(${title})\n`;
};

Python.forBlock['matplotlib_xlabel'] = function(block) {
    Python.addImport('import matplotlib.pyplot as plt');
    const label = Python.valueToCode(block, 'LABEL', Python.ORDER_ATOMIC) || "''";
    return `plt.xlabel(${label})\n`;
};

Python.forBlock['matplotlib_ylabel'] = function(block) {
    Python.addImport('import matplotlib.pyplot as plt');
    const label = Python.valueToCode(block, 'LABEL', Python.ORDER_ATOMIC) || "''";
    return `plt.ylabel(${label})\n`;
};

Python.forBlock['matplotlib_legend'] = function(block) {
    Python.addImport('import matplotlib.pyplot as plt');
    return `plt.legend()\n`;
};

Python.forBlock['matplotlib_scatter'] = function(block) {
    Python.addImport('import matplotlib.pyplot as plt');
    const x = Python.valueToCode(block, 'X', Python.ORDER_ATOMIC) || '[]';
    const y = Python.valueToCode(block, 'Y', Python.ORDER_ATOMIC) || '[]';
    return `plt.scatter(${x}, ${y})\n`;
};

Python.forBlock['matplotlib_bar'] = function(block) {
    Python.addImport('import matplotlib.pyplot as plt');
    const x = Python.valueToCode(block, 'X', Python.ORDER_ATOMIC) || '[]';
    const y = Python.valueToCode(block, 'Y', Python.ORDER_ATOMIC) || '[]';
    return `plt.bar(${x}, ${y})\n`;
};

Python.forBlock['matplotlib_hist'] = function(block) {
    Python.addImport('import matplotlib.pyplot as plt');
    const data = Python.valueToCode(block, 'DATA', Python.ORDER_ATOMIC) || '[]';
    const bins = Python.valueToCode(block, 'BINS', Python.ORDER_ATOMIC) || 'None';
    return `plt.hist(${data}, bins=${bins})\n`;
};

Python.forBlock['matplotlib_figure'] = function(block) {
    Python.addImport('import matplotlib.pyplot as plt');
    const width = Python.valueToCode(block, 'WIDTH', Python.ORDER_ATOMIC) || 'None';
    const height = Python.valueToCode(block, 'HEIGHT', Python.ORDER_ATOMIC) || 'None';
    return `plt.figure(figsize=(${width}, ${height}))\n`;
};

Python.forBlock['matplotlib_subplot'] = function(block) {
    Python.addImport('import matplotlib.pyplot as plt');
    const row = Python.valueToCode(block, 'ROW', Python.ORDER_ATOMIC) || '1';
    const col = Python.valueToCode(block, 'COL', Python.ORDER_ATOMIC) || '1';
    const index = Python.valueToCode(block, 'INDEX', Python.ORDER_ATOMIC) || '1';
    return `plt.subplot(${row}, ${col}, ${index})\n`;
};

Python.forBlock['matplotlib_grid'] = function(block) {
    Python.addImport('import matplotlib.pyplot as plt');
    const visible = block.getFieldValue('VISIBLE') === 'TRUE';
    return `plt.grid(${visible ? 'True' : 'False'})\n`;
};

Python.forBlock['matplotlib_xlim'] = function(block) {
    Python.addImport('import matplotlib.pyplot as plt');
    const left = Python.valueToCode(block, 'LEFT', Python.ORDER_ATOMIC) || 'None';
    const right = Python.valueToCode(block, 'RIGHT', Python.ORDER_ATOMIC) || 'None';
    return `plt.xlim(${left}, ${right})\n`;
};

Python.forBlock['matplotlib_ylim'] = function(block) {
    Python.addImport('import matplotlib.pyplot as plt');
    const bottom = Python.valueToCode(block, 'BOTTOM', Python.ORDER_ATOMIC) || 'None';
    const top = Python.valueToCode(block, 'TOP', Python.ORDER_ATOMIC) || 'None';
    return `plt.ylim(${bottom}, ${top})\n`;
};

Python.forBlock['matplotlib_savefig'] = function(block) {
    Python.addImport('import matplotlib.pyplot as plt');
    const path = Python.valueToCode(block, 'PATH', Python.ORDER_ATOMIC) || "''";
    return `plt.savefig(${path})\n`;
};

Python.forBlock['matplotlib_subplots'] = function(block) {
    Python.addImport('import matplotlib.pyplot as plt');
    const nrows = Python.valueToCode(block, 'NROWS', Python.ORDER_ATOMIC) || '1';
    const ncols = Python.valueToCode(block, 'NCOLS', Python.ORDER_ATOMIC) || '1';
    return [`plt.subplots(nrows=${nrows}, ncols=${ncols})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['matplotlib_pie'] = function(block) {
    Python.addImport('import matplotlib.pyplot as plt');
    const values = Python.valueToCode(block, 'VALUES', Python.ORDER_ATOMIC) || '[]';
    const labels = Python.valueToCode(block, 'LABELS', Python.ORDER_ATOMIC) || 'None';
    return `plt.pie(${values}, labels=${labels})\n`;
};

Python.forBlock['matplotlib_imshow'] = function(block) {
    Python.addImport('import matplotlib.pyplot as plt');
    const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
    return `plt.imshow(${image})\n`;
};

Python.forBlock['matplotlib_tight_layout'] = function(block) {
    Python.addImport('import matplotlib.pyplot as plt');
    return `plt.tight_layout()\n`;
};