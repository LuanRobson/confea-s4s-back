import { IsNotEmpty, IsString } from "class-validator";
import { fieldFormatInvalid, fieldRequired } from "src/helpers/errorMessages";

export class CreateProfessionalTittleDto {
  @IsString({ message: fieldFormatInvalid('name') })
  @IsNotEmpty({ message: fieldRequired('name') })
  readonly name: string;

  @IsString({ message: fieldFormatInvalid('code') })
  @IsNotEmpty({ message: fieldRequired('code') })
  readonly code: string;
}