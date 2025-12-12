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


export const TEMPLATES = [
  {
    id: "rocket-launch-height",
    title: "Rocket Launch Height",
    description: "Calculate a rocket's height over time using functions, loops, and arithmetic.",
    difficulty: "Intermediate",
    estimatedTime: "10 min",
    workspaceXml: ROCKET_LAUNCH_XML,
    tags: ["functions", "loops", "math"]
  },
  {
    id: "aquarium-ecosystem",
    title: "Aquarium Ecosystem",
    description: "Simulate a simple aquarium ecosystem to track waste levels over time.",
    difficulty: "Beginner",
    estimatedTime: "15 min",
    workspaceXml: AQUARIUM_ECOSYSTEM_XML,
    tags: ["simulation", "biology", "logic"]
  },
  {
    id: "digestive-path",
    title: "Digestive Path",
    description: "Trace the path of food through the human digestive system using a list.",
    difficulty: "Beginner",
    estimatedTime: "10 min",
    workspaceXml: DIGESTIVE_PATH_XML,
    tags: ["biology", "lists", "loops"]
  },
  {
    id: "dna-copying-simulator",
    title: "DNA Copying Simulator",
    description: "Simulate the process of DNA replication by creating a complementary strand.",
    difficulty: "Intermediate",
    estimatedTime: "15 min",
    workspaceXml: DNA_COPYING_SIMULATOR_XML,
    tags: ["biology", "logic", "strings"]
  },
  {
    id: "ropeway-ride",
    title: "Ropeway Ride",
    description: "Calculate the work done and power required for a ropeway ride.",
    difficulty: "Intermediate",
    estimatedTime: "10 min",
    workspaceXml: ROPEWAY_RIDE_XML,
    tags: ["physics", "math"]
  },
  {
    id: "hydrogen-fuel-cell",
    title: "Hydrogen Fuel Cell Production",
    description: "Calculate the moles of hydrogen gas produced in a fuel cell.",
    difficulty: "Advanced",
    estimatedTime: "15 min",
    workspaceXml: HYDROGEN_FUEL_CELL_XML,
    tags: ["chemistry", "math", "functions"]
  },
  {
    id: "exothermic-reaction",
    title: "Exothermic Reaction Temperature Tracker",
    description: "Calculate the final temperature of water after an exothermic reaction.",
    difficulty: "Advanced",
    estimatedTime: "15 min",
    workspaceXml: EXOTHERMIC_REACTION_XML,
    tags: ["chemistry", "math", "functions"]
  },
  {
    id: "guitar-string-vibration",
    title: "Guitar String Vibration",
    description: "Calculate the wave speed and harmonic frequencies of a guitar string.",
    difficulty: "Advanced",
    estimatedTime: "15 min",
    workspaceXml: GUITAR_STRING_XML,
    tags: ["physics", "math", "loops"]
  },
  {
    id: "treasure-coordinates",
    title: "Treasure Coordinates",
    description: "Calculate the principal value of sec⁻¹(2/√3) and handle domain errors.",
    difficulty: "Intermediate",
    estimatedTime: "10 min",
    workspaceXml: TREASURE_COORDINATES_XML,
    tags: ["trigonometry", "math", "logic"]
  },
  {
    id: "speedy-science",
    title: "Speedy Science – Motion Tracker",
    description: "Calculate speed while handling potential user input errors like text or zero.",
    difficulty: "Beginner",
    estimatedTime: "12 min",
    workspaceXml: SPEEDY_SCIENCE_XML,
    tags: ["physics", "error-handling", "input"]
  },
  {
    id: "magic-square-detective",
    title: "Magic Square Detective",
    description: "Determine if a 3x3 grid of numbers is a magic square using list manipulation.",
    difficulty: "Advanced",
    estimatedTime: "20 min",
    workspaceXml: MAGIC_SQUARE_DETECTIVE_XML,
    tags: ["logic", "lists", "math", "sets"]
  },
  {
    id: "robot-arm-simulation",
    title: "Robot Arm Simulation",
    description: "Teach domain validation in a robotics context.",
    difficulty: "Intermediate",
    estimatedTime: "10 min",
    workspaceXml: PROJECT12_ROBOT_ARM_XML,
    tags: ["robotics", "math", "logic"]
  },
  {
    id: "binary-whisper",
    title: "The Binary Whisper of HELLO",
    description: "Convert human-readable text into its binary representation.",
    difficulty: "Beginner",
    estimatedTime: "10 min",
    workspaceXml: PROJECT13_BINARY_WHISPER_XML,
    tags: ["text", "binary", "conversion"]
  },
  {
    id: "tuple-tracker-pro",
    title: "Tuple Tracker Pro",
    description: "Use immutable tuples for secure data analysis.",
    difficulty: "Intermediate",
    estimatedTime: "15 min",
    workspaceXml: PROJECT14_TUPLE_TRACKER_XML,
    tags: ["tuples", "data-analysis", "functions"]
  },
  {
    id: "rule-maker-simulator",
    title: "Rule Maker Simulator",
    description: "Simulate democratic rule creation using Python lists.",
    difficulty: "Beginner",
    estimatedTime: "10 min",
    workspaceXml: PROJECT15_RULE_MAKER_XML,
    tags: ["lists", "loops", "input"]
  },
  {
    id: "election-vote-counter",
    title: "Election Vote Counter",
    description: "Use Python dictionaries to tally and display election results.",
    difficulty: "Intermediate",
    estimatedTime: "15 min",
    workspaceXml: PROJECT16_VOTE_COUNTER_XML,
    tags: ["dictionaries", "loops", "input"]
  },
  {
    id: "river-journey-simulator",
    title: "River Journey Simulator",
    description: "Model a sequential journey using a Python list and a for loop.",
    difficulty: "Beginner",
    estimatedTime: "5 min",
    workspaceXml: PROJECT17_RIVER_JOURNEY_XML,
    tags: ["lists", "loops"]
  },
  {
    id: "weather-detectives",
    title: "Weather Detectives",
    description: "Explore the difference between weather and climate using data analysis.",
    difficulty: "Beginner",
    estimatedTime: "5 min",
    workspaceXml: PROJECT18_WEATHER_DETECTIVES_XML,
    tags: ["lists", "math", "data-analysis"]
  },
  {
    id: "festival-discount-calculator",
    title: "Festival Discount Calculator",
    description: "Use functions and conditional logic to build a dynamic pricing tool.",
    difficulty: "Intermediate",
    estimatedTime: "15 min",
    workspaceXml: PROJECT19_FESTIVAL_DISCOUNT_XML,
    tags: ["functions", "logic", "error-handling"]
  },
  {
    id: "smart-city-alert-system",
    title: "Smart City Alert System",
    description: "Use functions and data visualization to model an IoT-based traffic monitoring system.",
    difficulty: "Advanced",
    estimatedTime: "20 min",
    workspaceXml: PROJECT20_SMART_CITY_ALERT_XML,
    tags: ["data-visualization", "matplotlib"]
  }
];
