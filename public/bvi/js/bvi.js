document.addEventListener("DOMContentLoaded", () => {
  const BVI_DEFAULT_OPTIONS = {
    bvi_builtElements: "false",
    bvi_fontFamily: "arial",
    bvi_fontSize: 16,
    bvi_images: "true",
    bvi_lang: "ru-RU",
    bvi_letterSpacing: "normal",
    bvi_lineHeight: "normal",
    bvi_panelActive: "true",
    bvi_panelFixed: "true",
    bvi_panelHide: "false",
    bvi_speech: "false",
    bvi_target: ".header-top__vision",
    bvi_reload: "false",
    bvi_theme: "white",
  };

  var BVI_OPTIONS = JSON.parse(JSON.stringify(BVI_DEFAULT_OPTIONS));

  const exitFromBvi = () => {
    localStorage.removeItem("bvi_enable")
    localStorage.removeItem("bvi_options")

    const bviPanel = document.querySelector(".bvi-panel");
    const bviActiveLinks = document.querySelectorAll(".bvi-link.active");
    bviActiveLinks.forEach((link) => {
      link.classList.remove("active");
    });
    bviPanel.style.display = "none";

    const page = document.querySelector(".page");
    page.classList.remove("bvi-body");

    BVI_OPTIONS = JSON.parse(JSON.stringify(BVI_DEFAULT_OPTIONS));

    for (const key of Object.keys(BVI_OPTIONS)) {
      const bviAttr = key.replace("_", "-");
      page.removeAttribute(`data-${bviAttr}`);
    }

    window.removeEventListener("scroll", handleScroll);
  };

  const changeFontSize = (direction) => {
    changeBviOption("bvi_fontSize", direction, "data-bvi-fontsize");

    if (BVI_OPTIONS.bvi_speech == "false") return;

    if (direction == 1) {
      speakAboutChange("Размер шрифта увеличен");
    } else {
      speakAboutChange("Размер шрифта уменьшен");
    }
  };

  const changeColorTheme = (colorTheme) => {
    changeBviOption("bvi_theme", colorTheme, "data-bvi-theme");

    if (BVI_OPTIONS.bvi_speech == "false") return;

    if (colorTheme == "white") {
      speakAboutChange("Цвет сайта: черным по белому");
    } else if (colorTheme == "black") {
      speakAboutChange("Цвет сайта: белым по черному");
    } else if (colorTheme == "blue") {
      speakAboutChange("Цвет сайта: темно-синим по голубому");
    } else if (colorTheme == "brown") {
      speakAboutChange("Цвет сайта: коричневым по бежевому");
    } else if (colorTheme == "green") {
      speakAboutChange("Цвет сайта: зеленым по темно-коричневому");
    }
  };

  const changeImageMode = (imageMode) => {
    changeBviOption("bvi_images", imageMode, "data-bvi-images");

    if (BVI_OPTIONS.bvi_speech == "false") return;

    if (imageMode == "true") {
      speakAboutChange("Изображения включены");
    } else if (imageMode == "false") {
      speakAboutChange("Изображения выключены");
    } else if (imageMode == "grayscale") {
      speakAboutChange("Изображения: черно-белые");
    }
  };

  const changeSpeechMode = (speechMode) => {
    changeBviOption("bvi_speech", speechMode, "data-bvi-speech");

    if (speechMode == "true") {
      speakAboutChange("Синтез речи включен");
    } else {
      speakAboutChange("Синтез речи отключен");
    }
  };

  const resetActiveLinkFromBlock = (bviBlockSelector) => {
    const bviBlock = document.querySelector(bviBlockSelector);
    const bviLinks = bviBlock.querySelectorAll(".bvi-link");
    bviLinks.forEach((bviLink) => {
      bviLink.classList.remove("active");
    });
  };

  const handleClickFontSize = (evt) => {
    const targetEl = evt.target;

    if (targetEl.classList.contains("bvi-fontSize-minus")) {
      changeFontSize(-1);
    } else if (targetEl.classList.contains("bvi-fontSize-plus")) {
      changeFontSize(1);
    }

    resetActiveLinkFromBlock(".bvi-block_font-size");
    targetEl.classList.add("active");
  };

  const handleClickColorTheme = (evt) => {
    const targetEl = evt.target;

    if (targetEl.classList.contains("bvi-theme-white")) {
      changeColorTheme("white");
    } else if (targetEl.classList.contains("bvi-theme-black")) {
      changeColorTheme("black");
    } else if (targetEl.classList.contains("bvi-theme-blue")) {
      changeColorTheme("blue");
    } else if (targetEl.classList.contains("bvi-theme-brown")) {
      changeColorTheme("brown");
    } else if (targetEl.classList.contains("bvi-theme-green")) {
      changeColorTheme("green");
    }

    resetActiveLinkFromBlock(".bvi-block_color-theme");
    targetEl.classList.add("active");
  };

  const handleClickImagesMode = (evt) => {
    const targetEl = evt.target;

    if (targetEl.classList.contains("bvi-images-on")) {
      changeImageMode("true");
    } else if (targetEl.classList.contains("bvi-images-off")) {
      changeImageMode("false");
    } else if (targetEl.classList.contains("bvi-images-grayscale")) {
      changeImageMode("grayscale");
    }

    resetActiveLinkFromBlock(".bvi-block_images");
    targetEl.classList.add("active");
  };

  const handleClickSpeechMode = (evt) => {
    const targetEl = evt.target;

    if (targetEl.classList.contains("bvi-speech-on")) {
      changeSpeechMode("true");
    } else if (targetEl.classList.contains("bvi-speech-off")) {
      changeSpeechMode("false");
    }

    resetActiveLinkFromBlock(".bvi-block_speech");
    targetEl.classList.add("active");
  };

  const hideBviPanel = () => {
    changeBviOption("bvi_panelHide", "true", "data-bvi-panelhide");

    const page = document.querySelector(".page");
    page.insertAdjacentHTML(
      "afterbegin",
      `
            <a href="#" class="bvi-link bvi-link-fixed-top bvi-no-styles bvi-show" data-bvi="panel-show"><i class="bvi-images bvi-images-eye bvi-images-size-32 bvi-no-styles bvi-background-image"></i></a>
            `
    );

    const bviPanel = document.querySelector(".bvi-panel");
    bviPanel.style.display = "none";

    const panelShowLink = document.querySelector('[data-bvi="panel-show"]');
    panelShowLink.addEventListener("click", handleClickPanelShow);

    if (BVI_OPTIONS.bvi_speech == "false") return;

    speakAboutChange("Панель скрыта");
  };

  const handleClickPanelShow = (evt) => {
    const el = evt.target;
    const bviPanel = document.querySelector(".bvi-panel");
    bviPanel.style.display = "block";
    el.remove();

    changeBviOption("bvi_panelHide", "false", "data-bvi-panelhide");

    if (BVI_OPTIONS.bvi_speech == "false") return;

    speakAboutChange("Панель открыта");
  };

  const changeBviOption = (optionName, value, dataOptionName) => {
    if (optionName == "bvi_fontSize") {
      BVI_OPTIONS[optionName] += value;
    } else {
      BVI_OPTIONS[optionName] = value;
    }

    const page = document.querySelector(".page");
    page.setAttribute(dataOptionName, BVI_OPTIONS[optionName]);
    localStorage.setItem("bvi_options", JSON.stringify(BVI_OPTIONS));
  };

  const handleClickSettings = (evt) => {
    const targetEl = evt.target;
    const elAttr = targetEl.getAttribute("data-bvi");
    if (elAttr == "close") {
      exitFromBvi();
    } else if (elAttr == "panel-hide") {
      hideBviPanel();
    } else if (elAttr == "modal") {
      openBviModal();
    }
  };

  const openBviModal = () => {
    document.body.classList.add("bvi-noscroll");

    const bviModal = document.querySelector(".bvi-modal");
    bviModal.classList.add("show");
  };

  const changeLetterSpacing = (letterSpacing) => {
    changeBviOption(
      "bvi_letterSpacing",
      letterSpacing,
      "data-bvi-letterspacing"
    );

    if (BVI_OPTIONS.bvi_speech == "false") return;

    if (letterSpacing == "normal") {
      speakAboutChange("Интервал между буквами: стандартный");
    } else if (letterSpacing == "average") {
      speakAboutChange("Интервал между буквами: средний");
    } else if (letterSpacing == "big") {
      speakAboutChange("Интервал между буквами: большой");
    }
  };

  const changeLineHeight = (lineHeight) => {
    changeBviOption("bvi_lineHeight", lineHeight, "data-bvi-lineheight");

    if (BVI_OPTIONS.bvi_speech == "false") return;

    if (lineHeight == "normal") {
      speakAboutChange("Межстрочный интервал: стандартный");
    } else if (lineHeight == "average") {
      speakAboutChange("Межстрочный интервал: средний");
    } else if (lineHeight == "big") {
      speakAboutChange("Межстрочный интервал: большой");
    }
  };

  const changeFontFamily = (fontFamily) => {
    changeBviOption("bvi_fontFamily", fontFamily, "data-bvi-fontfamily");

    if (BVI_OPTIONS.bvi_speech == "false") return;

    if (fontFamily == "arial") {
      speakAboutChange("Шрифт: без засечек");
    } else if (fontFamily == "times") {
      speakAboutChange("Шрифт: с засечками");
    }
  };

  const changeBuiltElements = (builtElement) => {
    changeBviOption(
      "bvi_builtElements",
      builtElement,
      "data-bvi-builtelements"
    );

    if (BVI_OPTIONS.bvi_speech == "false") return;

    if (builtElement == "true") {
      speakAboutChange("Встроенные элементы включены");
    } else if (builtElement == "false") {
      speakAboutChange("Встроенные элементы выключены");
    }
  };

  const handleClickModal = (evt) => {
    const targetEl = evt.target;

    if (
      targetEl.classList.contains("bvi-modal-close") ||
      targetEl.querySelector(".bvi-modal-content")
    ) {
      closeBviModal();
    }

    if (targetEl.classList.contains("bvi-letter-spacing-normal")) {
      changeLetterSpacing("normal");

      resetActiveLinkFromBlock(".bvi-block_letter-spacing");
      targetEl.classList.add("active");
    } else if (targetEl.classList.contains("bvi-letter-spacing-average")) {
      changeLetterSpacing("average");

      resetActiveLinkFromBlock(".bvi-block_letter-spacing");
      targetEl.classList.add("active");
    } else if (targetEl.classList.contains("bvi-letter-spacing-big")) {
      changeLetterSpacing("big");

      resetActiveLinkFromBlock(".bvi-block_letter-spacing");
      targetEl.classList.add("active");
    }

    if (targetEl.classList.contains("bvi-line-height-normal")) {
      changeLineHeight("normal");

      resetActiveLinkFromBlock(".bvi-block_line-height");
      targetEl.classList.add("active");
    } else if (targetEl.classList.contains("bvi-line-height-average")) {
      changeLineHeight("average");

      resetActiveLinkFromBlock(".bvi-block_line-height");
      targetEl.classList.add("active");
    } else if (targetEl.classList.contains("bvi-line-height-big")) {
      changeLineHeight("big");

      resetActiveLinkFromBlock(".bvi-block_line-height");
      targetEl.classList.add("active");
    }

    if (targetEl.classList.contains("bvi-font-family-arial")) {
      changeFontFamily("arial");

      resetActiveLinkFromBlock(".bvi-block_font-family");
      targetEl.classList.add("active");
    } else if (targetEl.classList.contains("bvi-font-family-times")) {
      changeFontFamily("times");

      resetActiveLinkFromBlock(".bvi-block_font-family");
      targetEl.classList.add("active");
    }

    if (targetEl.classList.contains("bvi-built-elements-on")) {
      changeBuiltElements("true");

      resetActiveLinkFromBlock(".bvi-block_built-elements");
      targetEl.classList.add("active");
    } else if (targetEl.classList.contains("bvi-built-elements-off")) {
      changeBuiltElements("false");

      resetActiveLinkFromBlock(".bvi-block_built-elements");
      targetEl.classList.add("active");
    }

    if (targetEl.classList.contains("bvi-reset")) {
      resetBvi();
    }
  };

  const resetBvi = () => {
    if (BVI_OPTIONS.bvi_speech == "true") {
      speakAboutChange("Установлены настройки по умолчанию");
    }

    BVI_OPTIONS = JSON.parse(JSON.stringify(BVI_DEFAULT_OPTIONS));
    localStorage.setItem("bvi_options", JSON.stringify(BVI_DEFAULT_OPTIONS));

    const page = document.querySelector(".page");
    for (const key of Object.keys(BVI_DEFAULT_OPTIONS)) {
      const bviAttr = key.replace("_", "-");
      page.setAttribute(`data-${bviAttr}`, BVI_DEFAULT_OPTIONS[key]);
    }

    resetAllActiveLinks();
    setActiveLinks(BVI_OPTIONS);
  };

  const resetAllActiveLinks = () => {
    const allActiveLinks = document.querySelectorAll(
      ".bvi-panel .bvi-link.active"
    );
    allActiveLinks.forEach((link) => {
      link.classList.remove("active");
    });
  };

  const closeBviModal = () => {
    document.body.classList.remove("bvi-noscroll");

    const bviModal = document.querySelector(".bvi-modal");
    bviModal.classList.remove("show");
  };

  const speakAboutChange = (speakTest) => {
    speechSynthesis.cancel();

    const voices = speechSynthesis.getVoices();
    const utterance = new SpeechSynthesisUtterance(speakTest);
    utterance.voice = voices[4];
    speechSynthesis.speak(utterance);
  };

  const isBviActive = () => {
    const bviEnable = localStorage.getItem("bvi_enable");
    const bviOptions = localStorage.getItem("bvi_options");
    return !!(bviEnable && bviOptions);
  };

  const handleScroll = () => {
    let scroll =
      window.pageYOffset !== undefined
        ? window.pageYOffset
        : (
            document.documentElement ||
            document.body.parentNode ||
            document.body
          ).scrollTop;

    if (scroll > 200) {
      document.querySelector(".bvi-panel").classList.add("bvi-fixed-top");
    } else {
      document.querySelector(".bvi-panel").classList.remove("bvi-fixed-top");
    }
  };

  const enableBvi = () => {
    localStorage.setItem("bvi_enable", "true");

    const bviPanel = document.querySelector(".bvi-panel");
    bviPanel.style.display = "block";

    const page = document.querySelector(".page");
    page.classList.add("bvi-body");

    if (isBviActive()) {
      BVI_OPTIONS = JSON.parse(localStorage.getItem("bvi_options"));

      for (const key of Object.keys(BVI_OPTIONS)) {
        const bviAttr = key.replace("_", "-");
        page.setAttribute(`data-${bviAttr}`, BVI_OPTIONS[key]);
      }

      setActiveLinks(BVI_OPTIONS);
    } else {
      localStorage.setItem("bvi_options", JSON.stringify(BVI_DEFAULT_OPTIONS));

      for (const key of Object.keys(BVI_DEFAULT_OPTIONS)) {
        const bviAttr = key.replace("_", "-");
        page.setAttribute(`data-${bviAttr}`, BVI_DEFAULT_OPTIONS[key]);
      }

      setActiveLinks(BVI_DEFAULT_OPTIONS);
    }

    const bviBlockFontSize = document.querySelector(".bvi-block_font-size")
    bviBlockFontSize.addEventListener("click", handleClickFontSize)

    const bviBlockColorTheme = document.querySelector(".bvi-block_color-theme")
    bviBlockColorTheme.addEventListener("click", handleClickColorTheme)

    const bviBlockImages = document.querySelector(".bvi-block_images")
    bviBlockImages.addEventListener("click", handleClickImagesMode)

    const bviBlockSpeech = document.querySelector(".bvi-block_speech")
    bviBlockSpeech.addEventListener("click", handleClickSpeechMode)

    const bviBlockSettings = document.querySelector(".bvi-block_settings")
    bviBlockSettings.addEventListener("click", handleClickSettings)

    const bviModal = document.querySelector(".bvi-modal")
    bviModal.addEventListener("click", handleClickModal)
    
    window.addEventListener("scroll", handleScroll);
  };

  const setActiveLinks = (OPTIONS) => {
    const currentImageMode = OPTIONS.bvi_images;
    let imageModeLink;
    if (currentImageMode == "true") {
      imageModeLink = document.querySelector(".bvi-images-on");
    } else if (currentImageMode == "false") {
      imageModeLink = document.querySelector(".bvi-images-off");
    } else if (currentImageMode == "grayscale") {
      imageModeLink = document.querySelector(".bvi-images-grayscale");
    }
    imageModeLink.classList.add("active");

    const currentSpeechMode = OPTIONS.bvi_speech;
    let speechModeLink;
    if (currentSpeechMode == "true") {
      speechModeLink = document.querySelector(".bvi-speech-on");
    } else {
      speechModeLink = document.querySelector(".bvi-speech-off");
    }
    speechModeLink.classList.add("active");

    const currentPanelHide = OPTIONS.bvi_panelHide;
    const page = document.querySelector(".page");
    if (currentPanelHide == "true") {
      page.insertAdjacentHTML(
        "afterbegin",
        `
            <a href="#" class="bvi-link bvi-link-fixed-top bvi-no-styles bvi-show" data-bvi="panel-show"><i class="bvi-images bvi-images-eye bvi-images-size-32 bvi-no-styles bvi-background-image"></i></a>
            `
      );
      const bviPanel = document.querySelector(".bvi-panel");
      bviPanel.style.display = "none";

      const bviPanelShow = document.querySelector('[data-bvi="panel-show"]');
      bviPanelShow.addEventListener("click", handleClickPanelShow);
    }

    const currentLetterSpacing = OPTIONS.bvi_letterSpacing;
    let letterSpacingLink;
    if (currentLetterSpacing == "normal") {
      letterSpacingLink = document.querySelector(".bvi-letter-spacing-normal");
    } else if (currentLetterSpacing == "average") {
      letterSpacingLink = document.querySelector(".bvi-letter-spacing-average");
    } else if (currentLetterSpacing == "big") {
      letterSpacingLink = document.querySelector(".bvi-letter-spacing-big");
    }
    letterSpacingLink.classList.add("active");

    const currentLineHeight = OPTIONS.bvi_lineHeight;
    let lineHeightLink;
    if (currentLineHeight == "normal") {
      lineHeightLink = document.querySelector(".bvi-line-height-normal");
    } else if (currentLineHeight == "average") {
      lineHeightLink = document.querySelector(".bvi-line-height-average");
    } else if (currentLineHeight == "big") {
      lineHeightLink = document.querySelector(".bvi-line-height-big");
    }
    lineHeightLink.classList.add("active");

    const currentFontFamily = OPTIONS.bvi_fontFamily;
    let fontFamilyLink;
    if (currentFontFamily == "arial") {
      fontFamilyLink = document.querySelector(".bvi-font-family-arial");
    } else if (currentFontFamily == "times") {
      fontFamilyLink = document.querySelector(".bvi-font-family-times");
    }
    fontFamilyLink.classList.add("active");

    const currentBuiltElements = OPTIONS.bvi_builtElements;
    let builtElementsLink;
    if (currentBuiltElements == "true") {
      builtElementsLink = document.querySelector(".bvi-built-elements-on");
    } else if (currentBuiltElements == "false") {
      builtElementsLink = document.querySelector(".bvi-built-elements-off");
    }
    builtElementsLink.classList.add("active");
  };

  if (isBviActive()) {
    enableBvi();
  }

  const headerTopVision = document.querySelector(".header-top__vision");
  headerTopVision.addEventListener("click", function (e) {
    enableBvi();
  });
});
