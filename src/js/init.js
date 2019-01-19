import StatBlock from '/src/js/containers/stat-block.js';
import TopStats from '/src/js/containers/top-stats.js';
import BasicStats from '/src/js/containers/basic-stats.js';
import AdvancedStats from '/src/js/containers/advanced-stats.js';

import HeadingSection from '/src/js/sections/heading-section.js';
import ArmorClassSection from '/src/js/sections/armor-class-section.js';
import HitPointsSection from '/src/js/sections/hit-points-section.js';
import SpeedSection from '/src/js/sections/speed-section.js';
import AbilityScoresSection from '/src/js/sections/ability-scores-section.js';

import EnableDisableElementsCheckbox from '/src/js/extensions/enable-disable-elements-checkbox.js';
import NumericInput from '/src/js/extensions/number-input.js';
import TextInput from '/src/js/extensions/text-input.js';

import ErrorMessages from '/src/js/elements/error-messages.js';
import PropertyBlock from '/src/js/elements/property-block.js';
import PropertyLine from '/src/js/elements/property-line.js';
import SectionDivider from '/src/js/elements/section-divider.js';
import TaperedRule from '/src/js/elements/tapered-rule.js';

async function init() {
  await StatBlock.defineCustomElement();
  await TopStats.defineCustomElement();
  await BasicStats.defineCustomElement();
  await AdvancedStats.defineCustomElement();

  await HeadingSection.defineCustomElement();
  await ArmorClassSection.defineCustomElement();
  await HitPointsSection.defineCustomElement();
  await SpeedSection.defineCustomElement();
  await AbilityScoresSection.defineCustomElement();

  await EnableDisableElementsCheckbox.defineCustomElement();
  await NumericInput.defineCustomElement();
  await TextInput.defineCustomElement();

  await ErrorMessages.defineCustomElement();
  await PropertyBlock.defineCustomElement();
  await PropertyLine.defineCustomElement();
  await SectionDivider.defineCustomElement();
  await TaperedRule.defineCustomElement();

  let statBlock = new StatBlock( document.querySelector('stat-block') );
}

init();
