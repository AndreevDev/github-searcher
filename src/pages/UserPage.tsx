import UserView from "../components/userView/UserView";
import RepoList from "../components/repoList/RepoList";

const UserPage = () => {
    return(
        <div className="content">
            <UserView/>
            <RepoList/>
        </div>
    );
}

export default UserPage;