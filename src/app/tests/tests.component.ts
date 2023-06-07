import { Component, OnInit } from '@angular/core';
import { TestsService } from '../services/tests.service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit {

  nameOfTest: string;
  testID: string;
  questionAndImage: any[] = [];

  dynamicForm: FormGroup;
  correctAnswer1: FormControl = new FormControl(false);
  correctAnswer2: FormControl = new FormControl(false);
  correctAnswer3: FormControl = new FormControl(false);

  constructor(private testsService: TestsService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.dynamicForm = this.formBuilder.group({
      fields: this.formBuilder.array([this.createField()]) // Create the initial form array with one field
    });
  }

  // Create a new form control for the field
  createField() {
    return new FormControl('');
  }

  // Add a new input field to the form array and save the question
  addField() {
    const fields = this.dynamicForm.get('fields') as FormArray;
    fields.push(this.createField());
    const lastQuestionIndex = this.questionAndImage.length - 1;
    const lastQuestion = this.questionAndImage[lastQuestionIndex];
    if (lastQuestion !== '' && lastQuestion !== undefined) {
      // push the question to the questions array but not if it's empty
      this.questionAndImage.push();
    }
    console.log(this.questionAndImage);
  }

  // Remove an input field from the form array and remove the corresponding question
  removeField(index: number) {
    const fields = this.dynamicForm.get('fields') as FormArray;
    fields.removeAt(index);
    this.questionAndImage.splice(index, 1); // Remove the question from the questions array
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

  // Get the controls of the fields form array
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

    const questionWithImage = {
      question: this.questionAndImage[index]?.question || '',
      image: formData,
      containImage: !!event,
      answer1: this.questionAndImage[index]?.answer1 || {},
      answer2: this.questionAndImage[index]?.answer2 || {},
      answer3: this.questionAndImage[index]?.answer3 || {},
    };

    this.questionAndImage[index] = questionWithImage;
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

    // Update the correct and incorrect answers in the questionAndImage array
    this.questionAndImage[indexOfQuestion].answer1.correctOrNot = correctAnswerIndex === 'correctAnswer1' && checked;
    this.questionAndImage[indexOfQuestion].answer2.correctOrNot = correctAnswerIndex === 'correctAnswer2' && checked;
    this.questionAndImage[indexOfQuestion].answer3.correctOrNot = correctAnswerIndex === 'correctAnswer3' && checked;

    // Uncheck the other checkboxes if the current checkbox is checked
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
}
