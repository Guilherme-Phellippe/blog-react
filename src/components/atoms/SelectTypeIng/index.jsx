export default function SelectTypeIng({ disabledMain, register, index, table }) {
    return (
        <select
            id="ingredients-type"
            className="cursor-pointer p-4 text-s1_2 text-center text-color_text_black rounded-xl mx-4"
            {...register(`${table}.${index}.type`)}
        >
            {
                !disabledMain &&
                <option value="Principal">Principal</option>
            }

            <option value="Acompanhamento">Acompanhamento</option>
            <option value="Cobertura">Cobertura</option>
            <option value="Montagem">Montagem</option>
            <option value="Recheio">Recheio</option>
            <option value="Calda">Calda</option>
            <option value="Molho">Molho</option>
            <option value="Creme">Creme</option>
        </select>
    )
}