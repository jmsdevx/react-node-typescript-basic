import * as express from "express";
import * as dotenv from "dotenv";
import * as bodyParser from "body-parser";

dotenv.config();

const app = express();

app.set("port", process.env.PORT || 3001);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.listen(app.get("port"), () => {
    console.log(("app is running at http://localhost:%d in %s mode"),
    app.get("port"), app.get("env"));

})

module.exports = app;