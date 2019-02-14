import SensesSection from '/src/js/elements/autonomous/sections/senses-section.js';
import SectionTestMixin from '/src/js/helpers/test/section-test-mixin.js';

import { copyObjectProperties } from '/src/js/helpers/object-helpers.js';
import defineBuiltinCustomElements from '/src/js/helpers/test/define-builtin-custom-elements.js';
import { inputValueAndTriggerEvent } from '/src/js/helpers/element-helpers.js';

import Abilities from '/src/js/stats/abilities.js';
import ProficiencyBonus from '/src/js/stats/proficiency-bonus.js';
import Skills from '/src/js/stats/skills.js';

let sensesSection;

beforeAll(async() => {
  defineBuiltinCustomElements();
  await SensesSection.define();
});

beforeEach(() => {
  Abilities.reset();
  ProficiencyBonus.reset();
  Skills.reset();

  sensesSection = new SensesSection();
  copyObjectProperties(sensesSection, SectionTestMixin);
  sensesSection.initializeCustomElements();
  sensesSection.forceConnect();
});

afterEach(() => {
  document.clear();
});

describe('when the show section is clicked', () => {
  beforeEach(() => {
    sensesSection.showElements.section.click(); 
  });

  it('should switch to edit mode and focus on the blindsight field', () => {
    expect(sensesSection).toBeInMode('edit');
    expect(sensesSection.editElements.blindsight).toHaveFocus();
  });

  describe('and the custom text checkbox is checked', () => {
    beforeEach(() => {
      sensesSection.editElements.useCustom.click();
    });

    it('should enable the custom text field, disable all other fields, and focus on the custom text field', () => {
      expect(sensesSection.editElements.blindsight).toBeDisabled();
      expect(sensesSection.editElements.darkvision).toBeDisabled();
      expect(sensesSection.editElements.tremorsense).toBeDisabled();
      expect(sensesSection.editElements.truesight).toBeDisabled();
      expect(sensesSection.editElements.customText).not.toBeDisabled();

      expect(sensesSection.editElements.customText).toHaveFocus();
    });

    describe('and the custom text field is populated and the save button is clicked', () => {
      it('should switch to show mode and save the custom text', () => {
        let customText = 'darkvision 120 ft. (penetrates magical darkness), passive Perception 13';
        inputValueAndTriggerEvent(sensesSection.editElements.customText, customText);

        sensesSection.editElements.saveAction.click();

        expect(sensesSection).toBeInMode('show');
        expect(sensesSection.showElements.text).toHaveTextContent(customText);
      });

      it('should display an error if the custom text field is blank', () => {
        inputValueAndTriggerEvent(sensesSection.editElements.customText, '');

        sensesSection.editElements.saveAction.click();

        expect(sensesSection).toBeInMode('edit');
        expect(sensesSection).toHaveSingleError(
          sensesSection.editElements.customText,
          'Senses Custom Text cannot be blank.');
      });
    });
  });

  describe('and the custom text checkbox is unchecked', () => {
    beforeEach(() => {
      sensesSection.editElements.useCustom.click();
      sensesSection.editElements.useCustom.click();
    });

    it('should disable the custom text field, enable all other fields, and focus on the blindsight field', () => {
      expect(sensesSection.editElements.blindsight).not.toBeDisabled();
      expect(sensesSection.editElements.darkvision).not.toBeDisabled();
      expect(sensesSection.editElements.tremorsense).not.toBeDisabled();
      expect(sensesSection.editElements.truesight).not.toBeDisabled();
      expect(sensesSection.editElements.customText).toBeDisabled();

      expect(sensesSection.editElements.blindsight).toHaveFocus();
    });

    describe('and the senses fields are populated and the save button is clicked', () => {
      describe('should switch to show mode and save the fields in the following combinations:', () => {
        /* eslint-disable indent, no-unexpected-multiline */
        it.each
        `
          description                                | blindsight | darkvision | tremorsense | truesight | expectedText
          ${'all blank'}                             | ${''}      | ${''}      | ${''}       | ${''}     | ${'passive Perception 10'}
          ${'blindsight only'}                       | ${30}      | ${''}      | ${''}       | ${''}     | ${'blindsight 30 ft., passive Perception 10'}
          ${'darkvision only'}                       | ${''}      | ${60}      | ${''}       | ${''}     | ${'darkvision 60 ft., passive Perception 10'}
          ${'tremorsense only'}                      | ${''}      | ${''}      | ${90}       | ${''}     | ${'tremorsense 90 ft., passive Perception 10'}
          ${'truesight only'}                        | ${''}      | ${''}      | ${''}       | ${120}    | ${'truesight 120 ft., passive Perception 10'}
          ${'blindsight + darkvision'}               | ${15}      | ${40}      | ${''}       | ${''}     | ${'blindsight 15 ft., darkvision 40 ft., passive Perception 10'}
          ${'blindsight + tremorsense'}              | ${50}      | ${''}      | ${35}       | ${''}     | ${'blindsight 50 ft., tremorsense 35 ft., passive Perception 10'}
          ${'blindsight + truesight'}                | ${25}      | ${''}      | ${''}       | ${80}     | ${'blindsight 25 ft., truesight 80 ft., passive Perception 10'}
          ${'darkvision + tremorsense'}              | ${''}      | ${45}      | ${100}      | ${''}     | ${'darkvision 45 ft., tremorsense 100 ft., passive Perception 10'}
          ${'darkvision + truesight'}                | ${''}      | ${180}     | ${''}       | ${20}     | ${'darkvision 180 ft., truesight 20 ft., passive Perception 10'}
          ${'tremorsense + truesight'}               | ${''}      | ${''}      | ${75}       | ${35}     | ${'tremorsense 75 ft., truesight 35 ft., passive Perception 10'}
          ${'blindsight + darkvision + tremorsense'} | ${150}     | ${55}      | ${5}        | ${''}     | ${'blindsight 150 ft., darkvision 55 ft., tremorsense 5 ft., passive Perception 10'}
          ${'blindsight + darkvision + truesight'}   | ${65}      | ${10}      | ${''}       | ${0}      | ${'blindsight 65 ft., darkvision 10 ft., truesight 0 ft., passive Perception 10'}
          ${'blindsight + tremorsense + truesight'}  | ${85}      | ${''}      | ${70}       | ${95}     | ${'blindsight 85 ft., tremorsense 70 ft., truesight 95 ft., passive Perception 10'}
          ${'darkvision + tremorsense + truesight'}  | ${''}      | ${105}     | ${110}      | ${115}    | ${'darkvision 105 ft., tremorsense 110 ft., truesight 115 ft., passive Perception 10'}
          ${'all senses'}                            | ${125}     | ${130}     | ${135}      | ${140}    | ${'blindsight 125 ft., darkvision 130 ft., tremorsense 135 ft., truesight 140 ft., passive Perception 10'}
          ${'maximum values'}                        | ${999}     | ${999}     | ${999}      | ${999}    | ${'blindsight 999 ft., darkvision 999 ft., tremorsense 999 ft., truesight 999 ft., passive Perception 10'}
        `
        ('$description: {blindsight="$blindsight", darkvision="$darkvision", tremorsense="$tremorsense", truesight="$truesight"} => "$expectedText"',
        ({blindsight, darkvision, tremorsense, truesight, expectedText}) => {
          inputValueAndTriggerEvent(sensesSection.editElements.blindsight, blindsight);
          inputValueAndTriggerEvent(sensesSection.editElements.darkvision, darkvision);
          inputValueAndTriggerEvent(sensesSection.editElements.tremorsense, tremorsense);
          inputValueAndTriggerEvent(sensesSection.editElements.truesight, truesight);

          sensesSection.editElements.saveAction.click();

          expect(sensesSection).toBeInMode('show');
          expect(sensesSection.showElements.text).toHaveTextContent(expectedText);
        });
        /* eslint-enable indent, no-unexpected-multiline */
      });
    });
  });
});

describe('should calculate the passive perception based on the following conditions:', () => {
  /* eslint-disable indent, no-unexpected-multiline */
  it.each
  `
    description                                           | wisdomScore | proficiencyBonus | perceptionEnabled | perceptionProficient | perceptionOverride | expectedPassivePerception
    ${'perception disabled, not proficient, no override'} | ${10}       | ${2}             | ${false}          | ${false}             | ${NaN}             | ${10}
    ${'perception enabled, not proficient, no override'}  | ${10}       | ${2}             | ${true}           | ${false}             | ${NaN}             | ${10}
    ${'perception enabled, proficient, no override'}      | ${10}       | ${2}             | ${true}           | ${true}              | ${NaN}             | ${12}
    ${'perception enabled, not proficient, override'}     | ${10}       | ${2}             | ${true}           | ${false}             | ${7}               | ${17}
    ${'perception enabled, proficient, override'}         | ${10}       | ${2}             | ${true}           | ${true}              | ${8}               | ${18}
    ${'- wisdom score and - proficiency bonus'}           | ${3}        | ${-1}            | ${true}           | ${true}              | ${NaN}             | ${5}
    ${'- wisdom score and 0 proficiency bonus'}           | ${3}        | ${0}             | ${true}           | ${true}              | ${NaN}             | ${6}
    ${'- wisdom score and + proficiency bonus'}           | ${3}        | ${3}             | ${true}           | ${true}              | ${NaN}             | ${9}
    ${'0 wisdom score and - proficiency bonus'}           | ${10}       | ${-1}            | ${true}           | ${true}              | ${NaN}             | ${9}
    ${'0 wisdom score and 0 proficiency bonus'}           | ${10}       | ${0}             | ${true}           | ${true}              | ${NaN}             | ${10}
    ${'0 wisdom score and + proficiency bonus'}           | ${10}       | ${3}             | ${true}           | ${true}              | ${NaN}             | ${13}
    ${'+ wisdom score and - proficiency bonus'}           | ${14}       | ${-1}            | ${true}           | ${true}              | ${NaN}             | ${11}
    ${'+ wisdom score and 0 proficiency bonus'}           | ${14}       | ${0}             | ${true}           | ${true}              | ${NaN}             | ${12}
    ${'+ wisdom score and + proficiency bonus'}           | ${14}       | ${3}             | ${true}           | ${true}              | ${NaN}             | ${15}
  `
  ('$description: {wisdomScore="$wisdomScore", proficiencyBonus="$proficiencyBonus", perceptionEnabled="$perceptionEnabled", perceptionProficient="$perceptionProficient", perceptionOverride="$perceptionOverride"} => $expectedPassivePerception',
  ({wisdomScore, proficiencyBonus, perceptionEnabled, perceptionProficient, perceptionOverride, expectedPassivePerception}) => {
    Abilities.abilities['wisdom'].score = wisdomScore;
    ProficiencyBonus.proficiencyBonus = proficiencyBonus;

    let skill = Skills.skills['perception'];
    skill.isEnabled = perceptionEnabled;
    skill.isProficient = perceptionProficient;
    skill.override = perceptionOverride;
    
    sensesSection.updatePassivePerception();

    expect(sensesSection.showElements.text).toHaveTextContent(`passive Perception ${expectedPassivePerception}`);

    sensesSection.showElements.editAction.click();

    expect(sensesSection.editElements.passivePerception).toHaveTextContent(expectedPassivePerception);    
  });
  /* eslint-enable indent, no-unexpected-multiline */
});