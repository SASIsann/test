const imageUpload = document.getElementById('image-upload');
const textTop = document.getElementById('text-top');
const textBottom = document.getElementById('text-bottom');
const memeCanvas = document.getElementById('meme-canvas');
const ctx = memeCanvas.getContext('2d');
const downloadMeme = document.getElementById('download-meme');
const generateImage = document.getElementById('generate-image');
const inviteLink = document.getElementById('invite-link');
const generateInviteLink = document.getElementById('generate-invite-link');
const copyInviteLink = document.getElementById('copy-invite-link');

imageUpload.addEventListener('change', handleImageUpload);
textTop.addEventListener('input', drawText);
textBottom.addEventListener('input', drawText);
generateImage.addEventListener('click', handleImageUpload);
generateInviteLink.addEventListener('click', handleInviteLinkGeneration);
copyInviteLink.addEventListener('click', handleInviteLinkCopy);

let currentImage = null; // アップロードされた画像を保存するためのグローバル変数を追加

function handleImageUpload() {
    const file = this.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const img = new Image();
        img.src = e.target.result;

        img.onload = function() {
            memeCanvas.width = img.width;
            memeCanvas.height = img.height;
            currentImage = img; // 画像をグローバル変数に保存
            drawText(); // 画像とテキストを描画する関数を呼び出す
        };
    };

    if (file) {
        reader.readAsDataURL(file);
    } else {
        drawText();
    }
}

function drawText() {
    if (currentImage) { // アップロードされた画像がある場合
        ctx.drawImage(currentImage, 0, 0, memeCanvas.width, memeCanvas.height); // 画像をキャンバスに描画する
    }

    ctx.clearRect(0, 0, memeCanvas.width, memeCanvas.height);
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

function handleInviteLinkGeneration() {
    inviteLink.value = window.location.href;
}

function handleInviteLinkCopy() {
    inviteLink.select();
    document.execCommand('copy');
}
