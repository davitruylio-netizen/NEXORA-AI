
// ==========================================
// NEXORA AI — APPLICATION CORE
// Version 1.0.0
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // ELEMENTOS
    const messageInput = document.getElementById("messageInput");
    const sendButton = document.getElementById("sendButton");
    const newChatButton = document.getElementById("newChat");
    const messagesContainer = document.getElementById("messages");
    const welcomeScreen = document.getElementById("welcomeScreen");
    const chatArea = document.getElementById("chatArea");
    const historyList = document.getElementById("historyList");
    const sidebar = document.getElementById("sidebar");
    const mobileMenu = document.getElementById("mobileMenu");
    const upgradeButton = document.getElementById("upgradeButton");

    // ESTADO
    let conversations = [];
    let currentConversation = null;

    // CRIAR CONVERSA
    function createConversation() {

        const conversation = {
            id: Date.now(),
            title: "Nova conversa",
            messages: []
        };

        conversations.unshift(conversation);
        currentConversation = conversation;

        messagesContainer.innerHTML = "";

        welcomeScreen.hidden = false;
        chatArea.hidden = true;

        updateHistory();

        messageInput.value = "";
        messageInput.focus();
    }

    // ATUALIZAR HISTÓRICO
    function updateHistory() {

        historyList.innerHTML = "";

        if (conversations.length === 0) {

            const empty = document.createElement("p");
            empty.className = "empty-history";
            empty.textContent = "Suas conversas aparecerão aqui.";

            historyList.appendChild(empty);
            return;
        }

        conversations.forEach(conversation => {

            const button = document.createElement("button");

            button.className = "menu-item";
            button.style.fontSize = "11px";

            if (currentConversation &&
                currentConversation.id === conversation.id) {
                button.classList.add("active");
            }

            button.textContent = "◈ " + conversation.title;

            button.addEventListener("click", () => {
                openConversation(conversation);
            });

            historyList.appendChild(button);
        });
    }

    // ABRIR CONVERSA
    function openConversation(conversation) {

        currentConversation = conversation;

        welcomeScreen.hidden = true;
        chatArea.hidden = false;

        messagesContainer.innerHTML = "";

        conversation.messages.forEach(message => {
            renderMessage(message.text, message.sender);
        });

        updateHistory();

        sidebar.classList.remove("open");
    }

    // MOSTRAR MENSAGEM
    function renderMessage(text, sender) {

        const message = document.createElement("div");
        message.className = "message " + sender;

        if (sender === "ai") {

            const avatar = document.createElement("div");
            avatar.className = "message-avatar";
            avatar.textContent = "N";

            message.appendChild(avatar);
        }

        const content = document.createElement("div");
        content.className = "message-content";

        // Segurança: não interpretar mensagens como HTML.
        content.textContent = text;

        message.appendChild(content);
        messagesContainer.appendChild(message);

        messagesContainer.scrollTop =
            messagesContainer.scrollHeight;
    }

    // ENVIAR MENSAGEM
    function sendMessage() {

        const text = messageInput.value.trim();

        if (!text) return;

        if (!currentConversation) {
            createConversation();
        }

        if (currentConversation.messages.length === 0) {

            currentConversation.title =
                text.length > 28
                    ? text.substring(0, 28) + "..."
                    : text;
        }

        currentConversation.messages.push({
            text: text,
            sender: "user"
        });

        welcomeScreen.hidden = true;
        chatArea.hidden = false;

        renderMessage(text, "user");

        messageInput.value = "";
        messageInput.style.height = "35px";

        updateHistory();

        showDemoResponse(text);
    }

    // RESPOSTA DEMONSTRATIVA
    // A IA REAL SERÁ CONECTADA AO BACKEND EM OUTRA ETAPA.
    function showDemoResponse(userMessage) {

        const loading = document.createElement("div");
        loading.className = "message loading";

        const avatar = document.createElement("div");
        avatar.className = "message-avatar";
        avatar.textContent = "N";

        const content = document.createElement("div");
        content.className = "message-content";
        content.textContent = "Interface demonstrativa ativa...";

        loading.appendChild(avatar);
        loading.appendChild(content);

        messagesContainer.appendChild(loading);

        setTimeout(() => {

            loading.remove();

            const response =
                "Olá! Você está utilizando a versão inicial da NEXORA.\n\n" +
                "Sua mensagem foi recebida com sucesso:\n" +
                "“" + userMessage + "”\n\n" +
                "Neste momento, o chat está funcionando em modo demonstrativo. " +
                "A conexão com um modelo real de inteligência artificial será implementada na próxima etapa.";

            currentConversation.messages.push({
                text: response,
                sender: "ai"
            });

            renderMessage(response, "ai");

        }, 700);
    }

    // BOTÃO ENVIAR
    sendButton.addEventListener("click", sendMessage);

    // ENTER ENVIA / SHIFT + ENTER QUEBRA LINHA
    messageInput.addEventListener("keydown", event => {

        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }

    });

    // AJUSTAR ALTURA DO CAMPO
    messageInput.addEventListener("input", () => {

        messageInput.style.height = "35px";

        messageInput.style.height =
            Math.min(messageInput.scrollHeight, 150) + "px";

    });

    // NOVA CONVERSA
    newChatButton.addEventListener("click", () => {

        createConversation();
        sidebar.classList.remove("open");

    });

    // CARTÕES DE SUGESTÃO
    document.querySelectorAll(".suggestion-card")
        .forEach(card => {

            card.addEventListener("click", () => {

                messageInput.value =
                    card.dataset.prompt || "";

                sendMessage();

            });

        });

    // MENU MOBILE
    mobileMenu.addEventListener("click", () => {

        sidebar.classList.toggle("open");

    });

    // PLANOS
    upgradeButton.addEventListener("click", () => {

        alert(
            "Os planos NEXORA Pro e Business serão disponibilizados em uma próxima versão."
        );

    });

    // INICIALIZAÇÃO
    createConversation();

    console.log("NEXORA AI inicializada com sucesso.");

});

