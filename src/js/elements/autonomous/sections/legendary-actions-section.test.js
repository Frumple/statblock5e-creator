import LegendaryActionsSection from './legendary-actions-section.js';
import LegendaryActionDisplayBlockList from '../lists/legendary-action-display-block-list.js';
import LegendaryActionDisplayBlock from '../lists/legendary-action-display-block.js';
import LegendaryActionEditableBlockList from '../lists/legendary-action-editable-block-list.js';
import LegendaryActionEditableBlock from '../lists/legendary-action-editable-block.js';

import CurrentContext from '../../../models/current-context.js';

import * as TestCustomElements from '../../../helpers/test/test-custom-elements.js';
import BlockListSectionSpecs from './block-list-section.specs.js';

import { inputValueAndTriggerEvent } from '../../../helpers/element-helpers.js';

const headingName = 'Legendary Actions';
const expectedBlockType = 'Legendary Action';
const open5eJsonKey = 'legendary_actions';

const titleModel = CurrentContext.creature.title;
const abilitiesModel = CurrentContext.creature.abilities;
const legendaryActionsModel = CurrentContext.creature.legendaryActions;

let legendaryActionsSection;
let sharedSpecs;

beforeAll(async() => {
  await TestCustomElements.define();
  await LegendaryActionsSection.define();

  await LegendaryActionDisplayBlockList.define();
  await LegendaryActionDisplayBlock.define();
  await LegendaryActionEditableBlockList.define();
  await LegendaryActionEditableBlock.define();
});

beforeEach(() => {
  titleModel.reset();
  abilitiesModel.reset();
  legendaryActionsModel.reset();

  legendaryActionsSection = new LegendaryActionsSection();
  document.body.appendChild(legendaryActionsSection);

  sharedSpecs = new BlockListSectionSpecs(legendaryActionsSection, legendaryActionsModel, headingName, open5eJsonKey);
  sharedSpecs.htmlExportPropertyBlockTag = 'LEGENDARY-PROPERTY-BLOCK';
});

it('section should have default blocks', () => {
  sharedSpecs.sectionShouldHaveDefaultBlocks();
});

describe('when the show section is clicked', () => {
  beforeEach(() => {
    legendaryActionsSection.showElements.section.click();
  });

  it('should switch to edit mode and focus on the add button if there are no blocks', () => {
    sharedSpecs.shouldSwitchToEditModeAndFocusOnAddButtonIfNoBlocks();
  });

  it('should switch to edit mode and focus on the name field of the first block if there is at least one block', () => {
    sharedSpecs.shouldSwitchToEditModeAndFocusOnNameFieldOfFirstBlockIfExists();
  });

  describe('and the add block button is clicked', () => {
    it('should focus on the name field of the newly created block', () => {
      sharedSpecs.shouldFocusOnNameFieldOfNewBlock();
    });
  });

  describe('and the description is changed and the edit section is submitted', () => {
    const description = '[name] can take 5 legendary actions, choosing from one of the options below. Only one legendary action option can be used at a time and only at the end of another creature\'s turn. [name] regains spent legendary actions at the start of its turn.';
    const markdownDescription = 'The dragon can take 5 legendary actions, choosing from one of the options below. Only one legendary action option can be used at a time and only at the end of another creature\'s turn. The dragon regains spent legendary actions at the start of its turn.';
    const htmlDescription = markdownDescription;

    it('should switch to mode and update the description, but the description is not shown if there are no legendary actions', () => {
      titleModel.fullName = 'Adult Red Dragon';
      titleModel.shortName = 'dragon';

      inputValueAndTriggerEvent(legendaryActionsSection.editElements.description, description);

      legendaryActionsSection.editElements.submitForm();

      expect(legendaryActionsSection).toBeInMode('show');
      verifyModelDescription(description, markdownDescription, htmlDescription);
      verifyEditModeDescription(description);
      verifyShowModeDescription(htmlDescription, false);

      const json = verifyJsonExportDescription(description);
      verifyHtmlExportDescription(htmlDescription);
      verifyMarkdownExportDescription(markdownDescription);

      sharedSpecs.reset();
      legendaryActionsSection.importFromJson(json);

      verifyModelDescription(description, markdownDescription, htmlDescription);
      verifyEditModeDescription(description);
      verifyShowModeDescription(htmlDescription, false);
    });

    it('should switch to mode and update the description, and the description is shown if there are any legendary actions', () => {
      titleModel.fullName = 'Adult Red Dragon';
      titleModel.shortName = 'dragon';

      inputValueAndTriggerEvent(legendaryActionsSection.editElements.description, description);
      sharedSpecs.addAndPopulateBlock('Some name', 'Some text');

      legendaryActionsSection.editElements.submitForm();

      expect(legendaryActionsSection).toBeInMode('show');
      verifyModelDescription(description, markdownDescription, htmlDescription);
      verifyEditModeDescription(description);
      verifyShowModeDescription(htmlDescription, true);

      const json = verifyJsonExportDescription(description);
      verifyHtmlExportDescription(htmlDescription);
      verifyMarkdownExportDescription(markdownDescription);

      sharedSpecs.reset();
      legendaryActionsSection.importFromJson(json);

      verifyModelDescription(description, markdownDescription, htmlDescription);
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
        name: 'Disrupt Life (Costs 3 Actions)',
        text: 'Each living creature within 20 feet of [name] must make a DC 18 Constitution saving throw against this magic, taking DMG[6d6] necrotic damage on a failed save, or half as much damage on a successful one.',
        markdownText: 'Each living creature within 20 feet of the lich must make a DC 18 Constitution saving throw against this magic, taking 21 (6d6) necrotic damage on a failed save, or half as much damage on a successful one.',
        htmlText: 'Each living creature within 20 feet of the lich must make a DC 18 Constitution saving throw against this magic, taking 21 (6d6) necrotic damage on a failed save, or half as much damage on a successful one.'
      };

      titleModel.fullName = 'Lich';

      sharedSpecs.shouldAddASingleBlock(block);
    });

    it('should add a single block with multiline text', () => {
      const block = {
        name: 'Multiline Legendary Action',
        text: '**Line 1**. [name] is here.\n  **Line 2**. [name] is there.\n    **Line 3**. [name] is everywhere.',
        markdownText: '**Line 1**. The dummy is here.  \n>   **Line 2**. The dummy is there.  \n>     **Line 3**. The dummy is everywhere.',
        htmlText: '<strong>Line 1</strong>. The dummy is here.\n  <strong>Line 2</strong>. The dummy is there.\n    <strong>Line 3</strong>. The dummy is everywhere.'
      };

      titleModel.fullName = 'Dummy';

      sharedSpecs.shouldAddASingleBlock(block);
    });

    it('should add a single block with html escaped', () => {
      const block = {
        name: 'Escaped Legendary Action',
        text: '<strong>Line 1</strong>. [name] is here.',
        markdownText: '&lt;strong&gt;Line 1&lt;/strong&gt;. The dummy is here.',
        htmlText: '&lt;strong&gt;Line 1&lt;/strong&gt;. The dummy is here.'
      };

      titleModel.fullName = 'Dummy';

      sharedSpecs.shouldAddASingleBlock(block);
    });

    it('should add multiple blocks', () => {
      abilitiesModel.abilities['strength'].score = 27;

      const blocks = [
        {
          name: 'Detect',
          text: '[name] makes a Wisdom (Perception) check.',
          markdownText: 'The dragon makes a Wisdom (Perception) check.',
          htmlText: 'The dragon makes a Wisdom (Perception) check.'
        },
        {
          name: 'Tail Attack',
          text: '[name] makes a tail attack.',
          markdownText: 'The dragon makes a tail attack.',
          htmlText: 'The dragon makes a tail attack.'
        },
        {
          name: 'Wing Attack (Costs 2 Actions)',
          text: '[name] beats its wings. Each creature within 10 feet of the dragon must succeed on a DC 22 Dexterity saving throw or take DMG[2d6 + STR] bludgeoning damage and be knocked prone. [name] can then fly up to half its flying speed.',
          markdownText: 'The dragon beats its wings. Each creature within 10 feet of the dragon must succeed on a DC 22 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.',
          htmlText: 'The dragon beats its wings. Each creature within 10 feet of the dragon must succeed on a DC 22 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.'
        }
      ];

      titleModel.fullName = 'Adult Red Dragon';
      titleModel.shortName = 'dragon';

      sharedSpecs.shouldAddMultipleBlocks(blocks);
    });

    it('should add a single block, then remove it', () => {
      const block = {
        name: 'Detect',
        text: '[name] makes a Wisdom (Perception) check.',
        markdownText: 'The dragon makes a Wisdom (Perception) check.',
        htmlText: 'The dragon makes a Wisdom (Perception) check.'
      };

      titleModel.fullName = 'Adult Red Dragon';
      titleModel.shortName = 'dragon';

      sharedSpecs.shouldAddASingleBlockThenRemoveIt(block);
    });

    it('should add multiple blocks, then remove one of them', () => {
      abilitiesModel.abilities['strength'].score = 27;

      const blocks = [
        {
          name: 'Detect',
          text: '[name] makes a Wisdom (Perception) check.',
          markdownText: 'The dragon makes a Wisdom (Perception) check.',
          htmlText: 'The dragon makes a Wisdom (Perception) check.'
        },
        {
          name: 'Tail Attack',
          text: '[name] makes a tail attack.',
          markdownText: 'The dragon makes a tail attack.',
          htmlText: 'The dragon makes a tail attack.'
        },
        {
          name: 'Wing Attack (Costs 2 Actions)',
          text: '[name] beats its wings. Each creature within 10 feet of the dragon must succeed on a DC 22 Dexterity saving throw or take DMG[2d6 + STR] bludgeoning damage and be knocked prone. [name] can then fly up to half its flying speed.',
          markdownText: 'The dragon beats its wings. Each creature within 10 feet of the dragon must succeed on a DC 22 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.',
          htmlText: 'The dragon beats its wings. Each creature within 10 feet of the dragon must succeed on a DC 22 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.'
        }
      ];

      titleModel.fullName = 'Adult Red Dragon';
      titleModel.shortName = 'dragon';

      sharedSpecs.shouldAddMultipleBlocksThenRemoveOneOfThem(blocks, 1);
    });

    describe('should reparse the block text', () => {
      const block = {
        name: 'Wing Attack (Costs 2 Actions)',
        text: '[name] beats its wings. Each creature within 10 feet of [name] must succeed on a DC 22 Dexterity saving throw or take DMG[2d6 + STR] bludgeoning damage and be knocked prone. [name] can then fly up to half its flying speed.',
        markdownText: null,
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

        block.markdownText = 'The ancient red dragon beats its wings. Each creature within 10 feet of the ancient red dragon must succeed on a DC 22 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The ancient red dragon can then fly up to half its flying speed.';
        block.htmlText = block.markdownText;

        sharedSpecs.shouldReparseNameChanges(block, oldNames, newNames);
      });

      it('when the short name is changed', () => {
        abilitiesModel.abilities['strength'].score = 27;

        const newNames = {
          fullName: 'Adult Red Dragon',
          shortName: 'dragon',
          isProperNoun: false
        };

        block.markdownText = 'The dragon beats its wings. Each creature within 10 feet of the dragon must succeed on a DC 22 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.';
        block.htmlText = block.markdownText;

        sharedSpecs.shouldReparseNameChanges(block, oldNames, newNames);
      });

      it('when the proper noun is changed', () => {
        abilitiesModel.abilities['strength'].score = 27;

        const newNames = {
          fullName: 'Adult Red Dragon',
          shortName: '',
          isProperNoun: true
        };

        block.markdownText = 'Adult Red Dragon beats its wings. Each creature within 10 feet of Adult Red Dragon must succeed on a DC 22 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. Adult Red Dragon can then fly up to half its flying speed.';
        block.htmlText = block.markdownText;

        sharedSpecs.shouldReparseNameChanges(block, oldNames, newNames);
      });
    });

    it('should trim all trailing period characters in the block name', () => {
      sharedSpecs.shouldTrimAllTrailingPeriodCharactersInBlockName();
    });

    it('should display an error if the block name is blank', () => {
      sharedSpecs.shouldDisplayAnErrorIfBlockNameIsBlank(expectedBlockType);
    });

    it('should display an error if the block text is blank', () => {
      sharedSpecs.shouldDisplayAnErrorIfBlockTextIsBlank(expectedBlockType);
    });

    it('should display an error if the block text has invalid markdown syntax', () => {
      sharedSpecs.shouldDisplayAnErrorIfBlockTextHasInvalidMarkdownSyntax(expectedBlockType);
    });

    it('should display errors if the block name and text are both blank', () => {
      sharedSpecs.shouldDisplayErrorsIfBlockNameAndTextAreBothBlank(expectedBlockType);
    });

    it('should display errors if the block name is blank and block text has invalid markdown syntax', () => {
      sharedSpecs.shouldDisplayErrorsIfBlockNameIsBlankAndBlockTextHasInvalidMarkdownSyntax(expectedBlockType);
    });
  });
});

describe('when import from Open5e', () => {
  it('should import no blocks, and the description should be kept to the default and should not be visible', () => {
    const inputtedDescription = '';

    const description = '[name] can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature\'s turn. [name] regains spent legendary actions at the start of its turn.';
    const markdownDescription = 'The commoner can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature\'s turn. The commoner regains spent legendary actions at the start of its turn.';
    const htmlDescription = markdownDescription;

    sharedSpecs.shouldImportFromOpen5e([], inputtedDescription);

    verifyModelDescription(description, markdownDescription, htmlDescription);
    verifyEditModeDescription(description);
    verifyShowModeDescription(htmlDescription, false);
  });

  it('should import single block', () => {
    const block = {
      name: 'Disrupt Life (Costs 3 Actions)',
      text: 'Each living creature within 20 feet of the lich must make a DC 18 Constitution saving throw against this magic, taking 21 (6d6) necrotic damage on a failed save, or half as much damage on a successful one.'
    };

    const description = 'The lich can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature\'s turn. The lich regains spent legendary actions at the start of its turn.';

    sharedSpecs.shouldImportFromOpen5e([block], description);

    verifyModelDescription(description, description, description);
    verifyEditModeDescription(description);
    verifyShowModeDescription(description, true);
  });

  it('should import single block with multiline text', () => {
    const block = {
      name: 'Multiline Legendary Action',
      text: '**Line 1**. The dummy is here.\n  **Line 2**. The dummy is there.\n    **Line 3**. The dummy is everywhere.',
      markdownText: '**Line 1**. The dummy is here.  \n>   **Line 2**. The dummy is there.  \n>     **Line 3**. The dummy is everywhere.',
      htmlText: '<strong>Line 1</strong>. The dummy is here.\n  <strong>Line 2</strong>. The dummy is there.\n    <strong>Line 3</strong>. The dummy is everywhere.'
    };

    const description = '**Line 1**. The dummy is here.\n  **Line 2**. The dummy is there.\n    **Line 3**. The dummy is everywhere.';
    const markdownDescription = '**Line 1**. The dummy is here.  \n>   **Line 2**. The dummy is there.  \n>     **Line 3**. The dummy is everywhere.';
    const htmlDescription = '<strong>Line 1</strong>. The dummy is here.\n  <strong>Line 2</strong>. The dummy is there.\n    <strong>Line 3</strong>. The dummy is everywhere.';

    sharedSpecs.shouldImportFromOpen5e([block], description);

    verifyModelDescription(description, markdownDescription, htmlDescription);
    verifyEditModeDescription(description);
    verifyShowModeDescription(htmlDescription, true);
  });

  it('should import multiple blocks', () => {
    const blocks = [
      {
        name: 'Detect',
        text: 'The dragon makes a Wisdom (Perception) check.'
      },
      {
        name: 'Tail Attack',
        text: 'The dragon makes a tail attack.'
      },
      {
        name: 'Wing Attack (Costs 2 Actions)',
        text: 'The dragon beats its wings. Each creature within 10 ft. of the dragon must succeed on a DC 22 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.'
      }
    ];

    const description = 'The dragon can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature\'s turn. The dragon regains spent legendary actions at the start of its turn.';

    sharedSpecs.shouldImportFromOpen5e(blocks, description);

    verifyModelDescription(description, description, description);
    verifyEditModeDescription(description);
    verifyShowModeDescription(description, true);
  });
});

describe('when the section is empty and not visible', () => {
  describe('and a creature with blocks is imported from JSON', () => {
    it('should show the new blocks', () => {
      const blocksToImport = [
        {
          name: 'Detect',
          text: '[name] makes a Wisdom (Perception) check.',
          htmlText: 'The dragon makes a Wisdom (Perception) check.'
        }
      ];

      titleModel.fullName = 'Adult Red Dragon';
      titleModel.shortName = 'dragon';

      sharedSpecs.shouldShowBlocksImportedFromJsonIfSectionWasInitiallyEmptyAndNotVisible(blocksToImport);
    });
  });
});

function verifyModelDescription(description, markdownDescription, htmlDescription) {
  expect(legendaryActionsModel.description).toBe(description);
  expect(legendaryActionsModel.markdownDescription).toBe(markdownDescription);
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

function verifyMarkdownExportDescription(expectedText) {
  const markdownExport = legendaryActionsSection.exportToMarkdown();
  const description = markdownExport.split('\n')[1];

  expect(description).toBe(`> ${expectedText}`);
}