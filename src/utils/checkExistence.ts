import { Business, Employee } from "../models";

const checkEmployeeExistence = async (id: string) => {
  const employeesExist = await Employee.findAll({
    attributes: ["id_employee"],
    include: [
      {
        model: Business,
        where: { id_business: id },
        attributes: ["id_business"],
      },
    ],
  });
  return employeesExist.length;
};

export { checkEmployeeExistence };
