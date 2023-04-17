import GoogleLogin from 'react-google-login';
import GoogleLogout from 'react-google-login';

const clientId = '742227891217-44e1lhaikhg2u3a4kjeeahroq8938ct2.apps.googleusercontent.com';

export const LoginWithSocialMidia = () => {

    const onSuccess = (response) => {
        console.log(response);
    };

    const onFailure = (response) => {
        console.log(response);
    };

    const logout = () => {
        console.log('Usuário deslogado!');
    };


    return (
        <>
            <div id="buttonDiv">
                <>
                    <GoogleLogin
                        clientId={clientId}
                        buttonText="Faça login com o Google"
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        cookiePolicy={'single_host_origin'}
                    />
                    <GoogleLogout
                        clientId={clientId}
                        buttonText="Logout"
                        onLogoutSuccess={logout}
                    />
                </>
            </div>
        </>
    )
}