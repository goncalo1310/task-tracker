import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from '../../services/ui.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  title = 'Task Manager'; // Atenção ao Titulo
  showAddTask: boolean | undefined;
  subscription: Subscription | undefined;
  addTask(): void {
    this.uiService.toggleAddTask();
  }
  constructor(private uiService: UiService, private router: Router) {
    this.subscription =
      this.uiService.onToggle().subscribe((value) => (this.showAddTask = value));
  }

  hasRoute(route: string){
    return this.router.url === route;
  }

  ngOnInit(): void {
  }
}

