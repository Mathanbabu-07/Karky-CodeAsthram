import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { initializeAllModules } from "./modules/initializer.js";
import { initTheme } from './utils/theme.js';

// This single call will handle the registration of all blocks and generators
// for all modules, and it will only run once.
initializeAllModules();
initTheme();

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
