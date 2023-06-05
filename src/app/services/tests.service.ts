import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestsService {

  constructor(private http: HttpClient) { }

  private saveTestNameUrl = 'http://localhost:8080/saveTestName';
  private saveTestImageUrl = 'http://localhost:8080/saveTestImage';
  private saveTestQuestionsUrl = 'http://localhost:8080/saveQuestion';

  saveTestName(testName: string) {
    return this.http.post(this.saveTestNameUrl, {"nameOfTest": testName});
  }

  saveTestImage(testImage: any) {
    return this.http.post(this.saveTestImageUrl, testImage);
  }

  saveTestQuestions(testQuestions: any, containImage: boolean, testID: string) {
    return this.http.post(this.saveTestQuestionsUrl, {"textOfQuestion": testQuestions, "containsImage": containImage, "autoskolaTest": {"id": testID}});
  }

}
