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
  CardBody

} from 'reactstrap';
import {NotificationContainer, NotificationManager} from 'react-notifications';
 
import "./nav.css"
class  AuthHeader extends Component {

   constructor()
   {
     super()
     this.state={
      loginmodal:false,
      signupmodal:false,
      cartmodal:false,
      auth:true,
      cartdata:[
      {
        id:1,
        pic:"https://images-na.ssl-images-amazon.com/images/I/51rcbSTb3aL._UL1100_.jpg",
        title:"Glass",
        price:10,
        about:"Product mast haii",
        stitle:"Google"
      },
   
      {  
        id:2,
        pic:"https://images-na.ssl-images-amazon.com/images/I/51rcbSTb3aL._UL1100_.jpg",
        title:"Glass",
        price:10,
        about:"Product mast haii",
        stitle:"Google"
      }
  ]

     }
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

 } 
  
 authlogin=()=>{

 }
 authSignup=()=>{

 }


   render()
   {

    const externalCloseBtnLogin = <button className="close" style={{position:"absolute",right:15,border:"none"}} onClick={this.logintoggle}>&times;</button>
    const externalCloseBtnSignup = <button className="close" style={{position:"absolute",right:15,border:"none"}} onClick={this.signuptoggle}>&times;</button>
    const externalCloseBtnCart = <button className="close" style={{position:"absolute",right:15,border:"none"}} onClick={this.carttoggle}>&times;</button>
    


  return (
    <Container fluid >
    {/* {login modal } */}
    <Modal isOpen={this.state.loginmodal} toggle={this.logintoggle}>
    <ModalHeader>Login  From{externalCloseBtnLogin}</ModalHeader>
    <Form style={{margin:10}}>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input type="email" name="email" id="exampleEmail" placeholder="Enter email" />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input type="password" name="password" id="examplePassword" placeholder="Password" />
      </FormGroup>
      <Button color="primary" outline onSubmit={this.authlogin}>Login</Button> <Button style={{position:"absolute",right:6}} onClick={()=>{this.signuptoggle()}}>Create New</Button>
      </Form>
    
    </Modal>
   {/* {signup modal} */}
   <Modal isOpen={this.state.signupmodal} toggle={this.signuptoggle} >
    <ModalHeader>Signup  From{externalCloseBtnSignup}</ModalHeader>
    <Form style={{margin:10}}>
      <FormGroup>
      <FormGroup>
        <Label for="fname">Full Name</Label>
        <Input type="text" name="fname" id="fname" placeholder="Enter Name" />
      </FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input type="email" name="email" id="exampleEmail" placeholder="enter email"/>
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input type="password" name="password" id="examplePassword" placeholder="password" />
      </FormGroup>
      <Button color="primary" outline onSubmit={this.authSignup}>Signup</Button> <Button style={{position:"absolute",right:6}} onClick={()=>{this.logintoggle()}}>Already Have Account</Button>
      </Form>
    
    </Modal>

    {/* {my cart} */}

   <Modal isOpen={this.state.cartmodal} toggle={this.carttoggle} >
    <ModalHeader>Cart{externalCloseBtnCart}</ModalHeader>
     {this.state.cartdata.map(res=>{

    return(
    <Card>
        <Row>
         <Col sm="4">
          <CardImg top width="100" src={res.pic} alt="Card image cap"  height="100px" style={{padding:20}}/>
          </Col>
          <Col sm="8">
 
        <CardBody style={{textAlign:"center"}}>
        <Row>
        <Col sm="6">  
         <Form> 
        <FormGroup>
        <Input type="number" name="quantity" min="0" placeholder="quantity" />
        </FormGroup>
       </Form>
       </Col>
       <Col sm="6">
        <Button>Remove</Button>
        </Col>  
        </Row>
        </CardBody>
        </Col>
        </Row>
        </Card>)})}


        <Row>
          <Col sm="6">
          </Col>
          <Col sm="6">
           <Button style={{position:"relative",right:0}}   onClick={this.createNotification('info')}>Checkout</Button>
           </Col> 
        </Row>
    
    </Modal>
    {/*  {navigataion} */}
    
    {this.state.authfsdsd?
    <div>
     <h3 style={{color:"black",padding:10,display:"inline"}}>Logo</h3>
     <div style={{display:"inline",position:"absolute",right:0}}>
     <Button  onClick={()=>{this.carttoggle()}} style={{color:"black",padding:10,display:"inline",margin:5}} color="priamry" outline>My cart  <Badge color="secondary" >0</Badge> </Button>
     <Button onClick={()=>{this.logintoggle()}} style={{color:"black",padding:10,display:"inline",margin:5}} color="priamry" outline>Login </Button>
     <Button  onClick={()=>{this.signuptoggle()}} style={{color:"black",padding:10,display:"inline",margin:5}} color="priamry" outline>Signup</Button>
     </div>
     <hr style={{borderBottom:"2px solid black"}}/>
     </div>
     :
     <div>
     <h3 style={{color:"black",padding:10,display:"inline"}}>Logo</h3>
     <div style={{display:"inline",position:"absolute",right:0}}>
     <Button  onClick={()=>{this.carttoggle()}} style={{color:"black",padding:10,display:"inline",margin:5}} color="priamry" outline>My cart  <Badge color="secondary" >0</Badge> </Button>
     <Button onClick={()=>{this.logintoggle()}} style={{color:"black",padding:10,display:"inline",margin:5}} color="priamry" outline>Account</Button>
     </div>
     <hr style={{borderBottom:"2px solid black"}}/>
     </div>
    }
    
       <NotificationContainer/>
    </Container>
  )
}
}

export default AuthHeader;