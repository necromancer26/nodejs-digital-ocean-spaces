import express from "express";
import { deleteFileFromS3, getFileFromS3, uploadFileToS3 } from "../services/objectStorageServices.js";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();
const getFileExtension = (fileName) => "." + fileName.split(".").pop();
/* Upload a file */
router.post("/upload", async (req, res, next) => {
  try {
    const { file } = req.files;

    const folder = "folder/";// specifies folder in where the file is going to be
    const extension = getFileExtension(file.name); // getting extension of the file from file name
    const fileName = uuidv4() + extension; // to ensure unique file name
    const fullPath = folder + fileName;

    const link = await uploadFileToS3(file, fullPath);
    res.status(200).send(link);
  } catch (error) {
    console.error(error);
  }
});
/* Delete a file from the full link of the file send to backend a body in this structure : {link:"https://yourlink"} */
router.delete("/object-storage/",async (req, res, next) => {
  const { link } = req.body;
  await deleteFileFromS3(link);
  // console.debug(req.body.link);
  res.send("hello server up and running");
});
/* GET a file from digitalocean using the full link */
router.put("/object-storage", async (req, res, next) => {
try {
  const {link}=req.body
  const data= await getFileFromS3(link)
  console.debug(data);
  res.status(200).send(data);
} catch (error) {
  res.status(500).send(error)
}
});

export default router;
