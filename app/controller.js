//
//	controller.js
//


import { HTMLApp } from "../[html-common]/module/HTMLApp.js";
import { thoughtcloudApp } from "./thoughtcloudApp.js";
import { ui } from './main-ui.js';
import { documentArea } from "./document-area.js";
import * as file from "./file.js"





class Controller {

	svgDocument



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
			listener: (event) => { file.loadFile(event.target.files[0], thoughtcloudApp.fileLoaded); }
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
		// 	query: '#main-svg',
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
			listener: file.saveDocument,
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

		const drawingGroupContent = document.getElementById('main-svg').innerHTML;

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