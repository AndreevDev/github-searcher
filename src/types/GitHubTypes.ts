export type ListUser = {
    avatar: string,
    name: string,
    repoCount: number
};

export type User = {
    avatar: string,
    name: string,
    followersCount: number,
    followingCount: number,
    bio: string,
    email: string,
    location: string,
    joinDate: string
};

export type Repo = {
    name: string,
    url: string,
    stars: number,
    forks: number
}