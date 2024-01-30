<template>
    <section id="section">
        <div class="app_width">
            <div class="container">
                <div class="bridge_rect">
                    <div class="bridge_rect_toolbar">
                        <p>Bridge</p>
                        <RefreshIcon @click="refreshAllowance(); refreshBalance()" />
                    </div>

                    <div class="form_rect" :style="{ transform: interchange ? 'translateY(275px)' : '' }">
                        <div class="from_toolbar">
                            <p class="from_label0">{{ interchange ? 'To' : 'From' }}</p>
                            <div class="from_chain">
                                <div class="active_from_chain" @click="froming = !froming">
                                    <img :src="bridge.from.chain.image" alt="">
                                    <p>{{ bridge.from.chain.name }}</p>
                                    <ArrowDownIcon />
                                </div>

                                <!-- dropdown -->
                                <div class="inactive_from_chains" v-show="froming" @click="froming = !froming"
                                    :style="{ top: interchange ? '-35px' : '205px' }">
                                    <div class="chain" v-for="chain, index in $otherChains()"
                                        @click="bridge.from.chain = chain; bridge.currency = $currenciesCN(bridge.from.chain.id)[0]"
                                        :key="index">
                                        <img :src="chain.image" alt="">
                                        <p>{{ chain.name }}</p>
                                        <SemanticGreen v-if="bridge.from.chain.id == chain.id" />
                                        <SemanticGreen v-else-if="bridge.to.chain.id == chain.id" />
                                    </div>
                                </div>
                            </div>
                            <div class="from_connection" @click="auth" v-if="$store.state.account == ''">
                                <SemanticRed />
                                <p>Connect</p>
                            </div>
                            <div class="from_connection" v-else>
                                <SemanticGreen />
                                <p>Connected</p>
                            </div>
                        </div>

                        <div class="from_input">
                            <div class="est" v-if="interchange">Est.</div>
                            <div class="max" v-else
                                @click="$fromWei(bridge.balance0) > 100 ? bridge.amount = 100 : bridge.amount = balance0">
                                Max</div>
                            <input type="number" v-model="bridge.amount" placeholder="0.00">
                            <div class="currency" @click="coining = !coining">
                                <img :src="bridge.currency.image" alt="">
                                <p>{{ bridge.currency.symbol }}</p>
                                <ArrowDownIcon v-if="!interchange" />

                                <!-- dropdown -->
                                <div class="inactive_from_currencies" v-if="coining && !interchange">
                                    <div class="currency" v-for="currency, index in $currenciesCN(bridge.from.chain.id)"
                                        @click="changeCurrency(currency)" :key="index">
                                        <img :src="currency.image" alt="">
                                        <p>{{ currency.name }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="from_balance">
                            <p>~${{ $toMoney(($store.state.prices[bridge.currency.symbol] * bridge.amount)) }}</p>
                            <p>Bal: <span>{{ $toMoney($fromWei(bridge.balance0)) }}</span></p>
                        </div>

                    </div>

                    <div class="inter_change" @click="interchange = !interchange">
                        <div class="inter_change_border"> </div>
                        <SwapIcon :style="{ transform: interchange ? 'rotate(180deg)' : '' }" />
                    </div>

                    <div class="to_rect" :style="{ transform: interchange ? 'translateY(-280px)' : '' }">
                        <div class="to_toolbar">
                            <p class="from_label0">{{ !interchange ? 'To' : 'From' }}</p>
                            <div class="to_chain">
                                <div class="active_to_chain">
                                    <img :src="bridge.to.chain.image" alt="">
                                    <p>{{ bridge.to.chain.name }}</p>
                                </div>
                            </div>
                            <div class="to_connection" @click="auth" v-if="$store.state.account == ''">
                                <SemanticRed />
                                <p>Connect</p>
                            </div>
                            <div class="to_connection" v-else>
                                <SemanticGreen />
                                <p>Connected</p>
                            </div>
                        </div>

                        <div class="to_input">
                            <div class="est" v-if="!interchange">Est.</div>
                            <div class="max" v-else
                                @click="$fromWei(bridge.balance1) > 100 ? bridge.amount = 100 : bridge.amount = balance1">
                                Max</div>
                            <input type="number" v-model="bridge.amount" placeholder="0.00">
                            <div class="currency" @click="coining = !coining">
                                <img :src="$exactCurrency(bridge.to.chain.id, bridge.currency.code).image" alt="">
                                <p>{{ $exactCurrency(bridge.to.chain.id, bridge.currency.code).symbol }}</p>
                                <ArrowDownIcon v-if="interchange" />

                                <!-- dropdown -->
                                <div class="inactive_from_currencies" v-if="coining && interchange">
                                    <div class="currency" v-for="currency, index in $currenciesCN(bridge.from.chain.id)"
                                        @click="changeCurrency(currency)" :key="index">
                                        <img :src="currency.image" alt="">
                                        <p>{{ currency.name }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="to_balance">
                            <p>~${{ $toMoney(($store.state.prices[bridge.currency.symbol] * bridge.amount)) }}</p>
                            <p>Bal: <span>{{ $toMoney($fromWei(bridge.balance1)) }}</span></p>
                        </div>
                    </div>

                    <div class="view_route">
                        <PrimaryButton v-if="allowance < bridge.amount" :progress="approving"
                            :text="'Approve ' + bridge.currency.symbol" @click="approve" />
                        <PrimaryButton v-else :progress="bridging || approving" :text="'Bridge'" @click="useBridge" />
                    </div>

                    <div class="schedule">
                        <div class="est_time">
                            <p>Est. time</p>
                            <div>
                                <TimeIcon />
                                <p>1 - 2 mins</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import ArrowDownIcon from '@/components/icons/ArrowDownIcon.vue';
import RefreshIcon from '@/components/icons/RefreshIcon.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import SemanticGreen from '@/components/icons/SemanticGreen.vue';
import SemanticRed from '@/components/icons/SemanticRed.vue';
import SwapIcon from '@/components/icons/SwapIcon.vue';
import TimeIcon from '@/components/icons/TimeIcon.vue';
</script>

<script>
import { connectMetaMask } from '../scripts/auth';
import { bridgeEVM } from '../scripts/bridge';
import { notify } from '../reactives/notify';
import { getErcAllocation, ercApprove, ercBalance } from '../scripts/token';
export default {
    watch: {
        'bridge.amount': function () {
            this.refreshAllowance();
            this.refreshBalance();
        },
        'bridge.currency': function () {
            this.refreshAllowance();
            this.refreshBalance();
        },
        'bridge.from.chain': function () {
            this.refreshAllowance();
            this.refreshBalance();
        }
    },
    data() {
        return {
            froming: false,
            coining: false,
            interchange: false,
            bridging: false,
            approving: false,
            allowance: 0,
            bridge: {
                balance0: '0',
                balance1: '0',
                currency: this.$currenciesLP(1),
                bridgeFee: 0,
                amount: 0,
                from: {
                    chain: this.$otherChains()[0]
                },
                to: {
                    chain: this.$chains()[2]
                },
            },
        };
    },
    mounted() {
        this.refreshAllowance();
        this.refreshBalance();
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

        refreshBalance: async function () {
            if (this.$store.state.account != '') {
                this.bridge.balance0 = await ercBalance(
                    this.bridge.from.chain,
                    this.bridge.currency,
                    this.$store.state.account
                );

                this.bridge.balance1 = await ercBalance(
                    this.bridge.to.chain,
                    this.bridge.currency,
                    this.$store.state.account
                );
            }
        },

        refreshAllowance: async function () {
            let fromChain = this.bridge.from.chain;
            let toChain = this.bridge.to.chain;

            if (this.interchange) {
                fromChain = toChain;
            }

            this.allowance = await getErcAllocation(
                fromChain,
                this.bridge.currency,
                this.$store.state.account
            );
        },

        changeCurrency: function (newCurrency) {
            if (newCurrency.isPending) {
                notify.push({
                    'title': `Not much liquidity of ${newCurrency.symbol} in the pools, Please try USDT or USDC`,
                    'description': `Happy bridging!`,
                    'category': 'error'
                });
                return;
            }
            this.bridge.currency = newCurrency;
        },

        approve: async function () {
            if (this.approving) return;
            this.approving = true;

            let fromChain = this.bridge.from.chain;
            let toChain = this.bridge.to.chain;

            if (this.interchange) {
                let tempFrom = fromChain;
                fromChain = toChain;
                toChain = tempFrom;
            }

            this.$store.commit('setActiveEvm', fromChain.id);

            await this.auth();

            await ercApprove(
                fromChain,
                this.bridge.currency,
                this.$toWei(this.bridge.amount)
            );

            this.refreshAllowance();

            this.approving = false;
        },
        useBridge: async function () {
            if (this.bridging) return;

            if (this.bridge.amount == '') {
                notify.push({
                    'title': 'Enter an amount!',
                    'description': 'Field is required!',
                    'category': 'error'
                });
                return;
            }

            if (this.bridge.amount > '100') {
                notify.push({
                    'title': `Not much liquidity of ${this.bridge.currency.symbol} in the pools`,
                    'description': `Use amount <= 10 ${this.bridge.currency.symbol} Instead!`,
                    'category': 'error'
                });
                return;
            }

            this.bridging = true;

            let fromChain = this.bridge.from.chain;
            let toChain = this.bridge.to.chain;

            if (this.interchange) {
                let tempFrom = fromChain;
                fromChain = toChain;
                toChain = tempFrom;
            }

            const receiver = this.$store.state.account;

            this.$store.commit('setActiveEvm', fromChain.id);

            await this.auth();

            if (receiver == '') {
                notify.push({
                    'title': 'Receiving wallet not connected!',
                    'description': 'Connect your Web3 Wallet',
                    'category': 'error'
                });
                this.bridging = false;
                return;
            }

            const transaction = await bridgeEVM(
                fromChain,
                toChain,
                this.bridge.currency,
                this.$toWei(this.bridge.amount)
            );

            if (transaction) {
                notify.push({
                    'title': 'Transaction sent',
                    'description': 'View transaction at the transactions page!',
                    'category': 'success',
                    'linkTitle': 'View Trx',
                    'linkUrl': '/transactions'
                });
            } else {
                notify.push({
                    'title': 'Transaction failed',
                    'description': 'Try again!',
                    'category': 'error'
                });
            }

            this.bridging = false;
            this.refreshBalance();
        }
    }
};
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 60px;
    padding: 150px 0;
    flex-direction: column;
}

.note {
    width: 450px;
    max-width: 100%;
}

.note a {
    color: var(--pr-light, #B1CC8F);
    text-decoration: underline;
}

.note p {
    text-align: center;
    color: var(--text-semi-d, #95979D);
    font-family: Avenir;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
    letter-spacing: 0.28px;
}

.bridge_rect {
    width: 500px;
    max-width: 100%;
    flex-shrink: 0;
    border-radius: 14px;
    border: 2px solid var(--Background-BG-400, #0A1D2E);
    background: var(--Background-BG-200, #03090F);
    padding: 24px;
}

.bridge_rect_toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 3px 0;
}

.bridge_rect_toolbar p {
    color: var(--text-normal, #EEF1F8);
    font-size: 20px;
    font-style: normal;
    font-weight: 800;
    line-height: 120%;
    /* 24px */
    letter-spacing: 0.4px;
}

.bridge_rect_toolbar svg {
    display: inline-flex;
    padding: 9px;
    align-items: flex-start;
    gap: 10px;
    width: 38px;
    height: 38px;
    cursor: pointer;
    border-radius: 12px;
    border: 1px solid var(--Stroke-BgLight, #182D40);
}

.form_rect,
.to_rect {
    border-radius: 8px;
    background: var(--Background-BG-300, #03101C);
    margin-top: 20px;
    padding: 0 16px;
    padding-bottom: 24px;
}

.from_toolbar,

.to_toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-image: linear-gradient(to right, var(--pr-light) 3%, var(--bg-lightest) 3%, var(--bg-lightest) 97%, var(--pr-light) 97%) 1;
    border-bottom-width: 1px;
    border-bottom-style: solid;
}

.active_from_chain,
.active_to_chain {
    display: flex;
    align-items: center;
    gap: 8px;
    border-bottom: 1px solid var(--primary-light, #327EA8);
    height: 56px;
    padding: 0 14px;
    position: relative;
    user-select: none;
    cursor: pointer;
}

.active_from_chain img,
.active_to_chain img {
    width: 24px;
    height: 24px;
    border-radius: 12px;
}

.active_from_chain p,
.active_to_chain p {
    color: var(--text-normal, #EEF1F8);
    font-size: 16px;
    font-style: normal;
    font-weight: 800;
    line-height: 100%;
    /* 16px */
    letter-spacing: 0.32px;
}

.inactive_from_chains {
    border-radius: 6px;
    border: 1px solid var(--bg-lighter, #0C171A);
    background: var(--bg-light, #0D1112);
    position: absolute;
    transform: translate(-50%, 50%);
    left: 50%;
    z-index: 3;
    width: 200px;
    padding: 0 16px;
    user-select: none;
}

.inactive_from_chains .chain {
    border-bottom: 1px solid var(--bg-lighter, #0C171A);
    height: 64px;
    display: flex;
    align-items: center;
    gap: 6px;
}

.inactive_from_chains p {
    color: var(--text-normal, #EEF1F8);
    font-size: 16px;
    font-style: normal;
    font-weight: 800;
    line-height: 100%;
    /* 16px */
    letter-spacing: 0.32px;
    width: 120px;
}

.inactive_from_chains img {
    width: 24px;
    height: 24px;
    border-radius: 12px;
}


.from_chain>svg,
.to_chain>svg {
    margin-left: 2px;
}

.from_label0,
.to_label0 {
    color: var(--text-dimmed, #66676C);
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
    /* 19.2px */
    letter-spacing: 0.32px;
    width: 110px;
}

.from_connection,
.to_connection {
    display: flex;
    align-items: center;
    gap: 6px;
    width: 110px;
    justify-content: flex-end;
    cursor: pointer;
    user-select: none;
}

.from_connection p,
.to_connection p {
    color: var(--text-dimmed, #66676C);
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
    /* 14.4px */
    letter-spacing: 0.24px;
}

.from_input,
.to_input {
    margin-top: 30px;
    display: flex;
    gap: 16px;
}

.max,
.est {
    width: 65px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 3px;
    background: var(--bg-lightest, #0A1D2E);
    color: var(--primary-primary, #2F9BD6);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
    /* 16.8px */
    letter-spacing: 0.28px;
    cursor: pointer;
}

.est {
    color: var(--text-semi-d, #95979D);
}

.from_input input,
.to_input input {
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

.from_input .currency,
.to_input .currency {
    width: 110px;
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

.inactive_from_currencies {
    position: relative;
    border-radius: 6px;
    border: 1px solid var(--bg-lighter, #0C171A);
    background: var(--bg-light, #0D1112);
    position: absolute;
    top: 35px;
    right: 0;
    z-index: 3;
    width: 200px;
    padding: 0 16px;
}

.inactive_from_currencies .currency {
    border-bottom: 1px solid var(--bg-lighter, #0C171A);
    height: 64px;
    display: flex;
    align-items: center;
    gap: 6px;
    width: 100%;
    cursor: pointer;
}

.from_balance,
.to_balance {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.from_balance p,
.to_balance p {
    color: var(--text-dimmed, #66676C);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
    /* 16.8px */
    letter-spacing: 0.28px;
}

.from_balance p span,
.to_balance p span {
    color: var(--text-normal, #EEF1F8);
    font-weight: 800;
}

.inter_change {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    cursor: pointer;
    user-select: none;
    position: relative;
}

.inter_change_border {
    border-radius: 12px;
    border: 1px solid #182D40;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
}

.inter_change svg:last-child {
    position: absolute;
}


.view_route {
    margin-top: 40px;
}

.schedule {
    margin-top: 20px;
}

.est_time {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 52px;
}

.est_time>p {
    color: var(--tx-normal, #EEF1F8);
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
    /* 19.2px */
    letter-spacing: 0.32px;
}

.est_time div {
    display: flex;
    align-items: center;
    gap: 10px;
}

.est_time div p {
    color: var(--tx-dimmed, #66676C);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
    /* 16.8px */
    letter-spacing: 0.28px;
}
</style>