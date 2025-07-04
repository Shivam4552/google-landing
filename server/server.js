const express = require("express");
const fs       = require("fs");
const path     = require("path");
const cors     = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const csvFile = path.join(__dirname, "registrations.csv");
if (!fs.existsSync(csvFile))
  fs.writeFileSync(csvFile, "Name,Phone,Email\n", "utf8");

app.post("/api/register", (req, res) => {
  const { name, phone, email } = req.body;
  if (!name || !phone || !email)
    return res.status(400).json({ message: "All fields are required" });

  const row = `"${name.replace(/"/g, '""')}","${phone}","${email}"\n`;
  fs.appendFile(csvFile, row, err => {
    if (err) return res.status(500).json({ message: "Write error" });
    res.status(200).json({ message: "Saved" });
  });
});

app.get("/api/download", (_req, res) => res.download(csvFile));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API listening on ${PORT}`));
