import { Request, Response } from "express";
import { getRepository, getManager } from "typeorm";
import Service from "../database/models/service";

class ServiceController {
  /**
   * REST METHODS
   */

  static listAll = async (req: Request, res: Response) => {
    try {
      const services: Service[] = await getRepository(Service).find();

      for (const service of services) {
        await ServiceController.calculatePricePerPerson(service.id).then(
          res => {
            service.pricePerPerson = res;
          }
        );
      }

      res.send(services);
    } catch (error) {}
  };

  static listOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const service: Service = await getRepository(Service).findOneOrFail(id);
      res.send(service);
    } catch (error) {}
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
    serviceToUpdate.price = price;

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

  static getCountAllPersons = async (req: Request, res: Response) => {
    try {
      res.status(201).send(await ServiceController.countAllPersons());
    } catch (error) {}
  };

  static getCountPersonsWithService = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      res
        .status(201)
        .send(
          await ServiceController.countAllPersonsWithService(
            Number.parseInt(id)
          )
        );
    } catch (error) {}
  };

  /**
   * METHODS
   */
  static calculatePricePerPerson = async (id: number) => {
    let pricePerPerson!: number;
    let numPersons!: number;
    let price!: number;

    await getRepository(Service)
      .findOneOrFail(id)
      .then((res: Service) => (price = res.price));

    await ServiceController.countAllPersonsWithService(id).then(
      res => (numPersons = Number.parseInt(res[0].count))
    );

    if (numPersons === 0) {
      numPersons = 1;
    }

    return (pricePerPerson = price / numPersons);
  };

  static countAllPersons = async () => {
    // Get the count of people who contracted a determinated service.
    return await getManager().query(
      `SELECT S.id, count(distinct peopleId) as count FROM peopleservices PS right JOIN services S ON PS.servicesId = S.id GROUP BY S.id`
    );
  };

  static countAllPersonsWithService = async (id: number) => {
    // Get the count of people who contracted a determinated service.
    return await getManager().query(
      `SELECT servicesId, count(distinct peopleId) as count FROM peopleservices S WHERE S.servicesId = 1;`
    );
  };
}

export default ServiceController;
