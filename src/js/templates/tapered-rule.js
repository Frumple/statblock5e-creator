import defineCustomElementFromTemplate from '/src/js/helpers/define-custom-element.js';

export async function defineCustomElement() {
  await defineCustomElementFromTemplate(
    'tapered-rule',
    'src/templates/tapered-rule.html');
}
