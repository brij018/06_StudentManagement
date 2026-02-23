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

const allStudents = async (req, res, next) => {
  try {
    const studentList = await studentModel.find({});
    if (!studentList.length) {
      return next(new HttpError("no student data found", 404));
    }
    res
      .status(200)
      .json({ message: "student data received successfully", studentList });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const studentById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const student = await studentModel.findByIdAndDelete(id);
    if (!student) {
      return next(new HttpError("no student found with that id", 404));
    }
    res.status(200).json({ message: "Student found", student });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const deleteStudent = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteStudent = await studentModel.findById(id);
    if (!deleteStudent) {
      return next(new HttpError("no student found with that id", 404));
    }
    res.status(200).json({ message: "student data deleted successfully" });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const updateStudent = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updateStudentData = await studentModel.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      },
    );
    if (!updateStudent) {
      return next(new HttpError("no student with this id was found", 404));
    }
    res
      .status(200)
      .json("Student Data updated successfully", updateStudentData);
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

export default { add, allStudents, studentById, deleteStudent, updateStudent };
