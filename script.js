var inputText = document.querySelector("#task-input");
var button = document.querySelector("button");
var ul = document.querySelector("ul");
var changeTheme = document.querySelector(".footer .change-theme");
function validateForClick() {
    if (!inputText.value.length) {
        return false;
    }
    return true;
}
function validateForPress(event) {
    if (!inputText.value.length || event.keyCode !== 13) {
        return false;
    }
    return true;
}
let addListItemFromLocal = function (inputData) {
    var div = document.createElement("div");
    var li = document.createElement("li");
    var newButton = document.createElement("button");
    let liText = document.createTextNode(inputData.taskText);
    li.appendChild(liText);
    newButton.innerText = "Delete";
    div.appendChild(li);
    div.appendChild(newButton);
    ul.appendChild(div);
    inputText.value = "";
    //for TextClick
    if (inputData.done) {
        li.classList.add("spanStyle");
    } else {
        li.classList.remove("spanStyle");
    }
    updateCounter();
}
if (window.localStorage.tasks) {
    let newData = JSON.parse(window.localStorage.getItem("tasks"));
    newData.forEach(element => {
        addListItemFromLocal(element);
    });
}
function setTasks(tasksArray) {
    window.localStorage.setItem("tasks", JSON.stringify(tasksArray));
}
let addListItem = function () {
    var div = document.createElement("div");
    var li = document.createElement("li");
    var newButton = document.createElement("button");
    let liText = document.createTextNode(inputText.value);
    li.appendChild(liText);
    newButton.innerText = "Delete";
    div.appendChild(li);
    div.appendChild(newButton);
    ul.appendChild(div);
    updateCounter();
    if (window.localStorage.tasks) {
        let ourTasks = JSON.parse(window.localStorage.tasks);
        ourTasks.push({
            id: div.id,
            taskText: inputText.value,
            done: false
        })
        setTasks(ourTasks);
    }
    else {
        setTasks([{ id: div.id, taskText: inputText.value, done: false }]);
    }
    inputText.value = "";
}
function updateCounter() {
    let divs = document.querySelectorAll("ul div");
    for (let i = 0; i < divs.length; i++) {
        divs[i].id = i;
    }
    if (window.localStorage.tasks) {
        let ourTasks = JSON.parse(window.localStorage.tasks);
        for (let i = 0; i < ourTasks.length; i++) {
            ourTasks[i].id = i;
        }
        setTasks(ourTasks);
    }
}
function addAfterClick() {
    if (validateForClick()) {
        addListItem();
    }
}
function addAfterPress(event) {
    if (validateForPress(event)) {
        addListItem();
    }
}
function buttonClicked(comp) {

    comp.parentElement.remove();
}
function deleteFromLocalStorage(idNumber) {
    let ourTasks = JSON.parse(window.localStorage.tasks);
    let newTasks = ourTasks.filter(element => {
        return element.id != idNumber;
    });
    setTasks(newTasks);
}
function textClick(comp) {
    if (comp.classList[0] === "spanStyle")
        comp.classList.remove("spanStyle");
    else {
        comp.classList.add("spanStyle");
    }
}
function doneOrDelete(event) {
    var comp = event.target;
    if (comp.tagName === "LI") {
        let ourTasks = JSON.parse(window.localStorage.tasks);
        ourTasks.forEach((element) => {
            if (element.id == comp.parentElement.id) {
                if (element.done) {
                    element.done = false;
                } else {
                    element.done = true;
                }
            }
        });
        setTasks(ourTasks);
        textClick(comp);
    } else if (comp.tagName === "BUTTON") {
        let idNumber = comp.parentElement.id;
        buttonClicked(comp);
        deleteFromLocalStorage(idNumber);
        updateCounter();
    }
}
if (window.localStorage.theme) {
    document.documentElement.style.setProperty("--main-color", window.localStorage.theme);
} else {
    window.localStorage.theme = document.documentElement.style.getPropertyValue("--main-color");
}
function thChange(event) {
    var comp = event.target;
    if (comp.id === "two") {
        document.documentElement.style.setProperty("--main-color", "#f44336");
    } else if (comp.id === "three") {
        document.documentElement.style.setProperty("--main-color", "#9c27b0");
    } else if (comp.id === "four") {
        document.documentElement.style.setProperty("--main-color", "#e91e63");
    } else if (comp.id === "one") {
        document.documentElement.style.setProperty("--main-color", "#007bff");
    }
    window.localStorage.theme = document.documentElement.style.getPropertyValue("--main-color");
}
button.addEventListener("click", addAfterClick);
inputText.addEventListener("keypress", addAfterPress);
ul.addEventListener("click", doneOrDelete);
changeTheme.addEventListener("click", thChange);

