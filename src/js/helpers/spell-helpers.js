import { capitalizeFirstLetter } from './string-formatter.js';

export function getSpellDescription(spell) {
  const schoolAndRitual = capitalizeFirstLetter(spell.school).concat(spell.ritual ? ' (ritual)' : '');
  const castingTime = capitalizeFirstLetter(spell.castingTime);
  const range = capitalizeFirstLetter(spell.range);
  const components = getSpellComponents(spell);
  const concentrationAndDuration = spell.concentration ? `Concentration, ${spell.duration}` : capitalizeFirstLetter(spell.duration);

  return `${schoolAndRitual}; ${castingTime}; ${range}; ${concentrationAndDuration}; ${components}`;
}

function getSpellComponents(spell) {
  const components = [];
  if (spell.components.verbal) components.push('Verbal');
  if (spell.components.somatic) components.push('Somatic');
  if (spell.components.material) components.push('Material');

  return components.join(', ');
}