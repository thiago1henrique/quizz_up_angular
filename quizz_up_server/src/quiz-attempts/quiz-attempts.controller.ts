import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {QuizAttemptsService} from "./quiz-attempts.service";
import {CreateQuizAttemptDto} from "./dto/create-quiz-attempt.dto";

@Controller('quiz-attempts')
export class QuizAttemptsController {
    constructor(private quizAttemptsService: QuizAttemptsService) {
    }

    @Get()
    public findAll() {
        return this.quizAttemptsService.findAll();
    }

    @Get('user/:userId')
    public findUserAttempts(@Param('userId') userId: number) {
        return this.quizAttemptsService.findAllByUserId(userId);
    }

    @Post()
    public create(@Body()dto: CreateQuizAttemptDto) {
        this.quizAttemptsService.create(dto)

    }
}
