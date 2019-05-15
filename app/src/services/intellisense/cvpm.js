import Analyzer from './base'
import { config } from '@/services/config'
import axios from 'axios'
import fs from 'fs'
import { ObjectDetectionConverter } from '@/services/intellisense/parser'

function getBlob(stream, mimeType) {
    return new Promise((resolve, reject) => {
        var chunks = []
        stream
            .on('data', function (chunk) {
                chunks.push(chunk)
            }).on('end', function () {
                var blob = mimeType
                    ? new Blob(chunks, { type: mimeType })
                    : new Blob(chunks)
                resolve(blob)
            }).on('error', function (err) {
                reject(err)
            })
    })

}

class CVPMAnalyzer extends Analyzer {
    constructor(endpoint) {
        super()
        this.endpoint = endpoint
    }
    async handleSingle(filepath) {
        let payload = new FormData()
        /*
        let image = await fs.promises.readFile(filepath)
        console.log(image)
        let filename = filepath.substring(filepath.lastIndexOf("/") + 1)
        let filestream = fs.createReadStream(filepath)
        console.log(filestream)
        */
        let filename = filepath.substring(filepath.lastIndexOf("/") + 1)
        let filestream = fs.createReadStream(filepath)
        let file = await getBlob(filestream)
        file.name = filename
        console.log(filename)
        payload.append('file', file, { filename: filename })
        payload.append('delete_after_process', "True")
        console.log(payload)
        return await new Promise((resolve, reject) => {
            axios.post(this.endpoint, payload).then(function (res) {
                const newMap = res.data.map(function(each) {
                    return ObjectDetectionConverter.Parse(each, "cvpm", "azure")
                })
                console.log(newMap)
                resolve({'data': newMap})
            }).catch(function (err) {
                reject(err)
            })
        })
    }
}

let cvpmAnalyzer = new CVPMAnalyzer(config.JSON.intellisense.cvpm.endpoint)

export {
    cvpmAnalyzer
}