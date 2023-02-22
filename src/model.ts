export type Integer = number
export type Amount = number
export type Decimal = number
export type PrimaryKey = number
export type Point = number

export enum StaffAuthority {
  transcationOp = "transaction",
  admin = "admin",
}
export interface Staff {
  key: PrimaryKey
  /**
   * Just check the equality, becasue the password could be encrypted.
   */
  password: string
  /**
   * The key in student list.
   * Since every operator is also a student in database.
   */
  studentKey: PrimaryKey
  authority: StaffAuthority
  creationTime: Date
  get student(): Promise<Student>
}

export interface Student {
  key: PrimaryKey
  studentID: string
  name: string
  isPoorStudent: boolean
  currentPoint: Point
  creationTime: Date
  /**
   * Null when the student not yet to provide it.
   */
  phoneNumber: string | null
}

enum PointChangeReason {
  redeem,
  rental,
  yearlyCost,
  volunteer
}

export interface PointChangeRecord {
  key: PrimaryKey
  subjectKey: PrimaryKey
  operatorKey: PrimaryKey
  beforeChange: Point
  afterChange: Point
  reason: PointChangeReason | null
  creationTime: Date
  get subject(): Promise<Student>
  get operator(): Promise<Staff>
}

export interface TranscationRecord {
  key: PrimaryKey
  customerKey: PrimaryKey
  operatorKey: PrimaryKey
  itemKey: PrimaryKey
  amount: Integer
  originalPrice: Point
  finalPrice: Decimal
  note: String | null
  creationTime: Date
  get item(): Promise<Item>
  get customer(): Promise<Student>
  get operator(): Promise<Staff>
}

export interface Item {
  key: PrimaryKey
  name: string
  description: string
  price: Point
  rent: Point
  hasPoorDiscount: boolean
  rentable: boolean
  forSales: boolean
  creationTime: Date
}

enum ItemAmountChangeReason {
  redeemed = "redeemed",
  rented = "rented",
  missing = "missing"
}

export interface ItemAmountChangeRecord {
  key: PrimaryKey
  name: string
  itemKey: PrimaryKey
  relatedKey: PrimaryKey | null
  reason: ItemAmountChangeReason | null
  beforeChange: Amount
  afterChange: Amount
  creationTime: Date
  get item(): Promise<Item>
}

export interface DonationRecord {
  key: PrimaryKey
  donatorKey: PrimaryKey
  operatorKey: PrimaryKey
  note: string
  creationTime: Date
  get donator(): Promise<Student>
  get operator(): Promise<Staff>
}

export interface RentalRecord {
  key: PrimaryKey
  borrowerKey: PrimaryKey
  operatorKey: PrimaryKey
  itemKey: PrimaryKey
  name: string
  phoneNumber: string
  deadline: Date
  startTime: Date
  returnTime: Date | null
  get borrower(): Promise<Student>
  get operator(): Promise<Staff>
  get item(): Promise<Item>
}