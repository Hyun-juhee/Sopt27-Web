import axios from 'axios';

const url = 'http://ec2-13-124-127-8.ap-northeast-2.compute.amazonaws.com:3000/api/members';

const getMembersAPI = async () => {
    try {
        const { data } = await axios.get(`${url}`);
        console.log('[SUCCESS] GET MEMBERS', data);
        return data.data;
    } catch (e) {
        console.error('[FAIL] GET MEMBERS', e);
        return e;
    }
}
const getMemberAPI = async (id) => {
    try {
        const { data } = await axios.get(`${url}/${id}`);
        console.log('[SUCCESS] GET MEMBER', data);
        return data.data;
    } catch (e) {
        console.error('[FAIL] GET MEMBER', e);
        throw(e);
    }
}


const updateMember = async (id, member) => {
    try {
        const {data} = await axios.put(`${url}/${id}`, member);
        console.log('[SUCCESS] UPDATE MEMBER', data);
        return data.data;
    } catch (e) {
        throw e;
    }
}

const createMember = async (member) => {
    try {
        const {data} = await axios.post(`${url}`, member);
        return data.data;
    } catch (e) {
        throw e;
    }
}

const deleteMember = async (id) => {
    try {
        const {data} = await axios.delete(`${url}/${id}`);
        return data.data;
    } catch (e) {
        throw e;
    }
}
export {
    getMembersAPI,
    getMemberAPI,
    updateMember,
    createMember,
    deleteMember
};

const api  = {
    getMembersAPI,
    getMemberAPI,
    updateMember,
    createMember,
    deleteMember
}; 
export default api;