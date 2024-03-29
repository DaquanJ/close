import * as React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { IconButton, Typography, Tooltip } from '@mui/material';
import Grid from '@mui/material/Grid';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonSearchTwoToneIcon from '@mui/icons-material/PersonSearchTwoTone';
import AddAPhotoTwoToneIcon from '@mui/icons-material/AddAPhotoTwoTone';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import SettingsSuggestTwoToneIcon from '@mui/icons-material/SettingsSuggestTwoTone';
import Fade from '@mui/material/Fade';
import { StyledTip, IconLink, NavWrapper, CustomAvatar, MoreWrapper } from './Navigation.Styles.ts';
import { Find } from '../index.ts';
import { Pop } from '../../common/components/popover/Pop.tsx';
import { Confirm } from '../../common/components/buttons/Confirm.tsx';
import withRouter from '../../common/hooks/WithRouter.tsx';
import { find, profilePicUrl } from '../../common/api/user/Users.Api.ts';



interface IPages {
    home: boolean,
    find: boolean,
    share: boolean,
    profile: boolean,
}
interface INavigationProps {
    user: any //TODO: make IUser
}

interface INavigationState {
    profileIcon: string;
    pages: IPages;
}

export type NavProps = INavStateToProps & INavDispatchToProps & INavProps;


class Navigation extends React.Component<NavProps> {
    state: INavigationState = {
        pages: {},
    }


    onNavSelect = (page, open) => {
        const newState = {};
        newState[page] = open;
        this.setState({ pages: newState })
    }

    closeFind = (page, open) => {
        this.onNavSelect(page, open);
        if (this.props.isFindOpen) this.props.openFind(false)
    }

    onLogout = () => {
        this.props.logout();
        this.props.navigate('/');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        if (this.props.isFindOpen) this.props.openFind(false)
    }

    render(): JSX.Element {
        return (
            <NavWrapper
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="start"
            >
                <StyledTip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Home" placement="right">
                    <Link style={{ color: this.state.pages.home ? '#228B22' : '#3C4142' }} to='/home' id='home' >
                        <HomeTwoToneIcon
                            onClick={() => this.closeFind('home', true)}
                            fontSize="large"
                        />
                    </Link>
                </StyledTip>
                <StyledTip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Find" placement="right">
                    <IconLink
                        style={{
                            color: this.props.isFindOpen &&
                                this.state.pages.find ? '#228B22' : '#3C4142'
                        }}
                        onClick={() => {
                            this.props.openFind(!this.props.isFindOpen)
                            this.onNavSelect('find', !this.state.pages.find)
                        }}
                        fontSize="large"
                    />
                </StyledTip>
                <StyledTip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Share" placement="right">
                    <Link style={{ color: this.state.pages.share ? '#228B22' : '#3C4142' }}
                        to='/share'
                        id='share'
                    >
                        <AddAPhotoTwoToneIcon
                            onClick={() => this.closeFind('share', true)}
                            fontSize="large"
                        />
                    </Link>
                </StyledTip>
                <StyledTip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Profile" placement="right">
                    <Link to={`/profile/${this.props.user.id}`} id='profile' >
                        <CustomAvatar
                            onClick={() => this.closeFind('profile', true)}
                            page={this.state.pages.profile}
                            alt={this.props.user.username}
                            src={profilePicUrl(this.props?.user?.id)}
                        />
                    </Link>
                </StyledTip>
                {
                    this.props.token && (
                        <MoreWrapper>
                            <Pop
                                tip="More"
                                label={<SettingsSuggestTwoToneIcon fontSize="large" />}
                                children={
                                    <Tooltip
                                        TransitionComponent={Fade}
                                        TransitionProps={{ timeout: 600 }}
                                        title="Logout"
                                        placement="right"
                                    >
                                        <IconButton onClick={this.onLogout}>
                                            <LogoutTwoToneIcon />
                                        </IconButton>
                                    </Tooltip>
                                }
                            />
                        </MoreWrapper>
                    )
                }
            </NavWrapper>
        );
    }
}

export default withRouter(Navigation);