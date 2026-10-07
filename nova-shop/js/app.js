// MOSTRA PRODUTOS + FILTRO
const grid = document.getElementById('grid-produtos');

function mostrar(produtosParaMostrar) {
  if (!grid) return;
  grid.innerHTML = produtosParaMostrar.map(p => {
    const foto = p.img || p.imagem;
    return `
      <div style="background:white; border-radius:12px; padding:15px; text-align:center; box-shadow:0 4px 12px rgba(0,0,0,0.08);">
        <img src="${foto}" style="width:100%; height:180px; object-fit:contain; background:#f8f8f8; border-radius:8px;">
        <h3 style="font-size:16px; margin:10px 0;">${p.nome}</h3>
        <p style="color:#00a8ff; font-weight:bold;">R$ ${p.preco.toFixed(2)}</p>
        <a href="produto.html?id=${p.id}" style="background:#0a0f2c; color:white; padding:8px 18px; border-radius:6px; text-decoration:none; display:inline-block; margin-top:8px;">Ver detalhes</a>
      </div>
    `;
  }).join('');
}

// inicial
document.addEventListener('DOMContentLoaded', () => mostrar(produtos));

// filtro
document.getElementById('busca')?.addEventListener('input', filtrar);
document.getElementById('filtro-preco')?.addEventListener('change', filtrar);

function filtrar() {
  const texto = document.getElementById('busca').value.toLowerCase();
  const faixa = document.getElementById('filtro-preco').value;

  let filtrados = produtos.filter(p => p.nome.toLowerCase().includes(texto));

  if (faixa) {
    const [min, max] = faixa.split('-').map(Number);
    filtrados = filtrados.filter(p => p.preco >= min && p.preco <= max);
  }
  mostrar(filtrados);
}