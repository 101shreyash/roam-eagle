import { Request, Response } from "express";

async function ListProperty(req: Request, res: Response) {
  const userid = req.user?.userid;
  const propertyStatus: string = req.body.status;
  const title: string = req.body.title;
  const description: string = req.body.description;
  const totalrooms: number = req.body.totalrooms;
  const basedOnCountry: string = req.body.country;
  const city: string = req.body.city;
  const postalCode: string = req.body.postalcode;
  const monthlyprice: string = req.body.monthlyprice;
  const negotiable: boolean = req.body.negotiable;

  if (!propertyStatus || propertyStatus === undefined) {
    return res.status(400).json({
      success: false,

      message: "Property Status is required ",
    });
  }

  if (!title || title === undefined) {
    return res.status(400).json({
      success: false,

      message: "Property Title is required ",
    });
  }

  if (!description || description === undefined) {
    return res.status(400).json({
      success: false,

      message: "Description is required ",
    });
  }

  if (!totalrooms || totalrooms === undefined) {
    return res.status(400).json({
      success: false,

      message: "Room Count is required ",
    });
  }

  if (!basedOnCountry || basedOnCountry === undefined) {
    return res.status(400).json({
      success: false,

      message: "You must mention which country this property belongs to",
    });
  }

  if (!city || city === undefined) {
    return res.status(400).json({
      success: false,

      message: "You must mention which city this property belongs to",
    });
  }

  if (!postalCode || postalCode === postalCode) {
    return res.status(400).json({
      success: false,

      message: "Postal Code is required.",
    });
  }

  if (!monthlyprice || monthlyprice === monthlyprice) {
    return res.status(400).json({
      success: false,
      message: "You must mention property's monthly price.",
    });
  }

  if (!negotiable || negotiable === undefined) {
    return res.status(400).json({
      success: false,
      message:
        "You have to mention weather or not your property is negotiable.",
    });
  }
}

export default ListProperty;
