import { IAction } from 'src/redux/reducer';
export interface IStoreData {
    memory: string[]
}
export const setMemory = (memory: string[]):IAction => { 
        return {
          type: 'step',
          func: 'setMemory',
          memory
    }
}
