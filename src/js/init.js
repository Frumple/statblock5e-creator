import StatBlock from '/src/js/templates/stat-block.js';
import TopStats from '/src/js/templates/top-stats.js';

import HeadingSection from '/src/js/templates/sections/heading-section.js';
import ArmorClassSection from '/src/js/templates/sections/armor-class-section.js';
import HitPointsSection from '/src/js/templates/sections/hit-points-section.js';
import SpeedSection from '/src/js/templates/sections/speed-section.js';
import AbilityScoresSection from '/src/js/templates/sections/ability-scores-section.js';

import ErrorMessages from '/src/js/templates/elements/error-messages.js';
import PropertyBlock from '/src/js/templates/elements/property-block.js';
import PropertyLine from '/src/js/templates/elements/property-line.js';
import SectionDivider from '/src/js/templates/elements/section-divider.js';
import TaperedRule from '/src/js/templates/elements/tapered-rule.js';

async function init() {
  await StatBlock.defineCustomElement();
  await TopStats.defineCustomElement();

  await HeadingSection.defineCustomElement();
  await ArmorClassSection.defineCustomElement();
  await HitPointsSection.defineCustomElement();
  await SpeedSection.defineCustomElement();
  await AbilityScoresSection.defineCustomElement();

  await ErrorMessages.defineCustomElement();
  await PropertyBlock.defineCustomElement();
  await PropertyLine.defineCustomElement();
  await SectionDivider.defineCustomElement();
  await TaperedRule.defineCustomElement();

  let statBlock = new StatBlock( document.querySelector('stat-block') );
    let topStats = new TopStats( document.querySelector('top-stats') );

  let headingSection = new HeadingSection( document.querySelector('heading-section') );
  let armorClassSection = new ArmorClassSection( document.querySelector('armor-class-section') );
  let hitPointsSection = new HitPointsSection( document.querySelector('hit-points-section') );
  let speedSection = new SpeedSection( document.querySelector('speed-section') );
  let abilityScoresSection = new AbilityScoresSection( document.querySelector('ability-scores-section') );
}

init();
