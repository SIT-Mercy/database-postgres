type StudentID = string
type Integer = number
type Decimal = number
type PrimaryKey = number
type Point = number

interface Student {
  key: PrimaryKey
  studentId: StudentID
  name: string
  isPoorStudent: boolean
  currentPoint: Point
}

interface PointChangeRecord {
  key: PrimaryKey
  subject: PrimaryKey
  operator: PrimaryKey
  beforeChange: Point
  afterChange: Point
  timestamp: Date
}

interface TranscationRecord {
  key: PrimaryKey
  subject: PrimaryKey
  operator: PrimaryKey
  timestamp: Date
  itemKey: PrimaryKey
  amount: Integer
  discountFactor: Decimal
  originalPrice: Point
}

interface Item {
  key: PrimaryKey
  creator: PrimaryKey
  name: string
  description: string
  imageUrl: string
  price: Point
  hasPoorDiscount: boolean
  creationTime: Date
}

interface DonationRecord {
  key: PrimaryKey
  donator: PrimaryKey
  content: string
  timestamp: Date
}

interface RentalRecord {
  key: PrimaryKey
  borrower: PrimaryKey
  operator: PrimaryKey
  phoneNumber: string
  deadline: Date
  startTime: Date
}

interface GiftRecord {
  key: PrimaryKey
  receiver: PrimaryKey
  operator: PrimaryKey
  phoneNumber: string
  itemKey: PrimaryKey
  amount: Integer
  timestamp: Date
}