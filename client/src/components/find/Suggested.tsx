import * as React from 'react';
import { useState, useEffect } from 'react';
import { profilePicUrl, returnUsers, share } from '../../common/api/user/Users.Api.ts';
import { Submit } from '../../common/components/buttons/Submit.tsx';
import { FindLink, SuggestedLink } from './Find.Styles.ts';
import { Avatar, CardHeader, Grid, IconButton, Typography } from '@mui/material';
import { NoActivity } from '../../common/components/panels/NoActivity.tsx';
import { FriendCard } from '../../common/components/cards/FriendCard.tsx';

interface ISuggestedProps {
    currentUser: any //TODO: make IUser
    following: any;
    profiles: Function;
    feed: Function;
}

export const Suggested: React.FC<ISuggestedProps> = ({ currentUser, following, profiles, feed }) => {

    const [users, setUsers] = useState([])

    const follow = async (friend) => {
        const { authorities, ...rest } = currentUser;
        const data = {
            ...rest,
            followed: [
                ...currentUser.followed,
                { followedId: friend.id }
            ]
        };

        const followed = await share(data);
        if (followed.status === 200) profiles(followed.data);

    }

    const getFriends = async () => {
        const res = await returnUsers();
        setUsers(res?.data)
    }

    const updateFeed = async () => {
        const following = currentUser?.followed?.map((id) => id?.followedId)
        const followedUsers = users?.filter((user) => following?.includes(user?.id))

        feed(followedUsers);
    }

    useEffect(() => {
        getFriends();
        updateFeed();
    }, [currentUser]);



    return (
        <Grid
            container
            spacing={10}
            direction="column"
            alignItems="start"
            justifyContent="center"
            sx={{ marginLeft: '3%' }}
        >
            <Grid item sx={8} >
                <Typography
                    sx={{ fontWeight: 'bold' }}
                    variant="h4"
                    color="text.primary"
                >
                    Suggested
                </Typography>
            </Grid>
            {users &&
                users.map((user) => (
                    <FriendCard
                        user={user}
                        currentUser={currentUser}
                        follow={follow}
                    />
                ))
            }
        </Grid>
    );
}
