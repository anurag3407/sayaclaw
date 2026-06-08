import { isMutationType, type ActionLog, type ActionStatus } from './types';

export class ActionTracker {

    private actions: ActionLog[] = [];


    log(
        entry: Omit<ActionLog, 'id' | 'timestamp' > & {
            id ? : string;
            timestamp ? : Date;
        },
    ): ActionLog {
        const action: ActionLog = {
            id: entry.id || this.generateId(),
            timestamp: entry.timestamp ?? new Date(),
            type: entry.type,
            path: entry.path,
            details: { ...entry.details },
            status: entry.status,
            userApproved: entry.userApproved,
        };
        this.actions.push(action);
        return action;
    }


    getActions(): readonly ActionLog[] {
        return this.actions;
    }

    getPendingMutations():ActionLog[] {
        return this.actions.filter(
            (a)=>isMutationType(a.type) && a.status === 'pending'
        )

    }

    updateStatus( id : string , status : ActionStatus , userApproved ? : boolean    ): void {
        const a = this.actions.find((x)=>x.id === id);
        if(!a) return;

        a.status = status;
        if(userApproved !== undefined) {
            a.userApproved = userApproved;
        }
    }

    private generateId(): string {
        return Math.random().toString(36).substring(2, 15);
    }
}
