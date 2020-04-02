export default {
  'Club': {
    'name': 'Club',
    'description': 'Simple Melee, 1d4 bludgeoning, light',
    'reach': 5,
    'damageCategories': {
      'melee': {
        'isEnabled': true,
        'damageType': 'bludgeoning',
        'damageDieQuantity': 1,
        'damageDieSize': 4
      }
    }
  },
  'Dagger': {
    'name': 'Dagger',
    'description': 'Simple Melee, 1d4 piercing, finesse, light, thrown (range 20/60)',
    'isFinesse': true,
    'reach': 5,
    'normalRange': 20,
    'longRange': 60,
    'damageCategories': {
      'melee': {
        'isEnabled': true,
        'damageType': 'piercing',
        'damageDieQuantity': 1,
        'damageDieSize': 4
      },
      'ranged': {
        'isEnabled': true,
        'damageType': 'piercing',
        'damageDieQuantity': 1,
        'damageDieSize': 4
      }
    }
  },
  'Greatclub': {
    'name': 'Greatclub',
    'description': 'Simple Melee, 1d8 bludgeoning, two-handed',
    'reach': 5,
    'damageCategories': {
      'melee': {
        'isEnabled': true,
        'damageType': 'bludgeoning',
        'damageDieQuantity': 1,
        'damageDieSize': 8
      }
    }
  },
  'Handaxe': {
    'name': 'Handaxe',
    'description': 'Simple Melee, 1d6 slashing, light, thrown (range 20/60)',
    'reach': 5,
    'normalRange': 20,
    'longRange': 60,
    'damageCategories': {
      'melee': {
        'isEnabled': true,
        'damageType': 'slashing',
        'damageDieQuantity': 1,
        'damageDieSize': 6
      },
      'ranged': {
        'isEnabled': true,
        'damageType': 'slashing',
        'damageDieQuantity': 1,
        'damageDieSize': 6
      }
    }
  },
  'Javelin': {
    'name': 'Javelin',
    'description': 'Simple Melee, 1d6 piercing, thrown (range 30/120)',
    'reach': 5,
    'normalRange': 30,
    'longRange': 120,
    'damageCategories': {
      'melee': {
        'isEnabled': true,
        'damageType': 'piercing',
        'damageDieQuantity': 1,
        'damageDieSize': 6
      },
      'ranged': {
        'isEnabled': true,
        'damageType': 'piercing',
        'damageDieQuantity': 1,
        'damageDieSize': 6
      }
    }
  },
  'Light Hammer': {
    'name': 'Light Hammer',
    'description': 'Simple Melee, 1d4 bludgeoning, light, thrown (range 20/60)',
    'reach': 5,
    'normalRange': 20,
    'longRange': 60,
    'damageCategories': {
      'melee': {
        'isEnabled': true,
        'damageType': 'bludgeoning',
        'damageDieQuantity': 1,
        'damageDieSize': 4
      },
      'ranged': {
        'isEnabled': true,
        'damageType': 'bludgeoning',
        'damageDieQuantity': 1,
        'damageDieSize': 4
      }
    }
  },
  'Mace': {
    'name': 'Mace',
    'description': 'Simple Melee, 1d6 bludgeoning',
    'reach': 5,
    'damageCategories': {
      'melee': {
        'isEnabled': true,
        'damageType': 'bludgeoning',
        'damageDieQuantity': 1,
        'damageDieSize': 6
      }
    }
  },
  'Quarterstaff': {
    'name': 'Quarterstaff',
    'description': 'Simple Melee, 1d6 bludgeoning, versatile (1d8)',
    'reach': 5,
    'damageCategories': {
      'melee': {
        'isEnabled': true,
        'damageType': 'bludgeoning',
        'damageDieQuantity': 1,
        'damageDieSize': 6
      },
      'versatile': {
        'isEnabled': true,
        'damageType': 'bludgeoning',
        'damageDieQuantity': 1,
        'damageDieSize': 8
      }
    }
  },
  'Sickle': {
    'name': 'Sickle',
    'description': 'Simple Melee, 1d4 slashing, light',
    'reach': 5,
    'damageCategories': {
      'melee': {
        'isEnabled': true,
        'damageType': 'slashing',
        'damageDieQuantity': 1,
        'damageDieSize': 4
      }
    }
  },
  'Spear': {
    'name': 'Spear',
    'description': 'Simple Melee, 1d6 piercing, thrown (range 20/60), versatile (1d8)',
    'reach': 5,
    'normalRange': 20,
    'longRange': 60,
    'damageCategories': {
      'melee': {
        'isEnabled': true,
        'damageType': 'piercing',
        'damageDieQuantity': 1,
        'damageDieSize': 6
      },
      'ranged': {
        'isEnabled': true,
        'damageType': 'piercing',
        'damageDieQuantity': 1,
        'damageDieSize': 6
      },
      'versatile': {
        'isEnabled': true,
        'damageType': 'piercing',
        'damageDieQuantity': 1,
        'damageDieSize': 8
      }
    }
  },
  'Light Crossbow': {
    'name': 'Light Crossbow',
    'description': 'Simple Ranged, 1d8 piercing, ammunition (range 80/320), loading, two-handed',
    'normalRange': 80,
    'longRange': 320,
    'damageCategories': {
      'ranged': {
        'isEnabled': true,
        'damageType': 'piercing',
        'damageDieQuantity': 1,
        'damageDieSize': 8
      }
    }
  },
  'Dart': {
    'name': 'Dart',
    'description': 'Simple Ranged, 1d4 piercing, finesse, thrown (range 20/60)',
    'isFinesse': true,
    'normalRange': 20,
    'longRange': 60,
    'damageCategories': {
      'ranged': {
        'isEnabled': true,
        'damageType': 'piercing',
        'damageDieQuantity': 1,
        'damageDieSize': 4
      }
    }
  },
  'Shortbow': {
    'name': 'Shortbow',
    'description': 'Simple Ranged, 1d6 piercing, ammunition (range 80/320), two-handed',
    'normalRange': 80,
    'longRange': 320,
    'damageCategories': {
      'ranged': {
        'isEnabled': true,
        'damageType': 'piercing',
        'damageDieQuantity': 1,
        'damageDieSize': 6
      }
    }
  },
  'Sling': {
    'name': 'Sling',
    'description': 'Simple Ranged, 1d4 bludgeoning, ammunition (range 30/120)',
    'normalRange': 30,
    'longRange': 120,
    'damageCategories': {
      'ranged': {
        'isEnabled': true,
        'damageType': 'bludgeoning',
        'damageDieQuantity': 1,
        'damageDieSize': 4
      }
    }
  },
  'Battleaxe': {
    'name': 'Battleaxe',
    'description': 'Martial Melee, 1d8 slashing, versatile (1d10)',
    'reach': 5,
    'damageCategories': {
      'melee': {
        'isEnabled': true,
        'damageType': 'slashing',
        'damageDieQuantity': 1,
        'damageDieSize': 8
      },
      'versatile': {
        'isEnabled': true,
        'damageType': 'slashing',
        'damageDieQuantity': 1,
        'damageDieSize': 10
      }
    }
  },
  'Flail': {
    'name': 'Flail',
    'description': 'Martial Melee, 1d8 bludgeoning',
    'reach': 5,
    'damageCategories': {
      'melee': {
        'isEnabled': true,
        'damageType': 'bludgeoning',
        'damageDieQuantity': 1,
        'damageDieSize': 8
      }
    }
  },
  'Glaive': {
    'name': 'Glaive',
    'description': 'Martial Melee, 1d10 slashing, heavy, reach, two-handed',
    'reach': 10,
    'damageCategories': {
      'melee': {
        'isEnabled': true,
        'damageType': 'slashing',
        'damageDieQuantity': 1,
        'damageDieSize': 10
      }
    }
  },
  'Greataxe': {
    'name': 'Greataxe',
    'description': 'Martial Melee, 1d12 slashing, heavy, two-handed',
    'reach': 5,
    'damageCategories': {
      'melee': {
        'isEnabled': true,
        'damageType': 'slashing',
        'damageDieQuantity': 1,
        'damageDieSize': 12
      }
    }
  },
  'Greatsword': {
    'name': 'Greatsword',
    'description': 'Martial Melee, 2d6 slashing, heavy, two-handed',
    'reach': 5,
    'damageCategories': {
      'melee': {
        'isEnabled': true,
        'damageType': 'slashing',
        'damageDieQuantity': 2,
        'damageDieSize': 6
      }
    }
  },
  'Halberd': {
    'name': 'Halberd',
    'description': 'Martial Melee, 1d10 slashing, heavy, reach, two-handed',
    'reach': 10,
    'damageCategories': {
      'melee': {
        'isEnabled': true,
        'damageType': 'slashing',
        'damageDieQuantity': 1,
        'damageDieSize': 10
      }
    }
  },
  'Lance': {
    'name': 'Lance',
    'description': 'Martial Melee, 1d12 piercing, reach, special',
    'reach': 10,
    'damageCategories': {
      'melee': {
        'isEnabled': true,
        'damageType': 'piercing',
        'damageDieQuantity': 1,
        'damageDieSize': 12
      }
    }
  },
  'Longsword': {
    'name': 'Longsword',
    'description': 'Martial Melee, 1d8 slashing, versatile (1d10)',
    'reach': 5,
    'damageCategories': {
      'melee': {
        'isEnabled': true,
        'damageType': 'slashing',
        'damageDieQuantity': 1,
        'damageDieSize': 8
      },
      'versatile': {
        'isEnabled': true,
        'damageType': 'slashing',
        'damageDieQuantity': 1,
        'damageDieSize': 10
      }
    }
  },
  'Maul': {
    'name': 'Maul',
    'description': 'Martial Melee, 2d6 bludgeoning, heavy, two-handed',
    'reach': 5,
    'damageCategories': {
      'melee': {
        'isEnabled': true,
        'damageType': 'bludgeoning',
        'damageDieQuantity': 2,
        'damageDieSize': 6
      }
    }
  },
  'Morningstar': {
    'name': 'Morningstar',
    'description': 'Martial Melee, 1d8 piercing',
    'reach': 5,
    'damageCategories': {
      'melee': {
        'isEnabled': true,
        'damageType': 'piercing',
        'damageDieQuantity': 1,
        'damageDieSize': 8
      }
    }
  },
  'Pike': {
    'name': 'Pike',
    'description': 'Martial Melee, 1d10 piercing, heavy, reach, two-handed',
    'reach': 10,
    'damageCategories': {
      'melee': {
        'isEnabled': true,
        'damageType': 'piercing',
        'damageDieQuantity': 1,
        'damageDieSize': 10
      }
    }
  },
  'Rapier': {
    'name': 'Rapier',
    'description': 'Martial Melee, 1d8 piercing, finesse',
    'isFinesse': true,
    'reach': 5,
    'damageCategories': {
      'melee': {
        'isEnabled': true,
        'damageType': 'piercing',
        'damageDieQuantity': 1,
        'damageDieSize': 8
      }
    }
  },
  'Scimitar': {
    'name': 'Scimitar',
    'description': 'Martial Melee, 1d6 slashing, finesse, light',
    'isFinesse': true,
    'reach': 5,
    'damageCategories': {
      'melee': {
        'isEnabled': true,
        'damageType': 'slashing',
        'damageDieQuantity': 1,
        'damageDieSize': 6
      }
    }
  },
  'Shortsword': {
    'name': 'Shortsword',
    'description': 'Martial Melee, 1d6 piercing, finesse, light',
    'isFinesse': true,
    'reach': 5,
    'damageCategories': {
      'melee': {
        'isEnabled': true,
        'damageType': 'piercing',
        'damageDieQuantity': 1,
        'damageDieSize': 6
      }
    }
  },
  'Trident': {
    'name': 'Trident',
    'description': 'Martial Melee, 1d6 piercing, thrown (range 20/60), versatile (1d8)',
    'reach': 5,
    'normalRange': 20,
    'longRange': 60,
    'damageCategories': {
      'melee': {
        'isEnabled': true,
        'damageType': 'piercing',
        'damageDieQuantity': 1,
        'damageDieSize': 6
      },
      'ranged': {
        'isEnabled': true,
        'damageType': 'piercing',
        'damageDieQuantity': 1,
        'damageDieSize': 6
      },
      'versatile': {
        'isEnabled': true,
        'damageType': 'piercing',
        'damageDieQuantity': 1,
        'damageDieSize': 8
      }
    }
  },
  'War Pick': {
    'name': 'War Pick',
    'description': 'Martial Melee, 1d8 piercing',
    'reach': 5,
    'damageCategories': {
      'melee': {
        'isEnabled': true,
        'damageType': 'piercing',
        'damageDieQuantity': 1,
        'damageDieSize': 8
      }
    }
  },
  'Warhammer': {
    'name': 'Warhammer',
    'description': 'Martial Melee, 1d8 bludgeoning, versatile (1d10)',
    'reach': 5,
    'damageCategories': {
      'melee': {
        'isEnabled': true,
        'damageType': 'bludgeoning',
        'damageDieQuantity': 1,
        'damageDieSize': 8
      },
      'versatile': {
        'isEnabled': true,
        'damageType': 'bludgeoning',
        'damageDieQuantity': 1,
        'damageDieSize': 10
      }
    }
  },
  'Whip': {
    'name': 'Whip',
    'description': 'Martial Melee, 1d4 slashing, finesse, reach',
    'isFinesse': true,
    'reach': 10,
    'damageCategories': {
      'melee': {
        'isEnabled': true,
        'damageType': 'slashing',
        'damageDieQuantity': 1,
        'damageDieSize': 4
      }
    }
  },
  'Blowgun': {
    'name': 'Blowgun',
    'description': 'Martial Ranged, 1 piercing, ammunition (range 25/100), loading',
    'normalRange': 25,
    'longRange': 100,
    'damageCategories': {
      'ranged': {
        'isEnabled': true,
        'damageType': 'piercing',
        'damageDieQuantity': 1,
        'damageDieSize': 1
      }
    }
  },
  'Hand Crossbow': {
    'name': 'Hand Crossbow',
    'description': 'Martial Ranged, 1d6 piercing, ammunition (range 30/120), light, loading',
    'normalRange': 30,
    'longRange': 120,
    'damageCategories': {
      'ranged': {
        'isEnabled': true,
        'damageType': 'piercing',
        'damageDieQuantity': 1,
        'damageDieSize': 6
      }
    }
  },
  'Heavy Crossbow': {
    'name': 'Heavy Crossbow',
    'description': 'Martial Ranged, 1d10 piercing, ammunition (range 100/400), heavy, loading, two-handed',
    'normalRange': 100,
    'longRange': 400,
    'damageCategories': {
      'ranged': {
        'isEnabled': true,
        'damageType': 'piercing',
        'damageDieQuantity': 1,
        'damageDieSize': 10
      }
    }
  },
  'Longbow': {
    'name': 'Longbow',
    'description': 'Martial Ranged, 1d8 piercing, ammunition (range 150/600), heavy, two-handed',
    'normalRange': 150,
    'longRange': 600,
    'damageCategories': {
      'ranged': {
        'isEnabled': true,
        'damageType': 'piercing',
        'damageDieQuantity': 1,
        'damageDieSize': 8
      }
    }
  }
};