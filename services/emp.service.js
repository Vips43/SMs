import { createError } from "../middleware/errorMiddleware.js";
import Attendence from "../models/attendencemodel.js";
import User from "../models/userModel.js";

const empServices = {
  existAttendence: async (id, user) => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    if (["operator", "admin"].includes(user.role)) {
      return true;
    }

    const existAtt = await Attendence.findOne({
      user: id,
      createdAt: { $gt: startOfDay, $lt: endOfDay },
    });

    if (existAtt) throw createError("Already marked Present for Today", 400);
  },

  markAttendance: async ({ body, user }) => {
    const { id, status = "Present" } = body;
    const privilegedRoles = ["operator", "admin"];
    const isPrivileged = privilegedRoles.includes(user.role);

    if (id && id !== user.id && !isPrivileged) {
      throw createError(
        "You don't have rights to mark attendance for other users",
        401,
      );
    }

    const targetUserId = isPrivileged && id ? id : user.id;

    const targetUser = await User.findById(targetUserId);
    if (!targetUser) throw createError("User not found", 404);

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    // 1. Check if an attendance record already exists for today
    const existingAttendance = await Attendence.findOne({
      user: targetUser._id,
      date: { $gte: startOfDay },
    });

    let updatedAttendance;

    if (!existingAttendance) {
      // 2. FIRST TIME CREATION: Set the initial master status and initialize history
      updatedAttendance = await Attendence.create({
        user: targetUser._id,
        status: status,
        date: new Date(),
        history: [{ status: status, date: new Date() }],
      });
      targetUser.todayAttendence = status;
    } else {
      updatedAttendance = await Attendence.findOneAndUpdate(
        { _id: existingAttendance._id },
        {
          $push: {
            history: {
              status: status,
              date: new Date(),
            },
          },
        },
        { new: true },
      );
      targetUser.todayAttendence = status;
    }

    await targetUser.save();

    console.log(targetUser.todayAttendence);
    return { msg: `${targetUser?.firstname} is marked ${status}`, targetUser };
  },

  getAttendence: async (user) => {
    if (["operator", "admin"].includes(user?.role)) {
      const allUsers = await User.find({})
        .populate("attendenceRecords")
        .select(
          "firstname middlename lastname todayAttendence attendence attendenceRecords",
        );
      return { success: true, data: allUsers };
    }

    const singleUser = await User.findById(user._id || user.id)
      .populate("attendenceRecords")
      .select("firstname middlename lastname attendence attendenceRecords");

    if (!singleUser) {
      throw createError("User not found", 404);
    }

    return { success: true, data: singleUser.attendence || [] };
  },
};

export default empServices;
