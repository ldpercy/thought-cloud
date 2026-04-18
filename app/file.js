



/**
 * @param {File} fileObj
 */
export function loadFile(fileObj, callbackFn) {


	//document.forms['fileinput']['fileinput-textarea'].value = fileObj.text();
	//console.log(fileObj.text());		// ugh promise


	const reader = new FileReader();

	reader.addEventListener(
		"load",
		() => {
			callbackFn(reader.result.toString());
		},
		false,
	);

	if (fileObj) {
		reader.readAsText(fileObj);
	}

}








