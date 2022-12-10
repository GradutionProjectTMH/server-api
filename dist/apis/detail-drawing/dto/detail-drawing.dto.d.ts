import { DETAIL_DRAWING_STATUS, ROOM_TYPE } from '../enum/detail-drawing.enum';
export declare class ExpectedMaterialDto {
    name: string;
    amount: number;
}
export declare class RoomDto {
    name: ROOM_TYPE;
    amount: number;
}
declare class BountyReward {
    coinId: string;
    amount: number;
}
export declare class DetailDrawingDto {
    houseBoundary: number;
    width: number;
    height: number;
    boundaryImg: string;
    crossSectionImg: string;
    numberOfFloors: number;
    heightOfEachFloors: number;
    themeColor: string;
    expectedMaterial: ExpectedMaterialDto[];
    rooms: RoomDto[];
    bountyRewards: BountyReward[];
    additionalInformation: Record<string, any>;
    status: DETAIL_DRAWING_STATUS;
}
export {};
