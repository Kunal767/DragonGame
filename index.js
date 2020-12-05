score = 0;
helper = true;
cross = true;

audiogame_over = new Audio("gameover.mp3");
point = new Audio("point.wav");

document.onkeydown = function (e) {
    if (e.keyCode == 38 && helper) {
        dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino');
        }, 700);
    }

    if (e.keyCode == 39 && helper) {
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));

        dino.style.left = dinoX + 112 + "px";
    }

    if (e.keyCode == 37 && helper) {
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));

        dino.style.left = (dinoX - 112) + "px";
    }
}

setInterval(() => {
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));
    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    ofpot = Math.abs(dx - ox);
    offline = Math.abs(dy - oy);


    if (ofpot < 70 && offline < 52) {
        gameOver.style.visibility = 'visible';
        obstacle.classList.remove('obstacleAnimation');
        helper = false;
        audiogame_over.play()
        setTimeout(() => {
            audiogame_over.pause();
        }, 1000);
    }
    else if (ofpot < 70 && cross == true) {
        score += 1;
        updateScore(score)
        point.play();
        scoreCont.classList.add('color_change');
        cross = false;
        setTimeout(() => {
            cross = true;
            scoreCont.classList.remove('color_change');
        }, 1000);
        setTimeout(() => {
            animDura = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDura = animDura - 0.05;
            obstacle.style.animationDuration = newDura + 's';
        }, 500);
      
    }

}, 10);

function updateScore(score) {
    scoreCont.innerHTML = "Your Score : " + score;
}