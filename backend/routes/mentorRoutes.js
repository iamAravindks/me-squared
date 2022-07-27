import express from "express";
import expressAsyncHandler from "express-async-handler";
import { idValidator } from "../middleware/idValidator.js";
import Mentors from "../models/mentorModle.js";
import { generateToken } from "../utils/util.js";
import {
  isAuthorisedMenteeOrMentor,
  isAuthorisedMentor,
} from "../middleware/authMiddleware.js";
import Mentees from "../models/menteeModel.js";
import mongoose from "mongoose";
export const mentorRouter = express.Router();

mentorRouter.param("id", idValidator);

//  routes related to mentor himself/herself

// @desc login a new mentor
// @route POST /api/mentors/login
// @access private

mentorRouter.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const mentor = await Mentors.findOne({ email });
    if (mentor && (await mentor.matchPassword(password))) {
      const maxAge = 3 * 24 * 60 * 60; // expires in 3day
      const token = generateToken(mentor._id, "mentor");
      res.cookie("access_token", token, {
        httpOnly: true,
        maxAge: maxAge * 1000,
      });

      const { email, _id, name } = mentor;
      res.json({
        message: "successfully logs in",
        data: {
          _id,
          email,
          name,
        },
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  })
);

mentorRouter.get(
  "/logout",
  expressAsyncHandler(async (req, res) => {
    const maxAge = 0;
    const token = generateToken("6781235678", "logout");
    res.cookie("access_token", token, {
      httpOnly: true,
      maxAge: maxAge,
    });
    res.json({
      message: "successfully logout in",
      data: "LOG_OUT_MENTOR",
    });
  })
);
// @desc create a new mentor
// @route /api/mentors/signup
// @access private

mentorRouter.post(
  "/signup",
  expressAsyncHandler(async (req, res) => {
    let newMentor = {
      name: req.body.name,
      designation: req.body.designation,
      yearNdClass: req.body.yearNdClass,
      watNum: req.body.watNum,
      email: req.body.email,
      password: req.body.password,
    };

    if (req.body.profileImg) newMentor.profileImg = req.body.profileImg;

    const isAlreadyExist = await Mentors.findOne({ email: req.body.email });
    if (isAlreadyExist)
      return res.status(400).json({ message: "User already exists" });
    const createdMentor = await Mentors.create(newMentor);
    const maxAge = 3 * 24 * 60 * 60;
    const token = generateToken(createdMentor._id, "mentor");
    res.cookie("access_token", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    if (createdMentor) {
      res.status(201).json({
        message: "mentor created",
        data: {
          _id: createdMentor._id,
          name: createdMentor.name,
          email: createdMentor.email,
        },
      });
    }
  })
);

// @desc read an auth mentors profile
// @route GET /api/mentors/profile
// @access private - by only the mentors

mentorRouter.get(
  "/profile",
  isAuthorisedMentor,
  expressAsyncHandler(async (req, res) => {
    const mentorWithID = await Mentors.findById(req.mentor.id).select(
      "-password"
    );
    res.status(200).json({
      data: mentorWithID,
    });
  })
);

// @desc update a single mentor info
// @route put /api/mentors/:id
// @access private

mentorRouter.put(
  "/profile",
  isAuthorisedMentor,
  expressAsyncHandler(async (req, res) => {
    const userWithId = await Mentors.findById(req.mentor.id);
    if (userWithId) {
      userWithId.name = req.body.name || userWithId.name;
      userWithId.designation = req.body.designation || userWithId.designation;
      userWithId.yearNdClass = req.body.yearNdClass || userWithId.yearNdClass;
      userWithId.respondIn = req.body.respondIn || userWithId.respondIn;
      userWithId.about = req.body.about || userWithId.about;
      userWithId.watNum = req.body.watNum || userWithId.watNum;
      userWithId.email = req.body.email || userWithId.email;
      userWithId.tags = req.body.tags || userWithId.tags;
      userWithId.socialLinks = req.body.socialLinks || userWithId.socialLinks;
      userWithId.profileImg = req.body.profileImg || userWithId.profileImg;
      const updatedUser = await userWithId.save();

      res.status(201).json({
        message: "user updated",
        data: {
          name: userWithId.name,
          designation: userWithId.designation,
          yearNdClass: userWithId.yearNdClass,
          respondIn: userWithId.respondIn,
          about: userWithId.about,
          watNum: userWithId.watNum,
          email: userWithId.email,
          tags: userWithId.tags,
          socialLinks: userWithId.socialLinks,
          profileImg: userWithId.profileImg,
        },
      });
    }
  })
);

// @desc delete a mentor with id
// @route delete /api/mentors/:id
// @access private

mentorRouter.delete(
  "/mentordel",
  isAuthorisedMentor,
  expressAsyncHandler(async (req, res) => {
    const mentor = await Mentors.findById(req.mentor.id);

    if (req.body.password && (await mentor.matchPassword(req.body.password))) {
      await Mentors.deleteOne({ _id: mentor._id });
      res.status(204).json({
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

// routes related to mentors by both mentor and mentee

// @desc getting all mentor list
// @route get /
// @access private(curr public)
mentorRouter.get(
  "/",
  isAuthorisedMenteeOrMentor,
  expressAsyncHandler(async (req, res) => {
    const mentors = await Mentors.find({}).select([
      "name",
      "designation",
      "profileImg",
    ]);
    if (!mentors) {
      res.json({
        message: "No mentors found",
        data: [],
      });
    } else
      res.json({
        data: mentors,
      });
  })
);

// @desc Get all the pending requests
// @route GET /api/mentors/follow-requests
// @access private

mentorRouter.get(
  "/follow-requests",
  isAuthorisedMentor,
  expressAsyncHandler(async (req, res) => {
    const mentor = await Mentors.findById(req.mentor.id);
    const pending_req = mentor.pending;
    const requests = await Mentees.aggregate([
      {
        $match: {
          _id: {
            $in: pending_req,
          },
        },
      },
      { $project: { name: 1, profileImg: 1 } },
    ]);

    res.json({
      data: requests,
    });
  })
);

// @desc get all the followers
// @route GET /api/mentors/followers
// @access private

mentorRouter.get(
  "/followers",
  isAuthorisedMentor,
  expressAsyncHandler(async (req, res) => {
    const mentor = await Mentors.findById(req.mentor.id);
    const followers = mentor.followers;
    const requests = await Mentees.aggregate([
      {
        $match: {
          _id: {
            $in: followers,
          },
        },
      },
      { $project: { name: 1 ,profileImg:1} },
    ]);

    res.json({
      data: requests,
    });
  })
);

// @desc accept the following request
// @route PUT /api/mentors/accept-mentee/:id
// @access private

mentorRouter.put(
  "/accept-mentee/:id",
  isAuthorisedMentor,
  expressAsyncHandler(async (req, res) => {
    // logic

    const { id } = req.params;
    const mentee = await Mentees.findById(id);
    const mentor = await Mentors.findById(req.mentor.id);

    const updatedMentor = await Mentors.findByIdAndUpdate(
      { _id: mongoose.Types.ObjectId(req.mentor.id) },
      {
        $pull: { pending: mongoose.Types.ObjectId(id) },
        $addToSet: { followers: mongoose.Types.ObjectId(id) },
      },
      { new: true }
    );

    res.json({
      data: {
        followers:updatedMentor.followers
      },
    });
  })
);

// @desc decline the follow request
// @route DELETE  /api/mentors/accept-mentee/:id
// @access private

mentorRouter.delete(
  "/accept-mentee/:id",
  isAuthorisedMentor,
  expressAsyncHandler(async (req, res) => {
    // logic

    const { id } = req.params;
    const mentee = await Mentees.findById(id);
    const mentor = await Mentors.findById(req.mentor.id);

    const updatedMentor = await Mentors.findByIdAndUpdate(
      { _id: mongoose.Types.ObjectId(req.mentor.id) },
      {
        $pull: { pending: mongoose.Types.ObjectId(id) },
        $pull: { followers: mongoose.Types.ObjectId(id) },
      },
      { new: true }
    );

    const updatedMentee = await Mentees.findByIdAndUpdate(
      { _id: mongoose.Types.ObjectId(id) },
      {
        $pull: { following: mongoose.Types.ObjectId(mentor._id) },
      },
      { new: true }
    );

    res.json({
      data: {
        followers: updatedMentor.followers,
      },
    });
  })
);

// @desc get a single mentor
// @route /api/mentors/:id
// @access private

mentorRouter.get(
  "/mentor/:id",
  isAuthorisedMenteeOrMentor,
  expressAsyncHandler(async (req, res) => {
    const mentorWithID = await Mentors.findOne({ _id: req.params.id }).select(
      "-password"
    );

    if (!mentorWithID) {
      res.status(404);
      throw new Error("No mentor found");
    }
    const followers = mentorWithID.followers;
    const requests = await Mentees.aggregate([
      {
        $match: {
          _id: {
            $in: followers,
          },
        },
      },
      { $project: { name: 1 } },
    ]);

    if (req.mentor) {
      res.json({
        data: {
          mentor: mentorWithID,
          followers: requests,
          following:true
        },
      });
    } else if (req.mentee) {
      if (followers.includes(mongoose.Types.ObjectId(req.mentee._id))) {
        res.json({
          data: {
            mentor: mentorWithID,
            followers: requests,
            following: true,
          },
        });
      } else {
        const { _id, name, designation, about, tags ,profileImg} = mentorWithID;
        res.json({
          data: {
            mentor: {
              _id,
              name,
              designation,
              about,
              tags,
              profileImg,
            },
            followersCount: followers.length,
            following: false,
          },
        });
      }
    }
  })
);

// @desc get all mentors with a specific tag/tags
// @route /api/transaction/:tag
// @access public

mentorRouter.get(
  "/tag/:tag",
  isAuthorisedMenteeOrMentor,
  expressAsyncHandler(async (req, res) => {
    const query = [req.params.tag].concat(req.query.tag);
    const users = await Mentors.find({ tags: { $in: query } }).select([
      "name",
      "designation",
      "tags",
      "profileImg"
    ]);
    res.json({
      data: users,
    });
  })
);
