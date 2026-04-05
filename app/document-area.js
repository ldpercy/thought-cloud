//
//	document
//

import { HTMLApp } from "../[html-common]/module/HTMLApp.js";
import * as Maths from "../[html-common]/module/Maths.js";
import * as SVG from "../[html-common]/module/SVG.js";
import { thoughtcloudApp } from "./thoughtcloudApp.js";
//import { ui } from './html-ui.js';


let element = {};
const elementMap = {
	page			: 'group-page',
};




class DocumentArea {

	svgElement = undefined;

	constructor() {
		this.svgElement = document.getElementById('svg-element');
		element = HTMLApp.buildElementMap(this.svgElement, elementMap);

		//console.log('svg element', element);
	}



	drawGrid() {
		const cartesianGrid = new SVG.CartesianGrid(thoughtcloudApp.space, thoughtcloudApp.page);
		document.getElementById('group-cartesianGrid').innerHTML = cartesianGrid.toString();

		// const polarGrid = new SVG.PolarGrid(thoughtcloudApp.space, thoughtcloudApp.page);
		// document.getElementById('group-polarGrid').innerHTML = polarGrid.toString();
	}




}/* PageArea */



export const documentArea = new DocumentArea();