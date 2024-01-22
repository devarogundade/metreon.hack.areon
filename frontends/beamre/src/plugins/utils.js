import Utils from '../utils';
import Converter from '../scripts/converter';
import Countdown from '../scripts/countdown';

export default {
    // eslint-disable-next-line no-unused-vars
    install: (app, options) => {
        app.config.globalProperties.$chains = () => {
            return Utils.chains();
        },
            app.config.globalProperties.$otherChains = () => {
                return Utils.otherChains();
            },
            app.config.globalProperties.$chain = (id) => {
                return Utils.chain(id);
            },
            app.config.globalProperties.$currencies = () => {
                return Utils.currencies();
            },
            app.config.globalProperties.$currenciesLP = (id) => {
                return Utils.currenciesLP(id);
            },
            app.config.globalProperties.$currenciesCN = (id) => {
                return Utils.currenciesCN(id);
            },
            app.config.globalProperties.$exactCurrency = (chainId, code) => {
                return Utils.exactCurrency(chainId, code);
            },
            app.config.globalProperties.$currencyAddress = (address) => {
                return Utils.currencyAddress(address);
            },
            app.config.globalProperties.$toMoney = (value, max) => {
                return Converter.toMoney(value, max);
            },
            app.config.globalProperties.$nFormat = (value, digits = 2) => {
                return Converter.nFormatter(value, digits);
            },
            app.config.globalProperties.$fromWei = (value) => {
                return Converter.fromWei(value);
            },
            app.config.globalProperties.$toWei = (value) => {
                return Converter.toWei(value);
            },
            app.config.globalProperties.$toDate = (value) => {
                return Countdown.toDate(value);
            };
    }
};