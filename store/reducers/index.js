//* BURASI STANDART BİR YAPIDIR

import { combineReducers } from "redux";
import counterReducer from "./counterReducer";

//* Reducer'leri birleştiren yer (combineReducer).
//* Kaç tane reducer'iniz varsa burada birleştirip istediğiniz yerde kullanabilirsiniz

const rootReducer = combineReducers({
  counter: counterReducer,
});

export default rootReducer;
