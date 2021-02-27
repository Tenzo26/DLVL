import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";
import Dashboard from "./user/UserDashboard";
import AdminDashboard from "./user/AdminDashboard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import Orders from "./admin/Orders";
import Shop from "./core/Shop";
import Product from "./core/Product";
import Cart from "./core/Cart";
import Profile from "./user/Profile";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import FAQ from "./user/userFAQ";
import Feedback from "./user/userFeedback";
import AdminFAQ from "./admin/AdminFAQ";
import userFAQ from "./user/userFAQ";
import userFeedback from "./user/userFeedback";
import adminFeedback from "./admin/adminFeedback";
import ForgotPassword from "./user/ForgotPassword";
import AdminUpdateFeedback from "./admin/AdminUpdateFeedback";
import UserUpdateFeedback from "./user/UserUpdateFeedback";
import SignupAdmin from "./user/SignupAdmin";
import UpdateBackground from "./admin/UpdateBackground";

const Routes = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/shop" exact component={Shop} />
				<Route path="/signin" exact component={Signin} />
				<Route path="/signup" exact component={Signup} />
				<Route
					path="/signup/admin/test123123"
					exact
					component={SignupAdmin}
				/>
				<Route path="/forgot" exact component={ForgotPassword} />
				<Route path="/product/:productId" exact component={Product} />
				<PrivateRoute
					path="/user/dashboard"
					exact
					component={Dashboard}
				/>
				<PrivateRoute
					path="/user/userFeedback/:userId/:feedbackId"
					exact
					component={UserUpdateFeedback}
				/>
				<AdminRoute
					path="/admin/adminFeedback/:feedbackId"
					exact
					component={AdminUpdateFeedback}
				/>
				<AdminRoute
					path="/admin/dashboard"
					exact
					component={AdminDashboard}
				/>
				<AdminRoute
					path="/create/category"
					exact
					component={AddCategory}
				/>
				<AdminRoute
					path="/create/product"
					exact
					component={AddProduct}
				/>
				<AdminRoute path="/admin/orders" exact component={Orders} />
				<Route path="/cart" exact component={Cart} />
				<Route path="/user/userFAQ" exact component={userFAQ} />
				<AdminRoute path="/admin/AdminFAQ" exact component={AdminFAQ} />
				<Route
					path="/user/userFeedback"
					exact
					component={userFeedback}
				/>
				<AdminRoute
					path="/admin/adminFeedback"
					exact
					component={adminFeedback}
				/>
				<PrivateRoute
					path="/profile/:userId"
					exact
					component={Profile}
				/>
				<AdminRoute
					path="/admin/products"
					exact
					component={ManageProducts}
				/>
				<AdminRoute
					path="/admin/product/update/:productId"
					exact
					component={UpdateProduct}
				/>
				<AdminRoute
					path="/admin/updateBackground"
					exact
					component={UpdateBackground}
				/>
			</Switch>
		</BrowserRouter>
	);
};

export default Routes;
