const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');
const dropzones = document.querySelectorAll('.dropzone')
const buttonNote = document.querySelector('.saveNote')
const note = document.querySelector('.notes')

if (buttonNote.disabled == true) {
  buttonNote.classList.remove('saveNote')
  buttonNote.classList.add("disable")
} else {
  buttonNote.classList.remove('disable')
}

function criaCard(zone) {
  const div = document.createElement('div');
  div.setAttribute('class', 'card')
  div.setAttribute('id', zone)
  div.draggable = true
  const status = criaStatus()
  div.appendChild(status)
  return div;
}

function criaStatus() {
  const status = document.createElement('div')
  status.setAttribute('class', 'status green')
  return status
}

function criaContent() {
  const content = document.createElement('div')
  content.setAttribute('class', 'content')
  return content
}

function limpaInput() {
  inputTarefa.value = "";
  inputTarefa.focus();
}

function criaTarefa(txt, zone) {
  const card = criaCard(zone);
  const content = criaContent()
  content.innerHTML = txt
  card.appendChild(content)

  dropzones.forEach(dropzone => {
    if (card.id == dropzone.id) {
      dropzone.appendChild(card)
    }
  })
  // cards.push(card);
  limpaInput();
  criaBotaoApagar(card);
  salvarTarefas()
}

function criaBotaoApagar(li) {
  li.innerHTML += " ";
  const botaoApagar = document.createElement('button');
  botaoApagar.innerText = "Apagar";
  botaoApagar.setAttribute('class', 'apagar');
  li.appendChild(botaoApagar);
}

inputTarefa.addEventListener('keypress', (e) => {
  if (e.keyCode === 13) {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value, "to-do");
    drag_n_drop()
  }
})


btnTarefa.addEventListener('click', (e) => {
  if (!inputTarefa.value) return;
  criaTarefa(inputTarefa.value, "to-do");
  drag_n_drop()
})

document.addEventListener('click', (e) => {
  const el = e.target;
  if (el.classList.contains('apagar')) {
    el.parentElement.remove();
    salvarTarefas();
  }
})


function salvarTarefas() {
  const liTarefas = document.querySelectorAll('.card');
  const listaDeTarefas = []
  for (let li of liTarefas) {
    let tarefaTexto = li;
    let card = {
      status: tarefaTexto.children[0].classList.value,
      content: tarefaTexto.children[1].innerHTML,
      zone: li.id == "to-do" ? "to-do" : li.id
    }
    listaDeTarefas.push(card);
  }

  const tarefasJSON = JSON.stringify(listaDeTarefas);
  localStorage.setItem('tarefas', tarefasJSON);
}

function adicionaTarefasSalvas() {
  const tarefas = localStorage.getItem("tarefas");
  const listaDeTarefas = JSON.parse(tarefas);

  for (let tarefa of listaDeTarefas) {
    criaTarefa(tarefa.content, tarefa.zone);
  }
  drag_n_drop()
  note.value = localStorage.getItem('notes')
}

adicionaTarefasSalvas()

function drag_n_drop() {

  const cards = document.querySelectorAll('.card')
  cards.forEach(card => {
    card.addEventListener('dragstart', dragstart)
    card.addEventListener('drag', drag)
    card.addEventListener('dragend', dragend)
  })

  function dragstart() {
    //  this == card
    dropzones.forEach(dropzone => dropzone.classList.add('highlight'))
    this.classList.add('is-dragging')
  }

  function drag() {
  }

  function dragend() {
    // this == card
    dropzones.forEach(dropzone => dropzone.classList.remove('highlight'))
    this.classList.remove('is-dragging')
    salvarTarefas()
  }

  // Local onde sera solto os cartões
  dropzones.forEach(dropzone => {
    dropzone.addEventListener('dragenter', dragenter)
    dropzone.addEventListener('dragover', dragover)
    dropzone.addEventListener('dragleave', dragleave)
    dropzone.addEventListener('drop', drop)
  })

  function dragenter() {
  }

  function dragover() {
    //  this == dropzone
    this.classList.add('over')

    //  get draggin card
    const cardBeingDragged = document.querySelector('.is-dragging')
    cardBeingDragged.id = this.id
    this.appendChild(cardBeingDragged)

  }

  function dragleave() {
    //  this == dropzone
    this.classList.remove('over')

  }

  function drop() {
    this.classList.remove('over')
  }
}

const area = document.querySelector('.notes');
if (area.addEventListener) {
  area.addEventListener('input', () => {
    buttonNote.classList.remove('disable')
    buttonNote.classList.add('saveNote')
    buttonNote.disabled = false
  }, false);
} else if (area.attachEvent) {
  area.attachEvent('onpropertychange', () => {
    buttonNote.classList.remove('disable')
    buttonNote.classList.add('saveNote')
    buttonNote.disabled = false
  });
}

buttonNote.addEventListener('click', (e) => {
  localStorage.setItem('notes', note.value)
  buttonNote.classList.remove('saveNote')
  buttonNote.classList.add("disable")
})
























































































// const inputTarefa = document.querySelector('.input-tarefa');
// const btnTarefa = document.querySelector('.btn-tarefa');
// const tarefas = document.querySelector('.tarefas');

// function criaCard() {
//   const li = document.createElement('li');
//   return li;
// }

// inputTarefa.addEventListener('keypress', function(e) {
//   if (e.keyCode === 13) {
//     if (!inputTarefa.value) return;
//     criaTarefa(inputTarefa.value);
//   }
// });

// function limpaInput() {
//   inputTarefa.value = '';
//   inputTarefa.focus();
// }

// function criaBotaoApagar(li) {
//   li.innerText += ' ';
//   const botaoApagar = document.createElement('button');
//   botaoApagar.innerText = 'Apagar';
//   // botaoApagar.classList.add('apagar');
//   botaoApagar.setAttribute('class', 'apagar');
//   botaoApagar.setAttribute('title', 'Apagar esta tarefa');
//   li.appendChild(botaoApagar);
// }

// function criaTarefa(textoInput) {
//   const li = criaCard();
//   li.innerText = textoInput;
//   tarefas.appendChild(li);
//   limpaInput();
//   criaBotaoApagar(li);
//   salvarTarefas();
// }

// btnTarefa.addEventListener('click', function() {
//   if (!inputTarefa.value) return;
//   criaTarefa(inputTarefa.value);
// });

// document.addEventListener('click', function(e) {
//   const el = e.target;

//   if (el.classList.contains('apagar')) {
//     el.parentElement.remove();
//     salvarTarefas();
//   }
// });

// function salvarTarefas() {
//   const liTarefas = tarefas.querySelectorAll('li');
//   const listaDeTarefas = [];

//   for (let tarefa of liTarefas) {
//     let tarefaTexto = tarefa.innerText;
//     tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
//     listaDeTarefas.push(tarefaTexto);
//   }

//   const tarefasJSON = JSON.stringify(listaDeTarefas);
//   localStorage.setItem('tarefas', tarefasJSON);
// }

// function adicionaTarefasSalvas() {
//   const tarefas = localStorage.getItem('tarefas');
//   const listaDeTarefas = JSON.parse(tarefas);

//   for(let tarefa of listaDeTarefas) {
//     criaTarefa(tarefa);
//   }
// }
// adicionaTarefasSalvas();
