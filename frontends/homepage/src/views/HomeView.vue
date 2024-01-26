<template>
  <section id="section" class="hero_container">
    <div class="app_width">
      <div class="hero">
        <div class="hero_text_content">
          <h3 class="title">{{ $t("hero.title") }}</h3>
          <p class="desc">{{ $t("hero.description") }}</p>

          <div class="buttons">
            <a href="https://metreon.gitbook.io/metreon-docs/" target="_blank">
              <div class="button">{{ $t("hero.button1") }}</div>
            </a>
            <!-- <a href="" target="_blank">
              <div class="button">{{ $t("hero.button2") }}</div>
            </a> -->
          </div>
        </div>

        <div class="scroll">
          <MouseIcon />
          <p>{{ $t("hero.scroll") }}</p>
        </div>
      </div>
    </div>
  </section>

  <section id="section" style="height: 600px; background-color: #fff;">

  </section>

  <section id="section" class="features_container" style="margin-top: -600px;">
    <div class="app_width">
      <div class="features">
        <h3>{{ $t("features.titleA") }} <span>{{ $t("features.titleB") }}</span></h3>
        <p>{{ $t("features.description") }}</p>
        <img src="/images/beamre.png" alt="">
        <a href="https://beamre.netlify.app" target="_blank">
          <button>{{ $t("features.tryItOut") }}</button>
        </a>
      </div>
    </div>
  </section>

  <section class="ecosystem_container">
    <div class="app_width">
      <div class="ecosystem">
        <div class="ecosystem_text">
          <h3>Ecosystem</h3>

          <p>Overview of applications comprising Metreon's infrastructural ecosystem.</p>

          <a href="" target="_blank">
            <button> Explore </button>
          </a>
        </div>

        <div class="ecosystem_apps">
          <iframe width="500" height="350" src="https://www.youtube.com/embed/NNtQ4uzqPx0" title="W3Link Demo"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen></iframe>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import MouseIcon from '../components/icons/MouseIcon.vue';
</script>

<style scoped>
.hero_container {
  background-image: url('/images/boxes.png');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 1920px 1080px;
}

.hero {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 240px;
  padding-bottom: 80px;
}

.hero_text_content {
  width: 730px;
  max-width: 100%;
}

.hero_text_content .title {
  color: var(--tx-normal, #EEF1F8);
  text-align: center;

  font-size: 50px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  /* 75px */
  letter-spacing: 1px;
}

.hero_text_content .desc {
  margin-top: 40px;
  color: var(--tx-semi, #8B909E);
  text-align: center;

  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
  /* 25.6px */
  letter-spacing: 0.32px;
}

.buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  margin-top: 110px;
}

.button {
  border-radius: 4px;
  width: 312px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%;
  /* 16px */
  letter-spacing: 0.64px;
}

.buttons a:first-child .button {
  color: var(--bg-lightest, #0C1A33);
  background: var(--primary-primary, #00A3FF);
}

/* .buttons a:last-child .button {
  color: var(--tx-normal, #EEF1F8);
  border: 2px solid var(--bg-lightest, #0C1A33);
  background: var(--bg-lighter, #091121);
} */

.scroll {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  margin-top: 200px;
}

.scroll p {
  color: #EDF0F5;
  text-align: center;
  font-family: Axiforma;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
  /* 14px */
  letter-spacing: 0.56px;
}

/*  */

.features_container {
  background-repeat: repeat;
  padding: 200px 0;
}

.features {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.features h3 {
  color: #293A59;
  text-align: center;

  font-size: 38px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  /* 57px */
  letter-spacing: 0.76px;
}

.features h3 span {
  color: var(--Primary-Primary-200, #2F9BD6);
  text-decoration-line: underline;
}

.features p {
  width: 743px;
  margin-top: 24px;
  color: #ABADAE;
  text-align: center;

  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  /* 30px */
  letter-spacing: 0.4px;
  margin-bottom: 40px;

}

.features button {
  border-radius: 6px;
  border: 1px solid var(--Stroke-BgLight, #182D40);
  background: var(--Background-BG-400, #0A1D2E);

  width: 285px;
  height: 50px;
  color: #fff;
  text-align: center;

  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%;
  /* 16px */
  letter-spacing: 0.64px;
}

.features img {
  margin-top: 60px;
  margin-bottom: 100px;
  width: 1000px;
  height: 684px;
}

.ecosystem_container {
  background-image: url('/images/lines.png');
  background-repeat: repeat-y;
  background-position: center center;
  background-size: 900px;
  background-color: rgba(10, 21, 31, 0.839);
  display: flex;
  justify-content: center;
}

.ecosystem {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 200px 0;
  gap: 240px;
}

.ecosystem_text {
  width: 454px;
}

.ecosystem_text h3 {
  color: var(--Text-Text-Normal, #FFF);
  font-size: 34px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  /* 51px */
}

.ecosystem_text p {
  color: var(--Text-Text-Dimmed, #787883);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  /* 24px */
  letter-spacing: 0.32px;
  margin-top: 30px;
}

.ecosystem_text button {
  width: 180px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  border: 1px solid var(--Stroke-BgLight, #182D40);
  background: var(--Background-BG-400, #0A1D2E);

  color: var(--Text-Text-Normal, #FFF);
  text-align: center;

  /* Text-14-Reg */
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
  /* 16.8px */
  letter-spacing: 0.28px;
  margin-top: 60px;
}

.ecosystem_apps {
  width: 500px;
  border-radius: 12px;
  overflow: hidden;
}
</style>
