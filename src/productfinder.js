import React,{useState,useContext} from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {httpPost} from './HttpConfig';
import { UserContext } from './userContext';


var flag=false;
var list=[];
var ttt=[];
var brandlisttemp=[];
var page_type;
var selectbrand='any',maxprice=0,minprice=0;
var productlist=[];
function Productfinder() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);  
  page_type = urlParams.get('type')
  const [prolist,setProlist] = useState([]);
  const [brandlist,setBrandlist] = useState([]);	
	const time = setTimeout(() => {setProlist(ttt);setBrandlist(brandlisttemp);}, 500);

  const  {contectvalue,setContectvalue}=useContext(UserContext);

const makeChangelist=()=>{
   var tt,id=0;
  ttt=[];   
  for(tt=0;tt<list.length;tt++){

    

    const discription1=list[tt].discription. split(',,,');
    const price=parseInt(list[tt].price);//console.log(price); console.log(minprice); console.log(maxprice);
    if((list[tt].catagory===page_type) && (discription1[0]===selectbrand||selectbrand=='any')&&(price<=maxprice||maxprice===0)
    &&(price>=minprice||minprice===0)){
              
         ttt.push({title:list[tt].name+"("+discription1[0] +")",url:list[tt].photopath ,id:id++,text:discription1[1],price:list[tt].price,product_id:list[tt].product_id});
         
              }

            }
            const time123 = setTimeout(() => {setProlist(ttt);}, 500); 
          }

  const handleChange = (e) => {selectbrand=e.target.value;makeChangelist(); }
  const handleChangemin = (e) => {maxprice=parseInt(e.target.value);makeChangelist();}
  const handleChangemax = (e) => {minprice=parseInt(e.target.value);makeChangelist();}
  const addtocart = (e) => {var cart=[];var i=0;  
                            console.log(e)  ;
                           var tempitem=prolist[e];tempitem.qty=1;   
                           console.log("product id="+tempitem.product_id);   
                           //console.log(tempitem);          
                           const lockST=JSON.parse(localStorage.getItem("TECHMARTcart"));

                           if(lockST!=null){cart=lockST}

                           for(i=0;i<cart.length;i++){if(tempitem.product_id==cart[i].product_id){cart[i].qty=cart[i].qty+1;break;}}
                           if(i>=cart.length)cart.push(tempitem); 

                           //console.log(cart)
                           var itemcount=0;
                           for(i=0;i<cart.length;i++){itemcount+=cart[i].qty;}
                           setContectvalue(cart.length);   
                           localStorage.setItem("TECHMARTcart",JSON.stringify(cart));
                           
                          }

	if(flag==false){
		flag=true;		
		  httpPost("getall/products",{req:'hiserver'})			.then(res => res.json())
			.then((res)=>{
				console.log (res);
        list=res;       
			  var tt,id=0;brandlisttemp=[];
			  for(tt=0;tt<list.length;tt++){
          //console.log(list[tt].product_id)
				  if(list[tt].catagory==page_type){
           const discription1=list[tt].discription. split(',,,');
               ttt.push({title:list[tt].name+"("+discription1[0] +")",url:list[tt].photopath ,id:id++,text:discription1[1],price:list[tt].price,product_id:list[tt].product_id});
               var yy=0; 
               for(yy=0;yy<brandlisttemp.length;yy++){ if(discription1[0]===brandlisttemp[yy].name)break; }             
               if(brandlisttemp.length===yy){brandlisttemp.push({name:discription1[0],id:id});}            
  }}
        // catagory: "Phone"
        // discription: "apple"
        // name: "Iphone11"
        // photopath: "/yti"
        // price: 100000
        // product_id: 1
        // quantitybranchcode: "77u/MTAsMTI="			 
       //console.log (ttt);		
			 //console.log (prolist);	
			},error=>{
			  alert(error.message);
			}
			)}

  return (
    <div class="centered">
    <div class="sidenav">
    <h4>Category-{page_type}</h4>
    <br/><br/>
    <h5>Select-Brand</h5>
    <select class="form-select"  onChange={(e) => handleChange(e)} >
  <option selected>any</option>
  {brandlist.map((items) => ( <option  key={items.id} value={items.name}>{items.name}</option>))}
</select>
<br/><br/>


<h5>price range (Rs.)</h5>

<input type="number"  id="staticEmail" placeholder='min'  onChange={(e) => handleChangemax(e)}/>
<input type="number"  id="staticEmail" placeholder='max'handleChangemax onChange={(e) => handleChangemin(e)}/>  
</div>

{prolist.map((items) => ( 
<Card >
  <Card.Img variant="top" src={items.url} />
  <Card.Body>
    <Card.Title>{items.title}</Card.Title>
    <Card.Text>{items.text}</Card.Text>
    <Card.Text>Rs.{items.price}</Card.Text>
    <Button variant="primary" onClick={()=>addtocart(items.id)}>Add to  Cart</Button>
  </Card.Body>
</Card>
))}


    </div>


  )
}

export default Productfinder