import DesignationModel, { IDesignationModel } from '../models/DesignationModel';
import * as express from 'express';

class DesignationController {

  public getAllDesignations({filter}, req): Array<IDesignationModel> | Object {
       
    return DesignationModel
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
    
  public create({ id, input }): any {
    return new Promise(function (resolve, reject) {
      DesignationModel.create(input, (err, Designation) => {
        if (err) {
          if(err.errors.title.$isValidatorError)
          {
            let err1 = new Error("VALIDATION");
            err1.stack = `${err.errors.title.path} ${err.errors.title.kind}`;
           reject(err1);
          }
          else{
            let err1 = new Error("INTERNALSERVER");
            err1.stack = `Internal Server Error`;
           reject(err1);
          }
        }
        resolve(Designation);
      });
    }).then((data) => {
      console.log(data)
      return data;
    })
    
  }
}

export default new DesignationController();
