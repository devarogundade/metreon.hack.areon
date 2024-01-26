<template>
    <div class="overlay">
        <div class="container">
            <div class="connect_rect">
                <div class="connect_toolbar">
                    <p>Connect Wallets</p>
                    <CloseIcon />
                </div>

                <div class="evm_wallets">
                    <div class="evm_wallets_title">
                        <p>EVM wallets</p>
                        <div class="active_dot"></div>
                    </div>

                    <div class="wallet metamask">
                        <MetaMaskIcon />
                        <p>MetaMask</p>
                    </div>

                    <div class="wallet binance">
                        <BinanceWalletIcon />
                        <p>Binance Wallet</p>
                    </div>
                </div>

                <div class="notice">
                    <p>Don't have a Areon Wallet?, <a href="" target="_blank">Install Here</a></p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
    background: rgba(5, 7, 8, 0.70);
    backdrop-filter: blur(2px);
    display: flex;
    justify-content: center;
    align-items: center;
}

.connect_rect {
    width: 430px;
    height: 588px;
    flex-shrink: 0;
    border-radius: 8px;
    border: 2px solid var(--bg-lighter, #0C171A);
    background: var(--bg-light, #0D1112);
    overflow: hidden;
}

.connect_toolbar {
    display: inline-flex;
    padding: 20px 24px;
    justify-content: space-between;
    align-items: center;
    background: var(--bg-lighter, #0C171A);
}

.connect_toolbar p {
    color: var(--text-normal, #EEF1F8);
    font-size: 16px;
    font-style: normal;
    font-weight: 800;
    line-height: 19.2px;
    letter-spacing: 0.32px;
}
</style>