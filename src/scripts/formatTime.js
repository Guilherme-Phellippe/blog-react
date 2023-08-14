export default function timer(date = new Date()) {
    const dateNow = new Date();
    const userDate = new Date(date)

    function formatTimeAgo() {
        const diff = Math.floor(((dateNow - userDate) / 1000));
        if (diff < 60) return "Agora mesmo";
        else if (diff < 60 && diff < 120) return "Há alguns segundos atrás"
        else if (diff > 120 && diff < 3600) {
            const diffMinutes = Math.floor(diff / 60);
            console.log(diffMinutes, "----")
            return `Há ${diffMinutes} minutos atrás`
        }
        else if (diff > 3600 && diff < (3600 * 24)) {
            const diffInHours = Math.floor(diff / 3600);
            return `há ${diffInHours} hora${diffInHours !== 1 ? 's' : ''} atrás`;
        }
        else if (diff > (3600 * 24) && diff < (3600 * 24 * 30)) {
            const diffInDays = Math.floor((diff / 3600) / 24);
            return `há ${diffInDays} dia${diffInDays !== 1 ? 's' : ''} atrás`;
        }
        else if (diff > (3600 * 24 * 30)) {
            const diffInMonth = Math.floor((diff / 3600) / 24 / 30);
            return `há ${diffInMonth} mes${diffInMonth !== 1 ? 'es' : ''} atrás`;
        }
        else if (diff > (3600 * 24 * 30 * 12)) {
            const diffInMonth = Math.floor((diff / 3600) / 24 / 30);
            return `há ${diffInMonth} mes${diffInMonth !== 1 ? 'es' : ''} atrás`;
        }

    }

    function isSameMonth() {
        return dateNow.getMonth() === userDate.getMonth();
    }

    function format(type) {
        const minutes = userDate.getMinutes();
        const hours = userDate.getHours();
        const day = userDate.getDay();
        const dayOfYear = Math.floor(date - new Date(userDate.getFullYear(), 0, 0) / (24 * 60 * 60 * 1000))
        const month = userDate.getMonth();
        const year = userDate.getFullYear();


        switch (type) {
            case "dd/mm/yyyy": return `${day}/${month}/${year}`
            case "full": return `${year}${dayOfYear}${hours}${minutes}`;
            default: return userDate.getDate();
        }
    }

    function diff(currentDiff) {
        const d1 = new Date(currentDiff)
        return Math.floor((d1 - dateNow) / 1000)
    }

    function dayOfYear() {
        let diffInMillis = date - new Date(userDate.getFullYear(), 0, 0)
        let dayOfYear = Math.floor(diffInMillis / (24 * 60 * 60 * 1000))
        return dayOfYear
    }



    return {
        formatTimeAgo,
        isSameMonth,
        format,
        diff,
        dayOfYear
    }

}