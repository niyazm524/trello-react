import {AxiosError} from "axios";

export type ToastPropsState = {
  isEnabled: boolean
  message: string
  duration: number
  type: 'success' | 'info' | 'warning' | 'error' | null
}
export type ToastAction =
  { type: 'SHOW_MESSAGE'; payload: string }
  | { type: 'SHOW_ERROR', payload: Error | AxiosError | string }
  | { type: 'HIDE_TOAST' }

function isAxiosError(e: any): e is AxiosError {
  return typeof e === 'object' && 'isAxiosError' in e && e['isAxiosError'] === true
}

// export class ShowMessageAction implements ToastAction { type: 'SHOW_MESSAGE'; payload: string }
// export interface ShowErrorAction extends ToastAction {type: 'SHOW_ERROR', payload: Error | AxiosError | string}

const initialState: ToastPropsState = {
  isEnabled: false,
  message: '',
  type: null,
  duration: 800
}


export default function toastReducer(state = initialState, action: ToastAction): ToastPropsState {
  switch (action.type) {
    case 'SHOW_MESSAGE':
      return {isEnabled: true, duration: 1800, message: action.payload, type: 'info'}
    case 'SHOW_ERROR':
      return {
        isEnabled: true,
        duration: 2400,
        message: isAxiosError(action.payload) ? action.payload.response?.data?.message || action.payload.message
          : (action.payload instanceof Error) ? action.payload.message
            : action.payload,
        type: 'error'
      };
    case 'HIDE_TOAST':
      return {...state, isEnabled: false}
    default:
      return state;
  }
}
