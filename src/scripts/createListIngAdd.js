export const createListIngAdd = (typeTable, list) => {
    const filter = [];

    if(list.length !== typeTable.length) return [{name:typeTable[0], count: 1, ing: list}]

    for (let i = 0; i < typeTable.length; i++) {
        const type = typeTable[i];

        if (filter.find(items => items.name === type)) {
            filter.find(items => items.name === type).count++
            filter.find(items => items.name === type).ing.push(list[i])
        } else {
            filter.push({
                name: type,
                count: 1,
                ing: [list[i]]
            })
        }

    }

    return filter
}