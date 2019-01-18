import StatBlock from '/src/js/components/stat-block.js';
import TopStats from '/src/js/components/top-stats.js';

import HeadingSection from '/src/js/components/sections/heading-section.js';
import ArmorClassSection from '/src/js/components/sections/armor-class-section.js';
import HitPointsSection from '/src/js/components/sections/hit-points-section.js';
import SpeedSection from '/src/js/components/sections/speed-section.js';
import AbilityScoresSection from '/src/js/components/sections/ability-scores-section.js';

import ErrorMessages from '/src/js/components/elements/error-messages.js';
import PropertyBlock from '/src/js/components/elements/property-block.js';
import PropertyLine from '/src/js/components/elements/property-line.js';
import SectionDivider from '/src/js/components/elements/section-divider.js';
import TaperedRule from '/src/js/components/elements/tapered-rule.js';

import NumericInput from '/src/js/components/extensions/number-input.js';
import TextInput from '/src/js/components/extensions/text-input.js';

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

  await NumericInput.defineCustomElement();
  await TextInput.defineCustomElement();

  let statBlock = new StatBlock( document.querySelector('stat-block') );
}

init();
