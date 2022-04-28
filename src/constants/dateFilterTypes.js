const dateFilterTypes = {
    TODAY: 1,
    YESTERDAY: 2,
    DATE: 3,
    INTERVAL: 4,

    getTitle: (filterType) => {
        switch (filterType) {
            case dateFilterTypes.TODAY:
                return "На сегодня";
            case dateFilterTypes.YESTERDAY:
                return "За вчера";
            case dateFilterTypes.DATE:
                return "На дату";
            case dateFilterTypes.INTERVAL:
                return "За период";
            default:
                console.error(`Unexpected title mode "${filterType}"`);
        }
    }
};


export default dateFilterTypes;