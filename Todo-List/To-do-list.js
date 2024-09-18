// let todoList = [
    //     {
    //         text: "Learn HTML",
    //         uniqueNo: 1
    //     },
    //     {
    //         text: "Learn CSS",
    //         uniqueNo: 2
    //     },
    //     {
    //         text: "Learn JavaScript",
    //         uniqueNo: 3
    //     }
    // ];

    let saveTodoButton = document.getElementById("saveTodoButton");
    saveTodoButton.onclick = function(){
    localStorage.setItem("todoList", JSON.stringify(todoList));
    }

    function getTodoListFromLocalStorage(){
        let stringifiedTodoList = localStorage.getItem("todoList");
        let parsedTodoList = JSON.parse(stringifiedTodoList);

        if(parsedTodoList === null)
            return [];
        else    
            return parsedTodoList;
    }
    
    let todoList = getTodoListFromLocalStorage();

    let todoCount = todoList.length;

    function onTodoStatusChanged(checkboxId, labelId, todoId){
        let inputElement = document.getElementById(checkboxId);
        let labelElement = document.getElementById(labelId);

        labelElement.classList.toggle("checked");
        // if(inputElement.checked){
        //     labelElement.classList.add("checked");
        // }
        // else{
        //     labelElement.classList.remove("checked");
        // }

        let todoObjectIndex = todoList.findIndex(function(eachTodo){
          let eachTodoId = "todo"+eachTodo.uniqueNo;
          if(eachTodoId === todoId){
            return true;
          }
          else{
            return false;
          }
        });

        let todoObject = todoList[todoObjectIndex];
        if(todoObject.isChecked === true){
          todoObject.isChecked = false;
        }
        else{
          todoObject.isChecked = true;
        }
    }

    function onDeleteTodo(todoId){
        let todoElement = document.getElementById(todoId);
        todoItemsContainer.removeChild(todoElement);

        let deletedTodoListIndex = todoList.findIndex(function(eachTodo){
          let eachTodoId = "todo"+eachTodo.uniqueNo;
          if(eachTodoId === todoId){
            return true;
          }
          else{
            return false;
          }
        });
        todoList.splice(deletedTodoListIndex, 1);
    }

    function createAndAppendTodo(todo) {
        let checkboxId = "checkbox" + todo.uniqueNo;
        let labelId = "label" + todo.uniqueNo;
        let todoId = "todo" + todo.uniqueNo;

        let todoItemsContainer = document.getElementById("todoItemsContainer");
        let todoItemContainer = document.createElement('li');
        todoItemContainer.id = todoId;
        todoItemContainer.classList.add("todo-item-container", "d-flex", "flex-row");
        todoItemsContainer.appendChild(todoItemContainer);

        let checkboxInput = document.createElement('input');
        checkboxInput.type = "checkbox";
        checkboxInput.id = checkboxId;
        checkboxInput.checked = todo.isChecked;
        checkboxInput.classList.add("checkbox-input");
        checkboxInput.onclick = function(){
            onTodoStatusChanged(checkboxId, labelId, todoId);
        } 
        todoItemContainer.appendChild(checkboxInput);
        
        let labelContainer = document.createElement("div");
        labelContainer.classList.add("label-container", "d-flex", "flex-row");
        todoItemContainer.appendChild(labelContainer);

        let labelElement = document.createElement('label');
        labelElement.classList.add("checkbox-label");
        labelElement.setAttribute("for", checkboxId);
        labelElement.textContent = todo.text;
        labelElement.id = labelId;
        if(todo.isChecked === true){
          labelElement.classList.add("checked");
        };
        labelContainer.appendChild(labelElement);

        let deleteIconContainer = document.createElement('div');
        deleteIconContainer.classList.add("delete-icon-container");
        labelContainer.appendChild(deleteIconContainer);

        let deleteIcon = document.createElement('i');
        deleteIcon.onclick = function(){
            onDeleteTodo(todoId);
        }
        deleteIcon.classList.add("fa-regular", "fa-trash-can", "fa-xl", "delete-icon");
        deleteIconContainer.appendChild(deleteIcon);

        console.log(todoItemsContainer);
    }

    for(let todo of todoList){
        createAndAppendTodo(todo);
    }   

    function onAddTodo(){
        let todoUserInput = document.getElementById("todoUserInput");
        let todoUserInputValue = todoUserInput.value;
        todoCount = todoCount + 1;

        if(todoUserInputValue === ""){
            alert("Enter Valid Text");
            return;
        }

        let newTodo = {
            text: todoUserInputValue,
            uniqueNo: todoCount,
            isChecked: false
        }
        todoList.push(newTodo);

        createAndAppendTodo(newTodo);
        todoUserInput.value = "";
    }

    let addTodo = document.getElementById("onAddTodoButton");
    addTodo.onclick = function(){
        onAddTodo();
    }