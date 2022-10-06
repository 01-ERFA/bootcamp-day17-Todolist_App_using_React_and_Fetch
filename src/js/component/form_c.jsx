import React, {useState} from "react";

const Form_c = ()=>{

    const [text, setText] = useState("")
    const [list, setList] = useState([])
    const [list_null, setList_null] = useState("No hay notas, añade algunas!")

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
    <div className="d-flex d-flex justify-content-between my-1 hidden_button">
        <p className="my-1">{item}</p>
        <button onClick={()=>button_delete(index)} className={delete_color}>X</button>
    </div>
    )

    let button_submit = () =>{
        if(text != ""){
            setList(current => [...current, text]);
            setText("")
            setList_null("")
        }
    }
    let button_enter_submit = (event)=>{
        if(event.key == "Enter"){
            console.log("Has presionado Enter")
            button_submit()
        }
        
    }

    return (
        <div className="d-flex flex-column justify-content-between" style={{width:"100%", minHeight:"85vh"}}>
            <div className="d-flex flex-column container">
                <div className="mb-3 d-flex flex-column">
                    <label className="form-label text-center mb-3" style={{fontSize: "30px"}}>Ingresa una nota</label>
                    <div className="d-flex">
                        <input onKeyDown={button_enter_submit} onChange={(e)=>setText(e.target.value)} type="text" className="form-control border-info" id="Input1" value={text} maxLength="100"/>
                        <button onClick={button_submit} className="btn btn-success">Ingresar</button>
                    </div>
                </div>
                <h4 className="text-center" style={{fontSize: "20px"}}>Tus Notas</h4>
                {screen_list}
                {list_null}
            </div>
            <footer className="d-flex bg-dark p-2 justify-content-center" style={{minWidth: "1115px"}}>

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
            </footer>
        </div>
    )
}

export default Form_c;