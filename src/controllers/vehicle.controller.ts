import { Request, Response } from "express";
import { Business, Vehicle } from "../models";
import { VehicleInterface } from "../interface/vehicle.interface";
import { Op } from "sequelize";

const getVehicles = async (req: Request, res: Response) => {
  const businessId = req.body.business.id_business;
  try {
    const vehicles = await Vehicle.findAll({
      attributes: ["id_vehicle", "patent", "model", "typeVehicle", "picture"],
      include: [
        {
          model: Business,
          where: { id_business: businessId },
          attributes: ["id_business"],
        },
      ],
    });

    res.json(vehicles);
  } catch (error: any) {
    console.log(error);
    return res.status(404).json({ msg: error.message });
  }
};
const createVehicle = async (req: Request, res: Response) => {
  try {
    await Vehicle.sync();

    const { patent, model, typeVehicle }: VehicleInterface = req.body;

    // Prevenir vehicles duplicados
    const vehicleExist = await Vehicle.findOne({
      where: {
        [Op.or]: [
          { patent }, // Verificar si el nombre de la empresa ya existe
        ],
      },
    });

    if (vehicleExist) {
      const error = new Error("Vehicle already registered");
      return res.status(400).json({ msg: error.message });
    }

    if (patent === "") {
      const error = new Error("Vehicle patent cannot be empty");
      return res.status(400).json({ msg: error.message });
    }

    if (model === "") {
      const error = new Error("Vehicle model cannot be empty");
      return res.status(400).json({ msg: error.message });
    }

    if (!typeVehicle) {
      const error = new Error("Vehicle type cannot be empty");
      return res.status(400).json({ msg: error.message });
    }

    const newVehicle = new Vehicle(req.body);

    // Asign id business
    newVehicle.id_business = req.body.business.id_business;

    await newVehicle.save();
    res.json(newVehicle);
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ msg: error.message });
  }
};

const getVehicle = async (req: Request, res: Response) => {
  const { id } = req.params;
  const businessId = req.body.business.id_business;

  try {
    const vehicleExist = await Vehicle.findByPk(id);
    if (vehicleExist?.id_business !== businessId) {
      return res
        .status(404)
        .json({ msg: "Does not belong to the business logged in" });
    }
    res.json(vehicleExist);
  } catch (error: any) {
    console.log(error);
    return res.status(404).json({ msg: error.message });
  }
};
const putVehicles = async (req: Request, res: Response) => {
  const { id } = req.params;
  const businessId = req.body.business.id_business;
  const { patent, model, picture, typeVehicle }: VehicleInterface = req.body;

  try {
    const vehicleExist = await Vehicle.findByPk(id);
    if (vehicleExist?.id_business !== businessId) {
      return res
        .status(404)
        .json({ msg: "Does not belong to the business logged in" });
    }

    vehicleExist!.patent = patent || vehicleExist?.patent;
    vehicleExist!.model = model || vehicleExist?.model;
    vehicleExist!.picture = picture || vehicleExist?.picture;
    vehicleExist!.typeVehicle = typeVehicle || vehicleExist?.typeVehicle;

    await vehicleExist?.save();

    res.json({ msg: "We have saved your details" });
  } catch (error) {
    console.log(error);
  }
};
const deleteVehicle = async (req: Request, res: Response) => {
  //TODO: Me falta agregar que no pueda eliminar vehiculos si tienen viajes asignados
  const { id } = req.params;
  const businessId = req.body.business.id_business;
  try {
    const vehicleExist = await Vehicle.findByPk(id);
    if (vehicleExist?.id_business !== businessId) {
      return res
        .status(404)
        .json({ msg: "Does not belong to the business logged in" });
    }

    await vehicleExist?.destroy();
    res.json({ msg: "Vehicle successfully eliminated" });
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ msg: error.message });
  }
};

export { getVehicles, createVehicle, getVehicle, putVehicles, deleteVehicle };
