class XAIApi {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.endpoint = 'https://api.x.ai/v1';
    }

    /**
     * Calls a function on the XAI API.
     * @param {string} functionName - The name of the function to call.
     * @param {Object} args - The arguments to pass to the function.
     * @returns {Promise<Object>} The result of the function call.
     */
    async functionCall(functionName, args) {
        const response = await fetch(`${this.endpoint}/functions/${functionName}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(args)
        });
        return await response.json();
    }

    /**
     * Edits code using the XAI API.
     * @param {string} code - The code to be edited.
     * @param {string} instructions - The instructions for editing the code.
     * @returns {Promise<Object>} The edited code result.
     */
    async codeEdit(code, instructions) {
        const response = await fetch(`${this.endpoint}/code/edit`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ code, instructions })
        });
        return await response.json();
    }

    /**
     * Applies an edit made by the XAI API.
     * @param {string} editId - The ID of the edit to apply.
     * @returns {Promise<Object>} The result of applying the edit.
     */
    async applyEdit(editId) {
        const response = await fetch(`${this.endpoint}/code/apply/${editId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.apiKey}`
            }
        });
        return await response.json();
    }
}

// Usage example:
// const xai = new XAIApi('your_api_key');
// const result = await xai.functionCall('someFunction', { arg1: 'value1' });
// const editedCode = await xai.codeEdit('originalCode', 'edit instructions');
// const appliedResult = await xai.applyEdit('editId');
