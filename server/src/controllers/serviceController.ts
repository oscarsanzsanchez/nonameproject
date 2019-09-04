import { Request, Response } from "express";
import { getRepository, getManager } from "typeorm";
import Service from "../database/models/service";

class ServiceController {
  static listAll = async (req: Request, res: Response) => {
    try {
      const service: Service[] = await getRepository(Service).find();
      res.send(service);
    } catch (error) {}
  };

  static listOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const service: Service = await getRepository(Service).findOneOrFail(id);
      res.send(service);
    } catch (error) {}
  };

  static countPersons = async (req: Request, res: Response) => {
    try {
      //SELECT servicesId, count(peopleId) FROM peopleservices GROUP BY servicesId;
      const result = await getManager().query(`SELECT servicesId as serviceId, count(peopleId) as numPersons FROM peopleservices GROUP BY servicesId`);

      res.send(result);
    } catch (error) {
      res.send({message: "Cannot retreive information."})
    }
  };

  static newService = async (req: Request, res: Response) => {
    let { name, price } = req.body;
    let service = new Service();
    service.name = name;
    service.price = price;

    try {
      await getRepository(Service).save(service);
      res
        .status(201)
        .send({ message: "Service created succesfully", service: service });
    } catch (error) {}
  };

  static updateService = async (req: Request, res: Response) => {
    const { id } = req.params;

    let serviceToUpdate!: Service;

    try {
      serviceToUpdate = await getRepository(Service).findOneOrFail(id);
    } catch (error) {
      res.status(404).send({ message: "Service not found" });
      return;
    }

    let { name, price } = req.body;
    serviceToUpdate.name = name;
    serviceToUpdate.price = price

    try {
      await getRepository(Service).save(serviceToUpdate);
      res.status(204).send({
        message: "Service updated succesfully",
        person: serviceToUpdate
      });
    } catch (error) {
      res.status(500).send({ message: "Ups... Try again later" });
    }
  };

  static deleteService = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      await getRepository(Service).delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).send({ message: "Ups... Try again later" });
    }
  };
}

export default ServiceController;
