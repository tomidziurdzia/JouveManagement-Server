import { Request, Response } from "express";
import { Travel, Business, Employee, Vehicle, Shipment } from "../models";

const getTravels = async (req: Request, res: Response) => {
  const { page = 1, size = 5 } = req.query;
  const limit = +size;
  const offset = (+page - 1) * +size;
  const businessId = req.body.business.id_business;

  try {
    const { count, rows } = await Travel.findAndCountAll({
      order: [["date", "DESC"]],
      limit,
      offset,
      attributes: ["date", "id_travel"],
      include: [
        {
          model: Business,
          where: { id_business: businessId },
          attributes: ["id_business"],
        },
        {
          model: Vehicle,
          attributes: [
            "model",
            "patent",
            "typeVehicle",
            "picture",
            "id_vehicle",
          ],
          as: "truck",
        },
        {
          model: Vehicle,
          attributes: [
            "model",
            "patent",
            "typeVehicle",
            "picture",
            "id_vehicle",
          ],
          as: "semi",
        },
        {
          model: Employee,
          attributes: ["name", "lastname", "type", "picture", "id_employee"],
          as: "truck_driver",
        },
        {
          model: Employee,
          attributes: ["name", "lastname", "type", "picture", "id_employee"],
          as: "truck_assistant",
        },
      ],
    });

    res.json({
      total: count,
      travels: rows,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(404).json({ msg: error.message });
  }
};

const createTravel = async (req: Request, res: Response) => {
  await Travel.sync();

  const { date, truck_driver, truck, semi } = req.body;

  try {
    if (date === "") {
      const error = new Error("Date cannot be empty");
      return res.status(400).json({ msg: error.message });
    }

    if (truck_driver.name === "") {
      const error = new Error("Driver cannot be empty");
      return res.status(400).json({ msg: error.message });
    }

    if (truck.patent === "") {
      const error = new Error("Truck cannot be empty");
      return res.status(400).json({ msg: error.message });
    }
    const vehicleExist = await Vehicle.findByPk(truck);

    if (
      vehicleExist?.typeVehicle === "tractor" &&
      semi === "not_semirremolque"
    ) {
      const error = new Error("Semirremolque cannot be empty");
      return res.status(400).json({ msg: error.message });
    }

    if (
      vehicleExist?.typeVehicle !== "tractor" &&
      semi !== "not_semirremolque"
    ) {
      const error = new Error(
        "Semirremolque must be empty if the selected vehicle is not a tractor"
      );
      return res.status(400).json({ msg: error.message });
    }

    const newTravel = new Travel(req.body);
    // Asign id business
    newTravel.id_business = req.body.business.id_business;
    newTravel.id_vehicle = req.body.truck;
    newTravel.id_driver = req.body.truck_driver;
    newTravel.id_assistant = req.body.truck_assistant;
    newTravel.id_semirremolque = req.body.semi;

    await newTravel.save();

    res.json(newTravel);
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ msg: error.message });
  }
};

const getTravel = async (req: Request, res: Response) => {
  const { id } = req.params;
  const businessId = req.body.business.id_business;

  try {
    const travelExist = await Travel.findByPk(id, {
      attributes: ["date", "id_travel"],
      include: [
        {
          model: Business,
          where: { id_business: businessId },
          attributes: ["id_business"],
        },
        {
          model: Vehicle,
          attributes: [
            "model",
            "patent",
            "typeVehicle",
            "picture",
            "id_vehicle",
          ],
          as: "truck",
        },
        {
          model: Vehicle,
          attributes: [
            "model",
            "patent",
            "typeVehicle",
            "picture",
            "id_vehicle",
          ],
          as: "semi",
        },
        {
          model: Employee,
          attributes: ["name", "lastname", "type", "picture", "id_employee"],
          as: "truck_driver",
        },
        {
          model: Employee,
          attributes: ["name", "lastname", "type", "picture", "id_employee"],
          as: "truck_assistant",
        },
      ],
    });

    if (travelExist?.Business.id_business !== businessId) {
      return res
        .status(404)
        .json({ msg: "Does not belong to the business logged in11" });
    }
    res.json(travelExist);
  } catch (error: any) {
    console.log(error);
    return res.status(404).json({ msg: error.message });
  }
};

const putTravel = async (req: Request, res: Response) => {
  const { id } = req.params;
  const businessId = req.body.business.id_business;
  const { date, truck_driver, truck_assistant, truck, semi } = req.body;

  try {
    const travelExist = await Travel.findByPk(id, {
      attributes: [
        "date",
        "id_travel",
        "id_driver",
        "id_assistant",
        "id_vehicle",
        "id_semirremolque",
      ],
      include: [
        {
          model: Business,
          where: { id_business: businessId },
          attributes: ["id_business"],
        },
      ],
    });
    if (travelExist?.Business.id_business !== businessId) {
      return res
        .status(404)
        .json({ msg: "Does not belong to the business logged in12" });
    }

    travelExist!.date = date || travelExist?.date;
    travelExist!.id_driver = truck_driver || travelExist?.id_driver;
    travelExist!.id_assistant = truck_assistant || travelExist?.id_assistant;
    travelExist!.id_vehicle = truck || travelExist?.id_vehicle;

    const isTractor = await Vehicle.findByPk(truck);
    const isSemirremolque = await Vehicle.findByPk(semi);

    if (
      isTractor?.typeVehicle === "tractor" &&
      isSemirremolque?.id_vehicle === "not_semirremolque"
    ) {
      const error = new Error("Semirremolque cannot be empty");
      return res.status(400).json({ msg: error.message });
    }

    if (
      isTractor?.typeVehicle !== "tractor" &&
      isSemirremolque?.id_vehicle !== "not_semirremolque"
    ) {
      const error = new Error(
        "You cannot assign a semirremolque to a truck that is not a tractor."
      );
      return res.status(400).json({ msg: error.message });
    }

    travelExist!.id_semirremolque = semi || travelExist?.id_semirremolque;

    await travelExist?.save();
    res.json(travelExist);
  } catch (error: any) {
    console.log(error);
    return res.status(404).json({ msg: error.message });
  }
};

const deleteTravel = async (req: Request, res: Response) => {
  const { id } = req.params;
  const businessId = req.body.business.id_business;

  try {
    const travelExist = await Travel.findByPk(id);
    const shipmentExist = await Shipment.findAll({
      where: { id_travel: id },
    });

    if (travelExist?.id_business !== businessId) {
      return res
        .status(404)
        .json({ msg: "Does not belong to the business logged in13" });
    }

    if (shipmentExist.length !== 0) {
      return res.status(404).json({
        msg: "You cannot remove a travel if it has had some travel",
      });
    }

    await travelExist?.destroy();
    res.json({ msg: "Travel successfully eliminated" });
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ msg: error.message });
  }
};

export { getTravels, createTravel, getTravel, putTravel, deleteTravel };
