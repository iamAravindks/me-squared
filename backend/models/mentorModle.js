import mongoose from "mongoose";

const MentorsSchema = mongoose.Schema({
  name: { type: String, required: true },
  designation: { type: String, required: true },
  yearNdClass: { type: String, required: ['true',"year and class must be spciefied"] },
  respondIn: { type: String, required: true },
  tags: [{ type: String, required: true }],
  socialLinks: [
    {
      github: { type: String },
      twitter: { type: String },
      facebook: { type: String },
      instagram: { type: String },
    },
  ],
  watNum: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password:{type:String,required:true}
});

const Mentors =
  mongoose.models.Mentors || mongoose.model("Mentors", MentorsSchema);
export default Mentors;
