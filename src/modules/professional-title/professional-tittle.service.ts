import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Warning } from 'src/errors';
import { CreateProfessionalTittleDto } from './dto/create-professional-tittle.dto';

@Injectable()
export class ProfessionalTittleService {
  constructor(private prisma: PrismaService) { }
  async create(createProfessionalTittleDto: CreateProfessionalTittleDto) {
    const payload = { createProfessionalTittleDto };
    try {
      const ProfessionalTittleExist = await this.prisma.professionalTitle.findFirst({
        where: {
          code: createProfessionalTittleDto.code,
        }
      })

      console.log(ProfessionalTittleExist)

      if (!ProfessionalTittleExist) {
        const tittle = await this.prisma.professionalTitle.create({
          data: createProfessionalTittleDto
        })
        return {
          message: 'Título profissional criado com sucesso! :)',
          tittle
        }
      }

      return {
        message: 'Título profissional já existe!',
        ProfessionalTittleExist
      }
    } catch (error) {
      console.error(error);
      throw new Warning(
        'Não foi possível criar o título profissional',
        400,
        {
          payload,
          operation: 'ProfessionalTittleService Class | create()',
        },
      );
    }
  }

  async associateTosActivityToProfessionalTittle(professionalTittleId: string, tosActivityCode: string[]) {
    const payload = { professionalTittleId, tosActivityCode }
    try {
      const professionalTittle = await this.prisma.professionalTitle.findFirst({
        where: {
          id: professionalTittleId
        }
      })

      const activity = await this.prisma.tosActivities.findMany({
        where: {
          code: {
            in: tosActivityCode
          }
        }
      })

      if (!professionalTittle || activity.length === 0) {
        return ['Título profissional ou Atividade não encontrado!']
      }

      await Promise.all(activity.map(async item => {
        await this.prisma.tosActivityProfessionals.create({
          data: {
            professionalTitleId: professionalTittleId,
            tosActivityId: item.id
          }
        })
      }))

      return [`Atividade associada ao título profissional com sucesso!`]
    } catch (error) {
      console.error(error);
      throw new Warning(
        'Não foi possível associar a atividade ao título profissional',
        400,
        {
          payload,
          operation: 'ProfessionalTittleService Class | associateTosActivityToProfessionalTittle()',
        },
      );
    }
  }

  async verifyTosActivityToProfessionalTittle(professionalTittleId: string, tosActivityCode: string) {
    const payload = { professionalTittleId, tosActivityCode }
    try {
      const activity = await this.prisma.tosActivities.findFirst({
        where: {
          code: tosActivityCode
        }
      })

      console.log(activity)

      const verify = await this.prisma.tosActivityProfessionals.findFirst({
        where: {
          professionalTitleId: professionalTittleId,
          tosActivityId: activity.id
        }
      })

      if (!verify) {
        throw new Error('Atividade não associada ao título profissional')
      }

      console.log(verify)

      if (verify) {
        return verify
      }
    } catch (error) {
      console.error(error);
      throw new Warning(
        'Não foi possível verificar a atividade ao título profissional',
        400,
        {
          payload,
          operation: 'ProfessionalTittleService Class | verifyTosActivityToProfessionalTittle()',
        },
      );
    }
  }
}