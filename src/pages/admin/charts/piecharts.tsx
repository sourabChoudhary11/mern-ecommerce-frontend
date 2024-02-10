import { useSelector } from "react-redux";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { DoughnutChart, PieChart } from "../../../components/admin/Charts";
import { useGetPieChartsQuery } from "../../../redux/api/statsApi";
import { RootState } from "../../../redux/store";
import Loader from "../../../components/Loader";

const PieCharts = () => {

  const { user } = useSelector((state: RootState) => state.userReducer!);
  const {isLoading, data } = useGetPieChartsQuery(user?._id!);

  const pie = data?.pieCharts!;

  const distribution = pie?.revenueDistribution;
  const orderIn = pie?.orderFullfillmentRatio;
  const age = pie?.usersAgeGroup;
  const userIs = pie?.adminCustomer;

  return isLoading ? <Loader /> : (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container">
        <h1>Pie & Doughnut Charts</h1>
        <section>
          <div>
            <PieChart
              labels={["Processing", "Shipped", "Delivered"]}
              data={[orderIn.processing, orderIn.shipped, orderIn.delievered]}
              backgroundColor={[
                `hsl(110,80%, 80%)`,
                `hsl(110,80%, 50%)`,
                `hsl(110,40%, 50%)`,
              ]}
              offset={[0, 0, 50]}
            />
          </div>
          <h2>Order Fulfillment Ratio</h2>
        </section>

        <section>
          <div>
            <DoughnutChart
              labels={pie.productCategoriesRatio.map(i => Object.keys(i)[0])}
              data={pie.productCategoriesRatio.map(i => Object.values(i)[0])}
              backgroundColor={pie.productCategoriesRatio.map((i) => `hsl(${Object.values(i)[0] * 4}, ${Object.values(i)[0]}%, 50%)`
              )!}
              legends={false}
              offset={[0, 0, 0, 80]}
            />
          </div>
          <h2>Product Categories Ratio</h2>
        </section>

        <section>
          <div>
            <DoughnutChart
              labels={["In Stock", "Out Of Stock"]}
              data={Object.values(pie.stockAvailability)}
              backgroundColor={["hsl(269,80%,40%)", "rgb(53, 162, 255)"]}
              legends={false}
              offset={[0, 80]}
              cutout={"70%"}
            />
          </div>
          <h2> Stock Availability</h2>
        </section>

        <section>
          <div>
            <DoughnutChart
              labels={[
                "Marketing Cost",
                "Discount",
                "Burnt",
                "Production Cost",
                "Net Margin",
              ]}
              data={[distribution.marketingCost, distribution.discount, distribution.burnt, distribution.productionCost, distribution.netMargin]}
              backgroundColor={[
                "hsl(110,80%,40%)",
                "hsl(19,80%,40%)",
                "hsl(69,80%,40%)",
                "hsl(300,80%,40%)",
                "rgb(53, 162, 255)",
              ]}
              legends={false}
              offset={[20, 30, 20, 30, 80]}
            />
          </div>
          <h2>Revenue Distribution</h2>
        </section>

        <section>
          <div>
            <PieChart
              labels={[
                "Teenager(Below 20)",
                "Adult (20-40)",
                "Older (above 40)",
              ]}
              data={[age.teen, age.adult, age.old]}
              backgroundColor={[
                `hsl(10, ${80}%, 80%)`,
                `hsl(10, ${80}%, 50%)`,
                `hsl(10, ${40}%, 50%)`,
              ]}
              offset={[0, 0, 50]}
            />
          </div>
          <h2>Users Age Group</h2>
        </section>

        <section>
          <div>
            <DoughnutChart
              labels={["Admin", "Customers"]}
              data={[userIs.admin, userIs.admin]}
              backgroundColor={[`hsl(335, 100%, 38%)`, "hsl(44, 98%, 50%)"]}
              offset={[0, 50]}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default PieCharts;
