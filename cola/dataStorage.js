export const DataStorage = (() => {
    let data = {};

    return {
        setData(key, value) {
            data[key] = value;
        },
        getData(key) {
            return data[key];
        },
        deleteData(key) {
            delete data[key];
        },
        getAllData() {
            return { ...data };
        }
    };
})();