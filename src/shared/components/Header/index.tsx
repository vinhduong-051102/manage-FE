import React, { ReactElement } from 'react';
import { Tooltip } from 'antd';
import {
  HeaderEtn,
  ContainerHeader,
  LeftHeader,
  IconMenu,
  Logo,
  RightHeader,
  IconUser,
  PopoverCustom,
  LayoutSearch,
} from './style';
import SearchField from '../InputField/SearchField';

interface PropsType {
  iconMenu: string;
  logo: string;
  userData: {
    image: string;
    email: string;
    fullName: string;
  };
  onClickMenu: () => void;
  onClickLogo: () => void;
  content: ReactElement;
  visible: boolean;
  onOpenChange: (visible: boolean) => void;
  showSearch: boolean;
  placeholderSearch: string;
  pathSuggestSearch: string;
  onSelectSearch: (
    value: string,
    option: {
      categoryid: number;
      objectid: number;
    },
  ) => void;
  onClickFilterBtn: () => void;
  searchSimple: {
    isSearchSimple: boolean;
    value: string;
    onChange: (
      e: Event & {
        target: HTMLInputElement;
      },
    ) => void;
  };
  handleSearch: () => void;
  hideFilter?: boolean;
  contentHoverAvatar: () => JSX.Element;
}

const Header = ({
  iconMenu,
  logo,
  userData,
  onClickMenu,
  onClickLogo,
  content,
  visible,
  onOpenChange,
  showSearch,
  placeholderSearch,
  onSelectSearch,
  onClickFilterBtn,
  searchSimple,
  handleSearch,
  hideFilter,
  pathSuggestSearch,
  contentHoverAvatar,
}: PropsType) => (
  <HeaderEtn>
    <ContainerHeader>
      <LeftHeader>
        <IconMenu alt="" onClick={onClickMenu || null} src={iconMenu} />
        <Logo onClick={onClickLogo || null} src={logo} />
        {showSearch && (
          <LayoutSearch>
            <SearchField
              placeholder={placeholderSearch}
              onSelect={onSelectSearch}
              onClick={onClickFilterBtn}
              searchSimple={searchSimple}
              handleSearch={handleSearch}
              hideFilter={hideFilter}
              pathSuggestSearch={pathSuggestSearch}
            />
          </LayoutSearch>
        )}
      </LeftHeader>
      <RightHeader>
        <PopoverCustom
          placement="bottomRight"
          content={content}
          open={visible}
          onOpenChange={onOpenChange}
          trigger="click"
          overlayStyle={{ paddingRight: '15px' }}
        >
          {!visible ? (
            <Tooltip
              placement="bottomLeft"
              title={contentHoverAvatar}
              color="white"
              overlayStyle={{ maxWidth: '407px' }}
            >
              <div>
                <IconUser alt="" src={userData.image} />
              </div>
            </Tooltip>
          ) : (
            <IconUser alt="" src={userData.image} />
          )}
        </PopoverCustom>
      </RightHeader>
    </ContainerHeader>
  </HeaderEtn>
);

export default Header;
