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
        const constPath = path.join(this.iaePath, 'config.json')
        const flag = jetpack.exists(constPath)
        if (!flag) {
          this.write()
        } else {
          this.JSON = jetpack.read(constPath)
        }
    }
}

let config = new Config()

export {
    config
}
