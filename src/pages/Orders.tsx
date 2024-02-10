import { ReactElement, useState, useEffect } from "react"
import { Column } from "react-table"
import TableHOC from "../components/admin/TableHOC"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserResponse } from "../types/apiTypes";
import { useUserOrdersQuery } from "../redux/api/orderApi";
import { RootState } from "../redux/store";


type DataType = {
    _id: string;
    amount: number;
    quantity: number;
    discount: number;
    status: ReactElement;
    action: ReactElement
}

const columns: Column<DataType>[] = [
    {
        Header: "ID",
        accessor: "_id"
    },
    {
        Header: "Amount",
        accessor: "amount"
    },
    {
        Header: "Quantity",
        accessor: "quantity"
    },
    {
        Header: "Discount",
        accessor: "discount"
    },
    {
        Header: "Status",
        accessor: "status"
    },
    {
        Header: "Action",
        accessor: "action"
    }
];

const Orders = () => {

    const { user } = useSelector((state: RootState) => state.userReducer);

    const { data } = useUserOrdersQuery(user?._id!);

    const [rows, setRows] = useState<DataType[]>([]);

    const table = TableHOC<DataType>(columns, rows, "dashboard-product-box", "Orders", rows.length > 6)();

    useEffect(() => {
        if (data) setRows(data.orders.map(o => ({
            _id: o._id,
            amount: o.total,
            quantity: o.orderItems.length,
            discount: o.discount,
            status: <span className={`${o.status === "Processing" ? "red" :
                o.status === "Shipped" ? "green" :
                    "purple"
                }`}>{o.status}</span>,
            action: <Link to={`/admin/transaction/${o._id}`}>Manage</Link>
        })));
    }, [rows])

    return (
        <div className="container">
            <h1>My Orders</h1>
            {
                table
            }
        </div>
    )
}

export default Orders