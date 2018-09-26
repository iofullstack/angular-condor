export class Client {
  _id?: string;
  nit_passport: string;
  firstName: string;
  lastName: string;
  createdAt?: Date;

  constructor(
    nit_passport: string,
    firstName: string,
    lastName: string,
    createdAt?: Date
  ) {
    this._id = '1';
    this.nit_passport = nit_passport;
    this.firstName = firstName;
    this.lastName = lastName;
    this.createdAt = createdAt;
  }
}
