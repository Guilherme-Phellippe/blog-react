export function formatTextLong(text, size){
    var formatText = text

    if(text.length >= size){
        formatText = text.slice(0, size).concat('...')
    }

    return formatText
}