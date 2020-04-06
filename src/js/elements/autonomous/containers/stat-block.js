import CustomAutonomousElement from '../custom-autonomous-element.js';
import CurrentContext from '../../../models/current-context.js';
import isRunningInJsdom from '../../../helpers/is-running-in-jsdom.js';
import HeadingStats from '../containers/heading-stats.js';
import TopStats from '../containers/top-stats.js';
import BottomStats from '../containers/bottom-stats.js';

export default class StatBlock extends CustomAutonomousElement {
  static get elementName() { return 'stat-block'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'stat-block',
      'src/html/elements/autonomous/containers/stat-block.html');
  }

  constructor(parent = null) {
    super(StatBlock.templatePaths, parent);

    if (isRunningInJsdom) {
      this.headingStats = new HeadingStats();
      this.topStats = new TopStats();
      this.bottomStats = new BottomStats();
    } else {
      this.headingStats = document.querySelector('heading-stats');
      this.topStats = document.querySelector('top-stats');
      this.bottomStats = document.querySelector('bottom-stats');
    }

    this.gettingStartedHelpBox = this.shadowRoot.getElementById('getting-started-help-box');
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      super.connectedCallback();

      this.addEventListener('creatureNameChanged', this.onCreatureNameChanged.bind(this));
      this.addEventListener('creatureSizeChanged', this.onCreatureSizeChanged.bind(this));
      this.addEventListener('abilityScoreChanged', this.onAbilityScoreChanged.bind(this));
      this.addEventListener('proficiencyBonusChanged', this.onProficiencyBonusChanged.bind(this));
      this.addEventListener('skillChanged', this.onSkillChanged.bind(this));

      this.isInitialized = true;
    }
  }

  onCreatureNameChanged() {
    this.reparseBlockSections();
  }

  onCreatureSizeChanged() {
    this.topStats.updateHitPointsView();
  }

  onAbilityScoreChanged() {
    const abilityName = event.detail.abilityName;

    if (abilityName === 'constitution') {
      this.topStats.updateHitPointsView();
    } else if (abilityName === 'wisdom') {
      this.topStats.updateSensesView();
    }

    this.topStats.updateSavingThrowsView(abilityName);
    this.topStats.updateSkillsView(abilityName);

    this.reparseBlockSections();
  }

  onProficiencyBonusChanged() {
    this.topStats.updateSavingThrowsView();
    this.topStats.updateSkillsView();
    this.topStats.updateSensesView();

    this.reparseBlockSections();
  }

  onSkillChanged() {
    const skillName = event.detail.skillName;

    if (skillName === 'perception') {
      this.topStats.updateSensesView();
    }
  }

  setColumns(columns) {
    if (columns === 1) {
      delete this.dataset.twoColumn;
    } else if (columns === 2) {
      this.dataset.twoColumn = '';
    }
  }

  setColumnHeight(mode, height) {
    if (mode === 'auto') {
      this.removeAttribute('style');
    } else if (mode === 'manual') {
      this.setAttribute('style', `--statblock-content-height: ${height}px;`);
    }
  }

  setEmptyVisibility(visibility) {
    this.headingStats.setEmptyVisibility(visibility);
    this.topStats.setEmptyVisibility(visibility);
    this.bottomStats.setEmptyVisibility(visibility);
  }

  setGettingStartedVisibility(visibility) {
    this.gettingStartedHelpBox.visible = visibility;
  }

  edit() {
    // Edit in reverse order so that the title section is the last to gain focus
    this.bottomStats.edit();
    this.topStats.edit();
    this.headingStats.edit();
  }

  save() {
    this.bottomStats.save();
    this.topStats.save();
    this.headingStats.save();
  }

  updateView() {
    this.headingStats.updateView();
    this.topStats.updateView();
    this.bottomStats.updateView();
  }

  reparseBlockSections() {
    this.bottomStats.reparseAllSections();
  }

  importFromOpen5e(json) {
    this.headingStats.importFromOpen5e(json);
    this.topStats.importFromOpen5e(json);
    this.bottomStats.importFromOpen5e(json);
  }

  importFromJson(json) {
    this.headingStats.importFromJson(json);
    this.topStats.importFromJson(json);
    this.bottomStats.importFromJson(json);
  }

  exportToJson() {
    const json = {};

    Object.assign(json, this.headingStats.exportToJson());
    Object.assign(json, this.topStats.exportToJson());
    Object.assign(json, this.bottomStats.exportToJson());

    return json;
  }

  exportToHtml() {
    const layoutSettings = CurrentContext.layoutSettings;

    const statBlockElement = document.createElement('stat-block');

    const headingStats = this.headingStats.exportToHtml();
    const topStats = this.topStats.exportToHtml();
    const bottomStats = this.bottomStats.exportToHtml();

    statBlockElement.appendChild(headingStats);
    statBlockElement.appendChild(topStats);
    statBlockElement.appendChild(bottomStats);

    if (layoutSettings.columns === 2) {
      statBlockElement.dataset.twoColumn = '';

      if (layoutSettings.twoColumnMode === 'manual') {
        statBlockElement.setAttribute('style', `--data-content-height: ${layoutSettings.twoColumnHeight}px`);
      }
    }

    return statBlockElement;
  }

  exportToMarkdown() {
    const layoutSettings = CurrentContext.layoutSettings;

    let blockHeader = '___';
    if (layoutSettings.columns === 2) {
      blockHeader += '\n___';
    }

    const headingStats = this.headingStats.exportToMarkdown();
    const topStats = this.topStats.exportToMarkdown();
    const bottomStats = this.bottomStats.exportToMarkdown();

    return `${blockHeader}\n${headingStats}\n${topStats}\n${bottomStats}`;
  }
}
