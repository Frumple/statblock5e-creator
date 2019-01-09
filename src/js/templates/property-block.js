import defineCustomElementFromTemplate from '/src/js/helpers/define-custom-element.js';

export async function defineCustomElement() {
  await defineCustomElementFromTemplate(
    'property-block',
    'src/templates/property-block.html');
}
