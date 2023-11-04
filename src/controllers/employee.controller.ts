import { Request, Response } from "express";
import { Business, Employee } from "../models";
import { EmployeeInterface } from "../interface/employee.interface";
import { Op } from "sequelize";
import { checkRegexPassword, hashPassword } from "../utils";

const getEmployees = async (req: Request, res: Response) => {
  const businessId = req.body.business.id_business;
  try {
    const employees = await Employee.findAll({
      attributes: [
        "id_employee",
        "name",
        "lastname",
        "cuil",
        "picture",
        "type",
      ],
      include: [
        {
          model: Business,
          where: { id_business: businessId },
          attributes: ["id_business"],
        },
      ],
    });

    res.json(employees);
  } catch (error: any) {
    console.log(error);
    return res.status(404).json({ msg: error.message });
  }
};
const createEmployee = async (req: Request, res: Response) => {
  try {
    await Employee.sync();
    const { name, lastname, cuil, password, type }: EmployeeInterface =
      req.body;

    // Prevenir Business duplicados
    const employeeExist = await Employee.findOne({
      where: {
        [Op.or]: [
          { cuil }, // Verificar si el nombre de la empresa ya existe
        ],
      },
    });
    if (employeeExist) {
      const error = new Error("Employee already registered");
      return res.status(400).json({ msg: error.message });
    }
    if (name === "") {
      const error = new Error("Employee name cannot be empty");
      return res.status(400).json({ msg: error.message });
    }
    if (lastname === "") {
      const error = new Error("Employee lastname cannot be empty");
      return res.status(400).json({ msg: error.message });
    }

    if (cuil === "") {
      const error = new Error("Cuil cannot be empty");
      return res.status(400).json({ msg: error.message });
    }

    if (type === "") {
      const error = new Error("Type cannot be empty");
      return res.status(400).json({ msg: error.message });
    }

    if (!/^\d{11}$/.test(cuil)) {
      const error = new Error("Cuil must have 11 numbers");
      return res.status(400).json({ msg: error.message });
    }

    if (password === "") {
      const error = new Error("Password cannot be empty");
      return res.status(400).json({ msg: error.message });
    }

    checkRegexPassword(password);
    const newEmployee = new Employee(req.body);

    // Hashear password
    newEmployee.password = hashPassword(password);

    // Asign id business
    newEmployee.id_business = req.body.business.id_business;

    await newEmployee.save();
    res.json(newEmployee);
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ msg: error.message });
  }
};
const getEmployee = async (req: Request, res: Response) => {
  const { id } = req.params;
  const businessId = req.body.business.id_business;

  try {
    const employeeExist = await Employee.findByPk(id);
    if (employeeExist?.id_business !== businessId) {
      return res
        .status(404)
        .json({ msg: "Does not belong to the business logged in" });
    }
    res.json(employeeExist);
  } catch (error: any) {
    console.log(error);
    return res.status(404).json({ msg: error.message });
  }
};

const putEmployee = async (req: Request, res: Response) => {
  const { id } = req.params;
  const businessId = req.body.business.id_business;
  const { name, lastname, picture, password, type }: EmployeeInterface =
    req.body;

  try {
    const employeeExist = await Employee.findByPk(id);
    if (employeeExist?.id_business !== businessId) {
      return res
        .status(404)
        .json({ msg: "Does not belong to the business logged in" });
    }

    employeeExist!.name = name || employeeExist?.name;
    employeeExist!.lastname = lastname || employeeExist?.lastname;
    employeeExist!.picture = picture || employeeExist?.picture;
    employeeExist!.type = type || employeeExist?.type;

    checkRegexPassword(password);
    employeeExist!.password = hashPassword(password) || employeeExist?.password;

    await employeeExist?.save();

    res.json({ msg: "We have saved your details" });
  } catch (error) {
    console.log(error);
  }
};

const deleteEmployee = async (req: Request, res: Response) => {
  //TODO: Me falta agregar que no pueda eliminar empleados si tienen viajes asignados
  const { id } = req.params;
  const businessId = req.body.business.id_business;
  try {
    const employeeExist = await Employee.findByPk(id);
    if (employeeExist?.id_business !== businessId) {
      return res
        .status(404)
        .json({ msg: "Does not belong to the business logged in" });
    }

    await employeeExist?.destroy();
    res.json({ msg: "Employee successfully eliminated" });
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ msg: error.message });
  }
};

export {
  getEmployees,
  createEmployee,
  getEmployee,
  putEmployee,
  deleteEmployee,
};
