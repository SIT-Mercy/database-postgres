import { PrimaryKey, StudentID } from "./model.js"
export enum OperatorAuthority {
  transcationOp = "transaction",
  admin = "admin",
}
export interface Operator {
  key: PrimaryKey
  studentID: StudentID
  /**
   * Just check the equality, becasue the password could be encrypted.
   */
  password: string
  /**
   * The key in student list.
   * Since every operator is also a student in database.
   */
  studentKey: PrimaryKey
  authority: OperatorAuthority
}