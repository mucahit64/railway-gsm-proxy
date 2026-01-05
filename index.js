import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("OK");
});

app.post("/gsm", async (req, res) => {
  try {
    const backendUrl = process.env.BACKEND_URL;
    if (!backendUrl) {
      return res.status(500).json({ error: "BACKEND_URL not set" });
    }

    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // istersen buraya device-key vb ekleyebilirsin
      },
      body: JSON.stringify(req.body),
    });

    const text = await response.text();

    res.status(response.status).send(text);
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({ error: "Proxy failed" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Proxy running on port", PORT);
});
