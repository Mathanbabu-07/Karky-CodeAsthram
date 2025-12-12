import * as Blockly from 'blockly';

/**
 * Creates a new block from XML and adds it to the workspace.
 * @param {Blockly.Workspace} workspace The Blockly workspace.
 * @param {string} blockXml The XML string for the block.
 */
const addBlockFromXml = (workspace, blockXml) => {
  try {
    const textToDom = (Blockly.Xml && Blockly.Xml.textToDom) ||
                     (Blockly.utils && Blockly.utils.xml && Blockly.utils.xml.textToDom);
    const dom = textToDom(`<xml>${blockXml}</xml>`);
    const newBlockIds = Blockly.Xml.domToWorkspace(dom, workspace);
    if (newBlockIds.length > 0) {
      const newBlock = workspace.getBlockById(newBlockIds[0]);
      if (newBlock) {
        const svgRoot = newBlock.getSvgRoot();
        svgRoot.classList.add('tutorial-highlight');
        setTimeout(() => {
          svgRoot.classList.remove('tutorial-highlight');
        }, 1500);
      }
    }
  } catch (e) {
    console.error('Error adding block from XML:', e);
  }
};

/**
 * Connects two blocks in the workspace.
 * @param {Blockly.Workspace} workspace The Blockly workspace.
 * @param {string} childBlockId The ID of the block to be connected.
 * @param {string} parentBlockId The ID of the block to connect to.
 * @param {string} connectionName The name of the input/output connection.
 */
const connectBlocks = (workspace, childBlockId, parentBlockId, connectionName) => {
  const childBlock = workspace.getBlockById(childBlockId);
  const parentBlock = workspace.getBlockById(parentBlockId);

  if (childBlock && parentBlock) {
    let parentConnection;
    if (connectionName === 'NEXT') {
      parentConnection = parentBlock.nextConnection;
    } else {
      const input = parentBlock.getInput(connectionName);
      if (input) {
        parentConnection = input.connection;
      }
    }

    const childConnection = childBlock.outputConnection || childBlock.previousConnection;

    if (parentConnection && childConnection) {
      parentConnection.connect(childConnection);
    } else {
      console.warn('Could not find connection for connecting blocks.', {
        parent: parentBlock.type,
        child: childBlock.type,
        connectionName,
      });
    }
  }
};

/**
 * Sets the value of a field on a specific block.
 * @param {Blockly.Workspace} workspace The Blockly workspace.
 * @param {string} blockId The ID of the block to modify.
 * @param {string} fieldName The name of the field to change.
 * @param {string} value The new value for the field.
 */
const setFieldValue = (workspace, blockId, fieldName, value) => {
  const block = workspace.getBlockById(blockId);
  if (block) {
    block.setFieldValue(value, fieldName);
  }
};

/**
 * Applies a series of actions to the workspace.
 * @param {Blockly.Workspace} workspace The Blockly workspace.
 * @param {Array<Object>} actions The array of actions to apply.
 */
export const applyActions = (workspace, actions) => {
  if (!workspace || !actions) return;

  actions.forEach(action => {
    switch (action.type) {
      case 'clearWorkspace':
        workspace.clear();
        break;
      case 'addBlock':
        addBlockFromXml(workspace, action.blockXml);
        break;
      case 'connect':
        connectBlocks(workspace, action.childBlockId, action.parentBlockId, action.connectionName);
        break;
      case 'setField':
        setFieldValue(workspace, action.blockId, action.fieldName, action.value);
        break;
      default:
        console.warn(`Unknown tutorial action type: ${action.type}`);
    }
  });
};
