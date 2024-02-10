import AdminSidebar from "../../../components/admin/AdminSidebar";
import { BarChart } from "../../../components/admin/Charts";
import { useGetBarChartsQuery } from "../../../redux/api/statsApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import Loader from "../../../components/Loader";
import { getMonths } from "../../../utils/feature";

const Barcharts = () => {

  const {get12Months:months, get6Months} = getMonths();

  const { user } = useSelector((state: RootState) => state.userReducer);
  const { data, isLoading } = useGetBarChartsQuery(user?._id!);

  const bar = data?.barCharts!;

  return isLoading ? <Loader /> : (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container">
        <h1>Bar Charts</h1>
        <section>
          <BarChart
            data_1={bar.product}
            data_2={bar.user}
            title_1="Products"
            title_2="Users"
            bgColor_1={`hsl(260, 50%, 30%)`}
            bgColor_2={`hsl(360, 90%, 90%)`}
            labels={get6Months}
          />
          <h2>Top Products & Top Customers</h2>
        </section>

        <section>
          <BarChart
            horizontal={true}
            data_1={bar.order}
            data_2={[]}
            title_1="Orders"
            title_2=""
            bgColor_1={`hsl(180, 40%, 50%)`}
            bgColor_2=""
            labels={months}
          />
          <h2>Orders throughout the year</h2>
        </section>
      </main>
    </div>
  );
};

export default Barcharts;
