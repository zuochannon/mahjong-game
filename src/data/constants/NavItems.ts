const navItems = {
    tutorial: {id: 2, text: 'Tutorial and Rules', url: '/rulesandtutorial', desc: 'Learn to play Chess'},
    create: {id: 3, text: 'Create Room', url: '/createroom', desc: 'Create a room'},
    join: {id: 4, text: 'Join Room', url: '/joinroom', desc: 'Join a room'},
    practice: {id: 5, text: 'Practice', url: '/play', desc: 'Play in practice mode'},
    login: {id: 6, text: 'Login', url: '/login', desc: 'Create a room'},
    signup: {id: 7, text: 'Sign Up', url: '/signup', desc: 'Create a room'},
    profile: {id: 8, text: 'Profile', url: '/profile', desc: 'Create a room'},
    blog: {id: 8, text: 'Blog', url: '/dev', desc: 'Create a room'}
};


export const navPlayItems = [
    navItems.create,
    navItems.join,
    navItems.practice
]

export const navTutorialItems = [
    navItems.tutorial,
];

export const navCommunityItems = [
    navItems.blog,
];


export const navUserItems = [
    {id: 1, text: 'Dashboard', url: '/'},
    {id: 2, text: 'Profile', url: '/profile'},
];

export const NavigationBarHeight = 76;
export const ButtonOffset = 50;