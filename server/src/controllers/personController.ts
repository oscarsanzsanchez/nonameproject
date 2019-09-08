import { Request, Response } from "express";
import { getManager, getRepository } from "typeorm";
import Person from "../database/models/person";
import ServiceController from "./serviceController";

class PersonController {
  static listAll = async (req: Request, res: Response) => {
    try {
      const people: Person[] = await getRepository(Person).find();
      res.send(people);
    } catch (error) {
      console.log(error);
    }
  };

  static listOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const person: Person = await getRepository(Person).findOneOrFail(id);
      res.send(person);
    } catch (error) {}
  };

  static newPerson = async (req: Request, res: Response) => {
    let { name, surname, fee, services } = req.body;
    let person = new Person();
    person.name = name;
    person.surname = surname;
    person.fee = fee;
    person.services = services;

    try {
      await getRepository(Person).save(person);
      await PersonController.updateAllFees();
      res.status(204).send();
    } catch (error) {
      console.log(error);

      return;
    }
  };

  static updatePerson = async (req: Request, res: Response) => {
    const { id } = req.params;

    let personToUpdate!: Person;

    try {
      personToUpdate = await getRepository(Person).findOneOrFail(id);
    } catch (error) {
      res.status(404).send({ message: "User not found" });
      return;
    }

    let { name, surname, fee, services } = req.body;
    personToUpdate.name = name;
    personToUpdate.surname = surname;
    personToUpdate.fee = fee;
    personToUpdate.services = services;

    try {
      await getRepository(Person).save(personToUpdate);
      PersonController.updateAllFees();
      res.status(204).send();
    } catch (error) {
      return;
    }
  };

  static deletePerson = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      await getRepository(Person).delete(id);
      await PersonController.updateAllFees();
      console.log("todo actualizado 2");
      res.status(204).send();
    } catch (error) {
      res.status(500).send({ message: "Ups... Try again later" });
    }
  };

  /**
   * METHODS
   */

  static getServicesOfAPerson = async (idPerson: number) => {
    // Get the count of people who contracted a determinated service.

    return await getManager().query(
      `SELECT id, price FROM services WHERE id in(SELECT servicesId FROM peopleservices WHERE peopleId = ${idPerson})`
    );
  };

  static async updateAllFees() {
    // Get all people
    const allPersons = await getRepository(Person).find();

    allPersons.forEach(async person => {
      person.fee = 0;
      let services: any[] = [];
      await PersonController.getServicesOfAPerson(person.id).then(res => {
        services = res;
      });

      for (const service of services) {
        let countPersons = 0;
        await ServiceController.countAllPersonsWithService(service.id).then(
          res => (countPersons = res[0].count)
        );

        if (countPersons === 0) {
          countPersons = 1;
        }

        person.fee += service.price / countPersons;
      }
      await getRepository(Person).save(person);
    });

    console.log("Todo actualizado 1");
  }
}

export default PersonController;
