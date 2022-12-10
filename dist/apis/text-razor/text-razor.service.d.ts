import { TextRazorDto } from './dto/text-razor.dto';
export declare class TextRazorService {
    private request;
    constructor();
    extract(textRazorDto: TextRazorDto): Promise<any>;
}
