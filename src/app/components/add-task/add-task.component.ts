import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from '../../Task';
import { Subscription } from 'rxjs';
import { UiService } from '../../services/ui.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent implements OnInit {

  text: string = "";
  day: string = "";
  reminder: boolean = false;
  showAddTask: boolean | undefined;
  subscription: Subscription;

  @Output() onAddTask: EventEmitter<Task> = new
    EventEmitter;

  onSubmit() {
    if (!this.text) {
      this.toastr.error('Adicione uma tarefa', 'Task Tracker:', {
        timeOut: 1500,
        closeButton: true,
        progressBar: true,
        progressAnimation: 'increasing',
        tapToDismiss: true,
        easing: 'ease-in',
        easeTime: 200,
      })
      return;
    }
    const newTask = {
      text: this.text,
      day: this.day,
      reminder: this.reminder
    };
    this.onAddTask.emit(newTask);
    setTimeout(() => {
      location.reload();
    }, 1200);

    this.toastr.success('Tarefa Inserida Com Sucesso', 'Task Tracker:', {
      timeOut: 800,
      closeButton: true,
      progressBar: true,
      progressAnimation: 'increasing',
      tapToDismiss: true,
      easing: 'ease-in',
      easeTime: 200,
    })

    this.text = '';
    this.day = '';
    this.reminder = false;
  }

  constructor(private uiService: UiService, private toastr: ToastrService) {
    this.subscription =
      this.uiService.onToggle().subscribe((value) =>
        (this.showAddTask = value));
  }

  ngOnInit(): void {
  }


}
