import './MemberList.scss'
import Button from '../../components/button/Button';
import Card from '../../components/card/Card';
import { useEffect, useState } from 'react';
import Loading from '../../components/loading/Loading';

import { getMembersAPI, createMember } from '../../lib/api/memberAPI';

function MemberList({ history, match }) {
    const [ membersState, setMembersState ] = useState({
        members: null,
        status: 'idle',
    });

    useEffect(() => {
        (async () => {
            setMembersState({ members: null, status: 'pending' });
            try {
                const result = await getMembersAPI();
                setTimeout(() => setMembersState({ members: result, status: 'resolved' }), 800);
            } catch (e) {
                setMembersState({ members: null, status: 'rejected' });
            }
        })();
    }, []);
    const createCard = async() => {
        try {
            const result = await createMember({
                name: '',
                instagram: '',
                profileUrl: '',
                mbti: '',
                introduction: ''
            });
            setMembersState({
                members: [...membersState.members, result],
                status: 'resolved'
            })
        }catch (e) {
            console.log(e)
        }
    }
    switch (membersState.status) {
        case 'pending':
            return <Loading />;
        case 'rejected':
            return <div>데이터 로딩 실패</div>;
        case 'resolved':
            return (
                <div className="member-list">
                    <div className="member-list__title">파트원 소개</div>
                    <div className="member-list__header member-list-header">
                        <div className="member-list-header__nav">Gallery View</div>
                        <div className="member-list-header__empty"></div>
                        <Button text="Properties" textColor="#777"></Button>
                        <Button text="Filter" textColor="#777"></Button>
                        <Button text="Sort" textColor="#777"></Button>
                        <Button text="Search" textColor="#777" icon="search"></Button>
                        <Button text=" .." textColor="#777"></Button>
                    </div>
                    <hr />
                    <div className="member-list-content-wrapper">
                        {membersState.members.map((member, i) =>
                            <Card key={"card-" + i} memberData={member} 
                                onDeleteCard={() => setMembersState({
                                    status: 'resolved',
                                    members: membersState.members.filter(mem=>mem.id!==member.id)
                                })}
                            />)}
                        <div className="create-card" onClick={ createCard }>+ New</div>
                    </div>
                </div>
            );
        case 'idle':
        default:
            return <div></div>
    }
}

export default MemberList;