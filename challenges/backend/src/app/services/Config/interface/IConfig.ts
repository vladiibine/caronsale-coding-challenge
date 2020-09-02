export interface IConfig {
    getOption(option: ConfigOption): string;
}

export enum ConfigOption {
    USER_EMAIL_ID,
    PASSWORD,
    API_BASE_URL,
    API_BUYER_AUCTIONS,
    API_AUTHENTICATION_ENDPOINT,
}