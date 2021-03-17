import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../auth";
import { itemTotal } from "./cartHelpers";
import { ToolFilled } from "@ant-design/icons";

const isActive = (history, path) => {
	if (history.location.pathname === path) {
		return {
			color: "#ffffff",
		};
	} else {
		return {
			color: "#000000",
		};
	}
};

const Menu = ({ history }) => (
	<div>
		<ul className="nav nav-tabs bg-primary">
			<li className="nav-item">
				<Link
					className="nav-link"
					style={isActive(history, "/")}
					to="/"
				>
					Home
				</Link>
			</li>

			<li className="nav-item">
				<Link
					className="nav-link"
					style={isActive(history, "/shop")}
					to="/shop"
				>
					Shop
				</Link>
			</li>

			<li className="nav-item">
				<Link
					className="nav-link"
					style={isActive(history, "/cart")}
					to="/cart"
				>
					Cart{" "}
					{itemTotal() == 0 ? (
						``
					) : (
						<sup>
							<small className="cart-badge">{itemTotal()}</small>
						</sup>
					)}{" "}
				</Link>
			</li>

			<li className="nav-item">
				<Link
					className="nav-link"
					style={isActive(history, "/user/userFAQ")}
					to="/user/userFAQ"
				>
					FAQs
				</Link>
			</li>

			<li className="nav-item">
				<Link
					className="nav-link"
					style={isActive(history, "/user/userFeedback")}
					to="/user/userFeedback"
				>
					Feedbacks
				</Link>
			</li>

			{isAuthenticated() && isAuthenticated().user.role === 0 && (
				<li className="nav-item">
					<Link
						className="nav-link"
						style={isActive(history, "/user/dashboard")}
						to="/user/dashboard"
					>
						Dashboard
					</Link>
				</li>
			)}

			{isAuthenticated() && isAuthenticated().user.role === 1 && (
				<li className="nav-item">
					<Link
						className="nav-link"
						style={isActive(history, "/admin/dashboard")}
						to="/admin/dashboard"
					>
						Dashboard
					</Link>
				</li>
			)}

			{!isAuthenticated() && (
				<Fragment>
					<li className="nav-item">
						<Link
							className="nav-link"
							style={isActive(history, "/signin")}
							to="/signin"
						>
							Signin
						</Link>
					</li>

					<li className="nav-item">
						<Link
							className="nav-link"
							style={isActive(history, "/signup")}
							to="/signup"
						>
							Signup
						</Link>
					</li>
				</Fragment>
			)}

			{isAuthenticated() && (
				<li className="nav-item">
					<span
						className="nav-link"
						style={{ cursor: "pointer", color: "#ffffff" }}
						onClick={() =>
							signout(() => {
								history.push("/");
							})
						}
					>
						Sign Out
					</span>
				</li>
			)}

			{isAuthenticated() && isAuthenticated().user.role === 1 && (
				<li
					className="nav-item"
					style={{
						marginLeft: "auto",
						fontSize: "18px",
					}}
				>
					<Link
						className="nav-link tool"
						style={isActive(history, "/admin/updateBackground")}
						to="/admin/updateBackground"
					>
						<ToolFilled />
					</Link>
				</li>
			)}
		</ul>
	</div>
);

export default withRouter(Menu);
