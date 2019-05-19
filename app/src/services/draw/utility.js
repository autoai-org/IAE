function getElementOffset(element, property) {
	//Calculate the actual property name
	if (property == "offsetLeft" || property == "offsetTop") {
		var actualOffset = element[property];
		var current = element.offsetParent;

		//Look up the node tree to add up all the offset value
		while (current != null) {
			actualOffset += current[property];
			current = current.offsetParent;
		}

		return actualOffset;
	} else if (property == "offsetHeight" || property == "offsetWidth") {
		return element[property];
	}

	return false;
}

export {
    getElementOffset
}