{
  const name = options['name'];
  const fullName = options['fullName'];

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}

start
  = line:Line+ { return line.join('\n'); }
  
Line
  = beginningInline:BeginningInline inline:Inline* EndOfLine { return `${beginningInline}${inline.join('')}`; }

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
  = '{name}' { return capitalizeFirstLetter(name); }

BeginningFullName
  = '{fullname}' { return capitalizeFirstLetter(fullName); }

Name
  = '{name}' { return name; }

FullName
  = '{fullname}' { return fullName; }

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
  = NewLineChar+ / End

NormalChar
  = !( SpecialChar / SpaceChar / NewLineChar ) .
  
SpecialChar
  = '*' / '_' / '{' / '}' / '.'

NewLineChar
  = '\n' / '\r' '\n'?
  
SpaceChar
  = ' ' / '\t'
  
PeriodChar
  = '.'
  
End
  = !.