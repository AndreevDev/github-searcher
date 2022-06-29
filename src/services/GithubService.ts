import axios from "axios";

import { ListUser, User, Repo } from "../types/GitHubTypes";

const getUsers = async (): Promise<ListUser[]> => {
    const users: ListUser[] = await axios.get('https://api.github.com/users')
        .then(({data}) => {
            const users = data.map(async (user: any) => {
                const repos = await axios.get(user.repos_url);

                return {
                    avatar: user.avatar_url,
                    name: user.login,
                    repoCount: repos.data.length
                };
            });

            return users;
        });
        
    return Promise.all(users);
}

const getUser = async (name: string|undefined): Promise<User> => {
    const user = await axios.get(`https://api.github.com/users/${name}`)
        .then(async ({data}) => {
            const followers = await axios.get(`https://api.github.com/users/${name}/followers`);
            const following = await axios.get(`https://api.github.com/users/${name}/following`);

            return Promise.all([followers, following]).then(() => {

                return {
                    avatar: data.avatar_url,
                    name: data.login,
                    followersCount: followers.data.length,
                    followingCount: following.data.length,
                    bio: data.bio,
                    email: data.email,
                    location: data.location,
                    joinDate: data.created_at.slice(0, data.created_at.indexOf('T'))
                }
            })
        });

    return user;
}

const getUserRepos = async (userName: string|undefined): Promise<Repo[]> => {
    const repos = await axios.get(`https://api.github.com/users/${userName}/repos`);

    const repoList: Repo[]|[] = repos.data.map((repo: any) => {
        if (repo.private) {
            return;
        }

        return {
            name: repo.name,
            url: `https://github.com/${userName}/${repo.name}`,
            stars: repo.stargazers_count,
            forks: repo.forks_count
        }
    });

    return repoList.filter((item) => item);
}

const GithubService = {
    getUsers,
    getUser,
    getUserRepos
}

export default GithubService;