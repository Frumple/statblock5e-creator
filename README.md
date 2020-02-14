# Interactive Creature Statblock Creator for D&D 5th Edition

### Live Demo (currently only works in Chrome): [https://frumple.github.io/statblock5e-creator][demo]

A frontend web application for creating creature statblocks that are similar in appearance to the official blocks from the Dungeons and Dragons 5th Edition Monster Manual.

<div align="center">
  <img src="https://github.com/Frumple/statblock5e-creator/blob/master/images/statblock.png" />
</div>

## Features

- **One-column** or **Two-column** formats. Two-column statblock heights can also be adjusted manually.
- Hit points are automatically calculated from hit die and constitution, or enter your own custom hit points.
- Saving throws and skills are automatically calculated from ability modifiers and proficiency bonus, or enter your own custom modifiers.
- In the descriptions for Special Traits, Actions, Reactions, and Legendary Actions:
  - **[Markdown Emphasis][markdown-emphasis]** - Make text **bold** and/or *italic*.
  - **[Name Expressions][name-expressions]** - Inject the creature's name into the description where needed.
  - **[Math Expressions][math-expressions]** - Automatically calculate attack roll modifiers, average damage from damage rolls, and spell save DCs.
- **[Generate Attack Dialog][generate-attack-dialog]** - Easily create weapon attack actions.
- Export your statblock to a JSON file and re-import it at a later time.
- Export your statblock to an HTML file based on the original **[statblock5e][statblock5e]** template.
- Export your statblock to a Markdown format for use in homebrew content tools such as **[Homebrewery][homebrewery]** and **[GM Binder][gmbinder]**.
- Print your statblock.

## Future Improvements

- Import monster stats from the [Open5e][open5e] API
- Generate Spellcasting (currently disabled under Special Traits)
- Buttons to toggle bold/italic text and add expressions to Special Trait/Action/Reaction/Legendary Action descriptions
- Autofill common Special Traits and Actions
- Export to [Improved Initiative][improved-initiative] (JSON format)
- Support for additional browsers (Firefox, Safari, etc.)
- Export as Image
- Offline/Local Storage
- Additional printing options, including printing 2 one-column statblocks side-by-side

## JSON Examples

Some example JSON files are available in the **[examples subdirectory][examples]**. Download these files to your local computer, then under the "Import" drop-down menu, click "Import from JSON" and select the file to import.

## Documentation

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

    npm generate-markdown-parser
    npm generate-math-parser
    npm generate-name-parser

## Dependencies

- [PEG.js][pegjs] - Parsing for Markdown emphasis, creature names, ability score modifiers, and mathematical expressions
- [DOMPurify][dompurify] - Sanitize inputted HTML tags
- [JSBeautify][jsbeautify] - Beautify HTML Export
- [Clipboard.js][clipboardjs] - Copy to clipboard functionality

## Credits

Statblock5e-creator is a fork of Valloric's awesome [statblock5e][statblock5e] template. It is also heavily inspired by [CritterDB][critterdb], another great tool for creating statblocks.

Some help popups in this application link to useful resources in [Open5e][open5e].

## Licensing

Statblock5e-creator is licensed under the [Apache License, Version 2.0][apache2].

All example monsters and stats used in this application are from the [Dungeons and Dragons Systems Reference Document (SRD) v5.1][srd], available through the Open Gaming License (OGL).

[demo]: https://frumple.github.io/statblock5e-creator
[examples]: https://github.com/Frumple/statblock5e-creator/tree/master/examples

[markdown-emphasis]: https://github.com/Frumple/statblock5e-creator/wiki/Markdown-Emphasis
[name-expressions]: https://github.com/Frumple/statblock5e-creator/wiki/Name-Expressions
[math-expressions]: https://github.com/Frumple/statblock5e-creator/wiki/Math-Expressions
[generate-attack-dialog]: https://github.com/Frumple/statblock5e-creator/wiki/Generate-Attack-Dialog

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