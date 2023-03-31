export const IngredientsList = ({ ing: ingredients }) => {
    return (
        <div className="w-full h-auto flex flex-col items-center p-4 mt-8">
            <h2 className='text-s2 text-color_primary font-bold my-4'>INGREDIENTES</h2>
            <ul className='w-full p-4 flex flex-col'>
                {ingredients.length ?
                    ingredients.map((ing, index) => <li className="list-disc text-s1_5 m-2" key={index}>{ing}</li>)
                    :
                    <p className="list-disc text-s1_5 m-8" >essa receita não tem ingredientes...</p>
                }
            </ul>
        </div>
    )
}