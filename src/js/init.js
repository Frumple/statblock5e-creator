import AttributeDataList from '/src/js/extensions/attribute-datalist.js';
import EnableDisableElementsCheckbox from '/src/js/extensions/enable-disable-elements-checkbox.js';
import IntegerInput from '/src/js/extensions/integer-input.js';
import TextInput from '/src/js/extensions/text-input.js';

import AttributeListItem from '/src/js/elements/attribute-list-item.js';
import AttributeList from '/src/js/elements/attribute-list.js';
import ErrorMessages from '/src/js/elements/error-messages.js';
import PropertyBlock from '/src/js/elements/property-block.js';
import PropertyLine from '/src/js/elements/property-line.js';
import SectionDivider from '/src/js/elements/section-divider.js';
import TaperedRule from '/src/js/elements/tapered-rule.js';

import HeadingSection from '/src/js/sections/heading-section.js';
import ArmorClassSection from '/src/js/sections/armor-class-section.js';
import HitPointsSection from '/src/js/sections/hit-points-section.js';
import SpeedSection from '/src/js/sections/speed-section.js';
import AbilityScoresSection from '/src/js/sections/ability-scores-section.js';
import SavingThrowsSection from '/src/js/sections/saving-throws-section.js';
import SkillsSection from '/src/js/sections/skills-section.js';
import DamageVulnerabilitiesSection from '/src/js/sections/damage-vulnerabilities-section.js';
import DamageResistancesSection from '/src/js/sections/damage-resistances-section.js';
import DamageImmunitiesSection from '/src/js/sections/damage-immunities-section.js';
import ConditionImmunitiesSection from '/src/js/sections/condition-immunities-section.js';
import SensesSection from '/src/js/sections/senses-section.js';
import LanguagesSection from '/src/js/sections/languages-section.js';
import ChallengeRatingSection from '/src/js/sections/challenge-rating-section.js';

import StatBlock from '/src/js/containers/stat-block.js';
import TopStats from '/src/js/containers/top-stats.js';
import BasicStats from '/src/js/containers/basic-stats.js';
import AdvancedStats from '/src/js/containers/advanced-stats.js';

async function init() {
  const elementClasses = [];

  elementClasses.push(AttributeDataList);
  elementClasses.push(EnableDisableElementsCheckbox);
  elementClasses.push(IntegerInput);
  elementClasses.push(TextInput);

  elementClasses.push(AttributeListItem);
  elementClasses.push(AttributeList);
  elementClasses.push(ErrorMessages);
  elementClasses.push(PropertyBlock);
  elementClasses.push(PropertyLine);
  elementClasses.push(SectionDivider);
  elementClasses.push(TaperedRule);

  elementClasses.push(HeadingSection);
  elementClasses.push(ArmorClassSection);
  elementClasses.push(HitPointsSection);
  elementClasses.push(SpeedSection);
  elementClasses.push(AbilityScoresSection);
  elementClasses.push(SavingThrowsSection);
  elementClasses.push(SkillsSection);
  elementClasses.push(DamageVulnerabilitiesSection);
  elementClasses.push(DamageResistancesSection);
  elementClasses.push(DamageImmunitiesSection);
  elementClasses.push(ConditionImmunitiesSection);
  elementClasses.push(SensesSection);
  elementClasses.push(LanguagesSection);
  elementClasses.push(ChallengeRatingSection);

  elementClasses.push(StatBlock);
  elementClasses.push(TopStats);
  elementClasses.push(BasicStats);
  elementClasses.push(AdvancedStats);

  for (const elementClass of elementClasses) {
    await elementClass.define();
  }
}

init();
