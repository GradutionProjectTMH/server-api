import { Model } from 'mongoose';
import { EnvironmentDocument } from './environment.schema';
export declare class EnvironmentService {
    private readonly environmentModel;
    constructor(environmentModel: Model<EnvironmentDocument>);
    getAll(): Promise<any>;
    create(): Promise<any>;
    updateById(data: string): Promise<any>;
}
