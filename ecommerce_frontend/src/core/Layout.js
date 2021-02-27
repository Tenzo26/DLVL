import React from "react";
import Menu from "./Menu";
import "../styles.css";

const Layout = ({
	title = "Untitled",
	description = "Undescribed",
	className,
	children,
	hasBg = false,
	imgSrc = null,
}) => {
	const styles =
		hasBg === true
			? {
					minWidth: "100%",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "center",
					backgroundSize: "cover",
					backgroundImage: `url(${imgSrc})`,
			  }
			: null;

	return (
		<div>
			<Menu />
			<div className="jumbotron">
				<h2>{title}</h2>
				<p className="lead">{description}</p>
			</div>
			<div style={styles}>
				<div className={className}>{children}</div>
			</div>
		</div>
	);
};

export default Layout;
