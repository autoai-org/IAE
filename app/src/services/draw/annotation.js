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
    let applyButtonDiv = document.createElement("button")
    applyButtonDiv.style = "background-color:#66BB6A; height:24px"
    applyButtonDiv.style.position = "absolute"
    applyButtonDiv.style.bottom = "-27px"
    applyButtonDiv.style.right = "-3px"
    applyButtonDiv.innerHTML = '<i class="material-icons">done</i>'
    objectDiv.appendChild(applyButtonDiv)
    // create Remove Button
    let removeButtonDiv = document.createElement("button")
    removeButtonDiv.style = "background-color:#EF5350; height:24px"
    removeButtonDiv.style.position = "absolute"
    removeButtonDiv.style.bottom = "-27px"
    removeButtonDiv.style.right = "-30px"
    removeButtonDiv.innerHTML = '<i class="material-icons">delete</i>'
    objectDiv.appendChild(removeButtonDiv)
    /*
    // create intellise label
    let intlDiv = document.createElement("p")
    intlDiv.style="color: #E0F2F1; background-color:#424242"
    intlDiv.style.position = "absolute"
    intlDiv.style.bottom = "-45px"
    intlDiv.style.left = "-3px"
    intlDiv.innerHTML = "&nbsp;IntelliSense&nbsp;"
    objectDiv.appendChild(intlDiv)
    */
}

export {
    createIntellisenseElement
}