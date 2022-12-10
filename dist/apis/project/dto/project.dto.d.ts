import { PROJECT_STATUS } from '../enum/project.enum';
export declare class Design2DDto {
    house_boundary: number;
    width: number;
    height: number;
    boundaryImg: string;
    crossSectionImg: string;
}
export declare class ExpectedMaterialDto {
    name: string;
    amount: number;
}
export declare class RoomDto {
    name: string;
    amount: number;
}
export declare class CoHomeLinkDto {
    co_home_link: string;
}
export declare class StepOne {
    designerId: string;
    firstFloorDesigns: CoHomeLinkDto[];
    numDrafts: number;
    audittedTimes: number;
    status: number;
}
export declare class StepTwo {
}
export declare class ProjectDto {
    design2D: Design2DDto;
    expectedMaterial: ExpectedMaterialDto[];
    rooms: RoomDto[];
    status: PROJECT_STATUS;
    stepOne: StepOne;
    stepTwo: StepTwo;
}
