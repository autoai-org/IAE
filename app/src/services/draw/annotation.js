function createIntellisenseElement(parentDiv, x, y, w, h, name, confidence) {
    let objectDiv = document.createElement("div")
    objectDiv.className += ("intellisense-object")
    objectDiv.style.position = "absolute"
    objectDiv.style.border = '3px dotted #FF0000';
    objectDiv.style.top = y + 'px'
    objectDiv.style.left = x + 'px'
    objectDiv.style.width = w + 'px'
    objectDiv.style.height = h + 'px'
    parentDiv.appendChild(objectDiv)
    if (name) {
        // create name element
        let nameDiv = document.createElement("p")
        nameDiv.style="color: #E0F2F1; background-color:#424242"
        nameDiv.style.position = "absolute"
        nameDiv.style.top = "-27px"
        nameDiv.style.right = "-3px"
        nameDiv.innerHTML = "&nbsp;" + name + " " + confidence + "&nbsp;"
        objectDiv.appendChild(nameDiv)
    }
    // create Apply Button
    let buttonDiv = document.createElement("button")
    buttonDiv.style = "background-color:#66BB6A; height:24px"
    buttonDiv.style.position = "absolute"
    buttonDiv.style.bottom = "-27px"
    buttonDiv.style.right = "-3px"
    buttonDiv.innerHTML = '<i class="material-icons">done</i>'
    objectDiv.appendChild(buttonDiv)
    // create intellise label
    let intlDiv = document.createElement("p")
    intlDiv.style="color: #E0F2F1; background-color:#424242"
    intlDiv.style.position = "absolute"
    intlDiv.style.bottom = "-45px"
    intlDiv.style.left = "-3px"
    intlDiv.innerHTML = "&nbsp;IntelliSense&nbsp;"
    objectDiv.appendChild(intlDiv)
}

export {
    createIntellisenseElement
}