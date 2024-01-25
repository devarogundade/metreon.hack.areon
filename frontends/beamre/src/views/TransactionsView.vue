<template>
    <section id="section">
        <div class="app_width">
            <div class="container" v-if="!loading">
                <div class="transactions_rect">
                    <div class="transactions_rect_toolbar">
                        <p>Transactions</p>
                        <div class="sort">
                            <p>Sort by</p>
                            <SortIcon />
                        </div>
                    </div>

                    <div class="transaction_table">
                        <table>
                            <div class="thead">
                                <thead>
                                    <tr>
                                        <td>Bridge route</td>
                                        <td>Status</td>
                                        <td>Source Txn</td>
                                        <td>Destination Txn</td>
                                    </tr>
                                </thead>
                            </div>
                        </table>
                        <div class="tbody" v-for="transaction, i in transactions" :key="i">
                            <tbody>
                                <tr>
                                    <td>
                                        <a target="_blank"
                                            :href="`https://metreon-scan.netlify.app/messages/${transaction.messageId}`">
                                            <div class="route">
                                                <div class="images">
                                                    <img :src="$chain(transaction.fromChainId).image" alt="">
                                                    <ArrowRightIcon />
                                                    <img :src="$chain(transaction.toChainId).image" alt="">
                                                </div>

                                                <div class="text">
                                                    <p class="name">{{ $chain(transaction.fromChainId).name }} - {{
                                                        $chain(transaction.toChainId).name }}</p>
                                                    <p class="timestamp">{{ $toDate(transaction.initializedTimestamp * 1000)
                                                    }}
                                                        <OutIcon />
                                                    </p>
                                                </div>
                                            </div>
                                        </a>
                                    </td>

                                    <td>
                                        <div class="status"
                                            v-if="transaction.status == 'PROCESSING' || transaction.status == 'DISPATCHED'">
                                            <div class="dot processing_dot">
                                                <SemanticYellow />
                                            </div>
                                            <p>Processing</p>
                                        </div>
                                        <div class="status" v-if="transaction.status == 'DELIVERED'">
                                            <div class="dot processing_dot">
                                                <SemanticGreen />
                                            </div>
                                            <p>Successful</p>
                                        </div>
                                        <div class="status" v-if="transaction.status == 'FAILED'">
                                            <div class="dot processing_dot">
                                                <SemanticRed />
                                            </div>
                                            <p>Failed</p>
                                        </div>
                                    </td>

                                    <td>
                                        <div class="source_txn">
                                            <p>
                                                {{ $toMoney($fromWei(transaction.tokens[0].amount)) }}
                                                <span>{{ $currencyAddress(transaction.tokens[0].tokenId).symbol }}</span>
                                            </p>
                                            <a target="_blank"
                                                :href="`${$chain(transaction.fromChainId).scan}/tx/${transaction.fromHash}`">
                                                <div class="chain">
                                                    <img :src="$chain(transaction.fromChainId).image" alt="">
                                                    <p>{{ $chain(transaction.fromChainId).name }}</p>
                                                    <OutIcon />
                                                </div>
                                            </a>
                                        </div>
                                    </td>

                                    <td>
                                        <div class="destination_txn">
                                            <p>
                                                {{ $toMoney($fromWei(transaction.tokens[0].amount)) }}
                                                <span>{{ $currencyAddress(transaction.tokens[0].tokenId).symbol }}</span>
                                            </p>
                                            <div class="chain">
                                                <img :src="$chain(transaction.toChainId).image" alt="">
                                                <p>{{ $chain(transaction.toChainId).name }}</p>
                                                <OutIcon />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </div>
                        <div class="empty" v-if="transactions.length == 0">
                            <img src="/images/empty.png" alt="">
                        </div>
                    </div>

                    <div class="transaction_navigation">
                        <div class="back" @click="back" :style="{ opacity: currentPage == 1 ? '0.3' : '1' }">
                            <ArrowLeftIcon />
                            <p>Back</p>
                        </div>

                        <div class="pages">
                            <div v-for="index in totalPages" @click="getMessages(index)"
                                :class="currentPage == index ? 'page page_active' : 'page'" :key="index">
                                {{ index }}
                            </div>
                        </div>

                        <div class="next" @click="next" :style="{ opacity: currentPage == totalPages ? '0.3' : '1' }">
                            <p>Next</p>
                            <ArrowRightIcon />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Loadingbox v-if="loading" />
    </section>
</template>

<script setup>
import SortIcon from '../components/icons/SortIcon.vue';
import OutIcon from '../components/icons/OutIcon.vue';
import ArrowRightIcon from '../components/icons/ArrowRightIcon.vue';
import ArrowLeftIcon from '../components/icons/ArrowLeftIcon.vue';
import SemanticYellow from '../components/icons/SemanticYellow.vue';
</script>

<script>
import { fetchMessages } from '../scripts/explorer';
import SemanticGreen from '../components/icons/SemanticGreen.vue';
import SemanticRed from '../components/icons/SemanticRed.vue';
import Loadingbox from '../components/LoadingBox.vue';

export default {
    data() {
        return {
            transactions: [],
            currentPage: 1,
            totalPages: 1,
            loading: false
        };
    },
    methods: {
        back: function () {
            if (this.currentPage > 1) {
                this.getMessages(Number(this.currentPage) - 1);
            }
        },
        next: function () {
            if (this.currentPage < this.totalPages) {
                this.getMessages(Number(this.currentPage) + 1);
            }
        },
        getMessages: async function (page) {
            try {
                if (this.$store.state.account != '') {
                    // eslint-disable-next-line no-undef
                    const response = await fetchMessages(this.$store.state.account, page);
                    this.transactions = response.data;
                    this.totalPages = response.totalPages;
                    this.currentPage = page;
                }
            } catch (error) {
                console.error(error);
            }
        }
    },
    async mounted() {
        this.loading = true;
        await this.getMessages(this.currentPage);
        this.loading = false;
    }
};
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    padding: 150px 0;
}

.transactions_rect {
    width: 860px;
    flex-shrink: 0;
    border-radius: 14px;
    border: 2px solid var(--Background-BG-400, #0A1D2E);
    background: var(--Background-BG-200, #03090F);
    padding: 20px 24px;
}

.transactions_rect_toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.transactions_rect_toolbar>p {
    color: var(--text-normal, #EEF1F8);
    font-size: 20px;
    font-style: normal;
    font-weight: 800;
    line-height: 120%;
    /* 24px */
    letter-spacing: 0.4px;
}

.transactions_rect_toolbar .sort {
    display: inline-flex;
    padding: 9px 16px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 4px;
    background: var(--bg-lighter, #0C171A);
}

.transactions_rect_toolbar .sort p {
    color: var(--text-semi-d, #95979D);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    /* 14px */
    letter-spacing: 0.28px;
}

table {
    width: 100%;
    margin-top: 30px;
}

.thead {
    padding: 20px 0;
}

thead td:first-child,
tbody td:first-child {
    width: 340px;
}

thead td:nth-child(2),
tbody td:nth-child(2) {
    width: 180px;
}

thead td:nth-child(3),
tbody td:nth-child(3) {
    width: 180px;
}

thead td:nth-child(4),
tbody td:nth-child(4) {
    width: 150px;
}

thead td {
    color: var(--text-semi-d, #95979D);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    /* 14px */
    letter-spacing: 0.28px;
}

.transaction_navigation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 40px;
}

.transaction_navigation .pages {
    width: 240px;
    gap: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.transaction_navigation .page {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-semi-d, #95979D);
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    /* 14px */
    letter-spacing: 0.28px;
    cursor: pointer;
}


.transaction_navigation .page_active {
    border-radius: 2px;
    background: var(--bg-lighter, #0C171A);
    border-bottom: 1px solid var(--pr-light);
}

.transaction_navigation .next,
.transaction_navigation .back {
    display: flex;
    align-items: center;
    color: var(--text-semi-d, #95979D);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    /* 14px */
    gap: 10px;
    letter-spacing: 0.28px;
    cursor: pointer;
}

.tbody {
    padding: 30px 0;
    width: 100%;
    border-image: linear-gradient(to right, var(--pr-light) 3%, var(--bg-lighter) 3%, var(--bg-lighter) 97%, var(--pr-light) 97%) 1;
    border-bottom-width: 1px;
    border-bottom-style: solid;
}


.tbody:last-child {
    border-bottom: 1px solid var(--bg-lighter, #0C171A);
}


tbody {
    width: 100%;
}

.route {
    display: flex;
    align-items: center;
    gap: 16px;
}

.route .images {
    display: flex;
    padding: 8px;
    justify-content: center;
    align-items: center;
    gap: 6px;
    border-radius: 4px;
    background: var(--bg-lighter, #0C171A);
    width: 92px;
}

.route .name {
    color: var(--text-normal, #EEF1F8);
    font-size: 14px;
    font-style: normal;
    font-weight: 800;
    line-height: 100%;
    /* 14px */
    letter-spacing: 0.28px;
}

.route .timestamp {
    display: flex;
    align-items: center;
    margin-top: 6px;
    gap: 8px;
    color: var(--text-semi-d, #95979D);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    /* 14px */
    letter-spacing: 0.28px;
}

.route .images img {
    width: 24px;
    height: 24px;
    border-radius: 12px;
}

.status {
    display: flex;
    align-items: center;
    gap: 8px;
}

.status p {
    color: var(--text-normal, #EEF1F8);
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    /* 12px */
    letter-spacing: 0.24px;
}

.processing_dot {
    background: rgba(188, 254, 47, 0.06);
}


.dot {
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    width: 22px;
    height: 22px;
}

.chain {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 12px;
}

.chain p {
    color: var(--text-dimmed, #66676C);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    /* 14px */
    letter-spacing: 0.28px;
}

.chain img {
    width: 12px;
    height: 12px;
    border-radius: 6px;
}

.chain>svg {
    margin-left: 2px;
}

.source_txn>p,
.destination_txn>p {
    color: var(--text-normal, #EEF1F8);
    font-size: 14px;
    font-style: normal;
    font-weight: 800;
    line-height: 100%;
    /* 14px */
    letter-spacing: 0.28px;
}

.source_txn>p span,
.destination_txn>p span {
    color: var(--text-dimmed, #66676C);
}
</style>