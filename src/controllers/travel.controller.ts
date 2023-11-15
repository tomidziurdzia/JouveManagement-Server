import { Request, Response } from "express";
import { Travel, Business, Employee, Vehicle, Shipment } from "../models";
import { TravelInterface } from "../interface/travel.interface";

const getTravels = async (req: Request, res: Response) => {
  const { page = 1, size = 5 } = req.query;
  const limit = +size;
  const offset = (+page - 1) * +size;
  const businessId = req.body.business.id_business;

  try {
    const { count, rows } = await Travel.findAndCountAll({
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
          attributes: ["model", "patent", "typeVehicle", "picture"],
          as: "truck",
        },
        {
          model: Vehicle,
          attributes: ["model", "patent", "typeVehicle", "picture"],
          as: "semi",
        },
        {
          model: Employee,
          attributes: ["name", "lastname", "type", "picture"],
          as: "truck_driver",
        },
        {
          model: Employee,
          attributes: ["name", "lastname", "type", "picture"],
          as: "truck_assistant",
        },
      ],
    });

    // const formattedTravels = rows.map((travel) => ({
    //   id_travel: travel.id_travel,
    //   date: travel.date,
    //   truck: {
    //     model: travel.truck.model,
    //     patent: travel.truck.patent,
    //     typeVehicle: travel.truck.typeVehicle,
    //     picture: travel.truck.picture,
    //   },
    //   semi: {
    //     model: travel.semi.model,
    //     patent: travel.semi.patent,
    //     typeVehicle: travel.semi.typeVehicle,
    //     picture: travel.semi.picture,
    //   },
    //   truck_driver: {
    //     name: travel.truck_driver.name,
    //     lastname: travel.truck_driver.lastname,
    //     type: travel.truck_driver.type,
    //     picture: travel.truck_driver.picture,
    //   },
    //   truck_assistant: {
    //     name: travel.truck_assistant.name,
    //     lastname: travel.truck_assistant.lastname,
    //     type: travel.truck_assistant.type,
    //     picture: travel.truck_assistant.picture,
    //   },
    // }));
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
  console.log(req.body);
  try {
    const driverExist = await Employee.findAll({
      where: {
        id_employee: truck_driver,
        type: "Driver",
      },
    });

    const vehicleExist = await Vehicle.findAll({
      where: {
        id_vehicle: truck,
        typeVehicle: ["chasis truck", "balancin truck", "tractor"],
      },
    });

    const semirremolqueExist = await Vehicle.findAll({
      where: {
        id_vehicle: semi!,
        typeVehicle: ["semirremolque"],
      },
    });

    if (date === "") {
      const error = new Error("Date cannot be empty");
      return res.status(400).json({ msg: error.message });
    }

    if (driverExist[0] === undefined) {
      const error = new Error("Driver cannot be empty");
      return res.status(400).json({ msg: error.message });
    }

    if (vehicleExist[0] === undefined) {
      const error = new Error("Vehicle cannot be empty");
      return res.status(400).json({ msg: error.message });
    }

    if (
      vehicleExist[0].dataValues.typeVehicle === "tractor" &&
      semirremolqueExist[0] === undefined
    ) {
      const error = new Error("Semirremolque cannot be empty");
      return res.status(400).json({ msg: error.message });
    }

    if (
      vehicleExist[0].dataValues.typeVehicle !== "tractor" &&
      semirremolqueExist[0] !== undefined
    ) {
      const error = new Error(
        "You cannot assign a semirremolque to a truck that is not a tractor."
      );
      return res.status(400).json({ msg: error.message });
    }
    const newTravel = new Travel(req.body);

    // Asign id business
    newTravel.id_business = req.body.business.id_business;
    newTravel.id_vehicle = req.body.truck;
    newTravel.id_semirremolque = req.body.semi === "" ? "-" : req.body.semi;
    newTravel.id_driver = req.body.truck_driver;
    newTravel.id_assistant =
      req.body.truck_assistant === "" ? "-" : req.body.truck_assistant;

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
          attributes: ["model", "patent", "typeVehicle", "picture"],
          as: "truck",
        },
        {
          model: Vehicle,
          attributes: ["model", "patent", "typeVehicle", "picture"],
          as: "semi",
        },
        {
          model: Employee,
          attributes: ["name", "lastname", "type", "picture"],
          as: "truck_driver",
        },
        {
          model: Employee,
          attributes: ["name", "lastname", "type", "picture"],
          as: "truck_assistant",
        },
      ],
    });

    if (travelExist?.Business.id_business !== businessId) {
      return res
        .status(404)
        .json({ msg: "Does not belong to the business logged in" });
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
  const {
    date,
    id_assistant,
    id_driver,
    id_semirremolque,
    id_vehicle,
  }: TravelInterface = req.body;

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
        {
          model: Vehicle,
          attributes: ["typeVehicle"],
          as: "truck",
        },
        {
          model: Vehicle,
          attributes: ["typeVehicle"],
          as: "semi",
        },
      ],
    });
    if (travelExist?.Business.id_business !== businessId) {
      return res
        .status(404)
        .json({ msg: "Does not belong to the business logged in" });
    }

    travelExist!.date = date || travelExist?.date;
    travelExist!.id_driver = id_driver || travelExist?.id_driver;
    travelExist!.id_assistant = id_assistant || travelExist?.id_assistant;
    travelExist!.id_vehicle = id_vehicle || travelExist?.id_vehicle;

    const isTractor = await Vehicle.findByPk(id_vehicle);
    const isSemirremolque = await Vehicle.findByPk(id_semirremolque);

    if (isTractor?.typeVehicle === "tractor" && isSemirremolque === null) {
      const error = new Error("Semirremolque cannot be empty");
      return res.status(400).json({ msg: error.message });
    }

    if (isTractor?.typeVehicle !== "tractor" && isSemirremolque !== null) {
      const error = new Error(
        "You cannot assign a semirremolque to a truck that is not a tractor."
      );
      return res.status(400).json({ msg: error.message });
    }

    travelExist!.id_semirremolque =
      id_semirremolque || travelExist?.id_semirremolque;

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

    console.log(shipmentExist.length);
    if (travelExist?.id_business !== businessId) {
      return res
        .status(404)
        .json({ msg: "Does not belong to the business logged in" });
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
