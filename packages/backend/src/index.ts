import express from "express";

const app = express();
const PORT = 3001;

app.get("/", (req, res) => {
  res.send("Hello from TypeScript Backend!");
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});