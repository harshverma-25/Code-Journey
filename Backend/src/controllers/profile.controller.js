import { User } from "../models/user.model.js";

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const {
      firstName,
      lastName,
      techStack,
      college,
      city,
      bio,
      profilePic,   // cloudinary URL (or empty string)
    } = req.body;

    // Only allowed fields
    const updatedData = {};

    if (firstName) updatedData.firstName = firstName;
    if (lastName) updatedData.lastName = lastName;
    if (Array.isArray(techStack)) updatedData.techStack = techStack;
    if (college) updatedData.college = college;
    if (city) updatedData.city = city;
    if (bio) updatedData.bio = bio;
    if (profilePic) updatedData.profilePic = profilePic;

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updatedData,
      { new: true }
    ).select("-password -refreshToken -__v");

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating profile",
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const userId = req.user._id;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Old password and new password are required",
      });
    }

    const user = await User.findById(userId);

    // Check old password
    const isMatch = await user.isPasswordCorrect(oldPassword);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    // Hash new password
    user.password = await bcrypt.hash(newPassword, 10);

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });

  } catch (error) {
    console.error("CHANGE PASSWORD ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while changing password",
    });
  }
};
