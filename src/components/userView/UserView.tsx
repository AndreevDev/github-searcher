import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { User } from '../../types/GitHubTypes';
import GithubService from '../../services/GithubService';

import './userView.scss';

const SingleUser = () => {

    const { name } = useParams();
    
    const { getUser } = GithubService;

    const { isLoading, isError, data, error, refetch } = useQuery<User, Error>("user", () => {
        return getUser(name);
    });

    if (isLoading) {
        return <div className="content"><div>Loading...</div></div>
    }
    
    if (isError) {
        return <div className="content"><div>Error! {error ? error.message : ''}</div></div>
    }

    return(
        <>
            {data ?
                <div className="content">
                    <div className="user__card">
                        <img src={data.avatar} alt="avatar"/>
                        <div className="user__info">
                            <p>{data.name}</p>
                            <p>{data.email}</p>
                            <p>{data.location}</p>
                            <p>{data.joinDate}</p>
                            <p>{data.followersCount} Followers</p>
                            <p>Following {data.followingCount}</p>
                        </div>
                    </div>
                </div>
                : null
            }
        </>
    );
}

export default SingleUser;