import { AlarmApiError } from '../../api';
import { AlarmWSProps } from './AlarmWS';
declare const _default: import('vue').DefineComponent<AlarmWSProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    onMessage: (value: import('./AlarmWS').AlarmWSMessage) => any;
    onApiError: (value: AlarmApiError) => any;
}, string, import('vue').PublicProps, Readonly<AlarmWSProps> & Readonly<{
    onOnMessage?: ((value: import('./AlarmWS').AlarmWSMessage) => any) | undefined;
    onOnApiError?: ((value: AlarmApiError) => any) | undefined;
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
