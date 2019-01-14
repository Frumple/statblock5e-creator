import * as statBlock from '/src/js/templates/stat-block.js';
import * as headingSection from '/src/js/templates/heading-section.js';
import * as topStats from '/src/js/templates/top-stats.js';
import * as armorClassSection from '/src/js/templates/armor-class-section.js';
import * as hitPointsSection from '/src/js/templates/hit-points-section.js';
import * as speedSection from '/src/js/templates/speed-section.js';
import * as abilitiesBlock from '/src/js/templates/abilities-block.js';

import * as errorMessages from '/src/js/templates/error-messages.js';
import * as propertyBlock from '/src/js/templates/property-block.js';
import * as propertyLine from '/src/js/templates/property-line.js';
import * as taperedRule from '/src/js/templates/tapered-rule.js';

async function init() {
  await statBlock.defineCustomElement();
  await headingSection.defineCustomElement();
  await topStats.defineCustomElement();
  await armorClassSection.defineCustomElement();
  await hitPointsSection.defineCustomElement();
  await speedSection.defineCustomElement();
  await abilitiesBlock.defineCustomElement();

  await errorMessages.defineCustomElement();
  await propertyBlock.defineCustomElement();
  await propertyLine.defineCustomElement();
  await taperedRule.defineCustomElement();

  headingSection.init( document.querySelector('heading-section') );
  armorClassSection.init( document.querySelector('armor-class-section') );
  hitPointsSection.init( document.querySelector('hit-points-section') );
  speedSection.init( document.querySelector('speed-section') );
}

init();
