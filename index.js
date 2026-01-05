import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("GSM Proxy OK");
});

app.post("/gsm", (req, res) => {
  console.log("GELEN DATA:", req.body);
  res.json({ ok: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Proxy running on port", PORT);
});
