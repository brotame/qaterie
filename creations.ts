window.addEventListener('DOMContentLoaded', () => {
  const moveTop = (e: MouseEvent) => {
    if (window.innerWidth > 991) return;

    const menu = document.querySelector('.creations-tabs-menu') as HTMLElement;
    const target = e.currentTarget as ChildNode;
    const all = document.querySelector('.creations-tab-link.first');

    menu.prepend(target);
    target.after(all);
  };

  const links = document.querySelectorAll('.creations-tab-link') as NodeListOf<
    HTMLElement
  >;

  links.forEach((link) => {
    link.addEventListener('click', moveTop);
  });
});
