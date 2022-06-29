import { useState } from "react";
import { useQuery } from "react-query";
import GithubService from "../../services/GithubService";
import { Link } from 'react-router-dom';
import Search from "../../components/search/Search";
import { ListUser } from "../../types/GitHubTypes";

import './userList.scss';

const UserList = () => {

    const { getUsers } = GithubService;

    const [userName, setUserName] = useState('');

    const { isLoading, isError, data, error, refetch } = useQuery<ListUser[], Error>(
        "userList",
        getUsers,
        { select: (userList) => userList.filter((user) => user.name.includes(userName)) }
    );


    if (isLoading) {
        return <div className="content"><div>Loading...</div></div>
    }
    
    if (isError) {
        return <div className="content"><div>Error! {error ? error.message : ''}</div></div>
    }

    const getItems = (users: ListUser[] | undefined) => {
        if (!users) {
            return;
        }
        
        return users.map((user: ListUser, key: number) => (
            <li key={key}>
                <Link to={`/users/${user.name}`} className="user__item">
                    <img src={user.avatar} alt="avatar" />
                    <span className="name">{user.name}</span>
                    <span className="repo-count">Repo: {user.repoCount}</span>
                </Link>
            </li>
        ));
    };

    const items = getItems(data);

    return(
        <>
            <Search value={userName} onChange={setUserName} placeholder="Search for Users"/>
            <ul className="user__list">
                {items}
            </ul>
        </>
    );
}

export default UserList;