import { ZodError } from "zod";

export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body); // Parse and validate request body
    next(); // If valid → continue
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        errors: error.errors.map((err) => err.message), // return all messages
      });
    }

    next(error); // unexpected error
  }
};
