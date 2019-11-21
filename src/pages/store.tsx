import { Dispatch } from 'redux';
import { IAction } from 'src/redux/reducer'
export interface IStoreData {
    memory: string[]
}
export const mapStateToProps = (state: IStoreData) => {
    return {
        memory: state.memory
}
}
export const setMemory = (memory: string[]):IAction => { 
        return {
          type: 'step',
          func: 'setMemory',
          memory
    }
}
export const mapDispatchToProps = (dispatch: Dispatch) => {
    return {

        setMemory:(memory:string[])=>dispatch(setMemory(memory)),

    };
};      
export interface IProps extends IStoreData {
setMemory: (memory:string[]) => void
}
