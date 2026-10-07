// BOT DA NOVA SHOP
console.log("BOT NOVA SHOP CARREGADO");

function responderBot(mensagem) {
    const texto = mensagem.toLowerCase().trim();

    if (texto === "y" || texto.includes("oi") || texto.includes("olá") || texto.includes("ola")) {
        return "Olá! 👋 Seja bem-vindo à NOVA SHOP! Como posso ajudar?";
    }
    if (texto.includes("produto") || texto.includes("produtos")) {
        return "Claro! 🛍 Você pode conferir nossos produtos na aba Produtos.";
    }
    if (texto.includes("entrega") || texto.includes("prazo")) {
        return "📦 O prazo de entrega fictício da NOVA SHOP é de 3 a 7 dias úteis.";
    }
    if (texto.includes("pagamento") || texto.includes("pagar") || texto.includes("pix")) {
        return "💳 Aceitamos cartão, Pix e outras formas de pagamento.";
    }
    if (texto.includes("carrinho")) {
        return "🛒 Para ver seus produtos, acesse a aba Carrinho no menu.";
    }
    return "🤔 Ainda não sei responder isso. Tente perguntar sobre produtos, entrega, pagamento ou carrinho.";
}

// ELEMENTOS DO CHAT
const botao = document.getElementById("chatbot-botao");
const janela = document.getElementById("chatbot-janela");
const fechar = document.getElementById("chatbot-fechar");
const input = document.getElementById("chatbot-input");
const enviar = document.getElementById("chatbot-enviar");
const mensagens = document.getElementById("chatbot-mensagens");

console.log("ELEMENTOS:", {botao, janela, fechar, input, enviar, mensagens});

if (!botao || !janela || !mensagens) {
    console.error("ID do chatbot não encontrado no HTML!");
}

function adicionarMensagem(texto, tipo) {
    const div = document.createElement("div");
    div.className = `mensagem ${tipo}`;
    div.textContent = texto;
    div.style.padding = "8px 12px";
    div.style.margin = "6px 0";
    div.style.borderRadius = "12px";
    div.style.maxWidth = "80%";
    if (tipo === "usuario") {
        div.style.background = "#2b90ff";
        div.style.color = "white";
        div.style.alignSelf = "flex-end";
        div.style.marginLeft = "auto";
    } else {
        div.style.background = "#eee";
        div.style.color = "#222";
    }
    mensagens.appendChild(div);
    mensagens.scrollTop = mensagens.scrollHeight;
}

function enviarMensagem() {
    const mensagem = input.value.trim();
    if (mensagem === "") return;

    adicionarMensagem(mensagem, "usuario");
    const resposta = responderBot(mensagem);
    setTimeout(() => adicionarMensagem(resposta, "bot"), 400);

    input.value = "";
    input.focus();
}

// ABRIR CHAT
botao.addEventListener("click", () => {
    console.log("BOTÃO DO CHAT CLICADO");
    janela.style.display = "flex";
});

// FECHAR CHAT
fechar.addEventListener("click", () => {
    janela.style.display = "none";
});

// ENVIAR
enviar.addEventListener("click", enviarMensagem);
input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") enviarMensagem();
});