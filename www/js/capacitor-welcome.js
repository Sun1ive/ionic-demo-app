window.customElements.define(
  "capacitor-welcome",
  class extends HTMLElement {
    constructor() {
      super();

      Capacitor.Plugins.SplashScreen.hide();

      const root = this.attachShadow({ mode: "open" });

      root.innerHTML = `
      <body>
      <a href="http://10.10.26.131:5000">testing</a>
      </body>
      `;
    }

    connectedCallback() {
      const self = this;

      self.shadowRoot
        .querySelector("#take-photo")
        .addEventListener("click", async function(e) {
          const { Camera } = Capacitor.Plugins;

          try {
            const photo = await Camera.getPhoto({
              resultType: "uri"
            });

            const image = self.shadowRoot.querySelector("#image");
            if (!image) {
              return;
            }

            image.src = photo.webPath;
          } catch (e) {
            console.warn("User cancelled", e);
          }
        });
    }
  }
);

window.customElements.define(
  "capacitor-welcome-titlebar",
  class extends HTMLElement {
    constructor() {
      super();
      const root = this.attachShadow({ mode: "open" });
      root.innerHTML = `
    <style>
      :host {
        position: relative;
        display: block;
        padding: 15px 15px 15px 15px;
        text-align: center;
        background-color: #73B5F6;
      }
      ::slotted(h1) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-size: 0.9em;
        font-weight: 600;
        color: #fff;
      }
    </style>
    <slot></slot>
    `;
    }
  }
);
