import { useState,useEffect,useRef } from "react"
import IngredientsList from "./ingredientsList"
import {getRecipeFromMistral} from "../ai.js"
import RoboRecipe from "./RoboRecipe.jsx"

export default function Main(){
    const [ingredients,setIngredients] = useState([])

    function addIngredient(formData){
            const newIngredient = formData.get("ingredient")
            setIngredients(prevIngredient=>[...prevIngredient,newIngredient])
    }

    const [recipe, setRecipe] = useState("")
    const recipeSection = useRef(null)

    useEffect(()=>{
        if(recipe !== "" && recipeSection !==null){
            recipeSection.current.scrollIntoView({behavior: "smooth"})
        }
    },[recipe])

    async function getRecipe(){
        const recipeMarkdown = await getRecipeFromMistral(ingredients)
        setRecipe(recipeMarkdown)
    }
    return(
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input 
                    type="text" 
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>

            {ingredients.length > 0 &&
                <IngredientsList
                    ref={recipeSection}
                    ingredients={ingredients}
                    getRecipe={getRecipe}
                />
            }
            {recipe && <RoboRecipe recipe={recipe} />}
        </main>
    )
}