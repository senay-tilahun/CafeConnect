import express from "express";

import apiRouter from "./routes/api.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static("frontend"));
app.use("/api", apiRouter);
app.use(express.json());

app.listen(PORT, () => console.log(`First listening on port ${PORT}`));
