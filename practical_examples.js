const XAIApi = require('./XAIAPI');

class AIDevAssistant {
    constructor(apiKey) {
        this.xai = new XAIApi(apiKey);
        this.defaultModel = 'grok-2-mini'; // or your preferred model
    }

    /**
     * Code Documentation Generator
     * Generates comprehensive documentation for code
     */
    async generateDocumentation(code) {
        try {
            const response = await this.xai.createChatCompletion({
                messages: [
                    {
                        role: 'system',
                        content: 'You are a technical documentation expert. Generate comprehensive JSDoc documentation for the provided code.'
                    },
                    {
                        role: 'user',
                        content: `Please document this code:\n\n${code}`
                    }
                ],
                model: this.defaultModel,
                temperature: 0.3 // Lower temperature for more consistent documentation
            });

            return response.choices[0].message.content;
        } catch (error) {
            console.error('Documentation Generation Error:', error);
            throw error;
        }
    }

    /**
     * Code Review Assistant
     * Reviews code and suggests improvements
     */
    async reviewCode(code) {
        try {
            const response = await this.xai.createChatCompletion({
                messages: [
                    {
                        role: 'system',
                        content: 'You are an expert code reviewer. Analyze the code for potential issues, best practices, and suggest improvements.'
                    },
                    {
                        role: 'user',
                        content: `Review this code:\n\n${code}`
                    }
                ],
                model: this.defaultModel,
                temperature: 0.7
            });

            return response.choices[0].message.content;
        } catch (error) {
            console.error('Code Review Error:', error);
            throw error;
        }
    }

    /**
     * Test Case Generator
     * Generates test cases for given code
     */
    async generateTests(code) {
        try {
            const response = await this.xai.createChatCompletion({
                messages: [
                    {
                        role: 'system',
                        content: 'You are a testing expert. Generate comprehensive test cases including edge cases.'
                    },
                    {
                        role: 'user',
                        content: `Generate test cases for this code:\n\n${code}`
                    }
                ],
                model: this.defaultModel,
                temperature: 0.5
            });

            return response.choices[0].message.content;
        } catch (error) {
            console.error('Test Generation Error:', error);
            throw error;
        }
    }

    /**
     * Code Refactoring Assistant
     * Suggests refactoring improvements
     */
    async suggestRefactoring(code) {
        try {
            const response = await this.xai.createChatCompletion({
                messages: [
                    {
                        role: 'system',
                        content: 'You are a refactoring expert. Suggest improvements to make the code more maintainable, efficient, and follow best practices.'
                    },
                    {
                        role: 'user',
                        content: `Suggest refactoring for this code:\n\n${code}`
                    }
                ],
                model: this.defaultModel,
                temperature: 0.6
            });

            return response.choices[0].message.content;
        } catch (error) {
            console.error('Refactoring Suggestion Error:', error);
            throw error;
        }
    }

    /**
     * Bug Finder
     * Analyzes code for potential bugs
     */
    async findBugs(code) {
        try {
            const response = await this.xai.createChatCompletion({
                messages: [
                    {
                        role: 'system',
                        content: 'You are a debugging expert. Analyze the code for potential bugs, security issues, and runtime problems.'
                    },
                    {
                        role: 'user',
                        content: `Find potential bugs in this code:\n\n${code}`
                    }
                ],
                model: this.defaultModel,
                temperature: 0.4
            });

            return response.choices[0].message.content;
        } catch (error) {
            console.error('Bug Finding Error:', error);
            throw error;
        }
    }
}

// Practical usage examples
async function demonstratePracticalUsage() {
    const assistant = new AIDevAssistant('your-api-key');

    // Example code to analyze
    const sampleCode = `
    function calculateTotal(items) {
        let total = 0;
        for(let i = 0; i < items.length; i++) {
            total += items[i].price * items[i].quantity;
        }
        return total;
    }
    `;

    console.log('\n=== Documentation Generation ===');
    try {
        const docs = await assistant.generateDocumentation(sampleCode);
        console.log('Generated Documentation:', docs);
    } catch (error) {
        console.error('Documentation Error:', error.message);
    }

    console.log('\n=== Code Review ===');
    try {
        const review = await assistant.reviewCode(sampleCode);
        console.log('Code Review Results:', review);
    } catch (error) {
        console.error('Review Error:', error.message);
    }

    console.log('\n=== Test Case Generation ===');
    try {
        const tests = await assistant.generateTests(sampleCode);
        console.log('Generated Test Cases:', tests);
    } catch (error) {
        console.error('Test Generation Error:', error.message);
    }

    console.log('\n=== Refactoring Suggestions ===');
    try {
        const refactoring = await assistant.suggestRefactoring(sampleCode);
        console.log('Refactoring Suggestions:', refactoring);
    } catch (error) {
        console.error('Refactoring Error:', error.message);
    }

    console.log('\n=== Bug Finding ===');
    try {
        const bugs = await assistant.findBugs(sampleCode);
        console.log('Potential Bugs Found:', bugs);
    } catch (error) {
        console.error('Bug Finding Error:', error.message);
    }
}

// Interactive example with Cursor IDE integration
async function cursorIDEExample() {
    const assistant = new AIDevAssistant('your-api-key');

    // Example: Improving code in the current editor
    async function improveCurrentCode(code) {
        console.log('\n=== Cursor IDE Integration Example ===');

        // 1. Generate documentation
        const docs = await assistant.generateDocumentation(code);
        console.log('Adding documentation to your code...');

        // 2. Find potential issues
        const issues = await assistant.findBugs(code);
        console.log('Analyzing for potential issues...');

        // 3. Suggest improvements
        const improvements = await assistant.suggestRefactoring(code);
        console.log('Suggesting improvements...');

        return {
            documentation: docs,
            issues,
            improvements
        };
    }

    // Example usage with a code snippet
    const currentCode = `
    function processUserData(data) {
        if(data.name != null) {
            let userInfo = {};
            userInfo.name = data.name;
            userInfo.age = data.age;
            return userInfo;
        }
    }
    `;

    const improvements = await improveCurrentCode(currentCode);
    console.log('\nAnalysis Results:');
    console.log('Documentation:', improvements.documentation);
    console.log('Issues Found:', improvements.issues);
    console.log('Suggested Improvements:', improvements.improvements);
}

// Run the demonstrations
async function runAll() {
    await demonstratePracticalUsage();
    await cursorIDEExample();
}

runAll().catch(console.error);
