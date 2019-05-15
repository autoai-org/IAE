class Converter {
    constructor() {

    }
}

class ObjectDetectionConverter extends Converter {
    constructor () {
        super()
    }
    static Parse (result, from, target) {
        // use azure result as intermediate for other target
        let intermediate = {}
        if (from === "cvpm") {
            intermediate = ObjectDetectionConverter.ParseCVPMDefault(result)
        }

        if (target === "azure") {
            return intermediate
        }
    }
    static ParseCVPMDefault(source) {
        let objects = []
        for (var i in source) {
            console.log(source[i])
            console.log(source[i]['x_start'])
            let object_x = source[i]['x_start']
            let object_y = source[i]['y_start']
            let object_w = source[i]['x_end'] - source[i]['x_start']
            let object_h = source[i]['y_end'] - source[i]['y_start']
            let object_name = source[i]['label']
            let object_confidence = source[i]['confidence']
            let intermediateObject = {
                "rectangle": {
                    "x" : object_x,
                    "y" : object_y,
                    "w" : object_w,
                    "h" : object_h
                },
                "object" : object_name,
                "confidence" : object_confidence
            }
            objects.push(intermediateObject)
        }
        return objects
    }
}


export {
    ObjectDetectionConverter
}