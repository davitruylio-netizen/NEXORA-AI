
const http = require("http");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        res.writeHead(204);
        return res.end();
    }

    if (req.url === "/api/status" && req.method === "GET") {
        res.writeHead(200);
        return res.end(JSON.stringify({
            success: true,
            company: "NEXORA",
            system: "NEXORA AI",
            status: "online",
            version: "1.0.0"
        }));
    }

    if (req.url === "/api/chat" && req.method === "POST") {
        let body = "";

        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {
            try {
                const data = JSON.parse(body);
                const message = data.message;

                if (typeof message !== "string" || !message.trim()) {
                    res.writeHead(400);
                    return res.end(JSON.stringify({
                        success: false,
                        error: "Digite uma mensagem válida."
                    }));
                }

                res.writeHead(200);
                res.end(JSON.stringify({
                    success: true,
                    message: "Mensagem recebida pela NEXORA.",
                    reply: "O servidor da NEXORA recebeu sua mensagem. A conexão com a inteligência artificial será implementada na próxima etapa."
                }));

            } catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({
                    success: false,
                    error: "Não foi possível processar sua solicitação."
                }));
            }
        });

        return;
    }

    res.writeHead(404);
    res.end(JSON.stringify({
        success: false,
        error: "Rota não encontrada."
    }));
});

server.listen(PORT, () => {
    console.log(`NEXORA online na porta ${PORT}`);
});

