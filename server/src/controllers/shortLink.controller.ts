import { Request, Response } from "express";
import { ShortLink } from "../models/shortLink.model";
import { ExtendedRequest } from "../types/custom";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { v4 } from "uuid";

const createShortLink = asyncHandler(
  async (req: ExtendedRequest, res: Response) => {
    const { originalLink, creationDate, expiryDate } = req.body;
    if ([originalLink].some((field) => field?.trim() === "")) {
      throw new ApiError(400, "Original and short link are required");
    }
    const shortLink = v4().substring(0, 10);
    const createdLink = await ShortLink.create({
      originalLink,
      shortLink,
      creationDate,
      expiryDate,
      userID: req.user?._id,
    });

    return res
      .status(201)
      .json(
        new ApiResponse(200, { createdLink }, "Link registered Successfully")
      );
  }
);

const getUserShortLinks = asyncHandler(
  async (req: ExtendedRequest, res: Response) => {
    const userLinks = await ShortLink.find({ userID: req.user?._id });
    return res
      .status(200)
      .json(
        new ApiResponse(200, { userLinks }, "Links retrieved successfully")
      );
  }
);

const deleteLinkById = asyncHandler(
  async (req: ExtendedRequest, res: Response) => {
    const linkId = req.params.id;
    const shortLink = await ShortLink.findById(linkId);

    if (!shortLink) throw new ApiError(404, "Link not found");

    if (shortLink.userID.toString() !== req.user?._id.toString())
      throw new ApiError(403, "This link is not created by you");

    const deletedLink = await ShortLink.findByIdAndDelete(linkId);

    return res
      .status(200)
      .json(
        new ApiResponse(200, { deletedLink }, "Links deleted successfully")
      );
  }
);

const redirectToOriginalURL = asyncHandler(
  async (req: Request, res: Response) => {
    const shortLink = req.params.shortLink;

    const link = await ShortLink.findOne({ shortLink });

    if (!link) throw new ApiError(404, "Link not found");
    if (link.expiryDate) {
      if (link.expiryDate < new Date()) throw new ApiError(404, "Link expired");
    }
    // Increment the click count or perform any analytics here if needed
    link.visits++;
    await link.save();

    // Redirect to the original URL
    return res.redirect(link.originalLink);
  }
);

export {
  createShortLink,
  getUserShortLinks,
  deleteLinkById,
  redirectToOriginalURL,
};
