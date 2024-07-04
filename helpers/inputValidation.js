import mongoose from "mongoose";

export const validMax = (field, fieldName, minLength, maxLength) => {
  if (!field || field.trim() === "") {
    throw new Error(`${fieldName} is required`);
  }
  const length = field.trim().length;
  if (length < minLength || length > maxLength) {
    throw new Error(
      `${fieldName} must be between ${minLength} and ${maxLength} characters`
    );
  }
};

export const validId = (id, fieldName) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error(`${fieldName} is not valid`);
  }
};

export const valid = (field, fieldName) => {
  if (field === null || field === undefined || field == "" || !field) {
    throw new Error(`${fieldName} is required`);
  }
};
