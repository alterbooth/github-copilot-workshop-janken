const hands = ['gu', 'choki', 'pa'];
const handImages = {
    gu: 'img/gu.png',
    choki: 'img/choki.png',
    pa: 'img/pa.png'
};

function getRandomHand() {
    const randomIndex = 0;
    return hands[randomIndex];
}

function determineResult(playerHand, computerHand) {
    if (playerHand === computerHand) {
        return 'あいこ';
    } else if (
        (playerHand === 'gu' && computerHand === 'choki') ||
        (playerHand === 'choki' && computerHand === 'pa') ||
        (playerHand === 'pa' && computerHand === 'gu')
    ) {
        return 'あなたの勝ち';
    } else {
        return 'あなたの負け';
    }
}

function play(playerHand) {
    const computerHand = getRandomHand();
    document.getElementById('computer-hand').src = handImages[computerHand];
    const result = determineResult(playerHand, computerHand);
    document.getElementById('result').textContent = result;
}

function resetGame() {
    document.getElementById('computer-hand').src = handImages['gu'];
    document.getElementById('result').textContent = 'ジャンケン・・・';
}