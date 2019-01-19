export async function defineCustomAutonomousElement(name, templatePath) {
  let templateContent =
    await fetch(templatePath).then(stream => stream.text());

  let contentNode =
    document.createRange().createContextualFragment(templateContent);

  customElements.define(name,
    class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({mode: 'open'})
          .appendChild(contentNode.cloneNode(true));
      }
    }
  )
}

export function defineCustomBuiltinElement(name, elementClass, extendsTag) {
  customElements.define(name, elementClass, { extends: extendsTag });
}
