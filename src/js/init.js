import CustomTextArea from './elements/builtin/custom-textarea.js';
import EnableDisableElementsCheckbox from './elements/builtin/enable-disable-elements-checkbox.js';
import IntegerInput from './elements/builtin/integer-input.js';
import PropertyDataList from './elements/builtin/property-datalist.js';
import TextInput from './elements/builtin/text-input.js';

import ErrorMessages from './elements/autonomous/error-messages.js';
import HelpTooltip from './elements/autonomous/help-tooltip.js';
import PropertyBlock from './elements/autonomous/property-block.js';
import PropertyLine from './elements/autonomous/property-line.js';
import SectionDivider from './elements/autonomous/section-divider.js';
import TaperedRule from './elements/autonomous/tapered-rule.js';

import DisplayBlockList from './elements/autonomous/lists/display-block-list.js';
import DisplayBlockListItem from './elements/autonomous/lists/display-block-list-item.js';
import EditableBlockListItem from './elements/autonomous/lists/editable-block-list-item.js';
import EditableBlockList from './elements/autonomous/lists/editable-block-list.js';
import PropertyListItem from './elements/autonomous/lists/property-list-item.js';
import PropertyList from './elements/autonomous/lists/property-list.js';

import HeadingSection from './elements/autonomous/sections/heading-section.js';
import ArmorClassSection from './elements/autonomous/sections/armor-class-section.js';
import HitPointsSection from './elements/autonomous/sections/hit-points-section.js';
import SpeedSection from './elements/autonomous/sections/speed-section.js';
import AbilityScoresSection from './elements/autonomous/sections/ability-scores-section.js';
import SavingThrowsSection from './elements/autonomous/sections/saving-throws-section.js';
import SkillsSection from './elements/autonomous/sections/skills-section.js';
import DamageVulnerabilitiesSection from './elements/autonomous/sections/damage-vulnerabilities-section.js';
import DamageResistancesSection from './elements/autonomous/sections/damage-resistances-section.js';
import DamageImmunitiesSection from './elements/autonomous/sections/damage-immunities-section.js';
import ConditionImmunitiesSection from './elements/autonomous/sections/condition-immunities-section.js';
import SensesSection from './elements/autonomous/sections/senses-section.js';
import LanguagesSection from './elements/autonomous/sections/languages-section.js';
import ChallengeRatingSection from './elements/autonomous/sections/challenge-rating-section.js';
import SpecialTraitsSection from './elements/autonomous/sections/special-traits-section.js';
import ActionsSection from './elements/autonomous/sections/actions-section.js';
import ReactionsSection from './elements/autonomous/sections/reactions-section.js';

import StatBlockEditor from './elements/autonomous/containers/stat-block-editor.js';
import StatBlockMenu from './elements/autonomous/containers/stat-block-menu.js';
import StatBlockSidebar from './elements/autonomous/containers/stat-block-sidebar.js';
import StatBlock from './elements/autonomous/containers/stat-block.js';
import TopStats from './elements/autonomous/containers/top-stats.js';
import BottomStats from './elements/autonomous/containers/bottom-stats.js';
import BasicStats from './elements/autonomous/containers/basic-stats.js';
import AdvancedStats from './elements/autonomous/containers/advanced-stats.js';

async function init() {
  const elementClasses = [];

  elementClasses.push(CustomTextArea);
  elementClasses.push(EnableDisableElementsCheckbox);
  elementClasses.push(IntegerInput);
  elementClasses.push(PropertyDataList);
  elementClasses.push(TextInput);

  elementClasses.push(ErrorMessages);
  elementClasses.push(HelpTooltip);
  elementClasses.push(PropertyBlock);
  elementClasses.push(PropertyLine);
  elementClasses.push(SectionDivider);
  elementClasses.push(TaperedRule);

  elementClasses.push(DisplayBlockList);
  elementClasses.push(DisplayBlockListItem);
  elementClasses.push(EditableBlockListItem);
  elementClasses.push(EditableBlockList);
  elementClasses.push(PropertyListItem);
  elementClasses.push(PropertyList);

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
  elementClasses.push(SpecialTraitsSection);
  elementClasses.push(ActionsSection);
  elementClasses.push(ReactionsSection);

  elementClasses.push(StatBlockEditor);
  elementClasses.push(StatBlockMenu);
  elementClasses.push(StatBlockSidebar);
  elementClasses.push(StatBlock);
  elementClasses.push(TopStats);
  elementClasses.push(BottomStats);
  elementClasses.push(BasicStats);
  elementClasses.push(AdvancedStats);

  for (const elementClass of elementClasses) {
    await elementClass.define();
  }
}

init();
