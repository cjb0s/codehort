import { Injectable } from '@nestjs/common';
import { LessonDto } from './dto/lesson.dto';
import { Lesson } from './lesson.schema';

@Injectable()
export class LessonService {
  async createLesson(lessonDto: LessonDto): Promise<LessonDto> {
    const newLesson = new Lesson();
    newLesson.name = lessonDto.name;
    newLesson.summary = lessonDto.summary;
    newLesson.numberOfTasks = lessonDto.numberOfTasks;
    newLesson.solutionId = lessonDto.solutionId;

    try {
      return await newLesson.save();
    } catch (error) {
      console.log(error);
    }
  }

  fetchLesson(lessonId: number) {
    return Lesson.findOne({ where: { id: lessonId } });
  }
}
