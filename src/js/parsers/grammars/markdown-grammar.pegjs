start
  = line:Line+ { return line.join(''); }
  / End { return ""; }

Line
  = BlankLine
  / NormalLine

BlankLine
  = NewLineChar

NormalLine
  = inline:Inline+ end:EndOfLine { return `${inline.join('')}${end ? end : ''}`; }

Inline
  = Markup
  / Text
  / Whitespace

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
  = $(SpaceChar+)

EndOfLine
  = NewLineChar / End

NormalChar
  = !( SpecialChar / SpaceChar / NewLineChar ) .

SpecialChar
  = '*' / '_'

NewLineChar
  = '\n' / $('\r' '\n'?)

SpaceChar
  = ' ' / '\t'

End
  = !.