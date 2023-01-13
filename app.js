import sublinks from './data.js';

//Declaration
const toggleBtn = document.querySelector('.toggle-btn');
const closeBtn = document.querySelector('.close-btn');
const sidebarWrapper = document.querySelector('.sidebar-wrapper');
const sidebar = document.querySelector('.sidebar-links');

const linkBtns = [...document.querySelectorAll('.link-btn')];
const submenu = document.querySelector('.submenu');
const hero = document.querySelector('.submenu');
const nav = document.querySelector('.nav');

//toggler functionallity
toggleBtn.addEventListener('click', () => {
  sidebarWrapper.classList.add('show');
});
closeBtn.addEventListener('click', () => {
  sidebarWrapper.classList.remove('show');
});

//set sidebar
sidebar.innerHTML = sublinks
  .map((item) => {
    const { page, links } = item;
    return `<article>
 <h4>${page}</h4>
 <div class="sidebar-sublinks">
 ${links
   .map((link) => {
     const { label, icon, url } = link;
     return `<a href="${url}">
     <i class="${icon}"></i>${label}
     </a>`;
   })
   .join('')}
 </article>`;
  })
  .join('');

//submenu mouseover
//getBoundingClientrect() method returns an object -returns the size of an elment position relative to the viewport
//x increase to the right and y increase to the bottom
linkBtns.forEach((btn) => {
  btn.addEventListener('mouseover', function (e) {
    const text = e.currentTarget.textContent; //text in my btn html
    //find method is array iterator and will return result or undefined
    const tempPage = sublinks.find(({ page }) => page === text); //if it matches
    console.log(text);
    //our getBoundingClientRect function
    const tempBtn = e.currentTarget.getBoundingClientRect();
    const bottom = tempBtn.bottom - 3; //bottom means from the viewport start to the object bottom --so we are saying that 3px up from the bottom
    //calculating the center
    const center = (tempBtn.left + tempBtn.right) / 2;
    console.log(center);
    //submenu-if there is a temppage we want to iterate over and add page and links
    if (tempPage) {
      const { page, links } = tempPage;
      submenu.classList.add('show');
      submenu.style.left = `${center}px`;
      submenu.style.top = `${bottom}px`;

      //optional column display
      let columns = 'col-2'; //default 2 column
      if (links.length === 3) {
        //if it is equal to 3
        columns = 'col-3';
      } else if (links.length > 3) {
        //if it is greater than 3
        columns = 'col-4';
      }

      submenu.innerHTML = `
      <section>
      <h4>${page}</h4>
      <div class="submenu-center ${columns}">
${links
  .map((link) => {
    return `<a href="${link.url}">
  <i class="${link.icon}"></i> ${link.label}
  </a>`;
  })
  .join('')}
      </div>
      </section>`;
    }
  });
});

//hiding the link btns
hero.addEventListener('mouseover', function (e) {
  setTimeout(function () {
    return submenu.classList.remove('show');
  }, 3000);
});

nav.addEventListener('mouseover', function (e) {
  if (!e.target.classList.contains('link-btn')) {
    submenu.classList.remove('show');
  }
});

//target and currentTarget
//target is -identify the element which the event occured[more specific]
//currenttarget-element to which the event handler attached to
