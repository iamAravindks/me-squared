import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const MentorsSchema = mongoose.Schema({
  name: { type: String, required: true },
  designation: { type: String, required: true },
  yearNdClass: {
    type: String,
    required: ["true", "year and class must be spciefied"],
  },
  respondIn: { type: String, required: true },
  tags: {
    type: [String],
    validate: (v) => v == null || v.length > 0,
  },
  socialLinks: {
    github: { type: String, default: "" },
    twitter: { type: String, default: "" },
    facebook: { type: String, default: "" },
    instagram: { type: String, default: "" },
  },
  watNum: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  about: { type: String },
  followers: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Mentees", default: "" },
  ],
  pending: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Mentees", default: "" },
  ],
});

MentorsSchema.methods.matchPassword = async function (enteredPassword)
{
  return await bcrypt.compare(enteredPassword, this.password);
}

// hook



MentorsSchema.pre("save", async function (next) {
  // if not password modified (if an existed user updates the email and name)
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


const Mentors =
  mongoose.models.Mentors || mongoose.model("Mentors", MentorsSchema);
export default Mentors;
