import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestsService } from '../services/tests.service';

@Component({
  selector: 'app-take-test',
  templateUrl: './take-test.component.html',
  styleUrls: ['./take-test.component.css']
})
export class TakeTestComponent implements OnInit {

  constructor(private route: ActivatedRoute, private testsService: TestsService) { }

  testId: number;
  allQuestionsInTest: any[] = [];
  showResult = false;
  result = 0;

  ngOnInit(): void {
    this.testId = Number(this.route.snapshot.paramMap.get('id'));
    this.testsService.getAllQuestionsInTest(this.testId.toString()).subscribe(
      (response: any) => {
        this.allQuestionsInTest = response.map((question: any) => {
          const shuffledAnswers = this.shuffleArray(question.autoskolaAnswers);
          question.autoskolaAnswers = shuffledAnswers;
          if (question.imageOfQuestion && question.imageOfQuestion.image && question.imageOfQuestion !== null) {
            question.imageOfQuestion.image = 'data:image/jpeg;base64,' + question.imageOfQuestion.image;
          }
          return question;
        });
        console.log(this.allQuestionsInTest);
      }
    );
  }

  shuffleArray(array: any[]): any[] {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

  markCorrectAnswers() {
    for (const question of this.allQuestionsInTest) {
      let hasSelectedAnswer = false;
      let hasCorrectAnswer = false;
      for (const answer of question.autoskolaAnswers) {
        const radio = document.getElementById(answer.id.toString()) as HTMLInputElement;
        const label = radio.parentElement;
        if (radio.checked) {
          hasSelectedAnswer = true;
          if (answer.correctOrNot) {
            label?.classList.add('correct-answer');
            hasCorrectAnswer = true;
          } else {
            label?.classList.add('incorrect-answer');
          }
        } else {
          label?.classList.remove('correct-answer');
          label?.classList.remove('incorrect-answer');
        }
      }
      if (!hasSelectedAnswer) {
        const correctRadio = this.getCorrectRadio(question);
        if (correctRadio) {
          const correctLabel = correctRadio.parentElement;
          if (correctLabel && !correctLabel.classList.contains('correct-answer')) {
            correctLabel.classList.add('correct-answer');
          }
        }
      } else if (!hasCorrectAnswer) {
        const correctRadio = this.getCorrectRadio(question);
        if (correctRadio) {
          const correctLabel = correctRadio.parentElement;
          if (correctLabel && !correctLabel.classList.contains('correct-answer')) {
            correctLabel.classList.add('correct-answer');
          }
        }
      }
    }
  
    let correctAnswers = 0;
    let answeredQuestions = 0;
  
    for (const question of this.allQuestionsInTest) {
      const selectedAnswer = question.autoskolaAnswers.find((answer: any) => {
        const radio = document.getElementById(answer.id.toString()) as HTMLInputElement;
        return radio.checked;
      });
  
      if (selectedAnswer) {
        answeredQuestions++;
        if (selectedAnswer.correctOrNot) {
          correctAnswers++;
        }
      }
    }
  
    if (answeredQuestions === 0) {
      this.result = 0;
    } else {
      this.result = Math.round(correctAnswers / answeredQuestions * 100);
    }
  
    this.showResult = true;
  }
  
  
  
  
  getCorrectRadio(question: any): HTMLInputElement | null {
    const correctAnswer = question.autoskolaAnswers.find((answer: { correctOrNot: any; }) => answer.correctOrNot);
    if (correctAnswer) {
      const correctRadio = document.getElementById(correctAnswer.id.toString()) as HTMLInputElement;
      return correctRadio;
    }
    return null;
  }
  
}