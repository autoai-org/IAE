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

class WelcomePage extends HTMLPage {
    constructor () {
        let html = `
            <h1>Integrated Annotation Environment</h1>
            <h2>Annotating Evolved</h2>
        `
        super(html)
        this.title = 'Welcome'
    }
}

export {
    Page,
    HTMLPage,
    WelcomePage
}