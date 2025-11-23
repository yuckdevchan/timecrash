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
  "native-locale": "en-GB",
  "name": {"en-GB": "Blue Skies Collection"},
  "authors": {"en-GB": ["Ethan Martin"]},
  "url": {"en-GB": "https://example.com/blue-skies-collection-palette"},
  "colors": [
    {
      "name": {"en-GB": "Sky Blue"},
      "color": {"hex": "#00b0e9", "oklch": "oklch(0.7097 0.142366 230.5858)"}
    },
    {
      "name": {"en-GB": "Ocean Blue"},
      "color": {"hex": "#006dd4", "oklch": "oklch(0.5415 0.1801 254.12)"}
    }
  ]
}
```
