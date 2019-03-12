start
  = line:Line+ { return line.join('\n'); }
  
Line
  = inline:Inline+ EndOfLine { return inline.join(''); }

Inline
  = Markup
  / Text
  
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

EndOfLine
  = NewLineChar+ / End

NormalChar
  = !( SpecialChar / NewLineChar ) .
  
SpecialChar
  = '*' / '_' / '{' / '}'

NewLineChar
  = '\n' / '\r' '\n'?
  
SpaceChar
  = ' ' / '\t'
  
End
  = !.