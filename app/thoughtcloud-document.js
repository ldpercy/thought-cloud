

export class ThoughtcloudDocument {

	/** @type {string} */
	#title;
	/** @type {string} */
	#content;

	get title() { return this.#title;}
	get content() { return this.#content;}

	set title(title) { this.#title = title; }
	set content(content) { this.#content = content; }

}/* ThoughtcloudDocument */






/**
 * @param {ThoughtcloudDocument} tcDoc
 */
export function getHTMLDocument(tcDoc) {


	const result = `
		<!doctype html>
		<html>
		<head>
			<title>${tcDoc.title}</title>
			<meta charset="utf-8">
			<style>
				${getStylesheet()}
			</style>
		</head>
		<body>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1200 -1200 2400 2400" preserveAspectRatio="xMidYMid meet" >
			<title>thought cloud</title>
			<g id="drawing-group" style="stroke:black;fill:whitesmoke;fill-opacity:50%;">
				${tcDoc.content}
			</g>
		</svg>

		</body>
		</html>
	`;
	return result

}






function getStylesheet() {
	const result =`
		.pageItem {
			x:0;
			y:0;

			.itemHandle {
				cx:0;
				cy:0;
				r: 50px;
			}

			overflow: visible;

			foreignObject {
				overflow: visible;
				fill: #eee;

				main {
					width: 30em;
					overflow: visible;
					border-radius: 1em;
					padding:1em;
					border:1px dashed silver;
					background-color: whitesmoke;
				}
				pre {
					white-space: pre-line;
				}
			}
		}
	`;
	return result;
}

