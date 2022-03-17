
import React, { useEffect, useState } from 'react'
import {useHistory} from "react-router-dom";



const Menuitem = (props) =>{
  const { name , subMenus ,icon}= props;
  const [expand ,setExpand]=useState(false);
return (
  <li> <a onClick={()=> setExpand(!expand) } className='menu-item'>
       <i class={icon}></i>
       <span>{name}</span>
       </a>
       {subMenus && subMenus.length> 0 ?
       (<ul className={`sub-menu ${expand ? 'active': ' ' }`}> 
       {subMenus.map((menu,index)=>(
              <li key={index}> <a>{menu.name} </a> </li>
             ))}
       </ul> )
       : null }            
  </li>
)
}

 function SideBar() {

  const menuItems =[{name:'Overall Data',to :'/home' ,icon :'bi bi-check2-all'},{name:"Hazardous Gas Detectors" ,to:'/home' ,icon:'bi bi-slack',
                   subMenus:[ {name:"Sensor-01(Area 3)"}]}];  

   const [inactive, setInactive] = useState(false);
  
   const History =  useHistory();
   function handleClick(){ History.push("/login") ;}

   useEffect(()=>{
if(inactive){
document.querySelectorAll(".sub-menu").forEach((el)=>{
el.classList.remove("active");})
}

   })

  return (
    <div className={`Side-menu ${inactive ? "Inactive" : "" }`}>
        
       <div className='top-section'>
           <div className='logo'> </div>
           <div onClick={()=>{setInactive(!inactive)}} className='toggle-menu-button'> 
           {inactive ? (<i class="bi bi-arrow-right-square-fill" ></i>)
           :  (<i class="bi bi-arrow-left-square-fill" ></i>)}
           </div>
        

        <div className='search-controller'><button className='search-button'><i class="bi bi-search"></i></button> 
                                           <input type="text" placeholder='search'/>



        </div>
        
        </div> 

        <div className='divider'></div>

        <div className='main-menu'>
          <ul>
{menuItems.map((menuItem,index)=>( 
            < Menuitem kye={index} icon={menuItem.icon} name={menuItem.name} to={menuItem.to} subMenus={menuItem.subMenus}/>))
}

            {/* <li> <a className='menu-item'><i class="bi bi-slack"></i><span>Hazardous Gas Detectors</span></a>
            <ul className='sub-menu'>
            <li>
               <a>Sensor-01(Area 3)</a>
            </li>              
            </ul>           
            </li> */}

          </ul>   
          </div>

          <div className="side-menu-footer">
            
        <div className="avatar">   </div>
        <div className="user-info">
          <h5>Admin</h5>
           <i class="bi bi-box-arrow-right" onClick={()=>handleClick()}> log-out</i> 
        </div>

      </div>
        
          </div>
        
  )
}



export default SideBar