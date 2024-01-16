let catListImg = document.querySelector('.catListImg');
catListImg.innerHTML=""
for(let i=1;i<7;i++){
    catListImg.innerHTML+=`<img src="img/고양이${i}.png" class="catImg">`;
}