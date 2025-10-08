import cron from "node-cron";
import axios from "axios";

cron.schedule("0 9 * * *", async () => {
  console.log("Running daily email reminder...");
  try {
    await axios.get("http://localhost:3000/api/notify");
    console.log("✅ Email notification sent");
  } catch (error) {
    console.error("❌ Failed to send email:", error);
  }
});
