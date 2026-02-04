import express from "express";

import axios from "axios";

import cors from "cors";

4

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {

res.send("PayHero backend running"); });

app.post("/stk", async (req, res) => {

res.json({ status: "STK endpoint ready" }); });

app.listen(3000, () => {

console.log("Server running on port 3000");
