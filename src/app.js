const progress = document.querySelector(".progress span");
const toast = document.querySelector(".toast");
const toastTitle = toast?.querySelector("strong");
const photoViewer = document.querySelector("[data-photo-viewer]");
const photoViewerFrame = photoViewer?.querySelector(".photo-viewer-frame");
const photoViewerImage = photoViewer?.querySelector("img");
let toastTimer;
let currentLanguage = "en";
let activePhotoTrigger;
let photoViewerTimer;

const chineseCopy = {
  navLabel: "主导航",
  backToTop: "返回顶部",
  languageLabel: "语言",
  navFormation: "形成过程",
  navPractice: "实践",
  navPerspectives: "思想视角",
  notionIndex: "Notion 索引",
  heroKicker: "一个源自内部的判断原点",
  heroIntro: "主体性，是独立思考的意识和能力；是以内部判断为主导的决策过程；也是将决定转化为行动的能力。",
  openLoop: "展开循环",
  heroVisualsLabel: "呈现健身成果的训练进展照片",
  subjectivityImageAlt: "一张带有红色侧光的训练后人像，呈现健身成果的可见反馈",
  agencyImageAlt: "一张身体状态记录照片，用于呈现训练后的体态变化证据",
  photoOneLabel: "01 / 习惯系统之后",
  photoTwoLabel: "02 / 系统化之前",
  thinkWithin: "在习惯系统和过程之后，身体给出答案。",
  leaveTrace: "以前从没有好好地、系统地做过这件事。",
  independentThinking: "独立思考",
  internalDecisionMaking: "内部主导的决策",
  definitionLabel: "定义",
  thinkDecideAct: "思考 · 决策 · 行动",
  definitionLead: "主体性不是确信自己永远正确，也不是拒绝外界影响。",
  definitionBody: "它是在保持对世界开放的同时，仍然成为自己判断的主要作者。外部声音是输入，而不是决策的替代品；行动是反馈，而不是对思考的背叛。",
  formationKicker: "它如何形成",
  formationHeading: "你不是在发现一个已经完成的自我。<br />你是在反复行动中塑造它。",
  formationIntro: "左图说明持续改变如何从 Identity 走向 Process，再形成 Outcome；右图呈现 Subjectivity、Agency 与 Habit System 彼此强化的关系。点击任意一层，可以预览后续的 Notion 跳转。",
  modelOneTitle: "由内而外的改变",
  modelTwoTitle: "主体性的飞轮",
  habitDiagramLabel: "Identity、Process 与 Outcome 三层同心圆",
  flywheelLabel: "Subjectivity、Agency 与 Habit System 相互强化的循环关系图",
  subjectivityNode: "判断的内部原点",
  agencyNode: "在行动中发现自己",
  systemNode: "把行动变成可重复的系统",
  identityShapesProcess: "Identity 塑造 Process。",
  processProducesOutcome: "Process 产生 Outcome。",
  actionRevealsIdentity: "行动让 Identity 逐渐清晰。",
  systemsReinforceIdentity: "系统反过来巩固 Identity。",
  formationThesis: "Subjectivity 或许处于中心，但单靠思考无法形成它。",
  formationCopyOne: "Agency 让判断开始运动。通过一次次选择、行动和现实反馈，原本模糊的自我认识会逐渐变得清晰。",
  formationCopyTwo: "Agency 也会催生 Habit System：一套降低行动成本、能够重复执行的结构。当行动不断积累，这套系统又会反过来巩固 Subjectivity。",
  practiceKicker: "实践",
  practiceHeading: "思考、决策、行动。<br />三者互相依赖。",
  thinkTitle: "独立思考",
  thinkBody: "不是本能地反对别人，而是有能力检查一个结论背后的逻辑、证据、假设和遗漏。",
  thinkItemOne: "持续追问“为什么”",
  thinkItemTwo: "寻找反例与第三种解释",
  thinkItemThree: "把推理过程写下来",
  decideTitle: "内部主导的决策",
  decideBody: "不是拒绝外部输入，而是由自己整合信息、权衡代价，并为最终决定承担责任。",
  decideItemOne: "明确目标与目标背后的真实意愿",
  decideItemTwo: "权衡证据、价值与代价",
  decideItemThree: "检查约束与可逆性",
  actBody: "把判断变成行动，让现实产生新的信息，再用这些信息修正判断。",
  actItemOne: "执行最小但有意义的下一步",
  actItemTwo: "用身份认同减少反复谈判",
  actItemThree: "区分谨慎与羞耻",
  openNotes: "打开笔记",
  caseLabel: "不要把最先看到的问题，误认为真正的问题。",
  caseOneTitle: "我想买一台血糖仪",
  caseOneBody: "为了观察血糖变化，更精确地管理糖分摄入。",
  caseTwoTitle: "为什么要管理血糖？",
  caseTwoBody: "为了控制饮食并降低体脂。",
  caseThreeTitle: "为什么要降低体脂？",
  caseThreeBody: "外形变化和容易气喘，暴露了更深层的担忧：体能与健康。",
  caseAnswerTitle: "仪器用来评估进展。<br />习惯才会创造进展。",
  caseAnswerBody: "先建立饮食、训练与记录的基础样本，再决定哪一种工具值得加入。",
  agencyKicker: "十倍的 Agency",
  agencyHeading: "想象一个 Agency 是现在十倍的你，就坐在旁边。",
  agencyQuestion: "他接下来的十分钟会做什么？",
  actionOneProblem: "你想去健身房，却觉得自己还不像一个属于那里的人。",
  actionOneAnswer: "先去一次，只待十分钟。",
  actionTwoProblem: "工作已经完成，但其他人还坐在工位上。",
  actionTwoAnswer: "正常离开，把时间还给自己。",
  actionThreeProblem: "你需要把问题问清楚，却担心继续提问会显得无知。",
  actionThreeAnswer: "再追问一个具体原因。",
  perspectivesKicker: "思想视角",
  perspectivesHeading: "Subjectivity 从来不是<br />一个孤立、自足的内核。",
  perspectivesIntro: "思想史不断回到同一种张力：主体既塑造世界，也被世界塑造。成熟的主体性必须同时容纳自由与限制。",
  perspectiveOneTitle: "主体组织经验",
  perspectiveOneBody: "人不是被动接收世界，而是通过认知框架让世界变得可以理解。",
  perspectiveTwoTitle: "选择与行动定义自我",
  perspectiveTwoBody: "主体始终处在身体、关系、历史和具体情境之中。",
  perspectiveThreeTitle: "规范也参与塑造主体",
  perspectiveThreeBody: "所谓“内心声音”，也可能由权力、语言和重复行为共同产生。",
  perspectiveFourTitle: "不同主体彼此校正",
  perspectiveFourBody: "独立思考不只是相信自己，也愿意让证据和他人暴露自己的盲区。",
  closingLabel: "一个可用于现实的定义",
  closingQuote: "身处不断塑造你的力量之中，<br />仍然保有理解、判断、选择与行动的能力。",
  footerLine: "独立思考 · 内部主导的决策 · Agency",
  backToTopText: "返回顶部 ↑",
  toastLabel: "NOTION 链接占位",
  linkWillBeAdded: "链接将在后续添加"
};

const originalCopy = new Map();
const originalHtml = new Map();
const originalAria = new Map();
const originalAlt = new Map();

document.querySelectorAll("[data-i18n]").forEach((element) => originalCopy.set(element, element.textContent));
document.querySelectorAll("[data-i18n-html]").forEach((element) => originalHtml.set(element, element.innerHTML));
document.querySelectorAll("[data-i18n-aria]").forEach((element) => originalAria.set(element, element.getAttribute("aria-label")));
document.querySelectorAll("[data-i18n-alt]").forEach((element) => originalAlt.set(element, element.getAttribute("alt")));

const applyLanguage = (language) => {
  currentLanguage = language;
  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    element.textContent = language === "zh" ? chineseCopy[key] ?? originalCopy.get(element) : originalCopy.get(element);
  });
  document.querySelectorAll("[data-i18n-html]").forEach((element) => {
    const key = element.dataset.i18nHtml;
    element.innerHTML = language === "zh" ? chineseCopy[key] ?? originalHtml.get(element) : originalHtml.get(element);
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    const key = element.dataset.i18nAria;
    element.setAttribute("aria-label", language === "zh" ? chineseCopy[key] ?? originalAria.get(element) : originalAria.get(element));
  });
  document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
    const key = element.dataset.i18nAlt;
    element.setAttribute("alt", language === "zh" ? chineseCopy[key] ?? originalAlt.get(element) : originalAlt.get(element));
  });
  document.querySelectorAll("[data-language]").forEach((button) => {
    const active = button.dataset.language === language;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
};

document.querySelectorAll("[data-language]").forEach((button) => {
  button.addEventListener("click", () => applyLanguage(button.dataset.language));
});

// Replace the empty values with the final Notion URLs when they are ready.
const notionLinks = {
  "Index": "",
  "Change Model": "",
  "Outcome": "",
  "Process": "",
  "Identity": "",
  "Subjectivity": "",
  "Agency": "",
  "Habit System": "",
  "Independent Thinking": "",
  "Decision Making": "",
  "Modern Subjectivity": "",
  "Existentialism": "",
  "Subjectivation": "",
  "Intersubjectivity": ""
};

const updateProgress = () => {
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = height > 0 ? window.scrollY / height : 0;
  progress?.style.setProperty("transform", `scaleX(${Math.min(1, Math.max(0, ratio))})`);
};

const showPlaceholder = (topic) => {
  if (!toast || !toastTitle) return;
  const suffix = currentLanguage === "zh" ? chineseCopy.linkWillBeAdded : "link will be added later";
  toastTitle.textContent = `${topic} — ${suffix}`;
  toast.classList.add("is-visible");
  toast.setAttribute("aria-hidden", "false");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
    toast.setAttribute("aria-hidden", "true");
  }, 2600);
};

document.querySelectorAll(".notion-trigger").forEach((trigger) => {
  const activate = () => {
    const topic = trigger.dataset.topic ?? "Notion page";
    const linkKey = trigger.dataset.linkKey ?? topic;
    const url = notionLinks[linkKey];
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }
    showPlaceholder(linkKey);
  };
  trigger.addEventListener("click", activate);
  if (trigger.getAttribute("role") === "button") {
    trigger.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activate();
      }
    });
  }
});

document.querySelectorAll(".habit-zone").forEach((zone) => {
  const setHovered = (hovered) => zone.classList.toggle("is-hovered", hovered);
  zone.addEventListener("pointerenter", () => setHovered(true));
  zone.addEventListener("pointerleave", () => setHovered(false));
  zone.addEventListener("focus", () => setHovered(true));
  zone.addEventListener("blur", () => setHovered(false));
});

document.querySelectorAll("[data-scroll-to]").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const target = document.getElementById(trigger.dataset.scrollTo);
    if (!target) return;
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - 80,
      behavior: "smooth"
    });
  });
});

const getViewerDimensions = (image, sourceRect) => {
  const maxHeight = window.innerHeight * 0.7;
  const maxWidth = Math.min(window.innerWidth * 0.92, 1180);
  const naturalRatio = image.naturalWidth && image.naturalHeight
    ? image.naturalWidth / image.naturalHeight
    : sourceRect.width / sourceRect.height;
  let height = maxHeight;
  let width = height * naturalRatio;

  if (width > maxWidth) {
    width = maxWidth;
    height = width / naturalRatio;
  }

  return { width, height };
};

const openPhotoViewer = (trigger) => {
  if (!photoViewer || !photoViewerFrame || !photoViewerImage) return;
  const sourceImage = trigger.querySelector("img");
  if (!sourceImage) return;

  window.clearTimeout(photoViewerTimer);
  activePhotoTrigger = trigger;
  const rect = trigger.getBoundingClientRect();
  const finalSize = getViewerDimensions(sourceImage, rect);

  photoViewerImage.src = sourceImage.currentSrc || sourceImage.src;
  photoViewerImage.alt = sourceImage.alt;
  photoViewer.setAttribute("aria-hidden", "false");
  document.body.classList.add("photo-viewer-open");

  photoViewerFrame.style.setProperty("--viewer-top", `${rect.top}px`);
  photoViewerFrame.style.setProperty("--viewer-left", `${rect.left}px`);
  photoViewerFrame.style.setProperty("--viewer-width", `${rect.width}px`);
  photoViewerFrame.style.setProperty("--viewer-height", `${rect.height}px`);
  photoViewerFrame.style.setProperty("--viewer-final-width", `${finalSize.width}px`);
  photoViewer.classList.add("is-open");
  photoViewer.classList.remove("is-ready", "is-closing");

  requestAnimationFrame(() => {
    photoViewer.classList.add("is-ready");
  });
};

const closePhotoViewer = () => {
  if (!photoViewer || !photoViewerFrame || !activePhotoTrigger) return;
  const rect = activePhotoTrigger.getBoundingClientRect();

  photoViewer.classList.add("is-closing");
  photoViewer.classList.remove("is-ready");
  photoViewerFrame.style.setProperty("--viewer-top", `${rect.top}px`);
  photoViewerFrame.style.setProperty("--viewer-left", `${rect.left}px`);
  photoViewerFrame.style.setProperty("--viewer-width", `${rect.width}px`);
  photoViewerFrame.style.setProperty("--viewer-height", `${rect.height}px`);

  window.clearTimeout(photoViewerTimer);
  photoViewerTimer = window.setTimeout(() => {
    photoViewer.classList.remove("is-open", "is-closing");
    photoViewer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("photo-viewer-open");
    activePhotoTrigger?.focus({ preventScroll: true });
    activePhotoTrigger = undefined;
  }, 520);
};

document.querySelectorAll("[data-photo-viewer-trigger]").forEach((trigger) => {
  trigger.addEventListener("click", () => openPhotoViewer(trigger));
});

photoViewer?.addEventListener("click", (event) => {
  if (!photoViewerFrame?.contains(event.target)) {
    closePhotoViewer();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && photoViewer?.classList.contains("is-open")) {
    closePhotoViewer();
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

document.querySelectorAll("[data-tilt]").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const box = card.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    card.style.setProperty("--tx", `${x * 10}px`);
    card.style.setProperty("--ty", `${y * 8}px`);
  });

  card.addEventListener("pointerleave", () => {
    card.style.setProperty("--tx", "0px");
    card.style.setProperty("--ty", "0px");
  });
});

window.addEventListener("scroll", updateProgress, { passive: true });
applyLanguage("en");
updateProgress();
