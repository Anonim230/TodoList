var root = document.getElementById("root")
var addTodo = document.getElementById("add_todo")
var table = document.getElementById("todo_table")
var todoBody = document.getElementById("todo_body")
var tr = document.getElementById("tr")
var enterTodo = "Please Enter todo"
var number = 1
    // deleter = event => event.target.parentNode.parentNode.removeChild(event.target)
appendChilds = (array, mother) => array.map(val => mother.appendChild(val))
todos = []
countDone = () => todos.filter(val => val.done)
deleter = event => {
    let found = todos.find((val, index) => val.id == event.target.parentNode.id ? todos.splice(index, 1) : false)
    if (found.done) done.innerHTML = +done.innerHTML - 1
    event.target.parentNode.remove()
    allTodos.innerHTML = todos.length
    localStorage.setItem('ToDoTodo', JSON.stringify(todos));
}



function* todoNumber() {
    while (true) {
        yield number++
    }
}
mark = event => {
    if (event.length) {
        let doneTodos = countDone()
        done.innerHTML = doneTodos.length
        for (let i of doneTodos) document.getElementById(i.id).classList.add('bg-success')
            // console.log(doneTodos);
        return true
    }
    if (event.target.id > 0) return false
    for (let i of todos) {
        i.done = (event.target.parentNode.id == i.id ? !i.done : i.done)
    }
    event.target.parentNode.classList.toggle('bg-success')
    let doneTodos = countDone()
    done.innerHTML = doneTodos.length
    localStorage.setItem('ToDoTodo', JSON.stringify(todos));
}

redactor = event => {
    let parent = event.target.parentNode,
        td = parent.children[1],
        redact = parent.children[2],
        del = parent.children[3],
        id = parent.id,
        ok = document.createElement('button'),
        no = document.createElement('button')
    ok.innerHTML = "Ok"
    no.innerHTML = "No"
    td.innerHTML = `<input type=text class='form-control'/>`
    let input = td.children[0]
    ok.classList.add('btn', 'btn-primary')
    no.classList.add('btn', 'btn-danger')
    redact.replaceWith(ok)
    del.replaceWith(no)
    input.focus()
    no.onclick = () => {
        todos.map((val) => {
            if (val.id == id) td.innerHTML = val.text
        })
        ok.innerHTML = 'Redact'
        ok.onclick = redactor
        no.innerHTML = 'Delete'
        no.onclick = deleter
        todoBody.focus()
    }
    ok.onclick = () => {
        if (!input.value) {
            input.placeholder = 'Enter todo to replace'
            return false
        }
        todos.map((val) => {
            if (val.id == id) {
                val.date = (new Date()).toLocaleString()
                parent.children[0].innerHTML = val.date
                val.text = input.value
                td.innerHTML = input.value
            }
        })
        todoBody.focus()
        ok.innerHTML = 'Redact'
        ok.onclick = redactor
        no.innerHTML = 'Delete'
        no.onclick = deleter
        localStorage.setItem('ToDoTodo', JSON.stringify(todos));
    }
    localStorage.setItem('ToDoTodo', JSON.stringify(todos));
}
window.onkeydown = event => event.code == "Enter" ? addTodoFunc() : true
addTodo.onclick = addTodoFunc = event => {
    if (todoBody.value && todoBody.value != enterTodo) {
        let check = document.createElement("input"),
            tr = document.createElement("tr"),
            td = document.createElement('td'),
            th = document.createElement('th'),
            redact = document.createElement('button'),
            todoObj = {
                text: todoBody.value,
                id: todoNumber().next().value,
                date: (new Date()).toLocaleString(),
                done: false
            }
        todos.push(todoObj)
            // delet = document.createElement('td'),
        del = document.createElement('button')
        del.classList.add('btn', 'btn-danger')
        del.onclick = deleter
        del.innerHTML = "Delete"
        redact.onclick = redactor
        redact.classList.add('btn', 'btn-primary')
        redact.innerHTML = "Redact"
        check.type = "checkbox"
        td.classList = "td"
        tr.id = todoObj.id
        th.setAttribute('scope', 'row')
        appendChilds([th, td, redact, del], tr)
            // tr.appendChild(check)
        tr.ondblclick = mark
        th.innerHTML = todoObj.date
        td.innerHTML = todoBody.value
        console.log(td);
        table.prepend(tr)
        allTodos.innerHTML = todos.length
        todoBody.value = ''
        localStorage.setItem('ToDoTodo', JSON.stringify(todos));
        todoBody.focus()
    } else {
        todoBody.value = enterTodo
        setTimeout(() => todoBody.value = "", 2021);
    }
}
if (localStorage.getItem('ToDoTodo')) {
    todos = JSON.parse(localStorage.getItem('ToDoTodo'))
    number = todos[todos.length - 1].id + 1
    for (let i of todos) {
        let check = document.createElement("input"),
            tr = document.createElement("tr"),
            td = document.createElement('td'),
            th = document.createElement('th'),
            redact = document.createElement('button'),
            todoObj = i
            // delet = document.createElement('td'),
        del = document.createElement('button')
        del.classList.add('btn', 'btn-danger')
        del.onclick = deleter
        del.innerHTML = "Delete"
        redact.onclick = redactor
        redact.classList.add('btn', 'btn-primary')
        redact.innerHTML = "Redact"
        check.type = "checkbox"
        td.classList = "td"
        tr.id = todoObj.id
        th.setAttribute('scope', 'row')
        appendChilds([th, td, redact, del], tr)
            // tr.appendChild(check)
        tr.ondblclick = mark
        th.innerHTML = todoObj.date
        td.innerHTML = todoObj.text
        console.log(td);
        table.prepend(tr)
        allTodos.innerHTML = todos.length
    }
    mark(todos)
}