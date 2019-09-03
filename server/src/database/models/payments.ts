import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import Person from "./person";

@Entity("payments")
class Payment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  observation!: string;

  @Column()
  active!: boolean;

  @Column()
  @CreateDateColumn()
  createdAt!: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(type => Person, person => person.payments, {eager: true})
  person!: Person;
}

export default Payment;
