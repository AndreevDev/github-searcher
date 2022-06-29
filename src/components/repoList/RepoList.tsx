import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import Search from "../../components/search/Search";
import { Repo } from '../../types/GitHubTypes';
import GithubService from '../../services/GithubService';

const RepoList = () => {

    const [repoName, setRepoName] = useState('');
    const { name } = useParams();
    const { getUserRepos } = GithubService;

    const { isLoading, isError, data, error, refetch } = useQuery<Repo[], Error>(
        "repoList",
        () => getUserRepos(name),
        { select: (repoList) => repoList.filter((repo) => repo.name.includes(repoName)) }
    );

    if (isLoading) {
        return <div className="content"><div>Loading...</div></div>
    }
    
    if (isError) {
        return <div className="content"><div>Error! {error ? error.message : ''}</div></div>
    }

    const repoList = data?.map((item, key) => {
        return(
            <li key={key}>
                <a href={item.url} className="repo__item">
                    <span>{item.name}</span>
                    <div className="stars-forks">
                        <span>{item.forks} Forks</span>
                        <span>{item.stars} Stars</span>
                    </div>
                </a>
            </li>
        );
    });

    return(
        <>
            <Search value={repoName} onChange={setRepoName} placeholder="Search for User's Repositories"/>
            <ul className="repo__list">
                {repoList}
            </ul>
        </>
    );
}

export default RepoList;