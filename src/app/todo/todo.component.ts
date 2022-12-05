import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ITask } from '../model/task';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {

  todoForm !: FormGroup;
  tasks : ITask [] = [];
  sprint : ITask [] = [];
  inProgress : ITask [] = [];
  completed : ITask [] = [];
  archived : ITask [] = [];
  updateID : any;
  isEditEnabled : boolean = false;

  constructor(private fb : FormBuilder) { }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item : ['', Validators.required]
    })

    this.tasks.push({
      description: "Add authentication feature (Pivot)",
      isCompleted: false
    })

    this.tasks.push({
      description: "Add side menu to navigate through separate kanban boards for each project (Pivot)",
      isCompleted: false
    })

    this.tasks.push({
      description: "Add color theme toggle (Pivot)",
      isCompleted: false
    })

    this.tasks.push({
      description: "Add change background feature (Pivot)",
      isCompleted: false
    })

    this.tasks.push({
      description: "Create French version of website (Preonbox)",
      isCompleted: false
    })

    this.tasks.push({
      description: "Design mise-en-scène for that one realm (Griphos)",
      isCompleted: false
    })

    this.sprint.push({
      description: "Explore goodreads dataset obtained from Kaggle (Tir: Book Recommendation System)",
      isCompleted: false
    })

    this.sprint.push({
      description: "Overlay over each project logo by default, show true logo colours when hovered over if deployed (Preonbox)",
      isCompleted: false
    })

    this.sprint.push({
      description: "Add sub-tasks (Pivot)",
      isCompleted: false
    })

    this.inProgress.push({
      description: "Add search functionality for Docs page (Preonbox)",
      isCompleted: false
    })

    this.inProgress.push({
      description: "Make lists scrollable (Pivot)",
      isCompleted: false
    })

    this.inProgress.push({
      description: "Draw chess board graphics using JS (Simply Chess)",
      isCompleted: false
    })

    this.completed.push({
      description: "Create logo (Tir: Book Recommendation System)",
      isCompleted: true
    })

    this.completed.push({
      description: "Write story script for one realm (Griphos)",
      isCompleted: true
    })
  }

  addTask() {
    this.tasks.push({
      description: this.todoForm.value.item,
      isCompleted: false
    })
    this.todoForm.reset();
  }

  deleteTask(i : number) {
    this.tasks.splice(i, 1);
  }

  deleteSprintTask(i : number) {
    this.sprint.splice(i, 1);
  }

  deleteInProgressTask(i : number) {
    this.inProgress.splice(i, 1);
  }

  deleteCompletedTask(i : number) {
    this.completed.splice(i, 1);
  }

  onEdit(item : ITask, i : number) {
    this.todoForm.controls['item'].setValue(item.description);
    this.updateID = i;
    this.isEditEnabled = true;
  }

  updateTask() {
    this.tasks[this.updateID].description = this.todoForm.value.item;
    this.tasks[this.updateID].isCompleted = false;
    this.todoForm.reset();
    this.updateID = undefined;
    this.isEditEnabled = false;
  }

  archiveCompletedTask(i : number) {
    this.archived.push(this.completed[i]);
    this.completed.splice(i, 1);
  }

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
