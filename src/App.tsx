import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
//import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
//import { Toaster } from "react-hot-toast"
import Products from "./pages/Products/Products";
import TrendingProducts from "./components/TrendingProducts/TrendingProduct";
import TrendingCategory from "./components/TrendingCategory/TrendingCategory";
import Categories from "./pages/Category/Categories";
import SuppliersPage from "./pages/Suppliers/Suppliers";

export default function App() {
  return (
    <>
    {/* <Toaster
        position="top-center" // Centered
        gutter={16} // Space between multiple toasts
        toastOptions={{
          duration: 2000, // Disappears after 2 seconds
          style: {
            padding: "12px 16px",
            borderRadius: "8px",
            fontSize: "16px",
          },
        }}
      /> */}
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
          <Route index path="/" element={<Home />} />



            {/* Others Page */}
            <Route path="/products" element={<Products />} />
            <Route path="/Category" element={<Categories />} />
            <Route path="/suppliers" element={<SuppliersPage />} />
            <Route path="/TrendingProducts" element={<TrendingProducts />} />
            <Route path="/TrendingCategory" element={<TrendingCategory/>} />
            <Route path="/profile" element={<UserProfiles />} />
            {/* <Route path="/calendar" element={<Calendar />} /> */}
            <Route path="/blank" element={<Blank />} />

            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />

            {/* Tables */}
            <Route path="/basic-tables" element={<BasicTables />} />

            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />

            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
