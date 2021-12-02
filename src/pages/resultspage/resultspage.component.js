import React, { useState, useEffect } from "react";
import RecipeBox from "../../components/recipeBox/recipeBox.component";
import "./resultspage.styles.css";
import Navbar from "../../components/navbar/navbar.component";
import axios from "axios";

import { useParams, useLocation } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";

export default function ResultsPage() {
  const location = useLocation();
  let [results, setResults] = useState([]);

  let [isLoaded, setIsloaded] = useState(false);

  let { foodType, foodCatigory, query } = useParams();

  useEffect(() => {
    //  if statement checks wheither results page should load search query results or foodCatigory/foodType results

    if (query) {
      axios
        .get(
          `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=1f1fe157&app_key=adf65b2d88f6b6e7d91211344c5b19a4`
        )
        .then(res => {
          setResults(res.data.hits);

          console.log(res);
        })
        .catch(err => console.log(err));
    } else if (query === undefined) {
      if (foodCatigory == "meal-of-day") {
        if (foodType !== "Dessert") {
          axios
            .get(
              `https://api.edamam.com/api/recipes/v2?type=public&q=${foodType}&app_id=1f1fe157&app_key=adf65b2d88f6b6e7d91211344c5b19a4%09&imageSize=REGULAR&mealType=${foodType}&Main%20course`
            )
            .then(res => {
              setResults(res.data.hits);

              console.log(res);
            })
            .catch(err => console.log(err));
        } else if (foodType === "Dessert") {
          axios
            .get(
              `https://api.edamam.com/api/recipes/v2?type=public&q=${foodType}&app_id=1f1fe157&app_key=adf65b2d88f6b6e7d91211344c5b19a4%09&imageSize=REGULAR`
            )
            .then(res => {
              setResults(res.data.hits);
            })
            .catch(err => console.log(err));
        }
      } else if (foodCatigory == "world-cuisine") {
        if (foodType) {
          axios
            .get(
              `https://api.edamam.com/api/recipes/v2?type=public&q=${foodType}&app_id=1f1fe157&app_key=adf65b2d88f6b6e7d91211344c5b19a4%09&health=vegan&cuisineType=${foodType}&imageSize=REGULAR&dishType=Main%20course`
            )
            .then(res => {
              setResults(res.data.hits);
            })
            .catch(err => console.log(err));
        }
      }
    }
  }, [foodType]);

  useEffect(() => {
    if (results.length > 0) {
      setIsloaded(true);
    }
  }, [results]);

  // console.log(location.pathname.split("/")[2].split("=")[1]);
  // console.log(location.pathname.split("/")[3].split("=")[1]);

  console.log(foodCatigory);
  console.log(foodType);
  return (
    <div className="results-page">
      <Navbar />
      <section className="recipe-container">
        {isLoaded ? (
          results.map(recipe => {
            return (
              <RecipeBox
                image={recipe.recipe.image}
                title={recipe.recipe.label}
                id={recipe.recipe.uri.substring(
                  recipe.recipe.uri.indexOf("_") + 1
                )}
                key={recipe.recipe.uri.substring(
                  recipe.recipe.uri.indexOf("_") + 1
                )}
                calories={recipe.recipe.calories}
                ingredients={recipe.recipe.ingredients.length}
              />
            );
          })
        ) : (
          <Spinner size="xl" w="250px" h="250px" />
        )}
      </section>
    </div>
  );
}
