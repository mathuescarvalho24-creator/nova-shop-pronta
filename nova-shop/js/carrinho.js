// js/carrinho.js - VERSÃO FINAL PARA SEU CARRINHO.HTML

let desconto = 0;

function getCarrinho() {
  return JSON.parse(localStorage.getItem('carrinho') || '[]');
}

function salvarCarrinho(carrinho) {
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  atualizarContador();
}

function adicionarAoCarrinho(id) {
  const produto = produtos.find(p => p.id === Number(id));
  if (!produto) return;

  let carrinho = getCarrinho();
  let item = carrinho.find(i => i.id === produto.id);

  if (item) {
    item.qtd++;
  } else {
    carrinho.push({
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      img: produto.img || produto.imagem,
      qtd: 1
    });
  }
  salvarCarrinho(carrinho);

  // efeito do botão
  let btn = event ? event.target : null;
  if (btn) {
    let original = btn.innerText;
    btn.innerText = "✓ Adicionado!";
    btn.style.background = "#00c851";
    btn.style.color = "white";
    setTimeout(() => {
      btn.innerText = original;
      btn.style.background = "#111";
      btn.style.color = "white";
    }, 1200);
  }
}

function atualizarContador() {
  let carrinho = getCarrinho();
  let total = carrinho.reduce((s, i) => s + i.qtd, 0);
  let el = document.getElementById('contador-carrinho');
  if (el) el.innerText = total;
}

function mostrarCarrinho() {
  let carrinho = getCarrinho();
  let lista = document.getElementById('lista-carrinho');
  let totalEl = document.getElementById('total');
  if (!lista) return;

  if (carrinho.length === 0) {
    lista.innerHTML = "<p style='text-align:center; padding:20px;'>Seu carrinho está vazio 😕<br><a href='index.html' style='color:#2b90ff;'>Voltar para a loja</a></p>";
    if (totalEl) totalEl.innerText = "";
    return;
  }

  lista.innerHTML = carrinho.map(item => `
    <div style="display:flex; gap:15px; align-items:center; background:#f5f7ff; border:1px solid #dde; padding:15px; border-radius:12px; margin-bottom:12px;">
      <img src="${item.img}" style="width:80px; height:80px; object-fit:contain; background:white; border-radius:8px; padding:5px; border:1px solid #ddd;">
      <div style="flex:1;">
        <strong style="color:#0a0f2c;">${item.nome}</strong><br>
        <span style="color:#555;">R$ ${item.preco.toFixed(2)} x ${item.qtd}</span> = 
        <strong style="color:#2b90ff;">R$ ${(item.preco * item.qtd).toFixed(2)}</strong>
      </div>
      <button onclick="removerDoCarrinho(${item.id})" style="background:#ff4444; color:white; border:none; padding:8px 12px; border-radius:6px; cursor:pointer; font-weight:bold;">X</button>
    </div>
  `).join('');

  let subtotal = carrinho.reduce((s, i) => s + (i.preco * i.qtd), 0);
  let totalFinal = subtotal - (subtotal * desconto);

  if (totalEl) {
    if (desconto > 0) {
      totalEl.innerHTML = `<span style="text-decoration:line-through; color:#999; font-size:14px;">Subtotal: R$ ${subtotal.toFixed(2)}</span><br>Total com desconto: R$ ${totalFinal.toFixed(2)}`;
    } else {
      totalEl.innerText = "Total: R$ " + subtotal.toFixed(2);
    }
  }
}

function removerDoCarrinho(id) {
  let carrinho = getCarrinho().filter(i => i.id !== id);
  salvarCarrinho(carrinho);
  mostrarCarrinho();
}

function limparCarrinho() {
  localStorage.removeItem('carrinho');
  desconto = 0;
  document.getElementById('msg-cupom').innerText = "";
  atualizarContador();
  mostrarCarrinho();
}

function aplicarCupom() {
  let input = document.getElementById('input-cupom');
  let msg = document.getElementById('msg-cupom');
  let cupom = input.value.trim().toUpperCase();

  if (cupom === "NOVA10") {
    desconto = 0.10;
    msg.style.color = "green";
    msg.innerText = "Cupom NOVA10 aplicado! -10%";
  } else if (cupom === "GAMER40") {
    desconto = 0.40;
    msg.style.color = "green";
    msg.innerText = "Cupom GAMER40 aplicado! -40%";
  } else {
    desconto = 0;
    msg.style.color = "red";
    msg.innerText = "Cupom inválido";
  }
  mostrarCarrinho();
}

function finalizarCompra() {
  let carrinho = getCarrinho();
  if (carrinho.length === 0) {
    alert("Carrinho vazio!");
    return;
  }
  alert("Compra finalizada com sucesso! Obrigado por comprar na NOVA SHOP 🎮");
  limparCarrinho();
}

// Inicia
document.addEventListener('DOMContentLoaded', () => {
  atualizarContador();
  mostrarCarrinho();
});