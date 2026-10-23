const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.get("/api/health", (request, response) => {
  response.json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`Backend server is running at http://localhost:${port}`);
});
