const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

let latestDonation = null;

app.post("/saweria-webhook", (req, res) => {
  const donationData = req.body;
  console.log("Donasi Baru Masuk:", donationData);

  latestDonation = {
    donator: donationData.donator,
    amount: donationData.amount,
    message: donationData.message,
    timestamp: Date.now(),
  };
  res.status(200).send("OK");
});

app.get("/get-donation", (req, res) => {
  if (latestDonation) {
    res.json(latestDonation);
    latestDonation = null;
  } else {
    res.json({ message: "No new donation" });
  }
});

app.listen(PORT, () => {
  console.log(`Server relay jalan di port ${PORT}`);
});
