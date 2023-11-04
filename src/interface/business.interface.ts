export interface BusinessInterface {
  id_business?: string;
  businessName: string;
  cuit: string;
  email: string;
  picture?: string;
  password: string;
  confirmed: boolean;
  googleAccount: boolean;
  token: string;
}
