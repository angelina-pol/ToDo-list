'use strict'

const tasks = getTasks('savedTasks') || [];

window.onload = init;

function init() {
    console.log('start of init');
    const add = document.getElementById('add');
    let select = document.getElementById('sel');

    let selectedOption = 'active';

    select.onchange = function () {
        selectedOption = getSelectedOption(select.selectedIndex);

        changeSelectByState(selectedOption);
    };

    add.onclick = function () {
        if (selectedOption === 'active') {
            createTask(document.getElementById('newtask').value, false);
        }
        document.getElementById("newtask").value = "";      // очистить значение поля ввода
    };

    for (const task of tasks) {
        createTask(task, true);
    }
}

function getSelectedOption(index) {
    switch (index) {
        case 1:
            return 'active';
        case 2:
            return 'completed';
        case 3:
            return 'deleted';
    }
}

function changeSelectByState(state) {
    const conteinerCompleted = document.getElementById('completedTaskConteiner');
    const conteinerDeleted = document.getElementById('deletedTaskConteiner');
    const conteinerActive = document.getElementById('activeTaskConteiner');

    conteinerActive.classList[state === 'active' ? 'remove' : 'add']('invisible');
    conteinerCompleted.classList[state === 'completed' ? 'remove' : 'add']('invisible');
    conteinerDeleted.classList[state === 'deleted' ? 'remove' : 'add']('invisible');
}

function createTask(task, isInit) {
    const conteinerActive = document.getElementById('activeTaskConteiner');
    const conteinerCompleted = document.getElementById('completedTaskConteiner');
    const conteinerDeleted = document.getElementById('deletedTaskConteiner');
    const newTask = document.createElement('div');
    const text = document.createElement('div');
    const buttonDone = document.createElement('div');
    const buttonDelete = document.createElement('div');
    newTask.classList.add('task');
    text.classList.add('textStyle');
    text.innerHTML = task.caption || task;
    buttonDone.innerHTML = '<button type="button" class="done"><img class="doneImg" src="./img/check.svg" alt="done"></button>';
    buttonDelete.innerHTML = '<button type="button" class=delete""><img class="deleteImg" src="./img/trash.svg" alt="delete"></button>';

    newTask.appendChild(text);
    newTask.appendChild(buttonDone);
    newTask.appendChild(buttonDelete);

    if (!isInit) {
        tasks.push({
            caption: task,
            state: 'active',
        });
        saveTasks(tasks);
    }

    switch (task.state) {
        case 'completed':
            conteinerCompleted.appendChild(newTask);
            break;
        case 'deleted':
            conteinerDeleted.appendChild(newTask);
            break;
        default:
            conteinerActive.appendChild(newTask);
    }


    buttonDone.onclick = function () {
        conteinerActive.removeChild(newTask);
        conteinerCompleted.appendChild(newTask);
        newTask.style.backgroundColor = '#E8FFC4';
        newTask.style.border = '5px solid #79A630';
        buttonDone.classList.add('buttonDone');
        buttonDelete.classList.add('buttonDelete');

        const foundTask = tasks.find((t) => t.caption === (task.caption || task));
        foundTask.state = 'completed';
        saveTasks(tasks);
    };

    buttonDelete.onclick = function () {
        conteinerActive.removeChild(newTask);
        conteinerDeleted.appendChild(newTask);
        newTask.style.backgroundColor = '#FFC4E1';
        newTask.style.border = '5px solid #A6306A';
        buttonDone.classList.add('buttonDone');
        buttonDelete.classList.add('buttonDelete');

        const foundTask = tasks.find((t) => t.caption === (task.caption || task));
        foundTask.state = 'deleted';
        saveTasks(tasks);
    }
}

function saveTasks(tasks) {
    localStorage.setItem('savedTasks', JSON.stringify(tasks));
}

function getTasks(key) {
    return JSON.parse(localStorage.getItem(key));
}

console.log('end of script');
