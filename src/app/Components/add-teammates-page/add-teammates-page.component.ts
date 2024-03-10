import { Component, OnInit } from '@angular/core';
import { TeamInfo } from 'src/app/Types/TeamInfo';
import { TeamMember } from 'src/app/Types/TeamMember';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ModeEnumValues } from 'src/app/Enums/ModeEnumValues';
import { ModeEnum } from 'src/app/Types/ModeEnum';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { Role } from 'src/app/Types/Role';
import { RoleDropdownValues } from 'src/app/Enums/RoleDropdownValues';

@Component({
  selector: 'app-add-teammates-page',
  templateUrl: './add-teammates-page.component.html',
  styleUrls: ['./add-teammates-page.component.css']
})
export class AddTeammatesPageComponent implements OnInit {
  teamMember: TeamMember;
  myTeamInfo :TeamInfo;
  showTeammembersDetails : boolean = false;
  modeSelected:ModeEnum | null;
  roleDropdown:Role[] = RoleDropdownValues;
  isSmartMode : boolean = false;

  constructor(private route: ActivatedRoute,private localStorageService : LocalStorageService,private router:Router){
    this.modeSelected = null;
    this.roleDropdown = RoleDropdownValues;

    this.teamMember = {
      id:0,
      Name:"",
      Role:{id:0,name:""},
      WorkingHours:0,
      TotalJirasAssigned : 0,
      IsSelectedForAssigning:false
    };

    this.myTeamInfo = {
      id:null,
      teamName:"",
      totalMembers:0,
      createdOn:"",
      editedOn:"",
      members:[]
    }

    //get stored values
    let storedDetails = this.localStorageService.getFromLocalStorage("TeamInfo")
    if(storedDetails !== null){
      this.myTeamInfo = JSON.parse(storedDetails);
      this.toggleDisplayBoard();
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      const modeId = Number(params["mode"]);
      this.modeSelected = ModeEnumValues.find(d=>d.id === modeId) ?? null;
      this.isSmartMode = this.modeSelected?.name.toLowerCase() === "smart mode" ? true : false;      
    });
  }

  private getCountOfTeamMembers(){
    return this.myTeamInfo !== null ? this.myTeamInfo.members?.length : 0;
  }

  private getTeammemberByName(name:string){
    return this.myTeamInfo.members.find(d=>d.Name?.toLowerCase() === name.toLowerCase());
  }

  public addTeamMember(){

    //validation
    const result = this.validateNewTeamMember(this.teamMember,this.isSmartMode,this.myTeamInfo);

    if(result){
      var existingMember = this.getTeammemberByName(this.teamMember.Name.toLowerCase());

      var newEntry : TeamMember = {
        id : this.getCountOfTeamMembers() + 1,
        Name : this.teamMember.Name,
        Role:this.roleDropdown.find(d=>d.id === Number(this?.teamMember?.Role)) ?? null,
        TotalJirasAssigned : 0,
        WorkingHours : this.teamMember.WorkingHours,
        IsSelectedForAssigning:false
      };

      
      this.myTeamInfo.members.push(newEntry);
      this.myTeamInfo.totalMembers = this.myTeamInfo.members.length;
      alert("New Team member saved successfully!");
      
      this.toggleDisplayBoard();
  
      //save in localstorage
      this.localStorageService.saveInLocalStorage("TeamInfo",this.myTeamInfo);
  
      // this.myTeamInfo.teamName = "";
      this.teamMember.Name = "";
      this.teamMember.Role = {id:0,name:""};
      this.teamMember.WorkingHours = 0;
    }
  }

  private validateNewTeamMember(newMember:TeamMember,isSmartMode:boolean,teamInfo:TeamInfo) : boolean{
    
    let result = true;
    const invalidMemberNameRegrex = /[0-9]+/gi;
    
    if(newMember.Name.trim().length === 0 || newMember.Name.trim().length > 50){
      alert("Team member name should be of length between 1 and 50 characters long!");
      return result = false
    }
    
    if(invalidMemberNameRegrex.test(newMember.Name)){
      alert("Team member name cannot contain any numeric value!");
      return result = false
    }
    
    var memberExists : TeamMember | undefined = this.getTeammemberByName(this.teamMember.Name.toLowerCase());
    if(memberExists){
      alert("Team member with same name already exists!");
      return result = false
    }
    
    // extra validations if smart mode is select
    if(isSmartMode){
      console.log(newMember,isSmartMode,teamInfo);
      //team name
      if(teamInfo?.teamName.trim().length === 0 || teamInfo?.teamName.trim().length > 50){
        alert("Team name should be of length between 1 and 50 characters long!");
        return result = false
      }

      //role
      if(this.teamMember.Role === null || +this.teamMember.Role === 0 || +this.teamMember.Role.id === 0){
        alert("Please select any one role for the new team member!");
        return result = false
      }

      //working hours
      if(this.teamMember.WorkingHours === null || +this.teamMember.WorkingHours < 0){
        alert("Please enter value for total working hours greater than or equal to 0 ");
        return result = false
      }
    }

    return result;
  }

  private toggleDisplayBoard(){
    this.showTeammembersDetails = this.myTeamInfo.members.length > 0 ? true : false;
  }

  deleteTeamMember(id:number){
    this.myTeamInfo.members = this.myTeamInfo.members.filter(d=>d.id !== id);
    this.myTeamInfo.totalMembers--;
    this.localStorageService.saveInLocalStorage("TeamInfo",this.myTeamInfo);
    this.toggleDisplayBoard();
    // alert("Team member removed successfully!");
  }

  handleAssignTasks(){
    if(this.myTeamInfo.members.length === 0)
      return alert("Please add some team members first to go ahead!");
    else
      this.router.navigate(["/assign-tasks"],{queryParams:{mode:this.modeSelected?.id}});
  }
}
