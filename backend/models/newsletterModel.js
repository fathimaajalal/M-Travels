import mongoose from "mongoose";

const newsletterSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  subscribedAt: { type: Date, default: Date.now }
});

const NewsletterModel = mongoose.models.Newsletter || mongoose.model("Newsletter", newsletterSchema);

export default NewsletterModel;