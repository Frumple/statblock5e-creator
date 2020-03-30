import { inputValueAndTriggerEvent } from '../../../helpers/element-helpers.js';
import CurrentContext from '../../../models/current-context.js';

export default class BlockListSectionSpecs {
  constructor(section, listModel, headingName, open5eJsonKey) {
    this.section = section;
    this.listModel = listModel;
    this.headingName = headingName;
    this.open5eJsonKey = open5eJsonKey;
  }

  sectionShouldHaveDefaultBlocks(expectedBlocks = []) {
    this.verifyBlocks(expectedBlocks);

    const json = this.verifyJsonExport(expectedBlocks);
    this.verifyHtmlExport(expectedBlocks);
    this.verifyMarkdownExport(expectedBlocks);

    this.reset();
    this.section.importFromJson(json);

    this.verifyBlocks(expectedBlocks);
  }

  shouldSwitchToEditModeAndFocusOnAddButtonIfNoBlocks() {
    expect(this.section).toBeInMode('edit');
    expect(this.section.editElements.addButton).toHaveFocus();
  }

  shouldSwitchToEditModeAndFocusOnNameFieldOfFirstBlockIfExists() {
    this.addAndPopulateBlock('Some name', 'Some text.');

    this.section.editElements.submitForm();
    this.section.showElements.section.click();

    expect(this.section).toBeInMode('edit');
    expect(this.section.editElements.editableBlockList.blocks[0].nameInput).toHaveFocus();
    expect(this.section.editElements.editableBlockList.blocks[0].nameInput).toBeSelected();
  }

  shouldFocusOnNameFieldOfNewBlock() {
    for (let index = 0; index <= 2; index++) {
      this.section.editElements.addButton.click();
      const blocks = this.section.editElements.editableBlockList.blocks;
      expect(blocks[index].nameInput).toHaveFocus();
      expect(blocks[index].nameInput).toBeSelected();
    }
  }

  shouldAddASingleBlock(block) {
    this.addAndPopulateBlock(block.name, block.text);

    this.section.editElements.submitForm();

    expect(this.section).toBeInMode('show');
    this.expectSectionToBeEmpty(false);

    const blocks = [block];
    this.verifyBlocks(blocks);

    const json = this.verifyJsonExport(blocks);
    this.verifyHtmlExport(blocks);
    this.verifyMarkdownExport(blocks);

    this.reset();
    this.section.importFromJson(json);

    this.verifyBlocks(blocks);
  }

  shouldAddMultipleBlocks(blocks) {
    for (const block of blocks) {
      this.addAndPopulateBlock(block.name, block.text);
    }

    this.section.editElements.submitForm();

    expect(this.section).toBeInMode('show');
    this. expectSectionToBeEmpty(false);

    this.verifyBlocks(blocks);

    const json = this.verifyJsonExport(blocks);
    this.verifyHtmlExport(blocks);
    this.verifyMarkdownExport(blocks);

    this.reset();
    this.section.importFromJson(json);

    this.verifyBlocks(blocks);
  }

  shouldShowBlocksImportedFromJsonIfSectionWasInitiallyEmptyAndNotVisible(blocksToImport) {
    const json = {
      blocks: blocksToImport
    };

    this.section.mode = 'hidden';
    this.section.importFromJson(json);

    expect(this.section).toBeInMode('show');
    this.verifyShowModeView(blocksToImport);
  }

  shouldAddASingleBlockThenRemoveIt(block) {
    this.addAndPopulateBlock(block.name, block.text);

    const editableBlock = this.section.editElements.editableBlockList.blocks[0];
    editableBlock.remove();

    this.section.editElements.submitForm();

    expect(this.section).toBeInMode('show');
    this.expectSectionToBeEmpty(true);

    expect(this.section.showElements.displayBlockList.blocks).toHaveLength(0);
  }

  shouldAddMultipleBlocksThenRemoveOneOfThem(blocks, removeIndex) {
    for (const block of blocks) {
      this.addAndPopulateBlock(block.name, block.text);
    }

    const editableBlock = this.section.editElements.editableBlockList.blocks[removeIndex];
    editableBlock.remove();

    this.section.editElements.submitForm();

    expect(this.section).toBeInMode('show');
    this.expectSectionToBeEmpty(false);

    blocks.splice(removeIndex, 1);

    this.verifyBlocks(blocks);

    const json = this.verifyJsonExport(blocks);
    this.verifyHtmlExport(blocks);
    this.verifyMarkdownExport(blocks);

    this.reset();
    this.section.importFromJson(json);

    this.verifyBlocks(blocks);
  }

  shouldReparseNameChanges(block, oldNames, newNames) {
    const title = CurrentContext.creature.title;

    title.fullName = oldNames.fullName;
    title.shortName = oldNames.shortName;
    title.isProperNoun = oldNames.isProperNoun;

    this.addAndPopulateBlock(block.name, block.text);

    this.section.editElements.submitForm();

    title.fullName = newNames.fullName;
    title.shortName = newNames.shortName;
    title.isProperNoun = newNames.isProperNoun;

    this.section.reparse();

    const blocks = [block];
    this.verifyBlocks(blocks);

    const json = this.verifyJsonExport(blocks);
    this.verifyHtmlExport(blocks);
    this.verifyMarkdownExport(blocks);

    this.reset();
    this.section.importFromJson(json);

    this.verifyBlocks(blocks);
  }

  shouldTrimAllTrailingPeriodCharactersInBlockName() {
    this.addAndPopulateBlock('Cthulhu. fhtag.n........', 'Some text.');

    this.section.editElements.submitForm();

    expect(this.section).toBeInMode('show');
    this.expectSectionToBeEmpty(false);

    const expectedBlocks = [{
      name: 'Cthulhu. fhtag.n',
      text: 'Some text.'
    }];
    this.verifyBlocks(expectedBlocks);

    const json = this.verifyJsonExport(expectedBlocks);
    this.verifyHtmlExport(expectedBlocks);
    this.verifyMarkdownExport(expectedBlocks);

    this.reset();
    this.section.importFromJson(json);

    this.verifyBlocks(expectedBlocks);
  }

  shouldDisplayAnErrorIfBlockNameIsBlank(expectedBlockType) {
    this.addAndPopulateBlock('', 'Some text.');

    this.section.editElements.submitForm();

    expect(this.section).toHaveError(
      this.section.editElements.editableBlockList.blocks[0].nameInput,
      `${expectedBlockType} Name cannot be blank.`);
  }

  shouldDisplayAnErrorIfBlockTextIsBlank(expectedBlockType) {
    this.addAndPopulateBlock('Some name', '');

    this.section.editElements.submitForm();

    expect(this.section).toHaveError(
      this.section.editElements.editableBlockList.blocks[0].textArea,
      `${expectedBlockType} Text cannot be blank.`);
  }

  shouldDisplayAnErrorIfBlockTextHasInvalidMarkdownSyntax(expectedBlockType) {
    this.addAndPopulateBlock('Some name', 'Some *invalid syntax');

    this.section.editElements.submitForm();

    expect(this.section).toHaveError(
      this.section.editElements.editableBlockList.blocks[0].textArea,
      `${expectedBlockType} Text has invalid markdown syntax.`);
  }

  shouldDisplayErrorsIfBlockNameAndTextAreBothBlank(expectedBlockType) {
    this.addAndPopulateBlock('', '');

    this.section.editElements.submitForm();

    const editableBlock = this.section.editElements.editableBlockList.blocks[0];

    expect(this.section.errorMessages.errors).toHaveLength(2);
    expect(this.section).toHaveError(
      editableBlock.nameInput,
      `${expectedBlockType} Name cannot be blank.`,
      0);
    expect(this.section).toHaveError(
      editableBlock.textArea,
      `${expectedBlockType} Text cannot be blank.`,
      1);
  }

  shouldDisplayErrorsIfBlockNameIsBlankAndBlockTextHasInvalidMarkdownSyntax(expectedBlockType) {
    this.addAndPopulateBlock('', 'Some __invalid syntax');

    this.section.editElements.submitForm();

    const editableBlock = this.section.editElements.editableBlockList.blocks[0];

    expect(this.section.errorMessages.errors).toHaveLength(2);
    expect(this.section).toHaveError(
      editableBlock.nameInput,
      `${expectedBlockType} Name cannot be blank.`,
      0);
    expect(this.section).toHaveError(
      editableBlock.textArea,
      `${expectedBlockType} Text has invalid markdown syntax.`,
      1);
  }

  shouldImportFromOpen5e(blocks, legendaryDescription = null) {
    const json = {};
    json[this.open5eJsonKey] = blocks.map(block => {
      return {
        name: block.name,
        desc: block.text
      };
    });

    if (legendaryDescription !== null) {
      json['legendary_desc'] = legendaryDescription;
    }

    this.section.importFromOpen5e(json);

    this.verifyBlocks(blocks);
  }

  addAndPopulateBlock(blockName, blockText) {
    this.section.editElements.addButton.click();

    const blocks = this.section.editElements.editableBlockList.blocks;
    const editableBlock = blocks[blocks.length - 1];

    inputValueAndTriggerEvent(editableBlock.nameInput, blockName);
    inputValueAndTriggerEvent(editableBlock.textArea, blockText);
  }

  getHtmlExportBlocks() {
    const htmlExport = this.section.exportToHtml();
    const children = htmlExport.children;

    if (this.headingName !== null) {
      expect(children[0].tagName).toBe('H3');
      expect(children[0]).toHaveTextContent(this.headingName);
    }

    return Array.from(children)
      .filter(element => element.tagName === 'PROPERTY-BLOCK');
  }

  reset() {
    this.listModel.reset();
    this.section.updateView();
  }

  verifyBlocks(expectedBlocks) {
    this.verifyModel(expectedBlocks);
    this.verifyEditModeView(expectedBlocks);
    this.verifyShowModeView(expectedBlocks);
  }

  verifyModel(expectedBlocks) {
    for (const [index, expectedBlock] of expectedBlocks.entries()) {
      const blockModel = this.listModel.blocks[index];
      BlockListSectionSpecs.verifyBlockModel(blockModel, expectedBlock);
    }
  }

  verifyEditModeView(expectedBlocks) {
    for (const [index, expectedBlock] of expectedBlocks.entries()) {
      const editableBlock = this.section.editElements.editableBlockList.blocks[index];
      BlockListSectionSpecs.verifyEditableBlock(editableBlock, expectedBlock);
    }
  }

  verifyShowModeView(expectedBlocks) {
    for (const [index, expectedBlock] of expectedBlocks.entries()) {
      const displayBlock = this.section.showElements.displayBlockList.blocks[index];
      BlockListSectionSpecs.verifyDisplayBlock(displayBlock, expectedBlock);
    }
  }

  static verifyBlockModel(blockModel, expectedBlock) {
    expect(blockModel.name).toBe(expectedBlock.name);
    expect(blockModel.text).toBe(expectedBlock.expectedText ? expectedBlock.expectedText : expectedBlock.text);
    expect(blockModel.markdownText).toBe(expectedBlock.markdownText ? expectedBlock.markdownText : expectedBlock.text);
    expect(blockModel.htmlText).toBe(expectedBlock.htmlText ? expectedBlock.htmlText : expectedBlock.text);
  }

  static verifyEditableBlock(editableBlock, expectedBlock) {
    expect(editableBlock.previewName).toBe(expectedBlock.name);
    expect(editableBlock.previewText).toBe(expectedBlock.htmlText ? expectedBlock.htmlText : expectedBlock.text);
  }

  static verifyDisplayBlock(displayBlock, expectedBlock) {
    expect(displayBlock.name).toBe(expectedBlock.name);
    expect(displayBlock.text).toBe(expectedBlock.htmlText ? expectedBlock.htmlText : expectedBlock.text);
  }

  verifyJsonExport(expectedBlocks) {
    const json = this.section.exportToJson();

    const expectedJson = expectedBlocks.map(block => {
      return {
        name: block.name,
        text: block.text
      };
    });

    expect(json.blocks).toStrictEqual(expectedJson);

    return json;
  }

  verifyHtmlExport(expectedBlocks) {
    const htmlExportBlocks = this.getHtmlExportBlocks();

    for (const [index, expectedBlock] of expectedBlocks.entries()) {
      const htmlExportBlock = htmlExportBlocks[index];
      expect(htmlExportBlock).toBeHtmlPropertyBlock(
        `${expectedBlock.name}.`,
        (expectedBlock.htmlText ? expectedBlock.htmlText : expectedBlock.text));
    }
  }

  verifyMarkdownExport(expectedBlocks) {
    const markdownExport = this.section.exportToMarkdown();

    if (this.headingName !== null) {
      const firstNewLineIndex = markdownExport.indexOf('\n');
      const firstLine = markdownExport.slice(0, firstNewLineIndex);

      expect(firstLine).toBe(`> ### ${this.headingName}`);
    }

    if (expectedBlocks.length > 0) {
      const firstBlockIndex = markdownExport.indexOf('> ***');
      const blocksText = markdownExport.slice(firstBlockIndex);

      const expectedBlocksInMarkdownFormat =
        expectedBlocks.map(
          block => `> ***${block.name}.*** ${(block.markdownText ? block.markdownText : block.text)}`);

      const expectedBlocksText = expectedBlocksInMarkdownFormat.join('\n>\n');
      expect(blocksText).toBe(expectedBlocksText);
    }
  }

  expectSectionToBeEmpty(isEmpty) {
    const emptySectionClass = 'section_empty';
    const emptyLabelHiddenClass = 'block-list-section__empty-label_hidden';

    expect(this.section.empty).toBe(isEmpty);

    if (isEmpty) {
      expect(this.section.showElements.section).toHaveClass(emptySectionClass);
      expect(this.section.showElements.emptyLabel).not.toHaveClass(emptyLabelHiddenClass);
    } else {
      expect(this.section.showElements.section).not.toHaveClass(emptySectionClass);
      expect(this.section.showElements.emptyLabel).toHaveClass(emptyLabelHiddenClass);
    }
  }
}