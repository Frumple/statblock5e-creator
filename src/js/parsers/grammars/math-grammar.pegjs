start
  = line:Line+ { return line.join(''); }

Line
  = BlankLine
  / NormalLine

BlankLine
  = NewLineChar

NormalLine = inline:Inline+ end:EndOfLine { return `${inline.join('')}${end ? end : ''}`; }

Inline
  = MathExpression
  / Text
  / Whitespace

MathExpression
  = '{' head:Integer tail:(SpaceChar* AddOrSubtractOperator SpaceChar* Integer)* '}' {
    return tail.reduce((result, element) => {
      const operator = element[1];
      const operand = element[3];
      if (operator === '+') { return result + operand; }
      if (operator === '-') { return result - operand; }
    }, head)
  }

AddOrSubtractOperator
  = '+' / '-'

Integer
  = SpaceChar* '-'? [0-9]+ { return parseInt(text(), 10); }

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