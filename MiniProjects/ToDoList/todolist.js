window.onload = function() {
    const savedToDoList = JSON.parse(localStorage.getItem('todolist'))
    if (savedToDoList) {
        for (let todo of savedToDoList) {
            createToDo(todo)
        }
    }
    const startBtn = document.querySelector("#addBtn");
    startBtn.addEventListener("click", () => createToDo());
    const inputBox = document.querySelector("#inputBox")
    inputBox.addEventListener("keydown", function(event) {
        if (event.key==='Enter')
            createToDo();
    });
}

function createToDo(todo) {
    if (todo == "" && inputBox.value == "") return;
    
    const liNode = document.createElement('li');
    const checkBtn = document.createElement('button');
    checkBtn.classList.add("checkBtn");
    const todoText = document.createElement('span');
    if (todo) {
        todoText.innerText = todo.contents;
        if (todo.check) {
            todoText.classList.add('check');
            checkBtn.innerText = 'V';
        }
    } else {
        todoText.innerText = inputBox.value;
    }
    checkBtn.addEventListener("click", function() {
        todoText.classList.toggle('check');
        if (checkBtn.innerText == "")
            checkBtn.innerText = 'V';
        else {
            checkBtn.innerText = "";
        }
        console.log("save to list")
        saveToDoList();
    });
    const delBtn = document.createElement('button');
    delBtn.innerText = 'X';
    delBtn.classList.add("delBtn");
    delBtn.addEventListener("click", function() {
        liNode.remove();
        saveToDoList();
    });
    liNode.appendChild(checkBtn);
    liNode.appendChild(todoText);
    liNode.appendChild(delBtn);
    
    const ulNode = document.querySelector('ul');
    ulNode.appendChild(liNode);
    document.querySelector('#todolist').style.display = 'block'
    saveToDoList();
}

function saveToDoList() {
    const todoList = document.querySelectorAll('li');
    if (todoList.length == 0) return;
    const saveItems = [];
    for (let node of todoList) {
        const todo = node.querySelector('span').innerText;
        const check = node.querySelector('span').classList.contains('check');
        const todoObj = {
            contents : todo,
            check : check
        };
        saveItems.push(todoObj);
    }
    const list = JSON.stringify(saveItems);
    localStorage.setItem('todolist', list);
}

//  전체 삭제 버튼 기능 추가
document.addEventListener("DOMContentLoaded", function () {
    const clearBtn = document.querySelector("#clearBtn");
    if (clearBtn) {
        clearBtn.addEventListener("click", function () {
            const todoList = document.querySelector("#todolist");
            todoList.innerHTML = "";
            localStorage.removeItem("todolist");
            todoList.style.display = "none";
        });
    }
});

//  To Do 편집 기능 추가
document.addEventListener("DOMContentLoaded", function () {
    const todoList = document.querySelector("#todolist");

    todoList.addEventListener("dblclick", function (e) {
        if (e.target.tagName === "SPAN") {
            const span = e.target;
            const li = span.closest("li");
            const input = document.createElement("input");
            input.type = "text";
            input.value = span.innerText;
            input.classList.add("editBox");

            const saveEdit = () => {
                if (input.value.trim() !== "") {
                    span.innerText = input.value;
                    li.replaceChild(span, input);
                    saveToDoList(); 
                }
            };

            input.addEventListener("blur", saveEdit);
            input.addEventListener("keydown", (event) => {
                if (event.key === "Enter") saveEdit();
            });

            li.replaceChild(input, span);
            input.focus();
        }
    });
});
