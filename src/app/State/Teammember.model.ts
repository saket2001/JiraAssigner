import { ID, guid } from '@datorama/akita';

export interface TeamMember {
    id: ID;
    Name: string;
    Sex: 'Male' | 'Female';  // change this enum later
    Role: string;  // change this enum later
    TotalJirasAssigned: number;
    WorkingDays: number;  // in hrs
}