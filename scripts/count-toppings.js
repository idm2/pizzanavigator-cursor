// Script to count the toppings
const fs = require('fs');
const path = require('path');

try {
  const data = fs.readFileSync(path.join(__dirname, '..', 'data', 'toppings-data.json'), 'utf8');
  const toppingsData = JSON.parse(data);
  
  console.log(`Number of topping categories: ${toppingsData.toppingCategories.length}`);
  console.log(`Number of topping recipes: ${toppingsData.toppingRecipes.length}`);
  
  // Print each topping recipe name
  console.log('\nTopping Recipes:');
  toppingsData.toppingRecipes.forEach((recipe, index) => {
    console.log(`${index + 1}. ${recipe.name}`);
  });
} catch (err) {
  console.error('Error reading toppings data:', err);
} 