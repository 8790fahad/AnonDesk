import Joi from 'joi';

// Enum for status values
const statusEnum = ['NEW', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];

// 1. Create Request Schema
export const createRequestSchema = Joi.object({
  subject: Joi.string().max(255).required(),
  description: Joi.string().required(),
});

// 2. Take Request into Work (only changes status)
export const takeInProgressSchema = Joi.object({
  id: Joi.string().uuid().required(),
});

// 3. Complete Request Schema
export const completeRequestSchema = Joi.object({
  id: Joi.string().uuid().required(),
  solutionText: Joi.string().required(),
});

// 4. Cancel Request Schema
export const cancelRequestSchema = Joi.object({
  id: Joi.string().uuid().required(),
  cancelReason: Joi.string().required(),
});

// 5. Filter Query Schema for Listing
export const filterRequestsSchema = Joi.object({
  date: Joi.date().iso(), // specific date
  startDate: Joi.date().iso(), // start of date range
  endDate: Joi.date().iso(),   // end of date range
  status: Joi.string().valid(...statusEnum),
});

// 6. Cancel All In Progress – no input needed
export const cancelAllInProgressSchema = Joi.object({});
