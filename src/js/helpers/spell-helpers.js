import { capitalizeFirstLetter } from './string-formatter.js';

export function getSpellDescription(spell) {
  const school = capitalizeFirstLetter(spell.school);
  const levelAndSchool = (spell.level === 0) ? `${school} Cantrip` : `Lvl ${spell.level} ${school}`;
  const ritual = spell.ritual ? ' (ritual)' : '';
  const castingTime = capitalizeFirstLetter(spell.castingTime);
  const range = capitalizeFirstLetter(spell.range);
  const components = getSpellComponents(spell);
  const concentrationAndDuration = spell.concentration ? `Concentration, ${spell.duration}` : capitalizeFirstLetter(spell.duration);

  return `${levelAndSchool}${ritual}; ${castingTime}; ${range}; ${concentrationAndDuration}; ${components}`;
}

function getSpellComponents(spell) {
  const components = [];
  if (spell.components.verbal) components.push('Verbal');
  if (spell.components.somatic) components.push('Somatic');
  if (spell.components.material) components.push('Material');

  return components.join(', ');
}