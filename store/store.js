//* BURASI STANDART BİR YAPIDIR

import { createStore } from "redux";
import rootReducer from "./reducers";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

//* redux-persist. Verilerin saklanması silinmemesi için
//* Store'ların localStorage'de saklanması kısaca

const persistConfig = {
  key: "root",
  storage,
};

//*kalııcı hale getirme

const persistedReducer = persistReducer(persistConfig, rootReducer);

const CounterStore = createStore(persistedReducer);
const persistor = persistStore(CounterStore);

export { CounterStore, persistor };
