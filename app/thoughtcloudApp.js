//
//	thoughtcloudApp.js
//

import { HTMLApp } from "../[html-common]/module/HTMLApp.js";

import * as svg from "../[html-common]/module/SVG.js";
import { Space } from "../[html-common]/module/PlanarSpace.js";

import { controller} from './controller.js';
import { documentArea } from './document-area.js';
import { ui } from './main-ui.js';


class ThoughtcloudApp extends HTMLApp {

	appName			= 'thought cloud';
	appVersion		= 'v0.0.0';
	projectColour	= 'skyblue';
	appInfo = [`%c
		Thought cloud ${this.appVersion} by ldpercy
		https://github.com/ldpercy/thought-cloud/releases/tag/${this.appVersion}
		`.replace(/\n\t/g,'\n'),
		`color: light-dark(hsl(from ${this.projectColour} h s 30), hsl(from ${this.projectColour} h s 70));`,
	];



	/** @type {object} */
	elementMap = {
		commandInput	: 'input-command',
		pageForm		: 'form-page',
		svg				: 'svg-element',
		page			: 'group-page',
	};



	documentDOMContentLoaded() {
		super.documentDOMContentLoaded();
		//ui.colourScheme = localStorage[`${this.appName}_colourScheme`] || 'light';
		this.loadSettings();
		this.setup();
	}/* documentDOMContentLoaded */



	setup() {

		//this.viewBox = new SVG.viewBox().fromString('-1200 -1200 2400 2400');

		this.page = new svg.Box(-2400, -2400, 4800, 4800);
		//this.page = new SVG.Rectangle(0, 0, 2100, 2970);		// A4 page
		//const pageViewBox = new SVG.Rectangle(0, -2970, 2100, 2970);
		this.viewBox = new svg.ViewBox(this.page.x, this.page.y, this.page.width, this.page.height);

		this.element.svg.setAttribute('viewBox', this.viewBox.toStringPadded(100));

		this.space = new Space(undefined,'thoughtcloud-space');

		documentArea.drawGrid();
	}



	// controller methods









	//
	// application lifecycle
	//


	visibilitychangeListener() {
		//console.debug('visibilitychangeListener', arguments);
		//console.debug('document.visibilityState', document.visibilityState);
		if (document.visibilityState === 'hidden')
		{
			this.saveSettings();
		}
	}


	/* saveSettings
	*/
	saveSettings() {

		// Note caveats: https://stackoverflow.com/a/55874235

		const appSettings = {
			//page	: this.getFormData(this.element.pageForm),
			//drawing	: this.getFormData(this.element.drawingForm),
		};

		//console.log(appSettings);

		const appSettingsJson = JSON.stringify(appSettings);
		localStorage.setItem(`${this.appName}_settings`, appSettingsJson );
		localStorage.setItem(`${this.appName}_savedAt`, new Date().toISOString());
		//.log('Settings saved');
	}/* saveSettings */


	loadSettings() {
		//console.log('Settings loaded');

		if (localStorage[`${this.appName}_settings`]) {

			const appSettings = JSON.parse(localStorage[`${this.appName}_settings`]);
			//this.populateForm(this.element.turtleForm, appSettings.turtle);
			//this.populateForm(this.element.pageForm, appSettings.page);
			//this.populateForm(this.element.drawingForm, appSettings.drawing);
		}
		else {
			// first load
		}

		localStorage.setItem(`${this.appName}_loadedAt`, new Date().toISOString());
	}/* loadSettings */




}/* thoughtcloudApp */




export const thoughtcloudApp = new ThoughtcloudApp();

