import defineCustomElementFromTemplate from '/src/js/helpers/define-custom-element.js';

export async function defineCustomElement() {
  await defineCustomElementFromTemplate(
    'abilities-block',
    'src/templates/abilities-block.html',
    elementClass);
}

function elementClass(contentNode) {
  return class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({mode: 'open'})
        .appendChild(contentNode.cloneNode(true));
    }
    connectedCallback() {
      let root = this.shadowRoot;
      for (let i = 0; i < this.attributes.length; i++) {
        let attribute = this.attributes[i];
        let abilityShortName = attribute.name.split('-')[1];
        root.getElementById(abilityShortName).textContent =
           abilityText(attribute.value);
      }
    }
  }
}

function abilityModifier(abilityScore) {
  let score = parseInt(abilityScore, 10);
  return Math.floor((score - 10) / 2);
}

function formattedModifier(abilityModifier) {
  if (abilityModifier >= 0) {
    return '+' + abilityModifier;
  }
  // This is an en dash, NOT a "normal" dash. The minus sign needs to be more
  // visible.
  return '–' + Math.abs(abilityModifier);
}

function abilityText(abilityScore) {
  return [String(abilityScore),
          ' (',
          formattedModifier(abilityModifier(abilityScore)),
          ')'].join('');
}
