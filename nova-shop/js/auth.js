// NOVA SHOP - SISTEMA DE LOGIN - CORRIGIDO CARRINHO SEM QUEBRA
function getUsuarios(){ return JSON.parse(localStorage.getItem('usuariosNovaShop') || '[]'); }
function salvarUsuarios(u){ localStorage.setItem('usuariosNovaShop', JSON.stringify(u)); }
function getUsuarioLogado(){ return JSON.parse(localStorage.getItem('usuarioLogado') || 'null'); }

function cadastrar(){
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim().toLowerCase();
  const senha = document.getElementById('senha').value;
  const msg = document.getElementById('msg-auth');
  if(!nome || !email || !senha){ msg.style.color='red'; msg.innerText='Preencha todos os campos!'; return; }
  let usuarios = getUsuarios();
  if(usuarios.find(u => u.email === email)){ msg.style.color='red'; msg.innerText='Esse e-mail já existe!'; return; }
  usuarios.push({ nome, email, senha });
  salvarUsuarios(usuarios);
  localStorage.setItem('usuarioLogado', JSON.stringify({ nome, email }));
  msg.style.color='green'; msg.innerText='✅ Cadastrado! Indo pro início...';
  setTimeout(()=> location.href='index.html', 1200);
}

function logar(){
  const email = document.getElementById('email').value.trim().toLowerCase();
  const senha = document.getElementById('senha').value;
  const msg = document.getElementById('msg-auth');
  let user = getUsuarios().find(u => u.email === email && u.senha === senha);
  if(!user){ msg.style.color='red'; msg.innerText='❌ E-mail ou senha errados'; return; }
  localStorage.setItem('usuarioLogado', JSON.stringify(user));
  msg.style.color='green'; msg.innerText='✅ Bem-vindo, ' + user.nome + '!';
  setTimeout(()=> location.href='index.html', 1000);
}

function logout(){ localStorage.removeItem('usuarioLogado'); location.href='index.html'; }

function atualizarHeader(){
  const user = getUsuarioLogado();
  const area = document.getElementById('area-login');
  if(!area) return;
  const link = 'color:white; text-decoration:none; white-space:nowrap; font-size:14px;';
  const btn = 'background:#00a8ff; padding:6px 12px; border-radius:6px; color:white; text-decoration:none; white-space:nowrap; font-size:14px;';
  const cart = 'color:white; text-decoration:none; white-space:nowrap; display:inline-flex; align-items:center; font-size:14px;';

  area.style.cssText = 'display:flex; gap:12px; align-items:center; flex-wrap:nowrap; white-space:nowrap;';

  if(user){
    area.innerHTML = `<span style="color:#00a8ff; font-weight:bold; white-space:nowrap; font-size:14px;">Olá, ${user.nome.split(' ')[0]}</span> <a href="#" onclick="logout()" style="${link}">Sair</a> <a href="carrinho.html" style="${cart}">Carrinho&nbsp;(<span id="contador-carrinho">0</span>)</a>`;
  } else {
    area.innerHTML = `<a href="login.html" style="${link}">Entrar</a> <a href="cadastro.html" style="${btn}">Cadastrar</a> <a href="carrinho.html" style="${cart}">Carrinho&nbsp;(<span id="contador-carrinho">0</span>)</a>`;
  }
}
document.addEventListener('DOMContentLoaded', atualizarHeader);