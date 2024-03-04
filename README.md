## PROP DRILLING

-Component'ler arasında props ile değişkenleri nasıl aktaracağımızı gördük. Örneğin Home.jsx component'inden ContactForm component'ine veya ProductInfo component'ine kolaylıkla props aktarabiliyoruz (Yukarıdan aşağıya doğru - Parent'tan Child'a doğru).

-Ancak ContactForm component'inden Home.jsx (Child'tan Parent'a) component'ine veya ContactForm'dan ProductInfo (Child'tan Child'a) component'inde data göndermek kolay olmayacaktır. Bu gibi durumlarda data'nın aşağıdan yukarıya veya yatay olarak taşınması zorluk çıkartacaktır. Bu sorun 'Prop Drilling' olarak adlandırılır.

- Bunun çözümü için Redux gibi araçlar kullanılabilir.

## useState ve useEffect Hook'ları

- React içinde oluşturduğumuz değişkenler reaktif değildir. Yani const counter = 0 şeklinde açtığımız bir değişkeni React içerisinde counter = counter + 1 şeklinde güncellememiz mümkün değildir. Bunu useState Hook'u ile yapmamız gerekecektir. State değerini setState şeklinde (ör: setCounter) güncelleyebiliriz:

```
import { useState } from "react";

export default function Counter() {
  const [counter, setCounter] = useState(0);

    useEffect(() => {
    alert("Sayfa yüklendi");
    }, []);

  useEffect(() => {
    alert("Counter değişti");
  }, [counter]);

  return (
    <>
      <button onClick={() => { setCounter(counter - 1); }}>
        Azalt
      </button>
    </>
  );
}
```

## Redux

- İlk önce ihtiyaç duyulan paketler ` npm install redux` ve `npm install react-redux` komutları ile yüklenir
- store > reducers klasörü altında bir reducer oluşturulur (Ör: counterReducer.js) ve store üzerinde başlangıç değeri ve yapılacak olan fonksiyonel işlemler tanımlanır (action):

```
const initialState = {
    count: 0,
}

const counterReducer = (state = initialState, action) => {
    switch (action.type){
        case 'INCREMENT':
            return {count: state.count + 1};
        case 'DECREMENT':
            return {count: state.count - 1};
        default:
            return state;
    }
}

export default counterReducer;
```

- reducers > index.js içerisinde oluşturulan reducer'lar combine edilerek tek bir reducer altında derlenir:

```
import { combineReducers } from "redux";
import counterReducer from './counterReducer';

const rootReducer = combineReducers({
    counter: counterReducer
})

export default rootReducer;
```

- store > store.js içerisinde oluşturulan store'lar (rootReducer bizim combine edilmiş olan yapımız olduğu için tek tek tanımlama yapmaya ihtiyaç kalmadı) tanımlanır:

```
import {createStore} from 'redux';
import rootReducer from './reducers';

const CounterStore = createStore(rootReducer);

export {CounterStore}
```

- Proje içerisindeki bütün component'lerden store'umuza erişebilmek için \_app.js içerisinde aşağıdaki wrap işlemi yapılır:

```
import { Provider } from 'react-redux'
import {CounterStore} from '../store/store';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return(
    <Provider store={CounterStore}>
      <Component {...pageProps} />
    </Provider>
  )
}
```

\*\* Güncelleme - Dispatch işlemi

```

import { useDispatch } from "react-redux";

export default function CounterButtons(){

    const counterUpdate = useDispatch();

    return(
        <div className='w-full m-5 flex gap-5'>
             <button
        className="bg-red-500 text-white px-4 py-2 rounded"
        onClick={() => {
          counterUpdate({type: 'INCREMENT'})
        }}
      >
        Artır
      </button>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => {
          counterUpdate({type: 'DECREMENT'})
        }}
      >
        Azalt
      </button>
        </div>
    )
}
```

\*\* Store'dan bir state almak için useSelector metodu kullanılarak alınmak istenen state belirtilir:

```
import CounterButtons from "@/components/CounterButtons";
import { useSelector } from "react-redux";

export default function Counter() {
  let counterValue = useSelector((state) => state.counter.count)
  return (
    <>
      <b>Sayaç: {(counterValue)}</b>
     <CounterButtons />
    </>
  );
}
```

- Redux-Persist ile store'ların localStorage'da saklanması

Normal bir redux yapısı entegre edildiğinde, sayfa yenilendiğinde veya değiştiğinde store değerlerimiz initialState durumuna geri döner yani ilk haline sıfırlanır. Bu paket sayesinde state'lerimizin sıfırlanmasının önüne geçmiş oluyoruz:

```
npm i redux-persist
```

- Paket kurulduktan sonra store > store.js içerisinde dokümantasyonda anlatılan yapılandırmalar gerçekleştirilir ve reducer'ımız persist - kalıcı hale bürünmüş olur:

```
import {createStore} from 'redux';
import rootReducer from './reducers';
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const CounterStore = createStore(persistedReducer);
const persistor = persistStore(CounterStore);

export {CounterStore, persistor}
```

- Son olarak \_app.js içerisinde aşağıdaki wrap işlemi yapılır:

```
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
```

- Böylece artık reducer'larımız ve store'larımız kalıcı hale bürünecektir.

\*\* API / Servis İstekleri

Bir API'ye istek göndermek için axios paketini tercih etmekteyiz:

```
npm install axios
```

komutu ile projeye axios paketi dahil edilir.

- Kullanmak istediğimiz component içerisinde axios paketi çağrılır:

```
import axios from "axios"
```

-
