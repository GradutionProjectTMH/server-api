import { STATUS_HIRE } from '../enum/hire.enum';
declare class ItemDesign {
    image: string;
    coHomeUrl: string;
    isChoose: boolean;
    materials: any;
}
declare class ItemFloorDesign {
    floor: number;
    designs: ItemDesign[];
    status: boolean;
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
}
export {};
