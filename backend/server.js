
const http = require("http");
const { generateAIResponse } = require("./ai");

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

            if (body.length > 100000) {
                req.destroy();
            }
        });

        req.on("end", async () => {
            try {
                const data = JSON.parse(body);

                if (
                    typeof data.message !== "string" ||
                    !data.message.trim()
                ) {
                    res.writeHead(400);
                    return res.end(JSON.stringify({
                        success: false,
                        error: "Digite uma mensagem válida."
                    }));
                }

                const result = await generateAIResponse(data.message);

                res.writeHead(200);
                res.end(JSON.stringify(result));

            } catch (error) {
                console.error("Erro na NEXORA:", error);

                if (!res.destroyed) {
                    res.writeHead(500);
                    res.end(JSON.stringify({
                        success: false,
                        error: "Erro interno ao processar sua mensagem."
                    }));
                }
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
