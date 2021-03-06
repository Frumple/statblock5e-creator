import * as HtmlExportDocumentFactory from './helpers/html-export-document-factory.js';
import { fetchFromFile } from './helpers/file-helpers.js';
import CurrentContext from './models/current-context.js';

import BlockTextArea from './elements/builtin/block-textarea.js';
import DynamicSelect from './elements/builtin/dynamic-select.js';
import EnableDisableElementsCheckbox from './elements/builtin/enable-disable-elements-checkbox.js';
import NumberInput from './elements/builtin/number-input.js';
import NumberSelect from './elements/builtin/number-select.js';
import PropertyDataList from './elements/builtin/property-datalist.js';
import SanitizedParagraph from './elements/builtin/sanitized-paragraph.js';
import TextInput from './elements/builtin/text-input.js';

import ErrorMessages from './elements/autonomous/error-messages.js';
import GettingStartedHelpBox from './elements/autonomous/getting-started-help-box.js';
import LoadingScreen from './elements/autonomous/loading-screen.js';
import PropertyBlock from './elements/autonomous/property-block.js';
import PropertyLine from './elements/autonomous/property-line.js';
import SectionDivider from './elements/autonomous/section-divider.js';
import SlideToggle from './elements/autonomous/slide-toggle.js';
import SpellCategoryBox from './elements/autonomous/spell-category-box.js';
import TaperedRule from './elements/autonomous/tapered-rule.js';

import ImportJsonDialog from './elements/autonomous/dialogs/import-json-dialog.js';
import ImportSrdDialog from './elements/autonomous/dialogs/import-srd-dialog.js';
import ImportOpen5eDialog from './elements/autonomous/dialogs/import-open5e-dialog.js';

import ResetDialog from './elements/autonomous/dialogs/reset-dialog.js';
import ExportDialog from './elements/autonomous/dialogs/export-dialog.js';
import GenerateAttackDialog from './elements/autonomous/dialogs/generate-attack-dialog.js';
import GenerateSpellcastingDialog from './elements/autonomous/dialogs/generate-spellcasting-dialog.js';

import DropDownMenu from './elements/autonomous/menus/drop-down-menu.js';
import ExpressionMenu from './elements/autonomous/menus/expression-menu.js';

import HelpTooltip from './elements/autonomous/tooltips/help-tooltip.js';
import CustomTextHelpTooltip from './elements/autonomous/tooltips/custom-text-help-tooltip.js';

import DisplayBlockList from './elements/autonomous/lists/display-block-list.js';
import DisplayBlock from './elements/autonomous/lists/display-block.js';
import EditableBlock from './elements/autonomous/lists/editable-block.js';
import EditableBlockList from './elements/autonomous/lists/editable-block-list.js';
import LegendaryActionDisplayBlockList from './elements/autonomous/lists/legendary-action-display-block-list.js';
import LegendaryActionDisplayBlock from './elements/autonomous/lists/legendary-action-display-block.js';
import LegendaryActionEditableBlockList from './elements/autonomous/lists/legendary-action-editable-block-list.js';
import LegendaryActionEditableBlock from './elements/autonomous/lists/legendary-action-editable-block.js';
import PropertyListItem from './elements/autonomous/lists/property-list-item.js';
import PropertyList from './elements/autonomous/lists/property-list.js';

import TitleSection from './elements/autonomous/sections/title-section.js';
import SubtitleSection from './elements/autonomous/sections/subtitle-section.js';
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
import LegendaryActionsSection from './elements/autonomous/sections/legendary-actions-section.js';

import StatBlockEditor from './elements/autonomous/containers/stat-block-editor.js';
import StatBlockMenu from './elements/autonomous/containers/stat-block-menu.js';
import StatBlockSidebar from './elements/autonomous/containers/stat-block-sidebar.js';
import StatBlock from './elements/autonomous/containers/stat-block.js';
import HeadingStats from './elements/autonomous/containers/heading-stats.js';
import TopStats from './elements/autonomous/containers/top-stats.js';
import BottomStats from './elements/autonomous/containers/bottom-stats.js';
import BasicStats from './elements/autonomous/containers/basic-stats.js';
import AdvancedStats from './elements/autonomous/containers/advanced-stats.js';

async function init() {
  CurrentContext.localSettings.version = await getVersion();

  await defineElements();

  const loadingScreen = document.querySelector('loading-screen');
  const statBlockEditor = document.querySelector('stat-block-editor');

  loadingScreen.status = 'Initializing HTML export template...';
  await HtmlExportDocumentFactory.init();

  loadingScreen.status = 'Loading JSON from local storage...';
  statBlockEditor.loadJsonFromLocalStorage();

  loadingScreen.status = 'Loading local settings from local storage...';
  statBlockEditor.loadLocalSettingsFromLocalStorage();

  loadingScreen.status = 'Waiting for elements to load...';
  await waitForBodyLoaded();

  statBlockEditor.classList.remove('stat-block-editor_hidden');
  loadingScreen.visible = false;
}

async function getVersion() {
  const packageJsonText = await fetchFromFile('package.json');
  const packageJson = JSON.parse(packageJsonText);

  return packageJson.version;
}

async function defineElements() {
  const elementClasses = [
    BlockTextArea,
    DynamicSelect,
    EnableDisableElementsCheckbox,
    NumberInput,
    NumberSelect,
    PropertyDataList,
    SanitizedParagraph,
    TextInput,

    DropDownMenu,
    ErrorMessages,
    ExpressionMenu,
    GettingStartedHelpBox,
    LoadingScreen,
    PropertyBlock,
    PropertyLine,
    SectionDivider,
    SlideToggle,
    SpellCategoryBox,
    TaperedRule,

    ImportJsonDialog,
    ImportSrdDialog,
    ImportOpen5eDialog,

    ResetDialog,
    ExportDialog,
    GenerateAttackDialog,
    GenerateSpellcastingDialog,

    HelpTooltip,
    CustomTextHelpTooltip,

    DisplayBlockList,
    DisplayBlock,
    EditableBlock,
    EditableBlockList,
    LegendaryActionDisplayBlockList,
    LegendaryActionDisplayBlock,
    LegendaryActionEditableBlockList,
    LegendaryActionEditableBlock,
    PropertyListItem,
    PropertyList,

    TitleSection,
    SubtitleSection,
    ArmorClassSection,
    HitPointsSection,
    SpeedSection,
    AbilityScoresSection,
    SavingThrowsSection,
    SkillsSection,
    DamageVulnerabilitiesSection,
    DamageResistancesSection,
    DamageImmunitiesSection,
    ConditionImmunitiesSection,
    SensesSection,
    LanguagesSection,
    ChallengeRatingSection,
    SpecialTraitsSection,
    ActionsSection,
    ReactionsSection,
    LegendaryActionsSection,

    StatBlockEditor,
    StatBlockMenu,
    StatBlockSidebar,
    StatBlock,
    HeadingStats,
    TopStats,
    BottomStats,
    BasicStats,
    AdvancedStats
  ];

  for (const elementClass of elementClasses) {
    await elementClass.define();
  }
}

async function waitForBodyLoaded() {
  return new Promise((resolve) => {
    const intervalId = window.setInterval(checkBodyLoaded, 1000);

    function checkBodyLoaded() {
      if (document.getElementsByTagName('body')[0] !== undefined) {
        window.clearInterval(intervalId);
        resolve();
      }
    }
  });
}

init();
