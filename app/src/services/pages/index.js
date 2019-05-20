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
 * returns -1 if the page is not loaded
 * or returns i indicating the index
 * @param title
 */
function pageIndex (title) {
    console.log()
    let pages = store.state.currentTabs
    for(let i in pages) {
        if(pages[i].title === title) {
            return i
        }
    }
    return -1
}

export {
    Page,
    HTMLPage,
    pageIndex
}