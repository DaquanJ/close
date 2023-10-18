import * as React from 'react';
import { Link } from 'react-router-dom';
import EasyEdit, { Types } from 'react-easy-edit';
import Grid from '@mui/material/Grid';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import TuneTwoToneIcon from '@mui/icons-material/TuneTwoTone';
import SaveAsTwoToneIcon from '@mui/icons-material/SaveAsTwoTone';
import DoneTwoToneIcon from '@mui/icons-material/DoneTwoTone';
import CloudSyncTwoToneIcon from '@mui/icons-material/CloudSyncTwoTone';
import NoPhotographyTwoToneIcon from '@mui/icons-material/NoPhotographyTwoTone';
import { Avatar, CardContent, CardHeader, IconButton, Tooltip, Typography } from '@mui/material';
import Fade from '@mui/material/Fade';
import { IProfileDispatchToProps, IProfileStateToProps } from '../../types/user.ts';
import { Seperate } from '../find/Find.Styles.ts';
import { retreiveProfile, share } from '../../common/api/user/Users.Api.ts';
import { profiles } from '../../redux/actions/UserActions.ts';
import { Submit } from '../../common/components/buttons/Submit.tsx';
import InputField from '../../common/components/fields/InputField.tsx'
import { profileFields } from '../../common/constants/formFields.ts';
import { BodyEditor, HeaderEditor } from './Profile.Styles.ts';
import { MyDropzone } from '../../common/hooks/Dropzone.tsx';
import { Toll } from '@mui/icons-material';
import { NoActivity } from '../../common/components/panels/NoActivity.tsx';
import { UserActionTypes } from '../../common/enums/UserActionType.ts';

interface IProfileProps {

}

interface IProfileState {
    userLikes: number;
    posts: number;
    editing: boolean;
    pictures: string; // TODO: make IFields
    fields: any
}

export type ProfileProps = IProfileStateToProps & IProfileDispatchToProps & IProfileProps;

class Profile extends React.Component<ProfileProps> {
    state: IProfileState = {
        userLikes: 0,
        posts: 0,
        editing: false,
        fields: {
            picture: this.props.user.picture,
            username: this.props.user.username,
            biography: this.props.user.biography
        }
    }

    posts = this.props.user?.post?.forEach(post => this.state.posts += 1);
    likes = this.props.user?.post?.forEach(post => this.state.userLikes += post.likes);
    following = this.props?.user?.followed?.map((id) => id.followedId)
        .find((id) => id === this.props.user.id);

    saveName = username => this.setState({ fields: { ...this.state.fields, username } })
    saveBio = biography => this.setState({ fields: { ...this.state.fields, biography } });
    savePic = picture => this.setState({ fields: { ...this.state.fields, picture } });

    handleUpload = (files) => {
        let binaryData = [];
        binaryData.push(files);
        const file = window.URL.createObjectURL(new Blob(binaryData, { type: "application/zip" }))

        this.savePic(file);
    }


    handleEditing = async () => {
        const { authorities, ...rest } = this.props.user;

        const data = {
            ...rest,
            ...this.state.fields,
        };

        this.setState({ editing: !this.state.editing })

        if (this.state.editing) {
            const edited = await share(data);
            this.props.profiles(edited.data);
        }

    }


    follow = async () => {
        const { authorities, ...rest } = this.props.user
        const data = {
            ...rest,
            followed: [
                ...this.props.user.followed,
                { followedId: this.props.foundUser.id }
            ]
        };

        const updatedProfile = share(data);

        this.props.profiles(updatedProfile.data);
    }


    render(): JSX.Element {
        const { picture, username, biography, post } = this.props.user;

        return (
            <Grid
                container
                spacing={3}
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ marginLeft: '3%' }}
            >
                <Grid item sx={8} >
                    <CardHeader
                        avatar={
                            <HeaderEditor>
                                <EasyEdit
                                    allowEdit={false}
                                    type={Types.FILE}
                                    value={picture || 'Upload a picture'}
                                    onSave={this.handleUpload}
                                    editMode={this.state.editing}
                                    saveButtonLabel={<CloudSyncTwoToneIcon fontSize="small" />}
                                    attributes={{ name: "picture" }}
                                    hideCancelButton
                                    displayComponent={
                                        <Avatar
                                            alt={username}
                                            src={this.state.fields.picture}
                                            sx={{ width: 204, height: 204 }}
                                        />}
                                    editComponent={
                                        <MyDropzone
                                            handleUpload={this.handleUpload}
                                            children={
                                                <InputField
                                                    row={profileFields}
                                                    image={this.state.fields.picture}
                                                />
                                            }
                                        />
                                    }
                                />
                            </HeaderEditor>
                        }
                        action={
                            <IconButton aria-label="settings">
                                <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title={this.state.editing ? "Save Edit" : "Edit Profile"} placement="right">
                                    {this.state.editing ?
                                        <SaveAsTwoToneIcon onClick={this.handleEditing} /> :
                                        <SettingsTwoToneIcon onClick={this.handleEditing} />
                                    }
                                </Tooltip>
                            </IconButton>
                        }
                        title={
                            <Typography
                                sx={{
                                    fontWeight: 'bold',
                                    color: '#3C414270'
                                }}
                                variant='h3'
                            >
                                <HeaderEditor>
                                    <EasyEdit
                                        allowEdit={false}
                                        type={Types.TEXT}
                                        placeholder={username || 'Choose a username'}
                                        onSave={this.saveName}
                                        editMode={this.state.editing}
                                        saveButtonLabel={<CloudSyncTwoToneIcon fontSize="small" />}
                                        attributes={{ name: "username" }}
                                        hideCancelButton
                                    />
                                </HeaderEditor>
                            </Typography>
                        }
                        subheader={
                            <Typography variant='button'>
                                {`${this.state.posts} posts ${this.state.userLikes} likes`} <br />
                                <Typography variant="body1" color="text.secondary">
                                    <BodyEditor>
                                        <EasyEdit
                                            allowEdit={false}
                                            type={Types.TEXT}
                                            placeholder={biography || 'Add a Bio'}
                                            onSave={this.saveBio}
                                            editMode={this.state.editing}
                                            saveButtonLabel={<CloudSyncTwoToneIcon fontSize="small" />}
                                            attributes={{ name: "biography" }}
                                            hideCancelButton
                                        />
                                    </BodyEditor>
                                    <Submit label="Follow" func={this.follow} disabledButton={!this.following} />
                                </Typography>
                            </Typography>
                        }
                    />
                </Grid>
                <Grid item xs={8}>
                    <Seperate />
                    {post?.length ?
                        <ImageList sx={{ width: 1000, height: 500, marginTop: '32px', overflowY: 'inherit', }} cols={3} rowHeight={395}>
                            {post.map((posts) => (
                                <Link id='profile-post-link' to={`/user/${posts.id}`}>
                                    <ImageListItem key={posts.picture}>
                                        <img
                                            src={`${posts.picture}?w=500&h=500&fit=crop&auto=format`}
                                            srcSet={`${posts.picture}?w=500&h=5000&fit=crop&auto=format&dpr=2 2x`}
                                            alt={posts.caption}
                                            loading="lazy"
                                        />
                                    </ImageListItem>
                                </Link>
                            ))}
                        </ImageList> :
                        (
                            <NoActivity
                                icon={<NoPhotographyTwoToneIcon fontSize="large" />}
                                title={UserActionTypes.SHARE_PHOTOS}
                                description={UserActionTypes.SHARE_MESSAGE}
                                link={UserActionTypes.SHARE_LINK}
                                path={UserActionTypes.SHARE_PATH}
                            />
                        )
                    }
                </Grid>
            </Grid >
        )
    }
}

export default Profile;