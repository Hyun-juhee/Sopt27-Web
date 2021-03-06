import { Switch, Route } from 'react-router-dom';
import MemberList from './MemberList';
import MemberDetail from './MemberDetail';

const Member = ({match}) => {
    return (
        <section style={{margin: "0 90px"}}>
            <Switch>
                {/* members/로 들어 왔을 때 memberList, /:id 있으면 memberDetail */}
                {/* path={match.path} : 넘어온 path */}
                <Route exact path={match.path} component={MemberList}/>
                <Route path={`${match.path}/:id`} component={MemberDetail}/>
            </Switch>
        </section>
    );
}
export default Member;