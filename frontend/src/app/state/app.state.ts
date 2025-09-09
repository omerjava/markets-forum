import { attachmentReducer, AttachmentState } from './attachment/attachment.reducer';
import { categoryReducer, CategoryState } from './category/category.reducer';
import { forumThreadReducer, ForumThreadState } from './forum-thread/forum-thread.reducer';
import { likeReducer, LikeState } from './like/like.reducer';
import { postReducer, PostState } from './post/post.reducer';
import { profilePhotoReducer } from './profile-photo/profile-photo.reducer';
import { ProfilePhotoState } from './profile-photo/profile-photo.state';
import { tagReducer, TagState } from './tag/tag.reducer';
import { userProfileReducer } from './user-profile/user-profile.reducer';
import { UserProfileState } from './user-profile/user-profile.state';

export interface AppState {
    userProfile: UserProfileState;
    profilePhoto: ProfilePhotoState;
    category: CategoryState;
    forumThread: ForumThreadState;
    post: PostState;
    like: LikeState;
    tag: TagState;
    attachment: AttachmentState;
}

export const appReducers = {
    userProfile: userProfileReducer,
    profilePhoto: profilePhotoReducer,
    category: categoryReducer,
    forumThread: forumThreadReducer,
    post: postReducer,
    like: likeReducer,
    tag: tagReducer,
    attachment: attachmentReducer,
};
