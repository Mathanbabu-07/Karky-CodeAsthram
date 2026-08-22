const fs = require('fs');
const path = require('path');

// Let's create the complete 20 JS Templates + 20 Java Templates definitions
const jsTemplatesXml = {
  "JS_COUNTER_THRESHOLD_XML": `<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="js_var_let" x="30" y="30">
    <field name="VAR">counter</field>
    <value name="VALUE"><block type="math_number"><field name="NUM">0</field></block></value>
    <next>
      <block type="js_for_loop">
        <field name="VAR">i</field>
        <value name="FROM"><block type="math_number"><field name="NUM">1</field></block></value>
        <value name="TO"><block type="math_number"><field name="NUM">10</field></block></value>
        <value name="STEP"><block type="math_number"><field name="NUM">1</field></block></value>
        <statement name="DO">
          <block type="js_var_assign">
            <field name="VAR">counter</field>
            <value name="VALUE">
              <block type="js_math_arithmetic">
                <field name="OP">+</field>
                <value name="A"><block type="variables_get"><field name="VAR">counter</field></block></value>
                <value name="B"><block type="variables_get"><field name="VAR">i</field></block></value>
              </block>
            </value>
            <next>
              <block type="js_if_else">
                <value name="COND">
                  <block type="js_logic_compare">
                    <field name="OP">&gt;=</field>
                    <value name="A"><block type="variables_get"><field name="VAR">counter</field></block></value>
                    <value name="B"><block type="math_number"><field name="NUM">15</field></block></value>
                  </block>
                </value>
                <statement name="THEN">
                  <block type="js_console_log">
                    <value name="TEXT"><block type="text"><field name="TEXT">Threshold Reached!</field></block></value>
                  </block>
                </statement>
              </block>
            </next>
          </block>
        </statement>
        <next>
          <block type="js_console_log">
            <value name="TEXT"><block type="variables_get"><field name="VAR">counter</field></block></value>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>`,

  "JS_GREETING_BOT_XML": `<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="js_var_const" x="30" y="30">
    <field name="VAR">userName</field>
    <value name="VALUE"><block type="text"><field name="TEXT">Karky</field></block></value>
    <next>
      <block type="js_var_let">
        <field name="VAR">currentHour</field>
        <value name="VALUE"><block type="math_number"><field name="NUM">14</field></block></value>
        <next>
          <block type="js_var_let">
            <field name="VAR">greeting</field>
            <value name="VALUE"><block type="text"><field name="TEXT">Hello</field></block></value>
            <next>
              <block type="js_if_else">
                <value name="COND">
                  <block type="js_logic_compare">
                    <field name="OP">&lt;</field>
                    <value name="A"><block type="variables_get"><field name="VAR">currentHour</field></block></value>
                    <value name="B"><block type="math_number"><field name="NUM">12</field></block></value>
                  </block>
                </value>
                <statement name="THEN">
                  <block type="js_var_assign">
                    <field name="VAR">greeting</field>
                    <value name="VALUE"><block type="text"><field name="TEXT">Good Morning</field></block></value>
                  </block>
                </statement>
                <next>
                  <block type="js_console_log">
                    <value name="TEXT">
                      <block type="text_concat">
                        <value name="A"><block type="variables_get"><field name="VAR">greeting</field></block></value>
                        <value name="B"><block type="variables_get"><field name="VAR">userName</field></block></value>
                      </block>
                    </value>
                  </block>
                </next>
              </block>
            </next>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>`,

  "JS_TRAFFIC_LIGHT_XML": `<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="js_var_let" x="30" y="30">
    <field name="VAR">lightState</field>
    <value name="VALUE"><block type="text"><field name="TEXT">RED</field></block></value>
    <next>
      <block type="js_switch">
        <field name="CASE1">RED</field>
        <field name="CASE2">YELLOW</field>
        <field name="CASE3">GREEN</field>
        <value name="EXPR"><block type="variables_get"><field name="VAR">lightState</field></block></value>
        <statement name="DO1">
          <block type="js_console_log"><value name="TEXT"><block type="text"><field name="TEXT">Stop and wait.</field></block></value></block>
        </statement>
        <statement name="DO2">
          <block type="js_console_log"><value name="TEXT"><block type="text"><field name="TEXT">Prepare to go.</field></block></value></block>
        </statement>
        <statement name="DO3">
          <block type="js_console_log"><value name="TEXT"><block type="text"><field name="TEXT">Proceed safely.</field></block></value></block>
        </statement>
      </block>
    </next>
  </block>
</xml>`,

  "JS_SIMPLE_CALCULATOR_XML": `<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="js_function_decl" x="30" y="30">
    <field name="NAME">calculateTotal</field>
    <field name="PARAMS">price, quantity, discount</field>
    <statement name="BODY">
      <block type="js_var_let">
        <field name="VAR">subtotal</field>
        <value name="VALUE">
          <block type="js_math_arithmetic">
            <field name="OP">*</field>
            <value name="A"><block type="variables_get"><field name="VAR">price</field></block></value>
            <value name="B"><block type="variables_get"><field name="VAR">quantity</field></block></value>
          </block>
        </value>
        <next>
          <block type="js_return">
            <value name="VALUE">
              <block type="js_math_arithmetic">
                <field name="OP">-</field>
                <value name="A"><block type="variables_get"><field name="VAR">subtotal</field></block></value>
                <value name="B"><block type="variables_get"><field name="VAR">discount</field></block></value>
              </block>
            </value>
          </block>
        </next>
      </block>
    </statement>
    <next>
      <block type="js_var_const">
        <field name="VAR">finalBill</field>
        <value name="VALUE">
          <block type="js_function_call">
            <field name="NAME">calculateTotal</field>
            <value name="ARGS"><block type="text"><field name="TEXT">25, 4, 10</field></block></value>
          </block>
        </value>
        <next>
          <block type="js_console_log"><value name="TEXT"><block type="variables_get"><field name="VAR">finalBill</field></block></value></block>
        </next>
      </block>
    </next>
  </block>
</xml>`,

  "JS_TEMP_CONVERTER_XML": `<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="js_function_decl" x="30" y="30">
    <field name="NAME">celsiusToFahrenheit</field>
    <field name="PARAMS">c</field>
    <statement name="BODY">
      <block type="js_return">
        <value name="VALUE">
          <block type="js_math_arithmetic">
            <field name="OP">+</field>
            <value name="A">
              <block type="js_math_arithmetic">
                <field name="OP">*</field>
                <value name="A"><block type="variables_get"><field name="VAR">c</field></block></value>
                <value name="B"><block type="math_number"><field name="NUM">1.8</field></block></value>
              </block>
            </value>
            <value name="B"><block type="math_number"><field name="NUM">32</field></block></value>
          </block>
        </value>
      </block>
    </statement>
    <next>
      <block type="js_var_const">
        <field name="VAR">tempC</field>
        <value name="VALUE"><block type="math_number"><field name="NUM">37</field></block></value>
        <next>
          <block type="js_console_log">
            <value name="TEXT">
              <block type="js_function_call">
                <field name="NAME">celsiusToFahrenheit</field>
                <value name="ARGS"><block type="variables_get"><field name="VAR">tempC</field></block></value>
              </block>
            </value>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>`,

  "JS_NUMBER_GUESSING_XML": `<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="js_var_const" x="30" y="30">
    <field name="VAR">secretTarget</field>
    <value name="VALUE"><block type="math_number"><field name="NUM">42</field></block></value>
    <next>
      <block type="js_var_let">
        <field name="VAR">userGuess</field>
        <value name="VALUE"><block type="math_number"><field name="NUM">38</field></block></value>
        <next>
          <block type="js_if_else">
            <value name="COND">
              <block type="js_logic_compare">
                <field name="OP">===</field>
                <value name="A"><block type="variables_get"><field name="VAR">userGuess</field></block></value>
                <value name="B"><block type="variables_get"><field name="VAR">secretTarget</field></block></value>
              </block>
            </value>
            <statement name="THEN">
              <block type="js_console_log"><value name="TEXT"><block type="text"><field name="TEXT">Correct guess!</field></block></value></block>
            </statement>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>`,

  "JS_GROCERY_TOTAL_XML": `<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="js_var_const" x="30" y="30">
    <field name="VAR">itemPrices</field>
    <value name="VALUE"><block type="js_array_create"><field name="ITEMS">12.5, 4.0, 7.99, 15.2</field></block></value>
    <next>
      <block type="js_var_let">
        <field name="VAR">grandTotal</field>
        <value name="VALUE"><block type="math_number"><field name="NUM">0</field></block></value>
        <next>
          <block type="js_for_of">
            <field name="ITEM">price</field>
            <value name="LIST"><block type="variables_get"><field name="VAR">itemPrices</field></block></value>
            <statement name="DO">
              <block type="js_var_assign">
                <field name="VAR">grandTotal</field>
                <value name="VALUE">
                  <block type="js_math_arithmetic">
                    <field name="OP">+</field>
                    <value name="A"><block type="variables_get"><field name="VAR">grandTotal</field></block></value>
                    <value name="B"><block type="variables_get"><field name="VAR">price</field></block></value>
                  </block>
                </value>
              </block>
            </statement>
            <next>
              <block type="js_console_log"><value name="TEXT"><block type="variables_get"><field name="VAR">grandTotal</field></block></value></block>
            </next>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>`,

  "JS_ARRAY_TRANSFORMER_XML": `<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="js_var_const" x="30" y="30">
    <field name="VAR">numbers</field>
    <value name="VALUE">
      <block type="js_array_create"><field name="ITEMS">10, 25, 30, 45, 50</field></block>
    </value>
    <next>
      <block type="js_var_let">
        <field name="VAR">sum</field>
        <value name="VALUE"><block type="math_number"><field name="NUM">0</field></block></value>
        <next>
          <block type="js_for_of">
            <field name="ITEM">num</field>
            <value name="LIST"><block type="variables_get"><field name="VAR">numbers</field></block></value>
            <statement name="DO">
              <block type="js_var_assign">
                <field name="VAR">sum</field>
                <value name="VALUE">
                  <block type="js_math_arithmetic">
                    <field name="OP">+</field>
                    <value name="A"><block type="variables_get"><field name="VAR">sum</field></block></value>
                    <value name="B"><block type="variables_get"><field name="VAR">num</field></block></value>
                  </block>
                </value>
              </block>
            </statement>
            <next>
              <block type="js_console_log">
                <value name="TEXT"><block type="variables_get"><field name="VAR">sum</field></block></value>
              </block>
            </next>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>`,

  "JS_JSON_PROCESSOR_XML": `<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="js_var_const" x="30" y="30">
    <field name="VAR">userProfile</field>
    <value name="VALUE">
      <block type="js_object_create">
        <field name="PAIRS">username: "alex99", role: "admin", level: 5</field>
      </block>
    </value>
    <next>
      <block type="js_var_const">
        <field name="VAR">serialized</field>
        <value name="VALUE">
          <block type="js_json_stringify">
            <value name="OBJ"><block type="variables_get"><field name="VAR">userProfile</field></block></value>
          </block>
        </value>
        <next>
          <block type="js_console_log">
            <value name="TEXT"><block type="variables_get"><field name="VAR">serialized</field></block></value>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>`,

  "JS_WORD_FREQUENCY_XML": `<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="js_var_const" x="30" y="30">
    <field name="VAR">wordMap</field>
    <value name="VALUE"><block type="js_map_create"></block></value>
    <next>
      <block type="js_map_set_get">
        <field name="ACTION">SET</field>
        <value name="MAP"><block type="variables_get"><field name="VAR">wordMap</field></block></value>
        <value name="KEY"><block type="text"><field name="TEXT">apple</field></block></value>
        <value name="VAL"><block type="math_number"><field name="NUM">3</field></block></value>
        <next>
          <block type="js_map_set_get">
            <field name="ACTION">SET</field>
            <value name="MAP"><block type="variables_get"><field name="VAR">wordMap</field></block></value>
            <value name="KEY"><block type="text"><field name="TEXT">banana</field></block></value>
            <value name="VAL"><block type="math_number"><field name="NUM">5</field></block></value>
            <next>
              <block type="js_console_log">
                <value name="TEXT">
                  <block type="js_map_set_get">
                    <field name="ACTION">GET</field>
                    <value name="MAP"><block type="variables_get"><field name="VAR">wordMap</field></block></value>
                    <value name="KEY"><block type="text"><field name="TEXT">banana</field></block></value>
                  </block>
                </value>
              </block>
            </next>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>`,

  "JS_PALINDROME_CHECKER_XML": `<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="js_function_decl" x="30" y="30">
    <field name="NAME">isPalindrome</field>
    <field name="PARAMS">str</field>
    <statement name="BODY">
      <block type="js_var_const">
        <field name="VAR">cleaned</field>
        <value name="VALUE"><block type="text_transform"><field name="OP">LOWER</field><value name="TEXT"><block type="variables_get"><field name="VAR">str</field></block></value></block></value>
        <next>
          <block type="js_return">
            <value name="VALUE">
              <block type="js_logic_compare">
                <field name="OP">===</field>
                <value name="A"><block type="variables_get"><field name="VAR">cleaned</field></block></value>
                <value name="B"><block type="text_transform"><field name="OP">LOWER</field><value name="TEXT"><block type="variables_get"><field name="VAR">str</field></block></value></block></value>
              </block>
            </value>
          </block>
        </next>
      </block>
    </statement>
    <next>
      <block type="js_console_log">
        <value name="TEXT">
          <block type="js_function_call">
            <field name="NAME">isPalindrome</field>
            <value name="ARGS"><block type="text"><field name="TEXT">racecar</field></block></value>
          </block>
        </value>
      </block>
    </next>
  </block>
</xml>`,

  "JS_UNIQUE_TAG_EXTRACTOR_XML": `<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="js_var_const" x="30" y="30">
    <field name="VAR">tagSet</field>
    <value name="VALUE"><block type="js_set_create"></block></value>
    <next>
      <block type="js_set_add_has">
        <field name="ACTION">ADD</field>
        <value name="SET"><block type="variables_get"><field name="VAR">tagSet</field></block></value>
        <value name="VAL"><block type="text"><field name="TEXT">javascript</field></block></value>
        <next>
          <block type="js_set_add_has">
            <field name="ACTION">ADD</field>
            <value name="SET"><block type="variables_get"><field name="VAR">tagSet</field></block></value>
            <value name="VAL"><block type="text"><field name="TEXT">react</field></block></value>
            <next>
              <block type="js_console_log">
                <value name="TEXT"><block type="variables_get"><field name="VAR">tagSet</field></block></value>
              </block>
            </next>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>`,

  "JS_STUDENT_RANKING_XML": `<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="js_var_const" x="30" y="30">
    <field name="VAR">scores</field>
    <value name="VALUE"><block type="js_array_create"><field name="ITEMS">88, 95, 72, 100, 84</field></block></value>
    <next>
      <block type="js_var_const">
        <field name="VAR">sortedScores</field>
        <value name="VALUE"><block type="sorted_block"><value name="ITERABLE"><block type="variables_get"><field name="VAR">scores</field></block></value></block></value>
        <next>
          <block type="js_console_log"><value name="TEXT"><block type="variables_get"><field name="VAR">sortedScores</field></block></value></block>
        </next>
      </block>
    </next>
  </block>
</xml>`,

  "JS_FIBONACCI_GENERATOR_XML": `<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="js_var_let" x="30" y="30">
    <field name="VAR">a</field>
    <value name="VALUE"><block type="math_number"><field name="NUM">0</field></block></value>
    <next>
      <block type="js_var_let">
        <field name="VAR">b</field>
        <value name="VALUE"><block type="math_number"><field name="NUM">1</field></block></value>
        <next>
          <block type="js_for_loop">
            <field name="VAR">step</field>
            <value name="FROM"><block type="math_number"><field name="NUM">1</field></block></value>
            <value name="TO"><block type="math_number"><field name="NUM">8</field></block></value>
            <value name="STEP"><block type="math_number"><field name="NUM">1</field></block></value>
            <statement name="DO">
              <block type="js_console_log">
                <value name="TEXT"><block type="variables_get"><field name="VAR">a</field></block></value>
                <next>
                  <block type="js_var_let">
                    <field name="VAR">temp</field>
                    <value name="VALUE">
                      <block type="js_math_arithmetic">
                        <field name="OP">+</field>
                        <value name="A"><block type="variables_get"><field name="VAR">a</field></block></value>
                        <value name="B"><block type="variables_get"><field name="VAR">b</field></block></value>
                      </block>
                    </value>
                    <next>
                      <block type="js_var_assign"><field name="VAR">a</field><value name="VALUE"><block type="variables_get"><field name="VAR">b</field></block></value>
                        <next>
                          <block type="js_var_assign"><field name="VAR">b</field><value name="VALUE"><block type="variables_get"><field name="VAR">temp</field></block></value></block>
                        </next>
                      </block>
                    </next>
                  </block>
                </next>
              </block>
            </statement>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>`,

  "JS_ASYNC_SIMULATOR_XML": `<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="js_async_func" x="30" y="30">
    <field name="NAME">fetchUserData</field>
    <field name="PARAMS">userId</field>
    <statement name="BODY">
      <block type="js_try_catch">
        <field name="ERR">error</field>
        <statement name="TRY">
          <block type="js_console_log">
            <value name="TEXT">
              <block type="text_concat">
                <value name="A"><block type="text"><field name="TEXT">Fetching record: </field></block></value>
                <value name="B"><block type="variables_get"><field name="VAR">userId</field></block></value>
              </block>
            </value>
          </block>
        </statement>
        <statement name="CATCH">
          <block type="js_console_error">
            <value name="TEXT"><block type="text"><field name="TEXT">Failed to fetch data</field></block></value>
          </block>
        </statement>
      </block>
    </statement>
    <next>
      <block type="js_function_call">
        <field name="NAME">fetchUserData</field>
        <value name="ARGS"><block type="text"><field name="TEXT">"user_101"</field></block></value>
      </block>
    </next>
  </block>
</xml>`,

  "JS_OOP_CART_XML": `<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="js_class_define" x="30" y="30">
    <field name="NAME">ShoppingCart</field>
    <statement name="BODY">
      <block type="js_constructor">
        <field name="PARAMS">customerName</field>
        <statement name="BODY">
          <block type="js_var_assign">
            <field name="VAR">this.customer</field>
            <value name="VALUE"><block type="variables_get"><field name="VAR">customerName</field></block></value>
            <next>
              <block type="js_var_assign">
                <field name="VAR">this.items</field>
                <value name="VALUE"><block type="js_array_create"><field name="ITEMS"></field></block></value>
              </block>
            </next>
          </block>
        </statement>
        <next>
          <block type="js_class_method">
            <field name="NAME">addItem</field>
            <field name="PARAMS">item, price</field>
            <statement name="BODY">
              <block type="js_array_push_pop">
                <field name="ACTION">push</field>
                <value name="ARR"><block type="text"><field name="TEXT">this.items</field></block></value>
                <value name="VAL"><block type="variables_get"><field name="VAR">price</field></block></value>
              </block>
            </statement>
          </block>
        </next>
      </block>
    </statement>
    <next>
      <block type="js_var_const">
        <field name="VAR">myCart</field>
        <value name="VALUE">
          <block type="js_instantiate">
            <field name="CLASS">ShoppingCart</field>
            <value name="ARGS"><block type="text"><field name="TEXT">"Alice"</field></block></value>
          </block>
        </value>
        <next>
          <block type="js_console_log">
            <value name="TEXT"><block type="text"><field name="TEXT">Shopping cart initialized</field></block></value>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>`,

  "JS_BANK_ACCOUNT_CLASS_XML": `<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="js_class_define" x="30" y="30">
    <field name="NAME">BankAccount</field>
    <statement name="BODY">
      <block type="js_constructor">
        <field name="PARAMS">owner, initialBalance</field>
        <statement name="BODY">
          <block type="js_var_assign">
            <field name="VAR">this.owner</field>
            <value name="VALUE"><block type="variables_get"><field name="VAR">owner</field></block></value>
            <next>
              <block type="js_var_assign">
                <field name="VAR">this.balance</field>
                <value name="VALUE"><block type="variables_get"><field name="VAR">initialBalance</field></block></value>
              </block>
            </next>
          </block>
        </statement>
        <next>
          <block type="js_class_method">
            <field name="NAME">deposit</field>
            <field name="PARAMS">amount</field>
            <statement name="BODY">
              <block type="js_var_assign">
                <field name="VAR">this.balance</field>
                <value name="VALUE">
                  <block type="js_math_arithmetic">
                    <field name="OP">+</field>
                    <value name="A"><block type="text"><field name="TEXT">this.balance</field></block></value>
                    <value name="B"><block type="variables_get"><field name="VAR">amount</field></block></value>
                  </block>
                </value>
              </block>
            </statement>
          </block>
        </next>
      </block>
    </statement>
  </block>
</xml>`,

  "JS_TASK_SCHEDULER_XML": `<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="js_async_func" x="30" y="30">
    <field name="NAME">executeWithRetry</field>
    <field name="PARAMS">taskId, retries</field>
    <statement name="BODY">
      <block type="js_for_loop">
        <field name="VAR">attempt</field>
        <value name="FROM"><block type="math_number"><field name="NUM">1</field></block></value>
        <value name="TO"><block type="variables_get"><field name="VAR">retries</field></block></value>
        <value name="STEP"><block type="math_number"><field name="NUM">1</field></block></value>
        <statement name="DO">
          <block type="js_console_log">
            <value name="TEXT">
              <block type="text_concat">
                <value name="A"><block type="text"><field name="TEXT">Executing Task Attempt: </field></block></value>
                <value name="B"><block type="variables_get"><field name="VAR">attempt</field></block></value>
              </block>
            </value>
          </block>
        </statement>
      </block>
    </statement>
  </block>
</xml>`,

  "JS_MATRIX_TRANSFORM_XML": `<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="js_var_const" x="30" y="30">
    <field name="VAR">matrix</field>
    <value name="VALUE"><block type="js_array_create"><field name="ITEMS">[1, 2], [3, 4]</field></block></value>
    <next>
      <block type="js_console_log">
        <value name="TEXT"><block type="variables_get"><field name="VAR">matrix</field></block></value>
      </block>
    </next>
  </block>
</xml>`,

  "JS_EVENT_EMITTER_XML": `<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="js_class_define" x="30" y="30">
    <field name="NAME">EventEmitter</field>
    <statement name="BODY">
      <block type="js_constructor">
        <field name="PARAMS"></field>
        <statement name="BODY">
          <block type="js_var_assign">
            <field name="VAR">this.events</field>
            <value name="VALUE"><block type="js_map_create"></block></value>
          </block>
        </statement>
      </block>
    </statement>
  </block>
</xml>`
};

console.log("Total JS Templates XMLs:", Object.keys(jsTemplatesXml).length);
