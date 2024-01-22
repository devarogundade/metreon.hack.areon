<template>
    <div class="overlay">
        <div class="container">
            <div class="success_rect">
                <div class="success_toolbar">
                    <p>Briding Details</p>
                    <CloseIcon @click="closePop" />
                </div>

                <div class="sucess_image">
                    <img src="/images/success.png" alt="success">
                    <p class="title">Asset Bridged Successfully</p>
                    <p class="desc">Transaction completed, view or track your transactions on the <a href="" target="_blank">transaction history</a> page.</p>
                </div>

                <button class="action">
                    <AddIcon />
                    <p>New Transfer</p>
                </button>
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


</style>