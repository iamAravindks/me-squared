import mongoose from "mongoose";

export const idValidator = async (req, res, next,val) =>
{
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
          res.status(404);
          next(new Error(`${req.url} not found`))
        }
  next()
}