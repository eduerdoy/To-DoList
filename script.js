document.getElementById("todo-form").addEventListener("submit", function(event) {
    event.preventDefault();
    let tituloInput = document.getElementById("input-titulo");
    let descricaoInput = document.getElementById("input-descricao");
    let titulo = tituloInput.value.trim();
    let descricao = descricaoInput.value.trim();
    let lista = document.getElementById("lista");

    // Validação para garantir que ambos os campos sejam preenchidos
    if (titulo === "" || descricao === "") {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // Verifica se a tarefa já foi adicionada (título e descrição únicos)
    let existingTasks = document.querySelectorAll(".texto-tarefa");
    for (let task of existingTasks) {
        if (task.innerText === `Tarefa: ${titulo} - ${descricao}`) {
            alert("Esta tarefa já foi adicionada com o mesmo título e descrição.");
            return;
        }
    }

    // Criação do card de tarefa
    let card = document.createElement("div");
    card.className = "card-todo";
    card.innerHTML = `
        <p class="texto-tarefa">Tarefa: ${titulo} - ${descricao}</p>
        <button class="btn-del" onclick="this.parentElement.remove()">
            <span class="material-symbols-outlined">close</span>
        </button>
    `;
    lista.appendChild(card);

    // Limpa os campos de entrada
    tituloInput.value = "";
    descricaoInput.value = "";
});

// Alternar entre modo claro, escuro e diversidade
let currentTheme = 'light';

document.getElementById("toggle-theme").addEventListener("click", function() {
    let body = document.body;

    // Remover todas as classes de tema
    body.classList.remove('light-mode', 'dark-mode', 'diversity-mode');

    // Alternar entre os temas
    if (currentTheme === 'light') {
        body.classList.add('dark-mode');
        currentTheme = 'dark';
    } else if (currentTheme === 'dark') {
        body.classList.add('diversity-mode');
        currentTheme = 'diversity';
    } else {
        body.classList.add('light-mode');
        currentTheme = 'light';
    }
});
