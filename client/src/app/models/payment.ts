import Person from "./person";

export class Payment {
    id!: number;
    observation!: string;
    active!: boolean;
    createdAt!: Date;
    updatedAt!: Date;
    person!: Person;
    constructor() {
    }
}