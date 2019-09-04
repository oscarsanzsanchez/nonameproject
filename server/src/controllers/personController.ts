import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Person from "../database/models/person";

class PersonController {
  static listAll = async (req: Request, res: Response) => {
    try {
      const people: Person[] = await getRepository(Person).find();
      res.send(people);
    } catch (error) {}
  };

  static listOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const person: Person = await getRepository(Person).findOneOrFail(id);
      res.send(person);
    } catch (error) {}
  };

  static newPerson = async (req: Request, res: Response) => {
    console.log(req.body);
    let { name, surname, fee, services } = req.body;
    let person = new Person();
    person.name = name;
    person.surname = surname;
    person.fee = fee;
    person.services = services;

    try {
      await getRepository(Person).save(person);
      res
        .status(201)
        .send({ message: "Person created succesfully", person: person });
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

    let { name, surname, fee } = req.body;
    personToUpdate.name = name;
    personToUpdate.surname = surname;
    personToUpdate.fee = fee;

    try {
      await getRepository(Person).save(personToUpdate);
      res.status(204).send({
        message: "Person updated succesfully",
        person: personToUpdate
      });
    } catch (error) {
      res.status(500).send({ message: "Ups... Try again later" });
    }
  };

  static deletePerson = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      await getRepository(Person).delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).send({ message: "Ups... Try again later" });
    }
  };
}

export default PersonController;
