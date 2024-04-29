import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { GoalService } from './goal.service';
import { Goal } from 'src/entities/goal.entity';
import { QueryRunner } from 'typeorm';

@Controller('goals')
export class GoalController {
    constructor(private readonly goalService: GoalService) {}

    @Get('number-of-accomplished-goals')
    getNumberOfAccomplishedGoals(@Query('id', ParseIntPipe) id: number): Promise<number> {
      return this.goalService.getNumberOfAccomplishedGoals(id);
    }

    @Get()
    findAll(): Promise<{ long: Array<Goal>; short: Array<Goal>; }> {
      return this.goalService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.goalService.findOne(id);
    }
  
    @Post()
    create(@Body() goal: Goal) {
      console.log('hi');
      // return this.goalService.create(goal);
    }

    @Patch('complete-:id')
    completeGoal(@Param('id', ParseIntPipe) goalId: number): Promise<boolean> {
      return this.goalService.completeGoal(goalId);
    }
  
    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() goal: Partial<Goal>) {
      return this.goalService.update(id, goal);
    }
  
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
      return this.goalService.remove(id);
    }  
}
