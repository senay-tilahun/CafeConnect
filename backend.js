// the backend codes are very organized and categorized into main backend, routes, and database functions.
// very clear and easy to understand!!
import express from "express";

import apiRouter from "./routes/api.js";
import apiAddNewRouter from "./routes/apiAddNew.js";
import apiAboutUsRouter from "./routes/apiAboutUs.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("frontend"));
app.use("/api", apiRouter);
app.use("/apiAddNew", apiAddNewRouter);
app.use("/apiAboutUs", apiAboutUsRouter);

app.listen(PORT, () => console.log(`First listening on port ${PORT}`));
