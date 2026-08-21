import ROCKET_LAUNCH_XML from './rocket_launch_height.xml?raw';
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

// =====================================================================
// JAVASCRIPT TEMPLATES XML DEFINITIONS
// =====================================================================
const JS_COUNTER_THRESHOLD_XML = `<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="js_var_let" x="30" y="30">
    <field name="VAR">counter</field>
    <value name="VALUE">
      <block type="math_number"><field name="NUM">0</field></block>
    </value>
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
                    <value name="TEXT">
                      <block type="text"><field name="TEXT">Threshold Reached!</field></block>
                    </value>
                  </block>
                </statement>
              </block>
            </next>
          </block>
        </statement>
        <next>
          <block type="js_console_log">
            <value name="TEXT">
              <block type="variables_get"><field name="VAR">counter</field></block>
            </value>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>`;

const JS_ARRAY_TRANSFORMER_XML = `<xml xmlns="https://developers.google.com/blockly/xml">
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
                <value name="TEXT">
                  <block type="text"><field name="TEXT">Total sum calculated successfully</field></block>
                </value>
                <next>
                  <block type="js_console_log">
                    <value name="TEXT">
                      <block type="variables_get"><field name="VAR">sum</field></block>
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
</xml>`;

const JS_JSON_PROCESSOR_XML = `<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="js_var_const" x="30" y="30">
    <field name="VAR">userProfile</field>
    <value name="VALUE">
      <block type="js_object_create">
        <field name="JSON_STR">"username": "coder_pro", "level": 5, "active": true</field>
      </block>
    </value>
    <next>
      <block type="js_var_const">
        <field name="VAR">jsonString</field>
        <value name="VALUE">
          <block type="js_json_stringify">
            <value name="OBJ"><block type="variables_get"><field name="VAR">userProfile</field></block></value>
          </block>
        </value>
        <next>
          <block type="js_console_log">
            <value name="TEXT"><block type="variables_get"><field name="VAR">jsonString</field></block></value>
            <next>
              <block type="js_var_const">
                <field name="VAR">parsedData</field>
                <value name="VALUE">
                  <block type="js_json_parse">
                    <value name="STR"><block type="variables_get"><field name="VAR">jsonString</field></block></value>
                  </block>
                </value>
                <next>
                  <block type="js_console_log">
                    <value name="TEXT">
                      <block type="text"><field name="TEXT">Profile parsed and verified</field></block>
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
</xml>`;

const JS_ASYNC_SIMULATOR_XML = `<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="js_async_func" x="30" y="30">
    <field name="NAME">fetchUserData</field>
    <field name="PARAMS">userId</field>
    <statement name="BODY">
      <block type="js_try_catch">
        <statement name="TRY">
          <block type="js_console_log">
            <value name="TEXT">
              <block type="text"><field name="TEXT">Fetching data from API...</field></block>
            </value>
            <next>
              <block type="js_var_let">
                <field name="VAR">response</field>
                <value name="VALUE">
                  <block type="js_await">
                    <value name="VALUE">
                      <block type="text"><field name="TEXT">Promise.resolve({ status: 200, user: userId })</field></block>
                    </value>
                  </block>
                </value>
                <next>
                  <block type="js_console_log">
                    <value name="TEXT"><block type="variables_get"><field name="VAR">response</field></block></value>
                  </block>
                </next>
              </block>
            </next>
          </block>
        </statement>
        <statement name="CATCH">
          <block type="js_console_error">
            <value name="TEXT">
              <block type="text"><field name="TEXT">Failed to fetch data</field></block>
            </value>
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
</xml>`;

const JS_OOP_CART_XML = `<xml xmlns="https://developers.google.com/blockly/xml">
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
            <value name="TEXT">
              <block type="text"><field name="TEXT">Shopping cart initialized</field></block>
            </value>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>`;

// =====================================================================
// JAVA TEMPLATES XML DEFINITIONS
// =====================================================================
const JAVA_GRADE_CALCULATOR_XML = `<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="variables_set" x="30" y="30">
    <field name="VAR">score</field>
    <value name="VALUE">
      <block type="math_number"><field name="NUM">85</field></block>
    </value>
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
</xml>`;

const JAVA_ARRAYLIST_INVENTORY_XML = `<xml xmlns="https://developers.google.com/blockly/xml">
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
</xml>`;

const JAVA_TEMP_CONVERTER_XML = `<xml xmlns="https://developers.google.com/blockly/xml">
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
</xml>`;

const JAVA_BANK_ACCOUNT_XML = `<xml xmlns="https://developers.google.com/blockly/xml">
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
</xml>`;

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
    id: "java-temp-converter",
    title: "Temperature Converter Method",
    description: "Create reusable static methods in Java with return values and arithmetic conversions.",
    difficulty: "Intermediate",
    estimatedTime: "10 min",
    workspaceXml: JAVA_TEMP_CONVERTER_XML,
    tags: ["methods", "math", "functions"],
    language: "java"
  },
  {
    id: "java-bank-account",
    title: "Bank Account Transaction Guard",
    description: "Simulate a secure bank account with balance constraints and conditional withdrawal guards.",
    difficulty: "Advanced",
    estimatedTime: "15 min",
    workspaceXml: JAVA_BANK_ACCOUNT_XML,
    tags: ["logic", "arithmetic", "finance"],
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
