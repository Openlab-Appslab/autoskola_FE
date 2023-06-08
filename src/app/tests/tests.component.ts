import { Component, OnInit } from '@angular/core';
import { TestsService } from '../services/tests.service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit {

  nameOfTest: string;
  testID: string;
  questionAndImage: any[] = [];
  allTests: any[] = [];
  allQuestionsInTest: any[] = [];
  dynamicForm: FormGroup;
  showMakeTest = false;
  showListOfTests = false;
  showButtons = true;
  correctAnswer1: FormControl = new FormControl(false);
  correctAnswer2: FormControl = new FormControl(false);
  correctAnswer3: FormControl = new FormControl(false);

  constructor(private testsService: TestsService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.dynamicForm = this.formBuilder.group({
      fields: this.formBuilder.array([this.createField()])
    });
    this.testsService.getAllTests().subscribe(
      (response: any) => {
        this.allTests = response;
        console.log(this.allTests);
      }
    );
  }

  createField() {
    return new FormControl('');
  }

  addField() {
    const fields = this.dynamicForm.get('fields') as FormArray;
    fields.push(this.createField());
    const lastQuestionIndex = this.questionAndImage.length - 1;
    const lastQuestion = this.questionAndImage[lastQuestionIndex];
    if (lastQuestion !== '' && lastQuestion !== undefined) {
      this.questionAndImage.push();
    }
    console.log(this.questionAndImage);
  }

  removeField(index: number) {
    const fields = this.dynamicForm.get('fields') as FormArray;
    fields.removeAt(index);
    this.questionAndImage.splice(index, 1);
  }

  updateQuestion(index: number, question: string) {
    this.questionAndImage[index] = {
      question: question,
      image: this.questionAndImage[index]?.image || null,
      containImage: !!this.questionAndImage[index]?.image,
      answer1: this.questionAndImage[index]?.answer1 || {},
      answer2: this.questionAndImage[index]?.answer2 || {},
      answer3: this.questionAndImage[index]?.answer3 || {},
    };
  }

  getFormArrayControls() {
    const fields = this.dynamicForm.get('fields') as FormArray;
    return fields.controls;
  }

  saveTestName() {
    this.testsService.saveTestName(this.nameOfTest).subscribe(
      (response: any) => {
        this.testID = response.id;
        console.log(this.testID);
      }
    );
  }

  onFileSelected(event: any, index: number) {
    const formData = new FormData();
    const imageFile = event.target.files[0];
    formData.append('image', imageFile);
  
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = () => {
      const questionWithImage = {
        question: this.questionAndImage[index]?.question || '',
        image: formData,
        imageToShow: reader.result as string,
        containImage: !!event,
        answer1: this.questionAndImage[index]?.answer1 || {},
        answer2: this.questionAndImage[index]?.answer2 || {},
        answer3: this.questionAndImage[index]?.answer3 || {},
      };
  
      this.questionAndImage[index] = questionWithImage;
    };
  }
  

  removeImage(index: number) {
    this.questionAndImage[index].containImage = false;
    this.questionAndImage[index].image = null;
    this.questionAndImage[index].imageToShow = null;
  
    const inputElement = document.getElementById('imageInput' + index) as HTMLInputElement;
    if (inputElement) {
      inputElement.value = '';
    }
  }
  

  saveQuestionAndImage() {
    const test = this.questionAndImage;
  
    (async () => {
      for (let i = 0; i < test.length; i++) {
        const question = test[i].question;
        const containImage = test[i].containImage;
        const answer1 = test[i].answer1;
        const answer2 = test[i].answer2;
        const answer3 = test[i].answer3;
  
        if (containImage) {
          const image = test[i].image;
          await this.testsService.saveTestImage(image).toPromise();
        }
  
        await this.testsService.saveTestQuestions(question, containImage, this.testID).toPromise().then(
          async (response: any) => {
            const autoskolaQuestionID = response.id;
            console.log(autoskolaQuestionID);
            await this.testsService.saveAnswer(answer1.textOfAnswer, answer1.correctOrNot, autoskolaQuestionID).toPromise();
            await this.testsService.saveAnswer(answer2.textOfAnswer, answer2.correctOrNot, autoskolaQuestionID).toPromise();
            await this.testsService.saveAnswer(answer3.textOfAnswer, answer3.correctOrNot, autoskolaQuestionID).toPromise();
          }
        );
      }
    })();
  }
  
  

  updateAnswer(index: number, answer: string, answerIndex: string) {
    this.questionAndImage[index][answerIndex] = {
      textOfAnswer: answer,
    };
  }

  updateCorrectAnswer(indexOfQuestion: number, correctAnswerIndex: string) {
    const checkbox = document.getElementById(correctAnswerIndex + indexOfQuestion) as HTMLInputElement;
    const checked = checkbox.checked;

    this.questionAndImage[indexOfQuestion].answer1.correctOrNot = correctAnswerIndex === 'correctAnswer1' && checked;
    this.questionAndImage[indexOfQuestion].answer2.correctOrNot = correctAnswerIndex === 'correctAnswer2' && checked;
    this.questionAndImage[indexOfQuestion].answer3.correctOrNot = correctAnswerIndex === 'correctAnswer3' && checked;

    if (checked) {
      for (let i = 1; i <= 3; i++) {
        const checkboxId = 'correctAnswer' + i + indexOfQuestion;
        if (checkboxId !== checkbox.id) {
          const checkboxToUncheck = document.getElementById(checkboxId) as HTMLInputElement;
          checkboxToUncheck.checked = false;
        }
      }
    }
    console.log(this.questionAndImage);
  }

  getAllTests() {
    this.testsService.getAllTests().subscribe(
      (response: any) => {
        this.allTests = response;
        console.log(this.allTests);
      }
    );
  }

  showMakeTestForm(): void {
    this.showMakeTest = true;
    this.showListOfTests = false;
    this.showButtons = false;
  }

  showListOfTestsFunction(): void {
    this.showMakeTest = false;
    this.showListOfTests = true;
    this.showButtons = false;
  }

  goToTest(testId: number) {
    this.router.navigate(['/takeTest', testId]);
  }

}
