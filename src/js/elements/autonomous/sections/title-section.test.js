import TitleSection from './title-section.js';
import * as TestCustomElements from '../../../helpers/test/test-custom-elements.js';

import { inputValueAndTriggerEvent } from '../../../helpers/element-helpers.js';

import Creature from '../../../models/creature.js';

let titleSection;

beforeAll(async() => {
  await TestCustomElements.define();
  await TitleSection.define();
});

beforeEach(() => {
  Creature.reset();

  titleSection = new TitleSection();
  TestCustomElements.initializeSection(titleSection);
  titleSection.connect();
});

describe('when the show section is clicked', () => {
  beforeEach(() => {
    titleSection.showElements.section.click();
  });

  it('should switch to edit mode and focus on the title field', () => {
    expect(titleSection).toBeInMode('edit');
    expect(titleSection.editElements.fullName).toHaveFocus();
    expect(titleSection.editElements.fullName).toBeSelected();
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
        titleSection.addEventListener('creatureNameChanged', (event) => {
          receivedEvent = event;
        });

        if (creatureName !== '') {
          expectedCreatureName = creatureName;
          inputValueAndTriggerEvent(titleSection.editElements.fullName, creatureName);
        }
        if (shortName !== '') {
          expectedShortName = shortName;
          inputValueAndTriggerEvent(titleSection.editElements.shortName, shortName);
        }
        if (isProperNoun) {
          titleSection.editElements.properNoun.click();
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
    describe('should switch to show mode and save the creature name, size, type, tags, and alignment', () => {
      /* eslint-disable indent, no-unexpected-multiline */
      it.each
      `
        description                                   | fullName                 | shortName       | isProperNoun | size            | type            | tags          | alignment         | expectedSubtitle
        ${'full name only'}                           | ${'Aboleth'}             | ${''}           | ${false}     | ${'Large'}      | ${'aberration'} | ${''}         | ${'lawful evil'}  | ${'Large aberration, lawful evil'}
        ${'full name and short name'}                 | ${'Adult Copper Dragon'} | ${'dragon'}     | ${false}     | ${'Huge'}       | ${'dragon'}     | ${''}         | ${'chaotic good'} | ${'Huge dragon, chaotic good'}
        ${'full name, is proper noun'}                | ${'Tiamat'}              | ${''}           | ${true}      | ${'Gargantuan'} | ${'fiend'}      | ${''}         | ${'chaotic evil'} | ${'Gargantuan fiend, chaotic evil'}
        ${'full name and short name, is proper noun'} | ${'Lady Kima of Vord'}   | ${'Lady Kima'}  | ${true}      | ${'Medium'}     | ${'humanoid'}   | ${'halfling'} | ${'lawful good'}  | ${'Medium humanoid (halfling), lawful good'}
      `
      ('$description: {fullName="$fullName", shortName="$shortName", isProperNoun="$isProperNoun", size="$size", type="$type", tags="$tags", alignment="$alignment"} => $expectedSubtitle',
      ({fullName, shortName, isProperNoun, size, type, tags, alignment, expectedSubtitle}) => {
        inputValueAndTriggerEvent(titleSection.editElements.fullName, fullName);
        inputValueAndTriggerEvent(titleSection.editElements.shortName, shortName);
        inputValueAndTriggerEvent(titleSection.editElements.properNoun, isProperNoun);
        inputValueAndTriggerEvent(titleSection.editElements.size, size);
        inputValueAndTriggerEvent(titleSection.editElements.tags, tags);
        inputValueAndTriggerEvent(titleSection.editElements.type, type);
        inputValueAndTriggerEvent(titleSection.editElements.alignment, alignment);

        titleSection.editElements.submitForm();

        expect(Creature.fullName).toBe(fullName);
        expect(Creature.shortName).toBe(shortName);
        expect(Creature.isProperNoun).toBe(isProperNoun);
        expect(Creature.size).toBe(size);
        expect(Creature.type).toBe(type);
        expect(Creature.tags).toBe(tags);
        expect(Creature.alignment).toBe(alignment);

        expect(titleSection).toBeInMode('show');
        expect(titleSection.showElements.title).toHaveTextContent(fullName);
        expect(titleSection.showElements.subtitle).toHaveTextContent(expectedSubtitle);

        verifyJsonExport(fullName, shortName, isProperNoun, size, type, tags, alignment);
        verifyHtmlExport(fullName, expectedSubtitle);
        verifyHomebreweryExport(fullName, expectedSubtitle);
      });
      /* eslint-enable indent, no-unexpected-multiline */
    });

    it('should capitalize the first letter in the creature name', () => {
      const fullName = 'young red dragon';
      const expectedFullName = 'Young red dragon';

      inputValueAndTriggerEvent(titleSection.editElements.fullName, fullName);

      titleSection.editElements.submitForm();

      expect(Creature.fullName).toBe(expectedFullName);

      expect(titleSection).toBeInMode('show');
      expect(titleSection.showElements.title).toHaveTextContent(expectedFullName);
    });

    it('should trim whitespace from the creature name', () => {
      inputValueAndTriggerEvent(titleSection.editElements.fullName, '  Purple Worm ');
      inputValueAndTriggerEvent(titleSection.editElements.size, 'Gargantuan');
      inputValueAndTriggerEvent(titleSection.editElements.type, 'monstrosity');
      inputValueAndTriggerEvent(titleSection.editElements.alignment, 'unaligned');

      titleSection.editElements.submitForm();

      expect(Creature.fullName).toBe('Purple Worm');
      expect(Creature.size).toBe('Gargantuan');
      expect(Creature.type).toBe('monstrosity');
      expect(Creature.alignment).toBe('unaligned');

      expect(titleSection).toBeInMode('show');
      expect(titleSection.showElements.title).toHaveTextContent('Purple Worm');
      expect(titleSection.showElements.subtitle).toHaveTextContent('Gargantuan monstrosity, unaligned');
    });

    it('should display an error if the creature name field is blank', () => {
      inputValueAndTriggerEvent(titleSection.editElements.fullName, '');

      titleSection.editElements.submitForm();

      expect(titleSection).toBeInMode('edit');
      expect(titleSection).toHaveError(
        titleSection.editElements.fullName,
        'Creature Name cannot be blank.');
    });
  });
});

function verifyJsonExport(expectedFullName, expectedShortName, expectedIsProperNoun, expectedSize, expectedType, expectedTags, expectedAlignment) {
  const json = titleSection.exportToJson();
  const expectedJson = {
    fullName: expectedFullName,
    shortName: expectedShortName,
    isProperNoun: expectedIsProperNoun,
    size: expectedSize,
    type: expectedType,
    tags: expectedTags,
    alignment: expectedAlignment
  };

  expect(json).toStrictEqual(expectedJson);
}

function verifyHtmlExport(expectedTitle, expectedSubtitle) {
  const creatureHeading = titleSection.exportToHtml();
  const title = creatureHeading.querySelector('h1');
  const subtitle = creatureHeading.querySelector('h2');

  expect(creatureHeading.tagName).toBe('CREATURE-HEADING');
  expect(title).toHaveTextContent(expectedTitle);
  expect(subtitle).toHaveTextContent(expectedSubtitle);
}

function verifyHomebreweryExport(expectedTitle, expectedSubtitle) {
  const text = titleSection.exportToHomebrewery();
  const expectedText =
    `> ## ${expectedTitle}\n>*${expectedSubtitle}*`;

  expect(text).toBe(expectedText);
}
