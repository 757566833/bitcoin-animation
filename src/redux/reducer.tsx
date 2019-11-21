import INITIAL_STATE, { IState } from './state';
export type IAction =
    | {
    type: 'step',
    func: 'setMemory',
    memory: string[]
}
  
const reducer = (state: IState = INITIAL_STATE, action:IAction): IState => {
    switch (action.type) {
        case 'step':
            switch (action.func) {    
                case 'setMemory':
                    return {
                        ...state,
                        memory: action.memory
                    };
                  
                default:
                    return state;
            }
        default:
            return state;
    }
}
export default reducer;
