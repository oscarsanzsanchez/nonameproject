import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import Service from "./service";

@Entity("people")
class Person {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  surname!: string;

  @Column()
  fee!: number;

  @ManyToMany(type => Service, service => service.people)
  @JoinTable({ name: "peopleservices"})
  services!: Service[];
}

export default Person;
