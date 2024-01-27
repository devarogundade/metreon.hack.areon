<template>
    <section id="section">
        <div class="app_width">
            <header>
                <div class="logo">
                    <BeamreLogo />
                </div>
                <div class="tabs">
                    <RouterLink to="/">
                        <div :class="$route.name == 'bridge' ? 'tab_item_active tab_item' : 'tab_item'">
                            <p>Bridge Assets</p>
                            <div class="indicator"></div>
                        </div>
                    </RouterLink>
                    <RouterLink to="/transactions">
                        <div :class="$route.name == 'transactions' ? 'tab_item_active tab_item' : 'tab_item'">
                            <p>Transactions</p>
                            <div class="indicator"></div>
                        </div>
                    </RouterLink>
                    <RouterLink to="/faucet">
                        <div :class="$route.name == 'faucet' ? 'tab_item_active tab_item' : 'tab_item'">
                            <p>Faucet</p>
                            <div class="indicator"></div>
                        </div>
                    </RouterLink>
                </div>
                <div class="connections">
                    <div class="evm_chains">
                        <div class="active_evm_chain" @click="switching = !switching">
                            <img :src="$chain($store.state.activeEvm).image" alt="">
                            <WalletDownIcon :style="{ rotate: switching ? '-180deg' : '0deg' }" />

                            <!-- dropdown -->
                            <div class="inactive_evm_chains" v-show="switching">
                                <div class="chain" v-for="chain, index in $chains()" :key="index"
                                    @click="switchChain(chain)">
                                    <img :src="chain.image" alt="">
                                    <p>{{ chain.name }}</p>
                                    <SemanticGreen v-if="$store.state.activeEvm == chain.id" />
                                </div>
                            </div>
                        </div>

                        <div class="wallet metamask" @click="auth">
                            <MetaMaskIcon />
                            <p v-if="$store.state.account == ''">Connect Wallet</p>
                            <p v-else>{{ fineAddress($store.state.account) }}</p>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    </section>
</template>

<script setup>
import BeamreLogo from '../components/icons/BeamreLogo.vue';
import MetaMaskIcon from '../components/icons/MetaMaskIcon.vue';
import SemanticGreen from '../components/icons/SemanticGreen.vue';
import WalletDownIcon from '../components/icons/WalletDownIcon.vue';
</script>

<script>
import { connectMetaMask, fineAddress } from '../scripts/auth';
import { notify } from '../reactives/notify';
export default {
    data() {
        return {
            switching: false
        };
    },
    methods: {
        switchChain: async function (chain) {
            this.$store.commit('setActiveEvm', chain.id);
            await this.auth();
        },

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
        }
    }
};
</script>

<style scoped>
section {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
}

header {
    width: 100%;
    height: 90px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.logo,
.connections {
    width: 400px;
    display: flex;
    align-items: center;
    gap: 20px;
}

.connect_wallets {
    display: flex;
    align-items: center;
}

.connect_wallets p {
    height: 40px;
    width: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px 0px 0px 4px;
    border-top: 1px solid var(--bg-lightest, #11282E);
    border-bottom: 1px solid var(--bg-lightest, #11282E);
    border-left: 1px solid var(--bg-lightest, #11282E);
    background: var(--bg-lighter, #0C171A);
    color: var(--tx-normal, #EEF1F8);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
    /* 16.8px */
    letter-spacing: 0.28px;
}

.connect_wallets svg {
    height: 40px;
    width: 40px;
    border-radius: 0px 20px 20px 0px;
    background: var(--primary-light, #B1CC8F);
    display: flex;
    align-items: center;
    padding: 10px;
    justify-content: center;
}

.connections {
    justify-content: flex-end;
}

.logo svg {
    height: 34px;
}

.tabs {
    display: flex;
    gap: 60px;
    align-items: center;
}

.tab_item p {
    color: var(--text-dimmed, #6C6E73);
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    padding: 4px 0;
    line-height: normal;
}

.tab_item_active p {
    color: var(--text-normal, #EEF1F8);
}


a .tab_item {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.tab_item .indicator {
    background: var(--bg-lightest, #11282E);
    width: 20px;
    height: 1px;
}

.tab_item_active .indicator {
    background: var(--primary-primary, #00A3FF);
}

.evm_chains {
    display: flex;
    align-items: center;
    gap: 20px;
}

.active_evm_chain {
    width: 40px;
    height: 40px;
    cursor: pointer;
    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    background: var(--bg-lightest, #11282E);
    position: relative;
}

.active_evm_chain>svg {
    position: absolute;
    right: 0;
    bottom: 0;
}

.active_evm_chain img {
    width: 24px;
    height: 24px;
    border-radius: 12px;
}

.inactive_evm_chains {
    position: absolute;
    top: 60px;
    border-radius: 6px;
    border: 1px solid var(--bg-lightest, #11282E);
    background: var(--bg-lighter, #0C171A);
    width: 220px;
    left: 0;
}

.inactive_evm_chains .chain {
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
    border-bottom: 1px solid var(--bg-light, #0D1112);
}

.inactive_evm_chains .chain p {
    width: 130px;
}

.inactive_evm_chains .chain:last-child {
    border-bottom: none;
}

.inactive_evm_chains .chain p {
    color: var(--text-semi-d, #95979D);
    font-size: 16px;
    font-style: normal;
    font-weight: 800;
    line-height: 100%;
    /* 16px */
    letter-spacing: 0.32px;
}

.wallet {
    border-radius: 4px;
    border: 1px solid var(--bg-lightest, #11282E);
    background: var(--bg-lighter, #0C171A);
    display: flex;
    padding: 10px 16px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    user-select: none;
    gap: 10px;
}

.wallet p {
    color: var(--text-normal, #EEF1F8);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
    /* 16.8px */
    letter-spacing: 0.28px;
}
</style>