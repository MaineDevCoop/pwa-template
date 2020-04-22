import { router } from 'lit-element-router';
import { outlet } from 'lit-element-router';
import { navigator } from 'lit-element-router';

import { LitElement, html } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

class Main extends outlet(LitElement) {
  render() {
    return html`
      <slot></slot>
    `;
  }
}

class Link extends navigator(LitElement) {
    static get properties() {
        return {
            href: { type: String }
        };
    }
    constructor() {
        super();
        this.href = '';
    }
    render() {
        return html`
            <a href='${this.href}' @click='${this.linkClick}'>
                <slot></slot>
            </a>
        `;
    }
    linkClick(event) {
        event.preventDefault();
        this.navigate(this.href);
    }
}


class LitRouter extends router(LitElement) {
  constructor() {
    super();
    this.route = '';
    this.params = {};
    this.query = {};
  }

  router(route, params, query, data) {
    this.route = route;
    this.params = params;
    this.query = query;
    // console.log('routing???', route, params, query, data);
  }

  static get properties() {
    return {
      route: { type: String },
      params: { type: Object },
      query: { type: Object }
    }
  }

  static get routes() {
    return [];
  }

  render() {
    return html`
      <app-main active-route=${this.route}>
        ${this.constructor.routes.map(route => html`
          <div route="${route.name}">
          ${unsafeHTML(`
            <${route.page} 
              ${Object.entries(this.params).map(([key, val]) => {
                switch(typeof val) {
                  case 'string':
                    return `${key}="${val}" `;
                  default:
                    return `${key}=${val} `;
                }
              })}
            ></${route.page}>
          `)}
          </div>
        `)}
      </app-main>
    `;
  }
}


window.router = new (navigator(function (){}))();
if(!customElements.get('app-link')) customElements.define('app-link', Link);
if(!customElements.get('app-main')) customElements.define('app-main', Main);

export function defineRouter(routes, name = 'app-router') {
	class AppRouter extends LitRouter {
		static get routes() {
			return routes;
		}
	}

	customElements.define(name, AppRouter);
}