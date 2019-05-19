function attachNameLabel(el, name) {
    let nameDiv = document.createElement("p")
    nameDiv.style="color: #E0F2F1; background-color:#424242"
    nameDiv.style.position = "absolute"
    nameDiv.style.top = "-27px"
    nameDiv.style.right = "-3px"
    nameDiv.innerHTML = "&nbsp;" + name
    el.appendChild(nameDiv)
}

function finishedAnnotation (el, name) {
    console.log(el + ' ' + name)
}

export {
    attachNameLabel,
    finishedAnnotation
}