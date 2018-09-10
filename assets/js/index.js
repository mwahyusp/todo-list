let todo_list = JSON.parse(localStorage.todo_list) || [ ]


//Input form
const input_todo = document.getElementById("input_todo")
const input_button = document.getElementById("input_button")
const output_todo = document.getElementById("output_todo")

//Search form
const input_search = document.getElementById("input_search")
const search_button = document.getElementById("search_button")
const reset_search_button = document.getElementById("reset_search_button")

//Update form
const update_form_group = document.getElementById("update_form_group")
const input_update = document.getElementById("input_update")
const done_checkbox = document.getElementById("done_checkbox")
const update_button = document.getElementById("update_button")

//Event listeners
input_button.addEventListener("click", addTodo)
search_button.addEventListener("click", searchTodo)
reset_search_button.addEventListener("click", resetSearch)
window.onbeforeunload = function () {
    localStorage.todo_list = JSON.stringify(todo_list)
}


function addTodo() {
    todo_list.push({
        description: input_todo.value,
        done: false
    })
    displayTodo()
}

function displayTodo() {
    let temp = ""
    todo_list.forEach(function (list, index) {
        temp += `<div class="todos" onDblClick="openUpdateForm(${index})">
        <span>${list.description} - ${list.done}</span> 
        <button onClick="deleteTodo(${index})">X</button>
        </div>`
    })
    output_todo.innerHTML = temp
}

function deleteTodo(index) {
    todo_list.splice(index, 1)
    displayTodo()
}

function searchTodo() {
    let temp = ""
    todo_list.forEach(function (list, index) {
        if (list.description.includes(input_search.value)) {
            temp += `<div class="todos" onDblClick="openUpdateForm(${index})">
        <span>${list.description} - ${list.done}</span> 
        <button onClick="deleteTodo(${index})">X</button>
        </div>`
        }
    })
    output_todo.innerHTML = temp
}

function resetSearch() {
    input_search.value = ""
    displayTodo()
}

function openUpdateForm(index) {
    update_form_group.style.display = "block"

    input_update.value = todo_list[index].description
    done_checkbox.checked = todo_list[index].done
    update_button.onclick = function () {
        updateTodo(index)
    }
}

function updateTodo(index) {
    todo_list[index].description = input_update.value
    todo_list[index].done = done_checkbox.checked

    update_form_group.style.display = "none"
    displayTodo()
}

displayTodo()