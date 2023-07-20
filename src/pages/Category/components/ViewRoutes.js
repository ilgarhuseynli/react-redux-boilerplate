import React from "react";
import {Route,Routes} from "react-router-dom";
import {Add, Edit} from "../views";

export const ViewRoutes = ({onClose,loadData,type}) => {

    return (
        <Routes>
            <Route
                path={`add`}
                element={<Add
                    reload={() => loadData()}
                    onClose={onClose}
                    type={type}
                />}
            />
            <Route
                path={`edit/:id`}
                element={<Edit
                    reload={() => loadData()}
                    onClose={onClose}
                />}
            />
        </Routes>
    );
};
