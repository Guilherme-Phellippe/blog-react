import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Footer } from "../../components/templates/Footer/Footer"
import { Header } from "../../components/templates/Header/Header"
import { Signin } from "../../components/templates/Signin";
import { Singup } from "../../components/templates/Signup";
import { HomeProvider } from "../../contexts/Home/HomeProvider"

export const Login = () => {
    const { pathname } = useLocation();
    const [isLogin, setIsLogin] = useState(pathname.includes("login"))


    return (
        <div className="container">
            <HomeProvider>
                <Header />
                <div className="w-full p-16">
                    <div className="w-full h-72 bg-white mb-12">
                        ads here.
                    </div>
                    {isLogin ? <Signin setIsLogin={setIsLogin} /> : <Singup />}
                </div>
                <Footer />
            </HomeProvider>
        </div>
    )
}