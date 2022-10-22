import React, {useState} from "react";
import Form_c from "./form_c.jsx";


//create your first component
const Home = () => {

	const [login_v, setLogin_v] = useState("show")
	const [form_v, setForm_v] = useState("hidden")
	const [signup_v, setSignup_v] = useState("hidden")

	const [alertERR_v, setAlertERR_v] = useState("hidden")
	const [input_bg, setInput_bg] = useState("border-secondary")

	const [buttonLogOut_v, setButtonLogOut_v] = useState("hidden")

	const api = "https://assets.breatheco.de/apis/fake/todos/user/"

	const [list, setList] = useState([])

	const [user, setUser] = useState("")

	const [logedUser, setLogedUser] = useState("")

	const list_notes = async(get_user)=>{
			try{ 
				const response = await fetch(api+get_user)
				if(response.status === 200){
					const data = await response.json()
					setList(data)
					setAlertERR_v("hidden")
					setInput_bg("border-secondary")
					setUser("")
					setLogedUser(get_user)

					setLogin_v("hidden")
					setForm_v("show")
					setButtonLogOut_v("show")
				}else{
					setAlertERR_v("show")
					setInput_bg("border-danger")
				}
			}catch(error){
				console.log(error)
				alert("unexpected error!")
			}
	}

	const create_user = async(newUser) =>{
		try{

			const response = await fetch(api+newUser, {
				method: "POST",
				body: JSON.stringify([]),
				headers: {
					'Content-Type': "application/json"
				}
			})
			console.log(response)
			if(response.status === 200){
				// const data = await response.json()
				setAlertERR_v("hidden")
				setInput_bg("border-secondary")
				setUser("")

				setSignup_v("hidden")
				setLogin_v("show")
			}else{
				setAlertERR_v("show")
				setInput_bg("border-danger")
			}

		}catch(error){
			console.log(error)
			alert("unexpected error!")
		}
	}

	const button_login = ()=>{
		if(user != ""){
			list_notes(user)
		}
	}

	const button_logOut = ()=>{
		setForm_v("hidden")
		setLogin_v("show")
		setButtonLogOut_v("hidden")
		setAlertERR_v("hidden")
		setInput_bg("border-secondary")
		setUser("")
		setLogedUser("")
	}

	const button_screen = (screen)=>{
		setAlertERR_v("hidden")
		setInput_bg("border-secondary")
		setUser("")
		if(screen === "login"){
			setLogin_v("show")
			setSignup_v("hidden")
        }else if (screen === "signup"){
			setLogin_v("hidden")
			setSignup_v("show")
        }
	}

	const button_signup = ()=>{
		if(user != ""){
			create_user(user)
		}
	}


	return (
		<div className="col-12" style={{minWidth: "1115px", minHeight:"667px"}}> 
			<header className="p-4 bg-dark d-flex justify-content-between" style={{minHeight:"10vh"}}>
				<h1 className="text-light ms-4" style={{fontSize:"30px"}}>
					Todolist Application Using React
				</h1>
				<button onClick={button_logOut} className={"btn border-secondary text-light "+buttonLogOut_v}>Log out</button>
			</header>

			<main className="d-flex flex-column align-items-center my-2" style={{width:"100%"}}>

				<div className={'bg-primary mt-4 d-flex flex-column align-items-center '+login_v} style={{height:"450px", width:"400px", borderRadius:"15px", backgroundImage:"url(https://www.eldeco.es/files/i_1562841409.jpg)"}}>
					<div className='text-center mt-3' style={{color:"#2c2c54", background:"#1abc9c", width:"40%", borderRadius:"10px"}}>
						<h1>
							Login
						</h1>
					</div>		
					<hr style={{width:"90%", color:"black"}} />

					<div className='d-flex flex-column justify-content-center align-items-center' style={{width:"100%"}}>
						<label className='d-flex justify-content-start mt-4' style={{width:"60%", fontSize:"30px"}}>
							User
						</label>
						<input value={user} onChange={(e)=>setUser(e.target.value)} className={"form-control my-2 "+input_bg} placeholder="Your user" style={{width:"60%", background:"#7ed6df"}}/>
						<p className={"bg-danger "+alertERR_v} style={{borderRadius:"5px", width:"60%"}}>user does not exist</p>

						<div className='d-flex'>
							<button onClick={button_login} className='btn mt-4 border-info btn-success mx-2'>Login</button>
							<button onClick={()=>button_screen("signup")} className='btn mt-4 border-info mx-2'>Sign up</button>
						</div>
					</div>
				</div> 

				<div className={'bg-primary mt-4 d-flex flex-column align-items-center '+signup_v} style={{height:"450px", width:"400px", borderRadius:"15px", backgroundImage:"url(https://www.eldeco.es/files/i_1562841409.jpg)"}}>
					<div className='text-center mt-3' style={{color:"#2c2c54", background:"#1abc9c", width:"50%", borderRadius:"10px"}}>
						<h1>
							Sign up
						</h1>
					</div>		
					<hr style={{width:"90%", color:"black"}} />

					<div className='d-flex flex-column justify-content-center align-items-center' style={{width:"100%"}}>
						<label className='d-flex justify-content-start mt-4' style={{width:"60%", fontSize:"30px"}}>
							New user
						</label>
						<input value={user} onChange={(e)=>setUser(e.target.value)} className={"form-control my-2 "+input_bg} placeholder="Your username" style={{width:"60%", background:"#7ed6df"}}/>
						<p className={"bg-danger "+alertERR_v} style={{borderRadius:"5px", width:"60%"}}>user exists</p>

						<div className='d-flex'>
							<button onClick={()=>button_screen("login")} className='btn mt-4 border-info mx-2'>Login</button>
							<button onClick={button_signup} className='btn mt-4 border-info btn-success mx-2'>Sign up</button>
						</div>
					</div>
				</div> 

				<div className={form_v}>
					<Form_c list={list} api={api} logedUser={logedUser} />
				</div>
			</main>
		</div>
	);
};

export default Home;
