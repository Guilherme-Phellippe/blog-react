import { useParams } from 'react-router-dom';
import { recipes } from '../../scripts/api/simulation'

import { HomeProvider } from '../../contexts/Home/HomeProvider'
import { Footer } from "../../components/templates/Footer/Footer"
import { Header } from "../../components/templates/Header/Header"

import { FaSave, FaCamera, FaTiktok, FaFacebook, FaInstagram, FaHeart } from 'react-icons/fa';
import { BiChat, BiDish, BiHeart, BiHourglass } from 'react-icons/bi';

export const Recipe = () => {
    const { id } = useParams();

    const {
        name_recipe,
        nmr_hearts,
        img,
        author,
        createdAt
    } = recipes.find(recipe => recipe.id === Number(id))

    return (
        <div className="container">
            <HomeProvider>
                <Header />
                <main className='flex flex-col w-5/6 mt-8 mx-auto bg-white'>
                    <div className="w-1/12 fixed left-0 flex flex-col items-center">
                        <FaSave className='mt-4 text-s3 cursor-pointer' />
                        <FaCamera className='mt-4 text-s3 cursor-pointer' />
                        <FaTiktok className='mt-4 text-s3 cursor-pointer' />
                        <FaFacebook className='mt-4 text-s3 cursor-pointer' />
                        <FaInstagram className='mt-4 text-s3 cursor-pointer' />
                    </div>
                    <div className="w-2/3 p-4">
                        <div className='flex justify-between'>
                            <h1 className='w-1/2 text-s1_5 text-color_primary font-bold'>{name_recipe.toUpperCase()}</h1>
                            <div className="w-1/2 flex justify-center items-center">
                                <FaHeart className='fill-red-700 translate-x-8 text-s1_5' />
                                <FaHeart className='fill-red-700 translate-x-4 text-s1_5' />
                                <FaHeart className='fill-red-700 text-s1_5' />
                                <p className='ml-1 text-s1_2'>{nmr_hearts} pessoas amaram essa receita</p>
                            </div>
                        </div>
                        <div className="w-full h-110 mt-4 mx-auto rounded-3xl overflow-hidden">
                            <img className='w-full h-full object-cover' src={img} alt={name_recipe} />
                        </div>
                        <div className="flex w-full h-52 mt-8 bg-background relative rounded-t-3xl border-b-2 border-solid border-color_second">
                            <div className='w-1/4 h-full flex flex-col justify-center items-center relative after:absolute after:right-0 after:w-px after:h-1/2 after:mt-1/4 after:opacity-10 after:bg-black'>
                                <BiHourglass className='text-s3 text-color_primary' />
                                <h3>PREPARO</h3>
                                <h2 className='text-s2 text-color_primary'>10 min</h2>
                            </div>
                            <div className='w-1/4 h-full flex flex-col justify-center items-center relative after:absolute after:right-0 after:w-px after:h-1/2 after:mt-1/4 after:opacity-10 after:bg-black'>
                                <BiDish className='text-s3 text-color_primary' />
                                <h3>RENDIMENTO</h3>
                                <h2 className='text-s2 text-color_primary'>4 porções</h2>
                            </div>
                            <div className='w-1/4 h-full flex flex-col justify-center items-center relative after:absolute after:right-0 after:w-px after:h-1/2 after:mt-1/4 after:opacity-10 after:bg-black'>
                                <BiHeart className='text-s3 text-color_primary' />
                                <h3>FAVORITOS</h3>
                                <h2 className='text-s2 text-color_primary'>345</h2>
                            </div>
                            <div className='w-1/4 h-full flex flex-col justify-center items-center'>
                                <BiChat className='text-s3 text-color_primary' />
                                <h3>COMENTÁRIOS</h3>
                                <h2 className='text-s2 text-color_primary'>12</h2>
                            </div>
                        </div>
                        <div className="w-full h-64 bg-background rounded-b-3xl flex flex-col justify-center align-center">
                            <h2 className='w-full flex justify-center items-center text-s1_5 h-1/4'>INFORMAÇÕES DO CHEF</h2>
                            <div className='w-full h-3/4 flex justify-center align-center p-2'>
                                <img src="https://www.procurandocraques.com/static/img/admin/user-profile.png" alt={`imagem do chef chamado ${author}`} />
                                <div className='flex flex-col px-4'>
                                    <h2>{` ${author}`}</h2>
                                    <h3>{`membro desde: ${new Date(createdAt).toLocaleDateString('pt-BR')}`}</h3>
                                    <h3>{`receitas publicadas: 8`}</h3>
                                    <h3>{`Total de 'amei': 345`}</h3>
                                    <h3>{`Prêmios receita do mês: 2`}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </HomeProvider>
        </div>
    )
}