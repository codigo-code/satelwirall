export interface iTableUser {
    name?: string;
    role: 'admin' | 'comercial' | 'operational' | 'none';
    email?: string;
    updatedAt?: string;
    updatedBy?: string;
}