# Interactive Creature Statblock Creator for D&D 5th Edition

### Live Demo (currently only works in Chrome): [https://frumple.github.io/statblock5e-creator][demo]

A web application for creating creature statblocks that are similar in appearance to the official blocks from the Dungeons and Dragons 5th Edition Monster Manual.

<div align="center">
  <img src="https://github.com/Frumple/statblock5e-creator/blob/master/images/statblock.png" />
</div>

## Features

- **One-column** or **Two-column** formats. Two-column statblock heights can also be adjusted manually.
- Calculate hit points using hit die and constitution, or using your own custom value.
- Calculate saving throws and skills using ability modifiers and proficiency bonus, or using your own custom modifiers.
- Enhance Special Traits, Actions, Reactions, and Legendary Actions with special expressions:
  - **[Markdown Emphasis][markdown-emphasis]** - Make text **bold** and/or *italic*.
  - **[Name Expressions][name-expressions]** - Inject the creature's name into the description where needed.
  - **[Math Expressions][math-expressions]** - Automatically calculate attack roll modifiers, average damage from damage rolls, and spell save DCs.
- **Generate Attack Dialog** - Easily create attack actions using one of the pre-defined D&D 5e weapons, or create your own custom attack.
- **Generate Spellcasting Dialog** - Easily create spellcasting special trait blocks for innate, generic, and class-specific spellcasters.
- Import pre-made published statblocks from the following sources:
  - **Import from 5e SRD** - Load any creature from the official 5th Edition SRD using Statblock5e Creator's own JSON file format.
  - **Import from Open5e** - Load any creature from the official 5th Edition SRD, or Tome of Beasts or Creature Codex from Kobold Press using the Open5e API (does not include Markdown Emphasis, Name Expressions, or Math Expressions).
- Export your statblock into the following formats:
  - **Export to JSON** - Save your statblock and re-import it back into Statblock5e Creator at a later time.
  - **Export to HTML** - Based on the original **[statblock5e][statblock5e]** template.
  - **Export to Markdown** - For use in homebrew content tools such as **[Homebrewery][homebrewery]** and **[GM Binder][gmbinder]**.
- Print your statblock.

## Future Improvements

- Export as Image
- Autofill common Special Traits and Actions
- Export to [Improved Initiative][improved-initiative] (JSON format)
- Support for additional browsers (Firefox, Safari, etc.), and mobile devices
- Additional printing options, including printing 2 one-column statblocks side-by-side

## How to Use

### Read the wiki: https://github.com/Frumple/statblock5e-creator/wiki

## Development Setup

Install all dependencies with:

    npm install

Create a development webpack bundle with:

    npm start

Or create a production webpack bundle with:

    npm run build

All bundles will be outputted to the `dist/` directory.

### Tests

This application has an extensive suite of automated [Jest](jest) test cases that verify the behaviour of each section in the statblock.

Run all the tests with:

    npm test

### Parsers

Parsers can be generated from their respective grammars with:

    npm run-script generate-markdown-parser
    npm run-script generate-math-parser
    npm run-script generate-name-parser

## Dependencies

- [PEG.js][pegjs] - Parsing for Markdown emphasis, creature names, ability score modifiers, and mathematical expressions
- [DOMPurify][dompurify] - Sanitize inputted HTML tags
- [JSBeautify][jsbeautify] - Beautify HTML Export
- [Clipboard.js][clipboardjs] - Copy to clipboard functionality

## Credits

Statblock5e Creator is a fork of Valloric's awesome [statblock5e][statblock5e] template. It is also heavily inspired by [CritterDB][critterdb], another great tool for creating statblocks.

Thanks to [Open5e][open5e] for providing a solid public API for statblock data.

## Licensing

All source code in Statblock5e Creator is licensed under the [Apache License, Version 2.0][apache2].

All example monster statblocks and data used in this application are from the [Dungeons and Dragons Systems Reference Document (SRD) v5.1][srd], available through the [Open Gaming License (OGL)][ogl].

Statblock5e Creator is a not-for-profit personal project, and is not officially affiliated in any way with Wizards of the Coast.

[demo]: https://frumple.github.io/statblock5e-creator
[examples]: https://github.com/Frumple/statblock5e-creator/tree/master/examples

[markdown-emphasis]: https://github.com/Frumple/statblock5e-creator/wiki/Markdown-Emphasis
[name-expressions]: https://github.com/Frumple/statblock5e-creator/wiki/Name-Expressions
[math-expressions]: https://github.com/Frumple/statblock5e-creator/wiki/Math-Expressions

[jest]: https://jestjs.io
[pegjs]: https://pegjs.org
[dompurify]: https://github.com/cure53/DOMPurify
[jsbeautify]: https://github.com/beautify-web/js-beautify
[clipboardjs]: https://clipboardjs.com

[statblock5e]: https://github.com/valloric/statblock5e
[critterdb]: https://critterdb.com
[homebrewery]: https://homebrewery.naturalcrit.com
[gmbinder]: https://www.gmbinder.com
[improved-initiative]: https://www.improved-initiative.com
[open5e]: https://open5e.com

[apache2]: http://www.apache.org/licenses/LICENSE-2.0.html
[srd]: https://media.wizards.com/2016/downloads/DND/SRD-OGL_V5.1.pdf
[ogl]: https://github.com/Frumple/statblock5e-creator/blob/master/OGL-LICENSE.txt