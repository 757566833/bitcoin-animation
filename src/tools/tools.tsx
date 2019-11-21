export const getPoolList = (poolCoordinate: { [key: string]: [number, number] }) => {
    const poolList: {
        name: string,
        value: [number, number]
    }[] = []
    for (const key in poolCoordinate) {
        if (poolCoordinate.hasOwnProperty(key)) {
            const element = poolCoordinate[key];
            poolList.push({
                name: key,
                value: element
            })
        }
    }
    return poolList
};
