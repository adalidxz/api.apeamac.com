import express from 'express';
import dotenv from "dotenv";
import morgan from 'morgan'
const app = express();
app.use(morgan('dev'));
dotenv.config();
var bodyParser = require("body-parser");
var cors = require("cors");

app.set("PORT", process.env.PORT || 3000)
import productos from './routes/productos.routes'
import proveedores from './routes/proveedores.routes'

//MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: '25mb' }));
app.use(cors());
app.use((req, send, next) => {
    const replaceString = (object) => {
        for (const key in object) {
            if (Object.hasOwnProperty.call(object, key)) {
                const element = object[key];
                typeof (element) == "object" && replaceString(element)
                typeof (element) == "string" && (object[key] = object[key].replace(/'/g, `''`))
            }
        }
    }
    replaceString(req.body);
    Math.round10 = function (num, decimalPlaces = 0) {
        num = Math.round(num + "e" + decimalPlaces);
        return Number(num + "e" + -decimalPlaces);

    }
    next();
})

//ROUTES
app.use('/file', express.static(__dirname + "/public"))
app.use('/productos', productos);
app.use('/proveedores', proveedores);


app.get("/", (req, res) => {
    res.json({ status: true, message: "Welcome to node js" });
})


export default app

//How to we start listening to the server