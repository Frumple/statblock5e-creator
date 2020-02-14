import Title from './title.js';
import Subtitle from './subtitle.js';

import ArmorClass from './armor-class.js';
import HitPoints from './hit-points.js';
import Speed from './speed.js';

import Abilities from './abilities.js';

import SavingThrows from './saving-throws.js';
import Skills from './skills.js';
import DamageVulnerabilities from './lists/property/damage-vulnerabilities.js';
import DamageResistances from './lists/property/damage-resistances.js';
import DamageImmunities from './lists/property/damage-immunities.js';
import ConditionImmunities from './lists/property/condition-immunities.js';
import Senses from './senses.js';
import Languages from './lists/property/languages.js';
import ChallengeRating from './challenge-rating.js';

import SpecialTraits from './lists/block/special-traits.js';
import Actions from './lists/block/actions.js';
import Reactions from './lists/block/reactions.js';
import LegendaryActions from './lists/block/legendary-actions.js';

export default class Creature {
  constructor() {
    this.abilities = new Abilities();
    this.challengeRating = new ChallengeRating();

    this.title = new Title();
    this.subtitle = new Subtitle();

    this.armorClass = new ArmorClass();
    this.hitPoints = new HitPoints(this.abilities);
    this.speed = new Speed();

    this.savingThrows = new SavingThrows(this.abilities, this.challengeRating);
    this.skills = new Skills(this.abilities, this.challengeRating);
    this.damageVulnerabilities = new DamageVulnerabilities();
    this.damageResistances = new DamageResistances();
    this.damageImmunities = new DamageImmunities();
    this.conditionImmunities = new ConditionImmunities();
    this.senses = new Senses(this.skills);
    this.languages = new Languages();

    this.specialTraits = new SpecialTraits();
    this.actions = new Actions();
    this.reactions = new Reactions();
    this.legendaryActions = new LegendaryActions();
  }

  reset() {
    this.title.reset();
    this.subtitle.reset();

    this.armorClass.reset();
    this.hitPoints.reset();
    this.speed.reset();

    this.abilities.reset();

    this.savingThrows.reset();
    this.skills.reset();
    this.damageVulnerabilities.reset();
    this.damageResistances.reset();
    this.damageImmunities.reset();
    this.conditionImmunities.reset();
    this.senses.reset();
    this.languages.reset();
    this.challengeRating.reset();

    this.specialTraits.reset();
    this.actions.reset();
    this.reactions.reset();
    this.legendaryActions.reset();
  }
}