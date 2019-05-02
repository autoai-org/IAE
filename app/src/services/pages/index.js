import store from '@/store'
class Page {
    constructor () {
    }
}

class HTMLPage extends Page {
    constructor(html) {
        super()
        this.type = 'iae-html-page'
        this.content = html
    }
    getHTML () {
        return this.content
    }
}

// utility functions
/**
 * Check if page has opened
 * @param title
 */
function pageOpened (title) {
    let pages = store.state.currentTabs
    for(let i in pages) {
        if(pages[i].title === title) {
            return true
        }
    }
    return false
}

export {
    Page,
    HTMLPage,
    pageOpened
}