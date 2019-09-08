import Service from "./service";
import { Payment } from "./payment";

export default class Person {
  id!: number;
  name!: string;
  surname!: string;
  fee!: number;
  services!: Service[];
  payments!: Payment[];

  constructor() {}
}
