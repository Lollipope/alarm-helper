import { default as AlarmMenuItem } from './AlarmMenuItem.vue';
import { MenuItem } from '../../utils/types';
export interface AlarmMenuItemProps {
    item: MenuItem;
    idSelect: string | number;
}
export type AlarmMenuItemEmits = {};
export type AlarmMenuItemInstance = InstanceType<typeof AlarmMenuItem>;
