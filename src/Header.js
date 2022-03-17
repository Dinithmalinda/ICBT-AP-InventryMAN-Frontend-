
import { useState,useContext,useEffect } from 'react';
import './App.css';
import {httpPost,httpPostwithToken} from './HttpConfig';
import { Link } from 'react-router-dom';
import { UserContext } from './userContext';



export default function Header() {
	var getitemcount=(item)=>{var out=0;var i;for(i=0;i<item.length;i++){out+=item[i].qty} return out;}

    const[mobile,setMobile] = useState('');
	const[password,setPassword] = useState('');
    const[respassword,setRePassword] = useState('');
    const[email,setEmail] = useState('');
    const[showCartPopup,setShowCartPopup] = useState(false);
	const[name,setName] = useState('');
	const [sign_in_up_model,setsignin_up_model] = useState('');
	const [SignedIN,setSignedIN] = useState('');

 const  {contectvalue,setContectvalue}=useContext(UserContext);
 const [list,setList]=useState([]);

 var lockST=JSON.parse(localStorage.getItem("TECHMARTcart"));  

 if(lockST!=null){var tt= getitemcount(lockST);console.log(tt);setContectvalue(tt);}   

	const bb= localStorage.getItem("TECHMARTuser_name");
	if(bb!=null){const time = setTimeout(() => {document.getElementById("hiwidow").innerHTML="hi "+ bb;setSignedIN('signedin');}, 300);}
    const signUpApi=()=>{
		if(mobile == ""){
			alert("Mobile should not be empty");
			return;
		}else if(name == ""){
			alert("Name should not be empty");
			return;
		}else if(email == ""){
			alert("Email should not be empty");
			return;
		}else if(password == ""){
			alert("password should not be empty");
			return;
		}else if(respassword == ""){
			alert("Repassword should not be empty");
			return;
		}else if(password != respassword){
			alert("Password and Repassword should be same");
			return;
		}
		let jsonOBj ={ 
				"name":name,
				"mobile":mobile,
				"password":password ,
				"email":email
			}
				
		httpPost("signup/user",jsonOBj)
		.then(res => res.json())
		.then((res)=>{
			if(res[0].hasOwnProperty('userid')){
				alert("Registration success.please sign in");
				setMobile('');
				setPassword('');
				setRePassword("");
				setEmail("")
				setName('');
				setsignin_up_model('sign-in')//hide the sign up model.
			}else{
				alert(res);	
			}
			
			console.log(res);
			
		},error=>{
			alert(error.message);
		}
		)
    }
    const showCartList=()=>{
        
	}
	const getTotalAmount=()=>{
		if(lockST==null)return 0;
		var out=0,i=0;

		for(i=0;i<lockST.length;i++){out+= lockST[i].price*lockST[i].qty}
		return out;
	}

	const logout= ()=>{
		localStorage.removeItem("TECHMARTtoken");//token
				localStorage.removeItem("TECHMARTuser_id");//user_id
				localStorage.removeItem("TECHMARTuser_name");//user_id
				localStorage.removeItem("TECHMARTuser");//user_id
				setsignin_up_model('');
				window.location.reload();
	}

    const loginApi = ()=>{
		if(mobile == ""){
			alert("Mobile should not be empty");
			return;
		}else if(password == ""){
			alert("password should not be empty");
			return;
		}
		let jsonOBj = {"mobile":mobile,"password":password }
		
		httpPost("login/user",jsonOBj)
		.then(res => res.json())
		.then((res)=>{
			if(res[0]['password']==null)alert("invalied data");
			else if(res[0]['password']=="invalied password")alert(res[0]['password']);			
			else{localStorage.setItem("TECHMARTtoken",res[0]['password']);//token
					localStorage.setItem("TECHMARTuser_id",res[0]['userid']);//user_id
				localStorage.setItem("TECHMARTuser_name",res[0]['name']);//user_id
				localStorage.setItem("TECHMARTuser",JSON.stringify( res[0]));//user_id
				setsignin_up_model('');//hide the sign up model.
				setSignedIN('signedin');		
                
				document.getElementById("hiwidow").innerHTML="hi "+ res[0]['name']
				window.location.reload();
				//getCategory();	
			}
			
			console.log(res);
			
		},error=>{
			alert(error.message);
		}
		)
	}
    return (
        <>
        <div className="header" id="home1">
		<div className="container">
			<div className="w3l_login">				
				<a href="javascript:void(0)" onClick={()=>{if(SignedIN == 'signedin')setsignin_up_model('sign-out');else setsignin_up_model('sign-in')}} data-toggle="modal" data-target="#myModal88"><span className="glyphicon glyphicon-user" aria-hidden="true"></span></a>
			<h4 id="hiwidow" >sign-in/register</h4>
			</div>
			<div className="w3l_logo">
				<h1><a href="#">TechMart<span>Best Store 4 mobile phones and accessories</span></a></h1>
			</div>

			<div className="cart cart box_1"> 
					<button onClick={()=>{lockST=JSON.parse(localStorage.getItem("TECHMARTcart"));setShowCartPopup(true);
					                      if(lockST!=null){setList(lockST);console.log(list);}
										  
										 
										 }} className="w3view-cart" type="submit" name="submit" value="">
                        <i className="fa fa-cart-arrow-down" aria-hidden="true"></i>
						<span className="cart_count">{contectvalue}</span>
                    </button>
					
			</div>  
		</div>
	</div>

        <div className={(showCartPopup?'active':'')} id="w3lssbmincart">		
                <div onClick={()=>{ setShowCartPopup(false); }}  style={{float:'right',cursor:'pointer'}}>X</div>

				<br/>	
				
             <table >
			     <tr> <td>name</td> <td>quantity</td> <td>price(Rs)</td> </tr> 

			 {list.map((item,index) => (<tr key={index}><td>{item.title}</td><td>{item.qty}</td>  <td>{item.price}</td></tr> ))}


			 </table>


		   <div>
			   <span>Total: </span>
			   
					<span>Rs.{	getTotalAmount()}</span>
					<br/> <button onClick={()=>{if(lockST!=null)return;setShowCartPopup(false);setContectvalue([])}} >
						<Link to={"/checkoutcart"}>Checkout Cart</Link> </button>
						 <button onClick={()=>{localStorage.removeItem("TECHMARTcart");
							setShowCartPopup(false);setContectvalue([])}}> empty cart </button>
		   </div>
           
           </div>

    <div className={"modal "+ sign_in_up_model} id="myModal88" >
		<div className="modal-dialog modal-lg">
			<div className="modal-content">
				<div className="modal-header">
					<button onClick={()=>setsignin_up_model('')} type="button" className="close" data-dismiss="modal" aria-hidden="true">
						&times;</button>
					<h4 className="modal-title" id="myModalLabel">
						{(SignedIN == 'signedin') ?"User Settings" : ((sign_in_up_model == 'sign-in')?"Sign In":"Register")}						
					</h4>
				</div>
				<div className="modal-body  modal-body-sub">
					<div className="row">
						<div className="col-md-8 modal_body_left modal_body_left1">   
							<div className="sap_tabs">	
								<div id="horizontalTab">
									<ul className=" sign-in  sign-up resp-tab-content">
										<li onClick={()=>setsignin_up_model('sign-in')} className="resp-tab-item" aria-controls="tab_item-0"><span>Sign in</span></li>
										<li onClick={()=>setsignin_up_model('sign-up')}  className="resp-tab-item" aria-controls="tab_item-1"><span>Sign up</span></li>
									</ul>
									<div className=" sign-out  resp-tab-content" aria-labelledby="tab_item-0">
										<div className="facts">
											<div className="register">												
												<form >								
													<div className="sign-out">													
														<input className="btn" onClick={()=>logout()} type="button" value="Sign-out"/>														
													</div>												
												</form>
											</div>
										</div> 
									</div>		
									<div className=" sign-in  resp-tab-content" aria-labelledby="tab_item-0">
										<div className="facts">
											<div className="register">												
												<form >			
													<input onChange={(e)=>setMobile(e.target.value)} name="Mobile" placeholder="Enter Mobile" type="text" required=""/>						
													<input onChange={(e)=>setPassword(e.target.value)}  name="Password" placeholder="Password" type="password" required=""/>										
													<div className="sign-up">													
														<input className="btn" onClick={()=>loginApi()} type="button" value="Sign in"/>														
													</div>												
												</form>
											</div>
										</div> 
									</div>	 
									<div className=" sign-up resp-tab-content" aria-labelledby="tab_item-1">
										<div className="facts">
											<div className="register">											
												<form action="#" method="post">			
													<input onChange={(e)=>setName(e.target.value)} placeholder="Enter Name" name="Name" type="text" required=""/>
													<input onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email Address" name="Email" type="email" required=""/>	
													<input onChange={(e)=>setMobile(e.target.value)} placeholder="Enter Mobile" name="mobile" type="text" required=""/>	
													<input onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password" name="Password" type="password" required=""/>	
													<input onChange={(e)=>setRePassword(e.target.value)} placeholder="Enter Confirm Password" name="Password" type="password" required=""/>
													<div className="sign-up">
														<input className="btn" onClick={()=>signUpApi()} type="button" value="Sign Up"/> 
													</div>
												</form>
											</div>
										</div>
									</div> 			        					            	      
								</div>	
							</div>
							
							
						</div>
						{/* <div className="col-md-4 modal_body_right modal_body_right1">
							<div className="row text-center sign-with">
								<div className="col-md-12">
									<h3 className="other-nw">Sign in with</h3>
								</div>
								<div className="col-md-12">
									<ul className="social">
										<li className="social_facebook"><a href="#" className="entypo-facebook"></a></li>
										<li className="social_dribbble"><a href="#" className="entypo-dribbble"></a></li>
										<li className="social_twitter"><a href="#" className="entypo-twitter"></a></li>
										<li className="social_behance"><a href="#" className="entypo-behance"></a></li>
									</ul>
								</div>
							</div>
						</div> */}
					</div>
				</div>
			</div>
		</div>
	</div>
           </>
    )
}


 