export const TUTORIALS = [
  {
    "id": "python-hello-world",
    "title": "Python Hello, World!",
    "difficulty": "Beginner",
    "estimatedTime": "5 minutes",
    "learningObjectives": ["Learn how to print text to the console.", "Understand the 'print' block."],
    "prerequisites": ["None"],
    "stages": [
      {
        "stageNumber": 1,
        "title": "Step 1: Add the 'print' block",
        "intention": "To start our program, we need a command that can display output. The `print` block is the fundamental way to show text in Python.",
        "instructionText": "First, let's clear the workspace and add the `print` block.",
        "explanation": "The `print()` function in Python is a built-in function that outputs a specified message to the screen.",
        "expectedOutcome": "A standalone `print` block appears on the workspace.",
        "accessibilityText": "Stage 1 adds the main print block to the workspace to begin the program.",
        "actions": [
          { "type": "clearWorkspace" },
          {
            "type": "addBlock",
            "blockXml": `<block type="text_print" id="print_block" x="38" y="38"></block>`
          }
        ]
      },
      {
        "stageNumber": 2,
        "title": "Step 2: Add and Connect a Text Block",
        "intention": "The `print` block needs to know *what* to print. We'll provide it with a piece of text by connecting a text block.",
        "instructionText": "Now, create a text block and connect it to the `print` block's input.",
        "explanation": "In programming, a piece of text is called a 'string'. We are giving the `print` function a string to display.",
        "expectedOutcome": "A text block is created and snaps into the `print` block.",
        "accessibilityText": "Stage 2 adds a text block and connects it to the print block.",
        "actions": [
          {
            "type": "addBlock",
            "blockXml": `<block type="text" id="text_block"></block>`
          },
          {
            "type": "connect",
            "childBlockId": "text_block",
            "parentBlockId": "print_block",
            "connectionName": "TEXT"
          }
        ]
      },
      {
        "stageNumber": 3,
        "title": "Step 3: Set the Message",
        "intention": "The final step is to provide the actual message we want to display. This is done by editing the field on the text block.",
        "instructionText": "Click on the empty text block and type 'Hello, World!'.",
        "explanation": "You have now provided the full string 'Hello, World!' to the `print` function. When this code runs, it will print that exact message.",
        "expectedOutcome": "The text block now contains the message 'Hello, World!'.",
        "accessibilityText": "Stage 3 sets the value of the text block to 'Hello, World!'.",
        "actions": [
          {
            "type": "setField",
            "blockId": "text_block",
            "fieldName": "TEXT",
            "value": "Hello, World!"
          }
        ]
      }
    ],
    "summary": {
      "text": "Congratulations! You've completed your first Python program."
    }
  },
  {
    "id": "python-variables-and-input",
    "title": "Variables and User Input",
    "difficulty": "Beginner",
    "estimatedTime": "5 minutes",
    "learningObjectives": ["Learn how to use variables to store data.", "Learn how to get input from the user."],
    "prerequisites": ["Python Hello, World!"],
    "stages": [
      {
        "stageNumber": 1,
        "title": "Step 1: Create a variable",
        "intention": "Variables are used to store information. We'll create a variable to hold the user's name.",
        "instructionText": "Clear the workspace and add a 'set' block to create a new variable.",
        "explanation": "In Python, you can think of a variable as a named container for a value.",
        "expectedOutcome": "A 'set' block appears on the workspace.",
        "accessibilityText": "Stage 1 adds a 'set' block to the workspace.",
        "actions": [
          { "type": "clearWorkspace" },
          {
            "type": "addBlock",
            "blockXml": "<block type=\"essentials_var_set\" id=\"set_variable_block\" x=\"38\" y=\"38\"><field name=\"VAR\">user_name</field></block>"
          }
        ]
      },
      {
        "stageNumber": 2,
        "title": "Step 2: Get user input",
        "intention": "Now we'll ask the user for their name and store it in our new variable.",
        "instructionText": "Add an 'input' block and connect it to the 'set' block.",
        "explanation": "The `input()` function in Python prompts the user to enter some text.",
        "expectedOutcome": "An 'input' block is connected to the 'set' block.",
        "accessibilityText": "Stage 2 adds and connects an 'input' block.",
        "actions": [
          {
            "type": "addBlock",
            "blockXml": "<block type=\"essentials_safe_input\" id=\"input_block\"><value name=\"PROMPT\"><block type=\"text\"><field name=\"TEXT\">What is your name?</field></block></value></block>"
          },
          {
            "type": "connect",
            "childBlockId": "input_block",
            "parentBlockId": "set_variable_block",
            "connectionName": "VALUE"
          }
        ]
      },
      {
        "stageNumber": 3,
        "title": "Step 3: Print a greeting",
        "intention": "Finally, we'll use the user's name to print a personalized greeting.",
        "instructionText": "Add a 'print' block, a 'create text with' block, and a 'get' block to print a greeting.",
        "explanation": "We can combine text and variables to create dynamic messages.",
        "expectedOutcome": "The program now greets the user by name.",
        "accessibilityText": "Stage 3 prints a greeting using the user's name.",
        "actions": [
          {
            "type": "addBlock",
            "blockXml": "<block type=\"text_print\" id=\"print_block\" x=\"38\" y=\"100\"></block>"
          },
          {
            "type": "addBlock",
            "blockXml": "<block type=\"text_concat\" id=\"concat_block\"></block>"
          },
          {
            "type": "addBlock",
            "blockXml": "<block type=\"text\" id=\"hello_text_block\"><field name=\"TEXT\">Hello, </field></block>"
          },
          {
            "type": "addBlock",
            "blockXml": "<block type=\"essentials_var_get\" id=\"get_variable_block\"><field name=\"VAR\">user_name</field></block>"
          },
          {
            "type": "connect",
            "childBlockId": "concat_block",
            "parentBlockId": "print_block",
            "connectionName": "TEXT"
          },
          {
            "type": "connect",
            "childBlockId": "hello_text_block",
            "parentBlockId": "concat_block",
            "connectionName": "ADD0"
          },
          {
            "type": "connect",
            "childBlockId": "get_variable_block",
            "parentBlockId": "concat_block",
            "connectionName": "ADD1"
          },
          {
            "type": "connect",
            "childBlockId": "print_block",
            "parentBlockId": "set_variable_block",
            "connectionName": "NEXT"
          }
        ]
      }
    ],
    "summary": {
      "text": "Great job! You've learned how to use variables and get user input."
    }
  },
  {
    "id": "KCE-TUT-PY-P03",
    "title": "Making Decisions with Conditions",
    "difficulty": "Beginner",
    "estimatedTime": "7 minutes",
    "learningObjectives": ["Understand conditional logic.", "Use if/else statements.", "Use comparison blocks."],
    "prerequisites": ["Variables and User Input"],
    "stages": [
      {
        "stageNumber": 1,
        "title": "Step 1: Get User Input for Age",
        "intention": "To make a decision, our program needs information. We will ask the user for their age and store it in a variable.",
        "instructionText": "First, clear the workspace. Then, create a variable named `age` and set its value by prompting the user for their age.",
        "explanation": "We are storing the user's input in a variable called `age`. The `input()` function returns text, but Python is often smart enough to treat it as a number in comparisons.",
        "expectedOutcome": "A block sequence that asks for the user's age and saves it to the `age` variable.",
        "accessibilityText": "Stage 1 creates a variable 'age' and prompts the user for input.",
        "actions": [
          { "type": "clearWorkspace" },
          {
            "type": "addBlock",
            "blockXml": "<block type=\"essentials_var_set\" id=\"set_age_block\" x=\"38\" y=\"38\"><field name=\"VAR\">age</field></block>"
          },
          {
            "type": "addBlock",
            "blockXml": "<block type=\"essentials_cast\" id=\"input_age_block\"><field name=\"TYPE\">int</field><value name=\"VALUE\"><block type=\"essentials_safe_input\"><value name=\"PROMPT\"><block type=\"text\"><field name=\"TEXT\">Please enter your age:</field></block></value><field name=\"TYPE\">int</field></block></value></block>"
          },
          {
            "type": "connect",
            "childBlockId": "input_age_block",
            "parentBlockId": "set_age_block",
            "connectionName": "VALUE"
          }
        ]
      },
      {
        "stageNumber": 2,
        "title": "Step 2: Add the 'if' Block",
        "intention": "The `if` block is the core of decision-making. It runs a piece of code only if a specific condition is true.",
        "instructionText": "Now, add an `if` block below the variable.",
        "explanation": "The `if` block has a slot for a condition. The blocks you place inside its 'do' section will only execute when that condition is met.",
        "expectedOutcome": "An `if-else` block is added to the workspace and connected below the variable block.",
        "accessibilityText": "Stage 2 adds an if-else block to the program flow.",
        "actions": [
          {
            "type": "addBlock",
            "blockXml": "<block type=\"controls_if\" id=\"if_else_block\" x=\"38\" y=\"113\"><mutation else=\"1\"></mutation></block>"
          },
          {
            "type": "connect",
            "childBlockId": "if_else_block",
            "parentBlockId": "set_age_block",
            "connectionName": "NEXT"
          }
        ]
      },
      {
        "stageNumber": 3,
        "title": "Step 3: Create the Condition",
        "intention": "We need to define the exact condition to check. Here, we'll check if the age is 18 or greater.",
        "instructionText": "Create a comparison block to check if the `age` variable is greater than or equal to the number 18. Connect this to the `if` block.",
        "explanation": "This block compares two values and returns `True` or `False`. We are checking: `age >= 18`.",
        "expectedOutcome": "The comparison logic is created and connected to the `if` block's condition input.",
        "accessibilityText": "Stage 3 creates and connects the age comparison logic.",
        "actions": [
          {
            "type": "addBlock",
            "blockXml": "<block type=\"logic_compare\" id=\"compare_block\"><field name=\"OP\">GTE</field></block>"
          },
          {
            "type": "addBlock",
            "blockXml": "<block type=\"essentials_var_get\" id=\"get_age_block\"><field name=\"VAR\">age</field></block>"
          },
          {
            "type": "addBlock",
            "blockXml": "<block type=\"math_number\" id=\"number_18_block\"><field name=\"NUM\">18</field></block>"
          },
          {
            "type": "connect",
            "childBlockId": "get_age_block",
            "parentBlockId": "compare_block",
            "connectionName": "A"
          },
          {
            "type": "connect",
            "childBlockId": "number_18_block",
            "parentBlockId": "compare_block",
            "connectionName": "B"
          },
          {
            "type": "connect",
            "childBlockId": "compare_block",
            "parentBlockId": "if_else_block",
            "connectionName": "IF0"
          }
        ]
      },
      {
        "stageNumber": 4,
        "title": "Step 4: Handle the 'True' Case",
        "intention": "Now we define what happens if the condition is met (i.e., the user is 18 or older).",
        "instructionText": "Add a `print` block inside the 'do' section of the `if` block with the text 'You are eligible to vote.'",
        "explanation": "This `print` statement will only run if the age entered is 18 or greater.",
        "expectedOutcome": "A print block is added to the 'if' section to handle the true case.",
        "accessibilityText": "Stage 4 adds the print statement for the eligible case.",
        "actions": [
          {
            "type": "addBlock",
            "blockXml": "<block type=\"text_print\" id=\"print_eligible_block\"></block>"
          },
          {
            "type": "addBlock",
            "blockXml": "<block type=\"text\" id=\"text_eligible_block\"><field name=\"TEXT\">You are eligible to vote.</field></block>"
          },
          {
            "type": "connect",
            "childBlockId": "text_eligible_block",
            "parentBlockId": "print_eligible_block",
            "connectionName": "TEXT"
          },
          {
            "type": "connect",
            "childBlockId": "print_eligible_block",
            "parentBlockId": "if_else_block",
            "connectionName": "DO0"
          }
        ]
      },
      {
        "stageNumber": 5,
        "title": "Step 5: Handle the 'False' Case with 'else'",
        "intention": "The `else` part of the block handles the opposite case—when the condition is not met.",
        "instructionText": "Finally, add another `print` block to the 'else' section with the text 'You are not eligible to vote.'",
        "explanation": "The `else` block provides an alternative path. If the `if` condition is false, the code inside `else` will run instead.",
        "expectedOutcome": "A print block is added to the 'else' section, completing the program.",
        "accessibilityText": "Stage 5 adds the print statement for the not-eligible case.",
        "actions": [
          {
            "type": "addBlock",
            "blockXml": "<block type=\"text_print\" id=\"print_not_eligible_block\"></block>"
          },
          {
            "type": "addBlock",
            "blockXml": "<block type=\"text\" id=\"text_not_eligible_block\"><field name=\"TEXT\">You are not eligible to vote.</field></block>"
          },
          {
            "type": "connect",
            "childBlockId": "text_not_eligible_block",
            "parentBlockId": "print_not_eligible_block",
            "connectionName": "TEXT"
          },
          {
            "type": "connect",
            "childBlockId": "print_not_eligible_block",
            "parentBlockId": "if_else_block",
            "connectionName": "ELSE"
          }
        ]
      }
    ],
    "summary": {
      "text": "Excellent! You've learned how to make decisions in your code using if/else logic."
    }
  },
   {
    "id": "KCE-TUT-PY-P04",
    "title": "Loops and Iteration in Python",
    "difficulty": "Beginner",
    "estimatedTime": "8 minutes",
    "learningObjectives": [
      "Understand how to repeat actions a fixed number of times using a for loop.",
      "Learn how to iterate over items in a list."
    ],
    "prerequisites": ["Making Decisions with Conditions"],
    "stages": [
      {
        "stageNumber": 1,
        "title": "Step 1: Repeating Actions with a 'for' Loop",
        "intention": "Loops are a fundamental concept in programming that allow you to repeat a block of code multiple times. We will start with a simple loop that repeats an action a fixed number of times.",
        "instructionText": "Clear the workspace, then add a 'repeat 10 times' block. Change the number 10 to 5. Inside the loop, add a 'print' block with the text 'This is a loop'.",
        "explanation": "This block creates a simple 'for' loop. The code inside the 'do' section will run 5 times. This is useful when you know exactly how many times you need to perform an action.",
        "expectedOutcome": "A loop that prints the message 'This is a loop' five times.",
        "accessibilityText": "Stage 1 introduces a for loop to repeat a print statement five times.",
        "actions": [
          { "type": "clearWorkspace" },
          {
            "type": "addBlock",
            "blockXml": "<block type=\"controls_repeat_ext\" id=\"repeat_loop_block\" x=\"38\" y=\"38\"><value name=\"TIMES\"><shadow type=\"math_number\"><field name=\"NUM\">5</field></shadow></value></block>"
          },
          {
            "type": "addBlock",
            "blockXml": "<block type=\"text_print\" id=\"print_loop_block\"></block>"
          },
          {
            "type": "addBlock",
            "blockXml": "<block type=\"text\" id=\"text_loop_message\"><field name=\"TEXT\">This is a loop</field></block>"
          },
          {
            "type": "connect",
            "childBlockId": "text_loop_message",
            "parentBlockId": "print_loop_block",
            "connectionName": "TEXT"
          },
          {
            "type": "connect",
            "childBlockId": "print_loop_block",
            "parentBlockId": "repeat_loop_block",
            "connectionName": "DO"
          }
        ]
      },
      {
        "stageNumber": 2,
        "title": "Step 2: Creating a List to Iterate",
        "intention": "A more powerful use of loops is to perform an action for each item in a collection, like a list. First, we need to create a list of items.",
        "instructionText": "Clear the workspace and create a variable named 'students'. Connect a 'create list with' block to it, and add three text blocks with the names 'Alice', 'Bob', and 'Charlie'.",
        "explanation": "We've created a list of strings and stored it in a variable called 'students'. In the next step, we will loop through this list.",
        "expectedOutcome": "A variable 'students' is created and assigned a list of three names.",
        "accessibilityText": "Stage 2 creates a list of student names.",
        "actions": [
          { "type": "clearWorkspace" },
          {
            "type": "addBlock",
            "blockXml": "<block type=\"essentials_var_set\" id=\"set_students_block\" x=\"38\" y=\"38\"><field name=\"VAR\">students</field></block>"
          },
          {
            "type": "addBlock",
            "blockXml": "<block type=\"essentials_list_create\" id=\"list_create_block\"><mutation items=\"3\"></mutation><value name=\"ITEM0\"><block type=\"text\"><field name=\"TEXT\">Alice</field></block></value><value name=\"ITEM1\"><block type=\"text\"><field name=\"TEXT\">Bob</field></block></value><value name=\"ITEM2\"><block type=\"text\"><field name=\"TEXT\">Charlie</field></block></value></block>"
          },
          {
            "type": "connect",
            "childBlockId": "list_create_block",
            "parentBlockId": "set_students_block",
            "connectionName": "VALUE"
          }
        ]
      },
      {
        "stageNumber": 3,
        "title": "Step 3: Iterating Through the List",
        "intention": "Now we will use a 'for each' loop to go through our list one item at a time and perform an action for each name.",
        "instructionText": "Add a 'for each item in list' block. Connect the 'students' variable to it. Inside the loop, print a greeting that includes the student's name.",
        "explanation": "This loop will automatically run for every item in the 'students' list. During each run (or 'iteration'), the variable 'item' will hold the current student's name. We use 'create text with' to build a greeting like 'Hello, Alice'.",
        "expectedOutcome": "The program now iterates through the list and prints a personalized greeting for each student.",
        "accessibilityText": "Stage 3 iterates through the list and prints a greeting for each student.",
        "actions": [
          { "type": "clearWorkspace" },
          {
            "type": "addBlock",
            "blockXml": "<block type=\"essentials_var_set\" id=\"set_students_block\" x=\"38\" y=\"38\"><field name=\"VAR\">students</field></block>"
          },
          {
            "type": "addBlock",
            "blockXml": "<block type=\"essentials_list_create\" id=\"list_create_block\"><mutation items=\"3\"></mutation><value name=\"ITEM0\"><block type=\"text\"><field name=\"TEXT\">Alice</field></block></value><value name=\"ITEM1\"><block type=\"text\"><field name=\"TEXT\">Bob</field></block></value><value name=\"ITEM2\"><block type=\"text\"><field name=\"TEXT\">Charlie</field></block></value></block>"
          },
          {
            "type": "connect",
            "childBlockId": "list_create_block",
            "parentBlockId": "set_students_block",
            "connectionName": "VALUE"
          },
          {
            "type": "addBlock",
            "blockXml": "<block type=\"controls_forEach\" id=\"for_each_block\" x=\"38\" y=\"150\"><field name=\"VAR\">item</field></block>"
          },
          {
            "type": "addBlock",
            "blockXml": "<block type=\"essentials_var_get\" id=\"get_students_block\"><field name=\"VAR\">students</field></block>"
          },
          {
            "type": "connect",
            "childBlockId": "get_students_block",
            "parentBlockId": "for_each_block",
            "connectionName": "LIST"
          },
          {
            "type": "connect",
            "childBlockId": "for_each_block",
            "parentBlockId": "set_students_block",
            "connectionName": "NEXT"
          },
          {
            "type": "addBlock",
            "blockXml": "<block type=\"text_print\" id=\"print_greeting_block\"></block>"
          },
          {
            "type": "addBlock",
            "blockXml": "<block type=\"text_concat\" id=\"concat_greeting_block\"><mutation items=\"2\"></mutation></block>"
          },
          {
            "type": "addBlock",
            "blockXml": "<block type=\"text\" id=\"text_hello\"><field name=\"TEXT\">Hello, </field></block>"
          },
          {
            "type": "addBlock",
            "blockXml": "<block type=\"variables_get\" id=\"get_item_block\"><field name=\"VAR\">item</field></block>"
          },
          {
            "type": "connect",
            "childBlockId": "print_greeting_block",
            "parentBlockId": "for_each_block",
            "connectionName": "DO"
          },
          {
            "type": "connect",
            "childBlockId": "concat_greeting_block",
            "parentBlockId": "print_greeting_block",
            "connectionName": "TEXT"
          },
          {
            "type": "connect",
            "childBlockId": "text_hello",
            "parentBlockId": "concat_greeting_block",
            "connectionName": "ADD0"
          },
          {
            "type": "connect",
            "childBlockId": "get_item_block",
            "parentBlockId": "concat_greeting_block",
            "connectionName": "ADD1"
          }
        ]
      }
    ],
    "summary": {
      "text": "Fantastic! You've learned how to use loops to repeat code and iterate through lists."
    }
  }
];

export const PYTHON_TUTORIALS = TUTORIALS;

export const JAVASCRIPT_TUTORIALS = [
  {
    id: "js-hello-world",
    title: "JavaScript Hello, World!",
    difficulty: "Beginner",
    estimatedTime: "5 minutes",
    language: "javascript",
    learningObjectives: ["Output messages to the browser developer console.", "Understand console.log in JavaScript."],
    prerequisites: ["None"],
    stages: [
      {
        stageNumber: 1,
        title: "Step 1: Add the console.log block",
        intention: "To display output in JavaScript, console.log is the core command.",
        instructionText: "First, let's clear the workspace and add the console.log block.",
        explanation: "console.log() prints messages or values directly to the JavaScript console.",
        expectedOutcome: "A standalone console.log block appears on the workspace.",
        accessibilityText: "Stage 1 adds the console.log block.",
        actions: [
          { type: "clearWorkspace" },
          {
            type: "addBlock",
            blockXml: `<block type="js_console_log" id="js_log_block" x="38" y="38"></block>`
          }
        ]
      },
      {
        stageNumber: 2,
        title: "Step 2: Add and Connect a Message String",
        intention: "Connect a text string to console.log to print a greeting.",
        instructionText: "Create a text block and connect it to the console.log block's input.",
        explanation: "Strings in JavaScript can be enclosed in single or double quotes.",
        expectedOutcome: "A text block snaps into the console.log block.",
        accessibilityText: "Stage 2 adds a text block to console.log.",
        actions: [
          {
            type: "addBlock",
            blockXml: `<block type="text" id="js_text_block"><field name="TEXT">Hello, JavaScript World!</field></block>`
          },
          {
            type: "connect",
            childBlockId: "js_text_block",
            parentBlockId: "js_log_block",
            connectionName: "TEXT"
          }
        ]
      }
    ],
    summary: {
      text: "Awesome! You have written and logged your first JavaScript program."
    }
  },
  {
    id: "js-variables-let-const",
    title: "Variables with let & const",
    difficulty: "Beginner",
    estimatedTime: "6 minutes",
    language: "javascript",
    learningObjectives: ["Declare mutable variables with let.", "Store and inspect numbers in JavaScript."],
    prerequisites: ["JavaScript Hello, World!"],
    stages: [
      {
        stageNumber: 1,
        title: "Step 1: Declare a variable with let",
        intention: "In modern JavaScript (ES6+), 'let' is used to declare variables whose values can change.",
        instructionText: "Add a 'let' variable declaration block.",
        explanation: "let allows you to declare a block-scoped local variable.",
        expectedOutcome: "A 'let score = 100' block appears.",
        actions: [
          { type: "clearWorkspace" },
          {
            type: "addBlock",
            blockXml: `<block type="js_var_let" id="var_let_block" x="38" y="38"><field name="VAR">score</field></block>`
          },
          {
            type: "addBlock",
            blockXml: `<block type="math_number" id="num_score"><field name="NUM">100</field></block>`
          },
          {
            type: "connect",
            childBlockId: "num_score",
            parentBlockId: "var_let_block",
            connectionName: "VALUE"
          }
        ]
      },
      {
        stageNumber: 2,
        title: "Step 2: Log the variable to console",
        intention: "Display the stored score on the console.",
        instructionText: "Add a console.log block and pass the score variable into it.",
        explanation: "Referencing the variable name outputs its current value.",
        expectedOutcome: "console.log(score) is appended.",
        actions: [
          {
            type: "addBlock",
            blockXml: `<block type="js_console_log" id="log_score_block"></block>`
          },
          {
            type: "addBlock",
            blockXml: `<block type="variables_get" id="get_score_block"><field name="VAR">score</field></block>`
          },
          {
            type: "connect",
            childBlockId: "get_score_block",
            parentBlockId: "log_score_block",
            connectionName: "TEXT"
          },
          {
            type: "connect",
            childBlockId: "log_score_block",
            parentBlockId: "var_let_block",
            connectionName: "NEXT"
          }
        ]
      }
    ],
    summary: {
      text: "Great job! You now understand declaring and using JavaScript variables."
    }
  },
  {
    id: "js-conditionals-decision",
    title: "Decision Making with If-Else",
    difficulty: "Intermediate",
    estimatedTime: "7 minutes",
    language: "javascript",
    learningObjectives: ["Use if-else statements in JavaScript.", "Evaluate boolean comparisons with strict equality."],
    prerequisites: ["Variables with let & const"],
    stages: [
      {
        stageNumber: 1,
        title: "Step 1: Declare an age variable",
        intention: "Create an age variable to test against a driving eligibility requirement.",
        instructionText: "Clear the workspace and initialize let age = 18.",
        explanation: "Conditional branches will evaluate whether this value meets criteria.",
        expectedOutcome: "let age = 18 block is placed.",
        actions: [
          { type: "clearWorkspace" },
          {
            type: "addBlock",
            blockXml: `<block type="js_var_let" id="var_age_block" x="38" y="38"><field name="VAR">age</field></block>`
          },
          {
            type: "addBlock",
            blockXml: `<block type="math_number" id="num_age"><field name="NUM">18</field></block>`
          },
          {
            type: "connect",
            childBlockId: "num_age",
            parentBlockId: "var_age_block",
            connectionName: "VALUE"
          }
        ]
      },
      {
        stageNumber: 2,
        title: "Step 2: Add an if-else statement",
        intention: "Create a conditional branch that checks if age >= 18.",
        instructionText: "Add an if-else block with a comparison condition.",
        explanation: "if (age >= 18) executes the then-branch when true, and the else-branch otherwise.",
        expectedOutcome: "An if-else branch is connected.",
        actions: [
          {
            type: "addBlock",
            blockXml: `<block type="js_if_else" id="if_else_block"></block>`
          },
          {
            type: "addBlock",
            blockXml: `<block type="js_logic_compare" id="compare_age"><field name="OP">&gt;=</field></block>`
          },
          {
            type: "addBlock",
            blockXml: `<block type="variables_get" id="get_age_comp"><field name="VAR">age</field></block>`
          },
          {
            type: "addBlock",
            blockXml: `<block type="math_number" id="num_18"><field name="NUM">18</field></block>`
          },
          {
            type: "connect",
            childBlockId: "get_age_comp",
            parentBlockId: "compare_age",
            connectionName: "A"
          },
          {
            type: "connect",
            childBlockId: "num_18",
            parentBlockId: "compare_age",
            connectionName: "B"
          },
          {
            type: "connect",
            childBlockId: "compare_age",
            parentBlockId: "if_else_block",
            connectionName: "COND"
          },
          {
            type: "connect",
            childBlockId: "if_else_block",
            parentBlockId: "var_age_block",
            connectionName: "NEXT"
          }
        ]
      }
    ],
    summary: {
      text: "Well done! You have mastered conditional logic in JavaScript."
    }
  }
];

export const JAVA_TUTORIALS = [
  {
    id: "java-hello-world",
    title: "Java Hello, World!",
    difficulty: "Beginner",
    estimatedTime: "5 minutes",
    language: "java",
    learningObjectives: ["Learn how Java executes in a Main class.", "Understand System.out.println output in Java."],
    prerequisites: ["None"],
    stages: [
      {
        stageNumber: 1,
        title: "Step 1: Add a Print Statement",
        intention: "Java programs use System.out.println() to print text lines to standard output.",
        instructionText: "Clear the workspace and add a print block.",
        explanation: "The CodeAsthram Java generator automatically wraps top-level blocks in a clean public class Main with a public static void main method.",
        expectedOutcome: "A print block appears on the workspace.",
        actions: [
          { type: "clearWorkspace" },
          {
            type: "addBlock",
            blockXml: `<block type="text_print" id="java_print_block" x="38" y="38"></block>`
          }
        ]
      },
      {
        stageNumber: 2,
        title: "Step 2: Provide the Java Greeting String",
        intention: "Connect a text string to be printed by the Java program.",
        instructionText: "Add a text block with 'Hello, Java World!' and connect it to print.",
        explanation: "Java String literals are double-quoted character sequences.",
        expectedOutcome: "A string block is connected to the print statement.",
        actions: [
          {
            type: "addBlock",
            blockXml: `<block type="text" id="java_text_block"><field name="TEXT">Hello, Java World!</field></block>`
          },
          {
            type: "connect",
            childBlockId: "java_text_block",
            parentBlockId: "java_print_block",
            connectionName: "TEXT"
          }
        ]
      }
    ],
    summary: {
      text: "Congratulations! You've created your first working Java program."
    }
  },
  {
    id: "java-variables-numbers",
    title: "Variables and Arithmetic in Java",
    difficulty: "Beginner",
    estimatedTime: "6 minutes",
    language: "java",
    learningObjectives: ["Store numeric values in Java variables.", "Perform arithmetic calculations and output results."],
    prerequisites: ["Java Hello, World!"],
    stages: [
      {
        stageNumber: 1,
        title: "Step 1: Set a base price variable",
        intention: "Store an initial value in a variable named 'price'.",
        instructionText: "Clear the workspace and set price = 50.",
        explanation: "Java generates strongly-typed variable declarations for all assigned variables.",
        expectedOutcome: "A variable assignment block is added.",
        actions: [
          { type: "clearWorkspace" },
          {
            type: "addBlock",
            blockXml: `<block type="variables_set" id="java_set_price" x="38" y="38"><field name="VAR">price</field></block>`
          },
          {
            type: "addBlock",
            blockXml: `<block type="math_number" id="java_num_price"><field name="NUM">50</field></block>`
          },
          {
            type: "connect",
            childBlockId: "java_num_price",
            parentBlockId: "java_set_price",
            connectionName: "VALUE"
          }
        ]
      },
      {
        stageNumber: 2,
        title: "Step 2: Calculate total with tax and print",
        intention: "Calculate price * 1.18 and print the final value.",
        instructionText: "Add an arithmetic multiplication block and connect it to a print block.",
        explanation: "Java computes double-precision floating point arithmetic accurately.",
        expectedOutcome: "A calculation and print block are chained.",
        actions: [
          {
            type: "addBlock",
            blockXml: `<block type="text_print" id="java_print_total"></block>`
          },
          {
            type: "addBlock",
            blockXml: `<block type="math_arithmetic" id="java_math_mult"><field name="OP">MULTIPLY</field></block>`
          },
          {
            type: "addBlock",
            blockXml: `<block type="variables_get" id="java_get_price"><field name="VAR">price</field></block>`
          },
          {
            type: "addBlock",
            blockXml: `<block type="math_number" id="java_num_tax"><field name="NUM">1.18</field></block>`
          },
          {
            type: "connect",
            childBlockId: "java_get_price",
            parentBlockId: "java_math_mult",
            connectionName: "A"
          },
          {
            type: "connect",
            childBlockId: "java_num_tax",
            parentBlockId: "java_math_mult",
            connectionName: "B"
          },
          {
            type: "connect",
            childBlockId: "java_math_mult",
            parentBlockId: "java_print_total",
            connectionName: "TEXT"
          },
          {
            type: "connect",
            childBlockId: "java_print_total",
            parentBlockId: "java_set_price",
            connectionName: "NEXT"
          }
        ]
      }
    ],
    summary: {
      text: "Great work! You have learned how Java computes arithmetic on variables."
    }
  }
];

export const TUTORIALS_BY_LANGUAGE = {
  python: PYTHON_TUTORIALS,
  javascript: JAVASCRIPT_TUTORIALS,
  java: JAVA_TUTORIALS
};

/**
 * Returns tutorials list for the active language.
 * @param {string} language - 'python' | 'javascript' | 'java'
 * @returns {Array} List of tutorial objects
 */
export function getTutorialsForLanguage(language = 'python') {
  const normalized = (language || 'python').toLowerCase();
  return TUTORIALS_BY_LANGUAGE[normalized] || PYTHON_TUTORIALS;
}
