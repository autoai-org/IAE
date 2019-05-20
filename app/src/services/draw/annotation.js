import uuidv4 from 'uuid/v4'
import store from '../../store'
function attachNameLabel(el, name) {
    let nameDiv = document.createElement("p")
    nameDiv.style="color: #E0F2F1; background-color:#424242"
    nameDiv.style.position = "absolute"
    nameDiv.style.top = "-27px"
    nameDiv.style.right = "-3px"
    nameDiv.innerHTML = "&nbsp;" + name
    el.appendChild(nameDiv)
}

function freezeElFrame (el, name) {
    el.id = name +'-'+uuidv4().split('-')[0]
    addNamestoWorkplace(name)
}

function addNamestoWorkplace (name) {
    store.state.annotatedObjects.push(name)
}

export {
    attachNameLabel,
    freezeElFrame
}