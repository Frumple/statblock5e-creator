import * as abilitiesBlock from '/src/js/templates/abilities-block.js';
import * as creatureHeading from '/src/js/templates/creature-heading.js';
import * as errorMessages from '/src/js/templates/error-messages.js';
import * as propertyBlock from '/src/js/templates/property-block.js';
import * as propertyLine from '/src/js/templates/property-line.js';
import * as statBlock from '/src/js/templates/stat-block.js';
import * as taperedRule from '/src/js/templates/tapered-rule.js';
import * as topStats from '/src/js/templates/top-stats.js';

async function init() {
  await abilitiesBlock.defineCustomElement();
  await creatureHeading.defineCustomElement();
  await errorMessages.defineCustomElement();
  await propertyBlock.defineCustomElement();
  await propertyLine.defineCustomElement();
  await statBlock.defineCustomElement();
  await taperedRule.defineCustomElement();
  await topStats.defineCustomElement();

  creatureHeading.init( document.getElementById('creature-heading') );
}

init();
