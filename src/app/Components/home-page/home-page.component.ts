import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LinkEnumValues } from 'src/app/Enums/LinkEnumValues';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  private linkEnums = LinkEnumValues;

  constructor(private route : Router){}

  RedirectTo(linkId:number){
    var toGoLink = this.linkEnums.find(d=>d.id === linkId);
    if(toGoLink!== null){
      this.route.navigate([toGoLink?.link],{queryParams:{mode:toGoLink?.queryParam}})
    }
  }
}
