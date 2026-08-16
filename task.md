While dragging a block from the toolbox/flyout into the workspace, there is a brief visual disappearance/flicker of the dragged block, after which it appears again in the workspace. This looks like a Blockly/React re-render or toolbox/flyout refresh happening during the drag operation.

The likely issue is that the toolbox/flyout or workspace is being refreshed/re-rendered while Blockly is transferring the block from the flyout to the workspace.

task :

Fix the block-drag flicker visible in the uploaded video: when dragging a block from the toolbox/flyout into the workspace, the block briefly disappears and reappears. Trace the Blockly drag lifecycle and React state/re-render behavior, and prevent toolbox, flyout, workspace, or language state from refreshing/remounting during an active drag. The dragged block must remain continuously visible from pickup to placement, with smooth Blockly-native drag behavior, while preserving the existing Python, Java, and JavaScript functionality.
