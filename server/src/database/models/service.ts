import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable
} from "typeorm";
import Person from "./person";

@Entity("services")
class Service {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  price!: number;

  @ManyToMany(type => Person, person => person.services)
  people!: Person[];
}

export default Service;
