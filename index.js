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

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000); // 10s

    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err: any) {
    console.error("Proxy error:", err.message || err);
    res.status(500).json({ error: "Proxy failed" });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Proxy running on port", PORT);
});
