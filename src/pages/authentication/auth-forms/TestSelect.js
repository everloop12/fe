/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import AsyncSelect from "react-select/async";
import { FixedSizeList as List } from "react-window";
import { createFilter } from "react-select";

const TestSelect = ({ vendorOptions, onChange, value, ...props }) => {


    const options = [];
    for (let i = 0; i < vendorOptions.length; i = i + 1) {
        options.push({ value: vendorOptions[i], label: `${vendorOptions[i]}` });
    }

    const loadOptions = (inputValue, callback) => {
        setTimeout(() => {
            callback(options);
        }, 400);
    };


    const height = 35;

    class MenuList extends Component {
        render() {
            const { options, children, maxHeight, getValue } = this.props;
            const [value] = getValue();
            const initialOffset = options.indexOf(value) * height;

            return (
                <List
                    height={maxHeight}
                    itemCount={children.length}
                    itemSize={height}
                    initialScrollOffset={initialOffset}
                >
                    {({ index, style }) => <div style={style}>{children[index]}</div>}
                </List>
            );
        }
    }

    return (
        <div className="testDropdown">
            <AsyncSelect components={{ MenuList }} cacheOptions defaultOptions loadOptions={loadOptions} onChange={(x) => { onChange(x.value) }} value={{ value: value, label: value }} {...props} filterOption={createFilter({ ignoreAccents: false })} />
        </div>
    )
}
export default TestSelect