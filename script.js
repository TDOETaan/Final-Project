const pomodoroBtns = document.querySelectorAll('.button')
const pomodoroBtn = document.getElementById('pomodoro-btn')
const shortBreakBtn = document.getElementById('short-break-btn')
const startBtn = document.getElementById('start-btn')
const countdownTimer = document.getElementById('countdown')


let tasks = []
let minutes = 25
let seconds = 60
let pause = true
let pomodoro = "pomodoro"
let pomodorosCompleted = 0
let selectedTaskElement

//to do list

const form = document.querySelector('#todo-form')
const input = document.querySelector('#input')
const buttons = document.querySelectorAll('.view')
const allBtn = document.querySelector('#all')
const list = document.querySelector('#list')
const completeAllBtn = document.querySelector('#mark-as-complete')
const STORAGE_PREFIX = "TODO_LIST"
const TODOS_STORAGE_KEY = `${STORAGE_PREFIX}-todos`
let todos = []
todos.forEach(addTodoToList)

// event listener for pomodoro buttons
document.addEventListener('click', e => {
    if (!e.target.matches('.button')) return

    // reset when pomodoro button selected
    pause = true
    seconds = 60
    startBtn.innerHTML = "Start"

    // only selected button has selected class
    pomodoroBtns.forEach(button => {
        button.classList.remove('selected')
    })
    e.target.classList.add('selected')

    // set timer
    if (e.target.matches('#pomodoro-btn')) {
        countdownTimer.innerHTML = '25:00'
        pomodoro = "pomodoro"
        minutes = 25
    } else if (e.target.matches('#short-break-btn')) {
        countdownTimer.innerHTML = '05:00'
        pomodoro = "short break"
        minutes = 5
    }
})

// event listener for start button
startBtn.addEventListener('click', () => {
    // if countdown is paused, start/resume countdown, otherwise, pause countdown
    if (pause) {
        startBtn.innerHTML = "Pause"
        pause = false
        countdown()
    } else if (!pause) {
        startBtn.innerHTML = "Start"
        pause = true
    }
})

// countdown function
function countdown() {
    // return if countdown is paused
    if (pause) return

    // set minutes and seconds
    let currentMins = minutes - 1
    seconds--
    countdownTimer.innerHTML = (currentMins < 10 ? "0" : "") + currentMins.toString() + ':' + (seconds < 10 ? "0" : "") + String(seconds)

    // count down every second, when a minute is up, countdown one minute
    // when time reaches 0:00, reset
    if (seconds > 0) {
        setTimeout(countdown, 1000);
    } else if (currentMins > 0) {
        seconds = 60
        minutes--
        countdown();
    } else if (currentMins === 0) {
        audio.play()
        reset()
    }
}

// reset function when countdown ends
function reset() {
    // set to start the next round    
    startBtn.innerHTML = "Start"
    pause = true

    pomodoroBtns.forEach(button => {
        button.classList.remove('selected')
    })

    // if current round is a break, set for pomodoro
    if (pomodoro === "short break") {
        pomodoro = "pomodoro"
        countdownTimer.innerHTML = '25:00'
        minutes = 25
        pomodoroBtn.classList.add('selected')
        return
    }

    // if current round is a pomodoro, set for break
    // if less than four pomodoros have been completed, go to short break
    // if four pomodoros have been completed, go to long break
    if (pomodoro === "pomodoro" && pomodorosCompleted < 4) {
        pomodorosCompleted++
        pomodoro = "short break"
        countdownTimer.innerHTML = '05:00'
        minutes = 5
        shortBreakBtn.classList.add('selected')
    } else if (pomodoro === "pomodoro" && pomodorosCompleted === 4) {
        pomodorosCompleted = 0
        pomodoro = "long break"
        countdownTimer.innerHTML = '15:00'
        minutes = 15
        longBreakBtn.classList.add('selected')
    }

    // if a task has been selected
    if (selectedTaskElement != null) {
        const selectedTaskId = selectedTaskElement.dataset.taskId
        const current = tasks.find(task => task.id === selectedTaskId)
        current.completedPomodoros++
        const pomodoroCount = selectedTaskElement.querySelector('.pomodoro-count')
        pomodoroCount.innerHTML = current.completedPomodoros.toString() + '/' + current.totalPomodoros
    }

    // TODO add option to start next round automatically
}

function newElement() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {
        alert("You must write something!");
    } else {
        document.getElementById("myUL").appendChild(li);
    }
    document.getElementById("myInput").value = "";

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            var div = this.parentElement;
            div.style.display = "none";
        }
    }
}
//tomato lego Moves
function tomatoDance() {
    document.getElementById("tomatoImg").style.transform = "rotate(60deg)";
}
//Pop-up box
var user_name = document.getElementById("input");
document.getElementById("btn").addEventListener("click", function () {
    var value = user_name.value.trim();
    if (!value)
        alert("Don't forget to type your task in the text box before click an add button");
    else
        alert("Item has been added your To Do List");  
});

//to do list


// submit form
form.addEventListener("submit", e => {
    e.preventDefault()

    const userInput = input.value
    if (userInput === "") return

    const newTodo = {
        name: userInput,
        complete: false,
        id: new Date().valueOf().toString()
    }

    todos.push(newTodo)
    addTodoToList(newTodo)
    input.value = ""

    buttons.forEach(button => {
        if (todos.length > 0)
            button.classList.remove('hide')
    console.log("submit")
    })
})

// show all todos
//allBtn.addEventListener("click", () => {
    //const allItems = Array.from(list.children)
    //allItems.forEach(todo => todo.classList.remove('hide'))
//})

// only show completed items
//completedBtn.addEventListener("click", () => {
    //const allItems = Array.from(list.children)
    //allItems.forEach(todo => todo.classList.remove('hide'))
    //const completed = allItems.filter(todo => !todo.classList.contains('complete'))
    //completed.forEach(todo => todo.classList.add('hide'))
//})

// only show uncompleted items
//nonCompletedBtn.addEventListener("click", () => {
    //const allItems = Array.from(list.children)
    //allItems.forEach(todo => todo.classList.remove('hide'))
    //const completed = allItems.filter(todo => todo.classList.contains('complete'))
    //completed.forEach(todo => todo.classList.add('hide'))
//})

// clear list
//clearBtn.addEventListener("click", () => {
    //const allItems = Array.from(list.children)
    //allItems.forEach(item => item.remove())
    //todos = []
    //buttons.forEach(button => {
        //button.classList.add('hide')
    //})
//})

// mark all items as completed
//completeAllBtn.addEventListener("click", () => {
    //const allItems = Array.from(list.children)
    //allItems.forEach(item => {
        //item.classList.add('complete')
        //const button = item.children[1]
        //button.classList.add('item-complete')
    //})

    //for (let i = 0; i < allItems.length; i++) {
        //const currentItem = allItems[i]

        //const todoId = currentItem.dataset.todoId
        //const todo = todos.find(todo => todo.id === todoId)
        //todo.complete = currentItem.classList.contains('complete')
        //currentItem.querySelector('.checkbox').checked = true
    //}
//})

// mark item as complete ( if user clicks outside of label )
//list.addEventListener("click", e => {
    //if (!e.target.matches('.list-item')) return

    //const currentItem = e.target
    //currentItem.classList.toggle('complete')

    //const todoId = e.target.dataset.todoId
    //const todo = todos.find(todo => todo.id === todoId)
    //todo.complete = currentItem.classList.contains('complete')
    //currentItem.querySelector('.checkbox').checked = todo.complete
//})

// checkboxes
list.addEventListener("change", e => {
    if (!e.target.matches('.checkbox')) return

    const parent = e.target.closest('.list-item')
    const button = parent.children[1]

    if (e.target.checked) {
        parent.classList.add('complete')
        button.classList.add('item-complete')
    } else {
        parent.classList.remove('complete')
        button.classList.remove('item-complete')
    }

    const todoId = parent.dataset.todoId
    const todo = todos.find(todo => todo.id === todoId)
    todo.complete = parent.classList.contains('complete')
})

// delete item
list.addEventListener("click", e => {
    if (!e.target.matches('.delete-button')) return

    parent = e.target.closest('.list-item')
    parent.remove()
    const todoId = parent.dataset.todoId
    todos = todos.filter(todo => todo.id !== todoId)

    buttons.forEach(button => {
        if (todos.length === 0)
            button.classList.add('hide')
    })
})

// render todo
function addTodoToList(todo) {
    const item = document.createElement('li')
    item.classList.add('list-item')
    item.dataset.todoId = todo.id

    const label = document.createElement('label')

    const checkbox = document.createElement('input')
    checkbox.setAttribute("type", "checkbox")
    checkbox.classList.add('checkbox')
    checkbox.checked = todo.complete

    if (checkbox.checked) {
        item.classList.add('complete')
    } else (item.classList.remove('complete'))

    label.appendChild(checkbox)

    const span = document.createElement('span')
    span.innerText = todo.name
    label.appendChild(span)
    item.appendChild(label)

    const button = document.createElement('button')
    button.innerText = "Delete"
    button.classList.add('delete-button')
    item.appendChild(button)

    list.appendChild(item)
}