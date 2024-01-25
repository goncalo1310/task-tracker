import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../Task';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})

export class TaskItemComponent implements OnInit {
  @Input() task: Task | undefined;
  @Output() onDeleteTask: EventEmitter<Task> = new
    EventEmitter();
  @Output() onToggleReminder: EventEmitter<Task> = new
    EventEmitter();
  faTimes = faTimes;
  onToggle(task: any) {
    this.onToggleReminder.emit(task);
  }
  onDelete(task: any) {
    this.onDeleteTask.emit(task);
    this.toastr.error('Tarefa Apagada Com Sucesso', 'Task Tracker:', {
      timeOut: 1500,
      closeButton: true,
      progressBar: true,
      progressAnimation: 'increasing',
      tapToDismiss: true,
      easing: 'ease-in',
      easeTime: 200,
    })
  }
  constructor(private toastr: ToastrService) { }
  ngOnInit(): void {
  }
}