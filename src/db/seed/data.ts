import { hashPassword } from "../../utils";

export const seedData = {
  employees: [
    {
      id_employee: "empty-assistant",
      name: "-",
      lastname: "-",
      cuil: "-",
      picture: null,
      password: "-",
      type: "-",
      createdAt: "2023-11-05 00:25:52",
      updatedAt: "2023-11-05 00:25:52",
      id_business: "7e0fd031-90f8-44af-80ed-a881ef647d77",
    },
    {
      id_employee: "20287308397",
      name: "Martin",
      lastname: "Baez",
      cuil: "20287308397",
      picture: null,
      password: hashPassword("20287308397"),
      type: "Assistant",
      createdAt: "2023-11-05 00:25:52",
      updatedAt: "2023-11-05 00:25:52",
      id_business: "7e0fd031-90f8-44af-80ed-a881ef647d77",
    },
    {
      id_employee: "20419258009",
      name: "Mauro",
      lastname: "Alejo",
      cuil: "20419258009",
      picture: null,
      password: hashPassword("20419258009"),
      type: "Assistant",
      createdAt: "2023-11-05 00:25:52",
      updatedAt: "2023-11-05 00:25:52",
      id_business: "7e0fd031-90f8-44af-80ed-a881ef647d77",
    },
    {
      id_employee: "20348524748",
      name: "Exequiel",
      lastname: "Vega",
      cuil: "20348524748",
      picture: null,
      password: hashPassword("20348524748"),
      type: "Assistant",
      createdAt: "2023-11-05 00:25:52",
      updatedAt: "2023-11-05 00:25:52",
      id_business: "7e0fd031-90f8-44af-80ed-a881ef647d77",
    },
    {
      id_employee: "20394358518",
      name: "Axel",
      lastname: "Bartolomeo",
      cuil: "20394358518",
      picture: null,
      password: hashPassword("20394358518"),
      type: "Driver",
      createdAt: "2023-11-05 00:25:52",
      updatedAt: "2023-11-05 00:25:52",
      id_business: "7e0fd031-90f8-44af-80ed-a881ef647d77",
    },
    {
      id_employee: "20363447334",
      name: "Agustin",
      lastname: "Cabral",
      cuil: "20363447334",
      picture: null,
      password: hashPassword("20363447334"),
      type: "Driver",
      createdAt: "2023-11-05 00:25:52",
      updatedAt: "2023-11-05 00:25:52",
      id_business: "7e0fd031-90f8-44af-80ed-a881ef647d77",
    },
    {
      id_employee: "20331347621",
      name: "Maximiliano",
      lastname: "Casco",
      cuil: "20331347621",
      picture: null,
      password: hashPassword("20331347621"),
      type: "Driver",
      createdAt: "2023-11-05 00:25:52",
      updatedAt: "2023-11-05 00:25:52",
      id_business: "7e0fd031-90f8-44af-80ed-a881ef647d77",
    },
    {
      id_employee: "20314387393",
      name: "Pablo",
      lastname: "Magnifico",
      cuil: "20314387393",
      picture: null,
      password: hashPassword("20314387393"),
      type: "Driver",
      createdAt: "2023-11-05 00:25:52",
      updatedAt: "2023-11-05 00:25:52",
      id_business: "7e0fd031-90f8-44af-80ed-a881ef647d77",
    },
    {
      id_employee: "20323457531",
      name: "Ezequiel",
      lastname: "Olmedo",
      cuil: "20323457531",
      picture: null,
      password: hashPassword("20323457531"),
      type: "Driver",
      createdAt: "2023-11-05 00:25:52",
      updatedAt: "2023-11-05 00:25:52",
      id_business: "7e0fd031-90f8-44af-80ed-a881ef647d77",
    },
    {
      id_employee: "20360502830",
      name: "Ezequiel",
      lastname: "Ramirez",
      cuil: "20360502830",
      picture: null,
      password: hashPassword("20360502830"),
      type: "Driver",
      createdAt: "2023-11-05 00:25:52",
      updatedAt: "2023-11-05 00:25:52",
      id_business: "7e0fd031-90f8-44af-80ed-a881ef647d77",
    },
    {
      id_employee: "20133604147",
      name: "Jorge",
      lastname: "Sanchez",
      cuil: "20133604147",
      picture: null,
      password: hashPassword("20133604147"),
      type: "Driver",
      createdAt: "2023-11-05 00:25:52",
      updatedAt: "2023-11-05 00:25:52",
      id_business: "7e0fd031-90f8-44af-80ed-a881ef647d77",
    },
    {
      id_employee: "20215412289",
      name: "Jorge",
      lastname: "Villagra",
      cuil: "20215412289",
      picture: null,
      password: hashPassword("20215412289"),
      type: "Driver",
      createdAt: "2023-11-05 00:25:52",
      updatedAt: "2023-11-05 00:25:52",
      id_business: "7e0fd031-90f8-44af-80ed-a881ef647d77",
    },
    {
      id_employee: "20139869231",
      name: "Daniel",
      lastname: "Santana",
      cuil: "20139869231",
      picture: null,
      password: hashPassword("20139869231"),
      type: "Driver",
      createdAt: "2023-11-05 00:25:52",
      updatedAt: "2023-11-05 00:25:52",
      id_business: "7e0fd031-90f8-44af-80ed-a881ef647d77",
    },
  ],

  vehicles: [
    {
      id_vehicle: "not_semirremolque",
      patent: "-",
      model: "-",
      typeVehicle: "-",
      picture: null,
      id_business: "7e0fd031-90f8-44af-80ed-a881ef647d77",
    },
    {
      id_vehicle: "PBH868",
      patent: "PBH868",
      model: "Ford F4000",
      typeVehicle: "chasis truck",
      picture: null,
      id_business: "7e0fd031-90f8-44af-80ed-a881ef647d77",
    },
    {
      id_vehicle: "HMN147",
      patent: "HMN147",
      model: "Volkswagen 19.320E",
      typeVehicle: "tractor",
      picture: null,
      id_business: "7e0fd031-90f8-44af-80ed-a881ef647d77",
    },
    {
      id_vehicle: "HOF867",
      patent: "HOF867",
      model: "Volkswagen 19.320E",
      typeVehicle: "tractor",
      picture: null,
      id_business: "7e0fd031-90f8-44af-80ed-a881ef647d77",
    },
    {
      id_vehicle: "LLB473",
      patent: "LLB473",
      model: "Ford Cargo 1722",
      typeVehicle: "tractor",
      picture: null,
      id_business: "7e0fd031-90f8-44af-80ed-a881ef647d77",
    },
    {
      id_vehicle: "AC295CQ",
      patent: "AC295CQ",
      model: "Helvetica 3E",
      typeVehicle: "semirremolque",
      picture: null,
      id_business: "7e0fd031-90f8-44af-80ed-a881ef647d77",
    },
    {
      id_vehicle: "AB246YI",
      patent: "AB246YI",
      model: "Sthal Sider 15.50M",
      typeVehicle: "semirremolque",
      picture: null,
      id_business: "7e0fd031-90f8-44af-80ed-a881ef647d77",
    },
    {
      id_vehicle: "MRO261",
      patent: "MRO261",
      model: "Astivia AS3",
      typeVehicle: "semirremolque",
      picture: null,
      id_business: "7e0fd031-90f8-44af-80ed-a881ef647d77",
    },
    {
      id_vehicle: "HJD549",
      patent: "HJD549",
      model: "Mercedes Benz L-1318",
      typeVehicle: "balancin truck",
      picture: null,
      id_business: "7e0fd031-90f8-44af-80ed-a881ef647d77",
    },
    {
      id_vehicle: "AF679VY",
      patent: "AF679VY",
      model: "Iveco 170E28",
      typeVehicle: "balancin truck",
      picture: null,
      id_business: "7e0fd031-90f8-44af-80ed-a881ef647d77",
    },
    {
      id_vehicle: "AF221EZ",
      patent: "AF221EZ",
      model: "Mercedes Benz Atego 1721",
      typeVehicle: "chasis truck",
      picture: null,
      id_business: "7e0fd031-90f8-44af-80ed-a881ef647d77",
    },
    {
      id_vehicle: "AE711OZ",
      patent: "AE711OZ",
      model: "Mercedes Benz Atego 1721",
      typeVehicle: "chasis truck",
      picture: null,
      id_business: "7e0fd031-90f8-44af-80ed-a881ef647d77",
    },
    {
      id_vehicle: "AE711OY",
      patent: "AE711OY",
      model: "Mercedes Benz Atego 1721",
      typeVehicle: "chasis truck",
      picture: null,
      id_business: "7e0fd031-90f8-44af-80ed-a881ef647d77",
    },
    {
      id_vehicle: "NVR300",
      patent: "NVR300",
      model: "Mercedes Benz Atego 1418",
      typeVehicle: "chasis truck",
      picture: null,
      id_business: "7e0fd031-90f8-44af-80ed-a881ef647d77",
    },
    {
      id_vehicle: "AE463UF",
      patent: "AE463UF",
      model: "Mercedes Benz Accelo 815",
      typeVehicle: "chasis truck",
      picture: null,
      id_business: "7e0fd031-90f8-44af-80ed-a881ef647d77",
    },
    {
      id_vehicle: "IMY323",
      patent: "IMY323",
      model: "Iveco Daily 35C14",
      typeVehicle: "chasis truck",
      picture: null,
      id_business: "7e0fd031-90f8-44af-80ed-a881ef647d77",
    },
  ],

  travels: [
    {
      id_travel: "1",
      date: "01/10/2023",
      id_driver: "20394358518",
      id_assistant: "20287308397",
      id_vehicle: "PBH868",
      id_semirremolque: "not_semirremolque",
      id_business: "7e0fd031-90f8-44af-80ed-a881ef647d77",
    },
    {
      id_travel: "2",
      date: "02/10/2023",
      id_driver: "20363447334",
      id_assistant: "20419258009",
      id_vehicle: "AE711OZ",
      id_semirremolque: "not_semirremolque",
      id_business: "7e0fd031-90f8-44af-80ed-a881ef647d77",
    },
    {
      id_travel: "3",
      date: "03/10/2023",
      id_driver: "20331347621",
      id_assistant: "20348524748",
      id_vehicle: "AE463UF",
      id_semirremolque: "not_semirremolque",
      id_business: "7e0fd031-90f8-44af-80ed-a881ef647d77",
    },
    {
      id_travel: "4",
      date: "04/10/2023",
      id_driver: "20314387393",
      id_assistant: "empty-assistant",
      id_vehicle: "AE463UF",
      id_semirremolque: "not_semirremolque",
      id_business: "7e0fd031-90f8-44af-80ed-a881ef647d77",
    },
    {
      id_travel: "5",
      date: "05/10/2023",
      id_driver: "20323457531",
      id_assistant: "empty-assistant",
      id_vehicle: "HOF867",
      id_semirremolque: "AB246YI",
      id_business: "7e0fd031-90f8-44af-80ed-a881ef647d77",
    },
    {
      id_travel: "6",
      date: "06/10/2023",
      id_driver: "20360502830",
      id_assistant: "empty-assistant",
      id_vehicle: "HMN147",
      id_semirremolque: "MRO261",
      id_business: "7e0fd031-90f8-44af-80ed-a881ef647d77",
    },
    {
      id_travel: "7",
      date: "07/10/2023",
      id_driver: "20133604147",
      id_assistant: "20348524748",
      id_vehicle: "HJD549",
      id_semirremolque: "not_semirremolque",
      id_business: "7e0fd031-90f8-44af-80ed-a881ef647d77",
    },
    {
      id_travel: "8",
      date: "08/10/2023",
      id_driver: "20139869231",
      id_assistant: "20348524748",
      id_vehicle: "IMY323",
      id_semirremolque: "not_semirremolque",
      id_business: "7e0fd031-90f8-44af-80ed-a881ef647d77",
    },
    {
      id_travel: "9",
      date: "09/10/2023",
      id_driver: "20394358518",
      id_assistant: "20287308397",
      id_vehicle: "PBH868",
      id_semirremolque: "not_semirremolque",
      id_business: "7e0fd031-90f8-44af-80ed-a881ef647d77",
    },
    {
      id_travel: "10",
      date: "02/10/2023",
      id_driver: "20363447334",
      id_assistant: "20419258009",
      id_vehicle: "AE711OZ",
      id_semirremolque: "not_semirremolque",
      id_business: "7e0fd031-90f8-44af-80ed-a881ef647d77",
    },
    {
      id_travel: "11",
      date: "03/10/2023",
      id_driver: "20331347621",
      id_assistant: "20348524748",
      id_vehicle: "AE463UF",
      id_semirremolque: "not_semirremolque",
      id_business: "7e0fd031-90f8-44af-80ed-a881ef647d77",
    },
    {
      id_travel: "12",
      date: "04/10/2023",
      id_driver: "20314387393",
      id_assistant: "empty-assistant",
      id_vehicle: "AE463UF",
      id_semirremolque: "not_semirremolque",
      id_business: "7e0fd031-90f8-44af-80ed-a881ef647d77",
    },
    {
      id_travel: "13",
      date: "05/10/2023",
      id_driver: "20323457531",
      id_assistant: "empty-assistant",
      id_vehicle: "HOF867",
      id_semirremolque: "AB246YI",
      id_business: "7e0fd031-90f8-44af-80ed-a881ef647d77",
    },
    {
      id_travel: "14",
      date: "06/10/2023",
      id_driver: "20360502830",
      id_assistant: "empty-assistant",
      id_vehicle: "HMN147",
      id_semirremolque: "MRO261",
      id_business: "7e0fd031-90f8-44af-80ed-a881ef647d77",
    },
    {
      id_travel: "15",
      date: "07/10/2023",
      id_driver: "20133604147",
      id_assistant: "20348524748",
      id_vehicle: "HJD549",
      id_semirremolque: "not_semirremolque",
      id_business: "7e0fd031-90f8-44af-80ed-a881ef647d77",
    },
    {
      id_travel: "16",
      date: "08/10/2023",
      id_driver: "20139869231",
      id_assistant: "20348524748",
      id_vehicle: "IMY323",
      id_semirremolque: "not_semirremolque",
      id_business: "7e0fd031-90f8-44af-80ed-a881ef647d77",
    },
  ],
};

// export interface TravelInterface {
//   id_travel?: string;
//   date: string;
//   id_driver?: string | undefined;
//   id_assistant?: string | undefined;
//   id_vehicle?: string | undefined;
//   id_semirremolque?: string | undefined;
// }
