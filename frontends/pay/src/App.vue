<template>
    <div class="hero">
        <PayHeader />
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
    background-image: url('/images/bg.png');
    background-repeat: repeat-y;
    background-position: center top;
    background-attachment: fixed;
    background-size: 1350px;
}
</style>

<script setup>
import PayHeader from '../src/components/PayHeader.vue';
import SnackbarPop from './pops/SnackbarPop.vue';
</script>