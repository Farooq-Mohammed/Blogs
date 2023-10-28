import grid from "gridfs-stream";
import mongoose from "mongoose";

const BASE_URL = "http://localhost:8080";

let gfs, gridfsBucket;
const conn = mongoose.connection;
conn.once("open", () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "fs",
  });
  gfs = grid(conn.db, mongoose.mongo);
  gfs.collection("fs");
});

export const uploadImage = (req, res) => {
  try {
    if (!req.file)
      return res.status(404).json("Something wrong with file, File not found");

    const imageUrl = `${BASE_URL}/file/${req.file.filename}`;
    res.status(200).json({ imageUrl });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "cannot complete image upload operation", error });
  }
};

export const getImage = async (req, res) => {
  try {
    const readStream = gridfsBucket.openDownloadStreamByName(
      req.params.filename
    );
    readStream.pipe(res);
  } catch (error) {
    return res.status(500).json({ msg: "Unable to get image", error });
  }
};
