import $ from 'jquery';

class SlideToggleModules {
  constructor(x) {
    this.clickDomClass = x;
    this.toggleClass = 'slide-show';
    this.toggleContentClass = 'dropdown-content';
    this.timeOffClass = 'timeoff';
    this.lock = true;
    this.time = 3000;
  }

  executeInit() {
    if (!this.lock) return;
    if ($(`.${this.clickDomClass}`).length) {
      this.defaultShowOrHide();
      this.moduleToggleClass();
      this.lock = false;
    }
    if ($(`.${this.timeOffClass}`).length) {
      this.timeOff();
    }
  }

  defaultShowOrHide() {
    $(`.${this.clickDomClass}`).each((index, el) => {
      const $dropdownContent = $(el)
        .find(`.${this.toggleContentClass}`)
        .first();
      if ($(el).hasClass(this.toggleClass)) {
        this.slideDownTransition($dropdownContent);
      } else {
        this.slideUpTransition($dropdownContent);
      }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  slideUpTransition($el) {
    $el.css('max-height', '0');
  }

  // eslint-disable-next-line class-methods-use-this
  slideDownTransition($el) {
    $el.css('max-height', 'none');
    const height = $el.outerHeight();
    $el.css('max-height', '0');
    setTimeout(function () {
      $el.css({
        'max-height': height,
      });
    }, 1);
  }

  moduleToggleClass() {
    $(document).on('click', `.${this.clickDomClass}`, (el) => {
      const $dropdownContent = $(el.currentTarget)
        .find(`.${this.toggleContentClass}`)
        .first();
      $(el.currentTarget).toggleClass(this.toggleClass);
      if ($(el.currentTarget).hasClass(this.toggleClass)) {
        this.slideDownTransition($dropdownContent);
      } else {
        this.slideUpTransition($dropdownContent);
      }
    });
    $(document).on('click', `.${this.toggleContentClass}`, (el) => {
      el.stopPropagation();
    });
  }

  moduleOffClick() {
    this.lock = true;
    $(`.${this.clickDomClass}`).off('click');
  }

  timeOff() {
    setTimeout(() => {
      this.slideUpTransition(
        $(`.${this.timeOffClass}`).find(`.${this.toggleContentClass}`),
      );
      $(`.${this.timeOffClass}`)
        .removeClass(this.toggleClass)
        .removeClass(this.timeOffClass);
    }, this.time);
  }
}

export default SlideToggleModules;
