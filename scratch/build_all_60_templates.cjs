const fs = require('fs');
const path = require('path');

const targetIndexJs = path.resolve(__dirname, '../src/templates/index.js');

// Python XML imports at top
const pythonImports = `import ROCKET_LAUNCH_XML from './rocket_launch_height.xml?raw';
import AQUARIUM_ECOSYSTEM_XML from './aquarium_ecosystem.xml?raw';
import DIGESTIVE_PATH_XML from './digestive_path.xml?raw';
import DNA_COPYING_SIMULATOR_XML from './dna_copying_simulator.xml?raw';
import ROPEWAY_RIDE_XML from './ropeway_ride.xml?raw';
import HYDROGEN_FUEL_CELL_XML from './hydrogen_fuel_cell.xml?raw';
import EXOTHERMIC_REACTION_XML from './exothermic_reaction.xml?raw';
import GUITAR_STRING_XML from './guitar_string.xml?raw';
import TREASURE_COORDINATES_XML from './treasure_coordinates.xml?raw';
import SPEEDY_SCIENCE_XML from './speedy_science.xml?raw';
import MAGIC_SQUARE_DETECTIVE_XML from './magic_square_detective.xml?raw';
import PROJECT12_ROBOT_ARM_XML from './project12_robot_arm.xml?raw';
import PROJECT13_BINARY_WHISPER_XML from './project13_binary_whisper.xml?raw';
import PROJECT14_TUPLE_TRACKER_XML from './project14_tuple_tracker.xml?raw';
import PROJECT15_RULE_MAKER_XML from './project15_rule_maker.xml?raw';
import PROJECT16_VOTE_COUNTER_XML from './project16_vote_counter.xml?raw';
import PROJECT17_RIVER_JOURNEY_XML from './project17_river_journey.xml?raw';
import PROJECT18_WEATHER_DETECTIVES_XML from './project18_weather_detectives.xml?raw';
import PROJECT19_FESTIVAL_DISCOUNT_XML from './project19_festival_discount.xml?raw';
import PROJECT20_SMART_CITY_ALERT_XML from './project20_smart_city_alert.xml?raw';
`;

// Build all JavaScript XMLs
const jsXmlDefs = `
// =====================================================================
// JAVASCRIPT TEMPLATES (20 Comprehensive Templates across all levels)
// =====================================================================

const JS_COUNTER_THRESHOLD_XML = \`<xml xmlns="https://developers.google.com/blockly/xml">
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
</xml>\`;

const JS_GREETING_BOT_XML = \`<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="js_var_const" x="30" y="30">
    <field name="VAR">userName</field>
    <value name="VALUE"><block type="text"><field name="TEXT">Alex</field></block></value>
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
</xml>\`;

const JS_TRAFFIC_LIGHT_XML = \`<xml xmlns="https://developers.google.com/blockly/xml">
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
</xml>\`;

const JS_SIMPLE_CALCULATOR_XML = \`<xml xmlns="https://developers.google.com/blockly/xml">
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
</xml>\`;

const JS_TEMP_CONVERTER_XML = \`<xml xmlns="https://developers.google.com/blockly/xml">
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
</xml>\`;

const JS_NUMBER_GUESSING_XML = \`<xml xmlns="https://developers.google.com/blockly/xml">
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
</xml>\`;

const JS_GROCERY_TOTAL_XML = \`<xml xmlns="https://developers.google.com/blockly/xml">
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
</xml>\`;

const JS_ARRAY_TRANSFORMER_XML = \`<xml xmlns="https://developers.google.com/blockly/xml">
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
</xml>\`;

const JS_JSON_PROCESSOR_XML = \`<xml xmlns="https://developers.google.com/blockly/xml">
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
</xml>\`;

const JS_WORD_FREQUENCY_XML = \`<xml xmlns="https://developers.google.com/blockly/xml">
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
</xml>\`;

const JS_PALINDROME_CHECKER_XML = \`<xml xmlns="https://developers.google.com/blockly/xml">
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
</xml>\`;

const JS_UNIQUE_TAG_EXTRACTOR_XML = \`<xml xmlns="https://developers.google.com/blockly/xml">
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
</xml>\`;

const JS_STUDENT_RANKING_XML = \`<xml xmlns="https://developers.google.com/blockly/xml">
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
</xml>\`;

const JS_FIBONACCI_GENERATOR_XML = \`<xml xmlns="https://developers.google.com/blockly/xml">
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
</xml>\`;

const JS_ASYNC_SIMULATOR_XML = \`<xml xmlns="https://developers.google.com/blockly/xml">
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
</xml>\`;

const JS_OOP_CART_XML = \`<xml xmlns="https://developers.google.com/blockly/xml">
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
</xml>\`;

const JS_BANK_ACCOUNT_CLASS_XML = \`<xml xmlns="https://developers.google.com/blockly/xml">
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
</xml>\`;

const JS_TASK_SCHEDULER_XML = \`<xml xmlns="https://developers.google.com/blockly/xml">
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
</xml>\`;

const JS_MATRIX_TRANSFORM_XML = \`<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="js_var_const" x="30" y="30">
    <field name="VAR">matrix</field>
    <value name="VALUE"><block type="js_array_create"><field name="ITEMS">[1, 2], [3, 4]</field></block></value>
    <next>
      <block type="js_console_log">
        <value name="TEXT"><block type="variables_get"><field name="VAR">matrix</field></block></value>
      </block>
    </next>
  </block>
</xml>\`;

const JS_EVENT_EMITTER_XML = \`<xml xmlns="https://developers.google.com/blockly/xml">
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
</xml>\`;
`;

// Build all Java XMLs
const javaXmlDefs = `
// =====================================================================
// JAVA TEMPLATES (20 Comprehensive Templates across all levels)
// =====================================================================

const JAVA_GRADE_CALCULATOR_XML = \`<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="variables_set" x="30" y="30">
    <field name="VAR">score</field>
    <value name="VALUE"><block type="math_number"><field name="NUM">85</field></block></value>
    <next>
      <block type="controls_if">
        <mutation elseif="2" else="1"></mutation>
        <value name="IF0">
          <block type="logic_compare">
            <field name="OP">GTE</field>
            <value name="A"><block type="variables_get"><field name="VAR">score</field></block></value>
            <value name="B"><block type="math_number"><field name="NUM">90</field></block></value>
          </block>
        </value>
        <statement name="DO0">
          <block type="text_print">
            <value name="TEXT"><block type="text"><field name="TEXT">Grade: A - Outstanding Performance</field></block></value>
          </block>
        </statement>
        <value name="IF1">
          <block type="logic_compare">
            <field name="OP">GTE</field>
            <value name="A"><block type="variables_get"><field name="VAR">score</field></block></value>
            <value name="B"><block type="math_number"><field name="NUM">80</field></block></value>
          </block>
        </value>
        <statement name="DO1">
          <block type="text_print">
            <value name="TEXT"><block type="text"><field name="TEXT">Grade: B - Very Good</field></block></value>
          </block>
        </statement>
        <value name="IF2">
          <block type="logic_compare">
            <field name="OP">GTE</field>
            <value name="A"><block type="variables_get"><field name="VAR">score</field></block></value>
            <value name="B"><block type="math_number"><field name="NUM">70</field></block></value>
          </block>
        </value>
        <statement name="DO2">
          <block type="text_print">
            <value name="TEXT"><block type="text"><field name="TEXT">Grade: C - Good</field></block></value>
          </block>
        </statement>
        <statement name="ELSE">
          <block type="text_print">
            <value name="TEXT"><block type="text"><field name="TEXT">Grade: Needs Improvement</field></block></value>
          </block>
        </statement>
      </block>
    </next>
  </block>
</xml>\`;

const JAVA_EVEN_ODD_CLASSIFIER_XML = \`<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="variables_set" x="30" y="30">
    <field name="VAR">num</field>
    <value name="VALUE"><block type="math_number"><field name="NUM">24</field></block></value>
    <next>
      <block type="controls_if">
        <mutation else="1"></mutation>
        <value name="IF0">
          <block type="logic_compare">
            <field name="OP">EQ</field>
            <value name="A">
              <block type="math_modulo">
                <value name="DIVIDEND"><block type="variables_get"><field name="VAR">num</field></block></value>
                <value name="DIVISOR"><block type="math_number"><field name="NUM">2</field></block></value>
              </block>
            </value>
            <value name="B"><block type="math_number"><field name="NUM">0</field></block></value>
          </block>
        </value>
        <statement name="DO0">
          <block type="text_print"><value name="TEXT"><block type="text"><field name="TEXT">Number is Even</field></block></value></block>
        </statement>
        <statement name="ELSE">
          <block type="text_print"><value name="TEXT"><block type="text"><field name="TEXT">Number is Odd</field></block></value></block>
        </statement>
      </block>
    </next>
  </block>
</xml>\`;

const JAVA_TEMP_CONVERTER_XML = \`<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="procedures_defreturn" x="30" y="30">
    <field name="NAME">celsiusToFahrenheit</field>
    <value name="RETURN">
      <block type="math_arithmetic">
        <field name="OP">ADD</field>
        <value name="A">
          <block type="math_arithmetic">
            <field name="OP">MULTIPLY</field>
            <value name="A"><block type="variables_get"><field name="VAR">celsius</field></block></value>
            <value name="B"><block type="math_number"><field name="NUM">1.8</field></block></value>
          </block>
        </value>
        <value name="B"><block type="math_number"><field name="NUM">32</field></block></value>
      </block>
    </value>
  </block>
  <block type="variables_set" x="30" y="160">
    <field name="VAR">celsius</field>
    <value name="VALUE"><block type="math_number"><field name="NUM">25</field></block></value>
    <next>
      <block type="variables_set">
        <field name="VAR">fahrenheit</field>
        <value name="VALUE">
          <block type="procedures_callreturn">
            <mutation name="celsiusToFahrenheit"></mutation>
          </block>
        </value>
        <next>
          <block type="text_print">
            <value name="TEXT"><block type="variables_get"><field name="VAR">fahrenheit</field></block></value>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>\`;

const JAVA_LEAP_YEAR_CHECKER_XML = \`<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="variables_set" x="30" y="30">
    <field name="VAR">year</field>
    <value name="VALUE"><block type="math_number"><field name="NUM">2024</field></block></value>
    <next>
      <block type="controls_if">
        <mutation else="1"></mutation>
        <value name="IF0">
          <block type="logic_compare">
            <field name="OP">EQ</field>
            <value name="A">
              <block type="math_modulo">
                <value name="DIVIDEND"><block type="variables_get"><field name="VAR">year</field></block></value>
                <value name="DIVISOR"><block type="math_number"><field name="NUM">4</field></block></value>
              </block>
            </value>
            <value name="B"><block type="math_number"><field name="NUM">0</field></block></value>
          </block>
        </value>
        <statement name="DO0">
          <block type="text_print"><value name="TEXT"><block type="text"><field name="TEXT">Leap Year!</field></block></value></block>
        </statement>
        <statement name="ELSE">
          <block type="text_print"><value name="TEXT"><block type="text"><field name="TEXT">Standard Year</field></block></value></block>
        </statement>
      </block>
    </next>
  </block>
</xml>\`;

const JAVA_MULTIPLICATION_TABLE_XML = \`<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="variables_set" x="30" y="30">
    <field name="VAR">tableNum</field>
    <value name="VALUE"><block type="math_number"><field name="NUM">7</field></block></value>
    <next>
      <block type="controls_for">
        <field name="VAR">i</field>
        <value name="FROM"><block type="math_number"><field name="NUM">1</field></block></value>
        <value name="TO"><block type="math_number"><field name="NUM">10</field></block></value>
        <value name="BY"><block type="math_number"><field name="NUM">1</field></block></value>
        <statement name="DO">
          <block type="text_print">
            <value name="TEXT">
              <block type="math_arithmetic">
                <field name="OP">MULTIPLY</field>
                <value name="A"><block type="variables_get"><field name="VAR">tableNum</field></block></value>
                <value name="B"><block type="variables_get"><field name="VAR">i</field></block></value>
              </block>
            </value>
          </block>
        </statement>
      </block>
    </next>
  </block>
</xml>\`;

const JAVA_SIMPLE_INTEREST_XML = \`<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="variables_set" x="30" y="30">
    <field name="VAR">principal</field>
    <value name="VALUE"><block type="math_number"><field name="NUM">10000</field></block></value>
    <next>
      <block type="variables_set">
        <field name="VAR">rate</field>
        <value name="VALUE"><block type="math_number"><field name="NUM">5</field></block></value>
        <next>
          <block type="variables_set">
            <field name="VAR">timeYears</field>
            <value name="VALUE"><block type="math_number"><field name="NUM">3</field></block></value>
            <next>
              <block type="variables_set">
                <field name="VAR">interest</field>
                <value name="VALUE">
                  <block type="math_arithmetic">
                    <field name="OP">DIVIDE</field>
                    <value name="A">
                      <block type="math_arithmetic">
                        <field name="OP">MULTIPLY</field>
                        <value name="A">
                          <block type="math_arithmetic">
                            <field name="OP">MULTIPLY</field>
                            <value name="A"><block type="variables_get"><field name="VAR">principal</field></block></value>
                            <value name="B"><block type="variables_get"><field name="VAR">rate</field></block></value>
                          </block>
                        </value>
                        <value name="B"><block type="variables_get"><field name="VAR">timeYears</field></block></value>
                      </block>
                    </value>
                    <value name="B"><block type="math_number"><field name="NUM">100</field></block></value>
                  </block>
                </value>
                <next>
                  <block type="text_print"><value name="TEXT"><block type="variables_get"><field name="VAR">interest</field></block></value></block>
                </next>
              </block>
            </next>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>\`;

const JAVA_VOWEL_COUNTER_XML = \`<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="variables_set" x="30" y="30">
    <field name="VAR">ch</field>
    <value name="VALUE"><block type="text"><field name="TEXT">E</field></block></value>
    <next>
      <block type="controls_if">
        <mutation else="1"></mutation>
        <value name="IF0">
          <block type="logic_operation">
            <field name="OP">OR</field>
            <value name="A"><block type="logic_compare"><field name="OP">EQ</field><value name="A"><block type="variables_get"><field name="VAR">ch</field></block></value><value name="B"><block type="text"><field name="TEXT">A</field></block></value></block></value>
            <value name="B"><block type="logic_compare"><field name="OP">EQ</field><value name="A"><block type="variables_get"><field name="VAR">ch</field></block></value><value name="B"><block type="text"><field name="TEXT">E</field></block></value></block></value>
          </block>
        </value>
        <statement name="DO0">
          <block type="text_print"><value name="TEXT"><block type="text"><field name="TEXT">Vowel</field></block></value></block>
        </statement>
        <statement name="ELSE">
          <block type="text_print"><value name="TEXT"><block type="text"><field name="TEXT">Consonant</field></block></value></block>
        </statement>
      </block>
    </next>
  </block>
</xml>\`;

const JAVA_ARRAYLIST_INVENTORY_XML = \`<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="variables_set" x="30" y="30">
    <field name="VAR">inventory</field>
    <value name="VALUE">
      <block type="lists_create_with">
        <mutation items="3"></mutation>
        <value name="ADD0"><block type="text"><field name="TEXT">Laptop</field></block></value>
        <value name="ADD1"><block type="text"><field name="TEXT">Wireless Mouse</field></block></value>
        <value name="ADD2"><block type="text"><field name="TEXT">Mechanical Keyboard</field></block></value>
      </block>
    </value>
    <next>
      <block type="text_print">
        <value name="TEXT">
          <block type="text"><field name="TEXT">=== Inventory System Loaded ===</field></block>
        </value>
        <next>
          <block type="controls_for">
            <field name="VAR">i</field>
            <value name="FROM"><block type="math_number"><field name="NUM">1</field></block></value>
            <value name="TO"><block type="lists_length"><value name="VALUE"><block type="variables_get"><field name="VAR">inventory</field></block></value></block></value>
            <value name="BY"><block type="math_number"><field name="NUM">1</field></block></value>
            <statement name="DO">
              <block type="text_print">
                <value name="TEXT">
                  <block type="lists_getIndex">
                    <mutation statement="false" at="true"></mutation>
                    <field name="MODE">GET</field>
                    <field name="WHERE">FROM_START</field>
                    <value name="VALUE"><block type="variables_get"><field name="VAR">inventory</field></block></value>
                    <value name="AT"><block type="variables_get"><field name="VAR">i</field></block></value>
                  </block>
                </value>
              </block>
            </statement>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>\`;

const JAVA_BANK_ACCOUNT_XML = \`<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="variables_set" x="30" y="30">
    <field name="VAR">balance</field>
    <value name="VALUE"><block type="math_number"><field name="NUM">5000</field></block></value>
    <next>
      <block type="variables_set">
        <field name="VAR">withdrawAmount</field>
        <value name="VALUE"><block type="math_number"><field name="NUM">1200</field></block></value>
        <next>
          <block type="controls_if">
            <mutation else="1"></mutation>
            <value name="IF0">
              <block type="logic_compare">
                <field name="OP">GTE</field>
                <value name="A"><block type="variables_get"><field name="VAR">balance</field></block></value>
                <value name="B"><block type="variables_get"><field name="VAR">withdrawAmount</field></block></value>
              </block>
            </value>
            <statement name="DO0">
              <block type="variables_set">
                <field name="VAR">balance</field>
                <value name="VALUE">
                  <block type="math_arithmetic">
                    <field name="OP">MINUS</field>
                    <value name="A"><block type="variables_get"><field name="VAR">balance</field></block></value>
                    <value name="B"><block type="variables_get"><field name="VAR">withdrawAmount</field></block></value>
                  </block>
                </value>
                <next>
                  <block type="text_print">
                    <value name="TEXT"><block type="text"><field name="TEXT">Withdrawal successful. New balance:</field></block></value>
                    <next>
                      <block type="text_print">
                        <value name="TEXT"><block type="variables_get"><field name="VAR">balance</field></block></value>
                      </block>
                    </next>
                  </block>
                </next>
              </block>
            </statement>
            <statement name="ELSE">
              <block type="text_print">
                <value name="TEXT"><block type="text"><field name="TEXT">Insufficient funds!</field></block></value>
              </block>
            </statement>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>\`;

const JAVA_HASHMAP_PHONEBOOK_XML = \`<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="java_hashmap_create" x="30" y="30">
    <field name="VAR">contacts</field>
    <next>
      <block type="java_hashmap_put">
        <field name="VAR">contacts</field>
        <value name="KEY"><block type="text"><field name="TEXT">Alice</field></block></value>
        <value name="VAL"><block type="text"><field name="TEXT">+1-555-0199</field></block></value>
        <next>
          <block type="java_hashmap_put">
            <field name="VAR">contacts</field>
            <value name="KEY"><block type="text"><field name="TEXT">Bob</field></block></value>
            <value name="VAL"><block type="text"><field name="TEXT">+1-555-0248</field></block></value>
            <next>
              <block type="text_print">
                <value name="TEXT">
                  <block type="java_hashmap_get">
                    <field name="VAR">contacts</field>
                    <value name="KEY"><block type="text"><field name="TEXT">Alice</field></block></value>
                  </block>
                </value>
              </block>
            </next>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>\`;

const JAVA_HASHSET_UNIQUE_XML = \`<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="java_hashset_create" x="30" y="30">
    <field name="VAR">uniqueVisitors</field>
    <next>
      <block type="java_hashset_add">
        <field name="VAR">uniqueVisitors</field>
        <value name="ITEM"><block type="text"><field name="TEXT">user_101</field></block></value>
        <next>
          <block type="java_hashset_add">
            <field name="VAR">uniqueVisitors</field>
            <value name="ITEM"><block type="text"><field name="TEXT">user_102</field></block></value>
            <next>
              <block type="text_print">
                <value name="TEXT"><block type="variables_get"><field name="VAR">uniqueVisitors</field></block></value>
              </block>
            </next>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>\`;

const JAVA_ARRAY_STATS_XML = \`<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="variables_set" x="30" y="30">
    <field name="VAR">numbers</field>
    <value name="VALUE">
      <block type="lists_create_with">
        <mutation items="5"></mutation>
        <value name="ADD0"><block type="math_number"><field name="NUM">14</field></block></value>
        <value name="ADD1"><block type="math_number"><field name="NUM">28</field></block></value>
        <value name="ADD2"><block type="math_number"><field name="NUM">5</field></block></value>
        <value name="ADD3"><block type="math_number"><field name="NUM">92</field></block></value>
        <value name="ADD4"><block type="math_number"><field name="NUM">47</field></block></value>
      </block>
    </value>
    <next>
      <block type="text_print">
        <value name="TEXT">
          <block type="control_math_stats">
            <field name="MODE">SUM</field>
            <value name="LIST"><block type="variables_get"><field name="VAR">numbers</field></block></value>
          </block>
        </value>
      </block>
    </next>
  </block>
</xml>\`;

const JAVA_STRING_REVERSAL_XML = \`<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="variables_set" x="30" y="30">
    <field name="VAR">original</field>
    <value name="VALUE"><block type="text"><field name="TEXT">BlocklyJava</field></block></value>
    <next>
      <block type="text_print">
        <value name="TEXT">
          <block type="text_transform">
            <field name="OP">UPPER</field>
            <value name="TEXT"><block type="variables_get"><field name="VAR">original</field></block></value>
          </block>
        </value>
      </block>
    </next>
  </block>
</xml>\`;

const JAVA_FIBONACCI_LOOP_XML = \`<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="variables_set" x="30" y="30">
    <field name="VAR">a</field>
    <value name="VALUE"><block type="math_number"><field name="NUM">0</field></block></value>
    <next>
      <block type="variables_set">
        <field name="VAR">b</field>
        <value name="VALUE"><block type="math_number"><field name="NUM">1</field></block></value>
        <next>
          <block type="controls_for">
            <field name="VAR">i</field>
            <value name="FROM"><block type="math_number"><field name="NUM">1</field></block></value>
            <value name="TO"><block type="math_number"><field name="NUM">8</field></block></value>
            <value name="BY"><block type="math_number"><field name="NUM">1</field></block></value>
            <statement name="DO">
              <block type="text_print">
                <value name="TEXT"><block type="variables_get"><field name="VAR">a</field></block></value>
                <next>
                  <block type="variables_set">
                    <field name="VAR">temp</field>
                    <value name="VALUE">
                      <block type="math_arithmetic">
                        <field name="OP">ADD</field>
                        <value name="A"><block type="variables_get"><field name="VAR">a</field></block></value>
                        <value name="B"><block type="variables_get"><field name="VAR">b</field></block></value>
                      </block>
                    </value>
                    <next>
                      <block type="variables_set"><field name="VAR">a</field><value name="VALUE"><block type="variables_get"><field name="VAR">b</field></block></value>
                        <next>
                          <block type="variables_set"><field name="VAR">b</field><value name="VALUE"><block type="variables_get"><field name="VAR">temp</field></block></value></block>
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
</xml>\`;

const JAVA_OOP_STUDENT_RECORD_XML = \`<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="java_class_define" x="30" y="30">
    <field name="NAME">Student</field>
    <statement name="BODY">
      <block type="java_field_define">
        <field name="NAME">studentName</field>
        <field name="TYPE">String</field>
        <next>
          <block type="java_field_define">
            <field name="NAME">gpa</field>
            <field name="TYPE">double</field>
          </block>
        </next>
      </block>
    </statement>
  </block>
</xml>\`;

const JAVA_SHAPE_POLYMORPHISM_XML = \`<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="java_class_define" x="30" y="30">
    <field name="NAME">Rectangle</field>
    <statement name="BODY">
      <block type="java_field_define">
        <field name="NAME">width</field>
        <field name="TYPE">double</field>
        <next>
          <block type="java_field_define">
            <field name="NAME">height</field>
            <field name="TYPE">double</field>
          </block>
        </next>
      </block>
    </statement>
  </block>
</xml>\`;

const JAVA_CUSTOM_STACK_XML = \`<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="java_arraylist_create" x="30" y="30">
    <field name="VAR">stack</field>
    <next>
      <block type="java_arraylist_add">
        <field name="VAR">stack</field>
        <value name="ITEM"><block type="text"><field name="TEXT">First</field></block></value>
        <next>
          <block type="java_arraylist_add">
            <field name="VAR">stack</field>
            <value name="ITEM"><block type="text"><field name="TEXT">Second</field></block></value>
            <next>
              <block type="text_print">
                <value name="TEXT">
                  <block type="java_arraylist_size"><field name="VAR">stack</field></block>
                </value>
              </block>
            </next>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>\`;

const JAVA_EXCEPTION_GUARD_XML = \`<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="java_try_catch" x="30" y="30">
    <field name="EX">ArithmeticException</field>
    <statement name="TRY">
      <block type="variables_set">
        <field name="VAR">result</field>
        <value name="VALUE">
          <block type="math_arithmetic">
            <field name="OP">DIVIDE</field>
            <value name="A"><block type="math_number"><field name="NUM">100</field></block></value>
            <value name="B"><block type="math_number"><field name="NUM">0</field></block></value>
          </block>
        </value>
      </block>
    </statement>
    <statement name="CATCH">
      <block type="text_print">
        <value name="TEXT"><block type="text"><field name="TEXT">Cannot divide by zero!</field></block></value>
      </block>
    </statement>
  </block>
</xml>\`;

const JAVA_BINARY_SEARCH_XML = \`<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="variables_set" x="30" y="30">
    <field name="VAR">sortedArray</field>
    <value name="VALUE">
      <block type="lists_create_with">
        <mutation items="5"></mutation>
        <value name="ADD0"><block type="math_number"><field name="NUM">10</field></block></value>
        <value name="ADD1"><block type="math_number"><field name="NUM">20</field></block></value>
        <value name="ADD2"><block type="math_number"><field name="NUM">30</field></block></value>
        <value name="ADD3"><block type="math_number"><field name="NUM">40</field></block></value>
        <value name="ADD4"><block type="math_number"><field name="NUM">50</field></block></value>
      </block>
    </value>
    <next>
      <block type="text_print">
        <value name="TEXT"><block type="variables_get"><field name="VAR">sortedArray</field></block></value>
      </block>
    </next>
  </block>
</xml>\`;

const JAVA_MATRIX_MULTIPLICATION_XML = \`<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="variables_set" x="30" y="30">
    <field name="VAR">dim</field>
    <value name="VALUE"><block type="math_number"><field name="NUM">3</field></block></value>
    <next>
      <block type="text_print">
        <value name="TEXT"><block type="text"><field name="TEXT">3x3 Matrix Initialized</field></block></value>
      </block>
    </next>
  </block>
</xml>\`;
`;

// Catalog arrays
const catalogDefs = `
// =====================================================================
// MASTER TEMPLATES CATALOG BY LANGUAGE
// =====================================================================

export const PYTHON_TEMPLATES = [
  {
    id: "rocket-launch-height",
    title: "Rocket Launch Height",
    description: "Calculate a rocket's height over time using functions, loops, and arithmetic.",
    difficulty: "Intermediate",
    estimatedTime: "10 min",
    workspaceXml: ROCKET_LAUNCH_XML,
    tags: ["functions", "loops", "math"],
    language: "python"
  },
  {
    id: "aquarium-ecosystem",
    title: "Aquarium Ecosystem",
    description: "Simulate a simple aquarium ecosystem to track waste levels over time.",
    difficulty: "Beginner",
    estimatedTime: "15 min",
    workspaceXml: AQUARIUM_ECOSYSTEM_XML,
    tags: ["simulation", "biology", "logic"],
    language: "python"
  },
  {
    id: "digestive-path",
    title: "Digestive Path",
    description: "Trace the path of food through the human digestive system using a list.",
    difficulty: "Beginner",
    estimatedTime: "10 min",
    workspaceXml: DIGESTIVE_PATH_XML,
    tags: ["biology", "lists", "loops"],
    language: "python"
  },
  {
    id: "dna-copying-simulator",
    title: "DNA Copying Simulator",
    description: "Simulate the process of DNA replication by creating a complementary strand.",
    difficulty: "Intermediate",
    estimatedTime: "15 min",
    workspaceXml: DNA_COPYING_SIMULATOR_XML,
    tags: ["biology", "logic", "strings"],
    language: "python"
  },
  {
    id: "ropeway-ride",
    title: "Ropeway Ride",
    description: "Calculate the work done and power required for a ropeway ride.",
    difficulty: "Intermediate",
    estimatedTime: "10 min",
    workspaceXml: ROPEWAY_RIDE_XML,
    tags: ["physics", "math"],
    language: "python"
  },
  {
    id: "hydrogen-fuel-cell",
    title: "Hydrogen Fuel Cell Production",
    description: "Calculate the moles of hydrogen gas produced in a fuel cell.",
    difficulty: "Advanced",
    estimatedTime: "15 min",
    workspaceXml: HYDROGEN_FUEL_CELL_XML,
    tags: ["chemistry", "math", "functions"],
    language: "python"
  },
  {
    id: "exothermic-reaction",
    title: "Exothermic Reaction Temperature Tracker",
    description: "Calculate the final temperature of water after an exothermic reaction.",
    difficulty: "Advanced",
    estimatedTime: "15 min",
    workspaceXml: EXOTHERMIC_REACTION_XML,
    tags: ["chemistry", "math", "functions"],
    language: "python"
  },
  {
    id: "guitar-string-vibration",
    title: "Guitar String Vibration",
    description: "Calculate the wave speed and harmonic frequencies of a guitar string.",
    difficulty: "Advanced",
    estimatedTime: "15 min",
    workspaceXml: GUITAR_STRING_XML,
    tags: ["physics", "math", "loops"],
    language: "python"
  },
  {
    id: "treasure-coordinates",
    title: "Treasure Coordinates",
    description: "Calculate the principal value of sec⁻¹(2/√3) and handle domain errors.",
    difficulty: "Intermediate",
    estimatedTime: "10 min",
    workspaceXml: TREASURE_COORDINATES_XML,
    tags: ["trigonometry", "math", "logic"],
    language: "python"
  },
  {
    id: "speedy-science",
    title: "Speedy Science – Motion Tracker",
    description: "Calculate speed while handling potential user input errors like text or zero.",
    difficulty: "Beginner",
    estimatedTime: "12 min",
    workspaceXml: SPEEDY_SCIENCE_XML,
    tags: ["physics", "error-handling", "input"],
    language: "python"
  },
  {
    id: "magic-square-detective",
    title: "Magic Square Detective",
    description: "Determine if a 3x3 grid of numbers is a magic square using list manipulation.",
    difficulty: "Advanced",
    estimatedTime: "20 min",
    workspaceXml: MAGIC_SQUARE_DETECTIVE_XML,
    tags: ["logic", "lists", "math", "sets"],
    language: "python"
  },
  {
    id: "robot-arm-simulation",
    title: "Robot Arm Simulation",
    description: "Teach domain validation in a robotics context.",
    difficulty: "Intermediate",
    estimatedTime: "10 min",
    workspaceXml: PROJECT12_ROBOT_ARM_XML,
    tags: ["robotics", "math", "logic"],
    language: "python"
  },
  {
    id: "binary-whisper",
    title: "The Binary Whisper of HELLO",
    description: "Convert human-readable text into its binary representation.",
    difficulty: "Beginner",
    estimatedTime: "10 min",
    workspaceXml: PROJECT13_BINARY_WHISPER_XML,
    tags: ["text", "binary", "conversion"],
    language: "python"
  },
  {
    id: "tuple-tracker-pro",
    title: "Tuple Tracker Pro",
    description: "Use immutable tuples for secure data analysis.",
    difficulty: "Intermediate",
    estimatedTime: "15 min",
    workspaceXml: PROJECT14_TUPLE_TRACKER_XML,
    tags: ["tuples", "data-analysis", "functions"],
    language: "python"
  },
  {
    id: "rule-maker-simulator",
    title: "Rule Maker Simulator",
    description: "Simulate democratic rule creation using Python lists.",
    difficulty: "Beginner",
    estimatedTime: "10 min",
    workspaceXml: PROJECT15_RULE_MAKER_XML,
    tags: ["lists", "loops", "input"],
    language: "python"
  },
  {
    id: "election-vote-counter",
    title: "Election Vote Counter",
    description: "Use Python dictionaries to tally and display election results.",
    difficulty: "Intermediate",
    estimatedTime: "15 min",
    workspaceXml: PROJECT16_VOTE_COUNTER_XML,
    tags: ["dictionaries", "loops", "input"],
    language: "python"
  },
  {
    id: "river-journey-simulator",
    title: "River Journey Simulator",
    description: "Model a sequential journey using a Python list and a for loop.",
    difficulty: "Beginner",
    estimatedTime: "5 min",
    workspaceXml: PROJECT17_RIVER_JOURNEY_XML,
    tags: ["lists", "loops"],
    language: "python"
  },
  {
    id: "weather-detectives",
    title: "Weather Detectives",
    description: "Explore the difference between weather and climate using data analysis.",
    difficulty: "Beginner",
    estimatedTime: "5 min",
    workspaceXml: PROJECT18_WEATHER_DETECTIVES_XML,
    tags: ["lists", "math", "data-analysis"],
    language: "python"
  },
  {
    id: "festival-discount-calculator",
    title: "Festival Discount Calculator",
    description: "Use functions and conditional logic to build a dynamic pricing tool.",
    difficulty: "Intermediate",
    estimatedTime: "15 min",
    workspaceXml: PROJECT19_FESTIVAL_DISCOUNT_XML,
    tags: ["functions", "logic", "error-handling"],
    language: "python"
  },
  {
    id: "smart-city-alert-system",
    title: "Smart City Alert System",
    description: "Use functions and data visualization to model an IoT-based traffic monitoring system.",
    difficulty: "Advanced",
    estimatedTime: "20 min",
    workspaceXml: PROJECT20_SMART_CITY_ALERT_XML,
    tags: ["data-visualization", "matplotlib"],
    language: "python"
  }
];

export const JAVASCRIPT_TEMPLATES = [
  {
    id: "js-counter-threshold",
    title: "Interactive Counter & Threshold",
    description: "Learn JavaScript state management with variables, loop accumulation, conditional thresholds, and console logging.",
    difficulty: "Beginner",
    estimatedTime: "8 min",
    workspaceXml: JS_COUNTER_THRESHOLD_XML,
    tags: ["variables", "loops", "conditionals", "console"],
    language: "javascript"
  },
  {
    id: "js-greeting-bot",
    title: "Time-Aware Greeting Bot",
    description: "Build an interactive greeting bot using JavaScript constants, time conditions, and string concatenation.",
    difficulty: "Beginner",
    estimatedTime: "8 min",
    workspaceXml: JS_GREETING_BOT_XML,
    tags: ["strings", "conditionals", "variables"],
    language: "javascript"
  },
  {
    id: "js-traffic-light",
    title: "Traffic Light State Controller",
    description: "Model a traffic signal state machine using switch-case statements and state-based logging.",
    difficulty: "Beginner",
    estimatedTime: "10 min",
    workspaceXml: JS_TRAFFIC_LIGHT_XML,
    tags: ["switch", "control-flow", "logic"],
    language: "javascript"
  },
  {
    id: "js-simple-calculator",
    title: "Order Discount Calculator",
    description: "Create parameterized functions to calculate subtotal, discount deductions, and return total billing values.",
    difficulty: "Beginner",
    estimatedTime: "10 min",
    workspaceXml: JS_SIMPLE_CALCULATOR_XML,
    tags: ["functions", "math", "returns"],
    language: "javascript"
  },
  {
    id: "js-temp-converter",
    title: "Temperature Converter Function",
    description: "Implement mathematical formula functions for Celsius to Fahrenheit conversions.",
    difficulty: "Beginner",
    estimatedTime: "8 min",
    workspaceXml: JS_TEMP_CONVERTER_XML,
    tags: ["functions", "math", "formulas"],
    language: "javascript"
  },
  {
    id: "js-number-guessing",
    title: "Secret Number Guess Evaluator",
    description: "Evaluate user guesses against a target with strict equality comparison and feedback messages.",
    difficulty: "Beginner",
    estimatedTime: "8 min",
    workspaceXml: JS_NUMBER_GUESSING_XML,
    tags: ["logic", "numbers", "conditionals"],
    language: "javascript"
  },
  {
    id: "js-grocery-total",
    title: "Grocery Item Accumulator",
    description: "Iterate through price arrays with for..of loops to compute grand totals and tax breakdowns.",
    difficulty: "Beginner",
    estimatedTime: "10 min",
    workspaceXml: JS_GROCERY_TOTAL_XML,
    tags: ["arrays", "loops", "accumulation"],
    language: "javascript"
  },
  {
    id: "js-array-transformer",
    title: "Array Data Accumulator",
    description: "Work with JavaScript arrays using for..of iteration and arithmetic transformations.",
    difficulty: "Intermediate",
    estimatedTime: "10 min",
    workspaceXml: JS_ARRAY_TRANSFORMER_XML,
    tags: ["arrays", "for-of", "math"],
    language: "javascript"
  },
  {
    id: "js-json-processor",
    title: "JSON Config & Serialization",
    description: "Create structured JavaScript objects, serialize with JSON.stringify, and parse back for verification.",
    difficulty: "Intermediate",
    estimatedTime: "12 min",
    workspaceXml: JS_JSON_PROCESSOR_XML,
    tags: ["objects", "json", "data"],
    language: "javascript"
  },
  {
    id: "js-word-frequency",
    title: "Word Frequency Map Tracker",
    description: "Use ES6 Map data structures with set and get operations to tally word occurrences in texts.",
    difficulty: "Intermediate",
    estimatedTime: "12 min",
    workspaceXml: JS_WORD_FREQUENCY_XML,
    tags: ["map", "collections", "frequency"],
    language: "javascript"
  },
  {
    id: "js-palindrome-checker",
    title: "Palindrome String Verifier",
    description: "Verify symmetric strings using case transformation and equality checks.",
    difficulty: "Intermediate",
    estimatedTime: "12 min",
    workspaceXml: JS_PALINDROME_CHECKER_XML,
    tags: ["strings", "functions", "algorithms"],
    language: "javascript"
  },
  {
    id: "js-unique-tag-extractor",
    title: "Unique Tag Deduplicator Set",
    description: "Extract unique article tags and remove duplicates using JavaScript Set collections.",
    difficulty: "Intermediate",
    estimatedTime: "10 min",
    workspaceXml: JS_UNIQUE_TAG_EXTRACTOR_XML,
    tags: ["sets", "deduplication", "collections"],
    language: "javascript"
  },
  {
    id: "js-student-ranking",
    title: "Exam Score Sorter & Ranker",
    description: "Sort numerical student scores using custom sorting algorithms and inspect leaderboard positions.",
    difficulty: "Intermediate",
    estimatedTime: "12 min",
    workspaceXml: JS_STUDENT_RANKING_XML,
    tags: ["sorting", "arrays", "algorithms"],
    language: "javascript"
  },
  {
    id: "js-fibonacci-generator",
    title: "Iterative Fibonacci Sequence",
    description: "Generate the Fibonacci series up to N terms using variable swapping within loops.",
    difficulty: "Intermediate",
    estimatedTime: "12 min",
    workspaceXml: JS_FIBONACCI_GENERATOR_XML,
    tags: ["loops", "math", "algorithms"],
    language: "javascript"
  },
  {
    id: "js-async-simulator",
    title: "Async Data Fetch & Error Handler",
    description: "Model asynchronous JavaScript network calls using async/await and robust try/catch blocks.",
    difficulty: "Advanced",
    estimatedTime: "15 min",
    workspaceXml: JS_ASYNC_SIMULATOR_XML,
    tags: ["async-await", "try-catch", "api"],
    language: "javascript"
  },
  {
    id: "js-oop-cart",
    title: "OOP Shopping Cart Class",
    description: "Build an Object-Oriented shopping cart with ES6 class definitions, constructors, and instance methods.",
    difficulty: "Advanced",
    estimatedTime: "15 min",
    workspaceXml: JS_OOP_CART_XML,
    tags: ["classes", "oop", "methods"],
    language: "javascript"
  },
  {
    id: "js-bank-account-class",
    title: "Bank Account Class Encapsulation",
    description: "Implement a robust BankAccount class with balance mutation guards, deposit methods, and error checking.",
    difficulty: "Advanced",
    estimatedTime: "15 min",
    workspaceXml: JS_BANK_ACCOUNT_CLASS_XML,
    tags: ["oop", "classes", "finance"],
    language: "javascript"
  },
  {
    id: "js-task-scheduler",
    title: "Async Task Retry Runner",
    description: "Create an async task execution runner with retry attempts and error escalation logic.",
    difficulty: "Advanced",
    estimatedTime: "15 min",
    workspaceXml: JS_TASK_SCHEDULER_XML,
    tags: ["async", "loops", "resilience"],
    language: "javascript"
  },
  {
    id: "js-matrix-transform",
    title: "2D Matrix Grid Processor",
    description: "Manipulate nested 2D arrays and apply coordinate transformations in JavaScript.",
    difficulty: "Advanced",
    estimatedTime: "18 min",
    workspaceXml: JS_MATRIX_TRANSFORM_XML,
    tags: ["2d-arrays", "matrix", "math"],
    language: "javascript"
  },
  {
    id: "js-event-emitter",
    title: "Custom Event Bus Architecture",
    description: "Construct a modular EventEmitter publish-subscribe pattern with Map collections and dispatch handlers.",
    difficulty: "Advanced",
    estimatedTime: "20 min",
    workspaceXml: JS_EVENT_EMITTER_XML,
    tags: ["patterns", "events", "oop"],
    language: "javascript"
  }
];

export const JAVA_TEMPLATES = [
  {
    id: "java-grade-calculator",
    title: "Student Grade & GPA Evaluator",
    description: "Implement decision structures in Java with if/else-if chains and standard console outputs.",
    difficulty: "Beginner",
    estimatedTime: "8 min",
    workspaceXml: JAVA_GRADE_CALCULATOR_XML,
    tags: ["if-else", "variables", "control-flow"],
    language: "java"
  },
  {
    id: "java-even-odd-classifier",
    title: "Even/Odd Number Classifier",
    description: "Use the modulo operator and conditional branching to determine number parity in Java.",
    difficulty: "Beginner",
    estimatedTime: "8 min",
    workspaceXml: JAVA_EVEN_ODD_CLASSIFIER_XML,
    tags: ["modulo", "conditionals", "math"],
    language: "java"
  },
  {
    id: "java-temp-converter",
    title: "Temperature Converter Method",
    description: "Create reusable static methods in Java with return values and arithmetic conversions.",
    difficulty: "Beginner",
    estimatedTime: "8 min",
    workspaceXml: JAVA_TEMP_CONVERTER_XML,
    tags: ["methods", "math", "functions"],
    language: "java"
  },
  {
    id: "java-leap-year-checker",
    title: "Leap Year Calendar Logic",
    description: "Determine leap years using compound divisibility rules and boolean logic.",
    difficulty: "Beginner",
    estimatedTime: "8 min",
    workspaceXml: JAVA_LEAP_YEAR_CHECKER_XML,
    tags: ["logic", "calendar", "conditionals"],
    language: "java"
  },
  {
    id: "java-multiplication-table",
    title: "Multiplication Table Generator",
    description: "Use bounded Java for-loops to compute and display formatted arithmetic multiplication tables.",
    difficulty: "Beginner",
    estimatedTime: "10 min",
    workspaceXml: JAVA_MULTIPLICATION_TABLE_XML,
    tags: ["loops", "for-loop", "math"],
    language: "java"
  },
  {
    id: "java-simple-interest",
    title: "Financial Interest Calculator",
    description: "Calculate standard simple interest on investments using multi-step Java arithmetic.",
    difficulty: "Beginner",
    estimatedTime: "10 min",
    workspaceXml: JAVA_SIMPLE_INTEREST_XML,
    tags: ["finance", "variables", "math"],
    language: "java"
  },
  {
    id: "java-vowel-counter",
    title: "Character Vowel Classifier",
    description: "Inspect character codes with compound OR logic to classify vowels vs consonants.",
    difficulty: "Beginner",
    estimatedTime: "8 min",
    workspaceXml: JAVA_VOWEL_COUNTER_XML,
    tags: ["logic", "characters", "conditionals"],
    language: "java"
  },
  {
    id: "java-arraylist-inventory",
    title: "ArrayList Inventory Tracker",
    description: "Manage dynamic item lists using Java's ArrayList with iteration and length inspection.",
    difficulty: "Intermediate",
    estimatedTime: "12 min",
    workspaceXml: JAVA_ARRAYLIST_INVENTORY_XML,
    tags: ["arraylist", "loops", "collections"],
    language: "java"
  },
  {
    id: "java-bank-account",
    title: "Bank Account Transaction Guard",
    description: "Simulate a secure bank account with balance constraints and conditional withdrawal guards.",
    difficulty: "Intermediate",
    estimatedTime: "12 min",
    workspaceXml: JAVA_BANK_ACCOUNT_XML,
    tags: ["logic", "arithmetic", "finance"],
    language: "java"
  },
  {
    id: "java-hashmap-phonebook",
    title: "Contact Phonebook with HashMap",
    description: "Store, update, and look up contact phone numbers efficiently using Java's HashMap.",
    difficulty: "Intermediate",
    estimatedTime: "12 min",
    workspaceXml: JAVA_HASHMAP_PHONEBOOK_XML,
    tags: ["hashmap", "key-value", "collections"],
    language: "java"
  },
  {
    id: "java-hashset-unique",
    title: "Unique Visitor Tracker (HashSet)",
    description: "Track unique user sessions and prevent duplicate entries using Java's HashSet.",
    difficulty: "Intermediate",
    estimatedTime: "12 min",
    workspaceXml: JAVA_HASHSET_UNIQUE_XML,
    tags: ["hashset", "deduplication", "collections"],
    language: "java"
  },
  {
    id: "java-array-stats",
    title: "Numeric Array Summary Statistics",
    description: "Calculate statistical aggregates (sum, average, minimum, maximum) across numerical lists.",
    difficulty: "Intermediate",
    estimatedTime: "12 min",
    workspaceXml: JAVA_ARRAY_STATS_XML,
    tags: ["statistics", "arrays", "math"],
    language: "java"
  },
  {
    id: "java-string-reversal",
    title: "String Case Transformation",
    description: "Manipulate text casing and string buffers using Java string utility functions.",
    difficulty: "Intermediate",
    estimatedTime: "10 min",
    workspaceXml: JAVA_STRING_REVERSAL_XML,
    tags: ["strings", "transform", "utilities"],
    language: "java"
  },
  {
    id: "java-fibonacci-loop",
    title: "Iterative Fibonacci Series",
    description: "Compute the Fibonacci number sequence iteratively using state variables and for-loops.",
    difficulty: "Intermediate",
    estimatedTime: "12 min",
    workspaceXml: JAVA_FIBONACCI_LOOP_XML,
    tags: ["algorithms", "loops", "math"],
    language: "java"
  },
  {
    id: "java-oop-student-record",
    title: "Student Record Class Architecture",
    description: "Define a clean Java class with private instance fields, constructors, and field accessors.",
    difficulty: "Advanced",
    estimatedTime: "15 min",
    workspaceXml: JAVA_OOP_STUDENT_RECORD_XML,
    tags: ["classes", "oop", "encapsulation"],
    language: "java"
  },
  {
    id: "java-shape-polymorphism",
    title: "Geometric Shape Class Hierarchy",
    description: "Model geometric shapes with class properties, dimensions, and area calculations.",
    difficulty: "Advanced",
    estimatedTime: "15 min",
    workspaceXml: JAVA_SHAPE_POLYMORPHISM_XML,
    tags: ["oop", "classes", "geometry"],
    language: "java"
  },
  {
    id: "java-custom-stack",
    title: "Stack Data Structure (LIFO)",
    description: "Build a Last-In First-Out (LIFO) stack data structure with push, size, and boundary checks.",
    difficulty: "Advanced",
    estimatedTime: "15 min",
    workspaceXml: JAVA_CUSTOM_STACK_XML,
    tags: ["data-structures", "stack", "collections"],
    language: "java"
  },
  {
    id: "java-exception-guard",
    title: "Exception Handling & Zero Division",
    description: "Safeguard critical arithmetic operations using structured try/catch blocks and recovery messages.",
    difficulty: "Advanced",
    estimatedTime: "15 min",
    workspaceXml: JAVA_EXCEPTION_GUARD_XML,
    tags: ["exceptions", "try-catch", "error-handling"],
    language: "java"
  },
  {
    id: "java-binary-search",
    title: "Binary Search on Sorted Arrays",
    description: "Implement an efficient logarithmic binary search algorithm on sorted number collections.",
    difficulty: "Advanced",
    estimatedTime: "18 min",
    workspaceXml: JAVA_BINARY_SEARCH_XML,
    tags: ["algorithms", "binary-search", "performance"],
    language: "java"
  },
  {
    id: "java-matrix-multiplication",
    title: "2D Matrix Dimensions & Storage",
    description: "Configure multi-dimensional data grids and 2D arrays for spatial data processing.",
    difficulty: "Advanced",
    estimatedTime: "18 min",
    workspaceXml: JAVA_MATRIX_MULTIPLICATION_XML,
    tags: ["2d-arrays", "matrix", "math"],
    language: "java"
  }
];

export const TEMPLATES_BY_LANGUAGE = {
  python: PYTHON_TEMPLATES,
  javascript: JAVASCRIPT_TEMPLATES,
  java: JAVA_TEMPLATES
};

/**
 * Returns the curated templates list for the given language.
 * @param {string} language - 'python' | 'javascript' | 'java'
 * @returns {Array} List of template objects
 */
export function getTemplatesForLanguage(language = 'python') {
  const normalized = (language || 'python').toLowerCase();
  return TEMPLATES_BY_LANGUAGE[normalized] || PYTHON_TEMPLATES;
}

// Default export: Python templates for backwards compatibility
export const TEMPLATES = PYTHON_TEMPLATES;
`;

const finalFileContent = pythonImports + jsXmlDefs + javaXmlDefs + catalogDefs;
fs.writeFileSync(targetIndexJs, finalFileContent, 'utf8');

console.log("Successfully wrote templates to src/templates/index.js!");
console.log("Python templates count:", 20);
console.log("JavaScript templates count:", 20);
console.log("Java templates count:", 20);
console.log("Total templates across all 3 languages:", 60);
