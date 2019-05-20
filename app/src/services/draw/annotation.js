import uuidv4 from 'uuid/v4'
import store from '../../store'
import annotationCache from '@/services/cache/annotation'

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

function addObjectToCache (imagePath, coordinates, name) {
    // check if imagePath already exists in annotation cache
    let result = annotationCache.result
    let imageObject
    let targetIdx = -1
    for (var idx in result) {
        if (result[idx]['imagePath'] === imagePath) {
            imageObject = result[idx]
            targetIdx = idx
        }
    }
    if (targetIdx === -1) {
        imageObject = {
            'imagePath' : imagePath,
            'annotation': []
        }
    }
    let annoObject = {
        'coordinates' : coordinates,
        'name':name
    }
    imageObject['annotation'].push(annoObject)
    if (targetIdx>=0) {
        result[targetIdx] = imageObject
    } else {
        result.push(imageObject)
    }
    
}

export {
    attachNameLabel,
    freezeElFrame,
    addObjectToCache
}