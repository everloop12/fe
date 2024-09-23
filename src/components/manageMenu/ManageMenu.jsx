/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import './manageMenu.scss';
import SettingIcon from '../../assets/images/icons/settings.svg';
import PopoverManageMenu from './popoverManageMenu/PopoverManageMenu';

const ManageMenu = ({ ...actions }) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const openPopover = () => {
    setPopoverOpen(true);
  };

  const closePopover = () => {
    setPopoverOpen(false);
  };

  return (

    <div style={{
      cursor: 'click',
      position: 'relative', display: 'flex',
      justifyContent: 'center',
    }}>
      <button
        type="submit"
        className="plugin-manage-button d-flex justify-content-between align-items-center"
        onClick={openPopover}
      >
        <img src={SettingIcon} alt="" />
      </button>
      <PopoverManageMenu
        popoverOpen={popoverOpen}
        closePopover={closePopover}
        actions={actions}
      />
    </div>
  );
};

export default ManageMenu;
