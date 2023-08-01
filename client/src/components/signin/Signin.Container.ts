import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userHasAccount } from '../../redux/actions/UserActions.ts';
import Signin from './Signin.tsx';
import { ISigninDispatchToProps, ISigninStateToProps } from '../../types/user.ts';


/**
 * Used to access application state
 * @function mapStateToprops
 * @param state Close State
 * @returns 
 */
const mapStateToprops = (state: any): ISigninStateToProps => ({
    hasAccount: state.UserState.hasAccount,
});

/**
 * dispatches actions to redux store
 * @function mapDispatchToProps
 * @param dispatch 
 * @returns 
 */
const mapDispatchToProps = (dispatch: any): ISigninDispatchToProps => ({
    userHasAccount: bindActionCreators(userHasAccount, dispatch),
});

export const SigninContainer = connect(
    mapStateToprops,
    mapDispatchToProps,
)(Signin)