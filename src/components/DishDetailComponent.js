import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle,Button} from 'reactstrap';
import {LocalForm,Control,Errors} from 'react-redux-form';
import { Loading } from './LoadingComponent';
import {ModalBody,Modal,ModalHeader,Label} from 'reactstrap';
import { baseUrl } from '../shared/BaseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';


const maxLength=(len)=>(val)=>!(val)||(val.length<=len);
const minLength=(len)=>(val)=>(val)&&(val.length>=len);

class CommentForm extends Component{
    constructor(props)
    {   super(props)
        this.onSubmit=this.onSubmit.bind(this);
    }

onSubmit(values)
{
    this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    alert(JSON.stringify(values));
}
render(){
return(
    <div>
             <Modal isOpen={this.props.value} toggle={this.props.toggle}>
                 <ModalHeader toggle={this.props.toggle}>Submit Comment</ModalHeader>
                 <ModalBody>
                     <LocalForm className="form-group" onSubmit={(values)=>this.onSubmit(values)}>
                     <div className="form-group">
                     <Label htmlFor="Rating" >Rating</Label>
                      <Control.select model=".rating" name="rating"
                        className="form-control">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Control.select>
                        </div>

                        <div className="form-group">
                     <Label htmlFor="name" >Your Name</Label>
                      <Control.text model=".author" name="author"
                        validators={{maxLength:maxLength(15),minLength:minLength(3)}}
                        className="form-control"
                    />
                    <Errors
                    className="text-danger"
                    model=".name"
                    show="touched"
                    messages={
                        {
                            
                            maxLength:"word must be lesser than 15 character",
                            minLength:"word must be greater than 3 character"
                        }
                    }
                    />
                        
                
                        </div>
                    
                    <div className="form-group">
                    <Label htmlFor="comment">Comment</Label>
                        <Control.textarea model=".comment" name="comment" className="form-control"
                        rows="6"></Control.textarea>

                    </div>
                  
                   
                    <Button type="submit" color="primary">Submit</Button>
                     </LocalForm>

                 </ModalBody>

                </Modal>
    </div>


        );
    }
}



class DishDetail extends Component{

    constructor(props)
    {
        super(props);
        this.state=
            {
                isButtonClick:false
            };
        this.toggleModal=this.toggleModal.bind(this);
       
    }    
    toggleModal(){
        this.setState(
            {
                isButtonClick:!this.state.isButtonClick
            }
        );

    }
    

render(){

    const renderComment=(comment)=>{
        
        if (comment != null)
        
                var x= comment.map((com)=>
           { return( 
            <Stagger in>
               <Fade in>
                 <ul>
                    <li className="list-unstyled">{com.comment}</li>
                    <li className="list-unstyled">--{com.author},{com.date}</li>
                    
                 </ul>
                 </Fade>
                 </Stagger>
                
           );
           
      
        

    });  
            else
               return(
                 <div></div>
                      );

    return(x
    );
    
}

   
    const renderDish=(dish)=> {

        if (dish != null)
           { return(

            <FadeTransform
            in
            transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
            }}>
                <Card>
                    <CardImg top src={baseUrl+dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
            );
        
        }
        else
            return(
                <div></div>
            );


    }

    if (this.props.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (this.props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{this.props.errMess}</h4>
                </div>
            </div>
        );
    }

        return(
            <div className="container">
                <div className="row">
                     <div className="col-12 col-md-5 m-1">
                    {renderDish(this.props.dish)}
                      </div>
                    <div className="col-12 col-md-5 ">
                         <h4>Comments</h4>
                     {this.props.dish !=null?renderComment(this.props.comments):null}
                        <Button outline onClick={this.toggleModal}><span className="fa fa-comment"></span>Comment</Button>
                        <CommentForm value={this.state.isButtonClick} toggle={this.toggleModal} comments={this.props.comments}
                        postComment={this.props.postComment}
                            dishId={this.props.dish.id}/>
                     </div> 
            
            
                  </div>

                 
               
            </div> 

           
            
        );
    }
}

   

export default DishDetail;