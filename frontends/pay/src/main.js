import './assets/main.css';

import { createApp } from 'vue';
import { createStore } from 'vuex';

import App from './App.vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import router from './router';
import utils from './plugins/utils';

const store = createStore({
    state() {
        return {
            account: '',
            activeEvm: 462,
            prices: {
                "USDT": 0.9999,
                "USDC": 1.0001,
                "AREA": 0,
                "WAREA": 0,
                "MATIC": 0.54,
                "WMATIC": 0.54,
                "BNB": 302,
                "WBNB": 302,
            }
        };
    },
    mutations: {
        setAccount(state, account) {
            state.account = account;
        },
        setPrice(state, key, value) {
            state.prices.key = value;
        },
        setActiveEvm(state, chainId) {
            state.activeEvm = chainId;
        }
    }
});


const app = createApp(App);

app.use(router);
app.use(VueAxios, axios);
app.use(utils);
app.use(store);

app.mount('#app');
