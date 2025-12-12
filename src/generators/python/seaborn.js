import { pythonGenerator } from 'blockly/python';

pythonGenerator.forBlock['seaborn_load_dataset'] = function(block) {
    pythonGenerator.addImport('seaborn');
    const datasetName = block.getFieldValue('NAME');
    const code = `seaborn.load_dataset('${datasetName}')`;
    return [code, pythonGenerator.ORDER_FUNCTION_CALL];
};

pythonGenerator.forBlock['seaborn_set_theme'] = function(block) {
    pythonGenerator.addImport('seaborn');
    const theme = block.getFieldValue('THEME');
    return `seaborn.set_theme(style='${theme}')\n`;
};

pythonGenerator.forBlock['seaborn_lineplot'] = function(block) {
    pythonGenerator.addImport('seaborn');
    pythonGenerator.addImport('matplotlib.pyplot as plt');
    const data = pythonGenerator.valueToCode(block, 'DATA', pythonGenerator.ORDER_ATOMIC) || 'None';
    const x = pythonGenerator.valueToCode(block, 'X', pythonGenerator.ORDER_ATOMIC) || 'None';
    const y = pythonGenerator.valueToCode(block, 'Y', pythonGenerator.ORDER_ATOMIC) || 'None';
    const hue = pythonGenerator.valueToCode(block, 'HUE', pythonGenerator.ORDER_ATOMIC) || 'None';
    let code = `seaborn.lineplot(data=${data}, x=${x}, y=${y}`;
    if (hue && hue !== 'None') code += `, hue=${hue}`;
    code += ')\n';
    return code;
};

pythonGenerator.forBlock['seaborn_scatterplot'] = function(block) {
    pythonGenerator.addImport('seaborn');
    pythonGenerator.addImport('matplotlib.pyplot as plt');
    const data = pythonGenerator.valueToCode(block, 'DATA', pythonGenerator.ORDER_ATOMIC) || 'None';
    const x = pythonGenerator.valueToCode(block, 'X', pythonGenerator.ORDER_ATOMIC) || 'None';
    const y = pythonGenerator.valueToCode(block, 'Y', pythonGenerator.ORDER_ATOMIC) || 'None';
    const hue = pythonGenerator.valueToCode(block, 'HUE', pythonGenerator.ORDER_ATOMIC) || 'None';
    const size = pythonGenerator.valueToCode(block, 'SIZE', pythonGenerator.ORDER_ATOMIC) || 'None';
    let code = `seaborn.scatterplot(data=${data}, x=${x}, y=${y}`;
    if (hue && hue !== 'None') code += `, hue=${hue}`;
    if (size && size !== 'None') code += `, size=${size}`;
    code += ')\n';
    return code;
};

pythonGenerator.forBlock['seaborn_barplot'] = function(block) {
    pythonGenerator.addImport('seaborn');
    pythonGenerator.addImport('matplotlib.pyplot as plt');
    const data = pythonGenerator.valueToCode(block, 'DATA', pythonGenerator.ORDER_ATOMIC) || 'None';
    const x = pythonGenerator.valueToCode(block, 'X', pythonGenerator.ORDER_ATOMIC) || 'None';
    const y = pythonGenerator.valueToCode(block, 'Y', pythonGenerator.ORDER_ATOMIC) || 'None';
    const hue = pythonGenerator.valueToCode(block, 'HUE', pythonGenerator.ORDER_ATOMIC) || 'None';
    let code = `seaborn.barplot(data=${data}, x=${x}, y=${y}`;
    if (hue && hue !== 'None') code += `, hue=${hue}`;
    code += ')\n';
    return code;
};

pythonGenerator.forBlock['seaborn_histogram'] = function(block) {
    pythonGenerator.addImport('seaborn');
    pythonGenerator.addImport('matplotlib.pyplot as plt');
    const data = pythonGenerator.valueToCode(block, 'DATA', pythonGenerator.ORDER_ATOMIC) || 'None';
    const x = pythonGenerator.valueToCode(block, 'X', pythonGenerator.ORDER_ATOMIC) || 'None';
    const hue = pythonGenerator.valueToCode(block, 'HUE', pythonGenerator.ORDER_ATOMIC) || 'None';
    const bins = pythonGenerator.valueToCode(block, 'BINS', pythonGenerator.ORDER_ATOMIC) || 'None';
    let code = `seaborn.histplot(data=${data}, x=${x}`;
    if (hue && hue !== 'None') code += `, hue=${hue}`;
    if (bins && bins !== 'None') code += `, bins=${bins}`;
    code += ')\n';
    return code;
};

pythonGenerator.forBlock['seaborn_boxplot'] = function(block) {
    pythonGenerator.addImport('seaborn');
    pythonGenerator.addImport('matplotlib.pyplot as plt');
    const data = pythonGenerator.valueToCode(block, 'DATA', pythonGenerator.ORDER_ATOMIC) || 'None';
    const x = pythonGenerator.valueToCode(block, 'X', pythonGenerator.ORDER_ATOMIC) || 'None';
    const y = pythonGenerator.valueToCode(block, 'Y', pythonGenerator.ORDER_ATOMIC) || 'None';
    const hue = pythonGenerator.valueToCode(block, 'HUE', pythonGenerator.ORDER_ATOMIC) || 'None';
    let code = `seaborn.boxplot(data=${data}, x=${x}, y=${y}`;
    if (hue && hue !== 'None') code += `, hue=${hue}`;
    code += ')\n';
    return code;
};

pythonGenerator.forBlock['seaborn_violinplot'] = function(block) {
    pythonGenerator.addImport('seaborn');
    pythonGenerator.addImport('matplotlib.pyplot as plt');
    const data = pythonGenerator.valueToCode(block, 'DATA', pythonGenerator.ORDER_ATOMIC) || 'None';
    const x = pythonGenerator.valueToCode(block, 'X', pythonGenerator.ORDER_ATOMIC) || 'None';
    const y = pythonGenerator.valueToCode(block, 'Y', pythonGenerator.ORDER_ATOMIC) || 'None';
    const hue = pythonGenerator.valueToCode(block, 'HUE', pythonGenerator.ORDER_ATOMIC) || 'None';
    let code = `seaborn.violinplot(data=${data}, x=${x}, y=${y}`;
    if (hue && hue !== 'None') code += `, hue=${hue}`;
    code += ')\n';
    return code;
};

pythonGenerator.forBlock['seaborn_pairplot'] = function(block) {
    pythonGenerator.addImport('seaborn');
    pythonGenerator.addImport('matplotlib.pyplot as plt');
    const data = pythonGenerator.valueToCode(block, 'DATA', pythonGenerator.ORDER_ATOMIC) || 'None';
    const hue = pythonGenerator.valueToCode(block, 'HUE', pythonGenerator.ORDER_ATOMIC) || 'None';
    let code = `seaborn.pairplot(data=${data}`;
    if (hue && hue !== 'None') code += `, hue=${hue}`;
    code += ')\n';
    return code;
};

pythonGenerator.forBlock['seaborn_jointplot'] = function(block) {
    pythonGenerator.addImport('seaborn');
    pythonGenerator.addImport('matplotlib.pyplot as plt');
    const data = pythonGenerator.valueToCode(block, 'DATA', pythonGenerator.ORDER_ATOMIC) || 'None';
    const x = pythonGenerator.valueToCode(block, 'X', pythonGenerator.ORDER_ATOMIC) || 'None';
    const y = pythonGenerator.valueToCode(block, 'Y', pythonGenerator.ORDER_ATOMIC) || 'None';
    const kind = block.getFieldValue('KIND');
    return `seaborn.jointplot(data=${data}, x=${x}, y=${y}, kind='${kind}')\n`;
};

pythonGenerator.forBlock['seaborn_heatmap'] = function(block) {
    pythonGenerator.addImport('seaborn');
    pythonGenerator.addImport('matplotlib.pyplot as plt');
    const data = pythonGenerator.valueToCode(block, 'DATA', pythonGenerator.ORDER_ATOMIC) || 'None';
    const annot = pythonGenerator.valueToCode(block, 'ANNOT', pythonGenerator.ORDER_ATOMIC) || 'False';
    const cmap = pythonGenerator.valueToCode(block, 'CMAP', pythonGenerator.ORDER_ATOMIC) || 'None';
    let code = `seaborn.heatmap(data=${data}, annot=${annot}`;
    if (cmap && cmap !== 'None') code += `, cmap=${cmap}`;
    code += ')\n';
    return code;
};