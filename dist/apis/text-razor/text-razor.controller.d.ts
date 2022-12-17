import { TextRazorDto } from './dto/text-razor.dto';
import { TextRazorService } from './text-razor.service';
export declare class TextRazorController {
    private readonly textRazorService;
    constructor(textRazorService: TextRazorService);
    extract(textRazorDto: TextRazorDto): Promise<{
        success: boolean;
        message: string;
    }>;
}
