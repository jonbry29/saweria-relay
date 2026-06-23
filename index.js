const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

let latestDonation = null;

// Endpoint Utama biar Vercel ga Error 500 pas dicek di browser
app.get("/", (req, res) => {
  res.status(200).json({
    status: "Server Relay Saweria-Roblox Aktif!",
    info: "Silakan gunakan /saweria-webhook and /get-donation",
  });
});

app.post("/saweria-webhook", (req, res) => {
  const donationData = req.body;
  console.log("Donasi Baru Masuk:", donationData);

  // Menyelaraskan data dari webhook Saweria asli
  latestDonation = {
    donator_name: donationData.donator_name || donationData.donator || "Anonim",
    amount_raw: donationData.amount_raw || donationData.amount || 0,
    message: donationData.message || "",
    timestamp: Date.now(),
  };
  res.status(200).send("OK");
});

app.get("/get-donation", (req, res) => {
  if (latestDonation) {
    const dataToSend = latestDonation;
    latestDonation = null; // Reset setelah diambil sekali
    res.json(dataToSend);
  } else {
    // ── KODE SIMULASI UNTUK TES NOTIFIKASI ───────────────────────────
    // Saat tidak ada donasi asli, kita kirim data palsu ini agar masuk ke Roblox.
    res.json({
      donator_name: "jonbry29", // <== Username Roblox lu buat simulasi tes
      amount_raw: 25000, // <== Nominal uang tes (Rp 25.000) biar muncul popup level
      message: "THIS IS A FAKE MESSAGE! HAVE A GOOD ONE",
      timestamp: Date.now(),
    });
    // ─────────────────────────────────────────────────────────────────
  }
});

app.listen(PORT, () => {
  console.log(`Server relay jalan di port ${PORT}`);
});

// Ini bagian krusial buat Vercel Serverless
module.exports = app;
