
/**
 * @param {HTMLElement} fuel – element to set onto fire 
 * @param {boolean} graphics - false, to stop frying the computer
 * @param {number} particles - optional number of particles
 */
export function setFire(fuel, graphics = true, particles = 50) {
    try {
        position(fuel)
        addKeyframes(graphics)

        const fireContainer = document.createElement('div');
        fireContainer.style.position = "absolute";
        fireContainer.style.display = "flex";
        fireContainer.style.justifyContent = "space-between";
        fireContainer.style.alignItems = "stretch";
        fireContainer.style.width = "105%";
        fireContainer.style.height = "100%";
        fireContainer.style.top = "0";
        fireContainer.style.left = "-2.5%";
        fireContainer.style.filter = "blur(3px)";

        const particleElements = [];
        for (let i = 0; i < particles; i++) {
            const glimmer = document.createElement('div');
            const glimmerPositioner = document.createElement('div');

            glimmerPositioner.appendChild(glimmer);
            fireContainer.appendChild(glimmerPositioner);

            glimmerPositioner.style.position = "relative";
            glimmerPositioner.style.right = "7.5px";
            glimmerPositioner.style.height = "100%";
            glimmerPositioner.style.width = `${100 / particles}%`;

            glimmer.style.backgroundImage = "radial-gradient(rgb(255,80,0) 20%, rgba(255,80,0,0) 70%)";
            glimmer.style.borderRadius = "50%";
            glimmer.style.opacity = "0";
            glimmer.style.position = "absolute";
            glimmer.style.bottom = "0";
            glimmer.style.width = "15px";
            glimmer.style.height = "40px";
            glimmer.style.animation = `rise 1.4s ease-in infinite`;
            glimmer.style.animationDelay = `${Math.random() * 1400}ms`;

            particleElements.push(glimmerPositioner);
        }
        fuel.appendChild(fireContainer);
    } catch (error) {
        console.error(`setFire threw: ${error.message}`);
    }
}

/**@param {HTMLElement} element – the element to position */
function position(element) {
    const position = window.getComputedStyle(element).position;
    if (position === 'static') {
        element.style.position = "relative";
    }
}






/** @param {boolean} graphics - false, to stop frying the computer */
export function addKeyframes(graphics) {
    const styleSheet = document.styleSheets[0] || document.createElement('style');
    if (!document.styleSheets[0]) document.head.appendChild(styleSheet);

    const existingRuleIndex = Array.from(styleSheet.cssRules).findIndex(rule => rule.name === 'rise');
    if (existingRuleIndex !== -1) {
        styleSheet.deleteRule(existingRuleIndex);
    }
    
    const keyframes = graphics ? `
        @keyframes rise {
            from {
                opacity: 0;
                transform: translateY(0) scale(1);
                filter: none;
            }
            25% {
                opacity: 1;
                filter: 
                drop-shadow(0px 10px 0px yellow)
            }
            75%{
                filter: 
                drop-shadow(0px -15px 0px black)
                drop-shadow(0px -15px 2px black)
                drop-shadow(0px -15px 5px black)
            }
            to {
                opacity: 0;
                transform: translateY(-10em) scale(0);
            }
        }
    `: `
        @keyframes rise {
            from {
                opacity: 0;
                transform: translateY(0) scale(1);
            }
            25% {
                opacity: 1;
            }
            to {
                opacity: 0;
                transform: translateY(-10em) scale(0);
            }
        }
    `

        ;

    if (!Array.from(styleSheet.cssRules).find(rule => rule.name === 'rise')) {
        styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
    }
}
