import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

/* health check */
app.get("/", (req, res) => {
  res.json({ status: "PayHero backend running" });
});

/* STK endpoint */
app.post("/stk", async (req, res) => {
  try {
    const { phone, amount } = req.body;

    if (!phone || !amount) {
      return res.status(400).json({ error: "Phone and amount required" });
    }

    const response = await axios.post(
      "https://backend.payhero.co.ke/api/v2/payments",
      {
        amount: amount,
        phone_number: phone,
        channel_id: process.env.PAYHERO_CHANNEL_ID,
        provider: "m-pesa",
        external_reference: "Fuliza-STK",
        callback_url: process.env.CALLBACK_URL
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYHERO_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "STK request failed" });
  }
});

/* Render port */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
