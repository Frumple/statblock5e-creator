{
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}

start
  = line:Line+ { return line.join(''); }
  / End { return ''; }

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
  = period:PeriodChar markdown:MarkdownOptional whitespace:Whitespace expression:BeginningNameExpression { return `${period}${markdown}${whitespace}${expression}`; }

BeginningNameExpression
  = open:OpeningRoundBracketOptional expression:(BeginningName / BeginningFullName) close:ClosingRoundBracketOptional { return `${open}${expression}${close}`; }

NameExpression
  = open:OpeningRoundBracketOptional expression:(Name / FullName) close:ClosingRoundBracketOptional { return `${open}${expression}${close}`; }

BeginningName
  = '[name]' { return capitalizeFirstLetter(options.creature.name); }

BeginningFullName
  = '[fullname]' { return capitalizeFirstLetter(options.creature.fullName); }

Name
  = '[name]' { return options.creature.name; }

FullName
  = '[fullname]' { return options.creature.fullName; }

Text
  = $(NormalChar+)

Whitespace
  = $(SpaceChar+)

MarkdownOptional
  = $(MarkdownChar*)

OpeningRoundBracketOptional
  = $(OpeningRoundBracketChar?)

ClosingRoundBracketOptional
  = $(ClosingRoundBracketChar?)

EndOfLine
  = NewLineChar / End

NormalChar
  = !( PeriodChar / SpaceChar / NewLineChar ) .

OpeningRoundBracketChar
  = '(';

ClosingRoundBracketChar
  = ')'

MarkdownChar
  = '*' / '_'

NewLineChar
  = '\n' / $('\r' '\n'?)

SpaceChar
  = ' ' / '\t'

PeriodChar
  = '.'

End
  = !.