import { createListIngAdd } from "../../../scripts/createListIngAdd";
import { formatTextLong } from "../../../scripts/formatTextLong";

export default function IngredientsList({ ing: ingredients, stuffing_ing, type_stuffing_ing }) {

    return (
        <div className="w-full h-auto flex flex-col items-center p-4 mt-8">

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
                createListIngAdd(type_stuffing_ing, stuffing_ing).map((item) =>
                    <div key={item.name} className="w-full flex flex-col justify-center items-start">
                        <h3 className="text-color_orange bg-color_orange/20 p-2 rounded-xl text-s1_7 font-bold">{item.name}:</h3>
                        <ul className='w-full p-4 flex flex-col'>
                            {
                                item.ing.map(i =>
                                    <li key={i} className="list-disc text-s1_7 m-2">{i}</li>
                                )
                            }
                        </ul>
                    </div>
                )
            }

        </div>
    )
}
