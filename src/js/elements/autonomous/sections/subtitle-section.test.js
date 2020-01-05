import SubtitleSection from './subtitle-section.js';
import * as TestCustomElements from '../../../helpers/test/test-custom-elements.js';

import { inputValueAndTriggerEvent } from '../../../helpers/element-helpers.js';

import Creature from '../../../models/creature.js';

const defaultTitle = 'Commoner';

let subtitleSection;

beforeAll(async() => {
  await TestCustomElements.define();
  await SubtitleSection.define();
});

beforeEach(() => {
  Creature.reset();

  subtitleSection = new SubtitleSection();
  TestCustomElements.initializeSection(subtitleSection);
  subtitleSection.connect();
});

describe('when the show section is clicked', () => {
  beforeEach(() => {
    subtitleSection.showElements.section.click();
  });

  it('should switch to edit mode and focus on the size field', () => {
    expect(subtitleSection).toBeInMode('edit');
    expect(subtitleSection.editElements.size).toHaveFocus();
  });

  describe('and fields are populated and the edit section is submitted', () => {
    describe('should switch to show mode and save the creature size, type, tags, and alignment', () => {
      /* eslint-disable indent, no-unexpected-multiline */
      it.each
      `
        description        | size            | type             | tags                     | alignment           | expectedSubtitle
        ${'no tags'}       | ${'Gargantuan'} | ${'monstrosity'} | ${''}                    | ${'neutral'}        | ${'Gargantuan monstrosity, neutral'}
        ${'single tag'}    | ${'Small'}      | ${'humanoid'}    | ${'halfling'}            | ${'lawful good'}    | ${'Small humanoid (halfling), lawful good'}
        ${'multiple tags'} | ${'Tiny'}       | ${'fiend'}       | ${'demon, shapechanger'} | ${'chaotic evil'}   | ${'Tiny fiend (demon, shapechanger), chaotic evil'}
        ${'trimmed tags'}  | ${'Large'}      | ${'giant'}       | ${'    titan '}          | ${'lawful neutral'} | ${'Large giant (titan), lawful neutral'}
      `
      ('$description: {size="$size", type="$type", tags="$tags", alignment="$alignment"} => $expectedSubtitle',
      ({size, type, tags, alignment, expectedSubtitle}) => {
        inputValueAndTriggerEvent(subtitleSection.editElements.size, size);
        inputValueAndTriggerEvent(subtitleSection.editElements.tags, tags);
        inputValueAndTriggerEvent(subtitleSection.editElements.type, type);
        inputValueAndTriggerEvent(subtitleSection.editElements.alignment, alignment);

        subtitleSection.editElements.submitForm();

        tags = tags.trim();

        expect(Creature.size).toBe(size);
        expect(Creature.type).toBe(type);
        expect(Creature.tags).toBe(tags);
        expect(Creature.alignment).toBe(alignment);

        expect(subtitleSection).toBeInMode('show');
        expect(subtitleSection.showElements.subtitle).toHaveTextContent(expectedSubtitle);

        verifyJsonExport( size, type, tags, alignment);
        verifyHtmlExport(expectedSubtitle);
        verifyHomebreweryExport(expectedSubtitle);
      });
      /* eslint-enable indent, no-unexpected-multiline */
    });
  });
});

function verifyJsonExport(expectedSize, expectedType, expectedTags, expectedAlignment) {
  const json = subtitleSection.exportToJson();
  const expectedJson = {
    fullName: defaultTitle,
    shortName: '',
    isProperNoun: false,
    size: expectedSize,
    type: expectedType,
    tags: expectedTags,
    alignment: expectedAlignment
  };

  expect(json).toStrictEqual(expectedJson);
}

function verifyHtmlExport(expectedSubtitle) {
  const creatureHeading = subtitleSection.exportToHtml();
  const title = creatureHeading.querySelector('h1');
  const subtitle = creatureHeading.querySelector('h2');

  expect(creatureHeading.tagName).toBe('CREATURE-HEADING');
  expect(title).toHaveTextContent(defaultTitle);
  expect(subtitle).toHaveTextContent(expectedSubtitle);
}

function verifyHomebreweryExport(expectedSubtitle) {
  const text = subtitleSection.exportToHomebrewery();
  const expectedText =
    `> ## ${defaultTitle}\n>*${expectedSubtitle}*`;

  expect(text).toBe(expectedText);
}
