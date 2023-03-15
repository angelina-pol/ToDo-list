'use strict'

window.onload = init;

function init() {
    const add = document.getElementById('add');
    let select = document.getElementById('sel');

    let selectedOption = 'active';

    select.onchange = function() {
        selectedOption = getSelectedOption(select.selectedIndex);

        changeSelectByState(selectedOption);
    };

    add.onclick = function() {
        if (selectedOption === 'active') {
            createTask();
        }
    }
};

function getSelectedOption(index) {
    switch (index) {
        case 1:
            return 'active';
        case 2:
            return 'completed';
        case 3:
            return 'deleted';
    }
};

function changeSelectByState(state) {
    const conteinerCompleted = document.getElementById('completedTaskConteiner');
    const conteinerDeleted = document.getElementById('deletedTaskConteiner');
    const conteinerActive = document.getElementById('activeTaskConteiner');

    conteinerActive.classList[state === 'active' ? 'remove' : 'add']('invisible');
    conteinerCompleted.classList[state === 'completed' ? 'remove' : 'add']('invisible');
    conteinerDeleted.classList[state === 'deleted' ? 'remove' : 'add']('invisible');
}

function createTask() {
    let conteiner = document.getElementById('activeTaskConteiner');
    let newTask = document.createElement('div');
    let text = document.createElement('div');
    let buttonDone = document.createElement('div');
    let buttonDelete = document.createElement('div');
    newTask.classList.add('task');
    text.classList.add('textStyle');
    text.innerHTML = document.getElementById('newtask').value;
    buttonDone.innerHTML = '<button type="button" id="done"><img class="doneImg" src="./img/check.svg" alt="done"></button>';
    buttonDelete.innerHTML = '<button type="button" id="delete" ><img class="deleteImg" src="./img/trash.svg" alt="delete"></button>'; 
    conteiner.appendChild(newTask);
    newTask.appendChild(text);
    newTask.appendChild(buttonDone);
    newTask.appendChild(buttonDelete);
}
