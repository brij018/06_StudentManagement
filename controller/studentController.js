import studentModel from "../model/studentModel.js";
import HttpError from "../middleware/HttpError.js";

const add = async (req, res, next) => {
  try {
    const { firstName, lastName, email, phoneNumber, course, status } =
      req.body;

    const newStudent = {
      firstName,
      lastName,
      email,
      phoneNumber,
      course,
      status,
    };
    const studentDetails = await studentModel.create(newStudent);

    res.status(201).json({
      success: true,
      data: studentDetails,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

export default add;
