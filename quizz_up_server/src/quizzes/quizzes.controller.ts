import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  NotFoundException,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  HttpException,
} from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../entities/user.entity';
import { RolesGuard } from '../auth/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Quiz } from '../entities/quiz.entity';
import { Express } from 'express';

@Controller('quizzes')
export class QuizzesController {
  constructor(
      private readonly quizzesService: QuizzesService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  @UseInterceptors(FileInterceptor('logo', {
    storage: diskStorage({
      destination: './uploads/logos',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
      },
    }),
    fileFilter: (req, file, cb) => {
      if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
        cb(null, true);
      } else {
        cb(new BadRequestException('Apenas imagens são permitidas'), false);
      }
    },
    limits: {
      fileSize: 1024 * 1024 * 5 // 5MB
    }
  }))
  async create(
      @UploadedFile() logo: Express.Multer.File,
      @Body() body: any,
      @Req() req,
  ) {
    try {
      // Verifica se o usuário está autenticado
      if (!req.user || !req.user.userId) {
        throw new HttpException('Não autorizado', HttpStatus.UNAUTHORIZED);
      }

      let questionsData = [];
      try {
        questionsData = JSON.parse(body.questions);
      } catch (error) {
        throw new BadRequestException("Formato inválido para as questões.");
      }

      if (!body.title || !body.description) {
        throw new BadRequestException("Título e descrição são obrigatórios.");
      }

      const quizData: Partial<Quiz> = {
        questions: questionsData,
        title: body.title,
        description: body.description,
        userCreator: { id: req.user.userId } as any,
        logo: logo?.filename,
        id: body.id,
      };

      return await this.quizzesService.create(quizData);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Erro interno do servidor', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async findAll() {
    return this.quizzesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const quiz = await this.quizzesService.findOne(id);
    if (!quiz) {
      throw new NotFoundException(`Quiz com ID ${id} não encontrado.`);
    }
    return quiz;
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  @UseInterceptors(FileInterceptor('logo', {
    storage: diskStorage({
      destination: './uploads/logos',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
      },
    }),
    fileFilter: (req, file, cb) => {
      if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
        cb(null, true);
      } else {
        cb(new BadRequestException('Apenas imagens são permitidas'), false);
      }
    },
    limits: {
      fileSize: 1024 * 1024 * 5 // 5MB
    }
  }))
  async update(
      @Param('id') id: number,
      @Body() updateData: any,
      @UploadedFile() logo?: Express.Multer.File,
  ) {
    try {
      if (logo) {
        updateData.logo = logo.filename;
      }

      if (updateData.questions && typeof updateData.questions === 'string') {
        try {
          updateData.questions = JSON.parse(updateData.questions);
        } catch (error) {
          throw new BadRequestException("Formato inválido para as questões na atualização.");
        }
      }

      return await this.quizzesService.update(id, updateData);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Erro interno do servidor', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.quizzesService.remove(id);
  }

  @Post('save-result')
  @UseGuards(AuthGuard('jwt'))
  async saveResult(
      @Req() req,
      @Body() body: any,
  ) {
    const userIdFromToken = req.user.userId;
    if (!userIdFromToken) {
      throw new HttpException('ID do usuário não encontrado no token.', HttpStatus.BAD_REQUEST);
    }

    if (!body.quizId || !body.score || !body.total) {
      throw new BadRequestException('Dados incompletos para salvar o resultado.');
    }

    return this.quizzesService.createResult({
      score: body.score,
      totalQuestions: body.total,
      userId: userIdFromToken,
      quizId: body.quizId,
    });
  }
}