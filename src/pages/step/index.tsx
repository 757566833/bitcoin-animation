import React from 'react';
import styles from './index.css';
// import { useSelector, useDispatch } from 'react-redux'
// import * as store from './store'
const Step = (props:any) => {
  // const dispatch = useDispatch();
  // 如果不关注callback 这两个是不需要使用的
  // const xxx = useSelector(useCallback((storeData: store.IStoreData) => storeData.xxx, []))
  // const click = useCallback(() => {
  //   dispatch(store.xxx('xxx'))
  // }, [])
  // redux相关api
  // const click = () => dispatch(store.xxx('xxx'))
  // const xxx = useSelector((storeData: store.IStoreData) => storeData.xxx)
    return (
        <div className={styles.normal}>
          step
        </div>
    );
};
              
export default Step;
