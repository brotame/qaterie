window.addEventListener('DOMContentLoaded', function () {
  var moveTop = function (e) {
    if (window.innerWidth > 991) return;
    var menu = document.querySelector('.creations-tabs-menu');
    var target = e.currentTarget;
    var all = document.querySelector('.creations-tab-link.first');
    menu.prepend(target);
    target.after(all);
  };
  var links = document.querySelectorAll('.creations-tab-link');
  links.forEach(function (link) {
    link.addEventListener('click', moveTop);
  });
});
