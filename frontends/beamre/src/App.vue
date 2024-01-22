<template>
    <div class="hero">
        <BridgeHeader />
        <RouterView />
        <SnackbarPop />
    </div>
</template>

<script>
// import { fetchPrices } from './scripts/token'
export default {
    async mounted() {
        // const prices = await fetchPrices()
        // if (prices) {
        //     Object.keys(prices).forEach(key => {
        //         let price = prices[key].qoute["USD"].price
        //         console.log(key, price);
        //         if (price) this.store.commit('setPrice', key, price)
        //     });
        // }
    }
};
</script>

<style scoped>
.hero {
    background-image: url('/images/hero.png');
    background-repeat: no-repeat;
    background-position: center -100px;
    background-size: 1360px;
    background-attachment: fixed;
}
</style>

<script setup>
import BridgeHeader from '../src/components/BridgeHeader.vue';
import SnackbarPop from './pops/SnackbarPop.vue';
</script>