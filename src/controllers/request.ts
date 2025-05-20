import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import {
  createRequestSchema,
  takeInProgressSchema,
  completeRequestSchema,
  cancelRequestSchema,
  filterRequestsSchema,
} from "../schema/schema";

const prisma = new PrismaClient();

// 1. Create a new request
export const createRequest = async (req: Request, res: Response) => {
  const { error, value } = createRequestSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { subject, description } = value;

  try {
    const request = await prisma.request.create({
      data: {
        subject,
        description,
        status: "NEW",
      },
    });
    res.status(201).json(request);
  } catch (err) {
    res.status(500).json({ error: "Failed to create request" });
  }
};

// 2. Mark a request as "IN_PROGRESS"
export const takeRequestInProgress = async (req: Request, res: Response) => {
  const { error, value } = takeInProgressSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const request = await prisma.request.update({
      where: { id: value.id },
      data: { status: "IN_PROGRESS" },
    });
    res.json(request);
  } catch (err) {
    res.status(404).json({ error: "Request not found or update failed" });
  }
};

// 3. Complete a request
export const completeRequest = async (req: Request, res: Response) => {
  const { error, value } = completeRequestSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { id, solutionText } = value;

  try {
    const request = await prisma.request.update({
      where: { id },
      data: {
        status: "COMPLETED",
        solutionText,
      },
    });
    res.json(request);
  } catch (err) {
    res.status(404).json({ error: "Request not found or update failed" });
  }
};

// 4. Cancel a request
export const cancelRequest = async (req: Request, res: Response) => {
  const { error, value } = cancelRequestSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { id, cancelReason } = value;

  try {
    const request = await prisma.request.update({
      where: { id },
      data: {
        status: "CANCELLED",
        cancelReason,
      },
    });
    res.json(request);
  } catch (err) {
    res.status(404).json({ error: "Request not found or update failed" });
  }
};

// 5. Get filtered requests
export const getFilteredRequests = async (req: Request, res: Response) => {
  const { error, value } = filterRequestsSchema.validate(req.query);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { date, startDate, endDate, status } = value;

  try {
    const whereClause: any = {};
    if (status) whereClause.status = status;

    if (date) {
      const start = new Date(date);
      const end = new Date(date);
      end.setDate(end.getDate() + 1);
      whereClause.createdAt = {
        gte: start,
        lt: end,
      };
    } else if (startDate && endDate) {
      whereClause.createdAt = {
        gte: new Date(startDate),
        lt: new Date(
          new Date(endDate).setDate(new Date(endDate).getDate() + 1)
        ),
      };
    }

    const requests = await prisma.request.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
    });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve requests" });
  }
};

// 6. Cancel all "IN_PROGRESS" requests
export const cancelAllInProgress = async (_req: Request, res: Response) => {
  try {
    const result = await prisma.request.updateMany({
      where: { status: "IN_PROGRESS" },
      data: {
        status: "CANCELLED",
        cancelReason: "Bulk cancelled by system",
      },
    });
    res.json({ message: `${result.count} requests cancelled.` });
  } catch (err) {
    res.status(500).json({ error: "Bulk cancel failed" });
  }
};
