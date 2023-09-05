import { useEffect, useState } from "react";

const VacanciesFilled = () => {
    const [vacanciesFilled, setVacanciesFilled] = useState(createArray());

    function createArray() {
        const localStorageVacancies = localStorage.getItem("numberPeopleBuyTheCourse") || 76;
        const newArray = []
        for (let index = 1; index <= 100; index++) {
            index <= localStorageVacancies ?
                newArray.push({ index, isEmpty: true })
                :
                newArray.push({ index, isEmpty: false })
        }
        return newArray
    }

    useEffect(() => {
        const interval = setInterval(() => {
            const filteredFilledVacancies = vacanciesFilled.filter(v => v.isEmpty);
            const lastVacancyFilled = filteredFilledVacancies[filteredFilledVacancies.length - 1]
            if (lastVacancyFilled.index <= 98) {
                var randomNumber = 1
                if (lastVacancyFilled.index < 97) randomNumber = Math.floor(Math.random() * 4)
                handleNewVacancies(randomNumber);
            } else clearInterval(interval)
        }, 3000);
        return () => clearInterval(interval)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vacanciesFilled])


    const handleNewVacancies = (count) => {
        for (let n = 1; n < count; n++) {
            const findFirstVacanciesEmpty = vacanciesFilled.find(vacancy => !vacancy.isEmpty)
            if (findFirstVacanciesEmpty) {
                findFirstVacanciesEmpty.isEmpty = true;
                setVacanciesFilled(v => [...v])
            }
        }
    }

    return (
        <div className="w-[380px] md:w-[400px] max-w-[80%] flex justify-center flex-wrap gap-2">
            {
                vacanciesFilled.map(vancancy => {
                    const { index } = vancancy
                    return vancancy.isEmpty ?
                        <div key={index} className="w-1/12 flex justify-center items-center bg-green-500 border-[1px] border-green-500">
                            <p>{index <= 9 ? "0" + index : index}</p>
                        </div>
                        :
                        <div key={index} className="w-1/12 flex justify-center items-center bg-zinc-300 border-[1px] border-zinc-400">
                            <p className="opacity-50">{index}</p>
                        </div>
                })
            }
            <h3 className="text-s1_5 my-4">Vagas restantes: <span className="text-s1_7 font-bold text-red-600">{100 - vacanciesFilled.filter(v => v.isEmpty).length}</span></h3>
        </div>
    )
}

export default VacanciesFilled