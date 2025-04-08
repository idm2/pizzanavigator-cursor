const fs = require('fs');
const path = require('path');

// Read the markdown file
const markdownFilePath = path.join(__dirname, '..', 'data', 'complete-pizza-toppings-markdown.md');
const outputFilePath = path.join(__dirname, '..', 'data', 'complete-toppings.json');

try {
  const markdownContent = fs.readFileSync(markdownFilePath, 'utf-8');
  
  // Initialize the toppings data object
  const toppingsData = {
    toppingCategories: [
      "BBQ",
      "Breakfast",
      "Cheese",
      "Chicken",
      "Classic",
      "Fungi",
      "Garlic",
      "Gourmet",
      "Healthy",
      "Italian",
      "Meat",
      "Mediterranean",
      "Pesto",
      "Seafood",
      "Spicy",
      "Sweet",
      "Vegetarian",
      "White"
    ],
    toppingRecipes: []
  };

  // Find all recipe sections using regex
  const recipeBlockRegex = /### \d+\. (.+?)(?=### \d+\.|$)/gs;
  const recipeBlocks = markdownContent.match(recipeBlockRegex);
  
  if (!recipeBlocks) {
    console.error('No recipe blocks found in the markdown file');
    process.exit(1);
  }

  // Process each recipe block
  recipeBlocks.forEach((block, index) => {
    // Extract name from the header
    const nameMatch = block.match(/### \d+\. (.+)/);
    if (!nameMatch) return;
    
    const name = nameMatch[1].trim();
    const id = `topping-${index + 1}`;
    
    // Extract tags
    const tagsMatch = block.match(/\*\*Tags:\*\* (.+)/);
    const tags = tagsMatch ? tagsMatch[1].split(', ').map(tag => tag.trim()) : [];
    
    // Extract ingredients
    const ingredientsMatch = block.match(/\*\*Ingredients:\*\*([\s\S]*?)(?=\*\*Method:\*\*)/);
    let ingredients = [];
    
    if (ingredientsMatch) {
      const ingredientsText = ingredientsMatch[1];
      // Split by line and process each ingredient
      ingredients = ingredientsText.split('\n')
        .map(line => line.trim())
        .filter(line => line.startsWith('- '))
        .map(line => {
          // Extract the ingredient text without the bullet
          const ingredientText = line.substring(2).trim();
          
          // Try to extract amount, unit, and name
          // Regex captures: 
          // 1. The amount (numeric or fraction)
          // 2. The unit (cup, tbsp, etc.) with optional plural forms
          // 3. The ingredient name (everything after)
          const ingredientPartsRegex = /^(?:(\d+(?:\/\d+)?\s*(?:-\s*\d+(?:\/\d+)?)?|\d+\.\d+)\s*(?:\([\d\w\s]+\))?\s*(cups?|tbsps?|tsps?|oz|g|ml|cloves?|leaves?|slices?|to taste)\s+)?(.+)$/i;
          
          const match = ingredientText.match(ingredientPartsRegex);
          
          if (match) {
            const amount = match[1] || "";
            const unit = match[2] || "";
            const name = match[3].replace(/,\s*(.+)$/, ''); // Remove any descriptive text after a comma
            
            return {
              amount: amount,
              unit: unit ? unit.toLowerCase().trim() : "",
              name: name.trim()
            };
          }
          
          // If the regex doesn't match, just use the whole text as the name
          return {
            amount: "",
            unit: "",
            name: ingredientText
          };
        });
    }
    
    // Extract method steps
    const methodMatch = block.match(/\*\*Method:\*\*([\s\S]*?)(?=##|$)/);
    let method = [];
    
    if (methodMatch) {
      const methodText = methodMatch[1];
      method = methodText.split('\n')
        .map(line => line.trim())
        .filter(line => /^\d+\./.test(line))
        .map(line => {
          // Remove the number and period from the beginning
          return line.replace(/^\d+\.\s*/, '').trim();
        });
    }
    
    // Create the topping recipe object
    const toppingRecipe = {
      id,
      name,
      tags,
      ingredients,
      method
    };
    
    // Add to the recipes array
    toppingsData.toppingRecipes.push(toppingRecipe);
  });

  // Write the JSON data to file
  fs.writeFileSync(outputFilePath, JSON.stringify(toppingsData, null, 2), 'utf-8');
  console.log(`Successfully converted markdown to JSON with ${toppingsData.toppingRecipes.length} recipes.`);
  
} catch (error) {
  console.error('Error processing markdown:', error);
} 