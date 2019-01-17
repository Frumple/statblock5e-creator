export default async function defineCustomElementFromTemplate(
  name,
  templatePath,
  elementClass = null,
  options = null) {

  await fetch(templatePath)
    .then(stream => stream.text())
    .then(htmlContent =>
      defineCustomElementFromHtmlContent(name, htmlContent, elementClass, options));
}

function defineCustomElementFromHtmlContent(
  name,
  htmlContent,
  elementClass = null,
  options = null) {

  let contentNode =
    document.createRange().createContextualFragment(htmlContent);

  if (elementClass === null) {
    customElements.define(name,
      class extends HTMLElement {
        constructor() {
          super();
          this.attachShadow({mode: 'open'})
            .appendChild(contentNode.cloneNode(true));
        }
      }
    )
  } else {
    customElements.define(name, elementClass(contentNode), options);
  }
}
