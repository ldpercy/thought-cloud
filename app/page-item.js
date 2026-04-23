




export class PageItem {


	/**
	 * @param {string} title
	 * @param {string} body
	 */
	constructor(title, body ) {
		this.title = title;
		this.body = body;
	}



	/**
	 * @param {number} x
	 * @param {number} y
	 * @return {SVGGElement}
	 */
	getElement(x,y) {
		const result = document.createElementNS('http://www.w3.org/2000/svg','g');
		result.classList.add('pageItem');
		result.innerHTML = this.html;
		result.setAttribute('transform',`translate(${x} ${y})`);

		return result;
	}/* getElement */



	get html() {
		const result = `
			<circle class="itemHandle" x="0" y="0">
				<title>${this.title}</title>
			</circle>
			<foreignObject x="0" y="0" width="500" height="500" class="pageItem-html">
				<main>
					<h3>item title</h3>
					<pre contenteditable="plaintext-only">
						${this.body}
					</pre>
				</main>
			</foreignObject>
		`;
		return result;
	}/* get html */



}/* PageItem */
