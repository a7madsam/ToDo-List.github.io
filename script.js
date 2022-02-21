var inputText = document.querySelector("#food-input");
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
function addListItem() {
    var div = document.createElement("div");
    var li = document.createElement("li");
    var newButton = document.createElement("button");
    li.appendChild(document.createTextNode(inputText.value));
    newButton.innerText = "Delete";
    div.appendChild(li);
    div.appendChild(newButton);
    ul.appendChild(div);
    inputText.value = "";
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
function textClick(comp) {
    if (comp.classList[0] === "spanStyle")
        comp.classList.remove("spanStyle");
    else {
        comp.classList.add("spanStyle");
    }
}
function buttonClicked(comp) {
    console.log(comp.parentElement);
    comp.parentElement.remove();
}
function doneOrDelete(event) {
    var comp = event.target;
    if (comp.tagName === "LI") {
        textClick(comp);
    } else if (comp.tagName === "BUTTON") {
        buttonClicked(comp);
    }
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
}
button.addEventListener("click", addAfterClick);
inputText.addEventListener("keypress", addAfterPress);
ul.addEventListener("click", doneOrDelete);
changeTheme.addEventListener("click", thChange);

