// src/utils/javaRunner.js

/**
 * Advanced Client-Side Java Transpiler & Execution Engine.
 * Transpiles generated Java code into executable JavaScript, capturing console output
 * (System.out.println/print/printf), evaluating all arithmetic/logical operators,
 * control structures (if/else, for, foreach, while, do-while), native arrays, ArrayList,
 * HashMap, HashSet, OOP Classes/Methods, and Math utilities cleanly.
 */

export function executeJavaCode(code) {
  const outputLines = [];

  try {
    if (!code || typeof code !== 'string' || !code.trim()) {
      return { output: 'No code provided for Java execution.', status: 'error' };
    }

    // Standard Mock System I/O Console Object
    const System = {
      out: {
        println: (...args) => {
          outputLines.push(args.map(a => a === undefined || a === null ? 'null' : (typeof a === 'object' && a.toString ? a.toString() : String(a))).join(' '));
        },
        print: (...args) => {
          const str = args.map(a => a === undefined || a === null ? 'null' : (typeof a === 'object' && a.toString ? a.toString() : String(a))).join(' ');
          if (outputLines.length > 0) {
            outputLines[outputLines.length - 1] += str;
          } else {
            outputLines.push(str);
          }
        },
        printf: (fmt, ...args) => {
          let str = String(fmt || '');
          args.forEach(arg => {
            str = str.replace(/%[s|d|f|n|b]/, String(arg));
          });
          outputLines.push(str);
        }
      },
      err: {
        println: (...args) => {
          outputLines.push('[ERROR] ' + args.join(' '));
        }
      }
    };

    // Standard Mock Scanner Class
    class Scanner {
      constructor(src) {}
      nextLine() { return "InputLine"; }
      nextInt() { return 0; }
      nextDouble() { return 0.0; }
      nextBoolean() { return true; }
      next() { return "Token"; }
    }

    // Java Collection Adaptors
    class ArrayList extends Array {
      constructor(initialArray) {
        super();
        if (Array.isArray(initialArray)) {
          this.push(...initialArray);
        }
      }
      add(item, idx) {
        if (idx !== undefined && typeof item === 'number') {
          this.splice(item, 0, idx);
        } else {
          this.push(item);
        }
        return true;
      }
      get(index) { return this[index]; }
      set(index, item) { this[index] = item; return item; }
      size() { return this.length; }
      contains(item) { return this.includes(item); }
      indexOf(item) { return super.indexOf(item); }
      remove(itemOrIndex) {
        if (typeof itemOrIndex === 'number' && itemOrIndex < this.length) {
          return this.splice(itemOrIndex, 1)[0];
        }
        const idx = this.indexOf(itemOrIndex);
        if (idx !== -1) {
          this.splice(idx, 1);
          return true;
        }
        return false;
      }
      clear() { this.length = 0; }
      toString() {
        return `[${this.map(i => (i === null || i === undefined ? 'null' : String(i))).join(', ')}]`;
      }
    }

    class HashMap extends Map {
      put(key, value) { this.set(key, value); return value; }
      size() { return this.size; }
      containsKey(key) { return this.has(key); }
      containsValue(val) { return Array.from(this.values()).includes(val); }
      keySet() { return new ArrayList(Array.from(this.keys())); }
      values() { return new ArrayList(Array.from(this.values())); }
      putAll(otherMap) {
        if (otherMap && otherMap.forEach) {
          otherMap.forEach((v, k) => this.set(k, v));
        }
      }
      toString() {
        const pairs = [];
        this.forEach((v, k) => pairs.push(`${k}=${v}`));
        return `{${pairs.join(', ')}}`;
      }
    }

    class HashSet extends Set {
      constructor(initialCollection) {
        super();
        if (Array.isArray(initialCollection)) {
          initialCollection.forEach(item => this.add(item));
        }
      }
      add(item) { super.add(item); return true; }
      contains(item) { return this.has(item); }
      remove(item) { return this.delete(item); }
      size() { return this.size; }
      toString() {
        return `[${Array.from(this).join(', ')}]`;
      }
    }

    // Helper Map.of
    const MapHelper = {
      of: (...args) => {
        const m = new HashMap();
        for (let i = 0; i < args.length; i += 2) {
          if (i + 1 < args.length) {
            m.put(args[i], args[i + 1]);
          }
        }
        return m;
      }
    };

    // Helper Arrays utilities
    const Arrays = {
      asList: (...elements) => new ArrayList(elements),
      stream: (arr) => ({
        map: (fn) => ({
          collect: () => arr.map(fn)
        })
      })
    };

    // Helper Collectors
    const Collectors = {
      joining: (delim = "") => (arr) => arr.join(delim),
      toList: () => (arr) => new ArrayList(arr)
    };

    // Helper IntStream
    const IntStream = {
      rangeClosed: (start, end) => ({
        filter: (fn) => ({
          boxed: () => ({
            collect: () => {
              const res = [];
              for (let i = start; i <= end; i++) {
                if (fn(i)) res.push(i);
              }
              return new ArrayList(res);
            }
          })
        })
      })
    };

    // Random generator
    class Random {
      nextInt(max) {
        if (max === undefined) return Math.floor(Math.random() * 2147483647);
        return Math.floor(Math.random() * max);
      }
      nextDouble() { return Math.random(); }
    }

    // Transpile Java code into executable JavaScript code
    const transpileJavaToJS = (javaCode) => {
      let js = javaCode;

      // 1. Strip package/import statements
      js = js.replace(/^(?:\s*)import\s+[^;]+;/gm, '');
      js = js.replace(/^(?:\s*)package\s+[^;]+;/gm, '');

      // 2. Remove generic type parameters <...> in new instantiations and declarations
      js = js.replace(/new\s+([a-zA-Z0-9_.]+)\s*<[^>]*>/g, 'new $1');
      js = js.replace(/Map\.of/g, 'MapHelper.of');

      // 3. Extract main method statements using exact brace matching
      let mainStatements = '';
      const mainHeaderMatch = js.match(/public\s+static\s+void\s+main\s*\(\s*String\s*\[\s*\]\s*\w*\s*\)\s*\{/);
      if (mainHeaderMatch) {
        const headerIndex = js.indexOf(mainHeaderMatch[0]);
        const startBraceIndex = headerIndex + mainHeaderMatch[0].length - 1;
        let depth = 1;
        let endBraceIndex = -1;
        for (let i = startBraceIndex + 1; i < js.length; i++) {
          if (js[i] === '{') depth++;
          else if (js[i] === '}') {
            depth--;
            if (depth === 0) {
              endBraceIndex = i;
              break;
            }
          }
        }
        if (endBraceIndex !== -1) {
          mainStatements = js.slice(startBraceIndex + 1, endBraceIndex);
          js = js.slice(0, headerIndex) + js.slice(endBraceIndex + 1);
        }
      }

      // 4. Remove Main class wrapper: `public class Main {` ... `}`
      const mainClassHeaderMatch = js.match(/(?:public\s+)?class\s+Main\s*\{/);
      if (mainClassHeaderMatch) {
        const classHeaderIdx = js.indexOf(mainClassHeaderMatch[0]);
        const startBraceIdx = classHeaderIdx + mainClassHeaderMatch[0].length - 1;
        let depth = 1;
        let endBraceIdx = -1;
        for (let i = startBraceIdx + 1; i < js.length; i++) {
          if (js[i] === '{') depth++;
          else if (js[i] === '}') {
            depth--;
            if (depth === 0) {
              endBraceIdx = i;
              break;
            }
          }
        }
        if (endBraceIdx !== -1) {
          const classInner = js.slice(startBraceIdx + 1, endBraceIdx);
          js = js.slice(0, classHeaderIdx) + classInner + js.slice(endBraceIdx + 1);
        }
      }

      // 5. Convert outer classes: `public class Calculator` -> `class Calculator`
      js = js.replace(/public\s+class\s+([a-zA-Z_]\w*)/g, 'class $1');

      // 6. Convert standalone top-level methods: `public static int myMethod(int x)` -> `function myMethod(x)`
      js = js.replace(/(?:public|private|protected|static|\s)+(?:[\w<>\[\]]+\s+)+([a-zA-Z_]\w*)\s*\(([^)]*)\)\s*\{/g, (match, mName, params) => {
        if (['if', 'while', 'for', 'switch', 'catch', 'class', 'function'].includes(mName)) return match;
        const cleanParams = params.split(',').map(p => p.trim().split(/\s+/).pop()).filter(Boolean).join(', ');
        return `function ${mName}(${cleanParams}) {`;
      });

      // 7. Convert methods inside outer classes: inside `class ClassName { ... }`, convert `function methodName(...)` back to `methodName(...)`, and constructors to constructor(...)
      js = js.replace(/(class\s+([a-zA-Z_]\w*)[\s\S]*?\{)([\s\S]*?)(\}\s*$|\}\s*(?=class|function))/g, (match, classHead, className, classBody, classFoot) => {
        let cleanBody = classBody.replace(/function\s+([a-zA-Z_]\w*)\s*\(([^)]*)\)\s*\{/g, (m, mName, params) => {
          if (mName === className) return `constructor(${params}) {`;
          return `${mName}(${params}) {`;
        });
        cleanBody = cleanBody.replace(new RegExp(`(?:public|private|protected|static|\\s)*${className}\\s*\\(([^)]*)\\)\\s*\\{`, 'g'), 'constructor($1) {');
        return `${classHead}${cleanBody}${classFoot}`;
      });

      // Append main body statements at the bottom of JS script
      js = js + '\n' + mainStatements;

      // 8. Convert Java enhanced foreach loop FIRST: `for (var item : list)` / `for (String item : list)` -> `for (let item of list)`
      js = js.replace(/for\s*\(\s*(?:var|int|double|float|long|short|byte|boolean|char|String|Object|[a-zA-Z_]\w*)\s+([a-zA-Z_]\w*)\s*:\s*([^)]+)\)/g, 'for (let $1 of $2)');

      // 9. Convert Java index-based for loop type FIRST: `for (int i = 0; ...)` -> `for (let i = 0; ...)`
      js = js.replace(/for\s*\(\s*(?:int|double|float|long|var)\s+([a-zA-Z_]\w*)\s*=/g, 'for (let $1 =');

      // 10. Convert Java variable declarations: `int x;`, `var a;`, `String s = "val";`, `Calculator calc = ...;`
      js = js.replace(/^(?:\s*)(?:var|int|double|float|long|short|byte|boolean|char|String|Object|ArrayList|HashMap|HashSet|List|Map|Set|[A-Z]\w*)(?:<[^>]+>)?\s+([a-zA-Z_]\w*)\s*;/gm, (match, vName) => {
        if (['return', 'if', 'while', 'for', 'let', 'const', 'var', 'function', 'class', 'switch', 'break', 'continue'].includes(vName)) return match;
        return `let ${vName};`;
      });
      js = js.replace(/^(?:\s*)(?:var|int|double|float|long|short|byte|boolean|char|String|Object|ArrayList|HashMap|HashSet|List|Map|Set|[A-Z]\w*)(?:<[^>]+>)?\s+([a-zA-Z_]\w*)\s*=/gm, (match, vName) => {
        if (['return', 'if', 'while', 'for', 'let', 'const', 'var', 'function', 'class', 'switch', 'break', 'continue'].includes(vName)) return match;
        return `let ${vName} =`;
      });

      // Convert Java native array creation: `new int[10]` -> `new Array(10).fill(0)`
      js = js.replace(/new\s+(?:int|double|float|long|short|byte|boolean|char|String)\[([^\]]+)\]/g, 'new Array($1).fill(0)');

      // Convert Java type casting: `(int) x` -> `Math.floor(x)`
      js = js.replace(/\((?:int|long|short|byte)\)\s*([a-zA-Z0-9_.()]+)/g, 'Math.floor($1)');
      js = js.replace(/\((?:double|float)\)\s*([a-zA-Z0-9_.()]+)/g, 'Number($1)');

      return js;
    };

    const jsCode = transpileJavaToJS(code);

    // Create execution scope function
    const runner = new Function(
      'System', 'Scanner', 'ArrayList', 'HashMap', 'HashSet', 'Arrays', 'Collectors', 'IntStream', 'Random', 'MapHelper',
      jsCode
    );

    // Execute in sandboxed runtime
    runner(System, Scanner, ArrayList, HashMap, HashSet, Arrays, Collectors, IntStream, Random, MapHelper);

    if (outputLines.length === 0) {
      outputLines.push('Program executed successfully with no output.');
    }

    return {
      output: outputLines.map(l => String(l).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')).join('<br>'),
      status: 'success'
    };
  } catch (err) {
    return {
      output: `Java Execution Exception: ${err.message}`,
      status: 'error'
    };
  }
}
