import { ReactElement, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { useSelector } from "react-redux";
import { User_Reducer_Initial_State } from "../../types/reducerTypes";
import { useAllOrdersQuery } from "../../redux/api/orderApi";

interface DataType {
  user: string;
  amount: number;
  discount: number;
  quantity: number;
  status: ReactElement;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Avatar",
    accessor: "user",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Transaction = () => {
  const [rows, setRows] = useState<DataType[]>([]);

  const { user } = useSelector((state: { userReducer: User_Reducer_Initial_State }) => state.userReducer);

  const { data } = useAllOrdersQuery(user?._id!);

  useEffect(() => {
    if (data) {
      setRows(data.orders.map((o) => ({
        user: o.user.name,
        amount: o.total,
        discount: o.discount,
        quantity: o.orderItems.length,
        status: <span className={`${o.status === "Processing" ? "red" :
            o.status === "Shipped" ? "green" :
              "purple"
          }`}>{o.status}</span>,
        action: <Link to={`/admin/transaction/${o._id}`}>Manage</Link>
      })))
    }
  }, [data])

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Transactions",
    rows.length > 6
  )();
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{Table}</main>
    </div>
  );
};

export default Transaction;
