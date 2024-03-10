import { Role as RoleType } from "./Role"

export type TeamMember = {
    id:number,
    Name:string,
    Role:RoleType | null,
    WorkingHours:number | null,
    TotalJirasAssigned : number,
    IsSelectedForAssigning:boolean
}