import HeadingSection from '/src/js/elements/autonomous/sections/heading-section.js';
import SectionTestMixin from '/src/js/helpers/test/section-test-mixin.js';

import { copyObjectProperties } from '/src/js/helpers/object-helpers.js';
import defineBuiltinCustomElements from '/src/js/helpers/test/define-builtin-custom-elements.js';
import { inputValueAndTriggerEvent } from '/src/js/helpers/element-helpers.js';

import Creature from '/src/js/stats/creature.js';

let headingSection;

beforeAll(async() => {
  defineBuiltinCustomElements();
  await HeadingSection.define();
});

beforeEach(() => {
  Creature.reset();

  headingSection = new HeadingSection();
  copyObjectProperties(headingSection, SectionTestMixin);
  headingSection.initializeCustomElements();
  headingSection.connect();
});

describe('when the show section is clicked', () => {
  beforeEach(() => {
    headingSection.showElements.section.click(); 
  });

  it('should switch to edit mode and focus on the title field', () => {
    expect(headingSection).toBeInMode('edit');
    expect(headingSection.editElements.title).toHaveFocus();
  });

  describe('and creature name, short name, and/or the proper noun checkbox is changed', () => {
    describe('should save the changes, the grammatical name used in block list sections should be correct, and should fire a creatureNameChanged event', () => {
      /* eslint-disable indent, no-unexpected-multiline */
      it.each
      `
        description                                  | creatureName           | shortName      | isProperNoun | expectedGrammaticalName
        ${'no changes'}                              | ${''}                  | ${''}          | ${false}     | ${'The commoner'}
        ${'creature name'}                           | ${'Bullywug'}          | ${''}          | ${false}     | ${'The bullywug'}
        ${'short name'}                              | ${''}                  | ${'peasant'}   | ${false}     | ${'The peasant'}
        ${'creature name + short name'}              | ${'Beholder Zombie'}   | ${'zombie'}    | ${false}     | ${'The zombie'}
        ${'no changes, proper noun'}                 | ${''}                  | ${''}          | ${true}      | ${'Commoner'}
        ${'creature name, proper noun'}              | ${'Tiamat'}            | ${''}          | ${true}      | ${'Tiamat'}
        ${'short name, proper noun'}                 | ${''}                  | ${'Bob'}       | ${true}      | ${'Bob'}
        ${'creature name + short name, proper noun'} | ${'Lady Kima of Vord'} | ${'Lady Kima'} | ${true}      | ${'Lady Kima'}
      `
      ('$description: {creatureName="$creatureName", shortName="$shortName", isProperNoun="$isProperNoun"} => expectedGrammaticalName',
      ({creatureName, shortName, isProperNoun, expectedGrammaticalName}) => {
        let expectedCreatureName = 'Commoner';
        let expectedShortName = '';

        let receivedEvent = null;
        headingSection.addEventListener('creatureNameChanged', (event) => {
          receivedEvent = event;
        });

        if (creatureName !== '') {
          expectedCreatureName = creatureName;
          inputValueAndTriggerEvent(headingSection.editElements.title, creatureName);
        }
        if (shortName !== '') {
          expectedShortName = shortName;
          inputValueAndTriggerEvent(headingSection.editElements.shortName, shortName);
        }        
        if (isProperNoun) {
          headingSection.editElements.properNoun.click();
        }

        expect(Creature.name).toBe(expectedCreatureName);
        expect(Creature.shortName).toBe(expectedShortName);
        expect(Creature.isProperNoun).toBe(isProperNoun);
        expect(Creature.grammaticalName).toBe(expectedGrammaticalName);

        if (creatureName !== '' || shortName !== '' || isProperNoun) {
          expect(receivedEvent).not.toBeNull();
          expect(receivedEvent.detail.creatureName).toBe(expectedCreatureName);
          expect(receivedEvent.detail.shortName).toBe(expectedShortName);
          expect(receivedEvent.detail.isProperNoun).toBe(isProperNoun);
        } else {
          expect(receivedEvent).toBeNull();
        }        
      });
      /* eslint-enable indent, no-unexpected-multiline */
    });    
  });

  describe('and fields are populated and the edit section is submitted', () => {
    it('should switch to show mode and save the creature name, size, type, and alignment', () => {
      inputValueAndTriggerEvent(headingSection.editElements.title, 'Beholder');
      inputValueAndTriggerEvent(headingSection.editElements.size, 'Large');
      inputValueAndTriggerEvent(headingSection.editElements.type, 'aberration');
      inputValueAndTriggerEvent(headingSection.editElements.alignment, 'lawful evil');
    
      headingSection.editElements.submitForm();

      expect(headingSection).toBeInMode('show');
      expect(headingSection.showElements.title).toHaveTextContent('Beholder');
      expect(headingSection.showElements.subtitle).toHaveTextContent('Large aberration, lawful evil');

      expect(Creature.shortName).toBe('');
      expect(Creature.isProperNoun).toBe(false);
    });

    it('should capitalize the first letter in the creature name', () => {
      inputValueAndTriggerEvent(headingSection.editElements.title, 'young red dragon');

      headingSection.editElements.submitForm();

      expect(headingSection).toBeInMode('show');
      expect(headingSection.showElements.title).toHaveTextContent('Young red dragon');
    });

    it('should trim whitespace from the creature name and type', () => {
      inputValueAndTriggerEvent(headingSection.editElements.title, '  Purple Worm ');
      inputValueAndTriggerEvent(headingSection.editElements.size, 'Gargantuan');
      inputValueAndTriggerEvent(headingSection.editElements.type, '    monstrosity        ');
      inputValueAndTriggerEvent(headingSection.editElements.alignment, 'unaligned');

      headingSection.editElements.submitForm();

      expect(headingSection).toBeInMode('show');
      expect(headingSection.showElements.title).toHaveTextContent('Purple Worm');
      expect(headingSection.showElements.subtitle).toHaveTextContent('Gargantuan monstrosity, unaligned');
    });

    it('should display an error if the creature name field is blank', () => {
      inputValueAndTriggerEvent(headingSection.editElements.title, '');

      headingSection.editElements.submitForm();

      expect(headingSection).toBeInMode('edit');
      expect(headingSection).toHaveError(
        headingSection.editElements.title,
        'Creature Name cannot be blank.');
    });

    it('should display an error if the creature type field is blank', () => {
      inputValueAndTriggerEvent(headingSection.editElements.type, '');

      headingSection.editElements.submitForm();

      expect(headingSection).toBeInMode('edit');
      expect(headingSection).toHaveError(
        headingSection.editElements.type,
        'Creature Type cannot be blank.');
    });

    it('should display both errors if the creature name and creature type fields are both blank', () => {
      inputValueAndTriggerEvent(headingSection.editElements.title, '');
      inputValueAndTriggerEvent(headingSection.editElements.type, '');

      headingSection.editElements.submitForm();

      expect(headingSection).toBeInMode('edit');
      expect(headingSection.errorMessages.errors).toHaveLength(2);
      expect(headingSection).toHaveError(
        headingSection.editElements.title,
        'Creature Name cannot be blank.',
        0);
      expect(headingSection).toHaveError(
        headingSection.editElements.type,
        'Creature Type cannot be blank.',
        1);
    });
  });  
});
