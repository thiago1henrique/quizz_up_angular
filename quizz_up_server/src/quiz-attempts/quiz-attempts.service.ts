import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {QuizAttempt} from "../entities/quiz-attempt.entity";
import {Repository} from "typeorm";
import {CreateQuizAttemptDto} from "./dto/create-quiz-attempt.dto";

@Injectable()
export class QuizAttemptsService {
    constructor(@InjectRepository(QuizAttempt) private quizAttemptRepository: Repository<QuizAttempt>) {
    }

    public findAll(): Promise<QuizAttempt[]> {
        return this.quizAttemptRepository.find();
    }


    public findAllByUserId(userId: number) {
        return this.quizAttemptRepository.find({
            where: {
                user: {
                    id: userId
                }
            },
            relations: {
                user: true,
                quiz: true
            }
        })
    }

    public create(dto: CreateQuizAttemptDto) {
        this.quizAttemptRepository.save({
            score: dto.score,
            totalQuestions: dto.totalQuestions,
            user: {
                id: dto.userId
            },
            quiz: {
                id: dto.quizId
            }
        })
    }
}