import defineCustomElementFromTemplate from '/src/js/helpers/define-custom-element.js';

export async function defineCustomElement() {
  await defineCustomElementFromTemplate(
    'stat-block',
    'src/templates/stat-block.html');
}
