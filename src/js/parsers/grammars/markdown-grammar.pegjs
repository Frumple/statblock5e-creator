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
  = EscapedMarkdownChar
  / Markup
  / Text
  / Whitespace

Markup
  = Strong
  / Emphasis

Strong
  = StrongAsterisk
  / StrongUnderscore

TwoAsteriskOpen
  = !EscapedMarkdownChar '**'

TwoAsteriskClose
  = !EscapedMarkdownChar '**'

StrongAsterisk
  = TwoAsteriskOpen
    inline:Inline+
    TwoAsteriskClose
    { return `<strong>${inline.join('')}</strong>`; }

TwoUnderlineOpen
  = !EscapedMarkdownChar '__'

TwoUnderlineClose
  = !EscapedMarkdownChar '__'

StrongUnderscore
  = TwoUnderlineOpen
    inline:Inline+
    TwoUnderlineClose
    { return `<strong>${inline.join('')}</strong>`; }

Emphasis
  = EmphasisAsterisk
  / EmphasisUnderscore

OneAsteriskOpen
  = !EscapedMarkdownChar '*'

OneAsteriskClose
  = !StrongAsterisk !EscapedMarkdownChar '*'

EmphasisAsterisk
  = OneAsteriskOpen
    inline:Inline+
    OneAsteriskClose
    { return `<em>${inline.join('')}</em>`; }

OneUnderlineOpen
  = !EscapedMarkdownChar '_'

OneUnderlineClose
  = !StrongUnderscore !EscapedMarkdownChar '_'

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
  = !( MarkdownChar / EscapedMarkdownChar / SpaceChar / NewLineChar ) .

MarkdownChar
  = '*' / '_'

EscapedMarkdownChar
  = '\\' char:MarkdownChar { return char; }

NewLineChar
  = '\n' / $('\r' '\n'?)

SpaceChar
  = ' ' / '\t'

End
  = !.