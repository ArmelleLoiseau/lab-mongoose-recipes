const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(async () => {
    // Run your code here, after you have insured that the connection was made
    // createARecipe(
    //   "Mejadra",
    //   "Amateur Chef",
    //   [
    //     "oil",
    //     "4 onions",
    //     "250g green or brown lentils",
    //     "2 tsp cumin seeds",
    //     "1½ tbsp coriander seeds",
    //     "200g basmati rice",
    //     "½ tsp ground turmeric",
    //     "1½ tsp ground allspice",
    //     "1½ tsp ground cinnamon",
    //     "1 tsp sugar",
    //     "Salt and black pepper",
    //     "350ml water",
    //   ],
    //   "palestinian",
    //   "main_course",
    //   "https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2010/9/27/1285595034774/Mejadra-recipe-006.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=c9a57f6fee2c16a628070ba4bb436695",
    //   45,
    //   "Yotam Ottolenghi"
    // );
    try {
      const inserted = await Recipe.insertMany(data);
      console.log(inserted.forEach((recipe) => console.log(recipe.title)));
      const updated = await Recipe.findOneAndUpdate(
        { title: "Rigatoni alla Genovese" },
        { duration: 100 },
        { new: true }
      );
      console.log("The updated recipe is", updated.title);
      const deleted = await Recipe.deleteOne({
        title: "Orange and Milk-Braised Pork Carnitas",
      });
      console.log(
        `I decided to save Private Carrot cake and sacrificed the Pork Carnitas instead`
      );
    } catch (err) {
      console.error(err);
    }
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  })
  .then(() => mongoose.disconnect(() => console.log("I'm done here")))
  .catch((err) => {
    console.error("Error disconnecting");
  });

// function createARecipe(
//   title,
//   level,
//   ingredients,
//   cuisine,
//   dishType,
//   image,
//   duration,
//   creator,
//   created
// ) {
//   Recipe.create({
//     title,
//     level,
//     ingredients,
//     cuisine,
//     dishType,
//     image,
//     duration,
//     creator,
//     created,
//   })
//     .then((recipe) => {
//       console.log(`Today's menu is: ${recipe.title}`);
//     })
//     .catch((err) => {
//       console.log("Oooops, something went terribly wrong !");
//       console.error(err);
//     });
// }
