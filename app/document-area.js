//
//	document
//

import { HTMLApp } from "../[html-common]/module/HTMLApp.js";
import * as SVG from "../[html-common]/module/SVG.js";
import { thoughtcloudApp } from "./thoughtcloudApp.js";
import { PageItem } from './page-item.js';


let element = {};
const elementMap = {
	page			: 'group-page',
};




class DocumentArea {

	/** @type {SVGSVGElement} */
	svgElement = undefined;

	constructor() {
		this.svgElement = /** @type {SVGSVGElement} */ (document.querySelector('#main-svg'));
		element = HTMLApp.buildElementMap(this.svgElement, elementMap);
		HTMLApp.addEventListeners(this.eventListeners, this);
		//console.log('svg element', element);
	}


	eventListeners = [
		{
			query: '#main-svg',
			type: 'click',
			listener: this.svgClickListener
		},
		{
			query: '#main-svg',
			type: 'dblclick',
			listener: this.svgDblClickListener //()=>console.log('dblclick')//  // not firing sometimes for some reason???
		},
	];



	/** svgClickListener
	 * @param {MouseEvent} event
	 */
	svgClickListener(event) {
		//console.debug('svgClickListener', event);
		const domPoint = new DOMPoint(event.clientX, event.clientY);

		const pageGroup = this.svgElement.getElementById('group-page');

		// Get point in page SVG space
		const pagePoint = domPoint.matrixTransform(this.svgElement.getScreenCTM().inverse());
		console.debug('svgClickListener', pagePoint);

		// /this.drawPoint(pagePoint.x, pagePoint.y);	// adding this line seems to cancel subsequent events - do I need to re-propagate the event or something?


	}/* svgClickListener */


	/** svgDblClickListener
	 * @param {MouseEvent} event
	 */
	svgDblClickListener(event) {   // not firing for some reason???
		//console.log('svgDblClickListener', event);
		const domPoint = new DOMPoint(event.clientX, event.clientY);

		const pageGroup = this.svgElement.getElementById('group-page');

		// Get point in page SVG space
		const pagePoint = domPoint.matrixTransform(this.svgElement.getScreenCTM().inverse());

		console.debug('svgDblClickListener', pagePoint);


		const newItem = new PageItem('new item1', 'some body content');


		element.page.appendChild(newItem.getElement(pagePoint.x,pagePoint.y));


		//this.doCommand(cmd);

	}/* svgDblClickListener */




	drawGrid() {
		const cartesianGrid = new SVG.CartesianGrid(thoughtcloudApp.space, thoughtcloudApp.page);
		document.getElementById('group-cartesianGrid').innerHTML = cartesianGrid.toString();

		// const polarGrid = new SVG.PolarGrid(thoughtcloudApp.space, thoughtcloudApp.page);
		// document.getElementById('group-polarGrid').innerHTML = polarGrid.toString();
	}




}/* PageArea */



export const documentArea = new DocumentArea();