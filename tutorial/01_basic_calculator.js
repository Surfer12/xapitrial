// A simple calculator with basic operations
function calculate(num1, num2, operation) {
    if (operation == '+') return num1 + num2;
    if (operation == '-') return num1 - num2;
    if (operation == '*') return num1 * num2;
    if (operation == '/') return num1 / num2;
    return 'Invalid operation';
}
