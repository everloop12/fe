/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef } from 'react';
import {
  CustomPicker,
} from 'react-color';
import './popoverManageMenu.scss';
import { useOnClickOutside } from 'usehooks-ts'

const PopoverManageMenu = ({
  popoverOpen = false,
  closePopover,
  actions = {},
}) => {
  const ref = useRef(null);
  useOnClickOutside(ref, () => {
    closePopover();
  });
  const redText = ['Reset', 'Delete'];
  return (
    popoverOpen
      ? (
        <div
          className="popover-menu tw-z-[100]"
          ref={ref}
        >
          {Object.keys(actions).map((element) => (
            <button
              type="submit"
              key={`manage-button-${element}`}
              className="plugin-buttons"
              style={redText.includes(element) ? { color: '#ED424580' } : {}}
              onClick={() => actions[element]()}
            >
              {element}
            </button>
          ))}
        </div>
      ) : <div />
  );
};

export default CustomPicker(PopoverManageMenu);
