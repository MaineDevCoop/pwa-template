import { LitElement, html, css } from 'lit-element';

class App extends LitElement {
	render() {
		return html`
			<app-router></app-router>
		`;
	}

	static get styles() {
		return css`
		`;
	}
}

customElements.define('app-root', App);