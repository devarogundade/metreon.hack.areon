<template>
    <section id="section">
        <div class="app_width">
            <div class="container">
                <div class="toolbar">
                    <div class="toolbar_texts">
                        <h3>Make your dApps gasless.</h3>
                        <p>Fund your created smart contracts using MetreonPay to unlock gasless transaction for your users.
                            <a target="_blank" href="https://metreon.gitbook.io">Learn more</a>
                        </p>
                    </div>
                    <div class="toolbar_stats">
                        <div class="toolbar_stat">
                            <BlockIcon />
                            <div class="toolbar_stat_text">
                                <h3>124</h3>
                                <p>Txns funded</p>
                            </div>
                        </div>

                        <div class="toolbar_stat">
                            <CoinIcon />
                            <div class="toolbar_stat_text">
                                <h3>$84,145</h3>
                                <p>Amount used</p>
                            </div>
                        </div>

                        <div class="toolbar_stat">
                            <CoinIcon />
                            <div class="toolbar_stat_text">
                                <h3>$98,087</h3>
                                <p>Total deposits</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="tabs">
                    <div class="tab_left">
                        <h3>Linked dApps</h3>
                        <div @click="tab = 1" :class="tab == 1 ? 'tab tab_active' : 'tab'">All ({{ apps.length }})</div>
                        <div v-for="chain, i in $chains()" @click="tab = chain.id"
                            :class="tab == chain.id ? 'tab tab_active' : 'tab'" :key="i">{{ chain.name }} ({{
                                apps.filter(app => app.chainId == chain.id).length }})</div>
                    </div>

                    <div class="tab_right">
                        <RouterLink to="/link-dapp">
                            <div class="link_action">
                                <AddFolderIcon />
                                <p>Link a dApp</p>
                            </div>
                        </RouterLink>
                    </div>
                </div>

                <div class="apps" v-if="!loading">
                    <div class="app" v-for="app, i in filteredApps()" :key="i">
                        <div class="app_header">
                            <div class="app_header_left">
                                <img :src="app.image" alt="">
                                <div class="app_identifiers">
                                    <p class="app_name">{{ app.name }}</p>
                                    <div class="contract">
                                        <p>{{ fineAddress(app.contractId) }}</p>
                                        <div class="chain">
                                            <img :src="$chain(app.chainId).image" alt="">
                                            {{ $chain(app.chainId).name }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="app_header_right">
                                <MenuIcon @click="menuIndex == i ? menuIndex = null : menuIndex = i" />

                                <div class="menu" v-if="menuIndex == i"
                                    @click="passiveApp = { chainId: app.chainId, name: app.name, image: app.image, contractId: app.contractId, balance: $fromWei(app.balance) }">
                                    <MinusIcon />
                                    <p>Remove funds</p>
                                </div>
                            </div>
                        </div>
                        <div class="app_funding">
                            <div class="app_funding_left">
                                <div class="app_funding_balance">
                                    <p>Funding balance</p>
                                    <h3>{{ $toMoney($fromWei(app.balance)) }} / {{ $fromWei('100000000000000000000') }} {{
                                        $chain(app.chainId).symbol }}</h3>
                                </div>
                                <div class="app_funding_progress">
                                    <div :style="{ width: Number($fromWei(app.balance) / $fromWei('100000000000000000000')) * 100 + '% !important' }"
                                        class="loading"></div>
                                </div>
                            </div>
                            <div class="app_funding_right">
                                <div class="add_funds"
                                    @click="activeApp = { chainId: app.chainId, name: app.name, image: app.image, contractId: app.contractId }">
                                    <AddIcon />
                                    <p>Add Funds</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="empty" v-if="!loading && filteredApps().length == 0">
                    <img src="/images/empty.png" alt="">
                    <p>No Apps Found!</p>
                    <RouterLink to="/link-dapp">
                        <div class="link_action">
                            <AddFolderIcon />
                            <p>Link a dApp</p>
                        </div>
                    </RouterLink>
                </div>
            </div>
        </div>

        <AddFunds v-if="activeApp" @close="activeApp = null; init()" :app="activeApp" />
        <RemoveFunds v-if="passiveApp" @close="passiveApp = null; init()" :app="passiveApp" />
        <Loadingbox v-if="loading" />
    </section>
</template>

<script setup>
import BlockIcon from '@/components/icons/BlockIcon.vue';
import CoinIcon from '@/components/icons/CoinIcon.vue';
import AddFolderIcon from '@/components/icons/AddFolderIcon.vue';
import MenuIcon from '@/components/icons/MenuIcon.vue';
import AddIcon from '@/components/icons/AddIcon.vue';
import AddFunds from '../pops/AddFunds.vue';
import RemoveFunds from '../pops/RemoveFunds.vue';
import MinusIcon from '@/components/icons/MinusIcon.vue';
import Loadingbox from '@/components/LoadingBox.vue';
</script>

<script>
import { getApps } from '../scripts/app';
import { fineAddress } from '../scripts/auth';
export default {
    data() {
        return {
            tab: 1,
            apps: [],
            activeApp: null,
            menuIndex: null,
            passiveApp: null,
            loading: false
        };
    },
    mounted() {
        this.loading = true;
        this.init();
    },
    methods: {
        init: async function () {
            this.apps = await getApps();
            this.loading = false;
        },
        filteredApps: function () {
            return this.tab == 1 ? this.apps : this.apps.filter(app => app.chainId == this.tab);
        }
    }
};
</script>


<style scoped>
.app_width {
    width: 1200px;
}

.container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 180px 0;
}

.toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.toolbar_texts {
    width: 350px;
}

.toolbar_texts h3 {
    color: var(--tx-normal, #EEF1F8);
    font-size: 25px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
}

.toolbar_texts p {
    color: var(--tx-dimmed, #66676C);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-top: 18px;
}

.toolbar_texts a {
    color: #2F9BD6;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
}

.toolbar_stats {
    border-radius: 8px;
    border: 2px solid var(--Background-BG-400, #0A1D2E);
    background: var(--Background-BG-200, #03090F);
    display: flex;
    align-items: center;
    padding: 20px 18px;
}

.toolbar_stat {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-right: 28px;
    border-right: 1px solid #0A1D2E;
    padding-right: 28px;
}

.toolbar_stat:last-child {
    border: none;
    margin-right: 0;
    padding-right: 0;
}

.toolbar_stat svg {
    border-radius: 4px;
    background: var(--Background-BG-300, #03101C);
    padding: 9px;
    width: 46px;
    height: 46px;
}

.toolbar_stat h3 {
    color: var(--tx-normal, #EEF1F8);
    font-size: 20px;
    font-style: normal;
    font-weight: 800;
    line-height: 100%;
    /* 20px */
    letter-spacing: 0.4px;
}

.toolbar_stat p {
    color: var(--tx-dimmed, #66676C);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
    /* 16.8px */
    letter-spacing: 0.28px;
    margin-top: 6px;
}

.tabs {
    margin-top: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.tab_left {
    display: flex;
    align-items: center;
    gap: 20px;
}

.tab_left h3 {
    color: var(--tx-normal, #EEF1F8);
    font-size: 16px;
    font-style: normal;
    font-weight: 800;
    line-height: 100%;
    /* 16px */
    letter-spacing: 0.32px;
    margin-right: 10px;
}

.tab {
    border-radius: 12px;
    border: 1px solid var(--Background-BG-300, #03101C);
    background: var(--Background-BG-200, #03090F);
    padding: 12px 14px;
    justify-content: center;
    align-items: center;
    color: var(--tx-dimmed, #66676C);
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    /* 14px */
    cursor: pointer;
    user-select: none;
    letter-spacing: 0.28px;
}

.tab_active {
    border-radius: 12px;
    border: 1px solid var(--Stroke-BgLight, #182D40);
    background: var(--Background-BG-200, #03090F);
    color: var(--tx-normal, #EEF1F8);
    font-weight: 500;
}

.link_action {
    display: inline-flex;
    padding: 10px 20px;
    justify-content: center;
    align-items: center;
    gap: 14px;
    border-radius: 6px;
    border: 1px solid var(--Stroke-BgLight, #182D40);
    background: var(--Background-BG-400, #0A1D2E);
}

.link_action p {
    color: #fff;
    font-size: 14px;
    font-style: normal;
    font-weight: 800;
    line-height: 120%;
    /* 16.8px */
    letter-spacing: 0.28px;
}

.apps {
    margin-top: 40px;
    display: flex;
    flex-wrap: wrap;
    column-gap: 60px;
    row-gap: 50px;
}

.app {
    border-radius: 8px;
    border: 1px solid var(--bg-lighter, #0C171A);
    background: var(--bg-light, #0D1112);
    width: 570px;
    padding: 20px;
}

.app_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 20px;
    border-image: linear-gradient(to right, var(--pr-light) 3%, var(--bg-lightest) 3%, var(--bg-lightest) 97%, var(--pr-light) 97%) 1;
    border-bottom-width: 1px;
    border-bottom-style: solid;
}

.app_header_left {
    display: flex;
    align-items: center;
    gap: 20px;
}

.app_header_left>img {
    height: 44px;
    width: 44px;
    object-fit: cover;
    border-radius: 8px;
    background: #186A47;
}

.app_name {
    color: var(--tx-normal, #EEF1F8);
    font-size: 16px;
    font-style: normal;
    font-weight: 800;
    line-height: 100%;
    /* 16px */
    letter-spacing: 0.32px;
}

.contract {
    display: flex;
    align-items: center;
    margin-top: 12px;
    gap: 14px;
    cursor: pointer;
    user-select: none;
}

.contract p {
    color: var(--pr-light, #B1CC8F);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    /* 14px */
    letter-spacing: 0.28px;
}

.chain img {
    border-radius: 7px;
    object-fit: cover;
    width: 14px;
    height: 14px;
}

.chain {
    display: flex;
    align-items: center;
    gap: 6px;
    color: var(--text-semi-d, #95979D);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    /* 14px */
    letter-spacing: 0.28px;
    cursor: pointer;
    user-select: none;
}

.app_header_right>svg {
    border-radius: 6px;
    border: 1px solid var(--bg-lighter, #0C171A);
    padding: 9px;
    width: 38px;
    height: 38px;
    cursor: pointer;
    user-select: none;
}

.app_header_right {
    position: relative;
}

.menu {
    position: absolute;
    border-radius: 6px 0px 6px 6px;
    border: 1px solid var(--bg-lightest, #11282E);
    background: var(--bg-light, #0D1112);
    padding: 0 16px;
    height: 64px;
    width: 200px;
    display: flex;
    align-items: center;
    cursor: pointer;
    gap: 10px;
    user-select: none;
    top: 63px;
    right: 0;
}

.menu p {
    color: var(--tx-normal, #EEF1F8);
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    /* 16px */
    letter-spacing: 0.32px;
}

.app_funding {
    margin-top: 30px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.app_funding_balance {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 360px;
}

.app_funding_balance p {
    color: var(--tx-dimmed, #66676C);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    /* 14px */
    letter-spacing: 0.28px;
}


.app_funding_balance h3 {
    color: var(--tx-normal, #EEF1F8);
    text-align: right;
    font-size: 14px;
    font-style: normal;
    font-weight: 800;
    line-height: 100%;
    /* 14px */
    letter-spacing: 0.28px;
}

.app_funding_progress {
    border-radius: 4px;
    background: var(--bg-lighter, #0C171A);
    width: 100%;
    overflow: hidden;
    height: 8px;
    margin-top: 16px;
}

.app_funding_progress .loading {
    height: 8px;
    flex-shrink: 0;
    border-radius: 4px;
    background: var(--sm-green, #2BC564);
    width: 0%;
}

.add_funds {
    display: inline-flex;
    padding: 9px 18px;
    justify-content: center;
    align-items: center;
    gap: 9px;
    border-radius: 4px;
    background: var(--bg-lighter, #0C171A);
}

.add_funds p {
    color: var(--tx-normal, #EEF1F8);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    letter-spacing: 0.28px;
}
</style>