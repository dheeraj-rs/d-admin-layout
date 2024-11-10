export interface TreeNode {
    key?: string;
    label?: string;
    data?: any;
    icon?: string;
    children?: TreeNode[];
    leaf?: boolean;
    loading?: boolean;
    selectable?: boolean;
    expanded?: boolean;
    style?: object;
    className?: string;
    draggable?: boolean;
    droppable?: boolean;
    type?: string;
}
