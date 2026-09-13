import {LitElement, html} from 'lit';

export class MyElement extends LitElement {
  static properties = {
    version: {},
  };

  constructor() {
    super();
    this.version = 'STARTING';
  }

  render() {
    return html`
    <p>Welcome to the Lit tutorial!</p>
    `;
  }
}
customElements.define('my-element', MyElement);