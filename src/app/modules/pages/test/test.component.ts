import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {
  toggled: boolean = false;
  handleSelection(event: any) {
    console.log(event.char);
  }
}
