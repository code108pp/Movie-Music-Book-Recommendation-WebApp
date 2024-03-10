import { combineReducers } from 'redux';

import genreSelector from './genreSelector';
import authReducer from './auth';
import watchCount from './watchCount';

export default combineReducers({ genreSelector, authReducer, watchCount });