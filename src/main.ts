import {gsap} from 'gsap'; 
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Handle Image Opening
const imgContainers = document.querySelectorAll('.imgs > div');

imgContainers.forEach(container => {
    container.childNodes.forEach(imgContainer => {
        imgContainer.addEventListener('click', () => {
            const img = (imgContainer as HTMLElement).firstElementChild;
            console.log(img)
            const imgSrc = (img as HTMLImageElement).src;

            const overlay = document.createElement('div');
            const modal = document.createElement('div');
            const modalImg = document.createElement('img');
            const closeBtn = document.createElement('button');
            closeBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;

            overlay.classList.add('img-overlay');
            modal.classList.add('img-modal');
            
            overlay.appendChild(modal);
            overlay.appendChild(closeBtn);
            modal.appendChild(modalImg);

            modalImg.src = imgSrc;

            document.body.appendChild(overlay)

            overlay.addEventListener('click', (e) => {
                if (!(e.target as HTMLElement).classList.contains('img-overlay')) return;
                overlay.remove()
            })
            closeBtn.addEventListener('click', () => overlay.remove());

            

        })
    })
})

// Handle Background Animation
const background = document.querySelector('#background');

const maxNum = 12;


function createElement() {
    const span = document.createElement('span');
    const children = [];
    const childrenNum = 18;
    
    for (let i=0; i< childrenNum; i++) {
        const child = document.createElement('span');
        children.push(child);
    }

    span.append(...children);

    return [span, ...children];

}

for (let i=0; i < maxNum; i++) {
    const targets = createElement();
    const span = targets[0];

    let cordinates = {
        xVal: 100, yVal: 100
    }

    let tween = gsap.fromTo(
        cordinates, {yVal: 100, xVal: () => {let val = 0; do {val = Math.random() * 100;} while (val >= 30 && val <= 70); return val;}}, {
            yVal: -10,
            duration:(Math.random() * 8) + 12,
            ease: 'none',
            repeat: -1,
            repeatRefresh: true,
            onUpdate:() => span.style.cssText = `top: ${cordinates.yVal}%; left: ${cordinates.xVal}%;`,
        }
    ).pause()

    do {
        cordinates.xVal = Math.random() * 100;
        cordinates.yVal = Math.random() * 100;
        tween.seek(cordinates.yVal / 10);
    } while (cordinates.xVal >= 30 && cordinates.xVal <= 70);

    span.style.cssText = `top: ${cordinates.yVal}%; left: ${cordinates.xVal}%;`

    let top = 85;
    let tranceparency = 0.6;
    for (let ele of targets.slice(2)) {
        ele.style.cssText = `
            top: ${top}%;
            background-color: rgba(25, 25, 25, ${tranceparency});
            box-shadow: 0px 0px 6px 0.5px rgba(25, 25, 25, ${tranceparency-0.2});
        `;

        top += 85;
        tranceparency -= 0.6 / targets.slice(2).length;
    }

    tween.resume();



    gsap.to(targets.slice(1), {
        duration: 0.5,
        rotate: 360,
        repeat: -1,
        ease: 'none'
    })

    background?.appendChild(span);

}


// Handle Decoration

let scrollBtn = document.querySelector('#scrollback') as HTMLButtonElement;
let gradientLayer = document.querySelector('#gradient-layer') as HTMLDivElement;

let portfolioContainer = document.querySelector('#portfolio') as HTMLElement;
const otherProjectsEle = portfolioContainer.querySelector('.project-other') as HTMLElement;
scrollBtn.onclick = () => {
    if (window.scrollY > 250) {
        window.scroll({
            top: 0
        })
    }
}

window.onscroll = () => {
    if (window.scrollY > 250) {
        scrollBtn.style.cssText = `opacity: 1; cursor: pointer;`;
    }
    else {
        scrollBtn.style.cssText = ``;
    }

    const layerMinBound = (portfolioContainer.getBoundingClientRect().top + window.scrollY) + (portfolioContainer.querySelector('h2')?.clientHeight as number);
    const layerMaxBound = otherProjectsEle.getBoundingClientRect().top + window.scrollY + otherProjectsEle.clientHeight/2;


    if (window.scrollY >= layerMinBound && window.scrollY <= layerMaxBound) {
        gradientLayer.style.cssText = `opacity: 1; transform: translateY(0%);`
    }
    else {
        gradientLayer.style.cssText = ``;
    }
} 

// Handle Projects Animation

gsap.registerPlugin(ScrollTrigger)

const projects = document.querySelectorAll('.projects .project');
const animationPositions = [
    (projects[0].getBoundingClientRect().top + window.scrollY) / 2.5,
    (projects[1].getBoundingClientRect().top + window.scrollY) / 1.5,
    (projects[2].getBoundingClientRect().top + window.scrollY) / 1.2
];
const range = 300;



projects.forEach((project, idx) => {
    const name = project.querySelector('.name') as HTMLElement;
    const desc = project.querySelector('.description') as HTMLElement;
    const skills = project.querySelector('.skills') as HTMLElement;

    const imgsContainer = project.querySelector('.imgs') as HTMLElement;
    const imgsContainer2 = project.querySelector('.imgs > div') as HTMLElement;
    const imgOne = project.querySelector('.imgs > div >div:nth-child(1)') as HTMLElement;
    const imgTwo = project.querySelector('.imgs > div >div:nth-child(2)') as HTMLElement;
    const imgThree = project.querySelector('.imgs > div >div:nth-child(3)') as HTMLElement;

    const animationPosition = animationPositions[idx];
    // Part 1
    
    let posOne = animationPosition;
    
    gsap.to([name, imgsContainer, imgsContainer2], {
        duration: 0.7,
        opacity: 1,
        translateY: 0,
        ease: 'power2.inOut',
        scrollTrigger: {
            trigger: name,
            start: posOne,
            toggleActions: 'play none none reverse'
        }
    })

    // Part 2

    let posTwo = Math.ceil(animationPosition + (range / 3)*1);

    gsap.to([desc, imgOne], {
        duration: 0.7,
        opacity: 1,
        translateY: 0,
        ease: 'power2.inOut',
        scrollTrigger: {
            trigger: desc,
            start: posTwo,
            toggleActions: 'play none none reverse'
        }
    })

    // Part 3

    let posThree = Math.ceil(animationPosition + (range / 3)* 2);

    gsap.to([skills, imgTwo, imgThree], {
        duration: 0.7,
        opacity: 1,
        translateY: 0,
        ease: 'power2.inOut',
        scrollTrigger: {
            trigger: skills,
            start: posThree,
            toggleActions: 'play none none reverse'
        }
    })

})

const otherProjects = document.querySelectorAll('.project-other > div > div');

window.addEventListener('mousemove', (e) => {
    otherProjects.forEach(ele => {
        const span = ele.querySelector('span') as HTMLElement;

        const rec = ele.getBoundingClientRect();
        

        span.animate(
            [
                {
                    transform: `translate(
                        ${(e.clientX - rec.left) - span.clientWidth/2}px,
                        ${(e.clientY - rec.top) - span.clientHeight/2}px
                    )`
                }
            ],
            {
                duration: 300,
                fill: 'forwards',
                easing: 'ease-in'
            }
        )
        span.style.opacity = '1';

    })

})