import defineCustomElementFromTemplate from '/src/js/helpers/define-custom-element.js';

export async function defineCustomElement() {
  await defineCustomElementFromTemplate(
    'top-stats',
    'src/templates/top-stats.html');
}
