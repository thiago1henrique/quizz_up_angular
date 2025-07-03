// src/quiz-attempts/quiz-attempts.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizAttempt } from '../entities/quiz-attempt.entity';
import { QuizAttemptsController } from './quiz-attempts.controller';
import { QuizAttemptsService } from './quiz-attempts.service';

@Module({
  imports: [TypeOrmModule.forFeature([QuizAttempt])],
  exports: [TypeOrmModule],
  controllers: [QuizAttemptsController],
  providers: [QuizAttemptsService],
})
export class QuizAttemptsModule {}