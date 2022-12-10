import { ProjectService } from 'src/apis/project/project.service';
import { ProjectDto } from './dto/project.dto';
export declare class ProjectController {
    private readonly projectService;
    constructor(projectService: ProjectService);
    getAll(userId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    getById(id: string, userId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    create(body: ProjectDto, userId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    updateById(id: string, data: ProjectDto, userId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    deleteById(id: string, userId: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
