import React from 'react';
import './index.css';
import store from '../redux/store';
import { Provider } from 'react-redux';
const BasicLayout: React.FC = props => {
  return (
    <Provider store={store}>
      <div className='normal'>

        {props.children}
      </div>
    </Provider>
  );
};

export default BasicLayout;

/*************************************************************************************
* import store from '../redux/store';                             ********************
* import { Provider } from 'react-redux';                         ********************
* const BasicLayout = props => {                        ********************
* ...                                                             ********************
*     return (                                                    ********************
*         <Provider store={store}>                                ********************
*             ...                                                 ********************
*         </Provider>                                             ********************
*     )                                                           ********************
* }                                                               ********************
**************************************************************************************
*/
