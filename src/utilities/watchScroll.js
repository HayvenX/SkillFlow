function watchScroll(func, elements) {
  if (!elements || elements.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      func(entries);
    },
    { rootMargin: '0px 0px -50% 0px' },
  );

  elements.forEach((element) => {
    observer.observe(element);
  });
}

export default watchScroll;
