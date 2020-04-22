import { html, css, LitElement } from 'lit-element';

class PageIndex extends LitElement {
	constructor() {
		super();
	}

	static get styles() {
		return css`
			h1 {
				text-align: center;
			}
		`;
	}

	render() {
		return html`
			<h1>Hello Template!</h1>
		`;
	}
}

customElements.define('app-page-index', PageIndex);