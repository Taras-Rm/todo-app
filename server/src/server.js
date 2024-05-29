import app from "./app.js";
import dotenv from "dotenv";
import connectDatabase from "./database/index.js";
dotenv.config();

await connectDatabase();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening port: ${PORT}`);
});
