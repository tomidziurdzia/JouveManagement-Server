export interface VehicleInterface {
  id_vehicle?: string;
  patent: string;
  model: string;
  typeVehicle: "chasis truck" | "balancin truck" | "semirremolque" | "tractor";
  picture?: string;
  id_business?: string;
}
