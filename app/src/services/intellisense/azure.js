import Analyzer from './base'
import { config } from '@/services/config'
import axios from 'axios'
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

}

let azureAnalyzer = new AzureAnalyzer(config.JSON.intellisense.azure.key)

export {
    azureAnalyzer
}
