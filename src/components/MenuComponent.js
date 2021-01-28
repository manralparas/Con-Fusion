import React from 'react';
import { Card, CardImg, CardImgOverlay,
    CardTitle,CardBody, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Link} from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/BaseUrl';


    function RenderMenuItem ({dish}) {
        
  
        return (
            <Card>
                <Link to={`/menu/${dish.id}`} >
                <CardImg width="100%" src={baseUrl+dish.image} alt={dish.name} className="menu__image"/>
                </Link>
                <CardBody>{dish.name}</CardBody>
            </Card>
        );
    }

    const Menu = (props) => {
        if (props.dishes.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.dishes.errMess) {
            return(
                <div className="container">
                    <div className="row"> 
                        <div className="col-12">
                            <h4>{props.dishes.errMess}</h4>
                        </div>
                    </div>
                </div>
            );
        }

        const menu = props.dishes.dishes.map((dish) => {
           
            
            return (
                <div className="col-12 col-md-5 m-1"  key={dish.id}>
                    <RenderMenuItem dish={dish} />
                </div>
            );
        });

        return (
            <div className="container">
                  <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Menu</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Menu</h3>
                        <hr />
                    </div>                
                </div>
            
                <div className="row">
                    {menu}
                </div>
            </div>
        );
    }

export default Menu;