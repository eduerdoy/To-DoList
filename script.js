
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

        <div id="btn-task">
        <button class="btn-check" onclick="checkCard(this)">
            <span class="material-symbols-outlined">radio_button_unchecked</span>
        </button>

        <button class="btn-del" onclick="removerCard(this)">
            <span class="material-symbols-outlined">close</span>
        </button>
        </div>
        
    `;
    lista.prepend(card);

    // Limpa os campos de entrada
    tituloInput.value = "";
    descricaoInput.value = "";
    
    tituloInput.focus();

    salvarTarefas();
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

// Gerar popup
function popUP(){
    const corpo = document.body;
    
    let card = document.createElement("div");

    card.innerHTML = 
        `<div class="container-message" id="card-message">
            <h3 class="titulo">Tarefa excluída com sucesso!</h3>
            <button class="btn" onclick="this.parentElement.remove()">
                <span class="material-symbols-outlined">close</span>
            </button>
        </div>`;



    corpo.appendChild(card);
}

// Remover pop-up
function removerPopUP(button){

    const element = button.closest('.card-message');
    element.remove()
}

// Função para remover card todo
function removerCard(button){

    popUP();

    
    const card = button.closest('.card-todo');
    card.remove();
    salvarTarefas(); 

}

function checkCard(button) {
    const card = button.closest('.card-todo');
    const icon = button.querySelector('.material-symbols-outlined');

    if (card.classList.contains ('completed')) {
        // Desmarcar a tarefa
        card.classList.remove('completed');
        icon.textContent = 'radio_button_unchecked';
    } else {
        // Marcar a tarefa como concluída
        card.classList.add('completed');
        icon.textContent = 'check_circle';
    }  

    salvarTarefas();
}

// Função para salvar as tarefas no localStorage
function salvarTarefas() {
    let tarefas = [];
    let cards = document.querySelectorAll('.card-todo');
    cards.forEach(card => {
        let textoTarefa = card.querySelector('.texto-tarefa').innerText;
        let concluida = card.classList.contains('completed');
        let checkIcon = card.querySelector('.btn-check .material-symbols-outlined').textContent; // Obtém o ícone atual
        tarefas.push({ texto: textoTarefa, concluida: concluida, checkIcon: checkIcon }); // Adiciona o ícone ao objeto
    });
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}


// Função para carregar as tarefas do localStorage
function carregarTarefas() {
    let tarefasString = localStorage.getItem('tarefas');
    if (tarefasString) {
        let tarefas = JSON.parse(tarefasString);

        // Filtrar tarefas concluídas
        tarefas = tarefas.filter(tarefa => !tarefa.concluida);

        // Atualizar localStorage com tarefas filtradas
        localStorage.setItem('tarefas', JSON.stringify(tarefas));

        // Criar cards para as tarefas restantes
        tarefas.forEach(tarefa => {
            let card = document.createElement('div');
            card.className = 'card-todo';
            card.innerHTML = `
                <p class="texto-tarefa">${tarefa.texto}</p>
                <div id="btn-task">
                    <button class="btn-check" onclick="checkCard(this)">
                        <span class="material-symbols-outlined">${tarefa.checkIcon}</span>
                    </button>
                    <button class="btn-del" onclick="removerCard(this)">
                        <span class="material-symbols-outlined">close</span>
                    </button>
                </div>
            `;
            document.getElementById('lista').appendChild(card);
        });
    }
}

// Chamar carregarTarefas() ao carregar a página
window.onload = carregarTarefas;

function limparTarefas() {
    document.getElementById('lista').innerHTML = ''; // Limpa a lista de tarefas
    localStorage.removeItem('tarefas'); // Limpa o localStorage
}


