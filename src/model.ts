export type StudentID = string
export type Integer = number
export type Decimal = number
export type PrimaryKey = number
export type Point = number

export interface Student {
  key: PrimaryKey
  studentID: StudentID
  name: string
  isPoorStudent: boolean
  currentPoint: Point
}

export interface PointChangeRecord {
  key: PrimaryKey
  subject: PrimaryKey
  operator: PrimaryKey
  beforeChange: Point
  afterChange: Point
  timestamp: Date
}

export interface TranscationRecord {
  key: PrimaryKey
  subject: PrimaryKey
  operator: PrimaryKey
  timestamp: Date
  itemKey: PrimaryKey
  amount: Integer
  discountFactor: Decimal
  originalPrice: Point
}

export interface Item {
  key: PrimaryKey
  creator: PrimaryKey
  name: string
  description: string
  imageUrl: string
  price: Point
  hasPoorDiscount: boolean
  creationTime: Date
}

export interface DonationRecord {
  key: PrimaryKey
  donator: PrimaryKey
  content: string
  timestamp: Date
}

export interface RentalRecord {
  key: PrimaryKey
  borrower: PrimaryKey
  operator: PrimaryKey
  phoneNumber: string
  deadline: Date
  startTime: Date
}

export interface GiftRecord {
  key: PrimaryKey
  receiver: PrimaryKey
  operator: PrimaryKey
  phoneNumber: string
  itemKey: PrimaryKey
  amount: Integer
  timestamp: Date
}