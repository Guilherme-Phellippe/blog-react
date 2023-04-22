import { useContext, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"


import { useCategoryApi } from "../../../hooks/useApi"

import { MdImage, MdImportContacts, MdList } from "react-icons/md"

import { StepOneCreateRecipe } from "../../organisms/StepOneCreateRecipe"
import { StepThreeCreateRecipe } from "../../organisms/StepThreeCreateRecipe"
import { StepTwoCreateRecipe } from "../../organisms/StepTwoCreateRecipe";
import { HomeContext } from "../../../contexts/Home/HomeProvider"
import { DialogAlert } from "../../../modals/DialogAlert"



export const MainCreateRecipe = () => {
    const { user } = useContext(HomeContext);
    const refUser = useRef(user)
    const categoryApiRef = useRef(useCategoryApi())
    const [categories, setCategories] = useState([])
    const [step, setStep] = useState(1)
    const [images, setImages] = useState([])
    const [openModalAlert, setModalAlert] = useState(false);
    const [containerAlert, setContainerAlert] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if (refUser.current) {
            (async () => {
                const categories = await categoryApiRef.current.getAllCategory();
                if (categories) setCategories(categories.data)
                else navigate('/');
            })();
        } else {
            setContainerAlert({
                function: setModalAlert(true),
                type: 1,
                message: "Você precisa criar uma conta antes de publicar um receita!",
                eventClose: () => navigate('/register')
            })

        }
    }, [navigate]);


    return (
        <main className="w-full max-w-[1500px] mx-auto">
            <div className="w-[95%] md:w-10/12 bg-white mx-auto flex flex-col items-center p-4 md:p-16">

                <h2 className="text-s2 md:text-s2_5 text-center pb-4 md:pb-8 font-semibold text-color_orange">Vamos criar uma receita?</h2>

                <div className="w-full flex justify-center gap-12 my-8">
                    <span className={`py-3 z-10 px-4 border-[1px] border-solid border-color_orange rounded-full relative ${step >= 1 && "bg-color_orange text-white "}`}>
                        <MdImportContacts className="text-s1_5 z-10" />
                        <span className="absolute -z-0 left-full top-1/2 w-full h-[1px] bg-black opacity-30"></span>
                    </span>
                    <span className={`py-3 z-10 px-4 border-[1px] border-solid border-color_orange rounded-full relative ${step >= 2 ? "bg-color_orange text-white" : "bg-white"}`}>
                        <MdList className="text-s1_5 " />
                        <span className="absolute -z-0 left-full top-1/2 w-full h-[1px] bg-black opacity-30"></span>
                    </span>
                    <span className={`py-3 z-10 px-4 border-[1px] border-solid border-color_orange rounded-full ${step >= 3 ? "bg-color_orange text-white" : "bg-white"}`}>
                        <MdImage className="text-s1_5 " />
                    </span>
                </div>
                <div className="flex w-full">
                    {
                        step === 1 ?
                            <StepOneCreateRecipe
                                user={user}
                                setStep={setStep}
                                categories={categories}
                            />
                            : step === 2 ?
                                <StepTwoCreateRecipe
                                    setStep={setStep}
                                />
                                :
                                <StepThreeCreateRecipe
                                    setStep={setStep}
                                    images={images}
                                    setImages={setImages}
                                />
                    }
                </div>

            </div>



            {
                openModalAlert && <DialogAlert
                    open={{ openModalAlert, setModalAlert }}
                    container={containerAlert}
                />
            }
        </main>
    )
}