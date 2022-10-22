import React, {useState, useEffect} from "react";

const Form_c = (props)=>{

    const [text, setText] = useState("")
    const [list, setList] = useState([])
    
    const [list_null, setList_null] = useState("No hay notas, añade algunas!")

    let up_obj = []

    useEffect(()=>{
        setList(props.list.map((item)=>{
            if(item?.label != undefined && item?.label != ""){
                return item?.label
            }
        }))
        if(list != []){
            setList_null("")
        }
    },[props.list])


    let [delete_color, setDelete_color] = useState("btn btn-danger opacity-75")

    let button_delete = (id)=>{
        setDelete_color("btn btn-danger")
        setTimeout(() => {
            setList(list.filter((item, index)=>index !== id))
        }, 100);
        if (list_null === "" && list.length == 1){
            setList_null("No hay notas, añade algunas!")
        }
    }

    let button_delete_all = ()=>{
        setTimeout(() => {
            setList([])
        }, 200);
        if (list_null === ""){
            setList_null("No hay notas, añade algunas!")
        }
    }


    const screen_list = list.map((item, index)=>
    <div key={item+index+item} className="d-flex d-flex justify-content-between my-1 hidden_button">
        <p className="my-1 text-light">{item}</p>
        <button onClick={()=>button_delete(index)} className={delete_color}>X</button>
    </div>
    )

    let button_submit = () =>{
        if(text != ""){
            setList(current => [...current, text])
            setText("")
            setList_null("")
        }
    }
    let button_enter_submit = (event)=>{
        if(event.key == "Enter"){
            button_submit()
        }
    }

    const update_notes_api = async(get_obj) =>{
		try{
			const response = await fetch(props.api+props.logedUser, {
				method: "PUT",
				body: JSON.stringify(get_obj),
				headers: {
					'Content-Type': "application/json"
				}
			})
        }catch(error){
            alert("unexpected error!", error)
        }
    }

    const update_notes = ()=>{
        list.map((item)=>{
            let obj = new Object()
            let label = item
            obj.label = label
            obj.done = false
            return up_obj.push(obj)
        })
        update_notes_api(up_obj)
    }

    const delete_user = async() =>{
		try{
			const response = await fetch(props.api+props.logedUser, {
				method: "DELETE",
				// body: JSON.stringify(get_obj),
				headers: {
					'Content-Type': "application/json"
				}
			})
            window.location.reload()
        }catch(error){
            alert("unexpected error!", error)
        }
    }

    return (
        <div className="d-flex flex-column justify-content-between" style={{width:"100%", minHeight:"85vh"}}>
            <div className="d-flex flex-column container" style={{minWidth: "1115px"}}>
                <div className="mb-3 d-flex flex-column">
                    <label className="form-label text-center mb-3 text-info" style={{fontSize: "30px"}}>Enter a note</label>
                    <div className="d-flex">
                        <input onKeyDown={button_enter_submit} onChange={(e)=>setText(e.target.value)} type="text" className="form-control border-info" id="Input1" value={text} maxLength="100"/>
                        <button onClick={button_submit} className="btn btn-success">Enter</button>
                    </div>
                </div>
                <div className="d-flex justify-content-between container">
                    <h4 className="text-center text-primary ms-4" style={{fontSize: "20px"}}>
                        Your notes
                    </h4>
                    <div className="d-flex me-2">
                        <button onClick={update_notes} className="btn btn-success mx-2 border-info">
                            Save notes
                        </button>
                        <button onClick={delete_user} className="btn btn-danger mx-2 border-secondary">
                            Delete user
                        </button>
                    </div>
                </div>
                {screen_list}
                <p className="text-light">
                    {list_null}
                </p>
            </div>
            {/* <footer className="d-flex bg-dark p-2 justify-content-center" style={{minWidth: "1115px"}}>

                <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Eliminar todas las notas
                </button>

                <div className="modal fade" id="exampleModal" tabIndex={"-1"} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Borraras todas las notas!</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                Seguro que quieres continuar?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button onClick={()=>button_delete_all()} type="button" data-bs-dismiss="modal" className="btn btn-danger">Continuar</button>
                             </div>
                         </div>
                    </div>
                  </div>
            </footer> */}
        </div>
    )
}

export default Form_c;