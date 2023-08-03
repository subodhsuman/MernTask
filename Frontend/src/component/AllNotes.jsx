import axios from "axios";
import SwalClass from "../common/Swal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

function AllNotes() {
    const [data, setData] = useState([])
    const [title, setTile] = useState([])
    const [content, setContent] = useState([])
    const [updateId, setUpdateId] = useState()
    const baseUrl = "http://localhost:3001/getAll_note"
    const navigate = useNavigate()


    const getAllNotes = () => {
        axios.get(baseUrl, false)
            .then(response => {
                if (response?.data?.status_code == 1) {
                    setData(response?.data?.data)
                }

            })
            .catch(error => {
                console.error(error);
            });
    }

    // update notes is here
    const UpdatedNotes = async (e) => {
        e.preventDefault()
        const formUpdate = {
            title: title,
            content: content,
        }
        axios.put("http://localhost:3001/update_note_id/" + updateId, formUpdate)
            .then(response => {
                if (response?.data?.status_code == 1) {
                    SwalClass.success(response?.data?.message)
                    document.getElementById("closeBtn").click()
                    getAllNotes()
                }
                if (response?.data?.status_code == 0) {
                    SwalClass.error(response?.data?.message)
                    return;
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });

    }

    // deleted Notes is here
    const deletedNotes = async (id) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You want to deleted this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.delete("http://localhost:3001/deleted_note_id/" + id)
                    .then(response => {
                        console.log('User deleted:', response.data);
                        if (response?.data?.status_code == 1) {
                            SwalClass.success(response?.data?.message)
                            getAllNotes()
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }
        })


    }


    useEffect(() => {
        getAllNotes()
    }, [])
    return (
        <div>
             <h3>All Notes::</h3>
            <button type="button" onClick={() => navigate("/notes")} className="btn btn-secondary">Add Notes</button>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Sl.No</th>
                        <th scope="col">title</th>
                        <th scope="col">content</th>
                        <th scope="col">Edit//Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.length !=0 ?
                      data?.map((v, i) => {
                        return (
                            <>
                                <tr>
                                    <th scope="row" key={i}>{i + 1}</th>
                                    <td>{v?.title}</td>
                                    <td>{v?.content?.length >= 5 ? v?.content?.slice(0, 4) + "...." : v?.content}</td>
                                    <button type="button" onClick={() => { setTile(v?.title), setContent(v?.content), setUpdateId(v?._id) }} data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">  <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="30"><path d="M180-12q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h405l-60 60H180v600h600v-348l60-60v408q0 24-18 42t-42 18H180Zm300-360Zm182-352 43 42-285 284v86h85l286-286 42 42-303 304H360v-170l302-302Zm171 168L662-724l100-100q17-17 42.311-17T847-823l84 85q17 18 17 42.472T930-654l-97 98Z" /></svg></button>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40" onClick={() => deletedNotes(v?._id)} style={{ cursor: 'pointer' }}><path d="M261-120q-24.75 0-42.375-17.625T201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z" /></svg>
                                </tr>
                            </>

                        )

                    }): <div >
                           <p className="text-danger">No Notes found</p>
                        </div>}
                </tbody>
            </table>
            {/* Edit Model is here */}

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Notes</h1>
                            <button type="button" className="btn-close" id="closeBtn" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={UpdatedNotes}>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">Title:</label>
                                    <input type="text" className="form-control" id="recipient-name" value={title} onChange={(e) => setTile(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message-text" className="col-form-label">content:</label>
                                    <textarea className="form-control" id="message-text" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="submit" className="btn btn-primary">Send message</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* Edit Model  close */}

        </div>



    )
}

export default AllNotes;