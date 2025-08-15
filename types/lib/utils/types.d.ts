export interface MenuItem {
    id: string | number;
    name: string;
    imgUrl: string;
    imgUrlS: string;
    badge?: boolean;
    isShow?: number;
}
export interface UserConfig {
    system: {
        perm: boolean;
        url: string;
        btn: boolean;
        paramList: any[];
    };
    live: {
        perm: boolean;
    };
    pic: {
        perm: boolean;
    };
    record: {
        perm: boolean;
    };
    fallback: {
        perm: boolean;
    };
    audio: {
        perm: boolean;
    };
}
