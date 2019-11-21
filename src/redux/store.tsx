import { createStore, Store } from 'redux';
import reducer, { IAction } from './reducer';
import { IState } from './state';
const store: Store<IState, IAction> = createStore(reducer);
export default store;      
