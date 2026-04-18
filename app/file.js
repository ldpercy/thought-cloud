
import * as tcdoc from "./thoughtcloud-document.js"





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





export function saveDocument() {

	const saveDoc = new tcdoc.ThoughtcloudDocument();

	saveDoc.title = 'Thought cloud document'
	saveDoc.content = document.getElementById('group-page').innerHTML;

	console.debug(saveDoc);

	const html = tcdoc.getHTMLDocument(saveDoc);

	const url = new URL(`data:text/plain;utf8,${encodeURIComponent(html)}`);

	const downloadAnchor = /** @type {HTMLAnchorElement} */ (document.getElementById('download-anchor'));
	downloadAnchor.href = url.toString();
	downloadAnchor.click();
	//console.log(url.toString());
	downloadAnchor.href = '';
}



