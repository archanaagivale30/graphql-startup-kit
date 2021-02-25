import * as connections from '../config/connection';
import { Schema, Document } from 'mongoose';

/**
 * @export
 * @interface IEmployeeModel
 * @extends {Document}
 */
export interface IEmployeeModel extends Document {
    createdAt ? : Date;
    updatedAt ? : Date;
    title: string;
    email: string;
}

const EmployeeSchema: Schema = new Schema({
    email: {
        type: String    },
    title: {
        type: String    },
}, {
    collection: 'Employee',
    versionKey: false,
    timestamps: true
});

export default connections.db.model < IEmployeeModel >('EmployeeModel', EmployeeSchema);
