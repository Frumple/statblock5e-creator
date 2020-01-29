import LegendaryActionsSection from './legendary-actions-section.js';

import CurrentContext from '../../../models/current-context.js';

import * as TestCustomElements from '../../../helpers/test/test-custom-elements.js';
import * as sharedSpecs from './block-list-section.specs.js';

import { inputValueAndTriggerEvent } from '../../../helpers/element-helpers.js';

const expectedHeading = 'Legendary Actions';
const expectedBlockType = 'Legendary Action';

const titleModel = CurrentContext.creature.title;
const abilitiesModel = CurrentContext.creature.abilities;
const legendaryActionsModel = CurrentContext.creature.legendaryActions;

let legendaryActionsSection;

beforeAll(async() => {
  await TestCustomElements.define();
  await LegendaryActionsSection.define();

  sharedSpecs.setExpectedHeading(expectedHeading);
});

beforeEach(() => {
  titleModel.reset();
  abilitiesModel.reset();
  legendaryActionsModel.reset();

  legendaryActionsSection = new LegendaryActionsSection();
  TestCustomElements.initializeSection(legendaryActionsSection);
  legendaryActionsSection.connect();
});

it('section should have default blocks', () => {
  sharedSpecs.sectionShouldHaveDefaultBlocks(legendaryActionsSection, legendaryActionsModel);
});

describe('when the show section is clicked', () => {
  beforeEach(() => {
    legendaryActionsSection.showElements.section.click();
  });

  it('should switch to edit mode and focus on the add button if there are no blocks', () => {
    sharedSpecs.shouldSwitchToEditModeAndFocusOnAddButtonIfNoBlocks(legendaryActionsSection);
  });

  it('should switch to edit mode and focus on the name field of the first block if there is at least one block', () => {
    sharedSpecs.shouldSwitchToEditModeAndFocusOnNameFieldOfFirstBlockIfExists(legendaryActionsSection);
  });

  describe('and the add block button is clicked', () => {
    it('should focus on the name field of the newly created block', () => {
      sharedSpecs.shouldFocusOnNameFieldOfNewBlock(legendaryActionsSection);
    });
  });

  describe('and the description is changed and the edit section is submitted', () => {
    const description = '[name] can take 5 legendary actions, choosing from one of the options below. Only one legendary action option can be used at a time and only at the end of another creature\'s turn. [name] regains spent legendary actions at the start of its turn.';
    const homebreweryDescription = 'The dragon can take 5 legendary actions, choosing from one of the options below. Only one legendary action option can be used at a time and only at the end of another creature\'s turn. The dragon regains spent legendary actions at the start of its turn.';
    const htmlDescription = 'The dragon can take 5 legendary actions, choosing from one of the options below. Only one legendary action option can be used at a time and only at the end of another creature\'s turn. The dragon regains spent legendary actions at the start of its turn.';

    it('should switch to mode and update the description, but the description is not shown if there are no legendary actions', () => {
      titleModel.fullName = 'Adult Red Dragon';
      titleModel.shortName = 'dragon';

      inputValueAndTriggerEvent(legendaryActionsSection.editElements.description, description);

      legendaryActionsSection.editElements.submitForm();

      expect(legendaryActionsSection).toBeInMode('show');
      verifyModelDescription(description, homebreweryDescription, htmlDescription);
      verifyEditModeDescription(description);
      verifyShowModeDescription(htmlDescription, false);

      const json = verifyJsonExportDescription(description);
      verifyHtmlExportDescription(htmlDescription);
      verifyHomebreweryExportDescription(homebreweryDescription);

      sharedSpecs.reset(legendaryActionsSection, legendaryActionsModel);
      legendaryActionsSection.importFromJson(json);

      verifyModelDescription(description, homebreweryDescription, htmlDescription);
      verifyEditModeDescription(description);
      verifyShowModeDescription(htmlDescription, false);
    });

    it('should switch to mode and update the description, and the description is shown if there are any legendary actions', () => {
      titleModel.fullName = 'Adult Red Dragon';
      titleModel.shortName = 'dragon';

      inputValueAndTriggerEvent(legendaryActionsSection.editElements.description, description);
      sharedSpecs.addAndPopulateBlock(legendaryActionsSection, 'Some name', 'Some text');

      legendaryActionsSection.editElements.submitForm();

      expect(legendaryActionsSection).toBeInMode('show');
      verifyModelDescription(description, homebreweryDescription, htmlDescription);
      verifyEditModeDescription(description);
      verifyShowModeDescription(htmlDescription, true);

      const json = verifyJsonExportDescription(description);
      verifyHtmlExportDescription(htmlDescription);
      verifyHomebreweryExportDescription(homebreweryDescription);

      sharedSpecs.reset(legendaryActionsSection, legendaryActionsModel);
      legendaryActionsSection.importFromJson(json);

      verifyModelDescription(description, homebreweryDescription, htmlDescription);
      verifyEditModeDescription(description);
      verifyShowModeDescription(htmlDescription, true);
    });

    it('should display an error if the description is blank', () => {
      inputValueAndTriggerEvent(legendaryActionsSection.editElements.description, '');

      legendaryActionsSection.editElements.submitForm();

      expect(legendaryActionsSection).toBeInMode('edit');
      expect(legendaryActionsSection).toHaveError(
        legendaryActionsSection.editElements.description,
        'Legendary Actions Description cannot be blank.');
    });
  });

  describe('and blocks are added and/or removed, and the edit section is submitted', () => {
    it('should add a single block', () => {
      const block = {
        name: 'Detect',
        text: '[name] makes a Wisdom (Perception) check.',
        homebreweryText: 'The dragon makes a Wisdom (Perception) check.',
        htmlText: 'The dragon makes a Wisdom (Perception) check.'
      };

      titleModel.fullName = 'Adult Red Dragon';
      titleModel.shortName = 'dragon';

      sharedSpecs.shouldAddASingleBlock(legendaryActionsSection, legendaryActionsModel, block);
    });

    it('should add a single block with multiline text', () => {
      const block = {
        name: 'Multiline Legendary Action',
        text: '**Line 1**. [name] is here.\n  **Line 2**. [name] is there.\n    **Line 3**. [name] is everywhere.',
        homebreweryText: '**Line 1**. The dummy is here.  \n>   **Line 2**. The dummy is there.  \n>     **Line 3**. The dummy is everywhere.',
        htmlText: '<strong>Line 1</strong>. The dummy is here.\n  <strong>Line 2</strong>. The dummy is there.\n    <strong>Line 3</strong>. The dummy is everywhere.'
      };

      titleModel.fullName = 'Dummy';

      sharedSpecs.shouldAddASingleBlock(legendaryActionsSection, legendaryActionsModel, block);
    });

    it('should add a single block with html escaped', () => {
      const block = {
        name: 'Escaped Legendary Action',
        text: '<strong>Line 1</strong>. [name] is here.',
        homebreweryText: '&lt;strong&gt;Line 1&lt;/strong&gt;. The dummy is here.',
        htmlText: '&lt;strong&gt;Line 1&lt;/strong&gt;. The dummy is here.'
      };

      titleModel.fullName = 'Dummy';

      sharedSpecs.shouldAddASingleBlock(legendaryActionsSection, legendaryActionsModel, block);
    });

    it('should add multiple blocks', () => {
      abilitiesModel.abilities['strength'].score = 27;

      const blocks = [
        {
          name: 'Detect',
          text: '[name] makes a Wisdom (Perception) check.',
          homebreweryText: 'The dragon makes a Wisdom (Perception) check.',
          htmlText: 'The dragon makes a Wisdom (Perception) check.'
        },
        {
          name: 'Tail Attack',
          text: '[name] makes a tail attack.',
          homebreweryText: 'The dragon makes a tail attack.',
          htmlText: 'The dragon makes a tail attack.'
        },
        {
          name: 'Wing Attack (Costs 2 Actions)',
          text: '[name] beats its wings. Each creature within 10 feet of the dragon must succeed on a DC 22 Dexterity saving throw or take dmg[2d6 + strmod] bludgeoning damage and be knocked prone. [name] can then fly up to half its flying speed.',
          homebreweryText: 'The dragon beats its wings. Each creature within 10 feet of the dragon must succeed on a DC 22 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.',
          htmlText: 'The dragon beats its wings. Each creature within 10 feet of the dragon must succeed on a DC 22 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.'
        }
      ];

      titleModel.fullName = 'Adult Red Dragon';
      titleModel.shortName = 'dragon';

      sharedSpecs.shouldAddMultipleBlocks(legendaryActionsSection, legendaryActionsModel, blocks);
    });

    it('should add a single block, then remove it', () => {
      const block = {
        name: 'Detect',
        text: '[name] makes a Wisdom (Perception) check.',
        homebreweryText: 'The dragon makes a Wisdom (Perception) check.',
        htmlText: 'The dragon makes a Wisdom (Perception) check.'
      };

      titleModel.fullName = 'Adult Red Dragon';
      titleModel.shortName = 'dragon';

      sharedSpecs.shouldAddASingleBlockThenRemoveIt(legendaryActionsSection, block);
    });

    it('should add multiple blocks, then remove one of them', () => {
      abilitiesModel.abilities['strength'].score = 27;

      const blocks = [
        {
          name: 'Detect',
          text: '[name] makes a Wisdom (Perception) check.',
          homebreweryText: 'The dragon makes a Wisdom (Perception) check.',
          htmlText: 'The dragon makes a Wisdom (Perception) check.'
        },
        {
          name: 'Tail Attack',
          text: '[name] makes a tail attack.',
          homebreweryText: 'The dragon makes a tail attack.',
          htmlText: 'The dragon makes a tail attack.'
        },
        {
          name: 'Wing Attack (Costs 2 Actions)',
          text: '[name] beats its wings. Each creature within 10 feet of the dragon must succeed on a DC 22 Dexterity saving throw or take dmg[2d6 + strmod] bludgeoning damage and be knocked prone. [name] can then fly up to half its flying speed.',
          homebreweryText: 'The dragon beats its wings. Each creature within 10 feet of the dragon must succeed on a DC 22 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.',
          htmlText: 'The dragon beats its wings. Each creature within 10 feet of the dragon must succeed on a DC 22 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.'
        }
      ];

      titleModel.fullName = 'Adult Red Dragon';
      titleModel.shortName = 'dragon';

      sharedSpecs.shouldAddMultipleBlocksThenRemoveOneOfThem(legendaryActionsSection, legendaryActionsModel, blocks, 1);
    });

    describe('should reparse the block text', () => {
      const block = {
        name: 'Wing Attack (Costs 2 Actions)',
        text: '[name] beats its wings. Each creature within 10 feet of [name] must succeed on a DC 22 Dexterity saving throw or take dmg[2d6 + strmod] bludgeoning damage and be knocked prone. [name] can then fly up to half its flying speed.',
        homebreweryText: null,
        htmlText: null
      };

      const oldNames = {
        fullName: 'Adult Red Dragon',
        shortName: '',
        isProperNoun: false
      };

      it('when the full name is changed', () => {
        abilitiesModel.abilities['strength'].score = 27;

        const newNames = {
          fullName: 'Ancient Red Dragon',
          shortName: '',
          isProperNoun: false
        };

        block.homebreweryText = 'The ancient red dragon beats its wings. Each creature within 10 feet of the ancient red dragon must succeed on a DC 22 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The ancient red dragon can then fly up to half its flying speed.';
        block.htmlText = block.homebreweryText;

        sharedSpecs.shouldReparseNameChanges(legendaryActionsSection, legendaryActionsModel, block, oldNames, newNames);
      });

      it('when the short name is changed', () => {
        abilitiesModel.abilities['strength'].score = 27;

        const newNames = {
          fullName: 'Adult Red Dragon',
          shortName: 'dragon',
          isProperNoun: false
        };

        block.homebreweryText = 'The dragon beats its wings. Each creature within 10 feet of the dragon must succeed on a DC 22 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.';
        block.htmlText = block.homebreweryText;

        sharedSpecs.shouldReparseNameChanges(legendaryActionsSection, legendaryActionsModel, block, oldNames, newNames);
      });

      it('when the proper noun is changed', () => {
        abilitiesModel.abilities['strength'].score = 27;

        const newNames = {
          fullName: 'Adult Red Dragon',
          shortName: '',
          isProperNoun: true
        };

        block.homebreweryText = 'Adult Red Dragon beats its wings. Each creature within 10 feet of Adult Red Dragon must succeed on a DC 22 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. Adult Red Dragon can then fly up to half its flying speed.';
        block.htmlText = block.homebreweryText;

        sharedSpecs.shouldReparseNameChanges(legendaryActionsSection, legendaryActionsModel, block, oldNames, newNames);
      });
    });

    it('should trim all trailing period characters in the block name', () => {
      sharedSpecs.shouldTrimAllTrailingPeriodCharactersInBlockName(legendaryActionsSection, legendaryActionsModel);
    });

    it('should display an error if the block name is blank', () => {
      sharedSpecs.shouldDisplayAnErrorIfBlockNameIsBlank(legendaryActionsSection, expectedBlockType);
    });

    it('should display an error if the block text is blank', () => {
      sharedSpecs.shouldDisplayAnErrorIfBlockTextIsBlank(legendaryActionsSection, expectedBlockType);
    });

    it('should display an error if the block text has invalid markdown syntax', () => {
      sharedSpecs.shouldDisplayAnErrorIfBlockTextHasInvalidMarkdownSyntax(legendaryActionsSection, expectedBlockType);
    });

    it('should display errors if the block name and text are both blank', () => {
      sharedSpecs.shouldDisplayErrorsIfBlockNameAndTextAreBothBlank(legendaryActionsSection, expectedBlockType);
    });

    it('should display errors if the block name is blank and block text has invalid markdown syntax', () => {
      sharedSpecs.shouldDisplayErrorsIfBlockNameIsBlankAndBlockTextHasInvalidMarkdownSyntax(legendaryActionsSection, expectedBlockType);
    });
  });
});

function verifyModelDescription(description, homebreweryDescription, htmlDescription) {
  expect(legendaryActionsModel.description).toBe(description);
  expect(legendaryActionsModel.homebreweryDescription).toBe(homebreweryDescription);
  expect(legendaryActionsModel.htmlDescription).toBe(htmlDescription);
}

function verifyEditModeDescription(expectedText) {
  expect(legendaryActionsSection.editElements.description).toHaveValue(expectedText);
}

function verifyShowModeDescription(expectedText, isVisible) {
  expect(legendaryActionsSection.showElements.description).toContainHTML(expectedText);
  if (isVisible) {
    expect(legendaryActionsSection.showElements.description).not.toHaveClass('legendary-actions-show-section__text_hidden');
  } else {
    expect(legendaryActionsSection.showElements.description).toHaveClass('legendary-actions-show-section__text_hidden');
  }
}

function verifyJsonExportDescription(expectedText) {
  const json = legendaryActionsSection.exportToJson();

  expect(json.description).toBe(expectedText);

  return json;
}

function verifyHtmlExportDescription(expectedText) {
  const htmlExport = legendaryActionsSection.exportToHtml();
  const description = htmlExport.children[1];

  expect(description.tagName).toBe('P');
  expect(description).toContainHTML(expectedText);
}

function verifyHomebreweryExportDescription(expectedText) {
  const homebreweryExport = legendaryActionsSection.exportToHomebrewery();
  const description = homebreweryExport.split('\n')[1];

  expect(description).toBe(`> ${expectedText}`);
}