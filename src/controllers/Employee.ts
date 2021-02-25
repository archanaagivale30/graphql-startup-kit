import EmployeeModel, { IEmployeeModel } from '../models/EmployeeModel';
import * as express from 'express';
class EmployeeController {

    public getAllEmployees({filter}, req): Array<IEmployeeModel> | Object {
       
      return EmployeeModel
        .find(filter)
        .then((data) => {
          return data;
        })
        .catch((error: Error) => {
          var err = new Error("INTERNALSERVER");
          err.stack = error.message;
          throw err;
        });
    }
    public create({input}): any {
      return new Promise(function (resolve, reject) {
        let image = input.image || {};
        delete input.image;
        input.image = image.file ? true : false;
        EmployeeModel.create(input, (err, employee) => {
          console.log(employee)
          console.log(err)

          return employee;
        })
      })
    }
    public update({ id, input }, req): IEmployeeModel | Object {
     
      return EmployeeModel.findOneAndUpdate({ _id: id }, {"$set":input})
        .then((update) => {
          return EmployeeModel.findById(id).then(dept => dept)
        })
        .catch((error: Error) => {
          var err = new Error("NOTFOUND");
          err.stack = error.message;
          throw err;
        });
    }
}

export default new EmployeeController();
