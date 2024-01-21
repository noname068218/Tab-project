window.addEventListener("DOMContentLoaded", () => {
  //tab
  const tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent"),
    tabsParent = document.querySelector(".tabheader__items");
  const hideTabContent = () => {
    tabsContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });
    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  };

  const showTabContent = (i = 0) => {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  };
  hideTabContent();
  showTabContent();

  tabsParent.addEventListener("click", (event) => {
    const target = event.target;

    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
  //timer

  // Set your deadline, e.g., January 31, 2024 00:00:00 UTC
  const deadline = new Date("2024-01-31T00:00:00Z");

  // Call setClock with the selector and deadline

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      hours = Math.floor((t / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((t / 1000 / 60) % 60),
      seconds = Math.floor((t / 1000) % 60);

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();
    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }
  setClock(".timer", deadline);

  //Modal

  const modalTrigger = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal"),
    modalCloseBtn = document.querySelector("[data-close]");

  modalTrigger.forEach((event) => {
    event.addEventListener("click", openModal);
  });

  function openModal() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    clearInterval(modalTimerID);
  }

  function closeModal() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }

  modalCloseBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });

  // const modalTimerID = setTimeout(openModal, 9000);

  function showModalByScroll() {
    if (
      window.pageXOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  window.addEventListener("scroll", showModalByScroll);

  // Class for card

  class MenuCard {
    constructor(src, alt, titel, descr, price, parentSelector) {
      this.src = src;
      this.alt = alt;
      this.titel = titel;
      this.descr = descr;
      this.price = price;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 5;
      this.changeToEuro();
    }

    changeToEuro() {
      this.price = this.price * this.transfer;
    }
    render() {
      const element = document.createElement("div");
      element.innerHTML = `
                <div class="menu__item">
                    <img src=${this.src} alt=${this.alt} />
                    <h3 class="menu__item-subtitle">${this.titel}</h3>
                    <div class="menu__item-descr">
                      ${this.descr}
                    </div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                      <div class="menu__item-cost">Price:</div>
                      <div class="menu__item-total"><span>${this.price}</span> $/day</div>
                    </div>
                  </div>
      `;
      this.parent.append(element);
    }
  }

  new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    "Fitness Menu",
    "The Fitness menu is a new approach to preparing dishes: more fresh vegetables and fruits. Product for active and healthy people. This is an entirely new product with an optimal price and high quality!",
    10,
    ".menu .container"
  ).render();

  new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    "Menu Premium",
    "In the Premium menu, we use not only beautiful packaging design but also high-quality dish execution. Salmon, seafood, fruits - arestaurant menu without going to a restaurant!",
    9,
    ".menu .container"
  ).render();

  new MenuCard(
    "img/tabs/post.jpg",
    "post",
    "Post Menu",
    " The Post Menu is a careful selection of ingredients: complete absence of animal products, almond, oat, coconut, or buckwheat milk, the right amount of proteins due to tofu and imported  vegetarian steaks.",
    7,
    ".menu .container"
  ).render();
});
