function giveImagesPadding() {
    const images = document.querySelectorAll(".carousel-item img");
    const idealHeight = 666;

    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        const image = entry.target;
        if (image.height < idealHeight) {
          const paddedPaddings = (idealHeight - image.height)/2 + 'px';
          image.style.paddingBottom = paddedPaddings;
        } else {
          image.style.paddingBottom = '0px';
        }
      }
    });

    for (const image of images) {
      resizeObserver.observe(image);
    }
  }
function mobileMain() {
    giveImagesPadding();
}

function windowsMain() {

}

function main() {
    if (window.screen.width <= 768) {
        mobileMain();
    }

}

main();