
export function slideshowFrames(parent, frames, loop = false, tick = 1000 / 16) {
    try {

        let currentFrame = 0;
        const totalFrames = frames.length;

        let timeoutId;
        let images = [];
        frames.forEach((frame, index) => {
            const img = appendImg(parent, frame)
            img.style.display = 'none';
            images.push(img);
        });


        const showNextSlide = function () {

            if (currentFrame > 0) {
                images[currentFrame - 1].style.display = 'none';
            }
            images[currentFrame].style.display = 'block';

            currentFrame++;
            let nextStep;
            if (currentFrame < totalFrames) {
                nextStep = showNextSlide;
            } else if (loop) {
                nextStep = restart;
            } else {
                nextStep = over;
            }
            timeoutId = setTimeout(nextStep, tick);
        };
        showNextSlide();

        function restart() {
            try {
                images[totalFrames - 1].style.display = 'none';
                currentFrame = 0;
                showNextSlide();
            } catch (error) {
                console.error("restart threw:", error.message)
            }
        }

        function over() {
            console.log("animation over called")
            clearTimeout(timeoutId);
            images.forEach(img => img.remove())
        }

        return over;

    } catch (error) {
        console.error("slideshowFrames threw:", error.message)
    }
}

export async function extractFramesFromGrid(src, columns, rows = 1) {
    try {
        const img = new Image();
        img.crossOrigin = "anonymus"
        img.src = src;
        return new Promise(resolve => {
            img.addEventListener('load', async () => {
                try {

                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext('2d');


                    const frameWidth = img.width / columns;
                    const frameHeight = img.height / rows;
                    const frames = [];

                    for (let row = 0; row < rows; row++) {
                        for (let col = 0; col < columns; col++) {


                            const x = col * frameWidth;
                            const y = row * frameHeight;
                            canvas.width = frameWidth;
                            canvas.height = frameHeight;

                            ctx.drawImage(img, x, y, frameWidth, frameHeight, 0, 0, frameWidth, frameHeight);
                            frames.push(canvas.toDataURL());
                            canvas.remove();
                        }
                    }
                    resolve(frames);
                    // return showFrames.call(this,frames);
                } catch (error) {
                    console.error('load EventListener err:', error.message);
                }
            });
        })

    } catch (error) {
        console.error('extractFrames err:', error.message);
    }
}

export function appendImg(parent, src) {
    try {
        const img = document.createElement('img');
        img.src = src;
        img.style.position = "absolute";
        img.style.top = 0;
        img.style.left = 0;
        img.style.width = "100%";
        img.style.height = "100%";
        parent.appendChild(img);
        return img;
    } catch (error) {
        console.error('appendImg threw:', error.message);
    }
}
