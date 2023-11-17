import { Request, Response } from "express";
import { Business, Employee, Shipment, Travel, Vehicle } from "../models";
import { ShipmentInterface } from "../interface/shipment.interface";
import { Op } from "sequelize";

const getShipments = async (req: Request, res: Response) => {
  const businessId = req.body.business.id_business;
  try {
    const shipments = await Shipment.findAll({
      attributes: [
        "id_shipment",
        "from",
        "to",
        "client",
        "description",
        "delivered",
        "reason",
        "picture",
      ],
      include: [
        {
          model: Business,
          where: { id_business: businessId },
          attributes: ["id_business"],
        },
        {
          model: Travel,
          attributes: ["id_travel"],
        },
      ],
    });

    res.json(shipments);
  } catch (error: any) {
    console.log(error);
    return res.status(404).json({ msg: error.message });
  }
};

const createShipment = async (req: Request, res: Response) => {
  const { from, to, client, description, id_travel }: ShipmentInterface =
    req.body;

  await Shipment.sync();
  try {
    const travel = await Travel.findByPk(id_travel);

    if (from === "") {
      const error = new Error("Date cannot be empty");
      return res.status(400).json({ msg: error.message });
    }
    if (to === "") {
      const error = new Error("Date cannot be empty");
      return res.status(400).json({ msg: error.message });
    }
    if (client === "") {
      const error = new Error("Date cannot be empty");
      return res.status(400).json({ msg: error.message });
    }
    if (description === "") {
      const error = new Error("Date cannot be empty");
      return res.status(400).json({ msg: error.message });
    }

    const newShipment = new Shipment(req.body);

    // Asign id business
    newShipment.id_business = req.body.business.id_business;

    await newShipment.save();
    res.json(newShipment);
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ msg: error.message });
  }
};

const getShipment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const businessId = req.body.business.id_business;
  try {
    const shipmentExist = await Shipment.findByPk(id, {
      attributes: [
        "id_shipment",
        "from",
        "to",
        "client",
        "description",
        "delivered",
        "reason",
        "picture",
      ],
      include: [
        {
          model: Business,
          where: { id_business: businessId },
          attributes: ["id_business"],
        },
        {
          model: Travel,
          attributes: ["id_travel", "date"],
          include: [
            {
              model: Business,
              where: { id_business: businessId },
              attributes: ["id_business"],
            },
            {
              model: Employee,
              as: "truck_driver",
              attributes: [
                "id_employee",
                "name",
                "lastname",
                "picture",
                "type",
              ],
            },
            {
              model: Employee,
              as: "truck_assistant",
              attributes: [
                "id_employee",
                "name",
                "lastname",
                "picture",
                "type",
              ],
            },
            {
              model: Vehicle,
              attributes: ["model", "patent", "typeVehicle", "picture"],
              as: "truck",
            },
            {
              model: Vehicle,
              attributes: ["model", "patent", "typeVehicle", "picture"],
              as: "semi",
            },
          ],
        },
      ],
    });

    if (shipmentExist?.Business.id_business !== businessId) {
      return res
        .status(404)
        .json({ msg: "Does not belong to the business logged in" });
    }
    res.json(shipmentExist);
  } catch (error: any) {
    console.log(error);
    return res.status(404).json({ msg: error.message });
  }
};

const putShipment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const businessId = req.body.business.id_business;

  const {
    from,
    to,
    client,
    description,
    id_travel,
    reason,
    picture,
  }: ShipmentInterface = req.body;

  try {
    const shipmentExist = await Shipment.findByPk(id, {
      attributes: [
        "from",
        "to",
        "client",
        "description",
        "id_travel",
        "id_shipment",
        "reason",
        "picture",
      ],
      include: [
        {
          model: Business,
          where: { id_business: businessId },
          attributes: ["id_business"],
        },
      ],
    });

    if (shipmentExist?.Business.id_business !== businessId) {
      return res
        .status(404)
        .json({ msg: "Does not belong to the business logged in" });
    }

    if (from === "") {
      const error = new Error("Date cannot be empty");
      return res.status(400).json({ msg: error.message });
    }
    if (to === "") {
      const error = new Error("Date cannot be empty");
      return res.status(400).json({ msg: error.message });
    }
    if (client === "") {
      const error = new Error("Date cannot be empty");
      return res.status(400).json({ msg: error.message });
    }
    if (description === "") {
      const error = new Error("Date cannot be empty");
      return res.status(400).json({ msg: error.message });
    }
    if (id_travel === "") {
      const error = new Error("Travel cannot be empty");
      return res.status(400).json({ msg: error.message });
    }

    shipmentExist!.from = from || shipmentExist?.from;
    shipmentExist!.to = to || shipmentExist?.to;
    shipmentExist!.client = client || shipmentExist?.client;
    shipmentExist!.description = description || shipmentExist?.description;
    shipmentExist!.id_travel = id_travel || shipmentExist?.id_travel;

    await shipmentExist?.save();
    res.json(shipmentExist);
  } catch (error: any) {
    console.log(error);
    return res.status(404).json({ msg: error.message });
  }
};

const deleteShipment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const businessId = req.body.business.id_business;

  try {
    const shipmentExist = await Shipment.findByPk(id);
    if (shipmentExist?.id_business !== businessId) {
      return res
        .status(404)
        .json({ msg: "Does not belong to the business logged in" });
    }
    await shipmentExist?.destroy();
    res.json({ msg: "Shipment successfully eliminated" });
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ msg: error.message });
  }
};

export {
  getShipments,
  createShipment,
  getShipment,
  putShipment,
  deleteShipment,
};
