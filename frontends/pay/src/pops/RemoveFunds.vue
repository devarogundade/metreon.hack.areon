<template>
    <div class="container">
        <div class="add_funds_rect">
            <div class="rect_header">
                <h3>Remove Funds</h3>
                <CloseIcon2 @click="$emit('close')" />
            </div>

            <div class="input_rect">

                <div class="toolbar">
                    <p>From</p>
                    <div>
                        <img :src="app.image" alt="">
                        <p>{{ app.name }}</p>
                    </div>
                </div>

                <div class="input">
                    <div class="max">Max</div>
                    <input type="number" v-model="amount" placeholder="0.00">
                    <div class="currency">
                        <img :src="chain.image" alt="">
                        <p>{{ chain.name }}</p>
                    </div>
                </div>

                <div class="from_balance">
                    <p>~${{ ($store.state.prices[chain.symbol] * amount).toFixed(2) }}</p>
                    <p>dApp Bal: <span>{{ $toMoney(app.balance) }}</span></p>
                </div>
            </div>

            <div class="note"><span>Note:</span> Provided funds would be used to fund user’s dApp transactions.</div>

            <PrimaryButton @click="remove" :text="'Remove'" :color="'var(--sm-red)'" :bg="'rgba(240, 105, 121, 0.08)'"
                :progress="removing" />
        </div>
    </div>
</template>

<script setup>
import CloseIcon2 from '../components/icons/CloseIcon2.vue';
import PrimaryButton from '../components/PrimaryButton.vue';
</script >

<script>
import { notify } from '../reactives/notify';
import { withdrawFromApp } from '../scripts/app';
import { connectMetaMask } from '../scripts/auth';
export default {
    props: ['app'],
    data() {
        return {
            removing: false,
            chain: this.$chain(this.app.chainId),
            amount: ''
        };
    },
    methods: {
        auth: async function () {
            const chainId = this.$store.state.activeEvm;
            const chain = this.$chain(chainId);
            const result = await connectMetaMask(chain);
            if (result.status == 'error') {
                notify.push({
                    'title': 'Connection failed',
                    'description': result.data.message,
                    'category': 'error'
                });
                return;
            }
            this.$store.commit('setAccount', result.data);
        },

        remove: async function () {
            if (this.removing) return;

            if (this.amount == '') {
                notify.push({
                    title: "Enter amount",
                    description: "Field is required!",
                    category: "error"
                });
                return;
            }

            if (this.amount > this.app.balance) {
                notify.push({
                    title: "Insufficient funds",
                    description: "Amount too large!",
                    category: "error"
                });
                return;
            }

            this.removing = true;

            if (this.chain.category == 'EVM') {
                this.$store.commit('setActiveEvm', this.chain.id);
                await this.auth();
            }

            const hash = await withdrawFromApp(
                this.app.contractId,
                this.chain,
                this.$toWei(this.amount)
            );

            if (hash) {
                notify.push({
                    title: "Transaction sent",
                    description: "Coin withdrawn successfully!",
                    category: "success"
                });
            } else {
                notify.push({
                    title: "Transaction not set",
                    description: "Try again!",
                    category: "error"
                });
            }

            this.removing = false;
        }
    }
};
</script>

<style scoped>
.container {
    position: fixed;
    top: 0;
    left: 0;
    border-radius: 8px;
    background: rgba(5, 7, 8, 0.70);
    backdrop-filter: blur(2px);
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.rect_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.rect_header svg {
    border-radius: 14px;
    border: 2px solid var(--Background-BG-400, #0A1D2E);
    background: var(--Background-BG-200, #03090F);
    padding: 9px;
    width: 38px;
    height: 38px;
    cursor: pointer;
    user-select: none;
}

.add_funds_rect {
    border-radius: 8px;
    border: 2px solid var(--bg-lighter, #0C171A);
    background: var(--bg-light, #0D1112);
    width: 480px;
    padding: 24px;
}

.add_funds_rect h3 {
    color: var(--tx-normal, #EEF1F8);
    font-size: 16px;
    font-style: normal;
    font-weight: 800;
    line-height: 120%;
    /* 19.2px */
    letter-spacing: 0.32px;
}

.input_rect {
    border-radius: 8px;
    background: var(--Background-BG-300, #03101C);
    margin-top: 50px;
    padding: 20px;
}

.toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 20px;
    border-image: linear-gradient(to right, var(--pr-light) 3%, var(--bg-lightest) 3%, var(--bg-lightest) 97%, var(--pr-light) 97%) 1;
    border-bottom-width: 1px;
    border-bottom-style: solid;
}

.toolbar>p {
    color: var(--tx-dimmed, #66676C);
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
    /* 19.2px */
    letter-spacing: 0.32px;
}

.toolbar>div {
    display: flex;
    align-items: center;
    gap: 8px;
}

.toolbar>div img {
    width: 16px;
    height: 16px;
    border-radius: 2px;
    object-fit: cover;
}

.toolbar>div p {
    color: var(--tx-dimmed, #66676C);
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    /* 16px */
    letter-spacing: 0.32px;
}

.input {
    display: flex;
    margin-top: 20px;
    align-items: center;
    gap: 16px;
}

.max {
    padding: 3px 6px 4px 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 3px;
    background: var(--bg-lightest, #11282E);
    color: var(--primary-primary, #9FD629);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
    /* 16.8px */
    letter-spacing: 0.28px;
}


.input input {
    width: 100%;
    color: var(--text-normal, #EEF1F8);
    font-size: 20px;
    font-style: normal;
    font-weight: 900;
    line-height: 100%;
    /* 20px */
    letter-spacing: 0.4px;
    background: transparent;
    border: none;
    outline: none;
}

.input .currency {
    display: flex;
    align-items: center;
    gap: 6px;
    position: relative;
}

.currency img {
    width: 24px;
    height: 24px;
    border-radius: 12px;
}

.currency p {
    color: var(--text-normal, #EEF1F8);
    font-size: 16px;
    font-style: normal;
    font-weight: 800;
    line-height: 100%;
    /* 16px */
    letter-spacing: 0.32px;
}

.currency>svg {
    margin-left: 2px;
}


.from_balance {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
}

.from_balance p {
    color: var(--text-dimmed, #66676C);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
    /* 16.8px */
    letter-spacing: 0.28px;
}

.from_balance p span {
    color: var(--text-normal, #EEF1F8);
    font-weight: 800;
}

.note {
    color: var(--text-semi-d, #95979D);
    font-family: Avenir;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
    text-align: center;
    margin: 40px 0;
    letter-spacing: 0.28px;
    padding: 0 50px;
}

.note span {
    color: var(--primary-light, #B1CC8F);
}
</style>