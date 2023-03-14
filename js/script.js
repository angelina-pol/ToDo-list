'use strict'

window.onload = init;

function init() {
    const add = document.getElementById('add');
    add.onclick = function() {
        createTask();
    }
};

function createTask() {
    let conteiner = document.getElementById('conteinerTask');
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
