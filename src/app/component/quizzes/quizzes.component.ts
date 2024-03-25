import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizzesService } from 'src/app/auth/service/quizzes.service';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.scss']
})
export class QuizzesComponent implements OnInit {
  page: number = 0
  size: number = 1
  totalPages: number =  1
  quizzes: any[] = []
  totalElements: number = 0
  response: any[] = []
  currentQuestionIndex: number = 0;
  selectedAnswerIndex: number = -1;
  correctAnswers: number = 0;
  showResult: boolean = false;
  quizStarted: boolean = false

  constructor(private quizzesService: QuizzesService, ) { }

  ngOnInit(): void {
    
  }
  startQuiz(): void {
    this.getQuizzes()
    this.quizStarted = true
  }
  getQuizzes(): void {
    this.quizzesService.getQuizzes(this.page, this.size).subscribe(
      (response: any) => {
        this.quizzes = response.content
        this.totalElements = response.totalElements
        this.totalPages = response.totalPages
      }
    )
  }
  selectAnswer(index: number): void {
    this.selectedAnswerIndex = index
  }
  nextQuestion(): void {
    if(this.selectedAnswerIndex === -1) {
      return
    }
    if(this.selectedAnswerIndex === this.quizzes[this.currentQuestionIndex].correctAnswerIndex) {
      this.correctAnswers++
    }
    this.selectedAnswerIndex = -1
    this.currentQuestionIndex++
    if(this.currentQuestionIndex >= this.quizzes.length) {
      this.showResult = true
    }
  }
}
