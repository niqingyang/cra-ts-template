import {DropDownProps} from 'antd/es/dropdown';
import {Dropdown} from 'antd';
import React from 'react';
import classNames from 'classnames';
import styles from './index.less';

type OverlayFunc = () => React.ReactElement;

export interface HeaderDropdownProps extends DropDownProps {
    overlayClassName?: string;
    overlay: React.ReactElement | OverlayFunc;
    placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight' | 'bottomCenter';
}

const HeaderDropdown: React.FC<HeaderDropdownProps> = ({overlayClassName: cls, ...restProps}) => (
    <Dropdown overlayClassName={classNames(styles.container, cls)} {...restProps} />
);

export default HeaderDropdown;
