import { profiles } from '../../../redux/actions/UserActions.ts';
import utils from '../AxiosInstance.ts';
import axios from 'axios';

const { REACT_APP_USERS_ENDPOINT, REACT_APP_POST_ENDPOINT } = process.env;

export const returnUsers = async () => await utils.get(`${REACT_APP_USERS_ENDPOINT}`);

export const retreiveProfile = async (profileId: number) => await utils.get(`${REACT_APP_USERS_ENDPOINT}${profileId}`);

export const find = async (field: string) => {
    const payload = {
        params: {
            username: `${field}`,
        }
    }

    return await utils.get(`${REACT_APP_USERS_ENDPOINT}search`, payload)
}

export const share = async (post) => await utils.patch(`${REACT_APP_USERS_ENDPOINT}`, post);
