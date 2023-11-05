import { Request, Response } from "express";
import { Travel, Business, Employee, Vehicle } from "../models";
import { TravelInterface } from "../interface/travel.interface";

const getTravels = async (req: Request, res: Response) => {
  const businessId = req.body.business.id_business;
  try {
    const travels = await Travel.findAll({
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

    const formattedTravels = travels.map((travel) => ({
      id_travel: travel.id_travel,
      date: travel.date,
      truck: {
        model: travel.truck.model,
        patent: travel.truck.patent,
        typeVehicle: travel.truck.typeVehicle,
        picture: travel.truck.picture,
      },
      semi: {
        model: travel.semi.model,
        patent: travel.semi.patent,
        typeVehicle: travel.semi.typeVehicle,
        picture: travel.semi.picture,
      },
      truck_driver: {
        name: travel.truck_driver.name,
        lastname: travel.truck_driver.lastname,
        type: travel.truck_driver.type,
        picture: travel.truck_driver.picture,
      },
      truck_assistant: {
        name: travel.truck_assistant.name,
        lastname: travel.truck_assistant.lastname,
        type: travel.truck_assistant.type,
        picture: travel.truck_assistant.picture,
      },
    }));

    res.json(formattedTravels);
  } catch (error: any) {
    console.log(error);
    return res.status(404).json({ msg: error.message });
  }
};

const createTravel = async (req: Request, res: Response) => {
  const { date, id_driver, id_truck, id_semi } = req.body;

  const driverExist = await Employee.findAll({
    where: {
      id_employee: id_driver,
      type: "Driver",
    },
  });

  const vehicleExist = await Vehicle.findAll({
    where: {
      id_vehicle: id_truck,
      typeVehicle: ["chasis truck", "balancin truck", "tractor"],
    },
  });

  const semirremolqueExist = await Vehicle.findAll({
    where: {
      id_vehicle: id_semi!,
      typeVehicle: ["semirremolque"],
    },
  });

  try {
    await Travel.sync();
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
    newTravel.id_vehicle = req.body.id_truck;
    newTravel.id_semirremolque =
      req.body.id_semi.length === 0 ? "-" : req.body.id_semi;
    newTravel.id_driver = req.body.id_driver;
    newTravel.id_assistant =
      req.body.id_assistant.length === 0 ? "-" : req.body.id_assistant;

    await newTravel.save();
    res.json(newTravel);
  } catch (error: any) {
    console.log("chau");
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
  //TODO: Me falta agregar que no pueda eliminar travels si tienen envios asignados

  const { id } = req.params;
  const businessId = req.body.business.id_business;

  try {
    const travelExist = await Travel.findByPk(id);
    if (travelExist?.id_business !== businessId) {
      return res
        .status(404)
        .json({ msg: "Does not belong to the business logged in" });
    }

    await travelExist?.destroy();
    res.json({ msg: "Employee successfully eliminated" });
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ msg: error.message });
  }
};

export { getTravels, createTravel, getTravel, putTravel, deleteTravel };
