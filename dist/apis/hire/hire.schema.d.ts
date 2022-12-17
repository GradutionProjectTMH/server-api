import mongoose, { Document, Mixed } from 'mongoose';
import { STATUS_HIRE } from './enum/hire.enum';
declare class ItemDesign {
    image: string;
    coHomeUrl: string;
    isChoose: boolean;
    materials: Mixed;
}
declare class ItemFloorDesign {
    floor: number;
    designs: ItemDesign[];
    status: boolean;
    phaseId: string;
}
declare class ItemHouseDesign {
    designs: ItemDesign[];
    status: boolean;
}
export declare type HireDocument = Hire & Document;
export declare class Hire {
    userId: string;
    designerId: string;
    detailDrawingId: string;
    floorDesigns: ItemFloorDesign[];
    houseDesigns: ItemHouseDesign[];
    status: STATUS_HIRE;
    transactions: Mixed[];
    projectId: string;
}
export declare const HireSchema: mongoose.Schema<Hire, mongoose.Model<Hire, any, any, any, any>, {}, {}, {}, {}, "type", Hire>;
export {};
