const campoNovaTarefa = document.getElementById('nova-tarefa-input')
console.log(campoNovaTarefa)

const botaoAdicionar = document.getElementById('adicionar-tarefa-btn')
console.log(botaoAdicionar)

const listaTarefas = document.getElementById('lista-de-tarefas')
const campoPesquisa = document.getElementById('pesquisa')

let tarefas = []

// 2 - Função para carregar tarefas salvas no navegador (localStorage)
function carregarTarefasSalvas(){
    const tarefasSalvas = localStorage.getItem('tarefas')
    if (tarefasSalvas){
        tarefas = JSON.parse(tarefasSalvas) // converte o texto para array/json
        exibirTarefas(tarefas)
    }
}

// 3 - Função que irá salvar as tarefas no navegador
function salvarTarefas(){
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

// 4 - Função para adicionar uma nova tarefa
function adicionarTarefa(){
   let textoTarefa = campoNovaTarefa.value.trim() // remove espaços em branco

   if (textoTarefa === ""){
    alert('Digite uma nova tarefa antes de adicionar!')
    return
   }

   const novaTarefa = {
    id: Date.now(),
    texto: textoTarefa,
    concluida: false
   }

   // Adicionamos a nova tarefa ao array e salvamos no navegador
   tarefas.push(novaTarefa)
   salvarTarefas()

   // Atualizamos a lista de tarefas
   exibirTarefas(tarefas)

   // Limpamos o campo de texto/input
   campoNovaTarefa.value =''
}

// 5 - Função para mostrar as tarefas no navegador
function exibirTarefas(listaParaMostrar){
    // Limpar as tarefas antes de exibir
    listaTarefas.innerHTML = ''

    // Estrutura de repetição para adicionar novas tarefas
    for (let tarefa of listaParaMostrar){

        // Criar um <li> para cada tarefa
        const item = document.createElement('li')
        item.className = 'flex justify-between items-center p-3 border rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100 transition'

        // Adicionamos a classe 'concluida' se tiver marcada
        if (tarefa.concluida) {
            item.classList.add('concluida')
        }

        // Criar um span para o texto da tarefa
        const textoTarefa = document.createElement('span')
        textoTarefa.textContent = tarefa.texto
        textoTarefa.className = 'tarefa-texto flex-grow cursor-pointer'
        textoTarefa.onclick = function () {
            alternarConclusao(tarefa.id)
        }

        // Criar os botões de editar e excluir
        const botoes = document.createElement('div')
        botoes.className = 'flex space-x-2'

        const botaoEditar = document.createElement('button')
        botaoEditar.className = 'px-2 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded'
        botaoEditar.textContent = '✏'
        botaoEditar.onclick = function () {
            editarTarefa(tarefa.id)
        }

        const botaoExcluir = document.createElement('button')
        botaoExcluir.className = 'px-2 py-1 bg-red-400 hover:bg-red-500 text-white rounded'
        botaoExcluir.textContent = '🗑'
        botaoExcluir.onclick = function () {
            excluirTarefa(tarefa.id)
        }

        // Montagem do elemento de tarefa
        botoes.appendChild(botaoEditar)
        botoes.appendChild(botaoExcluir)
        item.appendChild(textoTarefa)
        item.appendChild(botoes)
        listaTarefas.appendChild(item)
    }

}

// 6. Função para alternar entre concluída e ativa
function alternarConclusao(id) {
    for (let tarefa of tarefas){
        if (tarefa.id === id ){
            tarefa.concluida = !tarefa.concluida
        }
    }
    salvarTarefas()
    exibirTarefas(tarefas)
}

// 7. Função para editar o texto de uma tarefa
function editarTarefa(id){
    const novaDescricao = prompt('Edite a tarefa: ')
    if (novaDescricao === null || novaDescricao.trim() === ""){
        return // Se cancelar ou deixar em branco não faz nada
    }
    for (let tarefa of tarefas){
        if (tarefa.id === id){
            tarefa.texto = novaDescricao.trim()
        }
    }

    salvarTarefas()
    exibirTarefas(tarefas)
}

// 8. Função para excluir uma tarefa
function excluirTarefa(id) {
    const confirmar = window.confirm('Você realmente deseja excluir a tarefa?')

    if (confirmar) {
        tarefas = tarefas.filter(function (tarefa){
            return tarefa.id !== id
        })
        salvarTarefas()
        exibirTarefas(tarefas)
    }
}
// 9. Eventos com o usuario
botaoAdicionar.addEventListener('click', adicionarTarefa)