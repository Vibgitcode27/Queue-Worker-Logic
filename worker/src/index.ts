import { createClient } from "redis";

const client = createClient();

const main = async () => {
  while (1) {
    const response = await client.brPop("problems", 0);
    console.log("This is worker response", response);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
};

async function startServer() {
  try {
    await client.connect();
    console.log("Connected to Redis");

    main();
  } catch (errro) {
    console.log("failed to connect to server");
  }
}

startServer();
