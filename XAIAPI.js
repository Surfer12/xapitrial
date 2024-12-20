class XAIApi {
    constructor(apiKey, options = {}) {
        if (!apiKey) {
            throw new Error('API key is required');
        }
        this.apiKey = apiKey;
        this.endpoint = options.endpoint || 'https://api.x.ai/v1';
        this.timeout = options.timeout || 30000; // 30 seconds default timeout
    }

    /**
     * Makes an API request with error handling and timeout
     * @private
     */
    async _makeRequest(url, options) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        try {
            const response = await fetch(url, {
                ...options,
                signal: controller.signal,
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    ...options.headers
                }
            });

            if (!response.ok) {
                const error = await response.json().catch(() => ({}));
                throw new Error(`API request failed: ${response.status} ${response.statusText} ${error.message || ''}`);
            }

            return await response.json();
        } catch (error) {
            if (error.name === 'AbortError') {
                throw new Error(`Request timed out after ${this.timeout}ms`);
            }
            throw error;
        } finally {
            clearTimeout(timeoutId);
        }
    }

    /**
     * Create a chat completion
     * @param {Object} params - The chat completion parameters
     * @param {Array<Object>} params.messages - The messages to generate a response for
     * @param {string} params.model - The model to use
     * @param {number} [params.temperature] - Sampling temperature (0-2)
     * @param {number} [params.max_tokens] - Maximum tokens to generate
     * @param {boolean} [params.stream] - Whether to stream the response
     * @param {Array<Object>} [params.tools] - Tools/functions the model can use
     * @param {Object} [params.tool_choice] - Specify which tool to use
     * @returns {Promise<Object>} The chat completion response
     */
    async createChatCompletion(params) {
        if (!params.messages || !Array.isArray(params.messages)) {
            throw new Error('Messages array is required');
        }
        if (!params.model) {
            throw new Error('Model is required');
        }

        return this._makeRequest(`${this.endpoint}/chat/completions`, {
            method: 'POST',
            body: JSON.stringify(params)
        });
    }

    /**
     * Create a completion
     * @param {Object} params - The completion parameters
     * @param {string|Array<string>} params.prompt - The prompt(s) to generate completions for
     * @param {string} params.model - The model to use
     * @param {number} [params.temperature] - Sampling temperature (0-2)
     * @param {number} [params.max_tokens] - Maximum tokens to generate
     * @param {boolean} [params.stream] - Whether to stream the response
     * @returns {Promise<Object>} The completion response
     */
    async createCompletion(params) {
        if (!params.prompt) {
            throw new Error('Prompt is required');
        }
        if (!params.model) {
            throw new Error('Model is required');
        }

        return this._makeRequest(`${this.endpoint}/completions`, {
            method: 'POST',
            body: JSON.stringify(params)
        });
    }

    /**
     * Create embeddings for input text
     * @param {Object} params - The embedding parameters
     * @param {string|Array<string>} params.input - The text to embed
     * @param {string} params.model - The model to use
     * @param {string} [params.encoding_format] - The format to return embeddings in ('float' or 'base64')
     * @returns {Promise<Object>} The embedding response
     */
    async createEmbedding(params) {
        if (!params.input) {
            throw new Error('Input is required');
        }
        if (!params.model) {
            throw new Error('Model is required');
        }

        return this._makeRequest(`${this.endpoint}/embeddings`, {
            method: 'POST',
            body: JSON.stringify(params)
        });
    }

    /**
     * Generate images from a prompt
     * @param {Object} params - The image generation parameters
     * @param {string} params.prompt - The image description
     * @param {string} [params.model] - The model to use
     * @param {string} [params.size] - Image size
     * @param {string} [params.style] - Image style
     * @returns {Promise<Object>} The generated image response
     */
    async createImage(params) {
        if (!params.prompt) {
            throw new Error('Prompt is required');
        }

        return this._makeRequest(`${this.endpoint}/images/generations`, {
            method: 'POST',
            body: JSON.stringify(params)
        });
    }

    /**
     * Edit an image based on a prompt
     * @param {Object} params - The image edit parameters
     * @param {Object} params.image - The image to edit (URL)
     * @param {string} params.prompt - The editing instructions
     * @param {Object} [params.mask] - The mask for editing specific areas
     * @returns {Promise<Object>} The edited image response
     */
    async editImage(params) {
        if (!params.image) {
            throw new Error('Image is required');
        }
        if (!params.prompt) {
            throw new Error('Prompt is required');
        }

        return this._makeRequest(`${this.endpoint}/images/edits`, {
            method: 'POST',
            body: JSON.stringify(params)
        });
    }

    /**
     * List available models
     * @returns {Promise<Object>} List of available models
     */
    async listModels() {
        return this._makeRequest(`${this.endpoint}/models`, {
            method: 'GET'
        });
    }

    /**
     * Get model information
     * @param {string} modelId - The ID of the model to retrieve
     * @returns {Promise<Object>} Model information
     */
    async getModel(modelId) {
        if (!modelId) {
            throw new Error('Model ID is required');
        }

        return this._makeRequest(`${this.endpoint}/models/${modelId}`, {
            method: 'GET'
        });
    }

    /**
     * Get API key information
     * @returns {Promise<Object>} API key information
     */
    async getApiKeyInfo() {
        return this._makeRequest(`${this.endpoint}/api-key`, {
            method: 'GET'
        });
    }

    /**
     * Calls a function on the XAI API.
     * @param {string} functionName - The name of the function to call.
     * @param {Object} args - The arguments to pass to the function.
     * @returns {Promise<Object>} The result of the function call.
     */
    async functionCall(functionName, args) {
        if (!functionName) {
            throw new Error('Function name is required');
        }

        return this._makeRequest(`${this.endpoint}/functions/${functionName}`, {
            method: 'POST',
            body: JSON.stringify(args || {})
        });
    }

    /**
     * Edits code using the XAI API.
     * @param {string} code - The code to be edited.
     * @param {string} instructions - The instructions for editing the code.
     * @returns {Promise<Object>} The edited code result.
     */
    async codeEdit(code, instructions) {
        if (!code) {
            throw new Error('Code is required');
        }
        if (!instructions) {
            throw new Error('Instructions are required');
        }

        return this._makeRequest(`${this.endpoint}/code/edit`, {
            method: 'POST',
            body: JSON.stringify({ code, instructions })
        });
    }

    /**
     * Applies an edit made by the XAI API.
     * @param {string} editId - The ID of the edit to apply.
     * @returns {Promise<Object>} The result of applying the edit.
     */
    async applyEdit(editId) {
        if (!editId) {
            throw new Error('Edit ID is required');
        }

        return this._makeRequest(`${this.endpoint}/code/apply/${editId}`, {
            method: 'POST'
        });
    }

    /**
     * Checks the API connection and authentication.
     * @returns {Promise<boolean>} True if connection is successful.
     */
    async checkConnection() {
        try {
            await this._makeRequest(`${this.endpoint}/health`, {
                method: 'GET'
            });
            return true;
        } catch (error) {
            return false;
        }
    }
}

// Export for Node.js environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = XAIApi;
}
