import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import Payment from "./payments";
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

  @ManyToMany(type => Service, service => service.people, { eager: true })
  @JoinTable({ name: "peopleservices" })
  services!: Service[];

  @OneToMany(type => Payment, payment => payment.person)
  payments!: Payment[];
}

export default Person;
