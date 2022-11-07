import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DesignerController } from 'src/apis/designer/designer.controller';
import { DesignerService } from 'src/apis/designer/designer.service';
import { Designer, DesignerSchema } from 'src/apis/designer/designer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Designer.name, schema: DesignerSchema },
    ]),
  ],
  controllers: [DesignerController],
  providers: [DesignerService],
})
export class DesignerModule {}
