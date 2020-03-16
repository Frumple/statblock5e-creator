const creatureListStub = {
  'wotc-srd': [
    {slug: 'aboleth', name: 'Aboleth'},
    {slug: 'acolyte', name: 'Acolyte'},
    {slug: 'adult-black-dragon', name: 'Adult Black Dragon'}
  ],
  'tob': [
    {slug: 'aboleth-nihilith', name: 'Aboleth, Nihilith'},
    {slug: 'abominable-beauty', name: 'Abominable Beauty'},
    {slug: 'accursed-defiler', name: 'Accursed Defiler'}
  ],
  'cc': [
    {slug: 'aatxe', name: 'Aatxe'},
    {slug: 'acid-ant', name: 'Acid Ant'},
    {slug: 'adult-light-dragon', name: 'Adult Light Dragon'}
  ]
};

const creatureStub = {
  'adult-black-dragon': {
    'slug': 'adult-black-dragon',
    'name': 'Adult Black Dragon',
    'size': 'Huge',
    'type': 'dragon',
    'subtype': '',
    'group': 'Black Dragon',
    'alignment': 'chaotic evil',
    'armor_class': 19,
    'armor_desc': 'natural armor',
    'hit_points': 195,
    'hit_dice': '17d12+85',
    'speed': {
      'walk': 40,
      'fly': 80,
      'swim': 40
    },
    'strength': 23,
    'dexterity': 14,
    'constitution': 21,
    'intelligence': 14,
    'wisdom': 13,
    'charisma': 17,
    'strength_save': null,
    'dexterity_save': 7,
    'constitution_save': 10,
    'intelligence_save': null,
    'wisdom_save': 6,
    'charisma_save': 8,
    'perception': 11,
    'skills': {
      'perception': 11,
      'stealth': 7
    },
    'damage_vulnerabilities': '',
    'damage_resistances': '',
    'damage_immunities': 'acid',
    'condition_immunities': '',
    'senses': 'blindsight 60 ft., darkvision 120 ft., passive Perception 21',
    'languages': 'Common, Draconic',
    'challenge_rating': '14',
    'actions': [
      {
        'name': 'Multiattack',
        'desc': 'The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.'
      },
      {
        'name': 'Bite',
        'desc': 'Melee Weapon Attack: +11 to hit, reach 10 ft., one target. Hit: 17 (2d10 + 6) piercing damage plus 4 (1d8) acid damage.',
        'attack_bonus': 11,
        'damage_dice': '2d10+1d8',
        'damage_bonus': 6
      },
      {
        'name': 'Claw',
        'desc': 'Melee Weapon Attack: +11 to hit, reach 5 ft., one target. Hit: 13 (2d6 + 6) slashing damage.',
        'attack_bonus': 11,
        'damage_dice': '2d6',
        'damage_bonus': 6
      },
      {
        'name': 'Tail',
        'desc': 'Melee Weapon Attack: +11 to hit, reach 15 ft., one target. Hit: 15 (2d8 + 6) bludgeoning damage.',
        'attack_bonus': 11,
        'damage_dice': '2d8',
        'damage_bonus': 6
      },
      {
        'name': 'Frightful Presence',
        'desc': 'Each creature of the dragon\'s choice that is within 120 feet of the dragon and aware of it must succeed on a DC 16 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature\'s saving throw is successful or the effect ends for it, the creature is immune to the dragon\'s Frightful Presence for the next 24 hours.'
      },
      {
        'name': 'Acid Breath (Recharge 5-6)',
        'desc': 'The dragon exhales acid in a 60-foot line that is 5 feet wide. Each creature in that line must make a DC 18 Dexterity saving throw, taking 54 (12d8) acid damage on a failed save, or half as much damage on a successful one.',
        'attack_bonus': 0,
        'damage_dice': '12d8'
      }
    ],
    'reactions': '',
    'legendary_desc': 'The dragon can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature\'s turn. The dragon regains spent legendary actions at the start of its turn.',
    'legendary_actions': [
      {
        'name': 'Detect',
        'desc': 'The dragon makes a Wisdom (Perception) check.'
      },
      {
        'name': 'Tail Attack',
        'desc': 'The dragon makes a tail attack.'
      },
      {
        'name': 'Wing Attack (Costs 2 Actions)',
        'desc': 'The dragon beats its wings. Each creature within 10 ft. of the dragon must succeed on a DC 19 Dexterity saving throw or take 13 (2d6 + 6) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.'
      }
    ],
    'special_abilities': [
      {
        'name': 'Amphibious',
        'desc': 'The dragon can breathe air and water.'
      },
      {
        'name': 'Legendary Resistance (3/Day)',
        'desc': 'If the dragon fails a saving throw, it can choose to succeed instead.'
      }
    ],
    'spell_list': [],
    'img_main': null,
    'document__slug': 'wotc-srd',
    'document__title': 'Systems Reference Document',
    'document__license_url': 'http://open5e.com/legal'
  },
  'accursed-defiler': {
    'slug': 'accursed-defiler',
    'name': 'Accursed Defiler',
    'size': 'Medium',
    'type': 'undead',
    'subtype': '',
    'group': null,
    'alignment': 'neutral evil',
    'armor_class': 12,
    'armor_desc': '',
    'hit_points': 75,
    'hit_dice': '10d8+30',
    'speed': {
      'walk': 30
    },
    'strength': 19,
    'dexterity': 14,
    'constitution': 17,
    'intelligence': 6,
    'wisdom': 15,
    'charisma': 14,
    'strength_save': null,
    'dexterity_save': null,
    'constitution_save': null,
    'intelligence_save': null,
    'wisdom_save': null,
    'charisma_save': null,
    'perception': 4,
    'skills': {
      'perception': 4,
      'stealth': 4
    },
    'damage_vulnerabilities': '',
    'damage_resistances': 'necrotic; bludgeoning, piercing, and slashing from nonmagical weapons',
    'damage_immunities': 'poison',
    'condition_immunities': 'charmed, exhaustion, frightened, poisoned',
    'senses': 'darkvision 60 ft., passive Perception 14',
    'languages': 'understands an ancient language, but can\'t speak',
    'challenge_rating': '4',
    'actions': [
      {
        'name': 'Multiattack',
        'desc': 'The accursed defiler makes two slam attacks.'
      },
      {
        'name': 'Slam',
        'desc': 'Melee Weapon Attack: +6 to hit, reach 5 ft., one creature. Hit: 11 (2d6 + 4) bludgeoning damage. If a creature is hit by this attack twice in the same round (from the same or different accursed defilers), the target must make a DC 13 Constitution saving throw or gain one level of exhaustion.',
        'attack_bonus': 6,
        'damage_dice': '2d6'
      },
      {
        'name': 'Sandslash (Recharge 5-6)',
        'desc': 'As an action, the accursed defiler intensifies the vortex of sand that surrounds it. All creatures within 10 feet of the accursed defiler take 21 (6d6) slashing damage, or half damage with a successful DC 14 Dexterity saving throw.'
      }
    ],
    'reactions': '',
    'legendary_desc': '',
    'legendary_actions': '',
    'special_abilities': [
      {
        'name': 'Cursed Existence',
        'desc': 'When it drops to 0 hit points in desert terrain, the accursed defiler\'s body disintegrates into sand and a sudden parched breeze. However, unless it was killed in a hallowed location, with radiant damage, or by a blessed creature, the accursed defiler reforms at the next sundown 1d100 miles away in a random direction.'
      },
      {
        'name': 'Sand Shroud',
        'desc': 'A miniature sandstorm constantly whirls around the accursed defiler in a 10-foot radius. This area is lightly obscured to creatures other than an accursed defiler. Wisdom (Survival) checks made to follow tracks left by an accursed defiler or other creatures that were traveling in its sand shroud are made with disadvantage.'
      }
    ],
    'spell_list': [],
    'img_main': null,
    'document__slug': 'tob',
    'document__title': 'Tome of Beasts OGL',
    'document__license_url': 'http://open5e.com/legal'
  },
  'adult-light-dragon': {
    'slug': 'adult-light-dragon',
    'name': 'Adult Light Dragon',
    'size': 'Huge',
    'type': 'dragon',
    'subtype': '',
    'group': null,
    'alignment': 'neutral good',
    'armor_class': 17,
    'armor_desc': 'natural armor',
    'hit_points': 212,
    'hit_dice': '17d12+102',
    'speed': {
      'fly': 80,
      'walk': 40
    },
    'strength': 22,
    'dexterity': 10,
    'constitution': 23,
    'intelligence': 16,
    'wisdom': 18,
    'charisma': 17,
    'strength_save': null,
    'dexterity_save': 5,
    'constitution_save': 11,
    'intelligence_save': null,
    'wisdom_save': 9,
    'charisma_save': 8,
    'perception': 9,
    'skills': {
      'arcana': 8,
      'nature': 8,
      'perception': 9,
      'persuasion': 8,
      'religion': 8
    },
    'damage_vulnerabilities': '',
    'damage_resistances': 'fire; bludgeoning, piercing, and slashing from nonmagical attacks',
    'damage_immunities': 'radiant',
    'condition_immunities': 'blinded',
    'senses': 'blindsight 60 ft., darkvision 120 ft., passive Perception 19',
    'languages': 'Celestial, Draconic',
    'challenge_rating': '16',
    'actions': [
      {
        'desc': 'The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.',
        'name': 'Multiattack'
      },
      {
        'attack_bonus': 11,
        'damage_dice': '2d10+6',
        'desc': 'Melee Weapon Attack: +11 to hit, reach 10 ft., one target. Hit: 17 (2d10 + 6) piercing damage.',
        'name': 'Bite'
      },
      {
        'attack_bonus': 11,
        'damage_dice': '2d6+6',
        'desc': 'Melee Weapon Attack: +11 to hit, reach 5 ft., one target. Hit: 13 (2d6 + 6) slashing damage.',
        'name': 'Claw'
      },
      {
        'attack_bonus': 11,
        'damage_dice': '2d8+6',
        'desc': 'Melee Weapon Attack: +11 to hit, reach 15 ft., one target. Hit: 15 (2d8 + 6) bludgeoning damage.',
        'name': 'Tail'
      },
      {
        'desc': 'Each creature of the dragon\'s choice that is within 120 feet of the dragon and aware of it must succeed on a DC 19 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature\'s saving throw is successful or the effect ends for it, the creature is immune to the dragon\'s Frightful Presence for the next 24 hours.',
        'name': 'Frightful Presence'
      },
      {
        'desc': 'The dragon uses one of the following breath weapons:\nRadiant Breath. The dragon exhales radiant energy in a 60-foot cone. Each creature in that area must make a DC 19 Dexterity saving throw, taking 55 (10d10) radiant damage on a failed save, or half as much damage on a successful one.\nFlaring Breath. The dragon emits a flash of dazzling light from its maw in a 60-foot cone. Each creature in that area must make a DC 19 Constitution saving throw or be blinded. Undead within the area of effect must also make a DC 19 Wisdom saving throw or be turned for 1 minute. Undead of CR 2 or lower who fail the saving throw are instantly destroyed.',
        'name': 'Breath Weapon (Recharge 5-6)'
      }
    ],
    'reactions': '',
    'legendary_desc': 'The dragon can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature\'s turn. The dragon regains spent legendary actions at the start of its turn.',
    'legendary_actions': [
      {
        'desc': 'The dragon makes a Wisdom (Perception) check.',
        'name': 'Detect'
      },
      {
        'desc': 'The dragon makes a tail attack.',
        'name': 'Tail Attack'
      },
      {
        'desc': 'The dragon beats its wings. Each creature within 10 feet of the dragon must succeed on a DC 19 Dexterity saving throw or take 13 (2d6 + 6) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.',
        'name': 'Wing Attack (Costs 2 Actions)'
      }
    ],
    'special_abilities': [
      {
        'desc': 'The dragon can see 60 feet into the Ethereal Plane when it is on the Material Plane, and vice versa.',
        'name': 'Ethereal Sight'
      },
      {
        'desc': 'The dragon sheds bright light in a 20-foot radius and dim light for an additional 20 feet.',
        'name': 'Illumination'
      },
      {
        'desc': 'The dragon can move through other creatures and objects as if they were difficult terrain. It takes 5 (1d10) force damage if it ends its turn inside an object.',
        'name': 'Incorporeal Movement'
      },
      {
        'desc': 'If the dragon fails a saving throw, it can choose to succeed instead.',
        'name': 'Legendary Resistance (3/ Day)'
      },
      {
        'desc': 'The light dragon travels from star to star and does not require air, food, drink, or sleep. When flying between stars, the light dragon magically glides on solar winds, making the immense journey through the void in an impossibly short time.',
        'name': 'Void Traveler'
      }
    ],
    'spell_list': [],
    'img_main': null,
    'document__slug': 'cc',
    'document__title': 'Creature Codex OGL',
    'document__license_url': 'http://open5e.com/legal'
  }
};

export const mockLoadCreatureList = jest.fn(documentSlug => {
  return creatureListStub[documentSlug];
});

export const mockLoadCreature = jest.fn(creatureSlug => {
  return creatureStub[creatureSlug];
});

const mock = jest.fn().mockImplementation(() => {
  return {
    loadCreatureList: mockLoadCreatureList,
    loadCreature: mockLoadCreature
  };
});

export default mock;