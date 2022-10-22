import {DataGrid} from "@mui/x-data-grid";
import {Link, Route} from "react-router-dom";
import {useState} from "react";
import {productRows,productColumns} from "../../datatablesource";
import ProductView from "./views/ProductView";
import {url} from "../../library/utils";

const Products = ({}) => {
    const [data, setData] = useState(productRows);

    const handleDelete = (id) => {
        setData(data.filter((item) => item.id !== id));
    };

    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to={url('home.products.view',{productId:params.row.id})}  style={{textDecoration: "none"}}>
                            <div className="viewButton">View</div>
                        </Link>
                        <div
                            className="deleteButton"
                            onClick={() => handleDelete(params.row.id)}
                        >
                            Delete
                        </div>
                    </div>
                );
            },
        },
    ];
    return (
        <div className="datatable">
            <div className="datatableTitle">
                <Link to={url('home.products.create')} className="link">New +</Link>
            </div>


            <DataGrid
                className="datagrid"
                rows={data}
                columns={productColumns.concat(actionColumn)}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
            />
        </div>
    );
};


export default Products;
