import { createI18n } from "vue-i18n";

const messages = {
    en: {
        header: {
            docs: "Docs",
            github: "Github",
            scan: "Explorer",
            nftBridge: "Token Bridge",
            startBuilding: "Start Building"
        },
        hero: {
            title: "Cross-chain interoperability protocol for Areon.",
            description: "Metreon is enabling Web3 applications on Areon go cross-chain, by powering seamless transfer of data from other blockchains and vice versa.",
            button1: "Build with Metreon",
            button2: "Ecosystem DApps",
            scroll: "Scroll"
        },
        features: {
            titleA: "See Metreon in Action?",
            titleB: "Meet Beamre.",
            description: "Harnessing the cross-chain interoperability provided by Metreon, Beamre moves token assets across Areon and other blockchains.",
            tryItOut: "Launch App"
        }
    }
};

export default createI18n({
    locale: import.meta.env.VITE_DEFAULT_LOCALE,
    fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
    legacy: false,
    globalInjection: true,
    messages
});