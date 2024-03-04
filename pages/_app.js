import { Provider } from "react-redux";
import { CounterStore, persistor } from "../store/store";
import { PersistGate } from "redux-persist/integration/react";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={CounterStore}>
      <PersistGate persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}
