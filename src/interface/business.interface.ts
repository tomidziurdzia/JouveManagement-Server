export interface BusinessInterface {
  id?: string;
  businessName: string;
  cuit: string;
  email: string;
  picture?: string;
  password: string;
  confirmed: boolean;
  googleAccount: boolean;
  token: string;
  role: "owner" | "employee";
}
