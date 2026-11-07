
async function generateAIResponse(message) {
    if (typeof message !== "string" || !message.trim()) {
        throw new Error("A mensagem não pode estar vazia.");
    }

    const apiKey = process.env.AI_API_KEY;

    if (!apiKey) {
        return {
            success: false,
            reply: "A inteligência artificial da NEXORA ainda não foi configurada. Estamos preparando essa conexão."
        };
    }

    // A conexão com o provedor de IA será implementada
    // após escolhermos qual serviço utilizar.

    return {
        success: false,
        reply: "O provedor de inteligência artificial ainda não foi conectado."
    };
}

module.exports = {
    generateAIResponse
};

