
import axios from "axios";
import { useEffect, useState } from "react";
function AllData() {
    const[data,setData]=useState([])
    useEffect(()=>{
       axios.get("https://jsonplaceholder.typicode.com/users").then((res)=>{
        setData(res.data);
       }).catch((err)=>{
        console.log(err);
       })

    },[])
  return (
    <div>
         <h4>All Data is here</h4>
          <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Sl.No::</th>
                        <th scope="col">Name::</th>
                        <th scope="col">UserName::</th>
                        <th scope="col">Email::</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.length !=0 ?
                      data?.map((v, i) => {
                        return (
                            <>
                                <tr>
                                    <td scope="row" key={i}>{i + 1}</td>
                                    <td>{v?.name}</td>
                                    <td>{v?.username}</td>
                                    <td>{v?.email}</td>

                                    
                                </tr>
                            </>

                        )

                    }): <div >
                           <p className="text-danger">No Notes found</p>
                        </div>}
                </tbody>
            </table> 
    </div>
  )
}

export default AllData;