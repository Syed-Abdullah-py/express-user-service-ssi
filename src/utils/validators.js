import { AppError } from './AppError.js';

const UUID_V4_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateUuid = (id) => {
  if (!id || !UUID_V4_REGEX.test(id)) {
    throw new AppError('Invalid user ID', 400);
  }
};

export const validateUserInput = (data) => {
  const name = data.name?.trim();
  const email = data.email?.trim();

  if (!name || !email) {
    throw new AppError('Name and email are required', 400);
  }

  if (!EMAIL_REGEX.test(email)) {
    throw new AppError('Please enter a valid email address', 400);
  }

  return { name, email };
};
