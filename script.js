// mostra o quanto a página já foi vista
window.addEventListener('scroll', function() {
    const progressBar = document.getElementById('progressBar');
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPosition = window.scrollY;

    const percentScrolled = (scrollPosition / totalHeight) * 100;
    progressBar.style.width = percentScrolled + '%';
});

// botao voltar para cima
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
window.onscroll = function() {
    const botao = document.getElementById('botao_voltar_para_cima');
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        botao.style.display = 'block'; // Mostra o botão
    } else {
        botao.style.display = 'none'; // Esconde o botão
    }
};


// Jogo da Velha
const currentPlayer = document.querySelector(".currentPlayer");

let selected;
let player = "X";

let positions = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

function init() {
  selected = [];

  currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;

  document.querySelectorAll(".game button").forEach((item) => {
    item.innerHTML = "";
    item.addEventListener("click", newMove);
  });
}

init();

function newMove(e) {
  const index = e.target.getAttribute("data-i");
  e.target.innerHTML = player;
  e.target.removeEventListener("click", newMove);
  selected[index] = player;

  setTimeout(() => {
    check();
  }, [100]);

  player = player === "X" ? "O" : "X";
  currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;
}

function check() {
  let playerLastMove = player === "X" ? "O" : "X";

  const items = selected
    .map((item, i) => [item, i])
    .filter((item) => item[0] === playerLastMove)
    .map((item) => item[1]);

  for (pos of positions) {
    if (pos.every((item) => items.includes(item))) {
      alert("O JOGADOR '" + playerLastMove + "' GANHOU!");
      init();
      return;
    }
  }

  if (selected.filter((item) => item).length === 9) {
    alert("DEU EMPATE!");
    init();
    return;
  }
}