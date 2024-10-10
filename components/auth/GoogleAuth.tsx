import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-google-signin/google-signin';
import {supabase} from '../../utils/supabase';
import React from 'react';

interface GoogleAuthProps {
    saveAccessToken: (accessToken: string, expiresAt: number) => void;
    saveRefreshToken: (refreshToken: string) => void;
    setUser: (user: User) => void;
  }

const GoogleAuth: React.FC<GoogleAuthProps> = ({ saveAccessToken, saveRefreshToken, setUser }) => {

    GoogleSignin.configure({
        webClientId: '158741630717-2utkk8ue1hfn18v9q4kioo9q8id942jv.apps.googleusercontent.com',
    });

    return (
        <GoogleSigninButton
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Light}
                style={{width: "100%", height: 60}}
                onPress={async () => {
                    try {
                        await GoogleSignin.hasPlayServices();
                        const userInfo = await GoogleSignin.signIn();
                        if (userInfo.idToken) {
                          const {data, error} = await supabase.auth.signInWithIdToken({
                            provider: 'google',
                            token: userInfo.idToken,
                          });
                          if (data.user) {
                            setUser({
                              id: data.user.id || "",
                              email: data.user?.email || ""
                            })
                          }
                        }
                        else {
                          throw new Error("No idToken found");
                        }
                    } catch (error: any) {
                        if (error) {
                            console.debug(error.code);
                            switch (error.code) {
                              case statusCodes.SIGN_IN_CANCELLED:
                                break;
                              case statusCodes.IN_PROGRESS:
                                break;
                              case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                                break;
                              default:
                              // some other error happened
                            }
                          } else {
                            // an error that's not related to google sign in occurred
                          }
                    }
                }}
                />
    );
}

export default GoogleAuth;