import { azureAnalyzer } from './azure'
import { cvpmAnalyzer } from './cvpm'
import { config } from '../config'

function getAnalyzer() {
    switch (config.JSON.intellisense.provider) {
        case "Azure":
            return azureAnalyzer
        case "CVPM":
            return cvpmAnalyzer
        default:
            return azureAnalyzer
    }
}

export {
    getAnalyzer
}