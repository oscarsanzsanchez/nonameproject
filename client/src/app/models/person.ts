import Service from "./service";

export default class Person {
  id!: number;
  name!: string;
  surname!: string;
  fee!: number;
  services!: Service[];

  constructor() {}
}
