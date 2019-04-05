{
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}

start
  = line:Line+ { return line.join(''); }
  
Line
  = BlankLine
  / NormalLine

BlankLine
  = NewLineChar

NormalLine
  = beginningInline:BeginningInline inline:Inline* end:EndOfLine { return `${beginningInline}${inline.join('')}${end ? end : ''}`; }

BeginningInline
  = BeginningNameExpression
  / InlineCommon

Inline
  = SentenceBeginningNameExpression
  / NameExpression
  / InlineCommon
  
InlineCommon
  = Text
  / Whitespace
  / PeriodChar

SentenceBeginningNameExpression
  = period:PeriodChar whitespace:Whitespace expression:BeginningNameExpression { return `${period}${whitespace}${expression}`; }

BeginningNameExpression
  = BeginningName
  / BeginningFullName

NameExpression
  = Name
  / FullName

BeginningName
  = '{name}' { return capitalizeFirstLetter(options.creature.name); }

BeginningFullName
  = '{fullname}' { return capitalizeFirstLetter(options.creature.fullName); }

Name
  = '{name}' { return options.creature.name; }

FullName
  = '{fullname}' { return options.creature.fullName; }

Text
  = $(NormalChar+)
  
Whitespace
  = $(SpaceChar+)

EndOfLine
  = NewLineChar / End

NormalChar
  = !( SpecialChar / SpaceChar / NewLineChar ) .
  
SpecialChar
  = '{' / '}' / '.'

NewLineChar
  = '\n' / $('\r' '\n'?)
  
SpaceChar
  = ' ' / '\t'
  
PeriodChar
  = '.'
  
End
  = !.