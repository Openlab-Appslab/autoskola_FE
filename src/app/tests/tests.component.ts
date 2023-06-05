
import { Component, OnInit } from '@angular/core';
import { TestsService } from '../services/tests.service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

interface Question {
  text: string;
  image: string;
  readonly: boolean;
}

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit {
  nameOfTest: string;
  testID: string;
  questionAndImage: any[] = [];
question: any;
questionImage: any;
questions: Question[] = [];

dynamicForm: FormGroup;
  constructor(private testsService: TestsService, private formBuilder: FormBuilder) {
  }
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
      containImage: !!this.questionAndImage[index]?.image
    };
  }

  onFileSelected(event: any, index: number) {
    const formData = new FormData();
    const imageFile = event.target.files[0];
    formData.append('image', imageFile);
  
    const questionWithImage = {
      question: this.questionAndImage[index]?.question || '',
      image: formData,
      containImage: !!event
    };
  
    this.questionAndImage[index] = questionWithImage;
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
  
  saveQuestionAndImage() {
    (async () => {
      for (let i = 0; i < this.questionAndImage.length; i++) {
        const question = this.questionAndImage[i].question;
        const containImage = this.questionAndImage[i].containImage;
        if (containImage) {
          const image = this.questionAndImage[i].image;
          await this.testsService.saveTestImage(image).toPromise();
        }
        await this.testsService.saveTestQuestions(question, containImage, this.testID).toPromise();
      }
      console.log('All questions and images saved successfully.');
    })().catch(error => {
      console.error('Error occurred while saving questions and images:', error);
    });
  }
  

}
