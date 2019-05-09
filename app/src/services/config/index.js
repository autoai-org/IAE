import os from 'os'
import path from 'path'
import jetpack from 'fs-jetpack'

class Config {
    constructor() {
        this.intellisense = {
            provider: '',
            key: '',
            secret: ''
        }
        this.iaePath = path.join(os.homedir(), 'autoai', 'iae')
        this.read()
    }
    validate() {

    }
    get JSON() {
        return {
            'intellisense' : this.intellisense
        }
    }
    set JSON(val) {
        this.intellisense = val.intellisense
    }
    parse() {

    }
    write() {
        jetpack.write(path.join(this.iaePath, 'config.json'), this.JSON)
    }
    read() {
        this.JSON = jetpack.read(path.join(this.iaePath, 'config.json'), "json")
    }
}

let config = new Config()

export {
    config
}