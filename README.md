# Interactive Creature Statblock Creator for D&D 5th Edition

### Live Demo: [https://frumple.github.io/statblock5e-creator][demo]

A visual web interface for creating creature statblocks that are similar in appearance to the official blocks from the Dungeons and Dragons 5th Edition Monster Manual.

## Features

- Supports **one-column** or **two-column** formats. Two-column statblock heights can also be adjusted manually.
- Automatically calculates hit points based on hit die and constitution, or allows you to enter your own custom hit points.
- Automatically calculates saving throws and skills based on ability modifiers and proficiency bonus, or allows you to enter your own custom modifiers.
- In the descriptions for Special Traits, Actions, Reactions, and Legendary Actions:
  - **[Markdown Emphasis](#markdown-emphasis)** can be used to make text **bold** and/or *italic*.
  - **[Name Expressions](#name-expressions)** can be used to inject the creature's full or short name into the description where needed.
  - **[Math Expressions](#math-expressions)** can be used to automatically calculate attack roll modifiers, and average damage from damage rolls.
- Weapon attack actions can be easily created using the **Generate Attack** dialog.
- Statblocks can be printed, exported to an HTML file, or exported to a Markdown format for use in [Homebrewery][homebrewery].

## Markdown Emphasis

*Available only in descriptions for Special Traits, Actions, Reactions, and Legendary Actions, and in custom text for Armor Class, Speed, and Senses.*

You can surround text with asterisks and/or underscores to make it **bold** and/or *italic*:

| Formatting | Example | Result |
| ---------- | ------- | ------ |
| single asterisks         | `*Melee Weapon Attack:* +2 to hit`                       | *Melee Weapon Attack:* +2 to hit                       |
| single underscores       | `Cantrips (at will): _light, sacred flame, thaumaturgy_` | Cantrips (at will): _light, sacred flame, thaumaturgy_ |
| double asterisks         | `\**Type 1:\** Human body with snake head`               | **Type 1:** Human body with snake head                 |
| double underscores       | `\__Type 2:\__ Human head and body with snakes for arms` | __Type 2:__ Human head and body with snakes for arms   |
| asterisks in underscores | `Here are some __*asterisks* in underscores__`           | Here are some __*asterisks* in underscores__           |
| underscores in asterisks | `Here are some *__underscores__ in asterisks*`           | Here are some *__underscores__ in asterisks*           |

## Name Expressions

*Available only in descriptions for Special Traits, Actions, Reactions, and Legendary Actions.*

In the first section where you specify the creature's full name, you can also optionally specify a **short name**, and indicate whether the creature's name is a **proper noun**.

**TODO: Image of first section here**

### Short Name

The **short name** is typically one or two words used to refer to the creature in the descriptions of its special traits, actions, reactions, and legendary actions. In these descriptions, all instances of **`[name]`** are substituted with the short name when displayed. If the short name is blank, the creature's full name will be used instead.

Alternatively, you can use **`[fullname]`**, which is always replaced with the creature's full name. However, `[name]` should suffice for almost all use cases.

### Proper Noun

Check the **proper noun** box if the statblock describes a unique individual or creature.

If the proper noun box is **NOT** checked:
- The word "the" will precede all instances of `[name]` and `[fullname]`.
- The word "The" will begin with a capital letter if `[name]` or `[fullname]` is used at the beginning of a sentence.
- Any capitalization in the short name or full name will be removed.

For example, if the creature's short name is "**Mind Flayer**":

| Original Text | Displayed Text |
| ------------- | -------------- |
| `[name] has advantage...` | The mind flayer has advantage... |
| `...within 30 feet of [name].` | ...within 30 feet of the mind flayer. |

Otherwise, if the proper noun box **IS** checked:
- The word "the" will not appear.
- Capitalization of the short name and full name will be preserved.

### Usage Examples for Name Expressions

| Full Name | Short Name | Proper Noun? | Original Text and Displayed Text |
| --------- | ---------- | ------------ | -------------------------------- |
| Ancient Red Dragon | dragon | No | `[name] can take 3 legendary actions...`<br /><br />The dragon can take 3 legendary actions... |
| Gelatinous Cube | cube | No | `...a creature that does so is subjected to [name]'s Engulf...`<br /><br />...a creature that does so is subjected to the cube's Engulf... |
| Orc War Chief | orc | No | `As a bonus action, [name] can move up to its speed...`<br /><br />As a bonus action, the orc can move up to its speed... |
| Rust Monster | rust monster | No | `Nonmagical ammunition made of metal that hits [name] is destroyed after dealing damage.`<br /><br />Nonmagical ammunition made of metal that hits the rust monster is destroyed after dealing damage. |
| Casper the Friendly Ghost | Casper | Yes | `...the target is immune to [name]'s Horrifying Visage...`<br /><br />...the target is immune to Casper's Horrifying Visage... |
| Drizzt Do'urden | Drizzt | Yes | `...within 30 feet of [name].`<br /><br />...within 30 feet of Drizzt. |
| Lady Kima of Vord | Lady Kima | Yes | `[name] can invoke her Divine Smite...`<br /><br />Lady Kima can invoke her Divine Smite... |
| Tiamat | *(blank)* | Yes | `[name] can innately cast *divine ward*...`<br /><br />Tiamat can innately cast *divine ward*... |

Please note the use of name expressions is completely optional; you can certainly enter the creature's actual short/full names into the descriptions with no immediate issues. However, if you ever want to change the short/full name at a later time, or if you ever want to copy traits or actions into another statblock, then using name expressions will make these operations a lot easier than having to manually change every instance of the short/full name in the descriptions.

## Math Expressions

*Available only in descriptions for Special Traits, Actions, Reactions, and Legendary Actions.*

### Basic Math Expressions

Basic math expressions consist of a series of **operands** and **operators** within square brackets, allowing for the addition and subtraction of such operands.

Supported operands include:
- **variables** (e.g. ability modifiers represented by `str`, `dex`, etc., and proficiency bonus represented by `prof`)
- **integers** (e.g. 12, -3, or 0)

Supported operators include:
- **`+` plus sign** for addition
- **`-` minus sign** for subtraction

For example. if the creature's strength modifier is **+4** and its proficiency bonus is **+2**:
```
[str + prof - 3]
```
will be calculated as **4 + 2 - 3**, resulting in a final answer of **3**.

Note that whitespace between the operands and operators is optional, meaning that `[str+prof-3]` is also a valid and equivalent math expression.

### Variables

Here are a list of variables that are currently supported in math expressions:

| Variable | Description | Note |
| -------- | ----------- | ---- |
| **`str`** | Strength Modifier     |
| **`dex`** | Dexterity Modifier    |
| **`con`** | Constitution Modifier |
| **`int`** | Intelligence Modifier |
| **`wis`** | Wisdom Modifier       |
| **`cha`** | Charisma Modifier     |
| **`fin`** | Finesse Modifier      | For use in finesse weapons. Equal to strength or dexterity modifier, whichever is highest. |
| **`prof`**   | Proficiency Bonus     |

### Modifier Expressions: mod[...]

One limitation of basic math expressions is that resulting positive numbers will appear without a positive sign (e.g. **5** instead of **+5**). The positive sign is needed to accurately show attack roll modifiers, so to make it appear, simply add the word **`mod`** before the square brackets: **`mod[...]`**

For example, assuming again that the creature's strength modifier is **+4** and its proficiency bonus is **+2**:

```
*Melee Weapon Attack:* mod[str + prof - 3] to hit
```

will appear as

> _Melee Weapon Attack:_ +3 to hit

### Damage Expressions: dmg[...]

For damage rolls, you can use damage expressions to automatically calculate the average damage. All damage expressions begin with the word **`dmg`** before the square brackets, and the **first operand within the square brackets must be a dice operand (d8, 2d6, etc.).** Subsequent operands can be variables or integers that are added or subtracted from the dice result.

For example, if the creature's dexterity modifier is **+3**, then:

```
dmg[1d8 + dex + 2] slashing damage
```

results in

> 9 (1d8 + 5) slashing damage

This is because since the average damage of 1d8 is 4.5 (rounded down to 4), then **4 + 3 + 2** equals **9** for the total average damage.

## Development Setup

First, install all dependencies:

    npm install

### Tests

This application has an extensive suite of automated [Jest](jest) test cases that verify the behaviour of each section in the statblock.

Run all the tests with:

	npm test


## Future Improvements

- Generate Spellcasting (currently disabled under Special Traits)
- Export as Image
- Import/Export as JSON
- HTML5 Offline Storage

## Dependencies

- [PEG.js][pegjs] - Parsing for Markdown emphasis, creature names, ability score modifiers, and mathematical expressions
- [DOMPurify][dompurify] - Sanitize inputted HTML tags
- [JSBeautify][jsbeautify] - Beautify HTML Export
- [Clipboard.js][clipboardjs] - Copy to clipboard functionality

## Credits and Background

Statblock5e-creator is a fork of Valloric's awesome [statblock5e][statblock5e] template. It is also heavily inspired by [CritterDB][critterdb], another great tool for creating statblocks.

I wrote this project in pure Javascript as a means of learning basic web technologies. While I could have gone with a typical framework like Angular or React, instead I wanted to build things from scratch and learn how they work behind the scenes.

## License

This project is licensed under the [Apache License, Version 2.0][apache2].

[demo]: https://frumple.github.io/statblock5e-creator

[jest]: https://jestjs.io
[pegjs]: https://pegjs.org
[dompurify]: https://github.com/cure53/DOMPurify
[jsbeautify]: https://github.com/beautify-web/js-beautify
[clipboardjs]: https://clipboardjs.com

[statblock5e]: https://github.com/valloric/statblock5e
[critterdb]: https://critterdb.com
[homebrewery]: https://homebrewery.naturalcrit.com

[apache2]: http://www.apache.org/licenses/LICENSE-2.0.html