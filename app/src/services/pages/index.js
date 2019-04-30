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

export {
    Page,
    HTMLPage
}