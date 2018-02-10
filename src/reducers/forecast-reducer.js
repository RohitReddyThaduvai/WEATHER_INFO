import { FETCH_CURRENT_FORECAST } from '../actions';
import _ from 'lodash';

export default function (state = {}, action) {
    switch(action.type) {
        case FETCH_CURRENT_FORECAST:
            return action.payload.data.list;
        default:
            return state;
    }
}