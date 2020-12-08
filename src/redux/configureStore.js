import {createStore,combineReducers, applyMiddleware} from 'redux';
import {Dishes} from './dishes';
import {Promotions} from './promotions';
import {Comments} from './comments';
import {Leaders} from './leaders';
import thunk from 'redux-thunk';
import { createForms } from 'react-redux-form';
import logger from 'redux-logger';
import {InitialFeedback} from './forms';


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers(
            {
                dishes:Dishes,
                leaders:Leaders,
                promotions:Promotions,
                comments:Comments,
                ...createForms({
                    feedback: InitialFeedback
                })
            }
        ),applyMiddleware(thunk,logger)
    );

    return store;
}