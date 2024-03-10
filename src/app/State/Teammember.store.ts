import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { TeamMember } from './Teammember.model';

export interface TeamMemberState extends EntityState<TeamMember>{}

@StoreConfig({
    name: 'teammembers'
})
export class TeamMemberStore extends EntityStore<TeamMemberState, TeamMember> {
    constructor() {
        super();
    }
}
