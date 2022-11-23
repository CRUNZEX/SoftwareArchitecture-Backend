export const globalConfig = {
    api: (route?: string) => {
        const routeApi = '/api';
        return `${routeApi}/${route}`;
    },
    middleware: (route?: string) => {
        const routeApi = 'api';
        return `${routeApi}/${route}*`;
    },
};
