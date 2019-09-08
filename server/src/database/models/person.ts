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

  @ManyToMany(type => Service, {eager:true})
  @JoinTable({ name: "peopleservices" })
  services!: Service[];

  @OneToMany(type => Payment, payment => payment.person, {eager: true})
  payments!: Payment[];
}

export default Person;
