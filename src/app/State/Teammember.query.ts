import { QueryEntity } from '@datorama/akita';
import { TeamMember } from '../Types/TeamMember';
import { TeamMemberState, TeamMemberStore } from './Teammember.store';

export class TeamMemberQuery extends QueryEntity<TeamMemberState, TeamMember> {
    constructor(protected override store: TeamMemberStore) {
        super(store);
    }

    const r = query.selectAll();
}