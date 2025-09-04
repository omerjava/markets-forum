import { UserProfile } from '../../models/user-profile';

export interface UserProfileState {
    profile: UserProfile | null;
    loading: boolean;
    error: any;
}