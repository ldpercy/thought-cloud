//
//	controller.js
//


import { HTMLApp } from "../[html-common]/module/HTMLApp.js";
import { thoughtcloudApp } from "./thoughtcloudApp.js";
import { ui } from './main-ui.js';
import { documentArea } from "./document-area.js";






class Controller {


	constructor() {
		this.element = HTMLApp.buildElementMap(document, this.elementMap)
		HTMLApp.addEventListeners(this.eventListeners, this);
		//console.debug('controller constructor');
	}


	elementMap = {
		// appInfoDialog	: 'dialog-appInfo',
		downloadAnchor	: 'download-anchor',
	};


	/** @type {array} */
	eventListeners = [
		{
			element: document.forms['application']['fileinput'],
			type: 'change',
			listener: (event) => { thoughtcloudApp.loadFile(event.target.files[0]); }
		},
		{
			query: '.colourScheme-selector',
			type: 'click',
			listener: (event) => { ui.colourScheme = event.target.dataset.colourscheme; }
		},
		{
			element: document,
			type: 'visibilitychange',
			listener: () => { thoughtcloudApp.visibilitychangeListener(); }
		},
		// {
		// 	query: '#svg-element',
		// 	type: 'dblclick',
		// 	listener: this.svgDblClickListener //()=>console.log('dblclick')//  // not firing sometimes for some reason???
		// },
		{
			query: '#svg-element',
			type: 'click',
			listener: this.svgClickListener
		},
		// {
		// 	query: '#svg-element',
		// 	type: 'keydown',
		// 	listener: this.svgKeyListener
		// },
		{
			element: document,
			type: 'keydown',
			listener: this.documentKeyListener
		},
		{
			query: 'textarea',
			type: 'keydown',
			listener: (event)=>event.stopPropagation()
		},
		{
			query: '#button-save',
			type: 'click',
			listener: this.saveDrawing,
		},
		{
			query: '#button-showAppInfo',
			type: 'click',
			listener: ui.toggleAppInfoDialog,
		},

	];/* eventListeners */


	//
	//	event listeners
	//



	keyFunctionMap = {

		'+'	: this.zoomIn,
		'z'	: this.zoomIn,
		'Z'	: this.zoomOut,
		'-'	: this.zoomOut,

		'?'	: ui.toggleAppInfoDialog,
	};


	documentKeyListener(event) {
		//console.log('documentKeyListener', event);

		if (!event.altKey && !event.ctrlKey && !event.metaKey) {

			if (this.keyFunctionMap[event.key]) {
				event.preventDefault();
				this.keyFunctionMap[event.key]();
			}
		}

	}/* documentKeyListener */







	svgClickListener(event) {
		//console.debug('svgClickListener', event);
		const domPoint = new DOMPoint(event.clientX, event.clientY);

		const pageGroup = documentArea.svgElement.getElementById('group-page');

		// Get point in page SVG space
		const pagePoint = domPoint.matrixTransform(pageGroup.getScreenCTM().inverse());
		//console.debug('pagePoint', pagePoint);

		// /this.drawPoint(pagePoint.x, pagePoint.y);	// adding this line seems to cancel subsequent events - do I need to re-propagate the event or something?


	}/* svgClickListener */


	/* svgDblClickListener
	* /
	svgDblClickListener(event) {   // not firing for some reason???
		//console.log('svgDblClickListener', event);

		const domPoint = new DOMPoint(event.clientX, event.clientY);
		const pageElement = document.getElementById('group-page');

		// Get point in page SVG space
		const pagePoint = domPoint.matrixTransform(pageElement.getScreenCTM().inverse());

		const cmd = `xyTurn ${pagePoint.x}, ${-pagePoint.y}`;

		//console.debug('svgClickListener', cmd);

		this.doCommand(cmd);

	}/ * svgDblClickListener */






	//
	//	handlers
	//



	zoomIn() {
		//console.log('zoomIn');
		//ui.zoom++;
		//documentArea.updatePageTransform();
	}

	zoomOut() {
		//console.log('zoomOut');
		//ui.zoom--;
		//documentArea.updatePageTransform();
	}


	saveDrawing() {

		const drawingGroupContent = document.getElementById('item-content').innerHTML;

		const svgDoc = `
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1200 -1200 2400 2400" preserveAspectRatio="xMidYMid meet" >
				<title>thought cloud</title>
				<g id="drawing-group" style="stroke:black;fill:grey;fill-opacity:50%; transform:scaleY(-1);">
					${drawingGroupContent}
				</g>
			</svg>
		`;

		const url = new URL(`data:text/plain;utf8,${encodeURIComponent(svgDoc)}`);
		this.element.downloadAnchor.href = url.toString();
		this.element.downloadAnchor.click();
		//console.log(url.toString());
		this.element.downloadAnchor.href = '';
	}


} /* Controller  */


export const controller = new Controller();