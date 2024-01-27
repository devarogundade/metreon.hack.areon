<template>
    <section id="section">
        <div class="app_width">
            <div class="container">
                <div class="bridge_rect">
                    <div class="bridge_rect_toolbar">
                        <p>Areon Network</p>

                        <div>
                            <a href="https://docs.areon.network/testnet/faucet" target="_blank">Get TAREA
                                <OutIcon />
                            </a>
                            <img src="/images/areon.png" alt="">
                        </div>
                    </div>

                    <div class="form_rect">
                        <div class="coin">
                            <div>
                                <img src="/images/usdt.png" alt="">
                                <p>Tether USD</p>
                            </div>
                            <p><span>50</span> USDT
                                <MetaMaskIcon v-if="$store.state.activeEvm == 462"
                                    @click="addToMetaMask($currenciesLP(3))" />
                            </p>
                        </div>
                        <div class="coin">
                            <div>
                                <img src="/images/usdc.png" alt="">
                                <p>CIrcle USD</p>
                            </div>
                            <p><span>50</span> USDC
                                <MetaMaskIcon v-if="$store.state.activeEvm == 462"
                                    @click="addToMetaMask($currenciesLP(6))" />
                            </p>
                        </div>
                        <div class="coin">
                            <div>
                                <img src="/images/bsc.png" alt="">
                                <p>Wrapped BNB</p>
                            </div>
                            <p><span>50</span> WBNB
                                <MetaMaskIcon v-if="$store.state.activeEvm == 462"
                                    @click="addToMetaMask($currenciesLP(11))" />
                            </p>
                        </div>
                        <div class="coin">
                            <div>
                                <img src="/images/polygon.png" alt="">
                                <p>Wrapped Polygon</p>
                            </div>
                            <p><span>50</span> WMATIC
                                <MetaMaskIcon v-if="$store.state.activeEvm == 462"
                                    @click="addToMetaMask($currenciesLP(13))" />
                            </p>
                        </div>
                    </div>

                    <div class="view_route" @click="mintEvm(462)">
                        <PrimaryButton :progress="minting == 462" :text="'Mint all'" />
                    </div>
                </div>

                <div class="bridge_rect">
                    <div class="bridge_rect_toolbar">
                        <p>BSC Testnet</p>

                        <div>
                            <a href="https://testnet.bnbchain.org/faucet-smart" target="_blank">Get TBNB
                                <OutIcon />
                            </a>
                            <img src="/images/bsc.png" alt="">
                        </div>
                    </div>

                    <div class="form_rect">
                        <div class="coin">
                            <div>
                                <img src="/images/usdt.png" alt="">
                                <p>Tether USD</p>
                            </div>
                            <p><span>50</span> USDT
                                <MetaMaskIcon v-if="$store.state.activeEvm == 97"
                                    @click="addToMetaMask($currenciesLP(1))" />
                            </p>
                        </div>
                        <div class="coin">
                            <div>
                                <img src="/images/usdc.png" alt="">
                                <p>Circle USD</p>
                            </div>
                            <p><span>50</span> USDC
                                <MetaMaskIcon v-if="$store.state.activeEvm == 97"
                                    @click="addToMetaMask($currenciesLP(4))" />
                            </p>
                        </div>
                        <div class="coin">
                            <div>
                                <img src="/images/areon.png" alt="">
                                <p>Wrapped Areon</p>
                            </div>
                            <p><span>50</span> WAREA
                                <MetaMaskIcon v-if="$store.state.activeEvm == 97"
                                    @click="addToMetaMask($currenciesLP(7))" />
                            </p>
                        </div>
                    </div>

                    <div class="view_route" @click="mintEvm(97)">
                        <PrimaryButton :progress="minting == 97" :text="'Mint all'" />
                    </div>
                </div>

                <div class="bridge_rect">
                    <div class="bridge_rect_toolbar">
                        <p>Mumbai</p>

                        <div>
                            <a href="https://faucet.polygon.technology/" target="_blank">Get MATIC
                                <OutIcon />
                            </a>
                            <img src="/images/polygon.png" alt="">
                        </div>
                    </div>

                    <div class="form_rect">
                        <div class="coin">
                            <div>
                                <img src="/images/usdt.png" alt="">
                                <p>Tether USD</p>
                            </div>
                            <p><span>50</span> USDT
                                <MetaMaskIcon v-if="$store.state.activeEvm == 80001"
                                    @click="addToMetaMask($currenciesLP(2))" />
                            </p>
                        </div>
                        <div class="coin">
                            <div>
                                <img src="/images/usdc.png" alt="">
                                <p>Circke USD</p>
                            </div>
                            <p><span>50</span> USDC
                                <MetaMaskIcon v-if="$store.state.activeEvm == 80001"
                                    @click="addToMetaMask($currenciesLP(5))" />
                            </p>
                        </div>
                        <div class="coin">
                            <div>
                                <img src="/images/areon.png" alt="">
                                <p>Wrapped Areon</p>
                            </div>
                            <p><span>50</span> WAREA
                                <MetaMaskIcon v-if="$store.state.activeEvm == 97"
                                    @click="addToMetaMask($currenciesLP(8))" />
                            </p>
                        </div>
                    </div>
                    <div class="view_route" @click="mintEvm(80001)">
                        <PrimaryButton :progress="minting == 80001" :text="'Mint all'" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import PrimaryButton from '@/components/PrimaryButton.vue';
import OutIcon from '@/components/icons/OutIcon.vue';
import MetaMaskIcon from '@/components/icons/MetaMaskIcon.vue';
</script>

<script>
import { mintForEvm } from '../scripts/faucet';
import { notify } from '../reactives/notify';
import { connectMetaMask } from '../scripts/auth';
import { addToMetaMask } from '../scripts/token';
export default {
    data() {
        return {
            minting: null
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

        mintEvm: async function (chainId) {
            if (this.minting) {
                notify.push({
                    'title': 'Warning',
                    'description': 'Waiting for on-going minting to finish!',
                    'category': 'error'
                });
                return;
            }

            this.minting = chainId;

            this.$store.commit('setActiveEvm', chainId);
            await this.auth();

            const result = await mintForEvm(chainId);

            if (result) {
                notify.push({
                    'title': 'Transactions sent',
                    'description': 'Tokens were minted!',
                    'category': 'success',
                    'linkTitle': 'Bridge',
                    'linkUrl': '/'
                });
            } else {
                notify.push({
                    'title': 'Transactions failed',
                    'description': 'Minting failed, Try again!',
                    'category': 'error'
                });
            }

            this.minting = null;
        }
    }
};
</script>

<style scoped>
.container {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 60px;
    padding: 150px 0;
}

.bridge_rect {
    width: 500px;
    flex-shrink: 0;
    border-radius: 14px;
    border: 2px solid var(--Background-BG-400, #0A1D2E);
    background: var(--Background-BG-200, #03090F);
    padding: 24px;
}

.form_rect {
    border-radius: 8px;
    background: #03101C;
    margin-top: 30px;
    padding: 0 20px;
}

.bridge_rect_toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.bridge_rect_toolbar div {
    display: flex;
    align-items: center;
    gap: 20px;
}

.bridge_rect_toolbar a {
    padding: 8px 12px;
    background: var(--bg-lightest);
    color: var(--tx-normal);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    letter-spacing: 0.4px;
    display: flex;
    align-items: center;
    gap: 10px;
    border-radius: 4px;
}

.bridge_rect_toolbar>p {
    color: var(--tx-normal, #EEF1F8);
    font-size: 20px;
    font-style: normal;
    font-weight: 800;
    line-height: 120%;
    /* 24px */
    letter-spacing: 0.4px;
}

.bridge_rect_toolbar img {
    width: 30px;
    height: 30px;
    border-radius: 15px;
}

.coin {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    border-image: linear-gradient(to right, var(--pr-light) 3%, var(--bg-lightest) 3%, var(--bg-lightest) 97%, var(--pr-light) 97%) 1;
    border-bottom-width: 1px;
    border-bottom-style: solid;
}

.coin svg {
    cursor: pointer;
}

.coin div {
    display: flex;
    align-items: center;
    gap: 10px;
}

.coin div p {
    color: var(--tx-normal, #EEF1F8);
    font-size: 16px;
    font-style: normal;
    font-weight: 800;
    line-height: 100%;
    /* 16px */
    letter-spacing: 0.32px;
}

.coin:last-child {
    border: none;
}

.coin span {
    color: var(--tx-normal, #EEF1F8);
}

.coin>p {
    color: var(--tx-dimmed, #66676C);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    /* 14px */
    letter-spacing: 0.28px;
    display: flex;
    align-items: center;
    gap: 6px;
}

.coin img {
    height: 20px;
    height: 20px;
    object-fit: cover;
    border-radius: 10px;
}

.view_route {
    margin-top: 40px;
}
</style>