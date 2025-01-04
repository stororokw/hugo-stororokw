const button = document.querySelector(".left-bread-crumb");
const button1 = document.querySelector(".right-bread-crumb");
const toc = document.querySelector(".toc");
const side = document.querySelector(".side");
const burger = document.querySelector(".burger");
const navbarIcons = document.querySelector(".navbar-icons");
const navigationBar = document.querySelector(".navbar");
const article = document.querySelector('article');
const page = document.querySelector('.page-container');

const themeButton = document.querySelector('#theme-switch-button');
const doc = document.firstElementChild;

const scrollToTopButton = document.querySelector('#scrollToTop');

function scrollToTop()
{
    window.scrollTo(0, 0);
}

scrollToTopButton.onclick = scrollToTop;

function setTheme(theme)
{
    doc.setAttribute('color-scheme', theme);
    localStorage.setItem('color-scheme', theme);
}

themeButton.addEventListener("click", (e) => 
{
    if(doc.getAttribute("color-scheme") == "light")
    {
        setTheme("dark");
    }else
    {
        setTheme("light");
    }
});

function onClassChange(node, callback) {
    if(node === null)
    {
        return;    
    }
    let previousClassListString = node.classList.toString();
    const mutationObserver = new MutationObserver((mutationList) => 
    {
        for (const item of mutationList)
        {
            if (item.attributeName === "class")
            {
                const classListString = node.classList.toString();
                if (classListString !== previousClassListString)
                {
                    callback(classListString);
                    previousClassListString = classListString;
                    break;
                }
            }
        }
    });
  
    mutationObserver.observe(node, { attributes: true });
  
    return mutationObserver;
  }

onClassChange(document.querySelector(".toc"), (classListString)=>{
    page.classList.toggle('darken-background');
    article.classList.toggle('darken');
    if(classListString === "toc expand")
    {

        toc.animate(
            [{ transform: "translateX(-100%)" }, { transform: "translateX(0%)" }],
            {
                easing: "ease-in",
                duration: 200,
            },
        );

    }
    else if(window.getComputedStyle(burger, null).display != "none")
    {
        toc.animate(
            [{ transform: "translateX(0%)", display:"block" }, { transform: "translateX(-100%)", display:"none" }],
            {
                easing: "ease-out",
                duration: 200,
            },
        );
    }
});

onClassChange(document.querySelector(".side"), (classListString) =>
{
    page.classList.toggle('darken-background');
    article.classList.toggle('darken');
    if(classListString === "side expand")
        {
            side.animate(
                [{ transform: "translateX(100%)" }, { transform: "translateX(0%)" }],
                {
                    easing: "ease-in",
                    duration: 200,
                },
            );
        }
        else if(window.getComputedStyle(burger, null).display != "none")
        {
            side.animate(
                [{ transform: "translateX(0%)", display:"block" }, { transform: "translateX(100%)", display:"none" }],
                {
                    easing: "ease-out",
                    duration: 200,
                },
            );
        }
});

button.addEventListener("click", (e) =>{

    toc.classList.toggle('expand');

});

if(burger != null)
burger.addEventListener("click", (e) =>{

    side.classList.toggle('expand');
});

document.addEventListener("click", (e)=>{

    if(button != null && !button.contains(e.target) && toc && !toc.contains(e.target))
    {
        toc.classList.remove('expand');
    }

    if(burger && !burger.contains(e.target) && side && !side.contains(e.target))
    {
        side.classList.remove('expand');
    }
});

let sections = document.querySelectorAll('article h2[id], article h3[id], article h4[id], article h5[id], article h6[id]');
const tocLinks = document.querySelectorAll('.toc-container li a');
const navigationBarRect = navigationBar.getBoundingClientRect();
const navigationBarHeight = navigationBarRect.height;

function setActiveSection()
{
    let id = null;
    let index = 0;
    for(const sec of sections)
    {
        const top = window.scrollY;
        
        const rect = sec.getBoundingClientRect();
        let offset = Math.abs(rect.top + window.scrollY);
        // this provide some buffer between headings and will set active the highligh on the toc early.
        // offset -= Number(navigationBarHeight) * 2;
        // display when heading is visible
        // check if the current offset is out of the screen first
        let start = Math.abs(rect.top);
        if(start < window.scrollY)
        {
            offset = Math.abs(window.scrollY + rect.top) - Math.abs(window.innerHeight );
        }
        else if(window.scrollY < sections[0].getBoundingClientRect().top)
        {
            id = sections[0].getAttribute("id");
            break;
        }

        // only use if the heading + content is defined using <section>
        // offset -= sec.getBoundingClientRect().height * 0.5;
        const bottom = Math.abs(document.documentElement.clientHeight) + window.scrollY;
        // If we are at the bottom of the page then set to the last section.
        // The last section may not make it all the way to the trigger zone.
        if(bottom >= Math.floor(article.getBoundingClientRect().bottom + window.scrollY))
        {
            id = sections[sections.length - 1].getAttribute("id");
            break;
        }

        if(top >= offset)
        {
            id = sec.getAttribute("id");
        }
        index++;
    }

    for(const link of tocLinks)
    {
        // console.log(("#" + id));
        if(link.getAttribute("href") == ("#" + id))
        {
            link.classList.add('active');
        }
        else
        {
            link.classList.remove('active');
        }
    }
    
}
setActiveSection();
document.addEventListener("scroll", (e)=>
{
    setActiveSection();
}, {passive: true});

let touchStartX = 0;
let touchEndX = 0;
let touchStartTime = 0;
let touchEndTime = 0;

let dt = 0;
window.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartTime = e.timeStamp;
}, {passive:false});

window.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndTime = e.timeStamp;
    let distance = Math.abs(touchStartX - touchEndX);
    if((touchEndTime - touchStartTime) < 200 && distance > 100)
    {
        // swipe to the left
        if(touchEndX < touchStartX)
        {
            const element = document.querySelector(".toc.expand");
            if(element)
            {
                toc.classList.toggle('expand');
            }
            else
            {
                side.classList.toggle('expand');

            }
        }
        
        // swipe to the right
        if(touchEndX > touchStartX)
        {
            const element = document.querySelector(".side.expand");
            if(element)
            {
                side.classList.toggle('expand');
            }
            else
            {
                toc.classList.toggle('expand');
            }
            
        }
    }

}, {passive:false});