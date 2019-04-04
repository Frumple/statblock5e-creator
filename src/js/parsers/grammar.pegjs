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
  = Markup
  / Text
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
  = literal:'{name}' { return (options.settings.enableExpressions ? capitalizeFirstLetter(options.creature.name) : literal); }

BeginningFullName
  = literal:'{fullname}' { return (options.settings.enableExpressions ? capitalizeFirstLetter(options.creature.fullName) : literal); }

Name
  = literal:'{name}' { return (options.settings.enableExpressions ? options.creature.name : literal); }

FullName
  = literal:'{fullname}' { return (options.settings.enableExpressions ? options.creature.fullName : literal); }

Markup
  = Strong
  / Emphasis

Strong
  = StrongAsterisk
  / StrongUnderscore
  
TwoAsteriskOpen
  = '**'
  
TwoAsteriskClose
  = '**'
  
StrongAsterisk
  = TwoAsteriskOpen
    inline:Inline+
    TwoAsteriskClose
    { return `<strong>${inline.join('')}</strong>`; }
    
TwoUnderlineOpen
  = '__'
  
TwoUnderlineClose
  = '__'
  
StrongUnderscore
  = TwoUnderlineOpen
    inline:Inline+
    TwoUnderlineClose
    { return `<strong>${inline.join('')}</strong>`; }

Emphasis
  = EmphasisAsterisk
  / EmphasisUnderscore
  
OneAsteriskOpen
  = '*'
  
OneAsteriskClose
  = !StrongAsterisk '*'
  
EmphasisAsterisk
  = OneAsteriskOpen
    inline:Inline+
    OneAsteriskClose 
    { return `<em>${inline.join('')}</em>`; }
    
OneUnderlineOpen
  = '_'
  
OneUnderlineClose
  = !StrongUnderscore '_'
  
EmphasisUnderscore
  = OneUnderlineOpen
    inline:Inline+
    OneUnderlineClose
    { return `<em>${inline.join('')}</em>`; }

Text
  = $(NormalChar+)
  
Whitespace
  = SpaceChar+

EndOfLine
  = NewLineChar / End

NormalChar
  = !( SpecialChar / SpaceChar / NewLineChar ) .
  
SpecialChar
  = '*' / '_' / '{' / '}' / '.'

NewLineChar
  = '\n' / $('\r' '\n'?)
  
SpaceChar
  = ' ' / '\t'
  
PeriodChar
  = '.'
  
End
  = !.