I'll show you comprehensive examples of how to use each function in the `XAIApi` class with expected responses and use cases.

```javascript:examples.js
const XAIApi = require('./XAIAPI');

// Initialize the API client
const xai = new XAIApi('your-api-key', {
    timeout: 60000, // 60 seconds timeout
    endpoint: 'https://api.x.ai/v1'
});

async function demonstrateChat() {
    console.log('\n=== Chat Completion Example ===');
    try {
        const chatResponse = await xai.createChatCompletion({
            messages: [
                { role: 'system', content: 'You are a helpful coding assistant.' },
                { role: 'user', content: 'Write a simple function to calculate fibonacci numbers.' }
            ],
            model: 'grok-2-mini',
            temperature: 0.7,
            max_tokens: 500
        });

        console.log('Chat Response:', chatResponse);
        // Expected output:
        // {
        //     id: 'chat-xxx',
        //     object: 'chat.completion',
        //     created: 1234567890,
        //     model: 'grok-2-mini',
        //     choices: [{
        //         index: 0,
        //         message: {
        //             role: 'assistant',
        //             content: 'Here\'s a simple function...'
        //         },
        //         finish_reason: 'stop'
        //     }]
        // }
    } catch (error) {
        console.error('Chat Error:', error.message);
    }
}

async function demonstrateCompletion() {
    console.log('\n=== Text Completion Example ===');
    try {
        const completionResponse = await xai.createCompletion({
            prompt: 'Write a haiku about coding:',
            model: 'grok-2-mini',
            max_tokens: 50,
            temperature: 0.9
        });

        console.log('Completion Response:', completionResponse);
        // Expected output:
        // {
        //     id: 'cmpl-xxx',
        //     object: 'text_completion',
        //     created: 1234567890,
        //     model: 'grok-2-mini',
        //     choices: [{
        //         text: 'Fingers on keyboard\nCode flows like gentle river\nBugs everywhere\n',
        //         index: 0,
        //         finish_reason: 'stop'
        //     }]
        // }
    } catch (error) {
        console.error('Completion Error:', error.message);
    }
}

async function demonstrateEmbeddings() {
    console.log('\n=== Embeddings Example ===');
    try {
        const embeddingResponse = await xai.createEmbedding({
            input: ['The quick brown fox jumps over the lazy dog'],
            model: 'v1',
            encoding_format: 'float'
        });

        console.log('Embedding Response:', embeddingResponse);
        // Expected output:
        // {
        //     object: 'list',
        //     data: [{
        //         object: 'embedding',
        //         embedding: [0.123, 0.456, ...], // Vector of floats
        //         index: 0
        //     }],
        //     model: 'v1'
        // }
    } catch (error) {
        console.error('Embedding Error:', error.message);
    }
}

async function demonstrateImageGeneration() {
    console.log('\n=== Image Generation Example ===');
    try {
        const imageResponse = await xai.createImage({
            prompt: 'A futuristic city with flying cars',
            model: 'aurora',
            size: '1024x1024',
            style: 'vivid'
        });

        console.log('Image Response:', imageResponse);
        // Expected output:
        // {
        //     data: [{
        //         base64: 'base64_encoded_image_data...'
        //         // or url: 'https://...' depending on response_format
        //     }]
        // }
    } catch (error) {
        console.error('Image Generation Error:', error.message);
    }
}

async function demonstrateImageEditing() {
    console.log('\n=== Image Editing Example ===');
    try {
        const editResponse = await xai.editImage({
            image: { url: 'https://example.com/original-image.jpg' },
            prompt: 'Add a red hat to the person',
            mask: { url: 'https://example.com/mask.jpg' } // Optional
        });

        console.log('Edit Response:', editResponse);
        // Expected output similar to createImage
    } catch (error) {
        console.error('Image Edit Error:', error.message);
    }
}

async function demonstrateCodeEditing() {
    console.log('\n=== Code Editing Example ===');
    try {
        const code = `
function greet(name) {
    console.log('Hello ' + name);
}`;

        const editResponse = await xai.codeEdit(
            code,
            'Convert to template literals and add a return statement'
        );

        console.log('Code Edit Response:', editResponse);
        // Expected output:
        // {
        //     edit_id: 'edit-xxx',
        //     edited_code: `
        //         function greet(name) {
        //             return \`Hello \${name}\`;
        //         }`
        // }

        // Apply the edit
        if (editResponse.edit_id) {
            const appliedEdit = await xai.applyEdit(editResponse.edit_id);
            console.log('Applied Edit Response:', appliedEdit);
        }
    } catch (error) {
        console.error('Code Edit Error:', error.message);
    }
}

async function demonstrateModelManagement() {
    console.log('\n=== Model Management Examples ===');
    try {
        // List all models
        const models = await xai.listModels();
        console.log('Available Models:', models);
        // Expected output:
        // {
        //     data: [{
        //         id: 'grok-beta',
        //         created: 1234567890,
        //         object: 'model',
        //         owned_by: 'xai'
        //     }, ...]
        // }

        // Get specific model details
        const modelDetails = await xai.getModel('grok-2-mini');
        console.log('Model Details:', modelDetails);
        // Expected output:
        // {
        //     id: 'grok-2-mini',
        //     created: 1234567890,
        //     object: 'model',
        //     owned_by: 'xai',
        //     ...
        // }
    } catch (error) {
        console.error('Model Management Error:', error.message);
    }
}

async function demonstrateApiKeyInfo() {
    console.log('\n=== API Key Information Example ===');
    try {
        const keyInfo = await xai.getApiKeyInfo();
        console.log('API Key Info:', keyInfo);
        // Expected output:
        // {
        //     redacted_api_key: 'xG1k...b14o',
        //     user_id: '59fbe5f2-...',
        //     name: 'My API Key',
        //     create_time: '2024-01-01T12:55:18.139305Z',
        //     ...
        // }
    } catch (error) {
        console.error('API Key Info Error:', error.message);
    }
}

async function demonstrateFunctionCalling() {
    console.log('\n=== Function Calling Example ===');
    try {
        // Example using chat completion with function calling
        const chatWithFunction = await xai.createChatCompletion({
            messages: [
                { role: 'user', content: 'What\'s the weather in San Francisco?' }
            ],
            model: 'grok-2-mini',
            tools: [{
                type: 'function',
                function: {
                    name: 'get_weather',
                    description: 'Get the current weather in a location',
                    parameters: {
                        type: 'object',
                        properties: {
                            location: {
                                type: 'string',
                                description: 'The city and state'
                            }
                        },
                        required: ['location']
                    }
                }
            }],
            tool_choice: {
                type: 'function',
                function: { name: 'get_weather' }
            }
        });

        console.log('Function Call Response:', chatWithFunction);
        // Expected output:
        // {
        //     id: 'chat-xxx',
        //     choices: [{
        //         message: {
        //             role: 'assistant',
        //             tool_calls: [{
        //                 id: 'call-xxx',
        //                 type: 'function',
        //                 function: {
        //                     name: 'get_weather',
        //                     arguments: '{"location":"San Francisco, CA"}'
        //                 }
        //             }]
        //         }
        //     }]
        // }

        // Direct function call example
        const functionResponse = await xai.functionCall('get_weather', {
            location: 'San Francisco, CA'
        });

        console.log('Direct Function Response:', functionResponse);
    } catch (error) {
        console.error('Function Calling Error:', error.message);
    }
}

// Run all demonstrations
async function runDemonstrations() {
    await demonstrateChat();
    await demonstrateCompletion();
    await demonstrateEmbeddings();
    await demonstrateImageGeneration();
    await demonstrateImageEditing();
    await demonstrateCodeEditing();
    await demonstrateModelManagement();
    await demonstrateApiKeyInfo();
    await demonstrateFunctionCalling();
}

// Execute the demonstrations
runDemonstrations().catch(console.error);
```


I've created a comprehensive example file that demonstrates all the functionality of the `XAIApi` class. Let me break down each section and explain what it does:

1. **Chat Completions** (`demonstrateChat`):
   - Shows how to have a conversation with the model
   - Uses system and user messages
   - Includes temperature and token control
   - Useful for: Coding assistance, Q&A, conversations

2. **Text Completions** (`demonstrateCompletion`):
   - Simpler, prompt-based completions
   - Good for: Text generation, creative writing
   - Example shows haiku generation

3. **Embeddings** (`demonstrateEmbeddings`):
   - Converts text into vector representations
   - Useful for: Semantic search, text similarity
   - Shows float encoding format

4. **Image Generation** (`demonstrateImageGeneration`):
   - Creates images from text descriptions
   - Includes size and style parameters
   - Good for: Creating custom illustrations

5. **Image Editing** (`demonstrateImageEditing`):
   - Modifies existing images
   - Supports masking for targeted edits
   - Useful for: Image manipulation

6. **Code Editing** (`demonstrateCodeEditing`):
   - Shows both editing and applying changes
   - Includes practical example of code transformation
   - Good for: Code refactoring, style changes

7. **Model Management** (`demonstrateModelManagement`):
   - Lists available models
   - Gets detailed model information
   - Useful for: Model selection and capability checking

8. **API Key Information** (`demonstrateApiKeyInfo`):
   - Retrieves API key details
   - Shows permissions and usage info

9. **Function Calling** (`demonstrateFunctionCalling`):
   - Shows two approaches:
     1. Through chat completions (structured function calling)
     2. Direct function calls
   - Includes weather API example

To run these examples:

```bash
node examples.js
```

Each function includes:
- Error handling
- Expected response formats
- Practical use cases
- Complete parameter examples

The examples show both required and optional parameters, and demonstrate how to handle responses and errors. Would you like me to explain any particular section in more detail?
