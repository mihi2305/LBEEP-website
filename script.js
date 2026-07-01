const menuButton = document.querySelector(".menu-button");
const globalNav = document.querySelector(".global-nav");
const progressBar = document.querySelector(".scroll-progress span");
const heroImage = document.querySelector(".hero-image");
const finalImage = document.querySelector(".final-action > img");
const stickyCta = document.querySelector(".sticky-cta");
const scheduleTabs = document.querySelectorAll(".schedule-tab");
const schedulePanels = document.querySelectorAll(".schedule-panel");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const scheduleDays = ["月", "火", "水", "木", "金"];
const schedulePeriods = [
  { label: "1限", time: "8:50-10:20" },
  { label: "2限", time: "10:30-12:00" },
  { label: "3限", time: "13:00-14:30" },
  { label: "4限", time: "14:40-16:10" },
  { label: "5限", time: "16:15-17:45" },
  { label: "6限", time: "17:50-19:20" },
  { label: "7限", time: "19:25-20:55" },
];
const scheduleCategory = {
  lbeep: { label: "LBEEP必修", className: "course-lbeep" },
  law: { label: "法律・政治", className: "course-law" },
  econ: { label: "経済・経営", className: "course-econ" },
  general: { label: "教養・語学", className: "course-general" },
  seminar: { label: "ゼミ", className: "course-seminar" },
};
const scheduleData = {
  oneSpring: {
    description: "1年春は、LBEEPに慣れる学期です。導入演習Ⅰ・Ⅱや課題発見の手法を通じて、考える・伝える・議論する土台を作ります。",
    courses: [
      ["月", 2, "自立英語", "general"], ["月", 3, "線形代数Ⅰ", "general"],
      ["火", 2, "課題発見の手法", "lbeep"], ["火", 3, "法学入門", "law"], ["火", 4, "英語プレゼンテーション", "general"], ["火", 5, "経営者から学ぶリーダーシップと経営理論", "econ"],
      ["水", 4, "導入演習Ⅰ", "lbeep"], ["水", 5, "導入演習Ⅱ", "lbeep"], ["水", 7, "経済Ⅰ", "econ"],
      ["木", 2, "社会の制度を考える", "law"], ["木", 3, "コンピューターリテラシー", "econ"], ["木", 4, "ミクロ経済学入門", "econ"], ["木", 5, "基礎演習", "general"],
      ["金", 2, "ポリティカル・エコノミー入門", "law"],
    ],
  },
  oneFall: {
    description: "1年秋は、課題分析の手法を中心に、経済・経営系や政治・制度系へ学びを広げる学期です。",
    courses: [
      ["月", 2, "英語LR", "general"], ["月", 6, "海洋工学と社会", "general"],
      ["火", 2, "課題分析の手法", "lbeep"], ["火", 3, "特別支援教育入門", "general"], ["火", 4, "英語ライティング", "general"], ["火", 5, "ベンチャーから学ぶマネジメント", "econ"],
      ["水", 2, "Principles of Economics", "econ"], ["水", 4, "マクロ経済学入門", "econ"], ["水", 7, "経済Ⅱ", "econ"],
      ["木", 1, "Basics of Business Accounting", "econ"], ["木", 3, "データ解析", "econ"], ["木", 4, "現代政治", "law"],
      ["金", 1, "経済史入門", "econ"], ["金", 2, "関税政策と税関行政", "law"],
    ],
  },
  twoSpring: {
    description: "2年春は、法律科目と経済専門科目が一気に増える学期です。民法・労働法・経済法・刑事法などに触れながら、経済原論・経済政策・ファイナンスなども並行して学びます。",
    courses: [
      ["月", 2, "社会科学概論A", "general"], ["月", 5, "銀行論〈横浜銀行連携講座〉", "econ"],
      ["火", 2, "民法〈親族・相続〉", "law"], ["火", 3, "現代経済システムⅠ", "econ"], ["火", 4, "English for Economics and Business", "general"],
      ["水", 2, "労働法", "law"], ["水", 3, "経済原論1,2", "econ"], ["水", 4, "経済原論1,2", "econ"],
      ["木", 2, "経済法", "law"], ["木", 3, "現代経済システムⅠ", "econ"], ["木", 4, "刑事法", "law"],
      ["金", 2, "ファイナンス", "econ"], ["金", 3, "経済政策1,2", "econ"], ["金", 4, "経済政策1,2", "econ"],
    ],
  },
  twoFall: {
    description: "2年秋は、法律科目の密度がかなり高くなる学期です。民法・憲法・有価証券法・民事訴訟法などを学びながら、マクロ経済学・会計・ファイナンスなどの経済・経営系科目も履修します。",
    courses: [
      ["月", 3, "経営者が語るこれからの企業戦略・イノベーションと若者への期待", "econ"], ["月", 5, "コーポレート・ファイナンス", "econ"],
      ["火", 2, "民法〈総則・物権〉", "law"], ["火", 3, "有価証券法", "law"], ["火", 4, "English for Academic Purposes（EAP）", "general"],
      ["水", 2, "地域イノベーション政策", "law"], ["水", 3, "憲法Ⅰ", "law"], ["水", 4, "憲法Ⅱ", "law"],
      ["木", 2, "原価会計論", "econ"], ["木", 3, "マクロ経済学1", "econ"], ["木", 3, "マクロ経済学2", "econ"], ["木", 4, "マクロ経済学1", "econ"], ["木", 4, "マクロ経済学2", "econ"],
      ["金", 2, "会計実務入門", "econ"], ["金", 4, "民事訴訟法", "law"],
    ],
  },
  threeSpring: {
    description: "3年春は、ゼミや産学官連携演習が本格化し、LBEEPの実践的な学びが深まる学期です。国際法・知的財産法・現代公共政策などの法律・政策系科目に加えて、国際環境経済論や中級比較農業政策など、社会課題に近い経済系科目も学びます。",
    courses: [
      ["火", 1, "身の回りの科学", "general"], ["火", 4, "学校教育と子どもの発達・教師の成長", "general"],
      ["水", 2, "国際法", "law"], ["水", 3, "知的財産法", "law"], ["水", 4, "産学官連携演習Ⅰ", "lbeep"], ["水", 5, "産学官連携演習Ⅰ", "lbeep"],
      ["木", 2, "現代公共政策", "law"], ["木", 3, "国際環境経済論", "econ"], ["木", 5, "ゼミナールⅠ", "seminar"],
      ["金", 3, "中級比較農業政策", "econ"], ["金", 4, "中級比較農業政策", "econ"],
    ],
  },
  threeFall: {
    description: "3年秋は、専門科目をさらに絞り込み、自分の関心に合わせて法律・政策・経済系の学びを深める学期です。中級国際経済史や中級現代公共政策、中級国際環境経済など、社会課題をより専門的に考える科目が中心になります。",
    courses: [
      ["水", 2, "中級国際経済史", "econ"],
      ["木", 2, "中級現代公共政策", "law"], ["木", 3, "中級国際環境経済", "econ"], ["木", 5, "ゼミナールⅠ", "seminar"],
    ],
  },
  fourSpring: {
    description: "4年春は、授業数が絞られ、ゼミ・卒論・就活に時間を使いやすくなる学期です。法律系のゼミや社会保障法を履修しながら、経済史や経済と倫理など、経済学部らしい科目も学びます。",
    courses: [
      ["火", 4, "立法政策と法ゼミ", "seminar"],
      ["木", 2, "経済史Ⅰ", "econ"],
      ["金", 3, "社会保障法", "law"], ["金", 4, "経済と倫理", "econ"],
    ],
  },
};

const createCourseCard = ([, , name, categoryKey]) => {
  const category = scheduleCategory[categoryKey];
  const card = document.createElement("div");
  card.className = `course-card ${category.className}`;
  const title = document.createElement("b");
  title.textContent = name;
  const label = document.createElement("span");
  label.textContent = category.label;
  card.append(title, label);
  return card;
};

const renderSchedule = (panel) => {
  const term = scheduleData[panel.dataset.term];
  if (!term || panel.dataset.rendered === "true") return;

  const comment = document.createElement("p");
  comment.className = "student-comment";
  comment.textContent = term.description;

  const wrap = document.createElement("div");
  wrap.className = "schedule-wrap";
  wrap.setAttribute("role", "region");
  const tabLabel = document.getElementById(panel.getAttribute("aria-labelledby"))?.innerText.replace(/\s+/g, " ");
  wrap.setAttribute("aria-label", `${tabLabel} の時間割`);
  wrap.tabIndex = 0;

  const schedule = document.createElement("div");
  schedule.className = "schedule";

  const corner = document.createElement("div");
  corner.className = "cell corner";
  corner.textContent = "TIME";
  schedule.append(corner);

  scheduleDays.forEach((day) => {
    const dayCell = document.createElement("div");
    dayCell.className = "cell day";
    dayCell.textContent = day;
    schedule.append(dayCell);
  });

  schedulePeriods.forEach((period, periodIndex) => {
    const timeCell = document.createElement("div");
    timeCell.className = "cell time";
    timeCell.innerHTML = `${period.label}<small>${period.time}</small>`;
    schedule.append(timeCell);

    scheduleDays.forEach((day) => {
      const cell = document.createElement("div");
      const courses = term.courses.filter((course) => course[0] === day && course[1] === periodIndex + 1);
      cell.className = courses.length ? "cell" : "cell free";

      if (courses.length) {
        const stack = document.createElement("div");
        stack.className = "course-stack";
        courses.forEach((course) => stack.append(createCourseCard(course)));
        cell.append(stack);
      }

      schedule.append(cell);
    });
  });

  wrap.append(schedule);
  panel.append(comment, wrap);
  panel.dataset.rendered = "true";
};

schedulePanels.forEach(renderSchedule);

menuButton.addEventListener("click", () => {
  const opening = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(opening));
  globalNav.classList.toggle("is-open", opening);
});

globalNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuButton.setAttribute("aria-expanded", "false");
    globalNav.classList.remove("is-open");
  });
});

scheduleTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    const targetId = tab.dataset.schedule;
    scheduleTabs.forEach((item) => {
      const selected = item === tab;
      item.classList.toggle("is-active", selected);
      item.setAttribute("aria-selected", String(selected));
      item.tabIndex = selected ? 0 : -1;
    });
    schedulePanels.forEach((panel) => {
      const selected = panel.id === targetId;
      panel.classList.toggle("is-active", selected);
      panel.hidden = !selected;
    });
  });

  tab.tabIndex = tab.classList.contains("is-active") ? 0 : -1;
  tab.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    let nextIndex = index;
    if (event.key === "ArrowLeft") nextIndex = index === 0 ? scheduleTabs.length - 1 : index - 1;
    if (event.key === "ArrowRight") nextIndex = index === scheduleTabs.length - 1 ? 0 : index + 1;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = scheduleTabs.length - 1;
    scheduleTabs[nextIndex].focus();
    scheduleTabs[nextIndex].click();
  });
});

const updateScrollEffects = () => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
  progressBar.style.width = `${progress}%`;

  if (!reducedMotion) {
    heroImage.style.transform = `translate3d(0, ${Math.min(window.scrollY * 0.12, 85)}px, 0)`;
    const finalRect = finalImage.parentElement.getBoundingClientRect();
    if (finalRect.top < window.innerHeight && finalRect.bottom > 0) {
      finalImage.style.transform = `translate3d(0, ${finalRect.top * 0.05}px, 0)`;
    }
  }

  stickyCta.hidden = window.scrollY < window.innerHeight * 0.65;
};

let ticking = false;
window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      updateScrollEffects();
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

const revealElements = document.querySelectorAll(".reveal");
if (reducedMotion || !("IntersectionObserver" in window)) {
  revealElements.forEach((element) => element.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px" });
  revealElements.forEach((element) => observer.observe(element));
}

updateScrollEffects();
