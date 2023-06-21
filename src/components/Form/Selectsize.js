import React from "react";
import Select, { components } from "react-select";
import CreatableSelect from "react-select/creatable";

const DropdownIndicator = (props) => {
    return (
        <components.DropdownIndicator {...props}>
            <svg height="16" width="16" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="selectize-dropdown-indicator">
                <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
            </svg>
        </components.DropdownIndicator>
    );
};

const SelectContainer = ({children, ...props}) => {
    return (
        <components.SelectContainer {...props}>
            {children}
        </components.SelectContainer>
    );
};

const Input = props => {
    if (props.isHidden) {
        return <components.Input {...props} className="selectize-search-input is-hidden" />;
    }

    return (
        <div className="selectize-search-input-container">
            <components.Input {...props} className="selectize-search-input" />
        </div>
    );
};

export const Selectize = ({ value, children, isCreatable, ...props }) => {
    let optionsByKey = {};

    React.Children.map(children, (e, i) => {
        optionsByKey[i] = {
            label: e.props.children,
            value: e.props.value
        };
    });

    let options = [];
    for (let key in optionsByKey) {
        options.push(optionsByKey[key]);
    }

    let mapStateToProps = {
        options,
        components: {
            DropdownIndicator,
            SelectContainer,
            Input
        }
    };

    if (value) {
        Object.keys(optionsByKey).forEach(i => {
            let item = optionsByKey[i];
            if (item.value.toString() === value.toString()) {
                mapStateToProps = {
                    ...mapStateToProps,
                    value: item
                };
            }
        });
    }

    if (isCreatable) {
        return <CreatableSelect {...mapStateToProps} {...props} />;
    } else {
        return <Select {...mapStateToProps} {...props} />;
    }
};
