import { TeamMember } from "./TeamMember"

export type TeamInfo={
    id:number|null,
    teamName:string,
    totalMembers:number,
    createdOn:Date | string,
    editedOn:Date | string,
    members:TeamMember[]
}