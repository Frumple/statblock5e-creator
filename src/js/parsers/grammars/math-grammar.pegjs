{
  // The modifier portion of a damage expression shows an EN dash for negative values, a plus sign for positive values,
  // and nothing for zero values. There is also a space between the operator and the number.
  function formatDamageExpressionModifier(value) {
    if (value !== 0) {
      const operator = formatModifierOperator(value);
      const number = formatModifierNumber(value);

      return ` ${operator} ${number}`;
    }
    return ``;
  }

  // Modifier expressions show an EN dash for negative values, and a plus sign for positive values.
  function formatModifierExpression(value) {
    const operator = formatModifierOperator(value);
    const number = formatModifierNumber(value);

    return `${operator}${number}`;
  }

  // Math expressions show an EN dash for negative values, and no plus sign for positive values.
  function formatMathExpression(value) {
    if (value < 0) {
      const operator = formatModifierOperator(value);
      const number = formatModifierNumber(value);

      return `${operator}${number}`;
    }
    return value.toString();
  }

  function formatModifierOperator(modifier) {
    if (modifier < 0) {
      // This is an EN dash (U+2013).
      // This stands out more than a normal minus sign.
      return '–';
    }
    return '+';
  }

  function formatModifierNumber(modifier) {
    if (modifier < 0) {
      return Math.abs(modifier).toString();
    }
    return modifier.toString();
  }
}

start
  = line:Line+ { return line.join(''); }
  / End { return ""; }

Line
  = BlankLine
  / NormalLine

BlankLine
  = NewLineChar

NormalLine = inline:Inline+ end:EndOfLine { return `${inline.join('')}${end ? end : ''}`; }

Inline
  = DamageExpression
  / ModifierExpression
  / MathExpression
  / Text
  / Whitespace

DamageExpression
  = 'dmg' '[' SpaceChar* head:DiceOperand tail:(SpaceChar* Operator SpaceChar* Operand)* SpaceChar* ']' {
    const modifier = tail.reduce((result, element) => {
      const operator = element[1];
      const operand = element[3];
      if (operator === '+') { return result + operand; }
      if (operator === '-') { return result - operand; }
    }, 0);
    const formattedModifier = formatDamageExpressionModifier(modifier);

    const averageDamage = head.average + modifier;
    const formattedAverageDamage = formatMathExpression(averageDamage);

    const diceNotation = `${head.text}${formattedModifier}`;

    return `${formattedAverageDamage} (${diceNotation})`
  }

ModifierExpression
  = 'mod' value:MathExpressionCommon { return formatModifierExpression(value); }

MathExpression
  = value:MathExpressionCommon { return formatMathExpression(value); }

MathExpressionCommon
  = '[' SpaceChar* head:Operand tail:(SpaceChar* Operator SpaceChar* Operand)* SpaceChar* ']' {
    return tail.reduce((result, element) => {
      const operator = element[1];
      const operand = element[3];
      if (operator === '+') { return result + operand; }
      if (operator === '-') { return result - operand; }
    }, head);
  }

Operator
  = '+' / '-'

DiceOperand
  = hitDieQuantity:$([0-9]*) 'd' hitDieSize:$([0-9]+) {
    if (! hitDieQuantity) {
      hitDieQuantity = 1;
    }

    const hitDieQuantityAsInt = parseInt(hitDieQuantity, 10);
    const hitDieSizeAsInt = parseInt(hitDieSize, 10);

    const hitDieAverage = (hitDieSizeAsInt / 2) + 0.5;
    const totalDieAverage = Math.floor(hitDieQuantityAsInt * hitDieAverage);

    return {
      text: `${hitDieQuantity}d${hitDieSize}`,
      average: totalDieAverage
    };
  }

Operand
  = AbilityModifier
  / ProficiencyBonus
  / Integer

AbilityModifier
  = 'strmod' { return options.abilities.strength.modifier; }
  / 'dexmod' { return options.abilities.dexterity.modifier; }
  / 'conmod' { return options.abilities.constitution.modifier; }
  / 'intmod' { return options.abilities.intelligence.modifier; }
  / 'wismod' { return options.abilities.wisdom.modifier; }
  / 'chamod' { return options.abilities.charisma.modifier; }
  / 'finmod' { return (options.abilities.strength.modifier >= options.abilities.dexterity.modifier) ? options.abilities.strength.modifier : options.abilities.dexterity.modifier}

ProficiencyBonus
  = 'prof' { return options.proficiencyBonus; }

Integer
  = '-'? [0-9]+ { return parseInt(text(), 10); }

Text
  = $(NormalChar+)

Whitespace
  = $(SpaceChar+)

EndOfLine
  = NewLineChar / End

NormalChar
  = !( SpaceChar / NewLineChar ) .

NewLineChar
  = '\n' / $('\r' '\n'?)

SpaceChar
  = ' ' / '\t'

PeriodChar
  = '.'

End
  = !.