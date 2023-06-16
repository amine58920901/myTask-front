import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { NotificationType } from '../enum/notification-type.enum';
import { FileUploadStatus } from '../model/file-upload.status';
import { Task } from '../model/task';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../service/notification.service';
import { TaskService } from '../service/task.service';
import { UserComponent } from '../user/user.component';
import { Role } from '../enum/role.enum';
import { User } from '../model/user';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
// @ts-ignore
export class TaskComponent extends UserComponent implements OnInit  {
  tasks: Task[];
  private titleSubject = new BehaviorSubject<string>('Tasks');
  public titleAction$ = this.titleSubject.asObservable();

 /* public tasks : Task[]; */
  public task: Task;
  public refreshing: boolean;
  public selectedTask: Task;
  public fileName: string;
  public profileImage: File;
  private subscriptions: Subscription[] = [];
  public editTask = new Task();
  private currentTitle: string;
  public fileStatus = new FileUploadStatus();
  public currentUser : User;
  currentUserTasks: Task[];



  constructor(private taskService: TaskService, private notificationService: NotificationService,private router: Router, private authenticationService: AuthenticationService, ) {
    // @ts-ignore
    super();
  }

  ngOnInit() {
    this.getCurrentUser();
    this.getTasksByCurrentUser(this.currentUser.username);
  }

  logTaskId(appTask: Task): void {
    console.log(appTask.taskId);
  }
  
  getTasksByCurrentUser(username: string) {
    this.taskService.getAllTasksByUsername(username).subscribe(
      (tasks: Task[]) => {
        this.currentUserTasks = tasks;
        this.tasks = tasks;
      },
      (error) => {
        console.log(error);
      }
    );
  }




  private getCurrentUser(): void {
    this.currentUser = this.authenticationService.getUserFromLocalCache();
  }

  public changeTitle(title: string): void {
    this.titleSubject.next(title);
  }

  public getAllTasks(showNotification: boolean):void {
    this.refreshing = true;
    this.subscriptions.push(
      this.taskService.getAllTasks().subscribe(
        (response: Task[]) => {
          this.taskService.addTasksToLocalCache(response);
          this.tasks = response;
          this.refreshing = false;
          if (showNotification) {
            this.sendNotification(NotificationType.SUCCESS, `${response.length} user(s) loaded successfully.`);
          }
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.refreshing = false;
        }
      )
    );
  }


  getTaskById(id: number) {
    this.taskService.getTaskById(id).subscribe(
      (task: Task) => {
        // Faire quelque chose avec la tâche récupérée
      },
      (error) => {
        console.log(error);
      }
    );
  }

  createTask(task: Task) {
    this.taskService.createTask(task).subscribe(
      (newTask: Task) => {
        // Faire quelque chose avec la nouvelle tâche créée
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateTask(id: number, task: Task) {
    this.taskService.updateTask(id, task).subscribe(
      (updatedTask: Task) => {
        // Faire quelque chose avec la tâche mise à jour
      },
      (error) => {
        console.log(error);
      }
    );
  }

 public onDeleteTask(id: number): void {
   this.subscriptions.push(
    this.taskService.deleteTask(id).subscribe(
      // @ts-ignore
      (response: CustomHttpResponse) => {
        this.sendNotification(NotificationType.SUCCESS, response.message);
        this.getUsers(false);
      },
      (error: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, error.error.message);
      }
    )
    );
  }

  public onEditTask(editTask: Task): void {
    this.editTask = editTask;
    this.currentTitle = editTask.title;
    this.clickButton('openTaskEdit');
  }


  getAllTasksByUsername(username: string) {
    this.taskService.getAllTasksByUsername(username).subscribe(
      (tasks: Task[]) => {
        // Faire quelque chose avec les tâches récupérées pour l'utilisateur donné
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public searchTasks(searchTerm: string): void {
    const results: Task[] = [];
    for (const task of this.tasks) {
      if (task.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        task.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
        results.push(task);
      }
    }
    // Mettre à jour la liste des tâches avec les résultats de la recherche
    this.tasks = results;
    if (results.length === 0 || !searchTerm) {
      // @ts-ignore
      this.filteredTasks = this.tasks;
    }
  }

  public onSelectTask(selectedTask: Task): void {
    this.selectedTask = selectedTask;
    this.clickButton('openTaskInfo');
  }

  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'An error occurred. Please try again.');
    }
  }

  private clickButton(buttonId: string): void {
    document.getElementById(buttonId).click();
  }

  public get isAdmin(): boolean {
    // @ts-ignore
    return this.getUserRole() === Role.ADMIN || this.getUserRole() === Role.SUPER_ADMIN;
  }

  ngOnDestroy() {
    // Effectuer les nettoyages nécessaires (désabonnement, etc.)
  }
}
