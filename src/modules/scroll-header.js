import throttle from "lodash/throttle";

class ScrollHeader {
  constructor() {
    this.headerNode = document.querySelector("[data-header]");
    this.visible = false;
    this.scrolled = false;

    this.update = throttle(() => {
      this.scrollTop = this.getScrollTop();

      if (this.scrollTop <= 20) {
        if (this.scrolled) {
          this.scrolled = false;
          this.headerNode?.classList.remove("_scrolled");
        }
      } else if (!this.scrolled) {
        this.scrolled = true;
        this.headerNode?.classList.add("_scrolled");
      }
    }, 200);

    this.handleScroll = () => {
      this.update();
    };

    if (!this.headerNode) {
      return;
    }
    this.scrollTop = this.getScrollTop();

    this.addEvents();
    this.update();
  }

  addEvents() {
    window.addEventListener("scroll", this.handleScroll);
  }

  removeEvents() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  getScrollTop() {
    const scrollTop = window.pageYOffset;
    return scrollTop < 0 ? 0 : scrollTop;
  }
}

export default ScrollHeader;
