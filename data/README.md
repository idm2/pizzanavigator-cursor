# Pizza Navigator Data Files Guide

This guide explains the structured JSON data files used in the Pizza Navigator application and how to modify them.

## Overview of Data Files

The application uses three main JSON files for managing pizza-related data:

1. `pizza-types.json` - Information about different pizza styles, their dough properties, and cooking instructions
2. `toppings-data.json` - Comprehensive catalog of pizza toppings with recipes, ingredients, and preparation methods
3. `oven-types.json` - Details about different oven types and their optimal settings for pizza making

## How to Modify the Data Files

All files use standard JSON format and can be edited with any text editor. Follow these guidelines for making changes:

### General Guidelines

- Always maintain valid JSON format (commas between elements, quotes around keys and string values)
- Back up files before making significant changes
- Test the application after making changes to ensure everything works correctly
- Use consistent formatting and naming conventions

## Pizza Types (pizza-types.json)

This file contains detailed information about different pizza styles.

### Structure

```json
{
  "pizzaTypes": [
    {
      "id": "unique-id-for-pizza-style",
      "name": "Display Name",
      "description": "Brief description of this pizza style",
      "shape": "round|pan",
      "doughProperties": {
        "doughWeightCM": 0.0,
        "doughWeightInch": 0.0,
        "hydration": 00,
        "salt": 0,
        "oil": 0,
        "sugar": 0,
        "flourType": "Type of flour"
      },
      "cookingInstructions": {
        "conventional": {
          "temperature": "000°F (000°C)",
          "time": "00-00 minutes",
          "prepMethod": "Preparation method details"
        },
        "pizzaStone": {
          "temperature": "000°F (000°C)",
          "time": "00-00 minutes",
          "prepMethod": "Preparation method details"
        },
        "pizzaOven": {
          "temperature": "000°F (000°C)",
          "time": "00-00 minutes/seconds",
          "prepMethod": "Preparation method details"
        }
      }
    }
  ]
}
```

### Adding a New Pizza Type

1. Copy an existing pizza type object
2. Change all values to match the new pizza style
3. Ensure the `id` is unique and follows kebab-case format (lowercase with hyphens)
4. Add the object to the `pizzaTypes` array

### Editing a Pizza Type

Find the pizza type by its `id` and modify the desired properties. Key properties:

- `shape`: Should be either "round" or "pan"
- `doughProperties`: Affects dough calculations 
- `cookingInstructions`: Has separate instructions for each oven type

## Toppings (toppings-data.json)

This file contains topping recipes, ingredients, and preparation methods.

### Structure

```json
{
  "toppingCategories": [
    "Category1",
    "Category2"
  ],
  "toppingRecipes": [
    {
      "id": "topping-xx",
      "name": "Topping Name",
      "tags": [
        "Category1",
        "Category2"
      ],
      "ingredients": [
        {
          "amount": "1/2",
          "unit": "cup",
          "name": "ingredient name"
        }
      ],
      "method": [
        "Step 1 description",
        "Step 2 description"
      ]
    }
  ]
}
```

### Adding a New Topping

1. Create a new topping object with a unique `id` (format: "topping-XX" where XX is the next number)
2. Set `name` to the display name of the topping
3. Add relevant categories to the `tags` array (must match entries in the `toppingCategories` array)
4. Add ingredients with amounts, units, and names
5. Add method steps as an array of strings
6. Add the object to the `toppingRecipes` array

### Adding a New Topping Category

Add the category name to the `toppingCategories` array, then use this category in the `tags` array of toppings.

## Oven Types (oven-types.json)

This file contains information about different oven types for pizza making.

### Structure

```json
{
  "ovenTypes": [
    {
      "id": "unique-oven-id",
      "name": "Display Name",
      "description": "Description of the oven type",
      "temperatureRanges": {
        "round": {
          "min": "000°F (000°C)",
          "max": "000°F (000°C)",
          "recommended": "000°F (000°C)"
        },
        "pan": {
          "min": "000°F (000°C)",
          "max": "000°F (000°C)",
          "recommended": "000°F (000°C)"
        }
      },
      "generalInstructions": [
        "Instruction 1",
        "Instruction 2"
      ],
      "pros": [
        "Pro 1",
        "Pro 2"
      ],
      "cons": [
        "Con 1",
        "Con 2"
      ]
    }
  ]
}
```

### Adding a New Oven Type

1. Create a new oven type object with a unique `id` (using kebab-case)
2. Provide temperature ranges for both round and pan pizzas
3. Add general instructions as an array of strings
4. List the pros and cons
5. Add the object to the `ovenTypes` array

## Common Issues and Troubleshooting

- **Application not showing changes**: Make sure you've saved the file and reload the application
- **JSON syntax errors**: Validate your JSON using a tool like [JSONLint](https://jsonlint.com/)
- **Missing or duplicate IDs**: Ensure each item has a unique ID
- **Missing information**: The application may fail to render items with missing required fields

## Best Practices

1. Keep descriptions concise but informative
2. Use consistent terminology across all data files
3. For temperatures, include both Fahrenheit and Celsius
4. For pizza types, ensure the shape is accurately specified as it affects many calculations
5. When adding new items, reference existing ones for formatting consistency 