import { EnvironmentService } from 'src/apis/environment/environment.service';
export declare class EnvironmentController {
    private readonly environmentService;
    constructor(environmentService: EnvironmentService);
    getAll(): Promise<{
        success: boolean;
        message: string;
    }>;
    updateById(body: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
