const imageUpload = document.getElementById('image-upload');
const textTop = document.getElementById('text-top');
const textBottom = document.getElementById('text-bottom');
const memeCanvas = document.getElementById('meme-canvas');
const ctx = memeCanvas.getContext('2d');
const downloadMeme = document.getElementById('download-meme');

imageUpload.addEventListener('change', function() {
    const file = this.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const img = new Image();
        img.src = e.target.result;

        img.onload = function() {
            memeCanvas.width = img.width;
            memeCanvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);

            drawText();
        };
    };

    reader.readAsDataURL(file);
});

textTop.addEventListener('input', drawText);
textBottom.addEventListener('input', drawText);

function drawText() {
    ctx.clearRect(0, 0, memeCanvas.width, memeCanvas.height);

    const img = new Image();
    img.src = imageUpload.src;
    ctx.drawImage(img, 0, 0, memeCanvas.width, memeCanvas.height);

    ctx.font = '48px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 4;

    ctx.strokeText(textTop.value.toUpperCase(), memeCanvas.width / 2, 60);
    ctx.fillText(textTop.value.toUpperCase(), memeCanvas.width / 2, 60);

    ctx.strokeText(textBottom.value.toUpperCase(), memeCanvas.width / 2, memeCanvas.height - 20);
    ctx.fillText(textBottom.value.toUpperCase(), memeCanvas.width / 2, memeCanvas.height - 20);
}

downloadMeme.addEventListener('click', function() {
    const link = document.createElement('a');
    link.href = memeCanvas.toDataURL('image/png');
    link.download = 'meme.png';
    link.click();
});
