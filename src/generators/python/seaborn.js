import { pythonGenerator as Python } from 'blockly/python';
Python.forBlock['seaborn_load_dataset'] = function(block) {
    Python.addImport('import seaborn as sns');
    const datasetName = block.getFieldValue('NAME');
    const code = `sns.load_dataset('${datasetName}')`;
    return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['seaborn_set_theme'] = function(block) {
    Python.addImport('import seaborn as sns');
    const theme = block.getFieldValue('THEME');
    return `sns.set_theme(style='${theme}')\n`;
};

Python.forBlock['seaborn_lineplot'] = function(block) {
    Python.addImport('import seaborn as sns');
    Python.addImport('import matplotlib.pyplot as plt');
    const data = Python.valueToCode(block, 'DATA', Python.ORDER_ATOMIC) || 'None';
    const x = Python.valueToCode(block, 'X', Python.ORDER_ATOMIC) || 'None';
    const y = Python.valueToCode(block, 'Y', Python.ORDER_ATOMIC) || 'None';
    const hue = Python.valueToCode(block, 'HUE', Python.ORDER_ATOMIC) || 'None';
    let code = `sns.lineplot(data=${data}, x=${x}, y=${y}`;
    if (hue && hue !== 'None') code += `, hue=${hue}`;
    code += ')\n';
    return code;
};

Python.forBlock['seaborn_scatterplot'] = function(block) {
    Python.addImport('import seaborn as sns');
    Python.addImport('import matplotlib.pyplot as plt');
    const data = Python.valueToCode(block, 'DATA', Python.ORDER_ATOMIC) || 'None';
    const x = Python.valueToCode(block, 'X', Python.ORDER_ATOMIC) || 'None';
    const y = Python.valueToCode(block, 'Y', Python.ORDER_ATOMIC) || 'None';
    const hue = Python.valueToCode(block, 'HUE', Python.ORDER_ATOMIC) || 'None';
    const size = Python.valueToCode(block, 'SIZE', Python.ORDER_ATOMIC) || 'None';
    let code = `sns.scatterplot(data=${data}, x=${x}, y=${y}`;
    if (hue && hue !== 'None') code += `, hue=${hue}`;
    if (size && size !== 'None') code += `, size=${size}`;
    code += ')\n';
    return code;
};

Python.forBlock['seaborn_barplot'] = function(block) {
    Python.addImport('import seaborn as sns');
    Python.addImport('import matplotlib.pyplot as plt');
    const data = Python.valueToCode(block, 'DATA', Python.ORDER_ATOMIC) || 'None';
    const x = Python.valueToCode(block, 'X', Python.ORDER_ATOMIC) || 'None';
    const y = Python.valueToCode(block, 'Y', Python.ORDER_ATOMIC) || 'None';
    const hue = Python.valueToCode(block, 'HUE', Python.ORDER_ATOMIC) || 'None';
    let code = `sns.barplot(data=${data}, x=${x}, y=${y}`;
    if (hue && hue !== 'None') code += `, hue=${hue}`;
    code += ')\n';
    return code;
};

Python.forBlock['seaborn_histogram'] = function(block) {
    Python.addImport('import seaborn as sns');
    Python.addImport('import matplotlib.pyplot as plt');
    const data = Python.valueToCode(block, 'DATA', Python.ORDER_ATOMIC) || 'None';
    const x = Python.valueToCode(block, 'X', Python.ORDER_ATOMIC) || 'None';
    const hue = Python.valueToCode(block, 'HUE', Python.ORDER_ATOMIC) || 'None';
    const bins = Python.valueToCode(block, 'BINS', Python.ORDER_ATOMIC) || 'None';
    let code = `sns.histplot(data=${data}, x=${x}`;
    if (hue && hue !== 'None') code += `, hue=${hue}`;
    if (bins && bins !== 'None') code += `, bins=${bins}`;
    code += ')\n';
    return code;
};

Python.forBlock['seaborn_boxplot'] = function(block) {
    Python.addImport('import seaborn as sns');
    Python.addImport('import matplotlib.pyplot as plt');
    const data = Python.valueToCode(block, 'DATA', Python.ORDER_ATOMIC) || 'None';
    const x = Python.valueToCode(block, 'X', Python.ORDER_ATOMIC) || 'None';
    const y = Python.valueToCode(block, 'Y', Python.ORDER_ATOMIC) || 'None';
    const hue = Python.valueToCode(block, 'HUE', Python.ORDER_ATOMIC) || 'None';
    let code = `sns.boxplot(data=${data}, x=${x}, y=${y}`;
    if (hue && hue !== 'None') code += `, hue=${hue}`;
    code += ')\n';
    return code;
};

Python.forBlock['seaborn_violinplot'] = function(block) {
    Python.addImport('import seaborn as sns');
    Python.addImport('import matplotlib.pyplot as plt');
    const data = Python.valueToCode(block, 'DATA', Python.ORDER_ATOMIC) || 'None';
    const x = Python.valueToCode(block, 'X', Python.ORDER_ATOMIC) || 'None';
    const y = Python.valueToCode(block, 'Y', Python.ORDER_ATOMIC) || 'None';
    const hue = Python.valueToCode(block, 'HUE', Python.ORDER_ATOMIC) || 'None';
    let code = `sns.violinplot(data=${data}, x=${x}, y=${y}`;
    if (hue && hue !== 'None') code += `, hue=${hue}`;
    code += ')\n';
    return code;
};

Python.forBlock['seaborn_pairplot'] = function(block) {
    Python.addImport('import seaborn as sns');
    Python.addImport('import matplotlib.pyplot as plt');
    const data = Python.valueToCode(block, 'DATA', Python.ORDER_ATOMIC) || 'None';
    const hue = Python.valueToCode(block, 'HUE', Python.ORDER_ATOMIC) || 'None';
    let code = `sns.pairplot(data=${data}`;
    if (hue && hue !== 'None') code += `, hue=${hue}`;
    code += ')\n';
    return code;
};

Python.forBlock['seaborn_jointplot'] = function(block) {
    Python.addImport('import seaborn as sns');
    Python.addImport('import matplotlib.pyplot as plt');
    const data = Python.valueToCode(block, 'DATA', Python.ORDER_ATOMIC) || 'None';
    const x = Python.valueToCode(block, 'X', Python.ORDER_ATOMIC) || 'None';
    const y = Python.valueToCode(block, 'Y', Python.ORDER_ATOMIC) || 'None';
    const kind = block.getFieldValue('KIND');
    return `sns.jointplot(data=${data}, x=${x}, y=${y}, kind='${kind}')\n`;
};

Python.forBlock['seaborn_heatmap'] = function(block) {
    Python.addImport('import seaborn as sns');
    Python.addImport('import matplotlib.pyplot as plt');
    const data = Python.valueToCode(block, 'DATA', Python.ORDER_ATOMIC) || 'None';
    const annot = Python.valueToCode(block, 'ANNOT', Python.ORDER_ATOMIC) || 'False';
    const cmap = Python.valueToCode(block, 'CMAP', Python.ORDER_ATOMIC) || 'None';
    let code = `sns.heatmap(data=${data}, annot=${annot}`;
    if (cmap && cmap !== 'None') code += `, cmap=${cmap}`;
    code += ')\n';
    return code;
};