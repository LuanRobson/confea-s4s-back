import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Warning } from 'src/errors';

@Injectable()
export class TosService {
  constructor(private prisma: PrismaService) { }

  async processCategoriesAndActivities(jsonData: Category[]) {
    const payload = { jsonData };
    try {
      for (const item of jsonData) {
        const category = await this.prisma.tosCategory.create({
          data: {
            name: item.name,
            code: item.code,
          },
        });
        if (Array.isArray(item.subgroups) && item.subgroups.length > 0) {
          await this.processSubcategoriesOrActivities(item.subgroups, category.id);
        }
      }

      return { message: 'Categorias e atividades processadas com sucesso!' };
    } catch (error) {
      console.error("Erro ao processar categorias e atividades:", error);
      throw new Warning(
        'Não foi possível criar a TOS',
        400,
        {
          payload,
          operation: 'TosService Class | processCategoriesAndActivities()',
        },
      );
    }
  }

  async processSubcategoriesOrActivities(children, parentId) {
    for (const child of children) {
      if (child.subgroups && child.subgroups.length > 0) {
        const subcategory = await this.prisma.tosCategory.create({
          data: {
            name: child.name,
            code: child.code,
            groupId: parentId,
          },
        });
        await this.processSubcategoriesOrActivities(child.subgroups, subcategory.id);
      } else {
        await this.prisma.tosActivities.create({
          data: {
            name: child.name,
            code: child.code,
            categoryId: parentId,
          },
        });
      }
    }
  }

  async listTosByProfessionalTittle(professionalTittleId: string) {
    const payload = { professionalTittleId };
    try {

      const professionalActivities = await this.prisma.tosActivityProfessionals.findMany({
        where: {
          professionalTitleId: professionalTittleId
        },
      })

      const activityCategory = await this.prisma.tosActivities.findMany({
        where: {
          id: {
            in: professionalActivities.map(activity => activity.tosActivityId)
          }
        },
      });

      const categoryGroup = await this.prisma.tosCategory.findMany({
        where: {
          id: {
            in: activityCategory.map(activity => activity.categoryId)
          }
        },
      })

      const categoryMain = await this.prisma.tosCategory.findMany({
        where: {
          code: {
            in: categoryGroup.map(group => group.code.split('.')[0])
          }
        },
      });

      const organizedCategories = categoryMain.map(mainCategory => {
        const subgroups = categoryGroup.filter(group =>
          group.code.startsWith(mainCategory.code + ".")
        ).map(group => {
          return {
            code: group.code,
            name: group.name,
            subgroups: activityCategory.filter(activity =>
              activity.categoryId === group.id
            ).map(activity => {
              return {
                code: activity.code,
                name: activity.name
              }
            })
          };
        });

        return {
          code: mainCategory.code,
          name: mainCategory.name,
          subgroups: subgroups
        }
      });
      return organizedCategories;
    } catch (error) {
      console.error("Erro ao listar TOS por título profissional:", error);
      throw new Warning(
        'Não foi possível listar TOS por título profissional',
        400,
        {
          payload,
          operation: 'TosService Class | listTosByProfessionalTittle()',
        },
      );
    }
  }
}