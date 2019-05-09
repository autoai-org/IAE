import Analyzer from './base'
import { config } from '@/services/config'
import axios from 'axios';
import fs from 'fs'
class AzureAnalyzer extends Analyzer {

    constructor(key) {
        super()
        this.url = 'https://southeastasia.api.cognitive.microsoft.com'
        this.key = key
    }
    async handleSingle(filepath) {
        let headers = {
            'Ocp-Apim-Subscription-Key': this.key,
            'Content-Type': 'application/octet-stream'
        }
        let params = { 'visualFeatures': 'objects' }
        const body = fs.readFileSync(filepath);
        return await axios.post(
            this.url + '/vision/v2.0/analyze',
            body,
            {
                headers: headers,
                params: params
            }
        )
    }
    async handleArray(filepaths) {
        let cachedResults = []
        for (let i in filepaths) {
            var stat = fs.statSync(filepaths[i]);
            if (stat.isFile()) {
                let res = await this.handleSingle(filepaths[i])
                cachedResults.push({
                    path: filepaths[i],
                    result: res.data
                })
            }
        }
        this.Results = cachedResults
    }
}

let azureAnalyzer = new AzureAnalyzer(config.JSON.intellisense.key)

export {
    azureAnalyzer
}