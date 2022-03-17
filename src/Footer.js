
import './App.css';

function Footer() {
  return (

    <div className="">
        	<div className="navigation">
		<div className="container">
			<div className="col-md-6 w3agile_newsletter_left">
			
			
			</div>
			<div className="col-md-6 w3agile_newsletter_right">
		
			</div>
		</div>
	</div>
    <div className="container">
        <div className="">
            <div className="col-md-3 w3_footer_grid">
                <h4>Contact</h4>
                <p>Head Office</p>
                <ul className="address">
                    <li><i className="glyphicon glyphicon-map-marker" aria-hidden="true"></i>1440, Main ST,  <span>Colombo 11.</span></li>
                    <li><i className="glyphicon glyphicon-envelope" aria-hidden="true"></i><a href="mailto:info@example.com">info@techmart.com</a></li>
                    <li><i className="glyphicon glyphicon-earphone" aria-hidden="true"></i>+941 567 567</li>
                </ul>
            </div>
            <div className="col-md-3 w3_footer_grid">
                <h4>Branches</h4>
                <ul className="info"> 
                    <li><a href="about.html">Gampaha</a></li>
                    <li><a href="mail.html">Galle</a></li>   
                    <li><a href="mail.html">Kandy</a></li> 
                    <li><a href="mail.html">Nugegoda</a></li> 
                    <li><a href="mail.html">Kurunegala</a></li> 
                    <li><a href="mail.html">Jaffna </a></li>             
                </ul>
            </div>
            <div className="col-md-3 w3_footer_grid">
                <h4>Terms And Conditions</h4>
                <ul className="info"> 
                    <li><a href="products.html">EMI Terms And Conditions</a></li>
                    <li><a href="products1.html">Warrenty</a></li>
                    <li><a href="products1.html">Payments</a></li>
                
                </ul>
            </div>
            <div className="col-md-3 w3_footer_grid">
                <h4>Follow Us</h4>
                <div className="agileits_social_button">
                    <ul>
                        <li><a href="#" className="facebook"> </a></li>
                        <li><a href="#" className="twitter"> </a></li>
                        <li><a href="#" className="google"> </a></li>
                        <li><a href="#" className="pinterest"> </a></li>
                    </ul>
                </div> <br/> <br/> <br/>
                <br/>
                <h5>Payment Accepted</h5>
                <div className="agileits_social_button">
                <img width="400" height="60" src="https://geniusmobile.lk/wp-content/uploads/2021/10/logo-1.jpg" class="attachment-full size-full" alt="" />
                </div>
            </div>
            <div className="clearfix"> </div>
        </div>
    </div>
  
        <div className="footer-copy1">
        </div>
        <div className="container"> <p>&copy; 2022 TechMart. All rights reserved | Design by Dinith(CL/BSCSD/23/33)</p>
        </div>
</div>
  )
}
export default Footer;