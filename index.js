import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get("/",async (req,res) => {
    try {
        const response = await axios.get("www.thecocktaildb.com/api/json/v1/1/random.php");
        res.render('index.ejs',{data: response.drinks});
    } catch (error) {
        console.log("Failed to make request: ", error.message);
        res.render("index.ejs",{error: error.message});
    }
});

app.listen(port, () => {                                                                                                                                                                                                                                                                                                                                                                       
    console.log(`Server running on port: ${port}`);
});