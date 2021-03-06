{
  function totalSubsequentOperands(tail, initialValue = 0) {
    return tail.reduce((result, element) => {
      const operator = element[1];
      const operand = element[3];
      if (operator === '+') { return result + operand; }
      if (operator === '-') { return result - operand; }
    }, initialValue);
  }

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
  = ExpressionWithOptionalRoundBrackets
  / Text
  / Whitespace

ExpressionWithOptionalRoundBrackets
  = open:OpeningRoundBracketOptional expression:Expression close:ClosingRoundBracketOptional { return `${open}${expression}${close}`; }

Expression
  = SpellSaveDCExpression
  / DamageExpression
  / AttackExpression
  / ModifierExpression
  / MathExpression

SpellSaveDCExpression
  = ('SDC' / 'sdc') '[' SpaceChar* head:AbilityModifier tail:(SpaceChar* Operator SpaceChar* Operand)* SpaceChar* ']' {
    const tailModifier = totalSubsequentOperands(tail);
    return 8 + head + options.proficiencyBonus + tailModifier;
  }

DamageExpression
  = ('DMG' / 'dmg') '[' SpaceChar* head:DiceOperand tail:(SpaceChar* Operator SpaceChar* Operand)* SpaceChar* ']' {
    const modifier = totalSubsequentOperands(tail);
    const formattedModifier = formatDamageExpressionModifier(modifier);

    const averageDamage = head.average + modifier;
    const formattedAverageDamage = formatMathExpression(averageDamage);

    const diceNotation = `${head.text}${formattedModifier}`;

    return `${formattedAverageDamage} (${diceNotation})`
  }

AttackExpression
  = ('ATK' / 'atk') '[' SpaceChar* head:AbilityModifierIncludingFinesse tail:(SpaceChar* Operator SpaceChar* Operand)* SpaceChar* ']' {
    const tailModifier = totalSubsequentOperands(tail);
    const modifier = head + options.proficiencyBonus + tailModifier;
    return formatModifierExpression(modifier);
  }

ModifierExpression
  = ('MOD' / 'mod') value:MathExpressionCommon { return formatModifierExpression(value); }

MathExpression
  = value:MathExpressionCommon { return formatMathExpression(value); }

MathExpressionCommon
  = '[' SpaceChar* head:Operand tail:(SpaceChar* Operator SpaceChar* Operand)* SpaceChar* ']' {
    return totalSubsequentOperands(tail, head);
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
  = AbilityModifierIncludingFinesse
  / ProficiencyBonus
  / Integer

AbilityModifierIncludingFinesse
  = AbilityModifier
  / ('FIN' / 'fin') { return (options.abilities.strength.modifier >= options.abilities.dexterity.modifier) ? options.abilities.strength.modifier : options.abilities.dexterity.modifier}

AbilityModifier
  = ('STR' / 'str') { return options.abilities.strength.modifier; }
  / ('DEX' / 'dex') { return options.abilities.dexterity.modifier; }
  / ('CON' / 'con') { return options.abilities.constitution.modifier; }
  / ('INT' / 'int') { return options.abilities.intelligence.modifier; }
  / ('WIS' / 'wis') { return options.abilities.wisdom.modifier; }
  / ('CHA' / 'cha') { return options.abilities.charisma.modifier; }

ProficiencyBonus
  = ('PROF' / 'prof') { return options.proficiencyBonus; }

Integer
  = '-'? [0-9]+ { return parseInt(text(), 10); }

Text
  = $(NormalChar+)

Whitespace
  = $(SpaceChar+)

OpeningRoundBracketOptional
  = $(OpeningRoundBracketChar?)

ClosingRoundBracketOptional
  = $(ClosingRoundBracketChar?)

EndOfLine
  = NewLineChar / End

NormalChar
  = !( SpaceChar / NewLineChar ) .

OpeningRoundBracketChar
  = '(';

ClosingRoundBracketChar
  = ')'

NewLineChar
  = '\n' / $('\r' '\n'?)

SpaceChar
  = ' ' / '\t'

PeriodChar
  = '.'

End
  = !.