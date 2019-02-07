import HitPointsSection from '/src/js/sections/hit-points-section.js';
import { EnableDisableElementsCheckboxInternal } from '/src/js/extensions/enable-disable-elements-checkbox.js';
import ErrorMessages from '/src/js/elements/error-messages.js';
jest.mock('/src/js/elements/error-messages.js');

import Abilities from '/src/js/stats/abilities.js';
import HitPoints from '/src/js/stats/hit-points.js';

let hitPointsSection;

beforeAll(async() => {
  await HitPointsSection.define();
});

beforeEach(() => {
  Abilities.reset();
  HitPoints.reset();
  
  hitPointsSection = new HitPointsSection();
  hitPointsSection.errorMessages = new ErrorMessages();
  hitPointsSection.editElements.useHitDie = new EnableDisableElementsCheckboxInternal(hitPointsSection.editElements.useHitDie);
  hitPointsSection.forceConnect();
});

describe('when the show section is clicked', () => {
  beforeEach(() => {
    hitPointsSection.showElements.section.click(); 
  });

  it('should switch to edit mode and focus on the initial element', () => {
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

    describe('and the hit die quantity is changed, and the save button is clicked', () => {
      it('should update the hit points field with the correctly calculated value, and save all the fields', () => {
        inputValue(hitPointsSection.editElements.hitDieQuantity, 5);

        hitPointsSection.editElements.saveAction.click();

        expect(hitPointsSection).toBeInMode('show');
        expect(hitPointsSection.showElements.text).toHaveTextContent('22 (5d8)');
      });

      it('should display an error if the hit die quantity field is blank', () => {
        inputValue(hitPointsSection.editElements.hitDieQuantity, '');

        hitPointsSection.editElements.saveAction.click();

        expect(hitPointsSection).toBeInMode('edit');
        expect(hitPointsSection).toHaveSingleError(
          hitPointsSection.editElements.hitDieQuantity,
          'Hit Die Quantity must be a valid number.');
      });

      it('should display only one error if the hit points and hit die quantity fields are both blank', () => {
        inputValue(hitPointsSection.editElements.hitPoints, '');
        inputValue(hitPointsSection.editElements.hitDieQuantity, '');

        hitPointsSection.editElements.saveAction.click();

        expect(hitPointsSection).toBeInMode('edit');
        expect(hitPointsSection).toHaveSingleError(
          hitPointsSection.editElements.hitDieQuantity,
          'Hit Die Quantity must be a valid number.');
      });
    });

    describe('and the hit die size is changed, and the save button is clicked', () => {
      it('should update the hit points field with the correctly calculated value, and save all the fields', () => {
        inputValue(hitPointsSection.editElements.hitDieSize, 6);
        expect(hitPointsSection.editElements.hitPoints.value).toBe('3');

        hitPointsSection.editElements.saveAction.click();

        expect(hitPointsSection).toBeInMode('show');
        expect(hitPointsSection.showElements.text).toHaveTextContent('3 (1d6)');
      });
    });

    describe('and the constitution modifier is changed, and the save button is clicked', () => {
      it('should update the hit points field with the correctly calculated value, and save all the fields', () => {
        Abilities.abilities['constitution'].score = 15;
        hitPointsSection.updateHitPoints();

        expect(hitPointsSection.editElements.hitPoints.value).toBe('6');

        hitPointsSection.editElements.saveAction.click();

        expect(hitPointsSection).toBeInMode('show');
        expect(hitPointsSection.showElements.text).toHaveTextContent('6 (1d8 + 2)');
      });
    });

    describe('and the hit die quantity and size are changed, and the save button is clicked', () => {
      it('should update the hit points field with the correctly calculated value, and save all the fields', () => {
        inputValue(hitPointsSection.editElements.hitDieQuantity, 6);
        inputValue(hitPointsSection.editElements.hitDieSize, 10);
        expect(hitPointsSection.editElements.hitPoints.value).toBe('33');

        hitPointsSection.editElements.saveAction.click();

        expect(hitPointsSection).toBeInMode('show');
        expect(hitPointsSection.showElements.text).toHaveTextContent('33 (6d10)');
      });
    });

    describe('and the hit die size and constitution modifier are changed, and the save button is clicked', () => {
      it('should update the hit points field with the correctly calculated value, and save all the fields', () => {
        inputValue(hitPointsSection.editElements.hitDieSize, 4);
        Abilities.abilities['constitution'].score = 8;
        hitPointsSection.updateHitPoints();

        expect(hitPointsSection.editElements.hitPoints.value).toBe('1');

        hitPointsSection.editElements.saveAction.click();

        expect(hitPointsSection).toBeInMode('show');
        expect(hitPointsSection.showElements.text).toHaveTextContent('1 (1d4 – 1)');
      });
    });

    describe('and the hit die quantity and constitution modifier are changed, and the save button is clicked', () => {
      it('should update the hit points field with the correctly calculated value, and save all the fields', () => {
        inputValue(hitPointsSection.editElements.hitDieQuantity, 9);
        Abilities.abilities['constitution'].score = 17;
        hitPointsSection.updateHitPoints();

        expect(hitPointsSection.editElements.hitPoints.value).toBe('67');

        hitPointsSection.editElements.saveAction.click();

        expect(hitPointsSection).toBeInMode('show');
        expect(hitPointsSection.showElements.text).toHaveTextContent('67 (9d8 + 27)');
      });
    });

    describe('and the hit die quantity, size, and constitution modifier are changed, and the save button is clicked', () => {
      it('should update the hit points field with the correctly calculated value, and save all the fields', () => {
        inputValue(hitPointsSection.editElements.hitDieQuantity, 17);
        inputValue(hitPointsSection.editElements.hitDieSize, 10);
        Abilities.abilities['constitution'].score = 21;
        hitPointsSection.updateHitPoints();

        expect(hitPointsSection.editElements.hitPoints.value).toBe('178');

        hitPointsSection.editElements.saveAction.click();

        expect(hitPointsSection).toBeInMode('show');
        expect(hitPointsSection.showElements.text).toHaveTextContent('178 (17d10 + 85)');
      });
    });

    describe('and the "Calculate using Hit Die" checkbox is unchecked, the hit points field is changed, then the checkbox is checked again', () => {
      it('should reset the hit points field to the value calculated from hit die', () => {
        inputValue(hitPointsSection.editElements.hitDieQuantity, 10);
        inputValue(hitPointsSection.editElements.hitDieSize, 12);
        Abilities.abilities['constitution'].score = 19;
        hitPointsSection.updateHitPoints();

        hitPointsSection.editElements.useHitDie.click();

        inputValue(hitPointsSection.editElements.hitPoints, 89);

        hitPointsSection.editElements.useHitDie.click();

        expect(hitPointsSection.editElements.hitPoints.value).toBe('105');
      })
    });

    describe('additional examples', () => {
      it('air elemental', () => {
        inputValue(hitPointsSection.editElements.hitDieQuantity, 12);
        inputValue(hitPointsSection.editElements.hitDieSize, 10);
        Abilities.abilities['constitution'].score = 14;
        hitPointsSection.updateHitPoints();

        expect(hitPointsSection.editElements.hitPoints.value).toBe('90');

        hitPointsSection.editElements.saveAction.click();

        expect(hitPointsSection).toBeInMode('show');
        expect(hitPointsSection.showElements.text).toHaveTextContent('90 (12d10 + 24)');
      });

      it('swarm of rats', () => {
        inputValue(hitPointsSection.editElements.hitDieQuantity, 7);
        inputValue(hitPointsSection.editElements.hitDieSize, 8);
        Abilities.abilities['constitution'].score = 9;
        hitPointsSection.updateHitPoints();

        expect(hitPointsSection.editElements.hitPoints.value).toBe('24');

        hitPointsSection.editElements.saveAction.click();

        expect(hitPointsSection).toBeInMode('show');
        expect(hitPointsSection.showElements.text).toHaveTextContent('24 (7d8 – 7)');
      });

      it('tarrasque', () => {
        inputValue(hitPointsSection.editElements.hitDieQuantity, 33);
        inputValue(hitPointsSection.editElements.hitDieSize, 20);
        Abilities.abilities['constitution'].score = 30;
        hitPointsSection.updateHitPoints();

        expect(hitPointsSection.editElements.hitPoints.value).toBe('676');

        hitPointsSection.editElements.saveAction.click();

        expect(hitPointsSection).toBeInMode('show');
        expect(hitPointsSection.showElements.text).toHaveTextContent('676 (33d20 + 330)');
      });

      it('winged kobold', () => {
        inputValue(hitPointsSection.editElements.hitDieQuantity, 3);
        inputValue(hitPointsSection.editElements.hitDieSize, 6);
        Abilities.abilities['constitution'].score = 9;
        hitPointsSection.updateHitPoints();

        expect(hitPointsSection.editElements.hitPoints.value).toBe('7');

        hitPointsSection.editElements.saveAction.click();

        expect(hitPointsSection).toBeInMode('show');
        expect(hitPointsSection.showElements.text).toHaveTextContent('7 (3d6 – 3)');
      });

      it('minimum values', () => {
        inputValue(hitPointsSection.editElements.hitDieQuantity, 1);
        inputValue(hitPointsSection.editElements.hitDieSize, 4);
        Abilities.abilities['constitution'].score = 1;
        hitPointsSection.updateHitPoints();

        expect(hitPointsSection.editElements.hitPoints.value).toBe('0');

        hitPointsSection.editElements.saveAction.click();

        expect(hitPointsSection).toBeInMode('show');
        expect(hitPointsSection.showElements.text).toHaveTextContent('0 (1d4 – 5)');
      }); 
      
      it('maximum values', () => {
        inputValue(hitPointsSection.editElements.hitDieQuantity, 999);
        inputValue(hitPointsSection.editElements.hitDieSize, 20);
        Abilities.abilities['constitution'].score = 999;
        hitPointsSection.updateHitPoints();

        expect(hitPointsSection.editElements.hitPoints.value).toBe('503995');

        hitPointsSection.editElements.saveAction.click();

        expect(hitPointsSection).toBeInMode('show');
        expect(hitPointsSection.showElements.text).toHaveTextContent('503995 (999d20 + 493506)');
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

    describe('and the hit points field is changed and the save button is clicked', () => {
      it('should switch to show mode and save the hit points', () => {
        inputValue(hitPointsSection.editElements.hitPoints, 142);

        hitPointsSection.editElements.saveAction.click();

        expect(hitPointsSection).toBeInMode('show');
        expect(hitPointsSection.showElements.text).toHaveTextContent('142');
      });

      it('should display an error if the hit points field is blank', () => {
        inputValue(hitPointsSection.editElements.hitPoints, '');

        hitPointsSection.editElements.saveAction.click();

        expect(hitPointsSection).toBeInMode('edit');
        expect(hitPointsSection).toHaveSingleError(
          hitPointsSection.editElements.hitPoints,
          'Hit Points must be a valid number.');
      });

      it('should display only one error if the hit points and hit die quantity fields are both blank', () => {
        inputValue(hitPointsSection.editElements.hitPoints, '');
        inputValue(hitPointsSection.editElements.hitDieQuantity, '');
        
        hitPointsSection.editElements.saveAction.click();

        expect(hitPointsSection).toBeInMode('edit');
        expect(hitPointsSection).toHaveSingleError(
          hitPointsSection.editElements.hitPoints,
          'Hit Points must be a valid number.');
      });
    });
  });
});