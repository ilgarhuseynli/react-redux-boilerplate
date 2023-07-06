import React from "react";
import {Route,Routes} from "react-router-dom";
import {Add} from "../views";

export const ViewRoutes = ({onClose,loadData}) => {

    return (
        <Routes>
            <Route
                path={`add`}
                element={<Add
                    reload={() => loadData()}
                    onClose={onClose}
                />}
            />
        </Routes>
    );
};
