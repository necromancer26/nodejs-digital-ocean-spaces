
import router from "./routes/routes.js";
import fileUpload from "express-fileupload";
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import express from "express";
import bodyParser from "body-parser"
import cors from 'cors';
const app = express();
const port = 3000;
app.use(cors())
app.use(fileUpload({limits: { fileSize: 50 * 1024 * 1024 },}));
app.use(bodyParser.json());
app.use(router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Digtalocean spaces app listening on port ${port}`);
});

