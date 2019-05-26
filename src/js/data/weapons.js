let weapons = {
  'Club': {
    'weaponName': 'Club',
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
    'weaponName': 'Dagger',
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
  }
};

export default weapons;