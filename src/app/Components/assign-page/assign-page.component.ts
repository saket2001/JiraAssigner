import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModeEnumValues } from 'src/app/Enums/ModeEnumValues';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { ModeEnum } from 'src/app/Types/ModeEnum';
import { TeamInfo } from 'src/app/Types/TeamInfo';
import { TeamMember } from 'src/app/Types/TeamMember';

@Component({
  selector: 'app-assign-page',
  templateUrl: './assign-page.component.html',
  styleUrls: ['./assign-page.component.css']
})
export class AssignPageComponent {
  assignedPerson : TeamMember = {
    id:0,
    Name:"",
    Role:{id:0,name:""},
    WorkingHours:0,
    TotalJirasAssigned:0, 
    IsSelectedForAssigning:false
  }
  selectedTeamMembers : TeamMember[] | undefined = [];

  isSmartMode : boolean = false;
  myTeamInfo : TeamInfo | null = null;
  modeSelected:ModeEnum | null = null;

  constructor(private route: ActivatedRoute,private storageService : LocalStorageService){
    const savedData = this.storageService.getFromLocalStorage("TeamInfo");
    if(savedData !== null){
      this.myTeamInfo = JSON.parse(savedData);
      this.selectedTeamMembers = this.myTeamInfo?.members.filter(d=>d.IsSelectedForAssigning);
    }

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      const modeId = Number(params["mode"]);
      this.modeSelected = ModeEnumValues.find(d=>d.id === modeId) ?? null;
      this.isSmartMode = this.modeSelected?.name.toLowerCase() === "smart mode" ? true : false;      
    });
  }

  public assignTask(){
    try{

      if(this.myTeamInfo?.members?.length === 0)
      return alert("Please add team members details first!");
    
      //get selected members only
      this.selectedTeamMembers = this.myTeamInfo?.members.filter(d=>d.IsSelectedForAssigning);

      if(this.selectedTeamMembers == undefined || this.selectedTeamMembers?.length < 2 )
        return alert("Please select atlease two team members before pressing the Assign Task button!")
      else{
        const ids :number[] = this.selectedTeamMembers?.map(d=>d.id) ?? [];
        if(ids.length>0){
          //generating random number
          const randomId = Math.floor(Math.random() * ids.length);
    
          this.assignedPerson =  this.selectedTeamMembers ? this.selectedTeamMembers[randomId] : {
            id:0,
            Name:"",
            Role:{id:0,name:""},
            WorkingHours:0,
            TotalJirasAssigned:0, 
            IsSelectedForAssigning:false
          };
        }
      }

  }
  catch{
    return alert("Something went wrong! Please refresh the page and try again")
  }
    
  }

  public selectTeamMember(id:number){
    if(this?.myTeamInfo){
      this.myTeamInfo?.members.forEach(d=>{
          if(d.id === id){
            d.IsSelectedForAssigning = !d.IsSelectedForAssigning;
            if(d.IsSelectedForAssigning) 
              this.selectedTeamMembers?.push(d);
            else
              this.selectedTeamMembers = this.selectedTeamMembers?.filter(d=>d.id === id);
        }
      });

      this.storageService.saveInLocalStorage("TeamInfo",this.myTeamInfo)
    }
  }

}
