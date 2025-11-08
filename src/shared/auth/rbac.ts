export enum Role { GUEST='GUEST', USER='USER', ADMIN='ADMIN' }
export type Permission = 'jobs.read'|'jobs.apply'|'mentor.chat'|'profile.edit'|'admin.read'


export const rolePermissions: Record<Role, Permission[]> = {
    [Role.GUEST]: [],
    [Role.USER]: ['jobs.read','jobs.apply','mentor.chat','profile.edit'],
    [Role.ADMIN]: ['jobs.read','jobs.apply','mentor.chat','profile.edit','admin.read']
};


export const can = (role: Role, perm: Permission) => rolePermissions[role]?.includes(perm) ?? false;