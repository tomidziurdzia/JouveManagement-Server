export interface ShipmentInterface {
  id_shipment?: string;
  id_travel?: string;
  from: string;
  to: string;
  client: string;
  description: string;
  delivered: boolean;
  reason?: string;
  picture?: string;
}
