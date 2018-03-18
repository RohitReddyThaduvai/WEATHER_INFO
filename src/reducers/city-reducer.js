import { FETCH_CURRENT_WEATHER } from '../actions';
import _ from 'lodash';

export default function (state = [], action) {
    switch(action.type) {
        case FETCH_CURRENT_WEATHER:
            return [action.payload.data.city.name, ...state ];
        default:
            return state;
    }
}