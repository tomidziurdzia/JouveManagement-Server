import { Request, Response } from "express";
import { Business, Travel, Vehicle } from "../models";
import { VehicleInterface } from "../interface/vehicle.interface";
import { Op } from "sequelize";

const getVehicles = async (req: Request, res: Response) => {
  const { page = 1, size = 5 } = req.query;
  const limit = +size;
  const offset = (+page - 1) * +size;
  const businessId = req.body.business.id_business;
  try {
    const { count, rows } = await Vehicle.findAndCountAll({
      limit,
      offset,
      attributes: ["id_vehicle", "patent", "model", "typeVehicle", "picture"],
      include: [
        {
          model: Business,
          where: { id_business: businessId },
          attributes: ["id_business"],
        },
      ],
    });

    res.json({
      total: count,
      vehicles: rows,
    });
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
  try {
    const { id } = req.params;
    const businessId = req.body.business.id_business;

    // Asegúrate de que Vehicle.findByPk(id) devuelve una promesa
    const vehicleExist = await Vehicle.findByPk(id);
    console.log(vehicleExist?.id_business);

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

    res.json(vehicleExist);
  } catch (error) {
    console.log(error);
  }
};
const deleteVehicle = async (req: Request, res: Response) => {
  const { id } = req.params;
  const businessId = req.body.business.id_business;

  try {
    const vehicleExist = await Vehicle.findByPk(id);
    const travelExist: Travel[] = await Travel.findAll({
      where: {
        [Op.or]: [{ id_vehicle: id }, { id_semirremolque: id }],
      },
    });
    if (vehicleExist?.id_business !== businessId) {
      return res
        .status(404)
        .json({ msg: "Does not belong to the business logged in" });
    }

    if (travelExist.length !== 0) {
      return res.status(404).json({
        msg: "You cannot remove a vehicle if it has had some travel",
      });
    }

    await vehicleExist?.destroy();
    res.json({ msg: "Vehicle successfully eliminated" });
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ msg: error.message });
  }
};

export { getVehicles, createVehicle, getVehicle, putVehicles, deleteVehicle };
