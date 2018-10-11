export class User {
  _id?: string;
  ci: number;
  exp: string;
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
}
