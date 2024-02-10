import { ReactElement, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { useDeleteUserMutation, useGetAllUsersQuery } from "../../redux/api/userApi";
import { RootState, server } from "../../redux/store";
import { User } from "../../types/types";
import { responseToast } from "../../utils/feature";
import { FaUser } from "react-icons/fa";

interface DataType {
  avatar: ReactElement;
  name: string;
  email: string;
  gender: string;
  role: string;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Avatar",
    accessor: "avatar",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Customers = () => {
  const [rows, setRows] = useState<DataType[]>([]);

  const { user } = useSelector((state: RootState) => state.userReducer);
  const { data } = useGetAllUsersQuery(user?._id!);
  const [deleteUser] = useDeleteUserMutation();

  const deleteHandler = async (id: string) => {
    const res = await deleteUser({
      admin_id: user?._id!,
      user_id: id
    });
    responseToast(res, null, "");
  }

  useEffect(() => {
    if (data) {
      setRows(data?.users.map((u: User) => ({
        avatar: <img style={{borderRadius: "100%"}} src={u.photo} alt={u.name} />,
        name: u.name,
        email: u.email,
        gender: u.gender,
        role: u.role,
        action: (
          <button onClick={() => deleteHandler(u._id)}>
            <FaTrash />
          </button>
        )
      })));
    }
  }, [data])


  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Customers",
    rows.length > 6
  )();

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{Table}</main>
    </div>
  );
};

export default Customers;
