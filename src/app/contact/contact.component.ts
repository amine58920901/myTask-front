import { Component, OnInit } from '@angular/core';
import { Role } from '../enum/role.enum';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent extends UserComponent implements OnInit {

  public get isAdmin(): boolean {

    // @ts-ignore
    return this.getUserRole() === Role.ADMIN || this.getUserRole() === Role.SUPER_ADMIN;
  }
}
