import { Component } from '@angular/core';
import { TeamInfo } from 'src/app/Types/TeamInfo';
import { TeamMember } from 'src/app/Types/TeamMember';

@Component({
  selector: 'app-assign-page',
  templateUrl: './assign-page.component.html',
  styleUrls: ['./assign-page.component.css']
})
export class AssignPageComponent {
  assignedPerson : TeamMember; 

  constructor(){
    this.assignedPerson = {
      id:0,
      Name:"",
      Role:{id:0,name:""},
      WorkingHours:0,
      TotalJirasAssigned:0,
    }
  }

  public assignTask(){
    var teamMembersData : TeamInfo = JSON.parse(this.getFromLocalStorage() ?? "");

    if(teamMembersData.members.length === 0)
      return alert("Please add team members details first!");

    var ids :number[] =  teamMembersData.members.map(d=>d.id);
    //generating random number
    var assignedPersonId = Math.floor(Math.random() * ids.length);
    
    this.assignedPerson = teamMembersData.members[assignedPersonId] ?? null;
  }

  private getFromLocalStorage(){
    return localStorage.getItem("TeamInfo") ?? null;
  }

}
