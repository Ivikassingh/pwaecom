
import React from 'react';
import { Form, FormGroup, Label, Input, FormText,Container,Row,Col} from 'reactstrap';


const Search=()=>{
    return(
        <Container>
        <Row>
            <Col sm={{ size: 5, offset:5 }}>
             <h2>Product List</h2>
            </Col>
          </Row> 
          <Row> 
            <Col sm={{ size: 4, offset: 4 }}>
            <FormGroup>
        <Input
          type="search"
          name="search"
          id="exampleSearch"
          placeholder="search"
        />
      </FormGroup>
      </Col>
        </Row>
        

      </Container>
    )
}

export default Search