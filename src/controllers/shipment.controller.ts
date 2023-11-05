import { Request, Response } from "express";
import { Shipment } from "../models";
import { ShipmentInterface } from "../interface/shipment.interface";
import { Op } from "sequelize";

const getShipments = async (req: Request, res: Response) => {};
const createShipment = async (req: Request, res: Response) => {};
const getShipment = async (req: Request, res: Response) => {};
const putShipment = async (req: Request, res: Response) => {};
const deleteShipment = async (req: Request, res: Response) => {};

export {
  getShipments,
  createShipment,
  getShipment,
  putShipment,
  deleteShipment,
};
