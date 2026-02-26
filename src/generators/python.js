import * as Blockly from 'blockly';
import { pythonGenerator } from 'blockly/python';

import './python/system.js';
import './python/graphics.js';
import './python/pandas.js';
import './python/numpy.js';
import './python/matplotlib.js';
import './python/seaborn.js';
import './python/sklearn.js';
import './python/tensorflow.js';
import './python/torch.js';
import './python/collections.js';
import './python/cv2.js';
import './python/datetime.js';
import './python/itertools.js';
import './python/re.js';
import './python/pillow.js';
import './python/beautifulsoup.js';
import './python/transformers.js';
import './python/requests.js';
import './python/fastapi.js';
import './python/pydantic.js';
import './python/json.js';
import './python/unittest.js';
import './python/logging.js';
import './python/argparse.js';
import './python/sqlalchemy.js';
import './python/essentials.js';
import './python/control.js';
import './python/math.js';
import './python/variables.js';
import './python/oop.js';
import './python/text.js';
import './python/filesystem.js';
import './python/datasci.js';
import './python/security.js';
import './python/concurrency.js';
import './python/structures.js';
import './python/media.js';
import './python/networking.js';
import './python/storage.js';
import './python/tools.js';
import './python/enterprise.js';
import './python/oop_extended.js';
import './python/builtin_methods.js';
import './python/special_blocks.js';

globalThis.Blockly = Blockly;
const Python = pythonGenerator;
globalThis.Python = Python;

// Custom import handling
pythonGenerator.imports_ = new Set();
pythonGenerator.addImport = function (module) {
  // Trim whitespace and normalize
  let cleanModule = (module || '').trim();

  // Strip redundant "import " prefix if someone accidentally includes it
  // This prevents "import import xxx" errors
  if (cleanModule.startsWith('import ') && !cleanModule.startsWith('import from')) {
    cleanModule = cleanModule.substring(7).trim();
  }

  this.imports_.add(cleanModule);
};

const originalFinish = pythonGenerator.finish;
pythonGenerator.finish = function (code) {
  // Handle both 'import X' and 'from X import Y' statements correctly
  const imports = [...this.imports_]
    .map(m => m.trim()) // Trim each import
    .filter(m => m) // Remove empty strings
    .map(m => {
      // If the import already starts with 'from' or 'import', use it as-is
      if (m.startsWith('from ') || m.startsWith('import ')) {
        return m;
      }
      // Otherwise, add 'import' prefix
      return `import ${m}`;
    })
    .filter((value, index, self) => self.indexOf(value) === index) // Deduplicate
    .join('\n');

  this.imports_.clear(); // Clear for next generation
  const finalCode = originalFinish.call(this, code);
  if (imports) {
    return imports + '\n' + finalCode;
  }
  return finalCode;
};
