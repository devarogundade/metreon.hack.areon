<template>
    <section id="section">
        <div class="app_width">
            <div class="container">
                <div class="link_rect">
                    <div class="rect_title">
                        <h3 v-if="!selectedApp">Find dApp</h3>
                        <h3 v-else>Selected contract <div @click="foundApp = null; selectedApp = null; contractId = ''">
                                <EditIcon /> Change
                            </div>
                        </h3>

                        <p v-if="!selectedApp">To link your dApp, you’ll need to find it first.</p>
                    </div>

                    <div class="finder">
                        <div class="selected_app" v-if="selectedApp">
                            <div class="identifier">
                                <AddressIcon />
                                <div>
                                    <p>{{ selectedApp.name }}</p>
                                    <p>Name</p>
                                </div>
                            </div>
                            <div class="created">
                                <p>Address</p>
                                <p>{{ fineAddress(selectedApp.contractId) }}</p>
                            </div>
                        </div>

                        <div class="input" v-if="!selectedApp">
                            <input type="text" v-model="contractId" placeholder="Paste Contract address">
                            <div class="chain" @click="picking = true">
                                <img :src="selectedChain.image" alt="">
                                <p>{{ selectedChain.name }}</p>
                                <ArrowDownIcon />
                            </div>
                        </div>
                        <div class="find_action" v-if="!selectedApp" @click="lookUp">
                            <SearchIcon />
                            <p>Find</p>
                        </div>

                        <div class="found_app" v-if="foundApp && !selectedApp" @click="selectedApp = foundApp">
                            <div class="identifier">
                                <AddressIcon />
                                <div>
                                    <p>{{ foundApp.name }}</p>
                                    <p>Name</p>
                                </div>
                            </div>
                            <div class="created">
                                <p>Create</p>
                                <p>Not available</p>
                            </div>
                        </div>

                        <div class="chains" @click="picking = false" v-if="picking">
                            <div class="chain" v-for="chain in $chains()" @click="selectedChain = chain" :key="chain.id">
                                <img :src="chain.image" alt="">
                                <p>{{ chain.name }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="divider">
                        <AddIcon />
                    </div>

                    <div class="dapp_icon" :style="selectedApp ? {} : { opacity: 0.3, pointerEvents: 'none' }">
                        <h3 class="dapp_icon_title">dApp Icon</h3>
                        <div class="images">
                            <div class="preview">
                                <ImageIcon />
                            </div>
                            <div class="picker">
                                <DownloadIcon />
                                <p><span>Click to upload</span> JPG, PNG or <br> SVG (100x100px recommended)</p>
                                <input v-on:change="pickLogo($event)" type="file" accept="image/*">
                            </div>
                        </div>
                    </div>

                    <div class="dapp_name" :style="selectedApp ? {} : { opacity: 0.3, pointerEvents: 'none' }">
                        <h3 class="dapp_name_title">dApp name</h3>
                        <input type="text" v-model="name" placeholder="E.g Beamre v2">
                    </div>

                    <PrimaryButton @click="linkApp" class="link_action" :progress="linking"
                        :state="selectedApp ? '' : 'disable'" :text="'Link dApp'" />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import AddIcon from '../components/icons/AddIcon.vue';
import SearchIcon from '../components/icons/SearchIcon.vue';
import ArrowDownIcon from '../components/icons/ArrowDownIcon.vue';
import DownloadIcon from '../components/icons/DownloadIcon.vue';
import AddressIcon from '../components/icons/AddressIcon.vue';
import EditIcon from '../components/icons/EditIcon.vue';
import ImageIcon from '../components/icons/ImageIcon.vue';
import PrimaryButton from '../components/PrimaryButton.vue';
</script>

<script>
import { findApp, addApp } from '../scripts/app';
import { notify } from '../reactives/notify';
import { connectMetaMask, fineAddress } from '../scripts/auth';
import { upload } from '../scripts/storage';
export default {
    data() {
        return {
            picking: false,
            contractId: '',
            selectedChain: this.$chains()[2],
            foundApp: null,
            selectedApp: null,
            linking: false,
            name: '',
            logoFile: null
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
        pickLogo: function (e) {
            const files = e.target.files;
            if (files.length > 0) {
                this.logoFile = files[0];
            } else {
                this.logoFile = null;
            }
        },
        lookUp: async function () {
            this.foundApp = null;
            if (this.contractId == '') {
                notify.push({
                    title: "Paste Contract address",
                    description: "Field is required!",
                    category: "error"
                });
                return;
            }
            const response = await findApp(this.contractId, this.selectedChain);
            if (response.status == 'ok' && response.isOwner) {
                this.foundApp = {
                    name: response.name,
                    contractId: response.contractId
                };
                notify.push({
                    title: "App found",
                    description: "App is identified as: " + response.name,
                    category: "success"
                });
            } else if (response.status == "ok" && !response.isOwner) {
                notify.push({
                    title: "App found but you are not the fee payer",
                    description: "App is identified as: " + response.name,
                    category: "error"
                });
            } else {
                notify.push({
                    title: "App was not found",
                    description: "Confirm you are on the right network",
                    category: "error"
                });
            }
        },
        linkApp: async function () {
            if (this.linking) return;

            if (this.name == '') {
                notify.push({
                    title: "Enter dApp name",
                    description: "Field is required!",
                    category: "error"
                });
                return;
            }

            this.linking = true;

            let image = '';

            if (this.logoFile) {
                const imageUrl = await upload(this.logoFile, `logos/${this.name}`);
                if (imageUrl) image = imageUrl;
            }

            if (this.selectedChain.category == 'EVM') {
                this.$store.commit('setActiveEvm', this.selectedChain.id);
                await this.auth();
            }

            const hash = await addApp(
                this.selectedApp.contractId,
                this.selectedChain,
                this.name,
                image
            );

            if (hash) {
                notify.push({
                    title: "Transaction sent",
                    description: "App linked successfully!",
                    category: "success"
                });
            } else {
                notify.push({
                    title: "Transaction not set",
                    description: "Try again!",
                    category: "error"
                });
            }

            this.linking = false;
        }
    }
};
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    padding: 150px 0;
}

.link_rect {
    display: flex;
    width: 570px;
    padding: 30px 24px;
    flex-direction: column;
    justify-content: center;
    border-radius: 8px;
    border: 2px solid var(--Background-BG-400, #0A1D2E);
    background: var(--Background-BG-200, #03090F);
}

.rect_title h3 {
    color: var(--tx-normal, #EEF1F8);
    font-size: 16px;
    font-style: normal;
    font-weight: 800;
    line-height: 120%;
    /* 19.2px */
    letter-spacing: 0.32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.rect_title h3 div {
    gap: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--tx-normal, #EEF1F8);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
    /* 16.8px */
    letter-spacing: 0.28px;
    cursor: pointer;
    user-select: none;
}

.rect_title p {
    color: var(--tx-dimmed, #66676C);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
    /* 16.8px */
    letter-spacing: 0.28px;
    margin-top: 9px;
}

.finder {
    display: flex;
    align-items: center;
    margin-top: 40px;
    justify-content: space-between;
    position: relative;
}

.finder .input {
    border-radius: 4px;
    border: 1px solid var(--bg-lightest, #11282E);
    background: var(--bg-light, #0D1112);
    display: flex;
    width: 405px;
    height: 40px;
    overflow: hidden;
}


.finder .chain {
    display: flex;
    padding: 10px 12px;
    align-items: center;
    gap: 10px;
    background: var(--bg-lightest, #11282E);
    cursor: pointer;
    user-select: none;
}

.finder .chains {
    position: absolute;
    z-index: 1;
    overflow: hidden;
    top: 40px;
    right: 113px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
}

.finder .chain p {
    color: var(--tx-normal, #EEF1F8);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    /* 14px */
    letter-spacing: 0.28px;
}


.finder input {
    width: 100%;
    border: none;
    background: var(--bg-light, #0D1112);
    padding: 0 10px;
    outline: none;
}

.find_action p {
    color: #fff;
    font-size: 14px;
    font-style: normal;
    font-weight: 800;
    cursor: pointer;
    user-select: none;
    letter-spacing: 0.28px;
}

.find_action {
    display: flex;
    padding: 0 20px;
    height: 40px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 4px;
    border: 1px solid var(--Stroke-BgLight, #182D40);
    background: var(--Background-BG-400, #0A1D2E);
    cursor: pointer;
    user-select: none;
}

.found_app {
    position: absolute;
    top: 40px;
    border-radius: 0px 0px 8px 8px;
    padding: 16px;
    background: var(--bg-lighter, #0C171A);
    width: 405px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    user-select: none;
}

.found_app .identifier {
    display: flex;
    align-items: center;
    gap: 14px;
}

.found_app .identifier p:first-child {
    color: var(--tx-normal, #EEF1F8);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    /* 14px */
    letter-spacing: 0.28px;
}


.found_app .identifier p:last-child {
    color: var(--tx-dimmed, #66676C);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    /* 14px */
    letter-spacing: 0.28px;
    margin-top: 10px;
}

.found_app .created {
    text-align: right;
}

.found_app .created p:first-child {
    color: var(--tx-dimmed, #66676C);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    /* 14px */
    letter-spacing: 0.28px;
}


.found_app .created p:last-child {
    color: var(--tx-normal, #EEF1F8);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    margin-top: 10px;
    /* 14px */
    letter-spacing: 0.28px;
}



.selected_app {
    border-radius: 8px;
    padding: 16px;
    background: var(--bg-lighter, #0C171A);
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: -20px;
    justify-content: space-between;
    cursor: pointer;
    user-select: none;
}

.selected_app .identifier {
    display: flex;
    align-items: center;
    gap: 14px;
}

.selected_app .identifier p:first-child {
    color: var(--tx-normal, #EEF1F8);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    /* 14px */
    letter-spacing: 0.28px;
}


.selected_app .identifier p:last-child {
    color: var(--tx-dimmed, #66676C);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    /* 14px */
    letter-spacing: 0.28px;
    margin-top: 10px;
}

.selected_app .created {
    text-align: right;
}

.selected_app .created p:first-child {
    color: var(--tx-dimmed, #66676C);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    /* 14px */
    letter-spacing: 0.28px;
}


.selected_app .created p:last-child {
    color: var(--primary-light, #B1CC8F);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    margin-top: 10px;
    /* 14px */
    letter-spacing: 0.28px;
}



.chain img {
    width: 20px;
    height: 20px;
    border-radius: 10px;
}

.divider {
    height: 1px;
    margin: 50px 0;
    width: 100%;
    background: #0C171A;
    display: flex;
    align-items: center;
    justify-content: center;
}

.divider svg {
    background: #03090F;
    padding: 25px;
    width: 80px;
    height: 80px;
}

.dapp_icon_title {
    color: var(--tx-normal, #EEF1F8);
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
    /* 19.2px */
    letter-spacing: 0.32px;
}

.dapp_icon .images {
    display: flex;
    align-items: center;
    margin-top: 20px;
    justify-content: space-between;
}

.images .preview {
    width: 138px;
    height: 138px;
    border-radius: 12px;
    border: 1px dashed var(--Background-BG-400, #0A1D2E);
    display: flex;
    align-items: center;
    justify-content: center;
}

.images .picker {
    border-radius: 12px;
    border: 1px solid var(--Background-BG-400, #0A1D2E);
    background: var(--Background-BG-300, #03101C);
    display: flex;
    width: 354px;
    padding: 24px 20px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 24px;
    flex-shrink: 0;
    position: relative;
}

.picker input {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    opacity: 0;
}

.picker p {
    color: var(--text-dimmed, #66676C);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
    letter-spacing: 0.28px;
    text-align: center;
}

.picker p span {
    color: var(--tx-normal, #EEF1F8);
    text-align: center;
    text-decoration-line: underline;
}

.dapp_name {
    margin-top: 40px;
}

.dapp_name_title {
    color: var(--tx-normal, #EEF1F8);
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
    /* 19.2px */
    letter-spacing: 0.32px;
}

.dapp_name input {
    padding: 0 20px;
    height: 40px;
    border-radius: 4px;
    border: 1px solid var(--Background-BG-400, #0A1D2E);
    background: var(--Background-BG-200, #03090F);
    outline: none;
    width: 100%;
    margin-top: 20px;
}

.link_action {
    margin-top: 50px;
}

.link_action p {
    color: var(--bg-lightest, #11282E);
    font-size: 18px;
    font-style: normal;
    font-weight: 800;
    letter-spacing: 0.36px;
}

input {
    color: var(--tx-normal);
}
</style>