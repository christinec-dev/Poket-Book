import React from 'react';
import {Container, Row} from 'react-bootstrap';

function Clips() {
    return (
        <Container>
            <Row>
                <div className="clip">
                    <div className="clip">
                        <img src="css/images/clip.png" alt=""></img>
                    </div>      
                </div>
            </Row>
        </Container>
    );
  }
  
//Exports Header Component to be used in app.js
export default Clips;