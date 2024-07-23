import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TosService } from './tos.service';

@Controller('tos')
export class TosController {
  constructor(private readonly tosService: TosService) { }

  @Post()
  create(@Body() tosJson: Category[]) {
    return this.tosService.processCategoriesAndActivities(tosJson)
  }

  @Get('professional-activities')
  getProfessionalActivities(
    @Query('professionalTittle') professionalTittle: string,
  ) {
    return this.tosService.listTosByProfessionalTittle(
      professionalTittle,
    )
  }
}