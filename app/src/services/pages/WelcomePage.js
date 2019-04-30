import { HTMLPage } from '@/services/pages'


class WelcomePage extends HTMLPage {
    constructor() {
        let html = `
            <h1>Integrated Annotation Environment</h1>
            <h3>Annotating Evolved</h3>
            <section>Start</section>     
        `
        super(html)
        this.title = 'Welcome'
    }
}

export { WelcomePage }