import React, {useState} from "react";
import Form_c from "./form_c.jsx";


//create your first component
const Home = () => {
	return (
		<div className="col-12" style={{minWidth: "1115px", minHeight:"667px"}}> 
			<header className="p-4 bg-dark d-flex" style={{minHeight:"10vh"}}>
				<h1 className="text-light ms-4" style={{fontSize:"30px"}}>
					Todolist Application Using React
				</h1>
			</header>
			<main className="d-flex justify-content-center my-2">
				<Form_c />
			</main>
		</div>
	);
};

export default Home;
