import mongoose, { Document } from 'mongoose';
import { PROJECT_STATUS } from './enum/project.enum';
declare class Design2D {
    house_boundary: number;
    width: number;
    height: number;
    boundaryImg: string;
    crossSectionImg: string;
}
declare class ExpectedMaterial {
    name: string;
    amount: number;
}
declare class Room {
    name: string;
    amount: number;
}
declare class CoHomeLink {
    co_home_link: string;
}
declare class StepOne {
    designerId: string;
    firstFloorDesigns: CoHomeLink[];
    numDrafts: number;
    audittedTimes: number;
    status: number;
}
declare class StepTwo {
}
export declare type ProjectDocument = Project & Document;
export declare class Project {
    userId: string;
    design2D: Design2D;
    expectedMaterial: ExpectedMaterial[];
    rooms: Room[];
    status: PROJECT_STATUS;
    stepOne: StepOne;
    stepTwo: StepTwo;
}
export declare const ProjectSchema: mongoose.Schema<Project, mongoose.Model<Project, any, any, any, any>, {}, {}, {}, {}, "type", Project>;
export {};
