import HitPointsSection from './hit-points-section.js';
import * as TestCustomElements from '../../../helpers/test/test-custom-elements.js';

import { inputValueAndTriggerEvent } from '../../../helpers/element-helpers.js';
import { formatModifierOperator, formatModifierNumber } from '../../../helpers/string-formatter.js';

import CurrentContext from '../../../models/current-context.js';

const expectedHeading = 'Hit Points';

const abilities = CurrentContext.creature.abilities;
const hitPointsModel = CurrentContext.creature.hitPoints;

let hitPointsSection;

beforeAll(async() => {
  await TestCustomElements.define();
  await HitPointsSection.define();
});

beforeEach(() => {
  abilities.reset();
  hitPointsModel.reset();

  hitPointsSection = new HitPointsSection();
  TestCustomElements.initializeSection(hitPointsSection);
  hitPointsSection.connect();
});

describe('when the show section is clicked', () => {
  beforeEach(() => {
    hitPointsSection.showElements.section.click();
  });

  it('should switch to edit mode and focus on the hit die quantity field', () => {
    expect(hitPointsSection).toBeInMode('edit');
    expect(hitPointsSection.editElements.hitDieQuantity).toHaveFocus();
  });

  describe('and the "Calculate using Hit Die" checkbox is checked', () => {
    beforeEach(() => {
      hitPointsSection.editElements.useHitDie.click();
      hitPointsSection.editElements.useHitDie.click();
    });

    it('should enable the hit die quantity and size fields, disable the hit points field, and focus on the hit quantity field', () => {
      expect(hitPointsSection.editElements.hitDieQuantity).not.toBeDisabled();
      expect(hitPointsSection.editElements.hitDieSize).not.toBeDisabled();
      expect(hitPointsSection.editElements.hitPoints).toBeDisabled();

      expect(hitPointsSection.editElements.hitDieQuantity).toHaveFocus();
    });

    describe('and the hit die fields are populated and the edit section is submitted', () => {
      describe('should update the hit points field, switch to show mode and save all the fields in the following combinations:', () => {
        /* eslint-disable indent, no-unexpected-multiline */
        it.each
        `
          description                                 | hitDieQuantity | hitDieSize | constitutionScore | expectedConstitutionHitPoints | expectedHitPoints | expectedText
          ${'no change'}                              | ${1}           | ${8}       | ${10}             | ${0}                          | ${4}              | ${'4 (1d8)'}
          ${'quantity changed'}                       | ${5}           | ${8}       | ${10}             | ${0}                          | ${22}             | ${'22 (5d8)'}
          ${'size changed'}                           | ${1}           | ${6}       | ${10}             | ${0}                          | ${3}              | ${'3 (1d6)'}
          ${'con modifier changed'}                   | ${1}           | ${8}       | ${15}             | ${2}                          | ${6}              | ${'6 (1d8 + 2)'}
          ${'quantity + size changed'}                | ${6}           | ${10}      | ${10}             | ${0}                          | ${33}             | ${'33 (6d10)'}
          ${'quantity + con modifier changed'}        | ${9}           | ${8}       | ${17}             | ${27}                         | ${67}             | ${'67 (9d8 + 27)'}
          ${'size + con modifier changed'}            | ${1}           | ${4}       | ${8}              | ${-1}                         | ${1}              | ${'1 (1d4 – 1)'}
          ${'quantity + size + con modifier changed'} | ${17}          | ${10}      | ${21}             | ${85}                         | ${178}            | ${'178 (17d10 + 85)'}
          ${'air elemental'}                          | ${12}          | ${10}      | ${14}             | ${24}                         | ${90}             | ${'90 (12d10 + 24)'}
          ${'ankylosaurus'}                           | ${8}           | ${12}      | ${15}             | ${16}                         | ${68}             | ${'68 (8d12 + 16)'}
          ${'hill giant'}                             | ${10}          | ${12}      | ${19}             | ${40}                         | ${105}            | ${'105 (10d12 + 40)'}
          ${'swarm of rats'}                          | ${7}           | ${8}       | ${9}              | ${-7}                         | ${24}             | ${'24 (7d8 – 7)'}
          ${'tarrasque'}                              | ${33}          | ${20}      | ${30}             | ${330}                        | ${676}            | ${'676 (33d20 + 330)'}
          ${'winged kobold'}                          | ${3}           | ${6}       | ${9}              | ${-3}                         | ${7}              | ${'7 (3d6 – 3)'}
          ${'minimum values'}                         | ${1}           | ${4}       | ${1}              | ${-5}                         | ${0}              | ${'0 (1d4 – 5)'}
          ${'maximum values'}                         | ${999}         | ${20}      | ${999}            | ${493506}                     | ${503995}         | ${'503995 (999d20 + 493506)'}
        `
        ('$description: {hitDieQuantity="$hitDieQuantity", hitDieSize="$hitDieSize", constitutionScore="$constitutionScore"} => {expectedConstitutionHitPoints="$expectedConstitutionHitPoints", expectedHitPoints="$expectedHitPoints", expectedText="$expectedText"}',
        ({hitDieQuantity, hitDieSize, constitutionScore, expectedConstitutionHitPoints, expectedHitPoints, expectedText}) => {
          inputValueAndTriggerEvent(hitPointsSection.editElements.hitDieQuantity, hitDieQuantity);
          inputValueAndTriggerEvent(hitPointsSection.editElements.hitDieSize, hitDieSize);
          abilities.abilities['constitution'].score = constitutionScore;

          hitPointsSection.updateView();

          expect(hitPointsModel.useHitDie).toBe(true);
          expect(hitPointsModel.hitDieQuantity).toBe(hitDieQuantity);
          expect(hitPointsModel.hitDieSize).toBe(hitDieSize);
          expect(hitPointsModel.constitutionHitPoints).toBe(expectedConstitutionHitPoints);
          expect(hitPointsModel.hitPoints).toBe(expectedHitPoints);

          const constitutionHitPointsOperator = formatModifierOperator(expectedConstitutionHitPoints);
          const constitutionHitPointsNumber = formatModifierNumber(expectedConstitutionHitPoints);

          expect(hitPointsSection.editElements.constitutionHitPoints).toHaveTextContent(`${constitutionHitPointsOperator} ${constitutionHitPointsNumber}`);
          expect(hitPointsSection.editElements.hitPoints.value).toBe(`${expectedHitPoints}`);

          hitPointsSection.editElements.submitForm();

          expect(hitPointsSection).toBeInMode('show');
          expect(hitPointsSection).toShowPropertyLine(expectedHeading, expectedText);

          verifyJsonExport({
            hitPoints: expectedHitPoints,
            useHitDie: true,
            hitDieQuantity: hitDieQuantity,
            hitDieSize: hitDieSize
          });
          expect(hitPointsSection).toExportPropertyLineToHtml(expectedHeading, expectedText);
          expect(hitPointsSection).toExportPropertyLineToHomebrewery(expectedHeading, expectedText);
        });
        /* eslint-enable indent, no-unexpected-multiline */
      });

      it('should preserve the hit die quantity and size if submitted with the "Calculate using Hit Die" checkbox unchecked', () => {
        const hitDieQuantity = 2;
        const hitDieSize = 6;
        const expectedHitPoints = 7;

        inputValueAndTriggerEvent(hitPointsSection.editElements.hitDieQuantity, hitDieQuantity);
        inputValueAndTriggerEvent(hitPointsSection.editElements.hitDieSize, hitDieSize);

        hitPointsSection.editElements.useHitDie.click();
        hitPointsSection.editElements.submitForm();
        hitPointsSection.showElements.section.click();

        expect(hitPointsModel.useHitDie).toBe(false);
        expect(hitPointsModel.hitDieQuantity).toBe(hitDieQuantity);
        expect(hitPointsModel.hitDieSize).toBe(hitDieSize);
        expect(hitPointsModel.hitPoints).toBe(expectedHitPoints);

        expect(hitPointsSection).toBeInMode('edit');
        expect(hitPointsSection.editElements.useHitDie).not.toBeChecked();
        expect(hitPointsSection.editElements.hitDieQuantity).toHaveValue(hitDieQuantity);
        expect(hitPointsSection.editElements.hitDieSize.valueAsInt).toBe(hitDieSize);

        verifyJsonExport({
          hitPoints: expectedHitPoints,
          useHitDie: false,
          hitDieQuantity: hitDieQuantity,
          hitDieSize: hitDieSize
        });
      });
    });

    describe('and the hit die quantity is changed, and the edit section is submitted', () => {
      it('should display an error if the hit die quantity field is not a valid number, and the hit die quantity should not be saved', () => {
        inputValueAndTriggerEvent(hitPointsSection.editElements.hitDieQuantity, '');

        expect(hitPointsModel.useHitDie).toBe(true);
        expect(hitPointsModel.hitDieQuantity).toBe(1);
        expect(hitPointsModel.hitDieSize).toBe(8);
        expect(hitPointsModel.constitutionHitPoints).toBe(0);
        expect(hitPointsModel.hitPoints).toBe(4);

        hitPointsSection.editElements.submitForm();

        expect(hitPointsSection).toBeInMode('edit');
        expect(hitPointsSection).toHaveError(
          hitPointsSection.editElements.hitDieQuantity,
          'Hit Die Quantity must be a valid number.');
      });

      it('should display only one error if the hit points and hit die quantity fields are both not valid numbers, and neither should be saved', () => {
        inputValueAndTriggerEvent(hitPointsSection.editElements.hitPoints, '');
        inputValueAndTriggerEvent(hitPointsSection.editElements.hitDieQuantity, '');

        expect(hitPointsModel.useHitDie).toBe(true);
        expect(hitPointsModel.hitDieQuantity).toBe(1);
        expect(hitPointsModel.hitDieSize).toBe(8);
        expect(hitPointsModel.constitutionHitPoints).toBe(0);
        expect(hitPointsModel.hitPoints).toBe(4);

        hitPointsSection.editElements.submitForm();

        expect(hitPointsSection).toBeInMode('edit');
        expect(hitPointsSection).toHaveError(
          hitPointsSection.editElements.hitDieQuantity,
          'Hit Die Quantity must be a valid number.');
      });
    });

    describe('and the "Calculate using Hit Die" checkbox is unchecked, the hit points field is changed, then the checkbox is checked again', () => {
      it('should reset the hit points field to the value calculated from hit die', () => {
        inputValueAndTriggerEvent(hitPointsSection.editElements.hitDieQuantity, 10);
        inputValueAndTriggerEvent(hitPointsSection.editElements.hitDieSize, 12);
        abilities.abilities['constitution'].score = 19;

        hitPointsSection.updateView();

        expect(hitPointsModel.useHitDie).toBe(true);
        expect(hitPointsModel.hitDieQuantity).toBe(10);
        expect(hitPointsModel.hitDieSize).toBe(12);
        expect(hitPointsModel.constitutionHitPoints).toBe(40);
        expect(hitPointsModel.hitPoints).toBe(105);

        hitPointsSection.editElements.useHitDie.click();

        inputValueAndTriggerEvent(hitPointsSection.editElements.hitPoints, 89);

        hitPointsSection.editElements.useHitDie.click();

        expect(hitPointsSection.editElements.hitPoints.value).toBe('105');
      });
    });
  });

  describe('when the "Calculate using Hit Die" checkbox is unchecked', () => {
    beforeEach(() => {
      hitPointsSection.showElements.section.click();
      hitPointsSection.editElements.useHitDie.click();
    });

    it('should disable the hit die quantity and size fields, enable the hit points field, and focus on the hit points field', () => {
      expect(hitPointsSection.editElements.hitDieQuantity).toBeDisabled();
      expect(hitPointsSection.editElements.hitDieSize).toBeDisabled();
      expect(hitPointsSection.editElements.hitPoints).not.toBeDisabled();

      expect(hitPointsSection.editElements.hitPoints).toHaveFocus();
    });

    describe('and the hit points field is changed and the edit section is submitted', () => {
      it('should switch to show mode and save the hit points', () => {
        const hitPoints = 142;
        const expectedText = '142';

        inputValueAndTriggerEvent(hitPointsSection.editElements.hitPoints, hitPoints);

        expect(hitPointsModel.useHitDie).toBe(false);
        expect(hitPointsModel.hitDieQuantity).toBe(1);
        expect(hitPointsModel.hitDieSize).toBe(8);
        expect(hitPointsModel.constitutionHitPoints).toBe(0);
        expect(hitPointsModel.hitPoints).toBe(hitPoints);

        hitPointsSection.editElements.submitForm();

        expect(hitPointsSection).toBeInMode('show');
        expect(hitPointsSection).toShowPropertyLine(expectedHeading, expectedText);

        verifyJsonExport({
          hitPoints: hitPoints,
          useHitDie: false
        });
        expect(hitPointsSection).toExportPropertyLineToHtml(expectedHeading, expectedText);
        expect(hitPointsSection).toExportPropertyLineToHomebrewery(expectedHeading, expectedText);
      });

      it('should display an error if the hit points field is not a valid number, and the hit points should not be saved', () => {
        inputValueAndTriggerEvent(hitPointsSection.editElements.hitPoints, '');

        expect(hitPointsModel.useHitDie).toBe(false);
        expect(hitPointsModel.hitDieQuantity).toBe(1);
        expect(hitPointsModel.hitDieSize).toBe(8);
        expect(hitPointsModel.constitutionHitPoints).toBe(0);
        expect(hitPointsModel.hitPoints).toBe(4);

        hitPointsSection.editElements.submitForm();

        expect(hitPointsSection).toBeInMode('edit');
        expect(hitPointsSection).toHaveError(
          hitPointsSection.editElements.hitPoints,
          'Hit Points must be a valid number.');
      });

      it('should display only one error if the hit points and hit die quantity fields are both not valid numbers, and neither should be saved', () => {
        inputValueAndTriggerEvent(hitPointsSection.editElements.hitPoints, '');
        inputValueAndTriggerEvent(hitPointsSection.editElements.hitDieQuantity, '');

        expect(hitPointsModel.useHitDie).toBe(false);
        expect(hitPointsModel.hitDieQuantity).toBe(1);
        expect(hitPointsModel.hitDieSize).toBe(8);
        expect(hitPointsModel.constitutionHitPoints).toBe(0);
        expect(hitPointsModel.hitPoints).toBe(4);

        hitPointsSection.editElements.submitForm();

        expect(hitPointsSection).toBeInMode('edit');
        expect(hitPointsSection).toHaveError(
          hitPointsSection.editElements.hitPoints,
          'Hit Points must be a valid number.');
      });
    });
  });
});

function verifyJsonExport({
  hitPoints = 4,
  useHitDie = true,
  hitDieQuantity = 1,
  hitDieSize = 8} = {}) {

  const json = hitPointsSection.exportToJson();
  const expectedJson = {
    hitPoints: hitPoints,
    useHitDie: useHitDie,
    hitDieQuantity: hitDieQuantity,
    hitDieSize: hitDieSize
  };

  expect(json).toStrictEqual(expectedJson);
}