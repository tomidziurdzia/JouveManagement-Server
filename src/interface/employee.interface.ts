export interface EmployeeInterface {
  id_employee?: string;
  name: string;
  lastname: string;
  cuil: string;
  picture?: string;
  password: string;
  type: "Administrative" | "Driver" | "Assistant" | "";
}
