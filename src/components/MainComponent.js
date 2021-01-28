import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import {Switch,Route,Redirect,withRouter} from 'react-router-dom';
import Contact from './ContactComponent';
import About from './Aboutus';
import { connect } from 'react-redux';
import { postComment,fetchDishes,fetchComments,fetchPromos,postFeedback,fetchLeaders} from '../redux/ActionCreator';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapDispatchToProps=dispatch=>({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchPromos:()=>{dispatch(fetchPromos())},
  fetchComments:()=>{dispatch(fetchComments())},
  postFeedback:(values)=>{dispatch(postFeedback(values))},
  fetchLeaders:()=>{dispatch(fetchLeaders())},
});

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}
class Main extends Component {


  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId});
  }
  componentDidMount(){
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render() {

    const DishWithId=({match})=>{
      return(
        <DishDetail 
        dish={this.props.dishes.dishes.filter((dish)=>dish.id===parseInt(match.params.dishId,10))[0]}
        comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} 
        isLoading={this.props.dishes.isLoading}
        errMess={this.props.dishes.errMess}
        postComment={this.props.postComment}
        commentsErrMess={this.props.comments.errMess}/>

      );
    }
   
      const HomePage=()=>{
        return(<Home 
          dish={this.props.dishes.dishes.filter((dish)=>dish.featured)[0]}
          leader={this.props.leaders.leaders.filter((leader)=>leader.featured)[0]}
          leaderLoading={this.props.leaders.isLoading}
          leaderErrMess={this.props.leaders.errMess}
          promo={this.props.promotions.promotions.filter((promo)=>promo.featured)[0]}
          promoLoading={this.props.promotions.isLoading}
          promoErrMess={this.props.promotions.errMess}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMes={this.props.dishes.errMess}
        />);
      }
      return (     <div>
        <Header />
        <TransitionGroup>
        <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
          <Switch>
                <Route path='/home' component={HomePage} />
                <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
                <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} />
                <Route path='/menu/:dishId' component={DishWithId} />
                <Route exact path='/aboutus' component={()=><About leaders={this.props.leaders.leaders} />} />
                <Redirect to="/home" />
            </Switch>
            </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    
    );
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));