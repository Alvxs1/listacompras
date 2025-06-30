const lista = document.getElementById('lista');
const input = document.getElementById('itemInput');
const botao = document.getElementById('addButton');

// Carrega do localStorage
window.onload = () => {
  const itensSalvos = JSON.parse(localStorage.getItem('itens')) || [];
  itensSalvos.forEach(adicionarItem);
};

function salvarLista() {
  const itens = [];
  document.querySelectorAll('li').forEach(li => {
    itens.push({
      nome: li.querySelector('span').textContent,
      comprado: li.classList.contains('comprado')
    });
  });
  localStorage.setItem('itens', JSON.stringify(itens));
}

function adicionarItem(itemObj) {
  const li = document.createElement('li');
  if (itemObj.comprado) li.classList.add('comprado');

  const span = document.createElement('span');
  span.textContent = itemObj.nome;
  span.onclick = () => {
    li.classList.toggle('comprado');
    salvarLista();
  };

  const btn = document.createElement('button');
  btn.textContent = 'Remover';
  btn.classList.add('remove-btn');
  btn.onclick = () => {
    li.remove();
    salvarLista();
  };

  li.appendChild(span);
  li.appendChild(btn);
  lista.appendChild(li);
}

botao.onclick = () => {
  const texto = input.value.trim();
  if (texto !== '') {
    const item = { nome: texto, comprado: false };
    adicionarItem(item);
    salvarLista();
    input.value = '';
    input.focus();
  }
};
