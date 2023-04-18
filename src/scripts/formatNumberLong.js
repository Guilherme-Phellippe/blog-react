export function formatNumberLong(nmr) {

    if (typeof nmr === 'number') {
        const convertNumber = nmr.toString();
        if (convertNumber.length >= 4) {
            if(convertNumber.length >= 7){
                const formatNumber = convertNumber.replace(convertNumber.substring((convertNumber.length-6), convertNumber.length), '')
                return `+${formatNumber}milhões`
            }else{
                const formatNumber = convertNumber.replace(convertNumber.substring((convertNumber.length-3), convertNumber.length), '')
                return `+${formatNumber}mil`
            }
        } else return nmr
    } else throw new Error("A variavél não é do tipo number")

}