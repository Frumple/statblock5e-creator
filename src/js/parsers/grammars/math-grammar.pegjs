start
  = line:Line+ { return line.join(''); }

Line
  = BlankLine
  / NormalLine

BlankLine
  = NewLineChar

NormalLine = inline:Inline+ end:EndOfLine { return `${inline.join('')}${end ? end : ''}`; }

Inline
  = ModifierExpression
  / MathExpression
  / Text
  / Whitespace

ModifierExpression
  = 'mod' total:MathExpression { return (total >= 0 ? `+${total}` : `${total}`); }

MathExpression
  = '{' SpaceChar* head:Operand tail:(SpaceChar* Operator SpaceChar* Operand)* SpaceChar* '}' {
    return tail.reduce((result, element) => {
      const operator = element[1];
      const operand = element[3];
      if (operator === '+') { return result + operand; }
      if (operator === '-') { return result - operand; }
    }, head);
  }

Operator
  = '+' / '-'

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