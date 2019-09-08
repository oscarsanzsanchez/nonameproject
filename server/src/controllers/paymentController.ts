import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Payment from "../database/models/payments";

class PaymentController {
  static listAll = async (req: Request, res: Response) => {
    try {
      const result: Payment[] = await getRepository(Payment).find();
      res.send(result);
    } catch (error) {}
  };

  static listOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const result: Payment = await getRepository(Payment).findOneOrFail(id);
      res.send(result);
    } catch (error) {}
  };

  static listByPersonId = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const result = await getRepository(Payment).find({
        where: [
          {
            person: id
          }
        ]
      });
      res.send(result);
    } catch (error) {}
  };

  static new = async (req: Request, res: Response) => {
    let { observation, active, person } = req.body;

    let newObject = new Payment();
    newObject.observation = observation;
    newObject.active = active;
    newObject.person = person;

    try {
      await getRepository(Payment).save(newObject);
      res
        .status(201)
        .send({ message: "Payment created succesfully", payment: newObject });
    } catch (error) {}
  };

  static update = async (req: Request, res: Response) => {
    const { id } = req.params;

    let objectToUpdate!: Payment;

    try {
      objectToUpdate = await getRepository(Payment).findOneOrFail(id);
    } catch (error) {
      res.status(404).send({ message: "Service not found" });
      return;
    }

    let { observation, active, person } = req.body;
    objectToUpdate.observation = observation;
    objectToUpdate.active = active;
    objectToUpdate.person = person;

    try {
      await getRepository(Payment).save(objectToUpdate);
      res.status(204).send({
        message: "Payment updated succesfully",
        payment: objectToUpdate
      });
    } catch (error) {
      res.status(500).send({ message: "Ups... Try again later" });
    }
  };

  static delete = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      await getRepository(Payment).delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).send({ message: "Ups... Try again later" });
    }
  };
}

export default PaymentController;
