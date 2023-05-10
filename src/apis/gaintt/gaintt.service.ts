import { Injectable } from '@nestjs/common';
import { CreateGainttDto } from './dto/create-gaintt.dto';
import { UpdateGainttDto } from './dto/update-gaintt.dto';
import { isJSON } from 'class-validator';
import { ChatGptService } from 'src/apis/chat-gpt/chat-gpt.service';

@Injectable()
export class GainttService {
  constructor(private readonly chatGptService: ChatGptService) {}

  async gaintt(createGainttDto: CreateGainttDto) {
    const {
      length,
      height,
      floor,
      location,
      laborCost,
      estimate,
      laborAmount,
    } = createGainttDto;

    const message = `Tôi muốn xây 1 căn nhà với chiều dài ${length}m, chiều rộng là ${createGainttDto.with}m, chiều cao cho mỗi tầng là ${height}m, nhà gồm ${floor} tầng, địa điểm xây dựng tại ${location}, giá nhân công để trả cho một người là ${laborCost} VND trong một ngày, thời gian xây dựng toàn bộ công trình là ${estimate} ngày, tổng số lượng công nhân là ${laborAmount} người. Một công trình xây dựng cơ bản sẽ có các phần công việc là phần thiết kế, phần móng, phần thô, phần vật tư hoàn thiện. Với chi phí xây dựng từng phần như sau:
    + Phần thiết kế chiếm 0,34% tổng chi phí.
    + Phần móng chiếm 4,8%  tổng chi phí.
    + Phần thô chiếm 59%  tổng chi phí.
    + Phần vật tư hoàn thiện chiểm 32%  tổng chi phí.
    Tôi cần biết số lượng nhân công cần thuê tương ứng với số lượng nhân công với mỗi phần của công trình xây dựng và tổng giá thành công trình, bao gồm "Key" là Labors, Days, Costs.
    Hãy hiển thị kết quả dưới dạng File JSON và không kèm theo bất kì giải thích gì thêm và không cần tính tổng giá trị công trình.`;

    const result = await this.chatGptService.chat({
      messages: [
        {
          role: 'user',
          content: message,
        },
      ],
    });

    return isJSON(result.message.content)
      ? JSON.parse(result.message.content)
      : result.message.content;
  }
}
