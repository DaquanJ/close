export enum UserActionTypes {
    HAS_ACCOUNT = 'Have an account?',
    NO_ACCOUNT = 'Don\'t have an account?',
    FULL_NAME = 'Full Name is required',
    EMAIL = 'Email is required',
    USER_NAME = 'Username is required',
    PASSWORD = 'Password is required',
    PASSWORD_LENGTH = 'Password cannot be more than 11 characters',
    PASSWORD_MUST_CONTAIN = 'Password must contain a number.',
    IS_VALID_EMAIL = 'Must be a valid email',
    BAD_CREDENTIALS = 'Sorry, your username and/or password are incorrect',
    RECENT = 'Recent',
    CHAR_MAX = 32,
    FIND_FRIENDS = 'Find Friends',
    FOLLOW_MESSAGE = 'When you follow friends, you\'ll see the photos and videos they post here',
    FOLLOW_FRIENDS = 'Follow your first Friend',
    SHARE_PHOTOS = 'Share Photos',
    SHARE_MESSAGE = 'When you share photos, they will appear on your profile',
    SHARE_LINK = 'Share your first photo',
    SHARE_PATH = '/share',
    NO_POSTS = 'No Posts Yet',
    NO_POSTS_MESSAGE = 'When a friend posts, their photos and videos will appear here',
}