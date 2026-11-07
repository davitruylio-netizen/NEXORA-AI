
const { GoogleGenAI } = require("@google/genai");

async function generateAIResponse(message) {
    if (typeof message !== "string" || !message.trim()) {
        throw new Error("Mensagem inválida.");
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        return {
            success: false,
            reply: "A chave de inteligência artificial ainda não foi configurada no servidor."
        };
    }

    try {
        const ai = new GoogleGenAI({
            apiKey: apiKey
        });

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: message,
            config: {
                systemInstruction: `
Você é a NEXORA AI, uma inteligência artificial
profissional criada para ajudar empresas,
empreendedores e profissionais.

Seu idioma padrão é português brasileiro.

Seja inteligente, objetiva, educada e detalhada.
Ajude com negócios, produtividade, planejamento,
marketing, escrita, tecnologia e criatividade.

Organize respostas complexas com títulos e listas.
Nunca invente informações como se fossem fatos.
                `
            }
        });

        return {
            success: true,
            reply: response.text || "Não consegui gerar uma resposta."
        };

    } catch (error) {
        console.error("Erro Gemini:", error);

        return {
            success: false,
            reply: "Não consegui processar sua mensagem agora. Tente novamente."
        };
    }
}

module.exports = {
    generateAIResponse
};
