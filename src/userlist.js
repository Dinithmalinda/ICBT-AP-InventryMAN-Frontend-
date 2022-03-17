import React,{useEffect,useState} from 'react'
import {httpPost,httpPostwithToken} from './HttpConfig';
import { useHistory } from "react-router-dom";

function Userlist() {
  const lockST=localStorage.getItem("TECHMARTuser")
  const history = useHistory();
    if(lockST==null){history.push("/");}

  const[list1,setList1] = useState([]);
  useEffect(() => {

    var param={items:localStorage.getItem("TECHMARTcart"),
                   branch: 'all'}
        httpPostwithToken("verify/user",param).then(res => res.json())
		.then((res)=>{
           
            if(res[0]==null||res[0].mobile==null||res[0].mobile!="ok"){console.log("not verified user");return null; }})


            httpPost("getalluser/user",param)
            .then(res => res.json())
            .then((res)=>{console.log(res); setList1(res);})
  
           
  
  
  },[1]); 

 

  return (
    <>
        <div class="tables">
            <h3>All Users</h3>
            <table>
            
            <tr><td>id</td><td>item</td><td>Catagory</td> <td>price</td><td>description</td></tr>   
            {list1.map((item) => (<tr key={item.userid}><td>{item.userid}</td><td>{item.name }</td><td>{item.email}</td><td>{item.mobile}</td><td>{item.user_type}</td></tr>))}
            <tr><td></td><td></td><td></td><td></td><td></td></tr>   
            </table>
            <br/>
            </div>
            </>
  )
}

export default Userlist