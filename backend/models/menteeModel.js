import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const MenteeSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  yearNdClass: {
    type: String,
    required: ["true", "year and class must be spciefied"],
  },
  socialLinks: {
    github: { type: String },
    twitter: { type: String },
    facebook: { type: String },
    instagram: { type: String },
  },
  about: { type: String },
  skillLooksFor: { type: String, required: true },
  watNum: { type: Number, required: true },
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "Mentors",default:"" },
  
],
});

//method for the model
MenteeSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//hook

MenteeSchema.pre("save", async function (next) {
  // if not password modified (if an existed user updates the email and name)
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Mentees =
  mongoose.model.Mentees || mongoose.model("Mentees", MenteeSchema);
export default Mentees;
