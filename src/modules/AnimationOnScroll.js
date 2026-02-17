import watchScroll from '@/utilities/watchScroll';

function waitDelay(element, isVisible) {
  const {
    animationDelay = 0,
    animationDelayToShow,
    animationDelayToHide,
  } = element.dataset;

  const defaultDelay = Number(animationDelay) || 0;
  const showDelay = Number(animationDelayToShow) || defaultDelay;
  const hideDelay = Number(animationDelayToHide) || defaultDelay;

  const delay = isVisible ? showDelay : hideDelay;
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

class AnimationOnScroll {
  documentClassName = 'js-scroll-animation-init';
  selector = '[data-animate-on-scroll]';

  defaultClassName = 'hidden';

  offsetCoefficient = 0.5;

  constructor() {
    this.elements = [...document.querySelectorAll(this.selector)];
    if (this.elements.length === 0) {
      this.#removeDocumentClass();
      return;
    }

    this.#getGroupedElements();
    this.#bindEvents();
  }

  onIntersection = (entries) => {
    this.frameEntries = entries;

    entries.forEach((entry) => {
      const { boundingClientRect, target, isIntersecting } = entry;
      const groupMeta = this.#getGroupMeta(target);

      if (isIntersecting) {
        this.addClass(target, groupMeta);
        return;
      }

      const rect = boundingClientRect || target.getBoundingClientRect();
      const isAboveViewport = rect.bottom < 0;

      if (isAboveViewport) {
        return;
      }

      this.removeClass(target, groupMeta);
    });
  };

  addClass(element, groupMeta = null) {
    return this.#toggleClass(element, true, groupMeta);
  }

  removeClass(element, groupMeta = null) {
    return this.#toggleClass(element, false, groupMeta);
  }

  #removeDocumentClass() {
    document.documentElement.classList.remove(this.documentClassName);
  }

  #bindEvents() {
    window.addEventListener('load', () => this.#removeDocumentClass());
    watchScroll(this.onIntersection, this.elements);
  }

  #getGroupedElements() {
    this.groupedElements = this.elements.reduce((acc, el) => {
      const groupName = el.dataset.animationGroup;
      if (!groupName) return acc;

      if (!acc[groupName]) {
        acc[groupName] = [];
      }

      acc[groupName].push(el);
      return acc;
    }, {});
  }

  #getGroupMeta(element) {
    const { animationGroup, animationReverse } = element.dataset;
    if (!animationGroup || !this.groupedElements?.[animationGroup]) {
      return null;
    }

    const group = this.groupedElements[animationGroup];
    const index = group.indexOf(element);

    return {
      index,
      name: animationGroup,
      size: group.length,
      isReversed: animationReverse === 'true',
    };
  }

  async #toggleClass(element, isVisible, groupMeta = null) {
    if (groupMeta && groupMeta.size > 1 && groupMeta.index >= 0) {
      const { animationStep = 0 } = element.dataset;

      const stepDelay = Number(animationStep) || 0;

      if (stepDelay > 0) {
        await waitDelay(element, isVisible);
      }

      if (stepDelay > 0) {
        await new Promise((resolve) =>
          setTimeout(resolve, stepDelay * groupMeta.index),
        );
      }
    }

    const className = element.dataset.animationClass || this.defaultClassName;
    element.classList.toggle(className, !isVisible);
  }
}

export default AnimationOnScroll;
