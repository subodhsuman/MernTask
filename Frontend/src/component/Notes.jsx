import { useState } from "react"
import axios from "axios"
import SwalClass from "../common/Swal"
import { useNavigate } from "react-router-dom"


function Notes() {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const[error,setError]=useState(false)
    const[titleError,setTitleError] = useState("")
    const[contentError,setContentError] = useState("")
    const baseUrl = "http://localhost:3001/create_note"
    const nagvigate=useNavigate()


const checkError = () =>{
    if(!title?.length){
      
        setTitleError("Title is required")
       setError(true);
    
    }
    if(!content?.length){
        setContentError("Content is required")
       setError(true);
    }
    if(title?.length && content?.length){
        setError(false);
        setTitleError("")
        setContentError("")
        return false
    }
    else
    return true
}

console.log(title.length,"jjjjj");



    const formHandler = async (e) => {
        e.preventDefault()
        if(checkError()){
            return 
        }
            const userData = {
                title: title,
                content: content
            };
        
        await axios.post(baseUrl, userData)
            .then(response => {
                if (response?.data?.status_code == 1) {
                    SwalClass.success(response?.data?.message)
                    setTitle("")
                    setContent("");
                    nagvigate("/")
                }
                if (response?.data?.status_code == 0) {
                    SwalClass.error(response?.data?.message)
                    return;
                }
            })
            .catch(error => {
                console.error('notes create failed:', error);
            });
        

    }


    return (
        <div>
            <form onSubmit={formHandler}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Title:</label>
                    <input type="text" placeholder="title...." className="form-control" id="exampleInputEmail1" value={title} onChange={(e) => setTitle(e.target.value)} />
                 {error && title?.length ==0 ?<span className="text-danger">{titleError}</span>:""}
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">content:</label>
                    <textarea type="text" placeholder="content..." className="form-control" id="exampleInputPassword1" value={content} onChange={(e) => setContent(e.target.value)} />
                   {error && content?.length ==0 ?<span className="text-danger">{contentError}</span>:""}
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Notes