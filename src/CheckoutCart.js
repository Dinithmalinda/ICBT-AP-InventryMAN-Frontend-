import { useEffect, useState  } from 'react';
import { useHistory } from "react-router-dom";
import {httpPost,httpPostwithToken} from './HttpConfig';
import Select from "react-select";
import React from 'react';

import PaymentCard from 'react-payment-card-component'

var branch;
var param1;
function CheckoutCart(){
    

    var lockST=JSON.parse(localStorage.getItem("TECHMARTcart"));  
    const history = useHistory();
    if(lockST==null){history.push("/");}

    const[name,setName] = useState('');
    const[list1,setList1] = useState([]);
    const[showCartPopup,setShowCartPopup] = useState(false);
    const[number,setNumber] = useState(''); const[svv,setCvv] = useState(''); const[ecp,setEXP] = useState('');
  
   
     const getTotalAmount=()=>{
        if(lockST==null)return 0;
		var out=0,i=0;
		for(i=0;i<lockST.length;i++){out+= lockST[i].price*lockST[i].qty}
        
		return out;
	}

    const proceeedi=()=>{
        const bb= localStorage.getItem("TECHMARTtoken");
        if(branch==null){alert('plese select neares branch to your location ');return;}
        if(bb==null){alert("plese login or register to  complete payment!");return;}
        var param={items:localStorage.getItem("TECHMARTcart"),
                   branch: branch}


        httpPostwithToken("verify/user",param).then(res => res.json())
		.then((res)=>{
          if(res[0]==null||res[0].mobile==null||res[0].mobile!="ok"){console.log("not verified user");return null; }})


            param1=param;

        setShowCartPopup(true); 
        console.log("sent  msg");
    }

    const makepayment=()=>{
        httpPostwithToken("setnew/invoices",param1).then(res => res.json())
        .then((res)=>{console.log(res) })
        setShowCartPopup(false); 
        localStorage.removeItem("TECHMARTcart");

    }


    const [dataPhase, setDataPhase] = useState([
        { phaseID: 1, phaseText: "Colombo" },
        { phaseID: 2, phaseText: "Galle" },
        { phaseID: 3, phaseText: "Kandy" },
        { phaseID: 4, phaseText: "Nugegoda" },
        { phaseID: 5, phaseText: "Gampaha" },
        { phaseID: 6, phaseText: "Kurunegala" },
        { phaseID: 7, phaseText: "Jaffna" }
      ]);
    
      const [selOption, setSelOption] = useState({});
    
      const HandelChange = (obj) => {
        setSelOption(obj);
        console.log(obj);
        branch=obj.phaseID;
      };
    
   
    
    useEffect(() => {setList1(lockST);},[1]); 
    return (
        <>
        <div class="tables">
            <h3>Checkout</h3>
            
             <br/>
            <table>
            <tr><td></td><td>name</td><td>quantity</td><td>price(Rs)</td> </tr>    
            <tr><td></td><td></td><td></td> <td></td> </tr>   
            {list1.map((item,index) => (<tr key={index}><td><img  src={item.url}alt="new"/></td><td>{item.title}</td><td>{item.qty}</td><td>{item.price*item.qty}</td></tr>))}
            <tr><td></td><td></td><td></td><td></td> </tr>   
            <tr><td></td><td></td><td></td><td>Sub-Total ={getTotalAmount()}</td> </tr> 
            </table>
            <br/>
            
            please select your nearest branch
            <Select
      isSearchable
      options={dataPhase}
      getOptionLabel={(option) => option.phaseText}
      getOptionValue={(option) => option.phaseText}
      className="diMultiSelect"
      classNamePrefix="diSelect"
      //  styles={styles}
      maxMenuHeight={150}
      value={selOption} // this doesn't let me click options
      onChange={(option) => HandelChange(option)} // this returns (option) => option.phaseText) as a string
    />
            
            
            
        
            <button onClick={()=>{ proceeedi(); }}  >proceed</button>
             <button onClick={()=>{setList1([]);localStorage.removeItem("TECHMARTcart");}} >cancel</button>
        </div>

        <div className={(showCartPopup?'active':'')} id="payment" >		        
                <button onClick={()=>{ setShowCartPopup(false); }}  >X</button>
              
                    <PaymentCard 
      bank="itau"
      model="personnalite"
      type="black"
      brand="visa"
      number={ svv }
      cvv="202"
      holderName={name}
      expiration={ecp }
      flipped={false}
    />

   <input onChange={(e)=>setName(e.target.value)} placeholder="Enter Name" name="Name" type="text" required=""/>
   <input onChange={(e)=>setNumber(e.target.value)} placeholder="Enter Name" name="card number" type="text" required=""/>	   
   <input onChange={(e)=>setCvv(e.target.value)} placeholder="Enter Name" name="CVV" type="text" required=""/>	 
   <input onChange={(e)=>setEXP(e.target.value)} placeholder="Enter Name" name="exp date" type="text" required=""/>	
   <button onClick={()=>{ makepayment();}}  >Payment proceed</button> <button onClick={()=>{ setShowCartPopup(false); }}  >cancel</button>
           </div>



        </>);
}
export default  CheckoutCart;
