import OpenAI from 'openai';

if (!import.meta.env.VITE_OPENAI_API_KEY) {
    throw new Error("OpenAI API key is missing or invalid.");
}

export default new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});