import defineCustomElementFromTemplate from '/src/js/helpers/define-custom-element.js';

export default class AbilityScoresSection {
  static async defineCustomElement() {
    await defineCustomElementFromTemplate(
      'abilities-block',
      'src/templates/ability-scores-section.html',
      AbilityScoresSection.elementClass);
  }

  static elementClass(contentNode) {
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
             AbilityScoresSection.abilityText(attribute.value);
        }
      }
    }
  }

  static abilityText(abilityScore) {
    return [String(abilityScore),
            ' (',
            AbilityScoresSection.formattedModifier(AbilityScoresSection.abilityModifier(abilityScore)),
            ')'].join('');
  }

  static formattedModifier(abilityModifier) {
    if (abilityModifier >= 0) {
      return '+' + abilityModifier;
    }
    // This is an en dash, NOT a "normal" dash. The minus sign needs to be more
    // visible.
    return '–' + Math.abs(abilityModifier);
  }

  static abilityModifier(abilityScore) {
    let score = parseInt(abilityScore, 10);
    return Math.floor((score - 10) / 2);
  }
}
