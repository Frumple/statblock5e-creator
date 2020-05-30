import DamageTypes from './damage-types.js';

// An array of damage types intended for the
// Damage Vulnerabilities/Resistances/Immunities autocompletion.

const damageTypes = DamageTypes.slice();
damageTypes.push('bludgeoning, piercing, and slashing from nonmagical attacks');

export default damageTypes;