import React,{Component} from 'react';
import {
  Collapse,
  Button,
  Badge,
  Container,
  Modal,
  ModalHeader,
  Form,
  FormGroup,
  Input,
  Label,
  Card, CardImg,
  Row,
  Col,
  CardBody,
  TabContent, 
  TabPane,
  Nav, NavItem, NavLink,  CardTitle, CardText

} from 'reactstrap';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { connect } from "react-redux";
import axios from "axios";
import "./nav.css"
import classnames from 'classnames';

const api="http://localhost:8000/"



class  Header extends Component {

   constructor()
   {
     super()
     this.state={
      lcart:[],
      totalprice:0,
      cartlen:0,
      cartup:false,
      loginmodal:false,
      signupmodal:false,
      cartmodal:false,
      accmodal:false,
      checkoutmodal:false,
      auth:false,
      loginemail:"",
      loginpassword:"",
      userid:"",
      signupemail:"",
      signupassword:"",
      signupname:"",
      name:"",
      userid:"",
      username:"",
      address:"",
      phonenumer:"",
      checkout_email:"",
      checkout_phone:"",
      checkout_address:"",
      checkout_message:"",
      activeTab:"1",
      accorders:[]

     }
   }

   componentWillReceiveProps(newProps) {
    this.setState({lcart: newProps.cartdata.cart});
}

   componentDidMount()
   {
     this.setState({
       cartlen:this.props.cartdata.cart.length,
       cartup:true
     })
   }

   createNotification = (type) => {
    return () => {
      console.log("hii")
      switch (type) {
        case 'info':
          NotificationManager.info('Info message');
          break;
        case 'success':
          NotificationManager.success('Success message', 'Title here');
          break;
        case 'warning':
          NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
          break;
        case 'error':
          NotificationManager.error('Error message', 'Click me!', 5000, () => {
            alert('callback');
          });
          break;
      }
    };
  };
  
    

   logintoggle=(id)=>{
    this.setState({
    loginmodal:!this.state.loginmodal,
    signupmodal:false
    })

  }
    signuptoggle=(id)=>{
      this.setState({
      signupmodal:!this.state.signupmodal,
      loginmodal:false
      })
}
carttoggle=()=>{
  this.setState({
    cartmodal:!this.state.cartmodal,
    signupmodal:false,
    loginmodal:false
  })
   
  console.log(this.state.lcart,"hii")
  const data=this.props.cartdata.cart
  this.setState({
    lcart:data
  })

 let totalprice=this.props.cartdata.cart.map(res=>{return(res.price*res.quantity)})
 let sum=0;
  for(let i=0;i<totalprice.length;i++)
  {
    sum+=totalprice[i];
  }
  this.setState({
    totalprice:sum
  })
 } 
  
 acctoggle=(data)=>{
  this.setState({
    activeTab:data,
  })

 } 
 acctoggles=(data)=>{
  this.setState({
    accmodal:!this.state.accmodal,
  })
    axios.get(api+"vieworderbyusername?Userid="+this.state.userid).then(res=>{
      console.log(res.data)
      res.data.product=JSON.parse(res.data.product)
      this.setState({
        accorders:res.data
      })
    })
 } 
  


 authlogin=(e)=>{
   e.preventDefault();
   let Email=this.state.loginemail
   let Password=this.state.loginpassword
   axios.get(api+"login?Email="+Email+"&Password="+Password).then(res=>{
     console.log(res.data)
      if (res.data.auth==true)
      {
        console.log("hii")
        this.setState({
          auth:true,
          userid:res.data.userid,
          name:res.data.name
        })

        this.logintoggle()
      }
      else if(res.data.auth==false) {
        console.log("password wrong")
      }
      else{
        console.log("user not exit");
        this.signuptoggle();
      }
   }).catch(err=>{
     console.log(err)
   })

 }
 authSignup=(e)=>{
  e.preventDefault();
  let Email=this.state.email
  let Password=this.state.password
  let Name=this.state.name
   axios.get(api+"signup?Email="+Email+"&Password="+Password+"&Name="+Name).then(res=>{
        if(res.data.auth===true)
        {
             this.setState({
               userid:res.data.userid,
               name:res.data.name,
               username:res.data.username,
               auth:true
             })
        }
        else
        {

          alert("user already exist");
        }
   })  
   this.signuptoggle(); 

 }

 handleChange=(e)=>{
 this.setState({
     [e.target.name]:e.target.value
 })

}

logout=()=>{
  this.setState({
    auth:false
  })
  this.acctoggles()
}

checkouttoggle=(data)=>{
  this.setState({
    checkoutmodal:!this.state.checkoutmodal,
  })

 } 
  
updateacc=()=>{
  console.log("Updateaacc")
}


checkout=()=>{
if(this.state.auth==true)
{
  this.carttoggle();
  this.checkouttoggle()
} 
else{
   this.logintoggle()
}
}

ordernow=()=>{
   const order=JSON.stringify(this.state.lcart)
   const phone=this.state.checkout_phone
   const name=this.state.checkout_name
   const email=this.state.checkout_email
   const address=this.state.checkout_address
   const message=this.state.checkout_message
   const userid=this.state.userid
   const price=this.state.totalprice
   axios.get(api+"addorder?Orders="+order+"&Userid="+userid+"&Phone="+phone+"&Address="+address+"&Email="+email+"&Price="+price+"&Message="+message+"&Name="+name).then(res=>{
     if(res.data.result==true)
     {
       alert("Your order is bookes")
     }
     else{
       alert("there is an error")
     }
   })

}

increment=(id)=>{
  const oldstate=this.state.lcart
  const newstate=this.state.lcart.map(res=>{
      if(res.id==id)
      {
        res.quantity=res.quantity+1;
        return res;
      }
      else{
        return res;
      }
  })
  this.setState({
    lcart:newstate
  })
}
decrement=(id)=>{
  const oldstate=this.state.lcart
  const newstate=this.state.lcart.map(res=>{
      if(res.id==id)
      {
        res.quantity=res.quantity-1;
        return res;
      }
      else{
        return res;
      }
  })
  this.setState({
    lcart:newstate
  })
  console.log(this.state)
}

removecart=(id)=>{
  console.log(id)
  const oldstate=this.state.lcart
  const newstate=this.state.lcart.filter(res=>{
   return (res.id!==id)
  })
  this.props.cartdata.cart=newstate
  this.setState({
    lcart:newstate
  })
}

   render()
   {
    // const cartlen=this.state.cartup?this.state.lcart.cart.length:0;
    const cartlen=this.props.cartdata.cart.length
    const externalCloseBtnLogin = <button className="close" style={{position:"absolute",right:15,border:"none"}} onClick={this.logintoggle}>&times;</button>
    const externalCloseBtnSignup = <button className="close" style={{position:"absolute",right:15,border:"none"}} onClick={this.signuptoggle}>&times;</button>
    const externalCloseBtnCart = <button className="close" style={{position:"absolute",right:15,border:"none"}} onClick={this.carttoggle}>&times;</button>
    const externalCloseBtnacc = <button className="close" style={{position:"absolute",right:15,border:"none"}} onClick={this.acctoggles}>&times;</button>
    const externalCloseBtnCheckout = <button className="close" style={{position:"absolute",right:15,border:"none"}} onClick={this.checkouttoggle}>&times;</button>
     


  return (
    <Container fluid >
    {/* {login modal } */}
    <Modal isOpen={this.state.loginmodal} toggle={this.logintoggle}>
    <ModalHeader>Login  From{externalCloseBtnLogin}</ModalHeader>
    <Form style={{margin:10}}>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input type="email" name="loginemail" id="exampleEmail" onChange={this.handleChange} value={this.state.loginemail} placeholder="Enter email" />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input type="password" name="loginpassword" id="examplePassword" onChange={this.handleChange} placeholder="Password" value={this.state.loginpassword} />
      </FormGroup>
      <Button color="primary" outline onClick={this.authlogin}>Login</Button> <Button style={{position:"absolute",right:6}} onClick={()=>{this.signuptoggle()}}>Create New</Button>
     
      </Form>
      
    </Modal>
  {/* {checkout model} */}

  <Modal isOpen={this.state.checkoutmodal} toggle={this.checkouttoggle}>
    <ModalHeader>Checkout{externalCloseBtnCheckout}</ModalHeader>
    <Form style={{margin:10}}>
      <FormGroup>
        <Label for="Email">Email</Label>
        <Input type="email" name="checkout_email"  onChange={this.handleChange} value={this.state.checkout_email} placeholder="Enter email" />
      </FormGroup>
      <FormGroup>
        <Label for="Phone">Phone Number</Label>
        <Input type="text" name="checkout_phone" onChange={this.handleChange} value={this.state.checkout_phone} placeholder="Enter Phone" />
      </FormGroup>
      <FormGroup>
        <Label for="Address">Address</Label>
        <Input type="text" name="checkout_address" onChange={this.handleChange} value={this.state.checkout_address} placeholder="Enter Address" />
      </FormGroup>
      <FormGroup>
        <Label for="Message">Message</Label>
        <Input type="text" name="checkout_message" onChange={this.handleChange} value={this.state.checkout_message} placeholder="Enter Your Message" />
      </FormGroup>
      <Button color="primary" outline onClick={this.ordernow}>Order Now</Button>
      </Form>
    </Modal>
  {/* {checkout model} */}

   {/* {signup modal} */}
   <Modal isOpen={this.state.signupmodal} toggle={this.signuptoggle} >
    <ModalHeader>Signup  From{externalCloseBtnSignup}</ModalHeader>
    <Form style={{margin:10}}>
      <FormGroup>
      <FormGroup>
        <Label for="fname">Full Name</Label>
        <Input type="text" name="signupname" id="fname" onChange={this.handleChange} placeholder="Enter Name" value={this.state.signupname}/>
      </FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input type="email" name="signupemail" id="exampleEmail" value={this.state.signupemail} onChange={this.handleChange} placeholder="Enter email" />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input type="password" name="signuppassword" id="examplePassword" value={this.state.signuppassword} onChange={this.handleChange} placeholder="password" />
      </FormGroup>
      <Button color="primary" outline onClick={this.authSignup}>Signup</Button> <Button style={{position:"absolute",right:6}} onClick={()=>{this.logintoggle()}}>Already Have Account</Button>
      </Form>
    
    </Modal>

    {/* {my cart} */}
   <Modal isOpen={this.state.cartmodal} toggle={this.carttoggle} >
    <ModalHeader>Cart{externalCloseBtnCart}</ModalHeader>
     {this.state.cartup?this.state.lcart.map(res=>{
    return(
    <Card>
        <Row>
         <Col sm="4">
          <CardImg top width="100" src={res.pic} alt="Card image cap"  height="100px" style={{padding:20}}/>
           <h6 style={{position:"absolute",top:70,left:60}}>{res.title}</h6>
          </Col>
          <Col sm="8">
 
        <CardBody style={{textAlign:"center"}}>
        <Row>
        <Col sm="3"> 
        {res.quantity>0?
        <Button onClick={()=>{this.decrement(res.id)}}>-</Button>
        :null}</Col>
        <Col sm="2"> 
        <Button outline>{res.quantity}</Button>
        </Col>
        <Col sm="3"> 
        <Button onClick={()=>{this.increment(res.id)}}>+</Button>
        </Col>
       <Col sm="4">
        <Button  onClick={()=>{this.removecart(res.id)}}>Remove</Button>
        </Col>  
        </Row>
        </CardBody>
        </Col>
        </Row>
        </Card>)}):<h1>No Records</h1>}

        <Row>
          <Col sm="6">
    <Button outline style={{position:"relative",margin:10}}>Totla Price:{this.state.totalprice}</Button>

          </Col>
          <Col sm={{size:6}}>
           {cartlen>0?<Button style={{position:"relative",margin:10,float:"right"}}   onClick={this.checkout}>Checkout</Button>:null}</Col> 
        </Row>
    </Modal>  
  
   {/* { account modal} */}
   <Modal isOpen={this.state.accmodal} toggle={this.acctoggles} >
    <ModalHeader>Account{externalCloseBtnacc}</ModalHeader>
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: this.state.activeTab === '1' })}
            onClick={() => { this.acctoggle('1'); }}
          >
            Account
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: this.state.activeTab === '2' })}
            onClick={() => { this.acctoggle('2'); }}
          >
          Orders
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={this.state.activeTab}>
        <TabPane tabId="1">
        <Form style={{margin:10}}>
      <FormGroup>
      <FormGroup>
        <Label for="fname">Full Name</Label>
        <Input type="text" name="name" id="fname" onChange={this.handleChange} placeholder="Enter Name" value={this.state.name}/>
      </FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input type="email" name="email" id="exampleEmail" value={this.state.username} onChange={this.handleChange} placeholder="Enter email" />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input type="password" name="text" id="examplePassword" value={this.state.password} onChange={this.handleChange} placeholder="password" />
      </FormGroup>
      <FormGroup>
        <Label for="Address">Address</Label>
        <Input type="text" name="address" id="exampleaddress" value={this.state.address} onChange={this.handleChange} placeholder="Address" />
      </FormGroup>
      <FormGroup>
        <Label for="examplePhone">Phone</Label>
        <Input type="text" name="phonenumber" id="examplephone" value={this.state.phonenumer} onChange={this.handleChange} placeholder="Phone" />
      </FormGroup>
      <Button color="primary" outline onClick={this.updateacc}>Update</Button> <Button style={{position:"absolute",right:6}} onClick={()=>{this.logout()}}>Logout</Button>
      </Form>

        </TabPane>
        <TabPane tabId="2">
         
        </TabPane>
      </TabContent>
    </div>
   
    </Modal>
   {/* {accout modal end} */}

    {/*  {navigataion} */}

  { !this.state.auth?<div>
     <h3 style={{color:"black",padding:10,display:"inline"}}>Logo</h3>
     <div style={{display:"inline",position:"absolute",right:0}}>
  <Button  onClick={()=>{this.carttoggle()}} style={{color:"black",padding:10,display:"inline",margin:5}} color="priamry" outline>My cart  <Badge color="secondary" >{cartlen}</Badge> </Button>
     <Button onClick={()=>{this.logintoggle()}} style={{color:"black",padding:10,display:"inline",margin:5}} color="priamry" outline>Login </Button>
     <Button  onClick={()=>{this.signuptoggle()}} style={{color:"black",padding:10,display:"inline",margin:5}} color="priamry" outline>Signup</Button>
   
       </div>
       <hr style={{borderBottom:"2px solid black"}}/>
       </div>:
       <div>
            <h3 style={{color:"black",padding:10,display:"inline"}}>Logo</h3>
            <div style={{display:"inline",position:"absolute",right:0}}>
            <Button  onClick={()=>{this.carttoggle()}} style={{color:"black",padding:10,display:"inline",margin:5}} color="priamry" outline>My cart  <Badge color="secondary" >{cartlen}</Badge> </Button>
            <Button onClick={()=>{this.acctoggles()}} style={{color:"black",padding:10,display:"inline",margin:5}} color="priamry" outline>Account</Button>
            </div>
            <hr style={{borderBottom:"2px solid black"}}/>
            </div>
   }
       <NotificationContainer/>
    </Container>
  )}
}
const mapStateToProps = state => {
  return { cartdata: state};
};


export default connect(mapStateToProps)(Header);