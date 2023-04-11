import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ITask } from '../model/task';
import { TodoDialogComponent } from '../todo-dialog/todo-dialog.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {

  todoForm !: FormGroup;
  tasks : ITask [] = [];
  inbox : ITask [] = [];
  sprint : ITask [] = [];
  inProgress : ITask [] = [];
  completed : ITask [] = [];
  archived : ITask [] = [];
  updateID : any;
  isEditEnabled : boolean = false;

  constructor(private fb : FormBuilder, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item : ['', Validators.required]
    })

    // Add task/s to Inbox
    this.inbox.push({
      name: "Add search functionality for Docs page (Preonbox)",
      type: "User Story",
      isCompleted: false
    },
    {
      name: "Add color theme toggle (Pivot)",
      type: "User Story",
      isCompleted: false
    },
    {
      name: "Add change background feature (Pivot)",
      type: "User Story",
      isCompleted: false
    },
    {
      name: "Create French version of website (Preonbox)",
      type: "User Story",
      isCompleted: false
    },
    {
      name: "Design mise-en-scène for that one realm (Griphos)",
      type: "User Story",
      isCompleted: false
    })

    // Add task/s to Sprint
    this.sprint.push({
      name: "Add side menu to navigate through separate kanban boards for each project (Pivot)",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut mollis lacinia quam, at posuere nulla rhoncus nec. Etiam eget eleifend velit. Curabitur a dignissim mi. Integer quis purus vitae erat scelerisque blandit at bibendum ante. Ut faucibus venenatis felis sit amet vulputate. Curabitur rutrum commodo urna, et blandit lorem laoreet condimentum. Donec finibus, ante scelerisque lacinia pretium, nunc quam viverra justo, in pellentesque tortor diam vitae purus. Integer porttitor justo at odio egestas imperdiet. Donec vitae ligula tempor, posuere nunc vitae, sollicitudin magna.",
      type: "User Story",
      isCompleted: false,
      subtasks: [{
        name: "subtask 1",
        isSubTaskCompleted: false,
        level: 1
      },
      {
        name: "subtask 2",
        isSubTaskCompleted: false,
        level: 1
      }]
    },
    {
      name: "Explore goodreads dataset obtained from Kaggle (Tir: Book Recommendation System)",
      type: "User Story",
      isCompleted: false
    })

    // Add task/s to In Progress
    this.inProgress.push({
      name: "Make lists scrollable (Pivot)",
      type: "User Story",
      isCompleted: false
    },
    {
      name: "Draw chess board graphics using JS (Simply Chess)",
      type: "User Story",
      isCompleted: false
    },
    {
      name: "Add sub-tasks (Pivot)",
      type: "User Story",
      description: "As a user, I would like to add sub-tasks to a task so that I can break complex tasks down to smaller, more manageable steps.",
      isCompleted: false,
      subtasks: [{
        name: "Create a new interface titled: 'ISubTask' and define the following types of variables as either mandatory (M) or optional (O): "  +
        "'name: string;' (M), 'isSubTaskCompleted: boolean' (M), 'description: string' (O), 'priority: number' (O), 'level: number' (M).",
        isSubTaskCompleted: true,
        level: 1
      },
      {
        name: "Define an optional array of 'ISubTasks' in the existing 'ITask' interface",
        isSubTaskCompleted: true,
        level: 1
      },
      {
        name: "Create a dialog component and inject data (particularly data.subtask.name) based on button pressed",
        isSubTaskCompleted: true,
        level: 1
      },
      {
        name: "Enable user to edit task variables as well as subtask variables",
        isSubTaskCompleted: false,
        level: 1
      },
      {
        name: "Prettify dialog box",
        isSubTaskCompleted: false,
        level: 1
      }]
    })

    // Add task/s to Completed and set to complete
    this.completed.push({
      name: "Create logo (Tir: Book Recommendation System)",
      type: "User Story",
      isCompleted: true
    },
    {
      name: "Write story script for one realm (Griphos)",
      type: "User Story",
      isCompleted: true
    },
    {
      name: "Overlay over each project logo by default, show true logo colours when hovered over if deployed (Preonbox)",
      type: "User Story",
      isCompleted: true
    })
  }

  // TODO: function that consolidates all lists into one list (tasks) 

  openDialog(item : ITask) {
    this.dialog.open(TodoDialogComponent, {
      minWidth: "80%",
      data: {
        name: item.name,
        description: item.description,
        isCompleted: item.isCompleted,
        priority: item.priority,
        subtasks: item.subtasks
      }
    })
  }

  addInboxTask() {
    this.inbox.push({
      name: this.todoForm.value.item,
      isCompleted: false
    })
    this.todoForm.reset();
    console.log("Added Task to Inbox");
  }

  deleteInboxTask(i : number) {
    this.inbox.splice(i, 1);
    console.log("Deleted Task");
  }

  deleteSprintTask(i : number) {
    this.sprint.splice(i, 1);
    console.log("Deleted Task");
  }

  deleteInProgressTask(i : number) {
    this.inProgress.splice(i, 1);
    console.log("Deleted Task");
  }

  deleteCompletedTask(i : number) {
    this.completed.splice(i, 1);
    console.log("Deleted Task");
  }

  onEdit(item : ITask, i : number) {
    this.todoForm.controls['item'].setValue(item.name);
    this.updateID = i;
    this.isEditEnabled = true;
  }

  updateTask() {
    this.inbox[this.updateID].name = this.todoForm.value.item;
    this.inbox[this.updateID].isCompleted = false;
    this.todoForm.reset();
    this.updateID = undefined;
    this.isEditEnabled = false;
  }

  archiveCompletedTask(i : number) {
    this.archived.push(this.completed[i]);
    this.completed.splice(i, 1);
    console.log("Archived Completed Task");
    console.log(this.archived);
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
