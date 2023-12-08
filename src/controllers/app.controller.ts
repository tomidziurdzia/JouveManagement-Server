import { Request, Response } from "express";
import { Business, Employee, Travel, Vehicle } from "../models";

const getAppTravels = async (req: Request, res: Response) => {
  const { page = 1, size = 5 } = req.query;
  const limit = +size;
  const offset = (+page - 1) * +size;
  const businessId = req.body.employee.id_business;
  const employeeId = req.body.employee.id_employee;

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
          model: Employee,
          where: { id_employee: employeeId },
          attributes: ["name", "lastname", "type", "picture", "id_employee"],
          as: "truck_driver",
        },
        {
          model: Employee,
          attributes: ["name", "lastname", "type", "picture", "id_employee"],
          as: "truck_assistant",
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

const geAppTravel = async (req: Request, res: Response) => {
  const { id } = req.params;
  const businessId = req.body.employee.id_business;
  const employeeId = req.body.employee.id_employee;

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
          where: { id_employee: employeeId },
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
        .json({ msg: "Does not belong to the business logged in" });
    }
    res.json(travelExist);
  } catch (error: any) {
    console.log(error);
    return res.status(404).json({ msg: error.message });
  }
};

export { getAppTravels, geAppTravel };
