export default [
  {
    name: 'Acid Arrow',
    source: 'srd',
    level: 2,
    school: 'evocation',
    ritual: false,
    castingTime: '1 action',
    range: '90 feet',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'powdered rhubarb leaf and an adder\'s stomach'
    },
    classes: [
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Acid Splash',
    source: 'srd',
    level: 0,
    school: 'conjuration',
    ritual: false,
    castingTime: '1 action',
    range: '60 feet',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Aid',
    source: 'srd',
    level: 2,
    school: 'abjuration',
    ritual: false,
    castingTime: '1 action',
    range: '30 feet',
    concentration: false,
    duration: '8 hours',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a tiny strip of white cloth'
    },
    classes: [
      'cleric',
      'paladin'
    ],
    description: ''
  },
  {
    name: 'Alarm',
    source: 'srd',
    level: 1,
    school: 'abjuration',
    ritual: true,
    castingTime: '1 minute',
    range: '30 feet',
    concentration: false,
    duration: '8 hours',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a tiny bell and a piece of fine silver wire'
    },
    classes: [
      'ranger',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Alter Self',
    source: 'srd',
    level: 2,
    school: 'transmutation',
    ritual: false,
    castingTime: '1 action',
    range: 'self',
    concentration: false,
    duration: 'up to 1 hour',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Animal Friendship',
    source: 'srd',
    level: 1,
    school: 'enchantment',
    ritual: false,
    castingTime: '1 action',
    range: '30 feet',
    concentration: false,
    duration: '24 hours',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a morsel of food'
    },
    classes: [
      'bard',
      'druid',
      'ranger'
    ],
    description: ''
  },
  {
    name: 'Animal Messenger',
    source: 'srd',
    level: 2,
    school: 'enchantment',
    ritual: true,
    castingTime: '1 action',
    range: '30 feet',
    concentration: false,
    duration: '24 hours',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a morsel of food'
    },
    classes: [
      'bard',
      'druid',
      'ranger'
    ],
    description: ''
  },
  {
    name: 'Animal Shapes',
    source: 'srd',
    level: 8,
    school: 'transmutation',
    ritual: false,
    castingTime: '1 action',
    range: '30 feet',
    concentration: true,
    duration: 'up to 24 hours',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'druid'
    ],
    description: ''
  },
  {
    name: 'Animate Dead',
    source: 'srd',
    level: 3,
    school: 'necromancy',
    ritual: false,
    castingTime: '1 minute',
    range: '10 feet',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a drop of blood, a piece of flesh, and a pinch of bone dust'
    },
    classes: [
      'cleric',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Animate Objects',
    source: 'srd',
    level: 5,
    school: 'transmutation',
    ritual: false,
    castingTime: '1 action',
    range: '120 feet',
    concentration: true,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'bard',
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Antilife Shell',
    source: 'srd',
    level: 5,
    school: 'abjuration',
    ritual: false,
    castingTime: '1 action',
    range: 'self (10-foot radius)',
    concentration: true,
    duration: 'up to 1 hour',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'druid'
    ],
    description: ''
  },
  {
    name: 'Antimagic Field',
    source: 'srd',
    level: 8,
    school: 'abjuration',
    ritual: false,
    castingTime: '1 action',
    range: 'self (10-foot-radius sphere)',
    concentration: true,
    duration: 'up to 1 hour',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a pinch of powdered iron or iron filings'
    },
    classes: [
      'cleric',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Antipathy/Sympathy',
    source: 'srd',
    level: 8,
    school: 'enchantment',
    ritual: false,
    castingTime: '1 hour',
    range: '60 feet',
    concentration: false,
    duration: '10 days',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'either a lump of alum soaked in vinegar for the antipathy effect or a drop of honey for the sympathy effect'
    },
    classes: [
      'druid',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Arcane Eye',
    source: 'srd',
    level: 4,
    school: 'divination',
    ritual: false,
    castingTime: '1 action',
    range: '30 feet',
    concentration: true,
    duration: 'up to 1 hour',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a bit of bat fur'
    },
    classes: [
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Arcane Hand',
    source: 'srd',
    level: 5,
    school: 'evocation',
    ritual: false,
    castingTime: '1 action',
    range: '120 feet',
    concentration: true,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'an eggshell and a snakeskin glove'
    },
    classes: [
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Arcane Lock',
    source: 'srd',
    level: 2,
    school: 'abjuration',
    ritual: false,
    castingTime: '1 action',
    range: 'touch',
    concentration: false,
    duration: 'until dispelled',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'gold dust worth at least 25 gp, which the spell consumes'
    },
    classes: [
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Arcane Sword',
    source: 'srd',
    level: 7,
    school: 'evocation',
    ritual: false,
    castingTime: '1 action',
    range: '60 feet',
    concentration: true,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a miniature platinum sword with a grip and pommel of copper and zinc, worth 250 gp'
    },
    classes: [
      'bard',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Arcanist\'s Magic Aura',
    source: 'srd',
    level: 2,
    school: 'illusion',
    ritual: false,
    castingTime: '1 action',
    range: 'touch',
    concentration: false,
    duration: '24 hours',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a small square of silk'
    },
    classes: [
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Astral Projection',
    source: 'srd',
    level: 9,
    school: 'necromancy',
    ritual: false,
    castingTime: '1 hour',
    range: '10 feet',
    concentration: false,
    duration: 'special',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'for each creature you affect with this spell, you must provide one jacinth worth at least 1,000 gp and one ornately carved bar of silver worth at least 100 gp, all of which the spell consumes'
    },
    classes: [
      'cleric',
      'warlock',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Augury',
    source: 'srd',
    level: 2,
    school: 'divination',
    ritual: true,
    castingTime: '1 minute',
    range: 'self',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'specially marked sticks, bones, or similar tokens worth at least 25 gp'
    },
    classes: [
      'cleric'
    ],
    description: ''
  },
  {
    name: 'Awaken',
    source: 'srd',
    level: 5,
    school: 'transmutation',
    ritual: false,
    castingTime: '8 hours',
    range: 'touch',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'an agate worth at least 1,000 gp, which the spell consumes'
    },
    classes: [
      'bard',
      'druid'
    ],
    description: ''
  },
  {
    name: 'Bane',
    source: 'srd',
    level: 1,
    school: 'enchantment',
    ritual: false,
    castingTime: '1 action',
    range: '30 feet',
    concentration: true,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a drop of blood'
    },
    classes: [
      'bard',
      'cleric'
    ],
    description: ''
  },
  {
    name: 'Banishment',
    source: 'srd',
    level: 4,
    school: 'abjuration',
    ritual: false,
    castingTime: '1 action',
    range: '60 feet',
    concentration: true,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'an item distasteful to the target'
    },
    classes: [
      'cleric',
      'paladin',
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Barkskin',
    source: 'srd',
    level: 2,
    school: 'transmutation',
    ritual: false,
    castingTime: '1 action',
    range: 'touch',
    concentration: true,
    duration: 'up to 1 hour',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a handful of oak bark'
    },
    classes: [
      'druid',
      'ranger'
    ],
    description: ''
  },
  {
    name: 'Beacon of Hope',
    source: 'srd',
    level: 3,
    school: 'abjuration',
    ritual: false,
    castingTime: '1 action',
    range: '30 feet',
    concentration: true,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'cleric'
    ],
    description: ''
  },
  {
    name: 'Bestow Curse',
    source: 'srd',
    level: 3,
    school: 'necromancy',
    ritual: false,
    castingTime: '1 action',
    range: 'touch',
    concentration: true,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'bard',
      'cleric',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Black Tentacles',
    source: 'srd',
    level: 4,
    school: 'conjuration',
    ritual: false,
    castingTime: '1 action',
    range: '90 feet',
    concentration: true,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a piece of tentacle from a giant octopus or a giant squid'
    },
    classes: [
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Blade Barrier',
    source: 'srd',
    level: 6,
    school: 'evocation',
    ritual: false,
    castingTime: '1 action',
    range: '90 feet',
    concentration: true,
    duration: 'up to 10 minutes',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'cleric'
    ],
    description: ''
  },
  {
    name: 'Bless',
    source: 'srd',
    level: 1,
    school: 'enchantment',
    ritual: false,
    castingTime: '1 action',
    range: '30 feet',
    concentration: true,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a sprinkling of holy water'
    },
    classes: [
      'cleric',
      'paladin'
    ],
    description: ''
  },
  {
    name: 'Blight',
    source: 'srd',
    level: 4,
    school: 'necromancy',
    ritual: false,
    castingTime: '1 action',
    range: '30 feet',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'druid',
      'sorcerer',
      'warlock',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Blindness/Deafness',
    source: 'srd',
    level: 2,
    school: 'necromancy',
    ritual: false,
    castingTime: '1 action',
    range: '30 feet',
    concentration: false,
    duration: '1 minute',
    components: {
      verbal: true,
      somatic: false,
      material: false,
      items: ''
    },
    classes: [
      'bard',
      'cleric',
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Blink',
    source: 'srd',
    level: 3,
    school: 'transmutation',
    ritual: false,
    castingTime: '1 action',
    range: 'self',
    concentration: false,
    duration: '1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Blur',
    source: 'srd',
    level: 2,
    school: 'illusion',
    ritual: false,
    castingTime: '1 action',
    range: 'self',
    concentration: true,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: false,
      material: false,
      items: ''
    },
    classes: [
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Branding Smite',
    source: 'srd',
    level: 2,
    school: 'evocation',
    ritual: false,
    castingTime: '1 bonus action',
    range: 'self',
    concentration: true,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: false,
      material: false,
      items: ''
    },
    classes: [
      'paladin'
    ],
    description: ''
  },
  {
    name: 'Burning Hands',
    source: 'srd',
    level: 1,
    school: 'evocation',
    ritual: false,
    castingTime: '1 action',
    range: 'self (15-foot cone)',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Call Lightning',
    source: 'srd',
    level: 3,
    school: 'conjuration',
    ritual: false,
    castingTime: '1 action',
    range: '120 feet',
    concentration: true,
    duration: 'up to 10 minutes',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'druid'
    ],
    description: ''
  },
  {
    name: 'Calm Emotions',
    source: 'srd',
    level: 2,
    school: 'enchantment',
    ritual: false,
    castingTime: '1 action',
    range: '60 feet',
    concentration: true,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'bard',
      'cleric'
    ],
    description: ''
  },
  {
    name: 'Chain Lightning',
    source: 'srd',
    level: 6,
    school: 'evocation',
    ritual: false,
    castingTime: '1 action',
    range: '150 feet',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a bit of fur; a piece of amber, glass, or a crystal ord; and three silver pins'
    },
    classes: [
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Charm Person',
    source: 'srd',
    level: 1,
    school: 'enchantment',
    ritual: false,
    castingTime: '1 action',
    range: '30 feet',
    concentration: false,
    duration: '1 hour',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'bard',
      'druid',
      'sorcerer',
      'warlock',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Chill Touch',
    source: 'srd',
    level: 0,
    school: 'necromancy',
    ritual: false,
    castingTime: '1 action',
    range: '120 feet',
    concentration: false,
    duration: '1 round',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'sorcerer',
      'warlock',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Circle of Death',
    source: 'srd',
    level: 6,
    school: 'necromancy',
    ritual: false,
    castingTime: '1 action',
    range: '150 feet',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'the powder of a crushed black pearl worth at least 500 gp'
    },
    classes: [
      'sorcerer',
      'warlock',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Clairvoyance',
    source: 'srd',
    level: 3,
    school: 'divination',
    ritual: false,
    castingTime: '10 minutes',
    range: '1 mile',
    concentration: true,
    duration: 'up to 10 minutes',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a focus worth at least 100 gp, either a jeweled horn for hearing or a glass eye for seeing'
    },
    classes: [
      'bard',
      'cleric',
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Clone',
    source: 'srd',
    level: 8,
    school: 'necromancy',
    ritual: false,
    castingTime: '1 hour',
    range: 'touch',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a diamond worth at least 1,000 gp and at least 1 cubic inch of flesh of the creature that is to be cloned, which the spell consumes, and a vessel worth at least 2,000 gp that has a sealable lid and is large enough to hold a Medium creature, such as a huge urn, coffin, mud-filled cyst in the ground, or crystal container filled with salt water'
    },
    classes: [
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Cloudkill',
    source: 'srd',
    level: 5,
    school: 'conjuration',
    ritual: false,
    castingTime: '1 action',
    range: '120 feet',
    concentration: false,
    duration: 'up to 10 minute',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Color Spray',
    source: 'srd',
    level: 1,
    school: 'illusion',
    ritual: false,
    castingTime: '1 action',
    range: 'self (15-foot cone)',
    concentration: false,
    duration: '1 round',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a pinch of powder or sand that is colored red, yellow, and blue'
    },
    classes: [
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Command',
    source: 'srd',
    level: 1,
    school: 'enchantment',
    ritual: false,
    castingTime: '1 action',
    range: '60 feet',
    concentration: false,
    duration: '1 round',
    components: {
      verbal: true,
      somatic: false,
      material: false,
      items: ''
    },
    classes: [
      'cleric',
      'paladin'
    ],
    description: ''
  },
  {
    name: 'Commune',
    source: 'srd',
    level: 5,
    school: 'divination',
    ritual: true,
    castingTime: '1 minute',
    range: 'self',
    concentration: false,
    duration: '1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'incense and a vial of holy or unholy water'
    },
    classes: [
      'cleric'
    ],
    description: ''
  },
  {
    name: 'Commune with Nature',
    source: 'srd',
    level: 5,
    school: 'divination',
    ritual: true,
    castingTime: '1 minute',
    range: 'self',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'druid',
      'ranger'
    ],
    description: ''
  },
  {
    name: 'Comprehend Languages',
    source: 'srd',
    level: 1,
    school: 'divination',
    ritual: true,
    castingTime: '1 action',
    range: 'self',
    concentration: false,
    duration: '1 hour',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a pinch of soot and salt'
    },
    classes: [
      'bard',
      'sorcerer',
      'warlock',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Compulsion',
    source: 'srd',
    level: 4,
    school: 'enchantment',
    ritual: false,
    castingTime: '1 action',
    range: '30 feet',
    concentration: false,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'bard'
    ],
    description: ''
  },
  {
    name: 'Cone of Cold',
    source: 'srd',
    level: 5,
    school: 'evocation',
    ritual: false,
    castingTime: '1 action',
    range: 'self (60-foot cone)',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a small crystal or glass cone'
    },
    classes: [
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Confusion',
    source: 'srd',
    level: 4,
    school: 'enchantment',
    ritual: false,
    castingTime: '1 action',
    range: '90 feet',
    concentration: true,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'three nut shells'
    },
    classes: [
      'bard',
      'druid',
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Conjure Animals',
    source: 'srd',
    level: 3,
    school: 'conjuration',
    ritual: false,
    castingTime: '1 action',
    range: '60 feet',
    concentration: true,
    duration: 'up to 1 hour',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'druid',
      'ranger'
    ],
    description: ''
  },
  {
    name: 'Conjure Celestial',
    source: 'srd',
    level: 7,
    school: 'conjuration',
    ritual: false,
    castingTime: '1 minute',
    range: '90 feet',
    concentration: true,
    duration: 'up to 1 hour',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'cleric'
    ],
    description: ''
  },
  {
    name: 'Conjure Elemental',
    source: 'srd',
    level: 5,
    school: 'conjuration',
    ritual: false,
    castingTime: '1 minute',
    range: '90 feet',
    concentration: true,
    duration: 'up to 1 hour',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'burning incense for air, soft clay for earth, sulfur and phosphorus for fire, or water and sand for water'
    },
    classes: [
      'druid',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Conjure Fey',
    source: 'srd',
    level: 6,
    school: 'conjuration',
    ritual: false,
    castingTime: '1 minute',
    range: '90 feet',
    concentration: true,
    duration: 'up to 1 hour',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'druid',
      'warlock'
    ],
    description: ''
  },
  {
    name: 'Conjure Minor Elementals',
    source: 'srd',
    level: 4,
    school: 'conjuration',
    ritual: false,
    castingTime: '1 minute',
    range: '90 feet',
    concentration: true,
    duration: 'up to 1 hour',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'druid',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Conjure Woodland Beings',
    source: 'srd',
    level: 4,
    school: 'conjuration',
    ritual: false,
    castingTime: '1 action',
    range: '60 feet',
    concentration: true,
    duration: 'up to 1 hour',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'one holly berry per creature summoned'
    },
    classes: [
      'druid',
      'ranger'
    ],
    description: ''
  },
  {
    name: 'Contact Other Plane',
    source: 'srd',
    level: 5,
    school: 'divination',
    ritual: true,
    castingTime: '1 minute',
    range: 'self',
    concentration: false,
    duration: '1 minute',
    components: {
      verbal: true,
      somatic: false,
      material: false,
      items: ''
    },
    classes: [
      'warlock',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Contagion',
    source: 'srd',
    level: 5,
    school: 'necromancy',
    ritual: false,
    castingTime: '1 action',
    range: 'touch',
    concentration: false,
    duration: '7 days',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'cleric',
      'druid'
    ],
    description: ''
  },
  {
    name: 'Contingency',
    source: 'srd',
    level: 6,
    school: 'evocation',
    ritual: false,
    castingTime: '10 minutes',
    range: 'self',
    concentration: false,
    duration: '10 days',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a statuette of yourself carved from ivory and decorated with gems worth at least 1,500 gp'
    },
    classes: [
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Continual Flame',
    source: 'srd',
    level: 2,
    school: 'evocation',
    ritual: false,
    castingTime: '1 action',
    range: 'touch',
    concentration: false,
    duration: 'until dispelled',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'ruby dust worth 50 gp, which the spell consumes'
    },
    classes: [
      'cleric',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Control Water',
    source: 'srd',
    level: 4,
    school: 'transmutation',
    ritual: false,
    castingTime: '1 action',
    range: '300 feet',
    concentration: true,
    duration: 'up to 10 minutes',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a drop of water and a pinch of dust'
    },
    classes: [
      'cleric',
      'druid',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Control Weather',
    source: 'srd',
    level: 8,
    school: 'transmutation',
    ritual: false,
    castingTime: '10 minutes',
    range: 'self (5-mile radius)',
    concentration: true,
    duration: 'up to 8 hours',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'burning incense and bits of earth and wood mixed in water'
    },
    classes: [
      'cleric',
      'druid',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Counterspell',
    source: 'srd',
    level: 3,
    school: 'abjuration',
    ritual: false,
    castingTime: '1 reaction, which you can take when you see a creature within 60 feet of you casting a spell',
    range: '60 feet',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: false,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'sorcerer',
      'warlock',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Create Food and Water',
    source: 'srd',
    level: 3,
    school: 'conjuration',
    ritual: false,
    castingTime: '1 action',
    range: '30 feet',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'cleric',
      'paladin'
    ],
    description: ''
  },
  {
    name: 'Create or Destroy Water',
    source: 'srd',
    level: 1,
    school: 'transmutation',
    ritual: false,
    castingTime: '1 action',
    range: '30 feet',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a drop of water if creating water or a few grains of sand if destroying it'
    },
    classes: [
      'cleric',
      'druid'
    ],
    description: ''
  },
  {
    name: 'Create Undead',
    source: 'srd',
    level: 6,
    school: 'necromancy',
    ritual: false,
    castingTime: '1 minute',
    range: '10 feet',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'one clay pot filled with grave dirt, one clay pot filled with brackish water, and one 150 gp black onyx stone for each corpse'
    },
    classes: [
      'cleric',
      'warlock',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Creation',
    source: 'srd',
    level: 5,
    school: 'illusion',
    ritual: false,
    castingTime: '1 minute',
    range: '30 feet',
    concentration: false,
    duration: 'special',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a tiny piece of matter of the same type of the item you plan to create'
    },
    classes: [
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Cure Wounds',
    source: 'srd',
    level: 1,
    school: 'evocation',
    ritual: false,
    castingTime: '1 action',
    range: 'touch',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'bard',
      'cleric',
      'druid',
      'paladin',
      'ranger'
    ],
    description: ''
  },
  {
    name: 'Dancing Lights',
    source: 'srd',
    level: 0,
    school: 'evocation',
    ritual: false,
    castingTime: '1 action',
    range: '120 feet',
    concentration: true,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a bit of phosphorus or wychwood, or a glowworm'
    },
    classes: [
      'bard',
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Darkness',
    source: 'srd',
    level: 2,
    school: 'evocation',
    ritual: false,
    castingTime: '1 action',
    range: '60 feet',
    concentration: true,
    duration: 'up to 10 minutes',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'bat fur and a drop of pitch or piece of coal'
    },
    classes: [
      'sorcerer',
      'warlock',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Darkvision',
    source: 'srd',
    level: 2,
    school: 'transmutation',
    ritual: false,
    castingTime: '1 action',
    range: 'touch',
    concentration: false,
    duration: '8 hours',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'either a pinch of dried carrot or an agate'
    },
    classes: [
      'druid',
      'ranger',
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Daylight',
    source: 'srd',
    level: 3,
    school: 'evocation',
    ritual: false,
    castingTime: '1 action',
    range: '60 feet',
    concentration: false,
    duration: '1 hour',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'cleric',
      'druid',
      'paladin',
      'ranger',
      'sorcerer'
    ],
    description: ''
  },
  {
    name: 'Death Ward',
    source: 'srd',
    level: 4,
    school: 'abjuration',
    ritual: false,
    castingTime: '1 action',
    range: 'touch',
    concentration: false,
    duration: '8 hours',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'cleric',
      'paladin'
    ],
    description: ''
  },
  {
    name: 'Delayed Blast Fireball',
    source: 'srd',
    level: 7,
    school: 'evocation',
    ritual: false,
    castingTime: '1 action',
    range: '150 feet',
    concentration: true,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a tiny ball of bat guano and sulfur'
    },
    classes: [
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Demiplane',
    source: 'srd',
    level: 8,
    school: 'conjuration',
    ritual: false,
    castingTime: '1 action',
    range: '60 feet',
    concentration: false,
    duration: '1 hour',
    components: {
      verbal: false,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'warlock',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Detect Evil and Good',
    source: 'srd',
    level: 1,
    school: 'divination',
    ritual: false,
    castingTime: '1 action',
    range: 'self',
    concentration: true,
    duration: 'up to 10 minutes',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'cleric',
      'paladin'
    ],
    description: ''
  },
  {
    name: 'Detect Magic',
    source: 'srd',
    level: 1,
    school: 'divination',
    ritual: true,
    castingTime: '1 action',
    range: 'self',
    concentration: true,
    duration: 'up to 10 minutes',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'bard',
      'cleric',
      'druid',
      'paladin',
      'ranger',
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Detect Poison and Disease',
    source: 'srd',
    level: 1,
    school: 'divination',
    ritual: true,
    castingTime: '1 action',
    range: 'self',
    concentration: true,
    duration: 'up to 10 minutes',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a yew leaf'
    },
    classes: [
      'cleric',
      'druid',
      'paladin',
      'ranger'
    ],
    description: ''
  },
  {
    name: 'Detect Thoughts',
    source: 'srd',
    level: 2,
    school: 'divination',
    ritual: false,
    castingTime: '1 action',
    range: 'self',
    concentration: true,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a copper piece'
    },
    classes: [
      'bard',
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Dimension Door',
    source: 'srd',
    level: 4,
    school: 'conjuration',
    ritual: false,
    castingTime: '1 action',
    range: '500 feet',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: false,
      material: false,
      items: ''
    },
    classes: [
      'bard',
      'sorcerer',
      'warlock',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Disguise Self',
    source: 'srd',
    level: 1,
    school: 'illusion',
    ritual: false,
    castingTime: '1 action',
    range: 'self',
    concentration: false,
    duration: '1 hour',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'bard',
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Disintegrate',
    source: 'srd',
    level: 6,
    school: 'transmutation',
    ritual: false,
    castingTime: '1 action',
    range: '60 feet',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a lodestone and a pinch of dust'
    },
    classes: [
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Dispel Evil and Good',
    source: 'srd',
    level: 5,
    school: 'abjuration',
    ritual: false,
    castingTime: '1 action',
    range: 'self',
    concentration: true,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'holy water or powdered silver and iron'
    },
    classes: [
      'cleric',
      'paladin'
    ],
    description: ''
  },
  {
    name: 'Dispel Magic',
    source: 'srd',
    level: 3,
    school: 'abjuration',
    ritual: false,
    castingTime: '1 action',
    range: '120 feet',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'bard',
      'cleric',
      'druid',
      'paladin',
      'sorcerer',
      'warlock',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Divination',
    source: 'srd',
    level: 4,
    school: 'divination',
    ritual: true,
    castingTime: '1 action',
    range: 'self',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'incense and a sacrificial offering appropriate to your religion, together worth at least 25 gp, which the spell consumes'
    },
    classes: [
      'cleric'
    ],
    description: ''
  },
  {
    name: 'Divine Favor',
    source: 'srd',
    level: 1,
    school: 'evocation',
    ritual: false,
    castingTime: '1 bonus action',
    range: 'self',
    concentration: true,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'paladin'
    ],
    description: ''
  },
  {
    name: 'Divine Word',
    source: 'srd',
    level: 7,
    school: 'evocation',
    ritual: false,
    castingTime: '1 bonus action',
    range: '30 feet',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: false,
      material: false,
      items: ''
    },
    classes: [
      'cleric'
    ],
    description: ''
  },
  {
    name: 'Dominate Beast',
    source: 'srd',
    level: 4,
    school: 'enchantment',
    ritual: false,
    castingTime: '1 action',
    range: '60 feet',
    concentration: true,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'druid',
      'sorcerer',
    ],
    description: ''
  },
  {
    name: 'Dominate Monster',
    source: 'srd',
    level: 8,
    school: 'enchantment',
    ritual: false,
    castingTime: '1 action',
    range: '60 feet',
    concentration: true,
    duration: 'up to 1 hour',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'bard',
      'sorcerer',
      'warlock',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Dominate Person',
    source: 'srd',
    level: 5,
    school: 'enchantment',
    ritual: false,
    castingTime: '1 action',
    range: '60 feet',
    concentration: true,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'bard',
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Dream',
    source: 'srd',
    level: 5,
    school: 'illusion',
    ritual: false,
    castingTime: '1 minute',
    range: 'special',
    concentration: false,
    duration: '8 hours',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a handful of sand, a dab of ink, and a writing quill plucked from a sleeping bird'
    },
    classes: [
      'bard',
      'warlock',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Druidcraft',
    source: 'srd',
    level: 0,
    school: 'transmutation',
    ritual: false,
    castingTime: '1 action',
    range: '30 feet',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'druid'
    ],
    description: ''
  },
  {
    name: 'Earthquake',
    source: 'srd',
    level: 8,
    school: 'evocation',
    ritual: false,
    castingTime: '1 action',
    range: '500 feet',
    concentration: true,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a pinch of dirt, a piece of rock, and a lump of clay'
    },
    classes: [
      'cleric',
      'druid',
      'sorcerer'
    ],
    description: ''
  },
  {
    name: 'Eldritch Blast',
    source: 'srd',
    level: 0,
    school: 'evocation',
    ritual: false,
    castingTime: '1 action',
    range: '120 feet',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'warlock'
    ],
    description: ''
  },
  {
    name: 'Enhance Ability',
    source: 'srd',
    level: 2,
    school: 'transmutation',
    ritual: false,
    castingTime: '1 action',
    range: 'touch',
    concentration: true,
    duration: 'up to 1 hour',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'fur or a feather from a beast'
    },
    classes: [
      'bard',
      'cleric',
      'druid',
      'sorcerer'
    ],
    description: ''
  },
  {
    name: 'Enlarge/Reduce',
    source: 'srd',
    level: 2,
    school: 'transmutation',
    ritual: false,
    castingTime: '1 action',
    range: '30 feet',
    concentration: true,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a pinch of powdered iron'
    },
    classes: [
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Entangle',
    source: 'srd',
    level: 1,
    school: 'conjuration',
    ritual: false,
    castingTime: '1 action',
    range: '90 feet',
    concentration: true,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'druid'
    ],
    description: ''
  },
  {
    name: 'Enthrall',
    source: 'srd',
    level: 2,
    school: 'enchantment',
    ritual: false,
    castingTime: '1 action',
    range: '60 feet',
    concentration: false,
    duration: '1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'bard',
      'warlock'
    ],
    description: ''
  },
  {
    name: 'Etherealness',
    source: 'srd',
    level: 7,
    school: 'transmutation',
    ritual: false,
    castingTime: '1 action',
    range: 'self',
    concentration: false,
    duration: 'up to 8 hours',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'bard',
      'cleric',
      'sorcerer',
      'warlock',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Expeditious Retreat',
    source: 'srd',
    level: 1,
    school: 'transmuation',
    ritual: false,
    castingTime: '1 bonus action',
    range: 'self',
    concentration: true,
    duration: 'up to 10 minutes',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'sorcerer',
      'warlock',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Eyebite',
    source: 'srd',
    level: 6,
    school: 'necromancy',
    ritual: false,
    castingTime: '1 action',
    range: 'self',
    concentration: true,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'bard',
      'sorcerer',
      'warlock',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Fabricate',
    source: 'srd',
    level: 4,
    school: 'transmutation',
    ritual: false,
    castingTime: '10 minutes',
    range: '120 feet',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Faerie Fire',
    source: 'srd',
    level: 1,
    school: 'evocation',
    ritual: false,
    castingTime: '1 action',
    range: '60 feet',
    concentration: true,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: false,
      material: false,
      items: ''
    },
    classes: [
      'bard',
      'druid'
    ],
    description: ''
  },
  {
    name: 'Faithful Hound',
    source: 'srd',
    level: 4,
    school: 'conjuration',
    ritual: false,
    castingTime: '1 action',
    range: '30 feet',
    concentration: false,
    duration: '8 hours',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a tiny silver whistle, a piece of pone, and a thread'
    },
    classes: [
      'wizard'
    ],
    description: ''
  },
  {
    name: 'False Life',
    source: 'srd',
    level: 1,
    school: 'necromancy',
    ritual: false,
    castingTime: '1 action',
    range: 'self',
    concentration: false,
    duration: '1 hour',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a small amount of alcohol or distilled spirits'
    },
    classes: [
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Fear',
    source: 'srd',
    level: 3,
    school: 'illusion',
    ritual: false,
    castingTime: '1 action',
    range: 'self (30-foot cone)',
    concentration: true,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a white feather or the heart of a hen'
    },
    classes: [
      'bard',
      'sorcerer',
      'warlock',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Feather Fall',
    source: 'srd',
    level: 1,
    school: 'transmutation',
    ritual: false,
    castingTime: '1 reaction, which you take when you or a creature within 60 feet of you falls',
    range: '60 feet',
    concentration: false,
    duration: '1 minute',
    components: {
      verbal: true,
      somatic: false,
      material: true,
      items: 'a small feather or piece of down'
    },
    classes: [
      'bard',
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Feeblemind',
    source: 'srd',
    level: 8,
    school: 'enchantment',
    ritual: false,
    castingTime: '1 action',
    range: '150 feet',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a handful of clay, crystal, glass, or mineral spheres'
    },
    classes: [
      'bard',
      'druid',
      'warlock',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Find Familiar',
    source: 'srd',
    level: 1,
    school: 'conjuration',
    ritual: true,
    castingTime: '1 hour',
    range: '10 feet',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: '10 gp worth of charcoal, incense, and herbs that must be consumed by fire in a brass brazier'
    },
    classes: [
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Find Steed',
    source: 'srd',
    level: 2,
    school: 'conjuration',
    ritual: false,
    castingTime: '10 minutes',
    range: '30 feet',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'paladin'
    ],
    description: ''
  },
  {
    name: 'Find the Path',
    source: 'srd',
    level: 6,
    school: 'divination',
    ritual: false,
    castingTime: '1 minute',
    range: 'self',
    concentration: true,
    duration: 'up to 1 day',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a set of divinatory tools—such as bones, ivory sticks, cards, teeth, or carved runes—worth 100 gp and an object from the location you wish to find'
    },
    classes: [
      'bard',
      'cleric',
      'druid'
    ],
    description: ''
  },
  {
    name: 'Find Traps',
    source: 'srd',
    level: 2,
    school: 'divination',
    ritual: false,
    castingTime: '1 action',
    range: '120 feet',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'cleric',
      'druid',
      'ranger',
    ],
    description: ''
  },
  {
    name: 'Finger of Death',
    source: 'srd',
    level: 7,
    school: 'necromancy',
    ritual: false,
    castingTime: '1 action',
    range: '60 feet',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'sorcerer',
      'warlock',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Fireball',
    source: 'srd',
    level: 3,
    school: 'evocation',
    ritual: false,
    castingTime: '1 action',
    range: '150 feet',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a tiny ball of bat guano and sulfur'
    },
    classes: [
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Fire Bolt',
    source: 'srd',
    level: 0,
    school: 'evocation',
    ritual: false,
    castingTime: '1 action',
    range: '120 feet',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Fire Shield',
    source: 'srd',
    level: 4,
    school: 'evocation',
    ritual: false,
    castingTime: '1 action',
    range: 'self',
    concentration: false,
    duration: '10 minutes',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a bit of phosphorus or a firefly'
    },
    classes: [
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Fire Storm',
    source: 'srd',
    level: 7,
    school: 'evocation',
    ritual: false,
    castingTime: '1 action',
    range: '150 feet',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'cleric',
      'druid',
      'sorcerer',
    ],
    description: ''
  },
  {
    name: 'Flame Blade',
    source: 'srd',
    level: 2,
    school: 'evocation',
    ritual: false,
    castingTime: '1 bonus action',
    range: 'self',
    concentration: true,
    duration: 'up to 10 minutes',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'leaf of sumac'
    },
    classes: [
      'druid'
    ],
    description: ''
  },
  {
    name: 'Flame Strike',
    source: 'srd',
    level: 5,
    school: 'evocation',
    ritual: false,
    castingTime: '1 action',
    range: '60 feet',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'pinch of sulfur'
    },
    classes: [
      'cleric'
    ],
    description: ''
  },
  {
    name: 'Flaming Sphere',
    source: 'srd',
    level: 2,
    school: 'conjuration',
    ritual: false,
    castingTime: '1 action',
    range: '60 feet',
    concentration: true,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a bit of tallow, a pinch of brimstone, and a dusting of powdered iron'
    },
    classes: [
      'druid',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Flesh to Stone',
    source: 'srd',
    level: 6,
    school: 'transmutation',
    ritual: false,
    castingTime: '1 action',
    range: '60 feet',
    concentration: true,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a pinch of lime, water, earth'
    },
    classes: [
      'warlock',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Floating Disk',
    source: 'srd',
    level: 1,
    school: 'conjuration',
    ritual: true,
    castingTime: '1 action',
    range: '30 feet',
    concentration: false,
    duration: '1 hour',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a drop of mercury'
    },
    classes: [
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Fly',
    source: 'srd',
    level: 3,
    school: 'transmutation',
    ritual: false,
    castingTime: '1 action',
    range: 'touch',
    concentration: true,
    duration: 'up to 10 minutes',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a wing feather from any bird'
    },
    classes: [
      'sorcerer',
      'warlock',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Fog Cloud',
    source: 'srd',
    level: 1,
    school: 'conjuration',
    ritual: false,
    castingTime: '1 action',
    range: '120 feet',
    concentration: true,
    duration: 'up to 1 hour',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'druid',
      'ranger',
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Forbiddance',
    source: 'srd',
    level: 6,
    school: 'abjuration',
    ritual: true,
    castingTime: '10 minutes',
    range: 'touch',
    concentration: false,
    duration: '1 day',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a sprinkling of holy water, rare incense, and powdered ruby worth at least 1,000 gp'
    },
    classes: [
      'cleric'
    ],
    description: ''
  },
  {
    name: 'Forcecage',
    source: 'srd',
    level: 7,
    school: 'evocation',
    ritual: false,
    castingTime: '1 action',
    range: '100 feet',
    concentration: false,
    duration: '1 hour',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'ruby dust worth 1,500 gp'
    },
    classes: [
      'bard',
      'warlock',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Foresight',
    source: 'srd',
    level: 9,
    school: 'divination',
    ritual: false,
    castingTime: '1 minute',
    range: 'touch',
    concentration: false,
    duration: '8 hours',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a hummingbird feather'
    },
    classes: [
      'bard',
      'druid',
      'warlock',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Freedom of Movement',
    source: 'srd',
    level: 4,
    school: 'abjuration',
    ritual: false,
    castingTime: '1 action',
    range: 'touch',
    concentration: false,
    duration: '1 hour',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a leather strap, bound around the arm or a similar appendage'
    },
    classes: [
      'bard',
      'cleric',
      'druid',
      'ranger'
    ],
    description: ''
  },
  {
    name: 'Freezing Sphere',
    source: 'srd',
    level: 6,
    school: 'evocation',
    ritual: false,
    castingTime: '1 action',
    range: '300 feet',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a small crystal sphere'
    },
    classes: [
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Gaseous Form',
    source: 'srd',
    level: 3,
    school: 'transmutation',
    ritual: false,
    castingTime: '1 action',
    range: 'touch',
    concentration: true,
    duration: 'up to 1 hour',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a bit of gauze and a wisp of smoke'
    },
    classes: [
      'sorcerer',
      'warlock',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Gate',
    source: 'srd',
    level: 9,
    school: 'conjuration',
    ritual: false,
    castingTime: '1 action',
    range: '60 feet',
    concentration: true,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a diamond worth at least 5,000 gp'
    },
    classes: [
      'cleric',
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Geas',
    source: 'srd',
    level: 5,
    school: 'enchantment',
    ritual: false,
    castingTime: '1 minute',
    range: '60 feet',
    concentration: false,
    duration: '30 days',
    components: {
      verbal: true,
      somatic: false,
      material: false,
      items: ''
    },
    classes: [
      'bard',
      'cleric',
      'druid',
      'paladin',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Gentle Repose',
    source: 'srd',
    level: 2,
    school: 'necromancy',
    ritual: true,
    castingTime: '1 action',
    range: 'touch',
    concentration: false,
    duration: '10 days',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a pinch of salt and one copper piece placed on each of the corpse\'s eyes, which must remain there for the duration'
    },
    classes: [
      'cleric',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Giant Insect',
    source: 'srd',
    level: 4,
    school: 'transmutation',
    ritual: false,
    castingTime: '1 action',
    range: '30 feet',
    concentration: true,
    duration: 'up to 10 minutes',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'druid'
    ],
    description: ''
  },
  {
    name: 'Glibness',
    source: 'srd',
    level: 8,
    school: 'transmutation',
    ritual: false,
    castingTime: '1 action',
    range: 'self',
    concentration: false,
    duration: '1 hour',
    components: {
      verbal: true,
      somatic: false,
      material: false,
      items: ''
    },
    classes: [
      'bard',
      'warlock'
    ],
    description: ''
  },
  {
    name: 'Globe of Invulnerability',
    source: 'srd',
    level: 6,
    school: 'abjuration',
    ritual: false,
    castingTime: '1 action',
    range: 'self (10-foot radius',
    concentration: true,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a glass or crystal bead that shatters when the spell ends'
    },
    classes: [
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Glyph of Warding',
    source: 'srd',
    level: 3,
    school: 'abjuration',
    ritual: false,
    castingTime: '1 hour',
    range: 'touch',
    concentration: false,
    duration: 'until dispelled or triggered',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'incense and powdered diamond worth at least 200 gp, which the spell consumes'
    },
    classes: [
      'bard',
      'cleric',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Goodberry',
    source: 'srd',
    level: 1,
    school: 'transmutation',
    ritual: false,
    castingTime: '1 action',
    range: 'touch',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a sprig of mistletoe'
    },
    classes: [
      'druid',
      'ranger'
    ],
    description: ''
  },
  {
    name: 'Grease',
    source: 'srd',
    level: 1,
    school: 'conjuration',
    ritual: false,
    castingTime: '1 action',
    range: '60 feet',
    concentration: false,
    duration: '1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a bit of pork rind or butter'
    },
    classes: [
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Greater Invisibility',
    source: 'srd',
    level: 4,
    school: 'illusion',
    ritual: false,
    castingTime: '1 action',
    range: 'touch',
    concentration: true,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'bard',
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Greater Restoration',
    source: 'srd',
    level: 5,
    school: 'abjuration',
    ritual: false,
    castingTime: '1 action',
    range: 'touch',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'diamond dust worth at least 100gp, which the spell consumes'
    },
    classes: [
      'bard',
      'cleric',
      'druid'
    ],
    description: ''
  },
  {
    name: 'Guardian of Faith',
    source: 'srd',
    level: 4,
    school: 'conjuration',
    ritual: false,
    castingTime: '1 action',
    range: '30 feet',
    concentration: false,
    duration: '8 hours',
    components: {
      verbal: true,
      somatic: false,
      material: false,
      items: ''
    },
    classes: [
      'cleric'
    ],
    description: ''
  },
  {
    name: 'Guards and Wards',
    source: 'srd',
    level: 6,
    school: 'abjuration',
    ritual: false,
    castingTime: '10 minutes',
    range: 'touch',
    concentration: false,
    duration: '24 hours',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'burning incense, a small measure of brimstone and oil, a knotted string, a small amount of umber hulk blood, and a small silver rod worth at least 10 gp'
    },
    classes: [
      'bard',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Guidance',
    source: 'srd',
    level: 0,
    school: 'divination',
    ritual: false,
    castingTime: '1 action',
    range: 'touch',
    concentration: true,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'cleric',
      'druid'
    ],
    description: ''
  },
  {
    name: 'Guiding Bolt',
    source: 'srd',
    level: 1,
    school: 'evocation',
    ritual: false,
    castingTime: '1 action',
    range: '120 feet',
    concentration: false,
    duration: '1 round',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'cleric'
    ],
    description: ''
  },
  {
    name: 'Gust of Wind',
    source: 'srd',
    level: 2,
    school: 'evocation',
    ritual: false,
    castingTime: '1 action',
    range: 'self (60-foot line)',
    concentration: true,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a legume seed'
    },
    classes: [
      'druid',
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Hallow',
    source: 'srd',
    level: 5,
    school: 'evocation',
    ritual: false,
    castingTime: '24 hours',
    range: 'touch',
    concentration: false,
    duration: 'until dispelled',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'herbs, oils, and incense worth at least 1,000 gp, which the spell consumes'
    },
    classes: [
      'cleric'
    ],
    description: ''
  },
  {
    name: 'Hallucinatory Terrain',
    source: 'srd',
    level: 4,
    school: 'illusion',
    ritual: false,
    castingTime: '10 minutes',
    range: '300 feet',
    concentration: false,
    duration: '24 hours',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a stone, a twig, and a bit of green plant'
    },
    classes: [
      'bard',
      'druid',
      'warlock',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Harm',
    source: 'srd',
    level: 6,
    school: 'necromancy',
    ritual: false,
    castingTime: '1 action',
    range: '60 feet',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'cleric'
    ],
    description: ''
  },
  {
    name: 'Haste',
    source: 'srd',
    level: 3,
    school: 'transmutation',
    ritual: false,
    castingTime: '1 action',
    range: '30 feet',
    concentration: true,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a shaving of licorice root'
    },
    classes: [
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Heal',
    source: 'srd',
    level: 6,
    school: 'evocation',
    ritual: false,
    castingTime: '1 action',
    range: '60 feet',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'cleric',
      'druid'
    ],
    description: ''
  },
  {
    name: 'Healing Word',
    source: 'srd',
    level: 1,
    school: 'evocation',
    ritual: false,
    castingTime: '1 bonus action',
    range: '60 feet',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: false,
      material: false,
      items: ''
    },
    classes: [
      'bard',
      'cleric',
      'druid'
    ],
    description: ''
  },
  {
    name: 'Heat Metal',
    source: 'srd',
    level: 2,
    school: 'transmutation',
    ritual: false,
    castingTime: '1 action',
    range: '60 feet',
    concentration: true,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a piece of iron and a flame'
    },
    classes: [
      'bard',
      'druid'
    ],
    description: ''
  },
  {
    name: 'Hellish Rebuke',
    source: 'srd',
    level: 1,
    school: 'evocation',
    ritual: false,
    castingTime: '1 reaction, which you can take in response to being damaged by a creature within 60 feet of you that you can see',
    range: '60 feet',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'warlock'
    ],
    description: ''
  },
  {
    name: 'Heroes\' Feast',
    source: 'srd',
    level: 6,
    school: 'conjuration',
    ritual: false,
    castingTime: '10 minutes',
    range: '30 feet',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a gem-encrusted bowl worth at least 1,000 gp, which the spell consumes'
    },
    classes: [
      'cleric',
      'druid'
    ],
    description: ''
  },
  {
    name: 'Heroism',
    source: 'srd',
    level: 1,
    school: 'enchantment',
    ritual: false,
    castingTime: '1 action',
    range: 'touch',
    concentration: true,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'bard',
      'paladin'
    ],
    description: ''
  },
  {
    name: 'Hideous Laughter',
    source: 'srd',
    level: 1,
    school: 'enchantment',
    ritual: false,
    castingTime: '1 action',
    range: '30 feet',
    concentration: true,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'tiny tarts and a feather that is waved in the air'
    },
    classes: [
      'bard',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Hold Monster',
    source: 'srd',
    level: 5,
    school: 'enchantment',
    ritual: false,
    castingTime: '1 action',
    range: '90 feet',
    concentration: true,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a small, straight piece of iron'
    },
    classes: [
      'bard',
      'sorcerer',
      'warlock',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Hold Person',
    source: 'srd',
    level: 2,
    school: 'enchantment',
    ritual: false,
    castingTime: '1 action',
    range: '60 feet',
    concentration: true,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a small, straight piece of iron'
    },
    classes: [
      'bard',
      'cleric',
      'druid',
      'sorcerer',
      'warlock',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Holy Aura',
    source: 'srd',
    level: 8,
    school: 'abjuration',
    ritual: false,
    castingTime: '1 action',
    range: 'self',
    concentration: true,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a tiny reliquary worth at least 1,000 gp containing a sacred relic, such as a scrap of cloth from a saint\'s robe or a piece of parchment from a religious text'
    },
    classes: [
      'cleric'
    ],
    description: ''
  },
  {
    name: 'Hunter\'s Mark',
    source: 'srd',
    level: 1,
    school: 'divination',
    ritual: false,
    castingTime: '1 bonus action',
    range: '90 feet',
    concentration: true,
    duration: 'up to 1 hour',
    components: {
      verbal: true,
      somatic: false,
      material: false,
      items: ''
    },
    classes: [
      'ranger'
    ],
    description: ''
  },
  {
    name: 'Hypnotic Pattern',
    source: 'srd',
    level: 3,
    school: 'illusion',
    ritual: false,
    castingTime: '1 action',
    range: '120 feet',
    concentration: true,
    duration: 'up to 1 minute',
    components: {
      verbal: false,
      somatic: true,
      material: true,
      items: ''
    },
    classes: [
      'bard',
      'sorcerer',
      'warlock',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Ice Storm',
    source: 'srd',
    level: 4,
    school: 'evocation',
    ritual: false,
    castingTime: '1 action',
    range: '300 feet',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a pinch of dust and a few drops of water'
    },
    classes: [
      'druid',
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Identify',
    source: 'srd',
    level: 1,
    school: 'divination',
    ritual: false,
    castingTime: '1 minute',
    range: 'touch',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a pearl worth at least 100 gp and an owl feather'
    },
    classes: [
      'bard',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Illusory Script',
    source: 'srd',
    level: 1,
    school: 'illusion',
    ritual: true,
    castingTime: '1 minute',
    range: 'touch',
    concentration: false,
    duration: '10 days',
    components: {
      verbal: false,
      somatic: true,
      material: true,
      items: ''
    },
    classes: [
      'bard',
      'warlock',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Imprisonment',
    source: 'srd',
    level: 9,
    school: 'abjuration',
    ritual: false,
    castingTime: '1 minute',
    range: '30 feet',
    concentration: false,
    duration: 'until dispelled',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a vellum depiction or a carved statuette in the likeness of the target, and a special component that varies according to the version of the spell you choose, worth at least 500 gp per Hit Die of the target'
    },
    classes: [
      'bard',
      'cleric',
      'druid',
      'paladin',
      'ranger',
      'sorcerer',
      'warlock',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Incendiary Cloud',
    source: 'srd',
    level: 8,
    school: 'conjuration',
    ritual: false,
    castingTime: '1 action',
    range: '150 feet',
    concentration: true,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Inflict Wounds',
    source: 'srd',
    level: 1,
    school: 'necromancy',
    ritual: false,
    castingTime: '1 action',
    range: 'touch',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'cleric'
    ],
    description: ''
  },
  {
    name: 'Insect Plague',
    source: 'srd',
    level: 5,
    school: 'conjuration',
    ritual: false,
    castingTime: '1 action',
    range: '300 feet',
    concentration: true,
    duration: 'up to 10 minutes',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a few grains of sugar, some kernels of grain, and a smear of fat'
    },
    classes: [
      'cleric',
      'druid',
      'sorcerer'
    ],
    description: ''
  },
  {
    name: 'Instant Summons',
    source: 'srd',
    level: 6,
    school: 'conjuration',
    ritual: true,
    castingTime: '1 minute',
    range: 'touch',
    concentration: false,
    duration: 'until dispelled',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a sapphire worth 1,000 gp'
    },
    classes: [
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Invisibility',
    source: 'srd',
    level: 2,
    school: 'illusion',
    ritual: false,
    castingTime: '1 action',
    range: 'touch',
    concentration: true,
    duration: 'up to 1 hour',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'an eyelash encased in gum arabic'
    },
    classes: [
      'bard',
      'sorcerer',
      'warlock',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Irresistible Dance',
    source: 'srd',
    level: 6,
    school: 'enchantment',
    ritual: false,
    castingTime: '1 action',
    range: '30 feet',
    concentration: true,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: false,
      material: false,
      items: ''
    },
    classes: [
      'bard',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Jump',
    source: 'srd',
    level: 1,
    school: 'transmutation',
    ritual: false,
    castingTime: '1 action',
    range: 'touch',
    concentration: false,
    duration: '1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a grasshopper\'s hind leg'
    },
    classes: [
      'druid',
      'ranger',
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Knock',
    source: 'srd',
    level: 2,
    school: 'transmutation',
    ritual: false,
    castingTime: '1 action',
    range: '60 feet',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: false,
      material: false,
      items: ''
    },
    classes: [
      'bard',
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Legend Lore',
    source: 'srd',
    level: 5,
    school: 'divination',
    ritual: false,
    castingTime: '10 minutes',
    range: 'self',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'incense worth at least 250 gp, which the spell consumes, and four ivory strips worth at least 50 gp each'
    },
    classes: [
      'bard',
      'cleric',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Lesser Restoration',
    source: 'srd',
    level: 2,
    school: 'abjuration',
    ritual: false,
    castingTime: '1 action',
    range: 'touch',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'bard',
      'cleric',
      'druid',
      'paladin',
      'ranger'
    ],
    description: ''
  },
  {
    name: 'Levitate',
    source: 'srd',
    level: 2,
    school: 'transmutation',
    ritual: false,
    castingTime: '1 action',
    range: '60 feet',
    concentration: true,
    duration: 'up to 10 minutes',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'either a small leather loop or a piece of golden wire bent into a cup shape with a long shank on one end'
    },
    classes: [
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Light',
    source: 'srd',
    level: 0,
    school: 'evocation',
    ritual: false,
    castingTime: '1 action',
    range: 'touch',
    concentration: false,
    duration: '1 hour',
    components: {
      verbal: true,
      somatic: false,
      material: true,
      items: ''
    },
    classes: [
      'bard',
      'cleric',
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Lightning Bolt',
    source: 'srd',
    level: 3,
    school: 'evocation',
    ritual: false,
    castingTime: '1 action',
    range: 'self (100-foot line)',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a bit of fur and a rod of amber, crystal, or glass'
    },
    classes: [
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Locate Animals or Plants',
    source: 'srd',
    level: 2,
    school: 'divination',
    ritual: true,
    castingTime: '1 action',
    range: 'self',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a bit of fur from a bloodhound'
    },
    classes: [
      'bard',
      'druid',
      'ranger'
    ],
    description: ''
  },
  {
    name: 'Locate Creature',
    source: 'srd',
    level: 4,
    school: 'divination',
    ritual: false,
    castingTime: '1 action',
    range: 'self',
    concentration: true,
    duration: 'up to 1 hour',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a bit of fur from a bloodhound'
    },
    classes: [
      'bard',
      'cleric',
      'druid',
      'paladin',
      'ranger',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Locate Object',
    source: 'srd',
    level: 2,
    school: 'divination',
    ritual: false,
    castingTime: '1 action',
    range: 'self',
    concentration: true,
    duration: 'up to 10 minutes',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a forked twig'
    },
    classes: [
      'bard',
      'cleric',
      'druid',
      'paladin',
      'ranger',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Longstrider',
    source: 'srd',
    level: 1,
    school: 'transmutation',
    ritual: false,
    castingTime: '1 action',
    range: 'touch',
    concentration: false,
    duration: '1 hour',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a pinch of dirt'
    },
    classes: [
      'bard',
      'druid',
      'ranger',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Mage Armor',
    source: 'srd',
    level: 1,
    school: 'abjuration',
    ritual: false,
    castingTime: '1 action',
    range: 'touch',
    concentration: false,
    duration: '8 hours',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a piece of cured leather'
    },
    classes: [
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Mage Hand',
    source: 'srd',
    level: 0,
    school: 'conjuration',
    ritual: false,
    castingTime: '1 action',
    range: '30 feet',
    concentration: false,
    duration: '1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'bard',
      'sorcerer',
      'warlock',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Magic Circle',
    source: 'srd',
    level: 3,
    school: 'abjuration',
    ritual: false,
    castingTime: '1 minute',
    range: '10 feet',
    concentration: false,
    duration: '1 hour',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'holy water or powdered silver and iron worth at least 100 gp, which the spell consumes'
    },
    classes: [
      'cleric',
      'paladin',
      'warlock',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Magic Jar',
    source: 'srd',
    level: 6,
    school: 'necromancy',
    ritual: false,
    castingTime: '1 minute',
    range: 'self',
    concentration: false,
    duration: 'until dispelled',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a gem, crystal, reliquary, or some other ornamental container worth at least 500 gp'
    },
    classes: [
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Magic Missile',
    source: 'srd',
    level: 1,
    school: 'evocation',
    ritual: false,
    castingTime: '1 action',
    range: '120 feet',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Magic Mouth',
    source: 'srd',
    level: 2,
    school: 'illusion',
    ritual: false,
    castingTime: '1 minute',
    range: '30 feet',
    concentration: false,
    duration: 'until dispelled',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a small bit of honeycomb and jade dust worth at least 10 gp, which the spell consumes'
    },
    classes: [
      'bard',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Magic Weapon',
    source: 'srd',
    level: 2,
    school: 'transmutation',
    ritual: false,
    castingTime: '1 bonus action',
    range: 'touch',
    concentration: true,
    duration: 'up to 1 hour',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'paladin',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Magnificent Mansion',
    source: 'srd',
    level: 7,
    school: 'conjuration',
    ritual: false,
    castingTime: '1 minute',
    range: '300 feet',
    concentration: false,
    duration: '24 hours',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a minature portal carved from ivory, a small piece of polished marble, and a tiny silver spoon, each item worth at least 5 gp'
    },
    classes: [
      'bard',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Major Image',
    source: 'srd',
    level: 3,
    school: 'illusion',
    ritual: false,
    castingTime: '1 action',
    range: '120 feet',
    concentration: true,
    duration: 'up to 10 minutes',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a bit of fleece'
    },
    classes: [
      'bard',
      'sorcerer',
      'warlock',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Mass Cure Wounds',
    source: 'srd',
    level: 5,
    school: 'evocation',
    ritual: false,
    castingTime: '1 action',
    range: '60 feet',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'bard',
      'cleric',
      'druid'
    ],
    description: ''
  },
  {
    name: 'Mass Heal',
    source: 'srd',
    level: 9,
    school: 'evocation',
    ritual: false,
    castingTime: '1 action',
    range: '60 feet',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'cleric'
    ],
    description: ''
  },
  {
    name: 'Mass Healing Word',
    source: 'srd',
    level: 3,
    school: 'evocation',
    ritual: false,
    castingTime: '1 bonus action',
    range: '60 feet',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: false,
      material: false,
      items: ''
    },
    classes: [
      'cleric'
    ],
    description: ''
  },
  {
    name: 'Mass Suggestion',
    source: 'srd',
    level: 6,
    school: 'enchantment',
    ritual: false,
    castingTime: '1 action',
    range: '60 feet',
    concentration: false,
    duration: '24 hours',
    components: {
      verbal: true,
      somatic: false,
      material: true,
      items: 'a snake\'s tongue and either a bit of honeycomb or a drop of sweet oil'
    },
    classes: [
      'bard',
      'sorcerer',
      'warlock',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Maze',
    source: 'srd',
    level: 8,
    school: 'conjuration',
    ritual: false,
    castingTime: '1 action',
    range: '60 feet',
    concentration: true,
    duration: 'up to 10 minutes',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Meld into Stone',
    source: 'srd',
    level: 3,
    school: 'transmutation',
    ritual: false,
    castingTime: '1 action',
    range: 'touch',
    concentration: false,
    duration: '8 hours',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'cleric',
      'druid'
    ],
    description: ''
  },
  {
    name: 'Mending',
    source: 'srd',
    level: 0,
    school: 'transmutation',
    ritual: false,
    castingTime: '1 minute',
    range: 'touch',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'two lodestones'
    },
    classes: [
      'bard',
      'cleric',
      'druid',
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Message',
    source: 'srd',
    level: 0,
    school: 'transmutation',
    ritual: false,
    castingTime: '1 action',
    range: '120 feet',
    concentration: false,
    duration: '1 round',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a short piece of copper wire'
    },
    classes: [
      'bard',
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Meteor Swarm',
    source: 'srd',
    level: 9,
    school: 'evocation',
    ritual: false,
    castingTime: '1 action',
    range: '1 mile',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Mind Blank',
    source: 'srd',
    level: 8,
    school: 'abjuration',
    ritual: false,
    castingTime: '1 action',
    range: 'touch',
    concentration: false,
    duration: '24 hours',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'bard',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Minor Illusion',
    source: 'srd',
    level: 0,
    school: 'illusion',
    ritual: false,
    castingTime: '1 action',
    range: '30 feet',
    concentration: false,
    duration: '1 minute',
    components: {
      verbal: false,
      somatic: true,
      material: true,
      items: 'a bit of fleece'
    },
    classes: [
      'bard',
      'sorcerer',
      'warlock',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Mirage Arcane',
    source: 'srd',
    level: 7,
    school: 'illusion',
    ritual: false,
    castingTime: '10 minutes',
    range: 'sight',
    concentration: false,
    duration: '10 days',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'bard',
      'druid',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Mirror Image',
    source: 'srd',
    level: 2,
    school: 'illusion',
    ritual: false,
    castingTime: '1 action',
    range: 'self',
    concentration: false,
    duration: '1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'sorcerer',
      'warlock',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Mislead',
    source: 'srd',
    level: 5,
    school: 'illusion',
    ritual: false,
    castingTime: '1 action',
    range: 'self',
    concentration: true,
    duration: 'up to 1 hour',
    components: {
      verbal: false,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'bard',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Misty Step',
    source: 'srd',
    level: 2,
    school: 'conjuration',
    ritual: false,
    castingTime: '1 bonus action',
    range: 'self',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: false,
      material: false,
      items: ''
    },
    classes: [
      'sorcerer',
      'warlock',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Modify Memory',
    source: 'srd',
    level: 5,
    school: 'enchantment',
    ritual: false,
    castingTime: '1 action',
    range: '30 feet',
    concentration: true,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'bard',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Moonbeam',
    source: 'srd',
    level: 2,
    school: 'evocation',
    ritual: false,
    castingTime: '1 action',
    range: '120 feet',
    concentration: true,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'several seeds of any moonseed plant and a piece of opalescent feldspar'
    },
    classes: [
      'druid'
    ],
    description: ''
  },
  {
    name: 'Move Earth',
    source: 'srd',
    level: 6,
    school: 'transmutation',
    ritual: false,
    castingTime: '1 action',
    range: '120 feet',
    concentration: true,
    duration: 'up to 2 hours',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'an iron blade and a small bag containing a mixture of soils—clay, loam, and sand'
    },
    classes: [
      'druid',
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Nondetection',
    source: 'srd',
    level: 3,
    school: 'abjuration',
    ritual: false,
    castingTime: '1 action',
    range: 'touch',
    concentration: false,
    duration: '8 hours',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a pinch of diamond dust worth 25 gp sprinkled over the target, which the spell consumes'
    },
    classes: [
      'bard',
      'ranger',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Pass without Trace',
    source: 'srd',
    level: 2,
    school: 'abjuration',
    ritual: false,
    castingTime: '1 action',
    range: 'self',
    concentration: true,
    duration: 'up to 1 hour',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'ashes from a burned leaf of mistletoe and a sprig of spruce'
    },
    classes: [
      'druid',
      'ranger',
    ],
    description: ''
  },
  {
    name: 'Passwall',
    source: 'srd',
    level: 5,
    school: 'transmutation',
    ritual: false,
    castingTime: '1 action',
    range: '30 feet',
    concentration: false,
    duration: '1 hour',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a pinch of sesame seeds'
    },
    classes: [
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Phantasmal Killer',
    source: 'srd',
    level: 4,
    school: 'illusion',
    ritual: false,
    castingTime: '1 action',
    range: '120 feet',
    concentration: true,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Phantom Steed',
    source: 'srd',
    level: 3,
    school: 'illusion',
    ritual: true,
    castingTime: '1 minute',
    range: '30 feet',
    concentration: false,
    duration: '1 hour',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Planar Ally',
    source: 'srd',
    level: 6,
    school: 'conjuration',
    ritual: false,
    castingTime: '10 minutes',
    range: '60 feet',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'cleric'
    ],
    description: ''
  },
  {
    name: 'Planar Binding',
    source: 'srd',
    level: 5,
    school: 'abjuration',
    ritual: false,
    castingTime: '1 hour',
    range: '60 feet',
    concentration: false,
    duration: '24 hours',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a jewel worth at least 1,000 gp, which the spell consumes'
    },
    classes: [
      'bard',
      'cleric',
      'druid',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Plane Shift',
    source: 'srd',
    level: 7,
    school: 'conjuration',
    ritual: false,
    castingTime: '1 action',
    range: 'touch',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a forked, metal rod worth at least 250 gp, attuned to a particular plane of existence'
    },
    classes: [
      'cleric',
      'druid',
      'sorcerer',
      'warlock',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Plant Growth',
    source: 'srd',
    level: 3,
    school: 'transmutation',
    ritual: false,
    castingTime: '1 action or 8 hours',
    range: '150 feet',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'bard',
      'druid',
      'ranger'
    ],
    description: ''
  },
  {
    name: 'Poison Spray',
    source: 'srd',
    level: 0,
    school: 'conjuration',
    ritual: false,
    castingTime: '1 action',
    range: '10 feet',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'druid',
      'sorcerer',
      'warlock',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Polymorph',
    source: 'srd',
    level: 4,
    school: 'transmutation',
    ritual: false,
    castingTime: '1 action',
    range: '60 feet',
    concentration: true,
    duration: 'up to 1 hour',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a caterpillar cocoon'
    },
    classes: [
      'bard',
      'druid',
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Power Word Kill',
    source: 'srd',
    level: 9,
    school: 'enchantment',
    ritual: false,
    castingTime: '1 action',
    range: '60 feet',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: false,
      material: false,
      items: ''
    },
    classes: [
      'bard'
    ],
    description: ''
  },
  {
    name: 'Power Word Stun',
    source: 'srd',
    level: 8,
    school: 'enchantment',
    ritual: false,
    castingTime: '1 action',
    range: '60 feet',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: false,
      material: false,
      items: ''
    },
    classes: [
      'bard',
      'sorcerer',
      'warlock',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Prayer of Healing',
    source: 'srd',
    level: 2,
    school: 'evocation',
    ritual: false,
    castingTime: '10 minutes',
    range: '30 feet',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: false,
      material: false,
      items: ''
    },
    classes: [
      'cleric'
    ],
    description: ''
  },
  {
    name: 'Prestidigitation',
    source: 'srd',
    level: 0,
    school: 'transmutation',
    ritual: false,
    castingTime: '1 action',
    range: '10 feet',
    concentration: false,
    duration: 'up to 1 hour',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'bard',
      'sorcerer',
      'warlock',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Prismatic Spray',
    source: 'srd',
    level: 7,
    school: 'evocation',
    ritual: false,
    castingTime: '1 action',
    range: 'self (60-foot cone)',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Prismatic Wall',
    source: 'srd',
    level: 9,
    school: 'abjuration',
    ritual: false,
    castingTime: '1 action',
    range: '60 feet',
    concentration: false,
    duration: '10 minutes',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Private Sanctum',
    source: 'srd',
    level: 4,
    school: 'abjuration',
    ritual: false,
    castingTime: '10 minutes',
    range: '120 feet',
    concentration: false,
    duration: '24 hours',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a thin sheet of lead, a piece of opaque glass, a wad of cotton or cloth, and powdered chrysolite'
    },
    classes: [
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Produce Flame',
    source: 'srd',
    level: 0,
    school: 'conjuration',
    ritual: false,
    castingTime: '1 action',
    range: 'self',
    concentration: false,
    duration: '10 minutes',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'druid'
    ],
    description: ''
  },
  {
    name: 'Programmed Illusion',
    source: 'srd',
    level: 6,
    school: 'illusion',
    ritual: false,
    castingTime: '1 action',
    range: '120 feet',
    concentration: false,
    duration: 'until dispelled',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a bit of fleece and jade dust worth at least 25 gp'
    },
    classes: [
      'bard',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Project Image',
    source: 'srd',
    level: 7,
    school: 'illusion',
    ritual: false,
    castingTime: '1 action',
    range: '500 miles',
    concentration: true,
    duration: 'up to 1 day',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a small replica of you made from materials worth at least 5 gp'
    },
    classes: [
      'bard',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Protection from Energy',
    source: 'srd',
    level: 3,
    school: 'abjuration',
    ritual: false,
    castingTime: '1 action',
    range: 'touch',
    concentration: true,
    duration: 'up to 1 hour',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'cleric',
      'druid',
      'ranger',
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Protection from Evil and Good',
    source: 'srd',
    level: 1,
    school: 'abjuration',
    ritual: false,
    castingTime: '1 action',
    range: 'touch',
    concentration: true,
    duration: 'up to 10 minutes',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'holy water or powdered silver and iron, which the spell consumes'
    },
    classes: [
      'cleric',
      'paladin',
      'warlock',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Protection from Poison',
    source: 'srd',
    level: 2,
    school: 'abjuration',
    ritual: false,
    castingTime: '1 action',
    range: 'touch',
    concentration: false,
    duration: '1 hour',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'cleric',
      'druid',
      'paladin',
      'ranger'
    ],
    description: ''
  },
  {
    name: 'Purify Food and Drink',
    source: 'srd',
    level: 1,
    school: 'transmutation',
    ritual: true,
    castingTime: '1 action',
    range: '10 feet',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'cleric',
      'druid',
      'paladin'
    ],
    description: ''
  },
  {
    name: 'Raise Dead',
    source: 'srd',
    level: 5,
    school: 'necromancy',
    ritual: false,
    castingTime: '1 hour',
    range: 'touch',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a diamond worth at least 500 gp, which the spell consumes'
    },
    classes: [
      'bard',
      'cleric',
      'paladin'
    ],
    description: ''
  },
  {
    name: 'Ray of Enfeeblement',
    source: 'srd',
    level: 2,
    school: 'necromancy',
    ritual: false,
    castingTime: '1 action',
    range: '60 feet',
    concentration: false,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'warlock',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Ray of Frost',
    source: 'srd',
    level: 0,
    school: 'evocation',
    ritual: false,
    castingTime: '1 action',
    range: '60 feet',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Regenerate',
    source: 'srd',
    level: 7,
    school: 'transmutation',
    ritual: false,
    castingTime: '1 minute',
    range: 'touch',
    concentration: false,
    duration: '1 hour',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a prayer wheel and holy water'
    },
    classes: [
      'bard',
      'cleric',
      'druid'
    ],
    description: ''
  },
  {
    name: 'Reincarnate',
    source: 'srd',
    level: 5,
    school: 'transmutation',
    ritual: false,
    castingTime: '1 hour',
    range: 'touch',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'rare oils and unguents worth at least 1,000 gp, which the spell consumes'
    },
    classes: [
      'druid'
    ],
    description: ''
  },
  {
    name: 'Remove Curse',
    source: 'srd',
    level: 3,
    school: 'abjuration',
    ritual: false,
    castingTime: '1 action',
    range: 'touch',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'cleric',
      'paladin',
      'warlock',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Resilient Sphere',
    source: 'srd',
    level: 4,
    school: 'evocation',
    ritual: false,
    castingTime: '1 action',
    range: '30 feet',
    concentration: true,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a hemispherical piece of clear crystal and a matching hemispherical piece of gum arabic'
    },
    classes: [
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Resistance',
    source: 'srd',
    level: 0,
    school: 'abjuration',
    ritual: false,
    castingTime: '1 action',
    range: 'touch',
    concentration: true,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a miniature cloak'
    },
    classes: [
      'cleric',
      'druid'
    ],
    description: ''
  },
  {
    name: 'Resurrection',
    source: 'srd',
    level: 7,
    school: 'necromancy',
    ritual: false,
    castingTime: '1 hour',
    range: 'touch',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a diamond worth at least 1,000 gp, which the spell consumes'
    },
    classes: [
      'bard',
      'cleric'
    ],
    description: ''
  },
  {
    name: 'Reverse Gravity',
    source: 'srd',
    level: 7,
    school: 'transmutation',
    ritual: false,
    castingTime: '1 action',
    range: '100 feet',
    concentration: true,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a lodestone and iron filings'
    },
    classes: [
      'druid',
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Revivify',
    source: 'srd',
    level: 3,
    school: 'necromancy',
    ritual: false,
    castingTime: '1 action',
    range: 'touch',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'diamonds worth 300 gp, which the spell consumes'
    },
    classes: [
      'cleric',
      'paladin',
    ],
    description: ''
  },
  {
    name: 'Rope Trick',
    source: 'srd',
    level: 2,
    school: 'transmutation',
    ritual: false,
    castingTime: '1 action',
    range: 'touch',
    concentration: false,
    duration: '1 hour',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'powdered corn extract and a twisted loop of parchment'
    },
    classes: [
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Sacred Flame',
    source: 'srd',
    level: 0,
    school: 'evocation',
    ritual: false,
    castingTime: '1 action',
    range: '60 feet',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'cleric'
    ],
    description: ''
  },
  {
    name: 'Sancutary',
    source: 'srd',
    level: 1,
    school: 'abjuration',
    ritual: false,
    castingTime: '1 bonus action',
    range: '30 feet',
    concentration: false,
    duration: '1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a small silver mirror'
    },
    classes: [
      'cleric'
    ],
    description: ''
  },
  {
    name: 'Scorching Ray',
    source: 'srd',
    level: 2,
    school: 'evocation',
    ritual: false,
    castingTime: '1 action',
    range: '120 feet',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Scrying',
    source: 'srd',
    level: 5,
    school: 'divination',
    ritual: false,
    castingTime: '10 minutes',
    range: 'self',
    concentration: true,
    duration: 'up to 10 minutes',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a focus worth at least 1,000 gp, such as a crystal ball, a silver mirror, or a font filled with holy water'
    },
    classes: [
      'bard',
      'cleric',
      'druid',
      'warlock',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Secret Chest',
    source: 'srd',
    level: 4,
    school: 'conjuration',
    ritual: false,
    castingTime: '1 action',
    range: 'touch',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'an exquisite chest, 3 feet by 2 feet, constructed from rare materials worth at least 5,000 gp, and a Tiny replica made from the same materials worth at least 50 gp'
    },
    classes: [
      'wizard'
    ],
    description: ''
  },
  {
    name: 'See Invisibility',
    source: 'srd',
    level: 2,
    school: 'divination',
    ritual: false,
    castingTime: '1 action',
    range: 'self',
    concentration: false,
    duration: '1 hour',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a pinch of talc and a small sprinkling of powdered silver'
    },
    classes: [
      'bard',
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Seeming',
    source: 'srd',
    level: 5,
    school: 'illusion',
    ritual: false,
    castingTime: '1 action',
    range: '30 feet',
    concentration: false,
    duration: '8 hours',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'bard',
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Sending',
    source: 'srd',
    level: 3,
    school: 'evocation',
    ritual: false,
    castingTime: '1 action',
    range: 'unlimited',
    concentration: false,
    duration: '1 round',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a short piece of fine copper wire'
    },
    classes: [
      'bard',
      'cleric',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Sequester',
    source: 'srd',
    level: 7,
    school: 'transmutation',
    ritual: false,
    castingTime: '1 action',
    range: 'touch',
    concentration: false,
    duration: 'until dispelled',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a powder composed of diamond, emerald, ruby, and sapphire dust worth at least 5,000 gp, which the spell consumes'
    },
    classes: [
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Shapechange',
    source: 'srd',
    level: 9,
    school: 'transmutation',
    ritual: false,
    castingTime: '1 action',
    range: 'self',
    concentration: true,
    duration: 'up to 1 hour',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a jade circlet worth at least 1,500 gp, which you must place on your head before you cast the spell'
    },
    classes: [
      'druid',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Shatter',
    source: 'srd',
    level: 2,
    school: 'evocation',
    ritual: false,
    castingTime: '1 action',
    range: '60 feet',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a chip of mica'
    },
    classes: [
      'bard',
      'sorcerer',
      'warlock',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Shield',
    source: 'srd',
    level: 1,
    school: 'abjuration',
    ritual: false,
    castingTime: '1 reaction, which you take when you are hit by an attack or targeted by the magic missile spell',
    range: 'self',
    concentration: false,
    duration: '1 round',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Shield of Faith',
    source: 'srd',
    level: 1,
    school: 'abjuration',
    ritual: false,
    castingTime: '1 bonus action',
    range: '60 feet',
    concentration: true,
    duration: 'up to 10 minutes',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a small parchment with a bit of holy text written on it'
    },
    classes: [
      'cleric',
      'paladin'
    ],
    description: ''
  },
  {
    name: 'Shillelagh',
    source: 'srd',
    level: 0,
    school: 'transmutation',
    ritual: false,
    castingTime: '1 bonus action',
    range: 'touch',
    concentration: false,
    duration: '1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'mistletoe, a shamrock leaf, and a club or quarterstaff'
    },
    classes: [
      'druid'
    ],
    description: ''
  },
  {
    name: 'Shocking Grasp',
    source: 'srd',
    level: 0,
    school: 'evocation',
    ritual: false,
    castingTime: '1 action',
    range: 'touch',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Silence',
    source: 'srd',
    level: 2,
    school: 'illusion',
    ritual: true,
    castingTime: '1 action',
    range: '120 feet',
    concentration: true,
    duration: 'up to 10 minutes',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'bard',
      'cleric',
      'ranger'
    ],
    description: ''
  },
  {
    name: 'Silent Image',
    source: 'srd',
    level: 1,
    school: 'illusion',
    ritual: false,
    castingTime: '1 action',
    range: '60 feet',
    concentration: true,
    duration: 'up to 10 minutes',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a bit of fleece'
    },
    classes: [
      'bard',
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Simulacrum',
    source: 'srd',
    level: 7,
    school: 'illusion',
    ritual: false,
    castingTime: '12 hours',
    range: 'touch',
    concentration: false,
    duration: 'until dispelled',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'snow or ice in quantities sufficient to make a life-size copy of the duplicated creature; some hair, fingernail clippings, or other piece of that creature\'s body placed inside the snow or ice; and powdered ruby worth 1,500 gp, sprinkled over the duplicate and consumed by the spell'
    },
    classes: [
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Sleep',
    source: 'srd',
    level: 1,
    school: 'enchantment',
    ritual: false,
    castingTime: '1 action',
    range: '90 feet',
    concentration: false,
    duration: '1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a pinch of fine sand, rose petals, or a cricket'
    },
    classes: [
      'bard',
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Sleet Storm',
    source: 'srd',
    level: 3,
    school: 'conjuration',
    ritual: false,
    castingTime: '1 action',
    range: '150 feet',
    concentration: true,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a pinch of dust and a few drops of water'
    },
    classes: [
      'druid',
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Slow',
    source: 'srd',
    level: 3,
    school: 'transmutation',
    ritual: false,
    castingTime: '1 action',
    range: '120 feet',
    concentration: true,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a drop of molasses'
    },
    classes: [
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Spare the Dying',
    source: 'srd',
    level: 0,
    school: 'necromancy',
    ritual: false,
    castingTime: '1 action',
    range: 'touch',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'cleric'
    ],
    description: ''
  },
  {
    name: 'Speak with Animals',
    source: 'srd',
    level: 1,
    school: 'divination',
    ritual: true,
    castingTime: '1 action',
    range: 'self',
    concentration: false,
    duration: '10 minutes',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'bard',
      'druid',
      'ranger'
    ],
    description: ''
  },
  {
    name: 'Speak with Dead',
    source: 'srd',
    level: 3,
    school: 'necromancy',
    ritual: false,
    castingTime: '1 action',
    range: '10 feet',
    concentration: false,
    duration: '10 minutes',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'burning incense'
    },
    classes: [
      'bard',
      'cleric'
    ],
    description: ''
  },
  {
    name: 'Speak with Plants',
    source: 'srd',
    level: 3,
    school: 'transmutation',
    ritual: false,
    castingTime: '1 action',
    range: 'self (30-foot radius)',
    concentration: false,
    duration: '10 minutes',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'bard',
      'druid',
      'ranger'
    ],
    description: ''
  },
  {
    name: 'Spider Climb',
    source: 'srd',
    level: 2,
    school: 'transmutation',
    ritual: false,
    castingTime: '1 action',
    range: 'touch',
    concentration: true,
    duration: 'up to 1 hour',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a drop of bitumen and a spider'
    },
    classes: [
      'sorcerer',
      'warlock',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Spike Growth',
    source: 'srd',
    level: 2,
    school: 'transmutation',
    ritual: false,
    castingTime: '1 action',
    range: '150 feet',
    concentration: true,
    duration: 'up to 10 minutes',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'seven sharp thorns or seven small twigs, each sharpened to a point'
    },
    classes: [
      'druid',
      'ranger'
    ],
    description: ''
  },
  {
    name: 'Spirit Guardians',
    source: 'srd',
    level: 3,
    school: 'conjuration',
    ritual: false,
    castingTime: '1 action',
    range: 'self (15-foot radius)',
    concentration: true,
    duration: 'up to 10 minutes',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a holy symbol'
    },
    classes: [
      'cleric'
    ],
    description: ''
  },
  {
    name: 'Spiritual Weapon',
    source: 'srd',
    level: 2,
    school: 'evocation',
    ritual: false,
    castingTime: '1 bonus action',
    range: '60 feet',
    concentration: false,
    duration: '1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'cleric'
    ],
    description: ''
  },
  {
    name: 'Stinking Cloud',
    source: 'srd',
    level: 3,
    school: 'conjuration',
    ritual: false,
    castingTime: '1 action',
    range: '90 feet',
    concentration: true,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a rotten egg or several skunk cabbage leaves'
    },
    classes: [
      'bard',
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Stone Shape',
    source: 'srd',
    level: 4,
    school: 'transmutation',
    ritual: false,
    castingTime: '1 action',
    range: 'touch',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'soft clay, which must be worked into roughly the desired shape of the stone object'
    },
    classes: [
      'cleric',
      'druid',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Stoneskin',
    source: 'srd',
    level: 4,
    school: 'abjuration',
    ritual: false,
    castingTime: '1 action',
    range: 'touch',
    concentration: false,
    duration: 'up to 1 hour',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'diamond dust worth 100 gp, which the spell consumes'
    },
    classes: [
      'druid',
      'ranger',
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Storm of Vengeance',
    source: 'srd',
    level: 9,
    school: 'conjuration',
    ritual: false,
    castingTime: '1 action',
    range: 'sight',
    concentration: true,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'druid'
    ],
    description: ''
  },
  {
    name: 'Suggestion',
    source: 'srd',
    level: 2,
    school: 'enchantment',
    ritual: false,
    castingTime: '1 action',
    range: '30 feet',
    concentration: true,
    duration: 'up to 8 hours',
    components: {
      verbal: true,
      somatic: false,
      material: true,
      items: 'a snake\'s tongue and either a bit of honeycomb or a drop of sweet oil'
    },
    classes: [
      'bard',
      'sorcerer',
      'warlock',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Sunbeam',
    source: 'srd',
    level: 6,
    school: 'evocation',
    ritual: false,
    castingTime: '1 action',
    range: 'self (60-foot line)',
    concentration: true,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a magnifying glass'
    },
    classes: [
      'druid',
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Sunburst',
    source: 'srd',
    level: 8,
    school: 'evocation',
    ritual: false,
    castingTime: '1 action',
    range: '150 feet',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'fire and a piece of sunstone'
    },
    classes: [
      'druid',
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Symbol',
    source: 'srd',
    level: 7,
    school: 'abjuration',
    ritual: false,
    castingTime: '1 minute',
    range: 'touch',
    concentration: false,
    duration: 'until dispelled or triggered',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'mercury, phosphorus, and powdered diamond and opal with a total value of at least 1,000 gp, which the spell consumes'
    },
    classes: [
      'bard',
      'cleric',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Telekinesis',
    source: 'srd',
    level: 5,
    school: 'transmutation',
    ritual: false,
    castingTime: '1 action',
    range: '60 feet',
    concentration: true,
    duration: 'up to 10 minutes',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Telepathic Bond',
    source: 'srd',
    level: 5,
    school: 'divination',
    ritual: true,
    castingTime: '1 action',
    range: '30 feet',
    concentration: false,
    duration: '1 hour',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'pieces of eggshell from two different kinds of creatures'
    },
    classes: [
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Teleport',
    source: 'srd',
    level: 7,
    school: 'conjuration',
    ritual: false,
    castingTime: '1 action',
    range: '10 feet',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: false,
      material: false,
      items: ''
    },
    classes: [
      'bard',
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Teleportation Circle',
    source: 'srd',
    level: 5,
    school: 'conjuration',
    ritual: false,
    castingTime: '1 minute',
    range: '10 feet',
    concentration: false,
    duration: '1 round',
    components: {
      verbal: true,
      somatic: false,
      material: true,
      items: 'rare chalks and inks infused with precious gems worth 50 gp, which the spell consumes'
    },
    classes: [
      'bard',
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Thaumaturgy',
    source: 'srd',
    level: 0,
    school: 'transmutation',
    ritual: false,
    castingTime: '1 action',
    range: '30 feet',
    concentration: false,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: false,
      material: false,
      items: ''
    },
    classes: [
      'cleric'
    ],
    description: ''
  },
  {
    name: 'Thunderwave',
    source: 'srd',
    level: 1,
    school: 'evocation',
    ritual: false,
    castingTime: '1 action',
    range: 'self (15-foot cube)',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'bard',
      'druid',
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Time Stop',
    source: 'srd',
    level: 9,
    school: 'transmutation',
    ritual: false,
    castingTime: '1 action',
    range: 'self',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: false,
      material: false,
      items: ''
    },
    classes: [
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Tiny Hut',
    source: 'srd',
    level: 3,
    school: 'evocation',
    ritual: true,
    castingTime: '1 minute',
    range: 'self (10-foot-radius hemisphere)',
    concentration: false,
    duration: '8 hours',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a small crystal bead'
    },
    classes: [
      'bard',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Tongues',
    source: 'srd',
    level: 3,
    school: 'divination',
    ritual: false,
    castingTime: '1 action',
    range: 'touch',
    concentration: false,
    duration: '1 hour',
    components: {
      verbal: true,
      somatic: false,
      material: true,
      items: 'a small clay model of a ziggurat'
    },
    classes: [
      'bard',
      'cleric',
      'sorcerer',
      'warlock',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Transport via Plants',
    source: 'srd',
    level: 6,
    school: 'conjuration',
    ritual: false,
    castingTime: '1 action',
    range: '10 feet',
    concentration: false,
    duration: '1 round',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'druid'
    ],
    description: ''
  },
  {
    name: 'Tree Stride',
    source: 'srd',
    level: 5,
    school: 'conjuration',
    ritual: false,
    castingTime: '1 action',
    range: 'self',
    concentration: true,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'druid',
      'ranger'
    ],
    description: ''
  },
  {
    name: 'True Polymorph',
    source: 'srd',
    level: 9,
    school: 'transmutation',
    ritual: false,
    castingTime: '1 action',
    range: '30 feet',
    concentration: true,
    duration: 'up to 1 hour',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a drop of mercury, a dollop of gum arabic, and a wisp of smoke'
    },
    classes: [
      'bard',
      'warlock',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'True Resurrection',
    source: 'srd',
    level: 9,
    school: 'necromancy',
    ritual: false,
    castingTime: '1 hour',
    range: 'touch',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a sprinkle of holy water and diamonds worth at least 25,000 gp, which the spell consumes'
    },
    classes: [
      'cleric',
      'druid'
    ],
    description: ''
  },
  {
    name: 'True Seeing',
    source: 'srd',
    level: 6,
    school: 'divination',
    ritual: false,
    castingTime: '1 action',
    range: 'touch',
    concentration: false,
    duration: '1 hour',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'an ointment for the eyes that costs 25 gp; is made from mushroom powder, saffron, and fat; and is consumed by the spell'
    },
    classes: [
      'bard',
      'cleric',
      'sorcerer',
      'warlock',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'True Strike',
    source: 'srd',
    level: 0,
    school: 'divination',
    ritual: false,
    castingTime: '1 action',
    range: '30 feet',
    concentration: true,
    duration: 'up to 1 round',
    components: {
      verbal: false,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'bard',
      'sorcerer',
      'warlock',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Unseen Servant',
    source: 'srd',
    level: 1,
    school: 'conjuration',
    ritual: true,
    castingTime: '1 action',
    range: '60 feet',
    concentration: false,
    duration: '1 hour',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a piece of string and a bit of wood'
    },
    classes: [
      'bard',
      'warlock',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Vampiric Touch',
    source: 'srd',
    level: 3,
    school: 'necromancy',
    ritual: false,
    castingTime: '1 action',
    range: 'self',
    concentration: true,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'warlock',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Vicious Mockery',
    source: 'srd',
    level: 0,
    school: 'enchantment',
    ritual: false,
    castingTime: '1 action',
    range: '60 feet',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: false,
      material: false,
      items: ''
    },
    classes: [
      'bard'
    ],
    description: ''
  },
  {
    name: 'Wall of Fire',
    source: 'srd',
    level: 4,
    school: 'evocation',
    ritual: false,
    castingTime: '1 action',
    range: '120 feet',
    concentration: true,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a small piece of phosphorus'
    },
    classes: [
      'druid',
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Wall of Force',
    source: 'srd',
    level: 5,
    school: 'evocation',
    ritual: false,
    castingTime: '1 action',
    range: '120 feet',
    concentration: true,
    duration: 'up to 10 minutes',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a pinch of powder made by crushing a clear gemstone'
    },
    classes: [
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Wall of Ice',
    source: 'srd',
    level: 6,
    school: 'evocation',
    ritual: false,
    castingTime: '1 action',
    range: '120 feet',
    concentration: true,
    duration: 'up to 10 minutes',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a small piece of quartz'
    },
    classes: [
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Wall of Stone',
    source: 'srd',
    level: 5,
    school: 'evocation',
    ritual: false,
    castingTime: '1 action',
    range: '120 feet',
    concentration: true,
    duration: 'up to 10 minutes',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a small block of granite'
    },
    classes: [
      'druid',
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Wall of Thorns',
    source: 'srd',
    level: 6,
    school: 'conjuration',
    ritual: false,
    castingTime: '1 action',
    range: '120 feet',
    concentration: true,
    duration: 'up to 10 minutes',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a handful of thorns'
    },
    classes: [
      'druid'
    ],
    description: ''
  },
  {
    name: 'Warding Bond',
    source: 'srd',
    level: 2,
    school: 'abjuration',
    ritual: false,
    castingTime: '1 action',
    range: 'touch',
    concentration: false,
    duration: '1 hour',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a pair of platinum rings worth at least 50 gp each, which you and the target must wear for the duration'
    },
    classes: [
      'cleric'
    ],
    description: ''
  },
  {
    name: 'Water Breathing',
    source: 'srd',
    level: 3,
    school: 'transmutation',
    ritual: true,
    castingTime: '1 action',
    range: '30 feet',
    concentration: false,
    duration: '24 hours',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a short reed or piece of straw'
    },
    classes: [
      'druid',
      'ranger',
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Water Walk',
    source: 'srd',
    level: 3,
    school: 'transmutation',
    ritual: true,
    castingTime: '1 action',
    range: '30 feet',
    concentration: false,
    duration: '1 hour',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a piece of cork'
    },
    classes: [
      'cleric',
      'druid',
      'ranger',
      'sorcerer'
    ],
    description: ''
  },
  {
    name: 'Web',
    source: 'srd',
    level: 2,
    school: 'conjuration',
    ritual: false,
    castingTime: '1 action',
    range: '60 feet',
    concentration: true,
    duration: 'up to 1 hour',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a bit of spiderweb'
    },
    classes: [
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Weird',
    source: 'srd',
    level: 9,
    school: 'illusion',
    ritual: false,
    castingTime: '1 action',
    range: '120 feet',
    concentration: true,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Wind Walk',
    source: 'srd',
    level: 6,
    school: 'transmutation',
    ritual: false,
    castingTime: '1 minute',
    range: '30 feet',
    concentration: false,
    duration: '8 hours',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'fire and holy water'
    },
    classes: [
      'druid'
    ],
    description: ''
  },
  {
    name: 'Wind Wall',
    source: 'srd',
    level: 3,
    school: 'evocation',
    ritual: false,
    castingTime: '1 action',
    range: '120 feet',
    concentration: true,
    duration: 'up to 1 minute',
    components: {
      verbal: true,
      somatic: true,
      material: true,
      items: 'a tiny fan and a feather of exotic origin'
    },
    classes: [
      'druid',
      'ranger'
    ],
    description: ''
  },
  {
    name: 'Wish',
    source: 'srd',
    level: 9,
    school: 'conjuration',
    ritual: false,
    castingTime: '1 action',
    range: 'self',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: false,
      material: false,
      items: ''
    },
    classes: [
      'sorcerer',
      'wizard'
    ],
    description: ''
  },
  {
    name: 'Word of Recall',
    source: 'srd',
    level: 6,
    school: 'conjuration',
    ritual: false,
    castingTime: '1 action',
    range: '5 feet',
    concentration: false,
    duration: 'instantaneous',
    components: {
      verbal: true,
      somatic: false,
      material: false,
      items: ''
    },
    classes: [
      'cleric'
    ],
    description: ''
  },
  {
    name: 'Zone of Truth',
    source: 'srd',
    level: 2,
    school: 'enchantment',
    ritual: false,
    castingTime: '1 action',
    range: '60 feet',
    concentration: false,
    duration: '10 minutes',
    components: {
      verbal: true,
      somatic: true,
      material: false,
      items: ''
    },
    classes: [
      'bard',
      'cleric',
      'paladin'
    ],
    description: ''
  }
];