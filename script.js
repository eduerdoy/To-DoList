document.getElementById("todo-form").addEventListener("submit", function(event) {
    event.preventDefault();
    let tituloInput = document.getElementById("input-titulo");
    let descricaoInput = document.getElementById("input-descricao");
    let titulo = tituloInput.value.trim();
    let descricao = descricaoInput.value.trim();
    let lista = document.getElementById("lista");

    if (titulo === "" || descricao === "") {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    let existingTasks = document.querySelectorAll(".texto-tarefa");
    for (let task of existingTasks) {
        if (task.innerText === `Tarefa: ${titulo} - ${descricao}`) {
            alert("Esta tarefa já foi adicionada com o mesmo título e descrição.");
            return;
        }
    }

    let card = document.createElement("div");
    card.className = "card-todo";
    card.innerHTML = `
        <p class="texto-tarefa">Tarefa: ${titulo} - ${descricao}</p>
        <button class="btn-del" onclick="this.parentElement.remove()">
            <span class="material-symbols-outlined">close</span>
        </button>
    `;
    lista.appendChild(card);

    tituloInput.value = "";
    descricaoInput.value = "";
});

// Alternar entre modo claro e escuro
document.getElementById("toggle-theme").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
});
