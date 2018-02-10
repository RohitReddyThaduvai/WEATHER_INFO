import { FETCH_CURRENT_WEATHER } from '../actions';

export default function (state = {}, action) {
    switch(action.type) {
        case FETCH_CURRENT_WEATHER:
            return action.payload.data;
        default:
            return state;
    }
}