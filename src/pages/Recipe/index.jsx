import {  useContext, useEffect } from 'react';
import { UserContext } from '../../contexts/userProvider';
import { HomeProvider } from '../../contexts/Home/HomeProvider';
import { initOneSignal } from '../../libs/oneSignal.config';

import Footer from "../../components/templates/Footer/Footer"
import Header from "../../components/templates/Header/Header";
import RecipeMain from '../../components/templates/RecipeMain';

// const LoginWithSocialMidiaModal = lazy(() => import('../../modals/LoginWithSocialMidiaModal'));

export default function Recipe() {
    const { user } = useContext(UserContext)

    useEffect(() => {
        if (window.location.hostname !== 'localhost') {
            // Loading the oneSignal config
            initOneSignal();
        }
    }, []);


    return (
        <HomeProvider>
            <Header user={user} />
            <RecipeMain user={user} />
            <Footer />

            {/* MODAL LOGIN WITH SOCIAL MIDIA  */}
            {/* <LoginWithSocialMidiaModal /> */}
        </HomeProvider>
    )
}
