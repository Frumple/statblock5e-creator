import * as statBlockModule from '/src/js/templates/stat-block.js';
import * as headingSectionModule from '/src/js/templates/heading-section.js';
import * as topStatsModule from '/src/js/templates/top-stats.js';
import * as armorClassSectionModule from '/src/js/templates/armor-class-section.js';
import * as hitPointsSectionModule from '/src/js/templates/hit-points-section.js';
import * as speedSectionModule from '/src/js/templates/speed-section.js';
import * as abilitiesBlockModule from '/src/js/templates/abilities-block.js';

import * as errorMessagesModule from '/src/js/templates/error-messages.js';
import * as propertyBlockModule from '/src/js/templates/property-block.js';
import * as propertyLineModule from '/src/js/templates/property-line.js';
import * as taperedRuleModule from '/src/js/templates/tapered-rule.js';

async function init() {
  await statBlockModule.defineCustomElement();
  await headingSectionModule.defineCustomElement();
  await topStatsModule.defineCustomElement();
  await armorClassSectionModule.defineCustomElement();
  await hitPointsSectionModule.defineCustomElement();
  await speedSectionModule.defineCustomElement();
  await abilitiesBlockModule.defineCustomElement();

  await errorMessagesModule.defineCustomElement();
  await propertyBlockModule.defineCustomElement();
  await propertyLineModule.defineCustomElement();
  await taperedRuleModule.defineCustomElement();

  let headingSection = new headingSectionModule.HeadingSection( document.querySelector('heading-section').shadowRoot );
  let armorClassSection = new armorClassSectionModule.ArmorClassSection( document.querySelector('armor-class-section').shadowRoot );
  let hitPointsSection = new hitPointsSectionModule.HitPointsSection( document.querySelector('hit-points-section').shadowRoot );
  let speedSection = new speedSectionModule.SpeedSection( document.querySelector('speed-section').shadowRoot );
}

init();
