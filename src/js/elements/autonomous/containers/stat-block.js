import CustomAutonomousElement from '/src/js/elements/autonomous/custom-autonomous-element.js';

export default class StatBlock extends CustomAutonomousElement {
  static get elementName() { return 'stat-block'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'stat-block',
      'src/html/elements/autonomous/containers/stat-block.html');
  }

  constructor() {
    super(StatBlock.templatePaths);

    this.headingSection = document.querySelector('heading-section');
    this.topStats = document.querySelector('top-stats');   
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      this.addEventListener('abilityScoreChanged', this.onAbilityScoreChanged);  
      this.addEventListener('proficiencyBonusChanged', this.onProficiencyBonusChanged);  
      this.addEventListener('skillChanged', this.onSkillChanged);

      this.isInitialized = true;
    }
  }
  
  onAbilityScoreChanged() {
    let abilityName = event.detail.abilityName;
  
    if (abilityName === 'constitution') {
      this.topStats.basicStats.hitPointsSection.updateHitPoints();
    } else if (abilityName === 'wisdom') {
      this.topStats.advancedStats.sensesSection.updatePassivePerception();
    }

    this.topStats.advancedStats.savingThrowsSection.updateModifiers(abilityName);
    this.topStats.advancedStats.skillsSection.updateModifiers(abilityName);
  }

  onProficiencyBonusChanged() {
    this.topStats.advancedStats.savingThrowsSection.updateModifiers();
    this.topStats.advancedStats.skillsSection.updateModifiers();
    this.topStats.advancedStats.sensesSection.updatePassivePerception();
  }

  onSkillChanged() {
    let skillName = event.detail.skillName;
  
    if (skillName === 'perception') {
      this.topStats.advancedStats.sensesSection.updatePassivePerception();
    }
  }

  setColumns(columns) {
    if (columns === 1) {
      delete this.dataset.twoColumn;
    } else if (columns === 2) {
      this.dataset.twoColumn = '';
    }
  }

  setEmptySectionsVisibility(visibliity) {
    this.topStats.setEmptySectionsVisibility(visibliity);
  }

  editAllSections() {
    this.topStats.editAllSections();
    this.headingSection.edit();
  }

  saveAllSections() {    
    this.topStats.saveAllSections();
    this.headingSection.save();
  }
}
