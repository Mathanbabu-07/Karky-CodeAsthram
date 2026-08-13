import { executeJavaCode } from '../src/utils/javaRunner.js';

console.log('=== TEST 1: User Photo 3 & 4 Subtraction ===');
const codeSub = `public class Main {
    public static void main(String[] args) {
        var a;
        a = 10;
        System.out.println(a - 0);
    }
}`;
console.log('Output 1:', executeJavaCode(codeSub).output);

console.log('\n=== TEST 2: All Arithmetic Operators ===');
const codeOps = `public class Main {
    public static void main(String[] args) {
        int x = 20;
        int y = 5;
        System.out.println("Add: " + (x + y));
        System.out.println("Sub: " + (x - y));
        System.out.println("Mul: " + (x * y));
        System.out.println("Div: " + (x / y));
        System.out.println("Mod: " + (x % 3));
    }
}`;
console.log('Output 2:\n' + executeJavaCode(codeOps).output.replace(/<br>/g, '\n'));

console.log('\n=== TEST 3: Decision Making (If / Else) ===');
const codeIf = `public class Main {
    public static void main(String[] args) {
        int score = 85;
        if (score >= 90) {
            System.out.println("Grade: A");
        } else if (score >= 80) {
            System.out.println("Grade: B");
        } else {
            System.out.println("Grade: C");
        }
    }
}`;
console.log('Output 3:\n' + executeJavaCode(codeIf).output.replace(/<br>/g, '\n'));

console.log('\n=== TEST 4: Control Structure Loops ===');
const codeLoop = `public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 3; i++) {
            System.out.println("Loop iteration: " + i);
        }
    }
}`;
console.log('Output 4:\n' + executeJavaCode(codeLoop).output.replace(/<br>/g, '\n'));

console.log('\n=== TEST 5: ArrayList & Enhanced Foreach ===');
const codeList = `public class Main {
    public static void main(String[] args) {
        ArrayList list = new ArrayList();
        list.add("Java");
        list.add("Python");
        list.add("C++");
        for (var item : list) {
            System.out.println("Language: " + item);
        }
    }
}`;
console.log('Output 5:\n' + executeJavaCode(codeList).output.replace(/<br>/g, '\n'));

console.log('\n=== TEST 6: HashMap Key-Value Storage ===');
const codeMap = `public class Main {
    public static void main(String[] args) {
        HashMap map = new HashMap();
        map.put("key1", 100);
        map.put("key2", 200);
        System.out.println("key1 value: " + map.get("key1"));
    }
}`;
console.log('Output 6:\n' + executeJavaCode(codeMap).output.replace(/<br>/g, '\n'));
