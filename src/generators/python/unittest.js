import { pythonGenerator } from 'blockly/python';

pythonGenerator.forBlock['unittest_main'] = function(block, generator) {
    generator.addImport('unittest');
    return 'if __name__ == "__main__":\n    unittest.main()\n';
};

pythonGenerator.forBlock['unittest_testcase'] = function(block, generator) {
    generator.addImport('unittest');
    const name = block.getFieldValue('NAME');
    const tests = generator.statementToCode(block, 'TESTS');
    const code = `class ${name}(unittest.TestCase):\n${tests || '    pass\n'}`;
    return code;
};

pythonGenerator.forBlock['unittest_testfunction'] = function(block, generator) {
    const name = block.getFieldValue('NAME');
    const body = generator.statementToCode(block, 'BODY');
    const code = `    def ${name}(self):\n${body || '        pass\n'}`;
    return code;
};

pythonGenerator.forBlock['unittest_assert_equal'] = function(block, generator) {
    const actual = generator.valueToCode(block, 'ACTUAL', generator.ORDER_ATOMIC) || 'None';
    const expected = generator.valueToCode(block, 'EXPECTED', generator.ORDER_ATOMIC) || 'None';
    return `        self.assertEqual(${actual}, ${expected})\n`;
};

pythonGenerator.forBlock['unittest_assert_true'] = function(block, generator) {
    const value = generator.valueToCode(block, 'VALUE', generator.ORDER_ATOMIC) || 'None';
    return `        self.assertTrue(${value})\n`;
};

pythonGenerator.forBlock['unittest_assert_false'] = function(block, generator) {
    const value = generator.valueToCode(block, 'VALUE', generator.ORDER_ATOMIC) || 'None';
    return `        self.assertFalse(${value})\n`;
};

pythonGenerator.forBlock['unittest_assert_raises'] = function(block, generator) {
    const exception = generator.valueToCode(block, 'EXCEPTION', generator.ORDER_ATOMIC) || 'Exception';
    const callable = generator.statementToCode(block, 'CALLABLE');
    const code = `        with self.assertRaises(${exception}):\n${callable || '            pass\n'}`;
    return code;
};