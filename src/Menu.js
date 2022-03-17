import './App.css';
import React, { useEffect ,useState } from 'react';
import {httpPost} from './HttpConfig';

var flag=false;
var list=[];
var ttt=[];


function Menu() {
	const [prolist,setProlist] = useState([]);
	
	const time = setTimeout(() => {setProlist(ttt);}, 500);
	if(flag==false){
		flag=true;
		
		  httpPost("getall/products",{req:'hiserver'})			.then(res => res.json())
			.then((res)=>{
				//console.log ("res"+res.length);	
			  var tt,id=0;
			  for(tt=0;tt<res.length;tt++){
				  var yy=0; 
              for(yy=0;yy<ttt.length;yy++){ if(res[tt].catagory===ttt[yy].name)break; }
             
			 if(ttt.length===yy){ttt.push({name:res[tt].catagory,link:"/Productfinder?type="+res[tt].catagory ,id:id++});}	
			 
			 }

		   

			 console.log (ttt);	
			
			 
			 console.log (prolist);	

			},error=>{
			  alert(error.message);
			}
			)}


		
	list=[];
	const bb= JSON.parse(localStorage.getItem("TECHMARTuser"));
	console.log(bb);
	if(bb!=null){
	var usertype = bb.user_type;	
	if(usertype==='ADMIN'||usertype==='SALES'){list.push({ name:'INVENTRY', id: '2' ,link:'/inventry'}); }
	if(usertype==='ADMIN'||usertype==='SUPPLY'){ list.push({ name:'PRODUCT-LIST', id: '3',link:'/productlist' }); }}
	if(usertype==='ADMIN'){ list.push({ name:'User-list', id: '1' ,link:'/userlist'}); }

	
	return (
    <div className="navigation">
		<div className="container">
			<nav className="navbar navbar-default">
				
				<div className="navbar-header nav_2">
					<button type="button" className="navbar-toggle collapsed navbar-toggle1" data-toggle="collapse" data-target="#bs-megadropdown-tabs">
						<span className="sr-only">Toggle navigation</span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
					</button>
				</div> 
				<div className="collapse navbar-collapse" id="bs-megadropdown-tabs">
					<ul className="nav navbar-nav">
						<li><a href="/" className="dropdown">Home</a></li>	
						
						<li className="dropdown">
							<a href="#" className="dropbtn" data-toggle="dropdown">Products <b className="caret"></b></a>
							<div className="dropdown-content" >						
					
							{prolist.map((items) => ( <a key={items.id} href={items.link}>{items.name}</a> ))}
						
							</div>			

						</li>	
						{list.map((item) => ( <li className='dropdown' key={item.id}><a href={item.link}>{item.name}</a></li> ))}
				
					</ul>
				</div>
			</nav>
		</div>
	</div>
  );


}

export default Menu;
