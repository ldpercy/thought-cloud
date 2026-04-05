import { HTMLApp } from "../[html-common]/module/HTMLApp.js";
import { thoughtcloudApp } from "./thoughtcloudApp.js";




let element;
const elementMap = {
	pageForm		: 'form-page',
	appInfoDialog	: 'dialog-appInfo',
};



class MainUserInterface {


	constructor() {
		element = HTMLApp.buildElementMap(document, elementMap);
	}






	/** @returns {string} */
	get colourScheme() {
		return element.pageForm.colourScheme.value;
	}


	/** @param {string} colourScheme */
	set colourScheme(colourScheme) {
		element.pageForm.colourScheme.value = colourScheme;
		thoughtcloudApp.setColourScheme(colourScheme);
	}


	toggleAppInfoDialog() {
		element.appInfoDialog.showModal();
	}

}/* MainUserInterface */


export const ui = new MainUserInterface();
