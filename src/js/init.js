import AttributeDataList from '/src/js/elements/builtin/attribute-datalist.js';
import EnableDisableElementsCheckbox from '/src/js/elements/builtin/enable-disable-elements-checkbox.js';
import IntegerInput from '/src/js/elements/builtin/integer-input.js';
import TextInput from '/src/js/elements/builtin/text-input.js';

import AttributeListItem from '/src/js/elements/autonomous/attribute-list-item.js';
import AttributeList from '/src/js/elements/autonomous/attribute-list.js';
import ErrorMessages from '/src/js/elements/autonomous/error-messages.js';
import PropertyBlock from '/src/js/elements/autonomous/property-block.js';
import PropertyLine from '/src/js/elements/autonomous/property-line.js';
import SectionDivider from '/src/js/elements/autonomous/section-divider.js';
import TaperedRule from '/src/js/elements/autonomous/tapered-rule.js';
import TextBlockListItem from '/src/js/elements/autonomous/text-block-list-item.js';
import TextBlockList from '/src/js/elements/autonomous/text-block-list.js';

import HeadingSection from '/src/js/elements/autonomous/sections/heading-section.js';
import ArmorClassSection from '/src/js/elements/autonomous/sections/armor-class-section.js';
import HitPointsSection from '/src/js/elements/autonomous/sections/hit-points-section.js';
import SpeedSection from '/src/js/elements/autonomous/sections/speed-section.js';
import AbilityScoresSection from '/src/js/elements/autonomous/sections/ability-scores-section.js';
import SavingThrowsSection from '/src/js/elements/autonomous/sections/saving-throws-section.js';
import SkillsSection from '/src/js/elements/autonomous/sections/skills-section.js';
import DamageVulnerabilitiesSection from '/src/js/elements/autonomous/sections/damage-vulnerabilities-section.js';
import DamageResistancesSection from '/src/js/elements/autonomous/sections/damage-resistances-section.js';
import DamageImmunitiesSection from '/src/js/elements/autonomous/sections/damage-immunities-section.js';
import ConditionImmunitiesSection from '/src/js/elements/autonomous/sections/condition-immunities-section.js';
import SensesSection from '/src/js/elements/autonomous/sections/senses-section.js';
import LanguagesSection from '/src/js/elements/autonomous/sections/languages-section.js';
import ChallengeRatingSection from '/src/js/elements/autonomous/sections/challenge-rating-section.js';

import StatBlockEditor from '/src/js/elements/autonomous/containers/stat-block-editor.js';
import StatBlockMenu from '/src/js/elements/autonomous/containers/stat-block-menu.js';
import StatBlockSidebar from '/src/js/elements/autonomous/containers/stat-block-sidebar.js';
import StatBlock from '/src/js/elements/autonomous/containers/stat-block.js';
import TopStats from '/src/js/elements/autonomous/containers/top-stats.js';
import BasicStats from '/src/js/elements/autonomous/containers/basic-stats.js';
import AdvancedStats from '/src/js/elements/autonomous/containers/advanced-stats.js';

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
  elementClasses.push(TextBlockListItem);
  elementClasses.push(TextBlockList);

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

  elementClasses.push(StatBlockEditor);
  elementClasses.push(StatBlockMenu);
  elementClasses.push(StatBlockSidebar);
  elementClasses.push(StatBlock);
  elementClasses.push(TopStats);
  elementClasses.push(BasicStats);
  elementClasses.push(AdvancedStats);

  for (const elementClass of elementClasses) {
    await elementClass.define();
  }
}

init();
