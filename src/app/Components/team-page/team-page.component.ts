import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { TeamInfo } from 'src/app/Types/TeamInfo';

//////////////////////////////////////////

//////////////////////////////////////////

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.css']
})
export class TeamPageComponent {

  constructor(){
    //get stored values
    let storedDetails = localStorage.getItem("TeamInfo");
    if(storedDetails !== null){
      this.myTeamInfo = JSON.parse(storedDetails);
    }
  }

  public myTeamInfo :TeamInfo = {
    id:null,
    teamName:"",
    totalMembers:0,
    createdOn:"",
    editedOn:"",
    members:[]
  }

  private generateTeamMembersHtml(totalBlocks : number){

    const membersDetailsForm = document.getElementById("membersDetailsForm");

    if(membersDetailsForm !== null){

      membersDetailsForm.innerHTML = "";
      
    for(let i=0;i<totalBlocks;i++){
      //outer div
      let mainDiv = document.createElement("div");
      mainDiv.classList.add("input-div");
      mainDiv.classList.add("input-div_col");
      mainDiv.classList.add("w-3/4");
      
      //label 
      let label = document.createElement("label");
      label.innerText = `Member ${i+1} Details`;
      mainDiv.insertAdjacentElement("beforeend",label);

      //inner div
      let innerDiv = document.createElement("div");
      innerDiv.classList.add("flex");
      innerDiv.classList.add("gap-x-4");

      //input 1
      const nameIput = document.createElement("input");
      nameIput.classList.add("input_box");
      nameIput.setAttribute("placeholder","Full Name");
      // nameIput.setAttribute("[(NgModel),"myTeamInfo")
      innerDiv.insertAdjacentElement("beforeend",nameIput);

      //input 1
      const roleInput = document.createElement("select");
      roleInput.classList.add("input_box");

      const opt1 = document.createElement("option");
      opt1.value = '';
      opt1.innerText = "Select One Role";

      const opt2 = document.createElement("option");
      opt2.value = "Developer";
      opt2.innerText = "Developer";
      const opt3 = document.createElement("option");
      opt3.value = "Tester";
      opt3.innerText = "Tester";

      roleInput.insertAdjacentElement("beforeend",opt1);
      roleInput.insertAdjacentElement("beforeend",opt2);
      roleInput.insertAdjacentElement("beforeend",opt3);
      innerDiv.insertAdjacentElement("beforeend",roleInput);

      //input 3
      const workingHrsIput = document.createElement("input");
      workingHrsIput.classList.add("input_box");
      workingHrsIput.setAttribute("placeholder","Total Working Days");
      innerDiv.insertAdjacentElement("beforeend",workingHrsIput);


      mainDiv.insertAdjacentElement("beforeend",innerDiv);

      

      membersDetailsForm?.insertAdjacentElement("beforeend",mainDiv);
    }
  }
  }

  saveTeamInfo(newDetails:TeamInfo){

    if(newDetails.teamName.length==0){
      return alert("Please enter a valid Team Name!");
    }
    if(newDetails.totalMembers <=0 ){
      return alert("Please enter a valid number for Team Members!");
    }

    this.myTeamInfo = {
      id: this.myTeamInfo.id == null? 1 : this.myTeamInfo.id,
      teamName: newDetails.teamName.length == 0 ? this.myTeamInfo.teamName : newDetails.teamName,
      totalMembers: newDetails.totalMembers,
      createdOn: this.myTeamInfo.id == null? new Date() :this.myTeamInfo.createdOn,
      editedOn: new Date(),
      members:this.myTeamInfo.id == null ? [] : this.myTeamInfo.members
    }

    
    alert("Details Saved Successfully!");
    
    //save in localstorage
    localStorage.setItem("TeamInfo",JSON.stringify(this.myTeamInfo));
    
    //generate new blocks
    this.generateTeamMembersHtml(newDetails.totalMembers);
  }
}
