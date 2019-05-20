import annotationCache from '@/services/cache/annotation'
import store from '@/store'
function saveBinding() {
    let keys = {
        'ctrl': false,
        's': false
    }
    document.addEventListener('keydown', function (event) {
        if (event.keyCode === 17) {
            keys['ctrl'] = true
        } else if (event.keyCode === 83) {
            keys['s'] = true
        }
        if (keys['ctrl'] && keys['s']) {
            console.log('saving')
            console.log(store.state.currentPath)
            annotationCache.writeAnnotated(store.state.currentPath)
            // set it back after saving
            keys = {
                'ctrl': false,
                's': false
            }
        }

    })
}

function bootstrap() {
    saveBinding()
}

export default bootstrap