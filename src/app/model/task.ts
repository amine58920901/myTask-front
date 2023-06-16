import { User } from "./user";

export class Task {
  public taskId: number;
  public title: string;
  public description: string;
  public dateTask: Date;
  public userId: string; // Modifier le type en string
  public createdAt: Date;
  public username: string; // Modifier le type en string
  public updatedAt: Date;
  public active: boolean;
  public finish: boolean;
  public authorities: [];

  constructor() {
    this.taskId = null;
    this.title = '';
    this.description = '';
    this.dateTask = null;
    this.userId = ''; // Initialiser avec une chaîne vide
    this.createdAt = null;
    this.updatedAt = null;
    this.active = false;
    this.finish = false;
    this.authorities = [];
    this.username = "";
  }
}
