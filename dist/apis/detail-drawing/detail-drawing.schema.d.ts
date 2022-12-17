import mongoose, { Document, Mixed } from 'mongoose';
import { DETAIL_DRAWING_STATUS } from './enum/detail-drawing.enum';
declare class ExpectedMaterial {
    name: string;
    amount: number;
}
declare class Room {
    name: string;
    amount: number;
}
declare class BountyReward {
    coinId: string;
    amount: number;
}
export declare type DetailDrawingDocument = DetailDrawing & Document;
export declare class DetailDrawing {
    userId: string;
    houseBoundary: number;
    width: number;
    height: number;
    numberOfFloors: number;
    heightOfEachFloors: number;
    themeColor: string;
    boundaryImg: string;
    crossSectionImg: string;
    expectedMaterial: ExpectedMaterial[];
    rooms: Room[];
    bountyRewards: BountyReward[];
    additionalInformation: Mixed;
    status: DETAIL_DRAWING_STATUS;
}
export declare const DetailDrawingSchema: mongoose.Schema<DetailDrawing, mongoose.Model<DetailDrawing, any, any, any, any>, {}, {}, {}, {}, "type", DetailDrawing>;
export {};
