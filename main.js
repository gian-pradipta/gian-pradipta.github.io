const tap = document.getElementById("tap-1");
const s2 = document.getElementById("scene-2");
const s3 = document.getElementById("scene-3");
const scenes = [tap, s2, s3];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function changeScene(scene) {
    scene.classList.remove("opacity-100");
    scene.classList.add("opacity-0");
    await sleep(500);
    scenes.forEach(s => {s.classList.add("hidden")});

    const nextScene = scenes[scenes.indexOf(scene) + 1];
    nextScene.classList.remove("opacity-100");
    nextScene.classList.add("opacity-0");
    nextScene.classList.remove("hidden");
    void nextScene.offsetWidth;

    nextScene.classList.remove("opacity-0");
    nextScene.classList.add("opacity-100");

}

function typeText(element, text, delay = 100) {
    let index = 0;
    async function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            await sleep(delay)
            setTimeout(type, delay);
        }
    }
    type();
}


let s3_visible = false;
function main() {
    const buttons = document.getElementsByClassName("button");
    const t = document.getElementById("tulisan");


    const observer = new MutationObserver(mutations => {
        mutations.forEach(async (mutation) => {
            if (mutation.attributeName === 'class') {
                if (!s3.classList.contains('hidden') && s3_visible == false) {
                    s3_visible = true;
                    console.log('Div became visible!');
                    s3.style.backgroundImage = "url('./confetti_opening.gif')";
                    await sleep(2000);
                    s3.style.backgroundImage = "url('./confetti.gif')";
                    await sleep(100);
                    typeText(t, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, dolor et itaque expedita similique tempora rerum. Blanditiis numquam nemo corporis officiis voluptatibus pariatur est facere minus assumenda consequuntur, porro saepe ipsum, earum id voluptas quis et delectus deleniti temporibus ipsam ratione soluta optio voluptatum. Temporibus dolor aliquid earum blanditiis quis cupiditate tempore placeat dolore? Necessitatibus, rem dolore velit suscipit impedit quibusdam placeat voluptates rerum. Explicabo voluptates iusto tempore hic libero voluptas saepe doloremque consequatur, accusantium aliquid aut fugiat, obcaecati modi, totam odit? Ut, recusandae modi iste tempore in molestiae ratione omnis sed nisi quod explicabo natus libero. Pariatur, illo voluptas!", 20);
                }
            }
        });
    });

    observer.observe(s3, { attributes: true });

    Array.from(buttons).forEach(button => {
        button.addEventListener("click", async () => {
            button.classList.remove('clicked');
            void button.offsetWidth;
            button.classList.add('clicked');
            await sleep(100);
            changeScene(button.parentElement);
        })
    })
}

main();