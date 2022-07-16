import express from "express";
import expressAsyncHandler from "express-async-handler";
import Mentees from "../models/menteeModel.js";
import { generateToken } from "../utils/util.js";
import { isAuthorisedMentee } from "../middleware/authMiddleware.js";
import { idValidator } from "../middleware/idValidator.js";
import Mentors from "../models/mentorModle.js";
import mongoose from "mongoose";

const menteeRoute = express.Router();
menteeRoute.param("id", idValidator);

// @desc Auth mentee and get token
// @route post /api/mentee/login
// @access public

menteeRoute.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const mentee = await Mentees.findOne({ email });
    if (mentee && (await mentee.matchPassword(password))) {
      const maxAge = 3 * 24 * 60 * 60;
      const token = generateToken(mentee._id, "mentee");
      res.cookie("access_token", token, {
        httpOnly: true,
        maxAge: maxAge * 1000,
      });
      res.json({
        message: "Mentee login success",
        data: {
          _id: mentee._id,
          name: mentee.name,
          email: mentee.email,
        },
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  })
);

// @desc log out the mentee
// @route GET /api/mentees/logout
// @access private

menteeRoute.get(
  "/logout",
  isAuthorisedMentee,
  expressAsyncHandler(async (req, res) => {
    const maxAge = 0;
    const token = generateToken("6781235678", "logout");
    res.cookie("access_token", token, {
      httpOnly: true,
      maxAge: maxAge,
    });
    res.json({
      message: "successfully logout in",
      data: "LOG_OUT_MENTEE",
    });
  })
);

// @desc get mentee profile
// @route get /api/mentees/profile
// @access private

menteeRoute.get(
  "/profile",
  isAuthorisedMentee,
  expressAsyncHandler(async (req, res) => {
    const mentee = await Mentees.findById(req.mentee.id).select("-password");
    if (mentee) {
      res.json({
        data: mentee,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// @desc create new user
// @route POST /api/mentees/signup
// @access publiv

menteeRoute.post(
  "/signup",
  expressAsyncHandler(async (req, res) => {
    const { name, email, password, yearNdClass, skillLooksFor, watNum } =
      req.body;
    const newMentee = {
      name,
      email,
      password,
      yearNdClass,
      skillLooksFor,
      watNum,
    };
    const isAlredyExist = await Mentees.findOne({ email });
    if (isAlredyExist)
      return res.status(400).json({ message: "User already exists" });

    const menteeCreated = await Mentees.create(newMentee);
    if (menteeCreated) {
      const maxAge = 3 * 24 * 60 * 60;
      const token = generateToken(menteeCreated._id, "mentee");
      res.cookie("access_token", token, {
        httpOnly: true,
        maxAge: maxAge * 1000,
      });
      res.status(201).json({
        data: {
          _id: menteeCreated._id,
          name,
          email,
          yearNdClass,
          skillLooksFor,
          watNum,
        },
      });
    } else {
      res.status(400).json({ message: "Registration failed" });
    }
  })
);

// @desc update a mentee profile
// @route PUT /api/mentees/profileupdate
// @access private

menteeRoute.put(
  "/profile-update",
  isAuthorisedMentee,
  expressAsyncHandler(async (req, res) => {
    const mentee = await Mentees.findById(req.mentee.id);
    if (!mentee) {
      res.status(404);
      throw new Error("user not found");
    }
    const {
      name = mentee.name,
      email = mentee.email,
      yearNdClass = mentee.yearNdClass,
      socialLinks = mentee.socialLinks,
      about = mentee.about,
      skillLooksFor = mentee.skillLooksFor,
      watNum = mentee.watNum,
    } = req.body;

    mentee.name = name;
    mentee.email = email;
    mentee.yearNdClass = yearNdClass;
    mentee.socialLinks = socialLinks;
    mentee.about = about;
    mentee.skillLooksFor = skillLooksFor;
    mentee.watNum = watNum;

    if (req.body.password) mentee.password = req.body.password;
    const updatedMentee = await mentee.save();

    if (updatedMentee)
      return res.status(201).json({
        message: "successfully updated",
        data: {
          _id: mentee._id,
          name,
          email,
          yearNdClass,
          socialLinks,
          about,
          watNum,
          skillLooksFor,
        },
      });
  })
);

// @desc delete a mentee with an ID
// @route DELETE /api/mentees/
// @access private

menteeRoute.delete(
  "/user-del",
  isAuthorisedMentee,
  expressAsyncHandler(async (req, res) => {
    const { password } = req.body || null;
    if (!password) throw new Error("password required");
    const mentee = await Mentees.findById(req.mentee.id);

    if (mentee && (await mentee.matchPassword(password))) {
      await Mentees.deleteOne({ _id: mentee._id });
      res.status(204);
      return res.json({
        message: "user deleted",
      });
    } else {
      res.status(401);
      return res.json({
        message: "Invalid credentials",
      });
    }
  })
);

// @desc get all the following lists
// @route get /api/mentees/following
// @access private

menteeRoute.get(
  "/following",
  isAuthorisedMentee,
  expressAsyncHandler(async (req, res) => {
    const mentee = await Mentees.findById(req.mentee.id);
    const following = mentee.following;
    const followings = await Mentors.aggregate([
      {
        $match: {
          _id: {
            $in: following,
          },
        },
      },
    ]);

    res.json({
      data: followings,
    });
  })
);

// @desc unfollow a mentor
// @route DEL /api/mentee//follow-mentor/:id
// @access private

menteeRoute.delete(
  "/follow-mentor/:id",
  isAuthorisedMentee,
  expressAsyncHandler(async (req, res) =>
  {
    const { id: mentorId } = req.params;

    // remove from the following list of mentee

    const updatedMentee = await Mentees.findByIdAndUpdate(
      {
        _id: mongoose.Types.ObjectId(req.mentee.id),
      },
      {
        $pull: { following: mongoose.Types.ObjectId(mentorId) },
      }
    );

    // remove from the followers list of mentor

    const updatedMentor = await Mentors.findByIdAndUpdate(
      {
        _id: mongoose.Types.ObjectId(mentorId),
      },
      {
        $pull: { followers: mongoose.Types.ObjectId(req.mentee.id) },
      }
    );

    res.json({
      data:updatedMentee
    })
  })
);

// @desc follow a mentor
// @route POST /api/mentees/follow-mentor/:id
// @access private

menteeRoute.post(
  "/follow-mentor/:id",
  isAuthorisedMentee,
  expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const mentee = await Mentees.findById(req.mentee.id);
    const mentor = await Mentors.findById(id).select("-password");
    // console.log(mentor)
    if (mentee) {
      try {
        const updatedMentee = await Mentees.findOneAndUpdate(
          { _id: mongoose.Types.ObjectId(req.mentee.id) },
          { $addToSet: { following: mentor._id } },
          { new: true }
        );

        const updatedMentor = await Mentors.findOneAndUpdate(
          { _id: mongoose.Types.ObjectId(mentor._id) },
          {
            $addToSet: {
              pending: mentee._id,
            },
          },
          { new: true }
        );

        res.json({
          data: {
            mentor: updatedMentor,
            mentee: updatedMentee,
          },
        });
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    }
  })
);
export default menteeRoute;
