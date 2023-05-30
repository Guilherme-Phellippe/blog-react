import { useEffect } from "react";

export const IngredientsList = ({ ing: ingredients, stuffing_ing }) => {

    useEffect(() => {
        // GOOGLE ADSENSE 
        window.location.hostname !== 'localhost' &&
            (window.adsbygoogle = window.adsbygoogle || []).push({});
    }, [])

    return (
        <div className="w-full h-auto flex flex-col items-center p-4 mt-8">

            <div className="overflow-hidden mt-2">
                <ins className="adsbygoogle"
                    style={{ display: 'block' }}
                    data-ad-client="ca-pub-4781060024956035"
                    data-ad-slot="9346456414"
                    data-ad-format="auto"
                    data-full-width-responsive="true"
                ></ins>
            </div>

            <h2 className='text-s2 text-color_orange text-center font-bold my-4 bg-color_orange/20 w-full p-4'>INGREDIENTES</h2>
            <ul className='w-full p-4 flex flex-col'>
                {ingredients.length ?
                    ingredients.map((ing, index) => <li className="list-disc text-s1_7 m-2" key={index}>{ing}</li>)
                    :
                    <p className="list-disc text-s1_5 m-8" >essa receita não tem ingredientes...</p>
                }
            </ul>
            {
                !!stuffing_ing.length &&
                <>
                    <h2 className='text-s2 text-color_orange text-center font-bold my-4 bg-color_orange/20 w-full p-4'>RECHEIO</h2>
                    <ul className='w-full p-4 flex flex-col'>
                        {
                            stuffing_ing.map((ing, index) => <li className="list-disc text-s1_7 m-2" key={index}>{ing}</li>)
                        }
                    </ul>
                </>
            }

        </div>
    )
}