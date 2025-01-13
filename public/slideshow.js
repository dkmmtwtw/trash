
export function slideshowFrames(parent, frames, tick = 200) {
    try {

        let currentFrame = 0;
        const totalFrames = frames.length;
        console.log("slideshowFrames ran, frames length: ", totalFrames)

        let images = [];
        frames.forEach((frame, index) => {
            const img = document.createElement('img');
            img.src = frame;
            img.style.display = 'none';
            img.style.position = "absolute";
            img.style.top = 0;
            img.style.left = 0;
            img.style.width = "100%";
            img.style.height = "100%";
            parent.appendChild(img);
            images.push(img);
            console.log("current img element rendered: ", img);
        });


        (function showNextSlide() {

            console.log("showNextSlide called, current frame: ", currentFrame);
            if (currentFrame > 0) {
                images[currentFrame - 1].style.display = 'none';
            }
            images[currentFrame].style.display = 'block';

            currentFrame++;

            if (currentFrame < totalFrames) {
                setTimeout(showNextSlide, tick);
            } else {
                setTimeout(() => {
                        images.forEach(img => img.remove())
                }, tick)
            }
        })();

    } catch (error) {
        console.error("slideshowFrames threw:", error.message)
    }
}

export async function extractFramesFromGrid(src, columns, rows = 1) {
    try {
        const img = new Image();
        img.crossOrigin = "anonymus"
        img.src = src;
        console.log("img src = ", img.src)
        return new Promise(resolve => {
            img.addEventListener('load', async () => {
                try {

                    const canvas = document.createElement("canvas");
                    console.log("canvas element: ", canvas)
                    const ctx = canvas.getContext('2d');


                    const frameWidth = img.width / columns;
                    const frameHeight = img.height / rows;
                    const frames = [];

                    for (let row = 0; row < rows; row++) {
                        for (let col = 0; col < columns; col++) {

                            console.log(`Trying to extract the ${row * columns + col}. from image: ${img}`)

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

    function showFrames(frames) {
        try {
            const container = this.template.querySelector('.animation-container');
            console.log(`trying to show Frames ${JSON.stringify(frames)} inside this container: ${container}`,)
            frames.forEach((frameDataUrl, index) => {
                const imgElement = document.createElement('img');
                imgElement.src = frameDataUrl;
                console.log('img with source (frameDataUrl) to be appended next to the container: ', frameDataUrl)
                imgElement.style.display = 'block';
                container.appendChild(imgElement);
            });
        } catch (error) {
            console.error(':/ ', error.message);
        }
    }
}
