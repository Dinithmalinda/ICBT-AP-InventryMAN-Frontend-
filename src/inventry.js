import React,{useEffect,useState} from 'react'
import {httpPost,httpPostwithToken} from './HttpConfig';
import { useHistory } from "react-router-dom";

function Inventry() {
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


            httpPost("getall/invoices",param)
            .then(res => res.json())
            .then((res)=>{console.log(res); setList1(res);})
  
           
  
  
  },[1]); 

 

  return (
    <>
        <div class="tables">
            <h3>All Invoces</h3>
            <table>
            
            <tr><td>id</td><td>customerid</td><td>branchcode</td> <td>date</td><td>list</td></tr>   
            {list1.map((item) => (<tr key={item.invoiceid}><td>{item.invoiceid}</td><td>{item.customerid}</td><td>{item.branchcode}</td><td>{item.date}</td><td>{}</td></tr>))}
            <tr><td></td><td></td><td></td><td></td><td></td></tr>   
            </table>
            <br/>
            </div>
            </>
  )
}

export default Inventry;