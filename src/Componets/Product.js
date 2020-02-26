
import React,{ useState }  from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button ,Row,Col, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import "./product.css"
import { connect } from "react-redux";
import { addCart } from "../actions/index";
import {NotificationContainer, NotificationManager} from 'react-notifications';


class  Product extends React.Component{
    constructor()
    {
        super();
        this.state={
            lcart:[],
            product:[
                {   id:1,
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
                },
                {
                    id:3,
                    pic:"https://images-na.ssl-images-amazon.com/images/I/51rcbSTb3aL._UL1100_.jpg",
                    title:"Glass",
                    price:10,
                    about:"Product mast haii",
                    stitle:"Google"
                },
                {
                    id:4,
                    pic:"https://images-na.ssl-images-amazon.com/images/I/51rcbSTb3aL._UL1100_.jpg",
                    title:"Glass",
                    price:30,
                    about:"Product mast haii",
                    stitle:"Google"
                },
                {
                    id:5,
                    pic:"https://images-na.ssl-images-amazon.com/images/I/51rcbSTb3aL._UL1100_.jpg",
                    title:"Glass",
                    price:20,
                    about:"Product mast haii",
                    stitle:"Google"
                }
            ],
            modaldata:{},
            modal:false
             
        }
    }
    toggle=(id)=>{
        this.setState({
        modal:!this.state.modal,
        modaldata:id
        })
 
    }




     
   createNotification = (type) => {
    return () => {
      console.log("hii");   
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
  
  book=(data)=>{
    let oldcart=this.state.lcart
    let c=oldcart.map(res=>{
        if(res.id==data.id)
        {
          return 1;
        }
        else
        {
            return 0;
        }
    })
    let flag=0
    for(let i=0;i<c.length;i++)
    {
         if(c[i]==1)
         {
             flag=1
             break;
         }
    } 
    if (!flag)
    {
        data["quantity"]=1;
        oldcart=[...this.state.lcart,data]
    }
    else{
         //notify already exist
    }
    console.log(c)
    this.setState({
        lcart:oldcart
    })
     console.log(oldcart)
     this.props.addCart(oldcart);
     this.createNotification("info")
 }
  
    render()
    {
        
        const a=this.state.product.map(data=>{
            return(
        <Col sm="3"xs="6" >
        <Card className="hvr-shrink cardwidth" >
        <CardImg top width="100%" src={data.pic} alt="Card image cap" className="proimg" height="200px"/>
        <CardBody style={{textAlign:"center"}}>
        <CardTitle>{data.title}</CardTitle>
        <CardSubtitle>{data.stitle}</CardSubtitle>
        <CardText>{data.about}</CardText>
        <h4>${data.price}</h4>
          </CardBody>
        {/* <button  className="btnstyle">ADD</button>   */}
        <Button className="btnstyle" onClick={()=>{this.toggle(data)}} >View</Button>
        </Card>
        </Col>
            )
        })
        const externalCloseBtn = <button className="close" style={{position:"absolute",right:15,border:"none"}} onClick={this.toggle}>&times;</button>
    return(
        <div>
    <Modal isOpen={this.state.modal} toggle={this.toggle} >
    <ModalHeader>{this.state.modaldata.title}{externalCloseBtn}</ModalHeader>
    <Card>
        <Row>
         <Col sm="4">
          <CardImg top width="100%" src={this.state.modaldata.pic} alt="Card image cap"  height="200px" style={{padding:20}}/>
          </Col>
          <Col sm="8">
        <CardBody style={{textAlign:"center"}}>
        <CardTitle>{this.state.modaldata.title}</CardTitle>
        <CardSubtitle>{this.state.modaldata.stitle}</CardSubtitle>
        <CardText>{this.state.modaldata.about}</CardText>
        <h4>${this.state.modaldata.price}</h4>
        <button onClick={()=>{this.book(this.state.modaldata)}}  className="btnstylemodal">ADD</button>  
        </CardBody>
        </Col>
        </Row>
        </Card>
      </Modal>
        <Row style={{margin:0}}>
        {a}
        </Row>
        <NotificationContainer/>
      </div>
       
    )
    }
}


function mapDispatchToProps(dispatch) {
    return {
      addCart: data => dispatch(addCart(data))
    };
  }
  

export default connect(null,mapDispatchToProps)(Product);