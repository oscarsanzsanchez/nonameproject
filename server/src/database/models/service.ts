import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import Person from "./person";

@Entity("services")
class Service {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  price!: number;

  @Column()
  pricePerPerson!: number;

}

export default Service;
