#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Setup paths
const dataDir = path.join(__dirname, '..', 'data');
const pizzaTypesPath = path.join(dataDir, 'pizza-types.json');
const toppingsDataPath = path.join(dataDir, 'toppings-data.json');
const ovenTypesPath = path.join(dataDir, 'oven-types.json');

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Main function to manage data files
 */
function main() {
  console.log('Pizza Navigator Data Management Tool');
  console.log('-----------------------------------------');
  console.log('Select an option:');
  console.log('1. Validate data files');
  console.log('2. Add a new pizza type');
  console.log('3. Add a new topping');
  console.log('4. Add a new topping category');
  console.log('5. List all pizza types');
  console.log('6. List all topping categories');
  console.log('7. Create backup of data files');
  console.log('8. Exit');

  rl.question('Enter your choice (1-8): ', (answer) => {
    switch (answer.trim()) {
      case '1':
        validateDataFiles();
        break;
      case '2':
        addNewPizzaType();
        break;
      case '3':
        addNewTopping();
        break;
      case '4':
        addNewToppingCategory();
        break;
      case '5':
        listPizzaTypes();
        break;
      case '6':
        listToppingCategories();
        break;
      case '7':
        createBackups();
        break;
      case '8':
        console.log('Exiting...');
        rl.close();
        return;
      default:
        console.log('Invalid option. Please try again.');
        main();
        return;
    }
  });
}

/**
 * Validate all data files
 */
function validateDataFiles() {
  console.log('\nValidating data files...');
  let allValid = true;

  // Validate Pizza Types
  try {
    const pizzaTypes = JSON.parse(fs.readFileSync(pizzaTypesPath, 'utf8'));
    
    if (!pizzaTypes.pizzaTypes || !Array.isArray(pizzaTypes.pizzaTypes)) {
      console.log('❌ pizza-types.json: Invalid format. Missing pizzaTypes array.');
      allValid = false;
    } else {
      // Check for required fields in each pizza type
      const pizzaTypeIds = new Set();
      let hasErrors = false;

      pizzaTypes.pizzaTypes.forEach((pizzaType, index) => {
        if (!pizzaType.id) {
          console.log(`❌ Pizza type at index ${index} is missing an id.`);
          hasErrors = true;
        } else if (pizzaTypeIds.has(pizzaType.id)) {
          console.log(`❌ Duplicate pizza type id: ${pizzaType.id}`);
          hasErrors = true;
        } else {
          pizzaTypeIds.add(pizzaType.id);
        }

        // Check other required fields
        if (!pizzaType.name) console.log(`❌ Pizza type ${pizzaType.id || index} is missing a name.`);
        if (!pizzaType.shape) console.log(`❌ Pizza type ${pizzaType.id || index} is missing a shape.`);
        if (!pizzaType.doughProperties) console.log(`❌ Pizza type ${pizzaType.id || index} is missing doughProperties.`);
        if (!pizzaType.cookingInstructions) console.log(`❌ Pizza type ${pizzaType.id || index} is missing cookingInstructions.`);
      });

      if (!hasErrors) {
        console.log(`✅ pizza-types.json: Valid (${pizzaTypes.pizzaTypes.length} pizza types)`);
      } else {
        allValid = false;
      }
    }
  } catch (error) {
    console.log(`❌ pizza-types.json: ${error.message}`);
    allValid = false;
  }

  // Validate Toppings Data
  try {
    const toppingsData = JSON.parse(fs.readFileSync(toppingsDataPath, 'utf8'));
    
    if (!toppingsData.toppingCategories || !Array.isArray(toppingsData.toppingCategories)) {
      console.log('❌ toppings-data.json: Invalid format. Missing toppingCategories array.');
      allValid = false;
    } else if (!toppingsData.toppingRecipes || !Array.isArray(toppingsData.toppingRecipes)) {
      console.log('❌ toppings-data.json: Invalid format. Missing toppingRecipes array.');
      allValid = false;
    } else {
      // Check for required fields in each topping recipe
      const toppingIds = new Set();
      let hasErrors = false;

      toppingsData.toppingRecipes.forEach((topping, index) => {
        if (!topping.id) {
          console.log(`❌ Topping recipe at index ${index} is missing an id.`);
          hasErrors = true;
        } else if (toppingIds.has(topping.id)) {
          console.log(`❌ Duplicate topping recipe id: ${topping.id}`);
          hasErrors = true;
        } else {
          toppingIds.add(topping.id);
        }

        // Check other required fields
        if (!topping.name) console.log(`❌ Topping recipe ${topping.id || index} is missing a name.`);
        if (!topping.tags || !Array.isArray(topping.tags)) console.log(`❌ Topping recipe ${topping.id || index} is missing tags.`);
        if (!topping.ingredients || !Array.isArray(topping.ingredients)) console.log(`❌ Topping recipe ${topping.id || index} is missing ingredients.`);
        if (!topping.method || !Array.isArray(topping.method)) console.log(`❌ Topping recipe ${topping.id || index} is missing method.`);

        // Check if all tags are valid categories
        if (topping.tags) {
          topping.tags.forEach(tag => {
            if (!toppingsData.toppingCategories.includes(tag)) {
              console.log(`❌ Topping recipe ${topping.id || index} has invalid tag: ${tag}`);
              hasErrors = true;
            }
          });
        }
      });

      if (!hasErrors) {
        console.log(`✅ toppings-data.json: Valid (${toppingsData.toppingCategories.length} categories, ${toppingsData.toppingRecipes.length} recipes)`);
      } else {
        allValid = false;
      }
    }
  } catch (error) {
    console.log(`❌ toppings-data.json: ${error.message}`);
    allValid = false;
  }

  // Validate Oven Types
  try {
    const ovenTypes = JSON.parse(fs.readFileSync(ovenTypesPath, 'utf8'));
    
    if (!ovenTypes.ovenTypes || !Array.isArray(ovenTypes.ovenTypes)) {
      console.log('❌ oven-types.json: Invalid format. Missing ovenTypes array.');
      allValid = false;
    } else {
      // Check for required fields in each oven type
      const ovenTypeIds = new Set();
      let hasErrors = false;

      ovenTypes.ovenTypes.forEach((ovenType, index) => {
        if (!ovenType.id) {
          console.log(`❌ Oven type at index ${index} is missing an id.`);
          hasErrors = true;
        } else if (ovenTypeIds.has(ovenType.id)) {
          console.log(`❌ Duplicate oven type id: ${ovenType.id}`);
          hasErrors = true;
        } else {
          ovenTypeIds.add(ovenType.id);
        }

        // Check other required fields
        if (!ovenType.name) console.log(`❌ Oven type ${ovenType.id || index} is missing a name.`);
        if (!ovenType.description) console.log(`❌ Oven type ${ovenType.id || index} is missing a description.`);
        if (!ovenType.temperatureRanges) console.log(`❌ Oven type ${ovenType.id || index} is missing temperatureRanges.`);
      });

      if (!hasErrors) {
        console.log(`✅ oven-types.json: Valid (${ovenTypes.ovenTypes.length} oven types)`);
      } else {
        allValid = false;
      }
    }
  } catch (error) {
    console.log(`❌ oven-types.json: ${error.message}`);
    allValid = false;
  }

  if (allValid) {
    console.log('\n✅ All data files are valid!');
  } else {
    console.log('\n❌ Some data files have validation errors. Please fix them before continuing.');
  }

  // Return to main menu
  console.log('');
  main();
}

/**
 * Add a new pizza type to pizza-types.json
 */
function addNewPizzaType() {
  console.log('\nAdding a new pizza type...');
  console.log('Please provide the following information:');

  // Load existing pizza types
  let pizzaTypes;
  try {
    pizzaTypes = JSON.parse(fs.readFileSync(pizzaTypesPath, 'utf8'));
  } catch (error) {
    console.log(`❌ Error reading pizza-types.json: ${error.message}`);
    main();
    return;
  }

  // Create a new pizza type object
  const newPizzaType = {
    id: '',
    name: '',
    description: '',
    shape: '',
    doughProperties: {
      doughWeightCM: 0,
      doughWeightInch: 0,
      hydration: 0,
      salt: 0,
      oil: 0,
      sugar: 0,
      flourType: ''
    },
    cookingInstructions: {
      conventional: {
        temperature: '',
        time: '',
        prepMethod: ''
      },
      pizzaStone: {
        temperature: '',
        time: '',
        prepMethod: ''
      },
      pizzaOven: {
        temperature: '',
        time: '',
        prepMethod: ''
      }
    }
  };

  // Get pizza type ID
  rl.question('ID (kebab-case, e.g., sicilian-thin): ', (id) => {
    // Check if ID already exists
    if (pizzaTypes.pizzaTypes.some(type => type.id === id)) {
      console.log(`❌ A pizza type with ID "${id}" already exists.`);
      main();
      return;
    }

    newPizzaType.id = id;

    // Get pizza type name
    rl.question('Name (display name): ', (name) => {
      newPizzaType.name = name;

      // Get description
      rl.question('Description: ', (description) => {
        newPizzaType.description = description;

        // Get shape
        rl.question('Shape (round or pan): ', (shape) => {
          if (shape !== 'round' && shape !== 'pan') {
            console.log('❌ Shape must be either "round" or "pan".');
            main();
            return;
          }

          newPizzaType.shape = shape;

          // Get dough properties
          rl.question('Dough weight per square cm: ', (doughWeightCM) => {
            newPizzaType.doughProperties.doughWeightCM = parseFloat(doughWeightCM);

            rl.question('Dough weight per square inch: ', (doughWeightInch) => {
              newPizzaType.doughProperties.doughWeightInch = parseFloat(doughWeightInch);

              rl.question('Hydration (%): ', (hydration) => {
                newPizzaType.doughProperties.hydration = parseInt(hydration, 10);

                rl.question('Salt (%): ', (salt) => {
                  newPizzaType.doughProperties.salt = parseInt(salt, 10);

                  rl.question('Oil (%): ', (oil) => {
                    newPizzaType.doughProperties.oil = parseInt(oil, 10);

                    rl.question('Sugar (%): ', (sugar) => {
                      newPizzaType.doughProperties.sugar = parseInt(sugar, 10);

                      rl.question('Flour type: ', (flourType) => {
                        newPizzaType.doughProperties.flourType = flourType;

                        // Get cooking instructions
                        console.log('\nCooking instructions for conventional oven:');
                        rl.question('Temperature: ', (convTemp) => {
                          newPizzaType.cookingInstructions.conventional.temperature = convTemp;

                          rl.question('Time: ', (convTime) => {
                            newPizzaType.cookingInstructions.conventional.time = convTime;

                            rl.question('Prep method: ', (convPrep) => {
                              newPizzaType.cookingInstructions.conventional.prepMethod = convPrep;

                              console.log('\nCooking instructions for pizza stone:');
                              rl.question('Temperature: ', (stoneTemp) => {
                                newPizzaType.cookingInstructions.pizzaStone.temperature = stoneTemp;

                                rl.question('Time: ', (stoneTime) => {
                                  newPizzaType.cookingInstructions.pizzaStone.time = stoneTime;

                                  rl.question('Prep method: ', (stonePrep) => {
                                    newPizzaType.cookingInstructions.pizzaStone.prepMethod = stonePrep;

                                    console.log('\nCooking instructions for pizza oven:');
                                    rl.question('Temperature: ', (ovenTemp) => {
                                      newPizzaType.cookingInstructions.pizzaOven.temperature = ovenTemp;

                                      rl.question('Time: ', (ovenTime) => {
                                        newPizzaType.cookingInstructions.pizzaOven.time = ovenTime;

                                        rl.question('Prep method: ', (ovenPrep) => {
                                          newPizzaType.cookingInstructions.pizzaOven.prepMethod = ovenPrep;

                                          // Add the new pizza type to the array
                                          pizzaTypes.pizzaTypes.push(newPizzaType);

                                          // Save the updated pizza types
                                          fs.writeFileSync(pizzaTypesPath, JSON.stringify(pizzaTypes, null, 2));
                                          console.log(`✅ Added new pizza type: ${newPizzaType.name} (${newPizzaType.id})`);
                                          main();
                                        });
                                      });
                                    });
                                  });
                                });
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
}

/**
 * Add a new topping to toppings-data.json
 */
function addNewTopping() {
  console.log('\nAdding a new topping...');
  console.log('Please provide the following information:');

  // Load existing toppings data
  let toppingsData;
  try {
    toppingsData = JSON.parse(fs.readFileSync(toppingsDataPath, 'utf8'));
  } catch (error) {
    console.log(`❌ Error reading toppings-data.json: ${error.message}`);
    main();
    return;
  }

  // Get the next available topping ID
  const existingIds = toppingsData.toppingRecipes.map(recipe => recipe.id);
  let nextId = 1;
  while (existingIds.includes(`topping-${nextId}`)) {
    nextId++;
  }
  const newId = `topping-${nextId}`;

  // Create a new topping recipe object
  const newTopping = {
    id: newId,
    name: '',
    tags: [],
    ingredients: [],
    method: []
  };

  // Get topping name
  rl.question('Name: ', (name) => {
    newTopping.name = name;

    console.log('\nAvailable categories:');
    toppingsData.toppingCategories.forEach((category, index) => {
      console.log(`${index + 1}. ${category}`);
    });

    // Get tags (categories)
    rl.question('Enter category numbers separated by commas (e.g., 1,3,5): ', (categoryInput) => {
      const categoryIndices = categoryInput.split(',').map(idx => parseInt(idx.trim(), 10) - 1);
      newTopping.tags = categoryIndices
        .filter(idx => idx >= 0 && idx < toppingsData.toppingCategories.length)
        .map(idx => toppingsData.toppingCategories[idx]);

      console.log('\nNow adding ingredients (enter empty line when done)');
      const addIngredient = () => {
        rl.question('Amount (e.g., 1/2): ', (amount) => {
          if (amount.trim() === '') {
            // Done adding ingredients, proceed to method steps
            console.log('\nNow adding method steps (enter empty line when done)');
            const addMethodStep = () => {
              rl.question('Step: ', (step) => {
                if (step.trim() === '') {
                  // Done adding method steps, save the new topping
                  toppingsData.toppingRecipes.push(newTopping);
                  fs.writeFileSync(toppingsDataPath, JSON.stringify(toppingsData, null, 2));
                  console.log(`✅ Added new topping: ${newTopping.name} (${newTopping.id})`);
                  main();
                } else {
                  newTopping.method.push(step);
                  addMethodStep(); // Add next step
                }
              });
            };
            addMethodStep();
          } else {
            rl.question('Unit (e.g., cup, tbsp, or empty): ', (unit) => {
              rl.question('Ingredient name: ', (name) => {
                newTopping.ingredients.push({
                  amount,
                  unit,
                  name
                });
                addIngredient(); // Add next ingredient
              });
            });
          }
        });
      };
      addIngredient();
    });
  });
}

/**
 * Add a new topping category to toppings-data.json
 */
function addNewToppingCategory() {
  console.log('\nAdding a new topping category...');

  // Load existing toppings data
  let toppingsData;
  try {
    toppingsData = JSON.parse(fs.readFileSync(toppingsDataPath, 'utf8'));
  } catch (error) {
    console.log(`❌ Error reading toppings-data.json: ${error.message}`);
    main();
    return;
  }

  rl.question('New category name: ', (category) => {
    if (toppingsData.toppingCategories.includes(category)) {
      console.log(`❌ Category "${category}" already exists.`);
      main();
      return;
    }

    toppingsData.toppingCategories.push(category);
    fs.writeFileSync(toppingsDataPath, JSON.stringify(toppingsData, null, 2));
    console.log(`✅ Added new topping category: ${category}`);
    main();
  });
}

/**
 * List all pizza types
 */
function listPizzaTypes() {
  console.log('\nListing all pizza types...');

  try {
    const pizzaTypes = JSON.parse(fs.readFileSync(pizzaTypesPath, 'utf8'));
    
    if (!pizzaTypes.pizzaTypes || !Array.isArray(pizzaTypes.pizzaTypes)) {
      console.log('❌ Invalid pizza-types.json format.');
      main();
      return;
    }

    console.log(`Found ${pizzaTypes.pizzaTypes.length} pizza types:\n`);
    pizzaTypes.pizzaTypes.forEach((type, index) => {
      console.log(`${index + 1}. ${type.name} (${type.id}) - ${type.description || 'No description'}`);
      console.log(`   Shape: ${type.shape}`);
      console.log(`   Flour type: ${type.doughProperties.flourType}`);
      console.log(`   Hydration: ${type.doughProperties.hydration}%`);
      console.log('');
    });
  } catch (error) {
    console.log(`❌ Error reading pizza-types.json: ${error.message}`);
  }

  main();
}

/**
 * List all topping categories
 */
function listToppingCategories() {
  console.log('\nListing all topping categories...');

  try {
    const toppingsData = JSON.parse(fs.readFileSync(toppingsDataPath, 'utf8'));
    
    if (!toppingsData.toppingCategories || !Array.isArray(toppingsData.toppingCategories)) {
      console.log('❌ Invalid toppings-data.json format.');
      main();
      return;
    }

    console.log(`Found ${toppingsData.toppingCategories.length} topping categories:\n`);
    toppingsData.toppingCategories.forEach((category, index) => {
      // Count recipes in this category
      const recipesInCategory = toppingsData.toppingRecipes.filter(recipe => 
        recipe.tags && recipe.tags.includes(category)
      ).length;
      
      console.log(`${index + 1}. ${category} (${recipesInCategory} recipes)`);
    });
    console.log('');

    // Show total number of topping recipes
    console.log(`Total topping recipes: ${toppingsData.toppingRecipes.length}\n`);
  } catch (error) {
    console.log(`❌ Error reading toppings-data.json: ${error.message}`);
  }

  main();
}

/**
 * Create backups of data files
 */
function createBackups() {
  console.log('\nCreating backups of data files...');
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  
  try {
    // Back up pizza-types.json
    if (fs.existsSync(pizzaTypesPath)) {
      const backupPath = path.join(dataDir, `pizza-types.backup.${timestamp}.json`);
      fs.copyFileSync(pizzaTypesPath, backupPath);
      console.log(`✅ Backed up pizza-types.json to ${path.basename(backupPath)}`);
    } else {
      console.log('⚠️ pizza-types.json does not exist, no backup created.');
    }
    
    // Back up toppings-data.json
    if (fs.existsSync(toppingsDataPath)) {
      const backupPath = path.join(dataDir, `toppings-data.backup.${timestamp}.json`);
      fs.copyFileSync(toppingsDataPath, backupPath);
      console.log(`✅ Backed up toppings-data.json to ${path.basename(backupPath)}`);
    } else {
      console.log('⚠️ toppings-data.json does not exist, no backup created.');
    }
    
    // Back up oven-types.json
    if (fs.existsSync(ovenTypesPath)) {
      const backupPath = path.join(dataDir, `oven-types.backup.${timestamp}.json`);
      fs.copyFileSync(ovenTypesPath, backupPath);
      console.log(`✅ Backed up oven-types.json to ${path.basename(backupPath)}`);
    } else {
      console.log('⚠️ oven-types.json does not exist, no backup created.');
    }
  } catch (error) {
    console.log(`❌ Error creating backups: ${error.message}`);
  }
  
  main();
}

// Start the program
main();

// Handle SIGINT (Ctrl+C)
rl.on('SIGINT', () => {
  console.log('\nExiting...');
  rl.close();
  process.exit(0);
}); 