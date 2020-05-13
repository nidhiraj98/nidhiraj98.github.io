normalTab = document.getElementById("normal")
matrixTab = document.getElementById("matrix")
equationsTab = document.getElementById("equations")
graphTab = document.getElementById("graph")

function tab(element){
    let temp = normalTab.className.split(" ")
    if(temp.indexOf("selected") != -1){
        normalTab.className = normalTab.className.replace(/\bselected\b/g, "")
    }
    temp = matrixTab.className.split(" ")
    if(temp.indexOf("selected") != -1){
        matrixTab.className = matrixTab.className.replace(/\bselected\b/g, "")
    }
    temp = graphTab.className.split(" ")
    if(temp.indexOf("selected") != -1){
        graphTab.className = graphTab.className.replace(/\bselected\b/g, "")
    }
    temp = equationsTab.className.split(" ")
    if(temp.indexOf("selected") != -1){
        equationsTab.className = equationsTab.className.replace(/\bselected\b/g, "")
    }
    document.getElementById("norm-container").style.display = "none"
    document.getElementById("matr-container").style.display = "none"
    document.getElementById("grap-container").style.display = "none"
    document.getElementById("equa-container").style.display = "none"
    var arr = element.className.split(" ")
    if (arr.indexOf("selected") == -1) {
        element.className += " " + "selected"
    }
    let curr = element.id.slice(0, 4) + "-container"
    document.getElementById(curr).style.display = "inline-flex"
}

function display(element){
    let value = element.value
    let textField = document.getElementById("current")
    let historyField = document.getElementById("history")
    if(!isNaN(value)){
        textField.value += value
    }
    else if(value === "+" || value === "-" || value === "*" || value === "/"){
        textField.value = textField.value + " " + value + " "
    }
    else if(value === "res"){
        newField = document.createElement("input")
        newField.type = "text"
        newField.readOnly = true
        newField.value = textField.value + " = " + eval(textField.value)
        historyField.insertBefore(newField, historyField.firstChild)
    }
}

function allClear(element){
    let textField = document.getElementById("current")
    if(element.value === "allClear")
        textField.value = " "
}