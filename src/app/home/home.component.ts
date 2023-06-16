import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Role } from '../enum/role.enum';
import { FileUploadStatus } from '../model/file-upload.status';
import { User } from '../model/user';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../service/notification.service';
import { UserService } from '../service/user.service';
import { UserComponent } from '../user/user.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
// @ts-ignore
export class HomeComponent extends UserComponent implements OnInit  {
  private titleSubject = new BehaviorSubject<string>('Users');
  public titleAction$ = this.titleSubject.asObservable();
  public users: User[];
  public user: User;
  public refreshing: boolean;
  public selectedUser: User;
  public fileName: string;
  public profileImage: File;
  private subscriptions: Subscription[] = [];
  public editUser = new User();
  private currentUsername: string;
  public fileStatus = new FileUploadStatus();

  constructor(private router: Router, private authenticationService: AuthenticationService,
              private userService: UserService, private notificationService: NotificationService) {
    // @ts-ignore
    super();}

  ngOnInit(): void {
    this.user = this.authenticationService.getUserFromLocalCache();
  }

  changeTitle(title: string): void {
    // Implémentez ici la logique de changement de titre
    console.log('Title changed to:', title);
  }
  public onSelectUser(selectedUser: User): void {

    this.selectedUser = selectedUser;

    this.clickButton('openUserInfo');
  }

  private clickButton(buttonId: string): void {
    document.getElementById(buttonId).click();
  }
  public get isAdmin(): boolean {
    
    // @ts-ignore
    return this.getUserRole() === Role.ADMIN || this.getUserRole() === Role.SUPER_ADMIN;
  }
}
