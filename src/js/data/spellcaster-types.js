export default {
  innate: {
    ability: 'charisma',
    hasCantrips: true
  },
  generic: {
    ability: 'charisma',
    hasCantrips: true
  },
  bard: {
    ability: 'charisma',
    hasCantrips: true,
    spellCountMethod: 'fixed',
    levels: {
      '1': {
        knownCantripCount: 2,
        fixedSpellCount: 4,
        spellSlots: [2]
      },
      '2': {
        knownCantripCount: 2,
        fixedSpellCount: 5,
        spellSlots: [3]
      },
      '3': {
        knownCantripCount: 2,
        fixedSpellCount: 6,
        spellSlots: [4,2]
      },
      '4': {
        knownCantripCount: 3,
        fixedSpellCount: 7,
        spellSlots: [4,3]
      },
      '5': {
        knownCantripCount: 3,
        fixedSpellCount: 8,
        spellSlots: [4,3,2]
      },
      '6': {
        knownCantripCount: 3,
        fixedSpellCount: 9,
        spellSlots: [4,3,3]
      },
      '7': {
        knownCantripCount: 3,
        fixedSpellCount: 10,
        spellSlots: [4,3,3,1]
      },
      '8': {
        knownCantripCount: 3,
        fixedSpellCount: 11,
        spellSlots: [4,3,3,2]
      },
      '9': {
        knownCantripCount: 3,
        fixedSpellCount: 12,
        spellSlots: [4,3,3,3,1]
      },
      '10': {
        knownCantripCount: 4,
        fixedSpellCount: 14,
        spellSlots: [4,3,3,3,2]
      },
      '11': {
        knownCantripCount: 4,
        fixedSpellCount: 15,
        spellSlots: [4,3,3,3,2,1]
      },
      '12': {
        knownCantripCount: 4,
        fixedSpellCount: 15,
        spellSlots: [4,3,3,3,2,1]
      },
      '13': {
        knownCantripCount: 4,
        fixedSpellCount: 16,
        spellSlots: [4,3,3,3,2,1,1]
      },
      '14': {
        knownCantripCount: 4,
        fixedSpellCount: 18,
        spellSlots: [4,3,3,3,2,1,1]
      },
      '15': {
        knownCantripCount: 4,
        fixedSpellCount: 19,
        spellSlots: [4,3,3,3,2,1,1,1]
      },
      '16': {
        knownCantripCount: 4,
        fixedSpellCount: 19,
        spellSlots: [4,3,3,3,2,1,1,1]
      },
      '17': {
        knownCantripCount: 4,
        fixedSpellCount: 20,
        spellSlots: [4,3,3,3,2,1,1,1,1]
      },
      '18': {
        knownCantripCount: 4,
        fixedSpellCount: 22,
        spellSlots: [4,3,3,3,3,1,1,1,1]
      },
      '19': {
        knownCantripCount: 4,
        fixedSpellCount: 22,
        spellSlots: [4,3,3,3,3,2,1,1,1]
      },
      '20': {
        knownCantripCount: 4,
        fixedSpellCount: 22,
        spellSlots: [4,3,3,3,3,2,2,1,1]
      }
    }
  },
  cleric: {
    ability: 'wisdom',
    hasCantrips: true,
    spellCountMethod: 'abilityModPlusLevel',
    levels: {
      '1': {
        knownCantripCount: 3,
        spellSlots: [2]
      },
      '2': {
        knownCantripCount: 3,
        spellSlots: [3]
      },
      '3': {
        knownCantripCount: 3,
        spellSlots: [4,2]
      },
      '4': {
        knownCantripCount: 4,
        spellSlots: [4,3]
      },
      '5': {
        knownCantripCount: 4,
        spellSlots: [4,3,2]
      },
      '6': {
        knownCantripCount: 4,
        spellSlots: [4,3,3]
      },
      '7': {
        knownCantripCount: 4,
        spellSlots: [4,3,3,1]
      },
      '8': {
        knownCantripCount: 4,
        spellSlots: [4,3,3,2]
      },
      '9': {
        knownCantripCount: 4,
        spellSlots: [4,3,3,3,1]
      },
      '10': {
        knownCantripCount: 5,
        spellSlots: [4,3,3,3,2]
      },
      '11': {
        knownCantripCount: 5,
        spellSlots: [4,3,3,3,2,1]
      },
      '12': {
        knownCantripCount: 5,
        spellSlots: [4,3,3,3,2,1]
      },
      '13': {
        knownCantripCount: 5,
        spellSlots: [4,3,3,3,2,1,1]
      },
      '14': {
        knownCantripCount: 5,
        spellSlots: [4,3,3,3,2,1,1]
      },
      '15': {
        knownCantripCount: 5,
        spellSlots: [4,3,3,3,2,1,1,1]
      },
      '16': {
        knownCantripCount: 5,
        spellSlots: [4,3,3,3,2,1,1,1]
      },
      '17': {
        knownCantripCount: 5,
        spellSlots: [4,3,3,3,2,1,1,1,1]
      },
      '18': {
        knownCantripCount: 5,
        spellSlots: [4,3,3,3,3,1,1,1,1]
      },
      '19': {
        knownCantripCount: 5,
        spellSlots: [4,3,3,3,3,2,1,1,1]
      },
      '20': {
        knownCantripCount: 5,
        spellSlots: [4,3,3,3,3,2,2,1,1]
      }
    }
  },
  druid: {
    ability: 'wisdom',
    hasCantrips: true,
    spellCountMethod: 'abilityModPlusLevel',
    levels: {
      '1': {
        knownCantripCount: 2,
        spellSlots: [2]
      },
      '2': {
        knownCantripCount: 2,
        spellSlots: [3]
      },
      '3': {
        knownCantripCount: 2,
        spellSlots: [4,2]
      },
      '4': {
        knownCantripCount: 3,
        spellSlots: [4,3]
      },
      '5': {
        knownCantripCount: 3,
        spellSlots: [4,3,2]
      },
      '6': {
        knownCantripCount: 3,
        spellSlots: [4,3,3]
      },
      '7': {
        knownCantripCount: 3,
        spellSlots: [4,3,3,1]
      },
      '8': {
        knownCantripCount: 3,
        spellSlots: [4,3,3,2]
      },
      '9': {
        knownCantripCount: 3,
        spellSlots: [4,3,3,3,1]
      },
      '10': {
        knownCantripCount: 4,
        spellSlots: [4,3,3,3,2]
      },
      '11': {
        knownCantripCount: 4,
        spellSlots: [4,3,3,3,2,1]
      },
      '12': {
        knownCantripCount: 4,
        spellSlots: [4,3,3,3,2,1]
      },
      '13': {
        knownCantripCount: 4,
        spellSlots: [4,3,3,3,2,1,1]
      },
      '14': {
        knownCantripCount: 4,
        spellSlots: [4,3,3,3,2,1,1]
      },
      '15': {
        knownCantripCount: 4,
        spellSlots: [4,3,3,3,2,1,1,1]
      },
      '16': {
        knownCantripCount: 4,
        spellSlots: [4,3,3,3,2,1,1,1]
      },
      '17': {
        knownCantripCount: 4,
        spellSlots: [4,3,3,3,2,1,1,1,1]
      },
      '18': {
        knownCantripCount: 4,
        spellSlots: [4,3,3,3,3,1,1,1,1]
      },
      '19': {
        knownCantripCount: 4,
        spellSlots: [4,3,3,3,3,2,1,1,1]
      },
      '20': {
        knownCantripCount: 4,
        spellSlots: [4,3,3,3,3,2,2,1,1]
      }
    }
  },
  paladin: {
    ability: 'charisma',
    hasCantrips: false,
    spellCountMethod: 'abilityModPlusHalfLevel',
    levels: {
      '1': {
        spellSlots: []
      },
      '2': {
        spellSlots: [2]
      },
      '3': {
        spellSlots: [3]
      },
      '4': {
        spellSlots: [3]
      },
      '5': {
        spellSlots: [4,2]
      },
      '6': {
        spellSlots: [4,2]
      },
      '7': {
        spellSlots: [4,3]
      },
      '8': {
        spellSlots: [4,3]
      },
      '9': {
        spellSlots: [4,3,2]
      },
      '10': {
        spellSlots: [4,3,2]
      },
      '11': {
        spellSlots: [4,3,3]
      },
      '12': {
        spellSlots: [4,3,3]
      },
      '13': {
        spellSlots: [4,3,3,1]
      },
      '14': {
        spellSlots: [4,3,3,1]
      },
      '15': {
        spellSlots: [4,3,3,2]
      },
      '16': {
        spellSlots: [4,3,3,2]
      },
      '17': {
        spellSlots: [4,3,3,3,1]
      },
      '18': {
        spellSlots: [4,3,3,3,1]
      },
      '19': {
        spellSlots: [4,3,3,3,2]
      },
      '20': {
        spellSlots: [4,3,3,3,2]
      }
    }
  },
  ranger: {
    ability: 'wisdom',
    hasCantrips: false,
    spellCountMethod: 'fixed',
    levels: {
      '1': {
        fixedSpellCount: 0,
        spellSlots: []
      },
      '2': {
        fixedSpellCount: 2,
        spellSlots: [2]
      },
      '3': {
        fixedSpellCount: 3,
        spellSlots: [3]
      },
      '4': {
        fixedSpellCount: 3,
        spellSlots: [3]
      },
      '5': {
        fixedSpellCount: 4,
        spellSlots: [4,2]
      },
      '6': {
        fixedSpellCount: 4,
        spellSlots: [4,2]
      },
      '7': {
        fixedSpellCount: 5,
        spellSlots: [4,3]
      },
      '8': {
        fixedSpellCount: 5,
        spellSlots: [4,3]
      },
      '9': {
        fixedSpellCount: 6,
        spellSlots: [4,3,2]
      },
      '10': {
        fixedSpellCount: 6,
        spellSlots: [4,3,2]
      },
      '11': {
        fixedSpellCount: 7,
        spellSlots: [4,3,3]
      },
      '12': {
        fixedSpellCount: 7,
        spellSlots: [4,3,3]
      },
      '13': {
        fixedSpellCount: 8,
        spellSlots: [4,3,3,1]
      },
      '14': {
        fixedSpellCount: 8,
        spellSlots: [4,3,3,1]
      },
      '15': {
        fixedSpellCount: 9,
        spellSlots: [4,3,3,2]
      },
      '16': {
        fixedSpellCount: 9,
        spellSlots: [4,3,3,2]
      },
      '17': {
        fixedSpellCount: 10,
        spellSlots: [4,3,3,3,1]
      },
      '18': {
        fixedSpellCount: 10,
        spellSlots: [4,3,3,3,1]
      },
      '19': {
        fixedSpellCount: 11,
        spellSlots: [4,3,3,3,2]
      },
      '20': {
        fixedSpellCount: 11,
        spellSlots: [4,3,3,3,2]
      }
    }
  },
  sorcerer: {
    ability: 'charisma',
    hasCantrips: true,
    spellCountMethod: 'fixed',
    levels: {
      '1': {
        knownCantripCount: 4,
        fixedSpellCount: 2,
        spellSlots: [2]
      },
      '2': {
        knownCantripCount: 4,
        fixedSpellCount: 3,
        spellSlots: [3]
      },
      '3': {
        knownCantripCount: 4,
        fixedSpellCount: 4,
        spellSlots: [4,2]
      },
      '4': {
        knownCantripCount: 5,
        fixedSpellCount: 5,
        spellSlots: [4,3]
      },
      '5': {
        knownCantripCount: 5,
        fixedSpellCount: 6,
        spellSlots: [4,3,2]
      },
      '6': {
        knownCantripCount: 5,
        fixedSpellCount: 7,
        spellSlots: [4,3,3]
      },
      '7': {
        knownCantripCount: 5,
        fixedSpellCount: 8,
        spellSlots: [4,3,3,1]
      },
      '8': {
        knownCantripCount: 5,
        fixedSpellCount: 9,
        spellSlots: [4,3,3,2]
      },
      '9': {
        knownCantripCount: 5,
        fixedSpellCount: 10,
        spellSlots: [4,3,3,3,1]
      },
      '10': {
        knownCantripCount: 6,
        fixedSpellCount: 11,
        spellSlots: [4,3,3,3,2]
      },
      '11': {
        knownCantripCount: 6,
        fixedSpellCount: 12,
        spellSlots: [4,3,3,3,2,1]
      },
      '12': {
        knownCantripCount: 6,
        fixedSpellCount: 12,
        spellSlots: [4,3,3,3,2,1]
      },
      '13': {
        knownCantripCount: 6,
        fixedSpellCount: 13,
        spellSlots: [4,3,3,3,2,1,1]
      },
      '14': {
        knownCantripCount: 6,
        fixedSpellCount: 13,
        spellSlots: [4,3,3,3,2,1,1]
      },
      '15': {
        knownCantripCount: 6,
        fixedSpellCount: 14,
        spellSlots: [4,3,3,3,2,1,1,1]
      },
      '16': {
        knownCantripCount: 6,
        fixedSpellCount: 14,
        spellSlots: [4,3,3,3,2,1,1,1]
      },
      '17': {
        knownCantripCount: 6,
        fixedSpellCount: 15,
        spellSlots: [4,3,3,3,2,1,1,1,1]
      },
      '18': {
        knownCantripCount: 6,
        fixedSpellCount: 15,
        spellSlots: [4,3,3,3,3,1,1,1,1]
      },
      '19': {
        knownCantripCount: 6,
        fixedSpellCount: 15,
        spellSlots: [4,3,3,3,3,2,1,1,1]
      },
      '20': {
        knownCantripCount: 6,
        fixedSpellCount: 15,
        spellSlots: [4,3,3,3,3,2,2,1,1]
      }
    }
  },
  warlock: {
    ability: 'charisma',
    hasCantrips: true,
    spellCountMethod: 'fixed',
    levels: {
      '1': {
        knownCantripCount: 2,
        fixedSpellCount: 2,
        spellSlots: [1]
      },
      '2': {
        knownCantripCount: 2,
        fixedSpellCount: 3,
        spellSlots: [2]
      },
      '3': {
        knownCantripCount: 2,
        fixedSpellCount: 4,
        spellSlots: [0,2]
      },
      '4': {
        knownCantripCount: 3,
        fixedSpellCount: 5,
        spellSlots: [0,2]
      },
      '5': {
        knownCantripCount: 3,
        fixedSpellCount: 6,
        spellSlots: [0,0,2]
      },
      '6': {
        knownCantripCount: 3,
        fixedSpellCount: 7,
        spellSlots: [0,0,2]
      },
      '7': {
        knownCantripCount: 3,
        fixedSpellCount: 8,
        spellSlots: [0,0,0,2]
      },
      '8': {
        knownCantripCount: 3,
        fixedSpellCount: 9,
        spellSlots: [0,0,0,2]
      },
      '9': {
        knownCantripCount: 3,
        fixedSpellCount: 10,
        spellSlots: [0,0,0,0,2]
      },
      '10': {
        knownCantripCount: 4,
        fixedSpellCount: 10,
        spellSlots: [0,0,0,0,2]
      },
      '11': {
        knownCantripCount: 4,
        fixedSpellCount: 11,
        spellSlots: [0,0,0,0,3,0]
      },
      '12': {
        knownCantripCount: 4,
        fixedSpellCount: 11,
        spellSlots: [0,0,0,0,3,0]
      },
      '13': {
        knownCantripCount: 4,
        fixedSpellCount: 12,
        spellSlots: [0,0,0,0,3,0,0]
      },
      '14': {
        knownCantripCount: 4,
        fixedSpellCount: 12,
        spellSlots: [0,0,0,0,3,0,0]
      },
      '15': {
        knownCantripCount: 4,
        fixedSpellCount: 13,
        spellSlots: [0,0,0,0,3,0,0,0]
      },
      '16': {
        knownCantripCount: 4,
        fixedSpellCount: 13,
        spellSlots: [0,0,0,0,3,0,0,0]
      },
      '17': {
        knownCantripCount: 4,
        fixedSpellCount: 14,
        spellSlots: [0,0,0,0,4,0,0,0,0]
      },
      '18': {
        knownCantripCount: 4,
        fixedSpellCount: 14,
        spellSlots: [0,0,0,0,4,0,0,0,0]
      },
      '19': {
        knownCantripCount: 4,
        fixedSpellCount: 15,
        spellSlots: [0,0,0,0,4,0,0,0,0]
      },
      '20': {
        knownCantripCount: 4,
        fixedSpellCount: 15,
        spellSlots: [0,0,0,0,4,0,0,0,0]
      }
    }
  },
  wizard: {
    ability: 'intelligence',
    hasCantrips: true,
    spellCountMethod: 'abilityModPlusLevel',
    levels: {
      '1': {
        knownCantripCount: 3,
        spellSlots: [2]
      },
      '2': {
        knownCantripCount: 3,
        spellSlots: [3]
      },
      '3': {
        knownCantripCount: 3,
        spellSlots: [4,2]
      },
      '4': {
        knownCantripCount: 4,
        spellSlots: [4,3]
      },
      '5': {
        knownCantripCount: 4,
        spellSlots: [4,3,2]
      },
      '6': {
        knownCantripCount: 4,
        spellSlots: [4,3,3]
      },
      '7': {
        knownCantripCount: 4,
        spellSlots: [4,3,3,1]
      },
      '8': {
        knownCantripCount: 4,
        spellSlots: [4,3,3,2]
      },
      '9': {
        knownCantripCount: 4,
        spellSlots: [4,3,3,3,1]
      },
      '10': {
        knownCantripCount: 5,
        spellSlots: [4,3,3,3,2]
      },
      '11': {
        knownCantripCount: 5,
        spellSlots: [4,3,3,3,2,1]
      },
      '12': {
        knownCantripCount: 5,
        spellSlots: [4,3,3,3,2,1]
      },
      '13': {
        knownCantripCount: 5,
        spellSlots: [4,3,3,3,2,1,1]
      },
      '14': {
        knownCantripCount: 5,
        spellSlots: [4,3,3,3,2,1,1]
      },
      '15': {
        knownCantripCount: 5,
        spellSlots: [4,3,3,3,2,1,1,1]
      },
      '16': {
        knownCantripCount: 5,
        spellSlots: [4,3,3,3,2,1,1,1]
      },
      '17': {
        knownCantripCount: 5,
        spellSlots: [4,3,3,3,2,1,1,1,1]
      },
      '18': {
        knownCantripCount: 5,
        spellSlots: [4,3,3,3,3,1,1,1,1]
      },
      '19': {
        knownCantripCount: 5,
        spellSlots: [4,3,3,3,3,2,1,1,1]
      },
      '20': {
        knownCantripCount: 5,
        spellSlots: [4,3,3,3,3,2,2,1,1]
      }
    }
  }
};