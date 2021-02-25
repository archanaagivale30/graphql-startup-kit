import EmployeeController from '../controllers/Employee';

export const types = `
scalar DateTime

type Employee {
    id :ID!,
    name : String,
    email : String,
    created : DateTime,
    updatedAt : DateTime
    }`;
export const inputs = `
input EmployeeInput {
    title : String,
    email:String
  }
`;
export const queries = `   
Employees: [Employee]
`;

export const mutations = `
createEmployee(input: EmployeeInput): Employee
updateEmployee(id: ID!, input: EmployeeInput): Employee

`;

export const roots = {
    Employees: EmployeeController.getAllEmployees,
    createEmployee: EmployeeController.create,
    updateEmployee:EmployeeController.update
}
