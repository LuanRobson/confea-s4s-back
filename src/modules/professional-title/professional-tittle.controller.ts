import { Body, Controller, Post } from '@nestjs/common';
import { CreateProfessionalTittleDto } from './dto/create-professional-tittle.dto';
import { ProfessionalTittleService } from './professional-tittle.service';

@Controller('professional-tittle')
export class ProfessionalTittleController {
  constructor(private readonly professionalTittleService: ProfessionalTittleService) { }

  @Post()
  create(@Body() createProfessionalTittleDto: CreateProfessionalTittleDto) {
    return this.professionalTittleService.create(createProfessionalTittleDto);
  }

  @Post('associate')
  associateTosActivityToProfessionalTittle(@Body() body: { professionalTittleId: string, tosActivityCode: string[] }) {
    return this.professionalTittleService.associateTosActivityToProfessionalTittle(body.professionalTittleId, body.tosActivityCode);
  }

  @Post('verify-activity')
  verifyActivity(@Body() body: { professionalTittleId: string, tosActivityCode: string }) {
    return this.professionalTittleService.verifyTosActivityToProfessionalTittle(body.professionalTittleId, body.tosActivityCode);
  }
}