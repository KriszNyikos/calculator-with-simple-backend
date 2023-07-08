import express from "express";
import bodyParser from "body-parser";


const app = express();

const port = 3001;
import viewController from "./controllers/view-controller.js";


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/number", async (req, res) => viewController.getNumber(req, res));

app.post("/number", async (req, res) => viewController.postNumber(req, res));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
