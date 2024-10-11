import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3000;
const API_URL = "https://thecocktaildb.com/api/json/v1/1";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get("/",async (req,res) => {
    try {
        const response = await axios.get(API_URL + "/random.php");
        const drink = response.data.drinks[0];
        var ingretientsList = [];
        for(var i=0; i<14; i++){
            let ingredient = drink["strIngredient" + (i+1)];
            if(ingredient){
                ingretientsList.push(ingredient);
            }
        }
        console.log("🚀 ~ app.get ~ response:", drink); 
        console.log("🚀 ~ app.get ~ ingretientsList:", ingretientsList);
        res.render('index.ejs',{cocktail: response.data.drinks[0],ingretientsList : ingretientsList});
    } catch (error) {
        console.log("Failed to make request: ", error.message);
        res.render("index.ejs",{error: error.message});
    }
});

app.listen(port, () => {                                                                                                                                                                                                                                                                                                                                                                       
    console.log(`Server running on port: ${port}`);
});