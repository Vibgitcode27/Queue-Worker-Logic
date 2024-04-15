import express from "express";
import { createClient } from "redis";

const app = express();
app.use(express.json());
const client = createClient();

app.post("/", async (req, res) => {
  const problemId = req.body.problemId;
  const code = req.body.code;
  const language = req.body.language;

  // push this to database

  try {
    await client.lPush(
      "problems",
      JSON.stringify({ problemId, code, language })
    );
    res.status(200).send("Submission received and stored.");
  } catch (error) {
    console.log("Redis error :", error);
    res.status(500).send("failed to store submission.");
  }
});

async function startServer() {
  try {
    await client.connect();
    console.log("Connected to Redis");

    app.listen(3000, () => {
      console.log("server is running at port 3000");
    });
  } catch (errro) {
    console.log("failed to connect to server");
  }
}

startServer();
