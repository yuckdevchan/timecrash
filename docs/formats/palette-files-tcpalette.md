# Timecrash Palette Files (.tcpalette)
A simple JSON format for representing swatch palettes.

## Structure
## Keys
| Key           | Value Datatype | Required? |
|---------------|----------------|-----------|
| native_locale | string         | No        |
| name          | array          | No        |
| authors       | array          | No        |
| url           | array          | No        |
| colors        | array          | No        |

## Example

Palette Object
```json
{
  "native_locale": "en_GB",
  "name": {"en_GB": "Blue Skies Collection"},
  "authors": {"en_GB": ["Ethan Martin"],
  "url": {"en_GB": "https://example.com/blue-skies-collection-palette"},
  "colors": [
    {
      "name": {"en_GB": "Sky Blue"},
      "color": {"hex": "00b0e9", "oklch": ["0.7", "0.259", "226.59"]}
    },
    {
      "name": {"en_GB": "Ocean Blue"},
      "color": {"hex": "oklch": ["0.5415", "0.1801", "254.12"]}
    }
  ]
}
```
