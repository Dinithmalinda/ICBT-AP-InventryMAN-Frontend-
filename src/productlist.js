
import React,{useEffect,useState} from 'react'
import {httpPost,httpPostwithToken} from './HttpConfig';
import { useHistory } from "react-router-dom";

function Productlist() {
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


            httpPost("getall/products",param)
            .then(res => res.json())
            .then((res)=>{console.log(res); setList1(res);})
  
           
  
  
  },[1]); 

 

  return (
    <>
        <div class="tables">
            <h3>All Products</h3>
            <table>
            
            <tr><td>id</td><td>item</td><td>Catagory</td> <td>price</td><td>description</td></tr>   
            {list1.map((item) => (<tr key={item.product_id}><td>{item.product_id}</td><td>{item.name }</td><td>{item.catagory}</td><td>{item.price}</td><td>{item.quantitybranchcode}</td></tr>))}
            <tr><td></td><td></td><td></td><td></td><td></td></tr>   
            </table>
            <br/>
            </div>
            </>
  )
}

export default Productlist