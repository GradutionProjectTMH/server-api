import { STATUS_DRAWING_FLOOR, STATUS_HIRE } from '../enum/hire.enum';
declare class ItemDesign {
    image: string;
    coHomeUrl: string;
    isChoose: boolean;
    materials: any;
}
declare class ItemFloorDesign {
    floor: number;
    designs: ItemDesign[];
    status: STATUS_DRAWING_FLOOR;
    phaseId: string;
}
declare class ItemHouseDesign {
    designs: ItemDesign[];
    status: boolean;
}
export declare class HireDto {
    userId: string;
    designerId: string;
    detailDrawingId: string;
    floorDesigns: ItemFloorDesign[];
    houseDesigns: ItemHouseDesign[];
    status: STATUS_HIRE;
    transactions: Record<string, any>[];
    projectId: string;
}
export {};
