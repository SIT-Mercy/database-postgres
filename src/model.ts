export type Integer = number
export type Decimal = number
export type Amount = number
export type PrimaryKey = number
export type Point = number

export interface DbEntity {
  saveChanges: () => Promise<void>
}
export enum PoorLevel {
  notPoor = 0,
  poor = 1,
  veryPoor = 2,
}

export interface Student {
  studentID: string
  name: string
  college: string
  poorLevel: PoorLevel
  currentPoint: Point
  creationTime: Date
  /**
   * Null when the student not yet to provide it.
   */
  phoneNumber: string | null
}

export interface StudentEntity extends Student, DbEntity {
  key: PrimaryKey
}

export enum StaffAuthority {
  transcationOp = "transaction",
  admin = "admin",
}
export interface Staff {
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
}

export interface StaffEntity extends Staff, DbEntity {
  key: PrimaryKey
  get student(): Promise<Student>
}

enum PointChangeReason {
  redeem = "redeem",
  rental = "rental",
  yearlyCost = "yearlyCost",
  volunteer = "volunterer"
}

export interface PointChangeRecord {
  subjectKey: PrimaryKey
  operatorKey: PrimaryKey
  beforeChange: Point
  afterChange: Point
  reason: PointChangeReason | null
  creationTime: Date
}

export interface PointChangeRecordEntity extends PointChangeRecord, DbEntity {
  key: PrimaryKey
  get subject(): Promise<Student>
  get operator(): Promise<Staff>
}

export interface TranscationRecord {
  customerKey: PrimaryKey
  operatorKey: PrimaryKey
  itemKey: PrimaryKey
  amount: Integer
  unitPrice: Point
  priceFactor: Decimal
  finalTotalPrice: Point
  notes: string | null
  creationTime: Date
}

export interface TranscationRecordEntity extends TranscationRecord, DbEntity {
  key: PrimaryKey
  get item(): Promise<Item>
  get customer(): Promise<Student>
  get operator(): Promise<Staff>
}

export interface Item {
  name: string
  description: string
  price: Point | null
  rent: Point | null
  poorPriceFactor: Decimal
  creationTime: Date
}

export interface ItemEntity extends Item, DbEntity {
  key: PrimaryKey
}

enum ItemAmountChangeReason {
  redeemed = "redeemed",
  rented = "rented",
  missing = "missing",
  ownUse = "ownUse",
}

export interface ItemAmountChangeRecord {
  name: string
  itemKey: PrimaryKey
  relatedKey: PrimaryKey | null
  reason: ItemAmountChangeReason | null
  beforeChange: Amount
  afterChange: Amount
  creationTime: Date
}

export interface ItemAmountChangeRecordEntity extends ItemAmountChangeRecord, DbEntity {
  key: PrimaryKey
  get item(): Promise<Item>
}

export interface DonationRecord {
  donatorKey: PrimaryKey
  operatorKey: PrimaryKey
  note: string
  creationTime: Date
}

export interface DonationRecordEntity extends DonationRecord, DbEntity {
  key: PrimaryKey
  get donator(): Promise<Student>
  get operator(): Promise<Staff>
}

interface RenewalRecord {
  from: Date
  to: Date
}

export interface RentalRecord {
  borrowerKey: PrimaryKey
  operatorKey: PrimaryKey
  itemKey: PrimaryKey
  name: string
  phoneNumber: string
  deadline: Date
  renewalRecords: RenewalRecord[]
  creationTime: Date
  returnTime: Date | null
}

export interface RentalRecordEntity extends RentalRecord, DbEntity {
  key: PrimaryKey
  get borrower(): Promise<Student>
  get operator(): Promise<Staff>
  get item(): Promise<Item>
}
