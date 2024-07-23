import { PartialType } from '@nestjs/mapped-types';
import { CreateProfessionalTittleDto } from './create-professional-tittle.dto';

export class UpdateProfessionalTittleDto extends PartialType(CreateProfessionalTittleDto) {}