import StatBlock from '/src/js/components/stat-block.js';
import TopStats from '/src/js/components/top-stats.js';

import HeadingSection from '/src/js/components/sections/heading-section.js';
import ArmorClassSection from '/src/js/components/sections/armor-class-section.js';
import HitPointsSection from '/src/js/components/sections/hit-points-section.js';
import SpeedSection from '/src/js/components/sections/speed-section.js';
import AbilityScoresSection from '/src/js/components/sections/ability-scores-section.js';

import ErrorMessages from '/src/js/components/elements/error-messages.js';
import NumericInput from '/src/js/components/elements/numeric-input.js';
import TextInput from '/src/js/components/elements/text-input.js';
import PropertyBlock from '/src/js/components/elements/property-block.js';
import PropertyLine from '/src/js/components/elements/property-line.js';
import SectionDivider from '/src/js/components/elements/section-divider.js';
import TaperedRule from '/src/js/components/elements/tapered-rule.js';

async function init() {
  await StatBlock.defineCustomElement();
  await TopStats.defineCustomElement();

  await HeadingSection.defineCustomElement();
  await ArmorClassSection.defineCustomElement();
  await HitPointsSection.defineCustomElement();
  await SpeedSection.defineCustomElement();
  await AbilityScoresSection.defineCustomElement();

  await ErrorMessages.defineCustomElement();
  await NumericInput.defineCustomElement();
  await TextInput.defineCustomElement();
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
