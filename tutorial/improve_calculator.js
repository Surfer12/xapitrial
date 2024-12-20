// This is a beginner-friendly tutorial on using AI to improve code
const XAIApi = require('../XAIAPI');
const AIDevAssistant = require('../practical_examples').AIDevAssistant;

// Step 1: Let's create our AI assistant
const assistant = new AIDevAssistant('your-api-key');

// This is our original calculator code
const originalCode = `
function calculate(num1, num2, operation) {
    if(operation == '+') return num1 + num2;
    if(operation == '-') return num1 - num2;
    if(operation == '*') return num1 * num2;
    if(operation == '/') return num1 / num2;
    return 'Invalid operation';
}`;

// Step 2: Let's improve our code step by step
async function improveCalculator() {
    console.log('🚀 Starting the AI-assisted code improvement process...\n');

    // Step 2.1: First, let's check for potential bugs
    console.log('🔍 Step 1: Checking for potential issues...');
    try {
        const bugs = await assistant.findBugs(originalCode);
        console.log('\nPotential issues found:');
        console.log(bugs);
        console.log('\n' + '='.repeat(50) + '\n');
    } catch (error) {
        console.error('Error finding bugs:', error);
    }

    // Step 2.2: Let's get some suggestions for improvement
    console.log('💡 Step 2: Getting improvement suggestions...');
    try {
        const improvements = await assistant.suggestRefactoring(originalCode);
        console.log('\nSuggested improvements:');
        console.log(improvements);
        console.log('\n' + '='.repeat(50) + '\n');
    } catch (error) {
        console.error('Error getting improvements:', error);
    }

    // Step 2.3: Let's add proper documentation
    console.log('📝 Step 3: Generating documentation...');
    try {
        const docs = await assistant.generateDocumentation(originalCode);
        console.log('\nGenerated documentation:');
        console.log(docs);
        console.log('\n' + '='.repeat(50) + '\n');
    } catch (error) {
        console.error('Error generating documentation:', error);
    }

    // Step 2.4: Let's create some test cases
    console.log('🧪 Step 4: Creating test cases...');
    try {
        const tests = await assistant.generateTests(originalCode);
        console.log('\nGenerated test cases:');
        console.log(tests);
        console.log('\n' + '='.repeat(50) + '\n');
    } catch (error) {
        console.error('Error generating tests:', error);
    }

    // Step 3: Let's see how we can improve our code based on all this feedback
    console.log('✨ Creating improved version of the calculator...\n');

    const improvedCode = `
    /**
     * A Calculator class with improved error handling and validation
     */
    class Calculator {
        /**
         * Performs basic arithmetic operations
         * @param {number} num1 - First number
         * @param {number} num2 - Second number
         * @param {string} operation - Operation to perform (+, -, *, /)
         * @returns {number|string} Result of the operation or error message
         * @throws {Error} If inputs are invalid
         */
        calculate(num1, num2, operation) {
            // Input validation
            if (typeof num1 !== 'number' || typeof num2 !== 'number') {
                throw new Error('Both inputs must be numbers');
            }

            // Convert operation to string and trim whitespace
            operation = String(operation).trim();

            // Check for valid operation
            const validOperations = ['+', '-', '*', '/'];
            if (!validOperations.includes(operation)) {
                throw new Error('Invalid operation. Use: +, -, *, /');
            }

            // Check for division by zero
            if (operation === '/' && num2 === 0) {
                throw new Error('Division by zero is not allowed');
            }

            // Perform calculation
            switch (operation) {
                case '+': return num1 + num2;
                case '-': return num1 - num2;
                case '*': return num1 * num2;
                case '/': return num1 / num2;
                default: return 'Invalid operation';
            }
        }

        /**
         * Formats the result to a specified number of decimal places
         * @param {number} result - The calculation result
         * @param {number} [decimals=2] - Number of decimal places
         * @returns {number} Formatted result
         */
        formatResult(result, decimals = 2) {
            return Number(result.toFixed(decimals));
        }
    }

    module.exports = new Calculator();
    `;

    console.log('Improved Calculator Code:');
    console.log(improvedCode);

    // Step 4: Let's create a simple example of how to use the improved calculator
    console.log('\n📚 Example Usage:');
    const usageExample = `
    const calculator = require('./calculator');

    try {
        // Basic calculations
        console.log(calculator.calculate(5, 3, '+')); // Output: 8
        console.log(calculator.calculate(10, 2, '/')); // Output: 5

        // With result formatting
        const result = calculator.calculate(10, 3, '/');
        console.log(calculator.formatResult(result, 2)); // Output: 3.33

    } catch (error) {
        console.error('Calculation error:', error.message);
    }
    `;
    console.log(usageExample);
}

// Run our improvement process
console.log('Welcome to the AI-Assisted Code Improvement Tutorial! 🎉\n');
console.log('This tutorial will show you how AI can help improve your code.\n');
console.log('Press any key to start...');

// Wait for user input before starting
process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.on('data', () => {
    process.stdin.setRawMode(false);
    process.stdin.pause();
    improveCalculator().catch(console.error);
});
