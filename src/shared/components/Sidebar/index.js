import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { ContainerSider, MenuCustom, SiderCustom, IconSider } from './styles';

const DotSubItem = () => (
  <span>
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
      <circle cx="4" cy="4" r="4" fill="#868E96" />
    </svg>
  </span>
);

const getItem = (label, key, icon, children, type) => {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
};

const Sidebar = ({
  isExpand,
  minWidth,
  maxWidth,
  permissionArray,
  dataMenu,
  onClickMenu,
  pathname,
}) => {
  const [items, setItems] = useState([]);
  const [collapsedWidth, setCollapsedWidth] = useState(minWidth);
  const [expand, setExpand] = useState(isExpand);

  useEffect(() => {
    if (permissionArray !== undefined) {
      setItems(() => {
        return _.flatMap(dataMenu, (itemMenu) => {
          if (itemMenu.child) {
            if (permissionArray.includes(itemMenu.key)) {
              return getItem(
                itemMenu.label,
                itemMenu.key,
                <IconSider src={itemMenu.icon} />,
                _.flatMap(itemMenu.child, (subItem) => {
                  return permissionArray.includes(subItem.key)
                    ? getItem(subItem.label, subItem.key, <DotSubItem />)
                    : null;
                }),
              );
            } else {
              return null;
            }
          } else {
            return permissionArray.includes(itemMenu.key)
              ? getItem(
                  itemMenu.label,
                  itemMenu.key,
                  <IconSider src={itemMenu.icon} />,
                )
              : null;
          }
        });
      });
    } else {
      setItems(() => {
        return _.flatMap(dataMenu, (itemMenu) => {
          return getItem(
            itemMenu.label,
            itemMenu.key,
            <IconSider src={itemMenu.icon} />,
          );
        });
      });
    }
  }, [dataMenu, permissionArray]);

  useEffect(() => {
    setCollapsedWidth(isExpand ? maxWidth : minWidth);
    setExpand(isExpand);
  }, [isExpand, maxWidth, minWidth]);

  const getSelectedKeys = () => {
    if (pathname !== undefined) {
      if (_.filter(dataMenu, (i) => i.path === pathname).length !== 0) {
        return _.filter(dataMenu, (i) => i.path === pathname)[0].key;
      }
      const menuHaveChilds = _.filter(dataMenu, (i) => i.child !== undefined);
      if (menuHaveChilds.length !== 0) {
        // eslint-disable-next-line no-plusplus
        for (let x = 0; x < menuHaveChilds.length; x++) {
          if (
            menuHaveChilds[x].child !== undefined &&
            _.filter(menuHaveChilds[x].child, (i) => i.path === pathname)
              .length !== 0
          ) {
            return _.filter(
              menuHaveChilds[x].child,
              (i) => i.path === pathname,
            )[0].key;
          }
        }
      }
    }
    return 1;
  };

  return (
    <ContainerSider clickMenu={isExpand}>
      <SiderCustom
        width={maxWidth}
        collapsedWidth={collapsedWidth}
        theme="light"
        trigger={null}
        collapsible
        collapsed={!expand}
        // onMouseEnter={() => setCollapsedWidth(maxWidth)}
        // onMouseLeave={() => setCollapsedWidth(isExpand ? maxWidth : minWidth)}
        onMouseEnter={() => setExpand(isExpand ? expand : !expand)}
        onMouseLeave={() => setExpand(isExpand ? expand : false)}
      >
        <MenuCustom
          mode="inline"
          selectedKeys={`${getSelectedKeys()}`}
          items={items}
          onSelect={
            onClickMenu !== undefined
              ? (data) => {
                  const itemSelect = dataMenu.find(
                    (item) => item.key === data.key,
                  );
                  onClickMenu(itemSelect);
                }
              : null
          }
        />
      </SiderCustom>
    </ContainerSider>
  );
};
Sidebar.propTypes = {
  isExpand: PropTypes.bool,
  minWidth: PropTypes.string,
  maxWidth: PropTypes.string,
  permissionArray: PropTypes.array,
  dataMenu: PropTypes.array,
  onClickMenu: PropTypes.func,
  pathname: PropTypes.string,
};

export default Sidebar;
