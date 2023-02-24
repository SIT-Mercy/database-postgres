import type postgres from "postgres"
import type * as model from "./model.js"

const tables = {
  staff: "staff",
  students: "students",
  pointChanges: "point_changes",
  items: "item",
  transactions: "transcations",
  donations: "donations",
  rental: "rental",
  itemAmountChanges: "item_amount_changes",
}

export async function initDatabase(sql: postgres.Sql<any>): Promise<void> {
  await initStudents(sql)
  await initStaff(sql)
  await initPointChanges(sql)
  await initItems(sql)
  await initTransactions(sql)
  await initDonations(sql)
  await initItemAmountChanges(sql)
  await initRental(sql)
  sql`COMMIT;`
}

/**
 * `student id`: e.g.: 2210123456
 * table: {@link tables.students}
 */
async function initStudents(sql: postgres.Sql<any>): Promise<void> {
  await sql`
  CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    student_id VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(20) NOT NULL,
    college VARCHAR NOT NULL,
    point INT NOT NULL,
    poor_level SMALLINT NOT NULL,
    phone_number VARCHAR(32),
    creation_time TIMESTAMP NOT NULL
  );
  `
}

export async function addStudent(
  sql: postgres.Sql<any>,
  student: model.Student
): Promise<model.PrimaryKey> {
  const id: any = sql`
  INSERT INTO students (
    student_id,
    name,
    college,
    point,
    phone_number,
    poor_level,
    creation_time
  )
  VALUES (
    ${student.studentID},
    ${student.name},
    ${student.college},
    ${student.currentPoint},
    ${student.phoneNumber},
    ${student.poorLevel},
    ${student.creationTime}
  )
  RETURNING id;
  `
  return id
}

export async function queryStudentByID(
  sql: postgres.Sql<any>,
  studentID: string,
): Promise<model.StudentEntity | null> {
  const students = await sql`
  SELECT * FROM students
  WHERE student_id = ${studentID};
  `
  if (students.length === 0) return null
  const s = students[0]
  return {
    key: s.key,
    studentID: s.student_id,
    name: s.name,
    college: s.college,
    poorLevel: s.poor_level,
    currentPoint: s.point,
    creationTime: s.creation_time,
    phoneNumber: s.phoneNumber,
    saveChanges: async function (): Promise<void> {
      await alterStudent(sql, s.key, this)
    }
  }
}

export async function alterStudent(
  sql: postgres.Sql<any>,
  key: model.PrimaryKey,
  student: model.Student,
): Promise<void> {
  await sql`
  UPDATE students
  SET
    student_id = ${student.studentID},
    name = ${student.name},
    college = ${student.college},
    point = ${student.currentPoint},
    phone_number = ${student.phoneNumber},
    poor_level = ${student.poorLevel},
    creation_time = ${student.creationTime}
  WHERE id = ${key};
  `
}

/**
 * table: {@link tables.staff}
 */
async function initStaff(sql: postgres.Sql<any>): Promise<void> {
  await sql`
  CREATE TABLE IF NOT EXISTS staff (
    id SERIAL PRIMARY KEY,
    student_id INT NOT NULL,
    type VARCHAR NOT NULL,
    password VARCHAR(20) NOT NULL,
    last_login TIMESTAMP,
    creation_time TIMESTAMP NOT NULL,
    FOREIGN KEY (student_id)
      REFERENCES students(id)
  );
  `
}
/**
 * table: {@link tables.pointChanges}
 */
async function initPointChanges(sql: postgres.Sql<any>): Promise<void> {
  await sql`
  CREATE TABLE IF NOT EXISTS point_changes (
    id SERIAL PRIMARY KEY,
    subject_id INT NOT NULL,
    reason TEXT,
    point_before INT NOT NULL,
    point_after INT NOT NULL,
    operator_id INT NOT NULL,
    creation_time TIMESTAMP NOT NULL,
    FOREIGN KEY (subject_id)
      REFERENCES students(id),
    FOREIGN KEY (operator_id)
      REFERENCES staff(id)
  );
  `
}

/**
 * table: {@link tables.items}
 */
async function initItems(sql: postgres.Sql<any>): Promise<void> {
  await sql`
  CREATE TABLE IF NOT EXISTS items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(32) NOT NULL,
    price INT,
    rent INT,
    poor_factor DECIMAL NOT NULL,
    notes TEXT,
    description TEXT NOT NULL,
    creation_time TIMESTAMP NOT NULL
  );
  `
}

/**
 * table: {@link tables.transactions}
 */
async function initTransactions(sql: postgres.Sql<any>): Promise<void> {
  await sql`
  CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    item_id INT NOT NULL,
    customer_id INT NOT NULL,
    unit_price INT NOT NULL,
    amount INT NOT NULL,
    price_fator DECIMAL NOT NULL,
    final_price INT NOT NULL,
    operator_id INT NOT NULL,
    notes TEXT,
    creation_time TIMESTAMP NOT NULL,
    FOREIGN KEY (item_id)
      REFERENCES items(id),
    FOREIGN KEY (customer_id)
      REFERENCES students(id),
    FOREIGN KEY (operator_id)
      REFERENCES staff(id)
  );
  `
}

/**
 * table: {@link tables.itemAmountChanges}
 */
async function initItemAmountChanges(sql: postgres.Sql<any>): Promise<void> {
  await sql`
  CREATE TABLE IF NOT EXISTS item_amount_changes (
    id SERIAL PRIMARY KEY,
    item_id INT NOT NULL,
    amount_before INT NOT NULL,
    amount_after INT NOT NULL,
    reason TEXT,
    related_id INT,
    creation_time TIMESTAMP NOT NULL,
    FOREIGN KEY (item_id)
      REFERENCES items(id)
  );
  `
}

/**
 * table: {@link tables.donations}
 */
async function initDonations(sql: postgres.Sql<any>): Promise<void> {
  await sql`
  CREATE TABLE IF NOT EXISTS donations (
    id SERIAL PRIMARY KEY,
    donator_id INT NOT NULL,
    operator_id INT NOT NULL,
    notes TEXT NOT NULL,
    creation_time TIMESTAMP NOT NULL,
    FOREIGN KEY (donator_id)
      REFERENCES students(id),
    FOREIGN KEY (operator_id)
      REFERENCES staff(id)
  );
  `
}

/**
 * table: {@link tables.rental}
 */
async function initRental(sql: postgres.Sql<any>): Promise<void> {
  await sql`
  CREATE TABLE IF NOT EXISTS rental (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    phone_number VARCHAR(32) NOT NULL,
    return_time TIMESTAMP,
    borrower_id INT NOT NULL,
    deadline TIMESTAMP NOT NULL,
    creation_time TIMESTAMP NOT NULL,
    renewal JSON,
    operator_id INT NOT NULL,
    FOREIGN KEY (borrower_id)
      REFERENCES students(id),
    FOREIGN KEY (operator_id)
      REFERENCES staff(id)
  );
  `
}
