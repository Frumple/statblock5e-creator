import HeadingSection from './heading-section.js';
import * as TestCustomElements from '../../../helpers/test/test-custom-elements.js';

import { inputValueAndTriggerEvent } from '../../../helpers/element-helpers.js';

import Creature from '../../../models/creature.js';

let headingSection;

beforeAll(async() => {
  await TestCustomElements.define();
  await HeadingSection.define();
});

beforeEach(() => {
  Creature.reset();

  headingSection = new HeadingSection();
  TestCustomElements.initializeSection(headingSection);
  headingSection.connect();
});

describe('when the show section is clicked', () => {
  beforeEach(() => {
    headingSection.showElements.section.click();
  });

  it('should switch to edit mode and focus on the title field', () => {
    expect(headingSection).toBeInMode('edit');
    expect(headingSection.editElements.fullName).toHaveFocus();
    expect(headingSection.editElements.fullName).toBeSelected();
  });

  describe('and creature name, short name, and/or the proper noun checkbox is changed', () => {
    describe('should save the changes, the grammatical name used in block list sections should be correct, and should fire a creatureNameChanged event', () => {
      /* eslint-disable indent, no-unexpected-multiline */
      it.each
      `
        description                                  | creatureName           | shortName      | isProperNoun | expectedGrammaticalName
        ${'no changes'}                              | ${''}                  | ${''}          | ${false}     | ${'the commoner'}
        ${'creature name'}                           | ${'Bullywug'}          | ${''}          | ${false}     | ${'the bullywug'}
        ${'short name'}                              | ${''}                  | ${'peasant'}   | ${false}     | ${'the peasant'}
        ${'creature name + short name'}              | ${'Beholder Zombie'}   | ${'zombie'}    | ${false}     | ${'the zombie'}
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
          inputValueAndTriggerEvent(headingSection.editElements.fullName, creatureName);
        }
        if (shortName !== '') {
          expectedShortName = shortName;
          inputValueAndTriggerEvent(headingSection.editElements.shortName, shortName);
        }
        if (isProperNoun) {
          headingSection.editElements.properNoun.click();
        }

        expect(Creature.fullName).toBe(expectedCreatureName);
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
    describe('should switch to show mode and save the creature name, size, type, and alignment', () => {
      /* eslint-disable indent, no-unexpected-multiline */
      it.each
      `
        description                                   | fullName                 | shortName       | isProperNoun | size            | type                     | alignment         | expectedSubtitle
        ${'full name only'}                           | ${'Aboleth'}             | ${''}           | ${false}     | ${'Large'}      | ${'aberration'}          | ${'lawful evil'}  | ${'Large aberration, lawful evil'}
        ${'full name and short name'}                 | ${'Adult Copper Dragon'} | ${'dragon'}     | ${false}     | ${'Huge'}       | ${'dragon'}              | ${'chaotic good'} | ${'Huge dragon, chaotic good'}
        ${'full name, is proper noun'}                | ${'Tiamat'}              | ${''}           | ${true}      | ${'Gargantuan'} | ${'fiend'}               | ${'chaotic evil'} | ${'Gargantuan fiend, chaotic evil'}
        ${'full name and short name, is proper noun'} | ${'Lady Kima of Vord'}   | ${'Lady Kima'}  | ${true}      | ${'Medium'}     | ${'humanoid (halfling)'} | ${'lawful good'}  | ${'Medium humanoid (halfling), lawful good'}
      `
      ('$description: {fullName="$fullName", shortName="$shortName", isProperNoun="$isProperNoun", size="$size", type="$type", alignment="$alignment"} => $expectedSubtitle',
      ({fullName, shortName, isProperNoun, size, type, alignment, expectedSubtitle}) => {
        inputValueAndTriggerEvent(headingSection.editElements.fullName, fullName);
        inputValueAndTriggerEvent(headingSection.editElements.shortName, shortName);
        inputValueAndTriggerEvent(headingSection.editElements.properNoun, isProperNoun);
        inputValueAndTriggerEvent(headingSection.editElements.size, size);
        inputValueAndTriggerEvent(headingSection.editElements.type, type);
        inputValueAndTriggerEvent(headingSection.editElements.alignment, alignment);

        headingSection.editElements.submitForm();

        expect(Creature.fullName).toBe(fullName);
        expect(Creature.shortName).toBe(shortName);
        expect(Creature.isProperNoun).toBe(isProperNoun);
        expect(Creature.size).toBe(size);
        expect(Creature.type).toBe(type);
        expect(Creature.alignment).toBe(alignment);

        expect(headingSection).toBeInMode('show');
        expect(headingSection.showElements.title).toHaveTextContent(fullName);
        expect(headingSection.showElements.subtitle).toHaveTextContent(expectedSubtitle);

        verifyJsonExport(fullName, shortName, isProperNoun, size, type, alignment);
        verifyHtmlExport(fullName, expectedSubtitle);
        verifyHomebreweryExport(fullName, expectedSubtitle);
      });
      /* eslint-enable indent, no-unexpected-multiline */
    });

    it('should capitalize the first letter in the creature name', () => {
      const fullName = 'young red dragon';
      const expectedFullName = 'Young red dragon';

      inputValueAndTriggerEvent(headingSection.editElements.fullName, fullName);

      headingSection.editElements.submitForm();

      expect(Creature.fullName).toBe(expectedFullName);

      expect(headingSection).toBeInMode('show');
      expect(headingSection.showElements.title).toHaveTextContent(expectedFullName);
    });

    it('should trim whitespace from the creature name and type', () => {
      inputValueAndTriggerEvent(headingSection.editElements.fullName, '  Purple Worm ');
      inputValueAndTriggerEvent(headingSection.editElements.size, 'Gargantuan');
      inputValueAndTriggerEvent(headingSection.editElements.type, '    monstrosity        ');
      inputValueAndTriggerEvent(headingSection.editElements.alignment, 'unaligned');

      headingSection.editElements.submitForm();

      expect(Creature.fullName).toBe('Purple Worm');
      expect(Creature.size).toBe('Gargantuan');
      expect(Creature.type).toBe('monstrosity');
      expect(Creature.alignment).toBe('unaligned');

      expect(headingSection).toBeInMode('show');
      expect(headingSection.showElements.title).toHaveTextContent('Purple Worm');
      expect(headingSection.showElements.subtitle).toHaveTextContent('Gargantuan monstrosity, unaligned');
    });

    it('should display an error if the creature name field is blank', () => {
      inputValueAndTriggerEvent(headingSection.editElements.fullName, '');

      headingSection.editElements.submitForm();

      expect(headingSection).toBeInMode('edit');
      expect(headingSection).toHaveError(
        headingSection.editElements.fullName,
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
      inputValueAndTriggerEvent(headingSection.editElements.fullName, '');
      inputValueAndTriggerEvent(headingSection.editElements.type, '');

      headingSection.editElements.submitForm();

      expect(headingSection).toBeInMode('edit');
      expect(headingSection.errorMessages.errors).toHaveLength(2);
      expect(headingSection).toHaveError(
        headingSection.editElements.fullName,
        'Creature Name cannot be blank.',
        0);
      expect(headingSection).toHaveError(
        headingSection.editElements.type,
        'Creature Type cannot be blank.',
        1);
    });
  });
});

function verifyJsonExport(expectedFullName, expectedShortName, expectedIsProperNoun, expectedSize, expectedType, expectedAlignment) {
  const jsObject = headingSection.exportToJson();
  const expectedJsObject = {
    fullName: expectedFullName,
    shortName: expectedShortName,
    isProperNoun: expectedIsProperNoun,
    size: expectedSize,
    type: expectedType,
    alignment: expectedAlignment
  };

  expect(jsObject).toStrictEqual(expectedJsObject);
}

function verifyHtmlExport(expectedTitle, expectedSubtitle) {
  const creatureHeading = headingSection.exportToHtml();
  const title = creatureHeading.querySelector('h1');
  const subtitle = creatureHeading.querySelector('h2');

  expect(creatureHeading.tagName).toBe('CREATURE-HEADING');
  expect(title).toHaveTextContent(expectedTitle);
  expect(subtitle).toHaveTextContent(expectedSubtitle);
}

function verifyHomebreweryExport(expectedTitle, expectedSubtitle) {
  const text = headingSection.exportToHomebrewery();
  const expectedText =
    `> ## ${expectedTitle}\n>*${expectedSubtitle}*`;

  expect(text).toBe(expectedText);
}
