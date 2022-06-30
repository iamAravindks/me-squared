import connectDB from "./config/db.js";
import { mentees, mentors } from "./data.js";
import Mentees from "./models/menteeModel.js";
import Mentors from "./models/mentorModle.js";

const importData = async () =>
{
  try {
    await connectDB();
    await Mentors.deleteMany();
    const createdMentors = await Mentors.insertMany(mentors);
    const createdMentees = await Mentees.insertMany(mentees)
    console.log("Data imported");
    process.exit();
  } catch (error) {
    console.log(`Error on importing ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();
    await Mentors.deleteMany();
    await Mentees.deleteMany()
    console.log("Data destroyed");
    process.exit();
  } catch (error) {
    console.log(`Error on importing ${error.message}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") destroyData();
else importData();
