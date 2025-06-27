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
    todoText.classList.add("todoText");

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
        checkBtn.innerText = checkBtn.innerText === "" ? "V" : "";
        saveToDoList();
    });

    const delBtn = document.createElement('button');
    delBtn.innerText = 'X';
    delBtn.classList.add("delBtn");
    delBtn.addEventListener("click", function() {
        liNode.remove();
        saveToDoList();
    });

    //  편집 버튼 추가
    const editBtn = document.createElement('button');
    editBtn.innerText = '✎';
    editBtn.classList.add("editBtn");
    editBtn.addEventListener("click", function () {
        const input = document.createElement("input");
        input.type = "text";
        input.value = todoText.innerText;
        input.classList.add("editBox");

        const saveEdit = () => {
            if (input.value.trim() !== "") {
                todoText.innerText = input.value;
                liNode.replaceChild(todoText, input);
                saveToDoList();
            } else {
                liNode.replaceChild(todoText, input); 
            }
        };

        input.addEventListener("blur", saveEdit);
        input.addEventListener("keydown", (event) => {
            if (event.key === "Enter") saveEdit();
        });

        liNode.replaceChild(input, todoText);
        input.focus();
    });

    liNode.appendChild(checkBtn);
    liNode.appendChild(todoText);
    liNode.appendChild(editBtn); //  편집 버튼 부착
    liNode.appendChild(delBtn);

    const ulNode = document.querySelector('ul');
    ulNode.appendChild(liNode);
    document.querySelector('#todolist').style.display = 'block';
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
