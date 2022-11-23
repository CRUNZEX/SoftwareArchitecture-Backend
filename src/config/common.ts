export const common = {
    dateNow: (): string => {
        const date = new Date(Date.now());
        return date.toISOString().toString();
    },
};
