import StatBlock from '/src/js/templates/stat-block.js';
import HeadingSection from '/src/js/templates/heading-section.js';
import TopStats from '/src/js/templates/top-stats.js';
import ArmorClassSection from '/src/js/templates/armor-class-section.js';
import HitPointsSection from '/src/js/templates/hit-points-section.js';
import SpeedSection from '/src/js/templates/speed-section.js';
import AbilityScoresSection from '/src/js/templates/ability-scores-section.js';

import ErrorMessages from '/src/js/templates/error-messages.js';
import PropertyBlock from '/src/js/templates/property-block.js';
import PropertyLine from '/src/js/templates/property-line.js';
import TaperedRule from '/src/js/templates/tapered-rule.js';

async function init() {
  await StatBlock.defineCustomElement();
  await HeadingSection.defineCustomElement();
  await TopStats.defineCustomElement();
  await ArmorClassSection.defineCustomElement();
  await HitPointsSection.defineCustomElement();
  await SpeedSection.defineCustomElement();
  await AbilityScoresSection.defineCustomElement();

  await ErrorMessages.defineCustomElement();
  await PropertyBlock.defineCustomElement();
  await PropertyLine.defineCustomElement();
  await TaperedRule.defineCustomElement();

  let statBlock = new StatBlock( document.querySelector('stat-block') );
  let headingSection = new HeadingSection( document.querySelector('heading-section') );
  let topStats = new TopStats( document.querySelector('top-stats') );
  let armorClassSection = new ArmorClassSection( document.querySelector('armor-class-section') );
  let hitPointsSection = new HitPointsSection( document.querySelector('hit-points-section') );
  let speedSection = new SpeedSection( document.querySelector('speed-section') );
}

init();
