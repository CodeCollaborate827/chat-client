import { Component } from '@angular/core';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent {
  activeTab = 'Chat'; 

  setActiveTab(tabName: string) {
    this.activeTab = tabName;
  }
}