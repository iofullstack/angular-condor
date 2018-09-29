export class User {
  _id?: string;
  ci: string;
  firstName: string;
  lastName: string;
  avatar?:string;
  email?:string;
  password?:string;
  gender?:string;
  birthday?:Date;
  address?:string;
  cellphone?:string;
  createdAt?: Date;

  constructor(
    ci: string,
    firstName: string,
    lastName: string,
    createdAt?: Date
  ) {
    this._id = '1';
    this.ci = ci;
    this.firstName = firstName;
    this.lastName = lastName;
    this.createdAt = createdAt;
  }
}
