let catListImg = document.querySelector('.catListImg');
catListImg.innerHTML=""
for(let i=1;i<7;i++){
    catListImg.innerHTML+=`<img src="img/고양이${i}.png" class="catImg">`;
}
let showMoreButton=document.querySelector('.showMoreButton');
showMoreButton.addEventListener('click',()=>{
    let showMoreSection=document.querySelector('.showMore');
    catListImg.style.height='1000px';
    catListImg.style.overflow='scroll';
    showMoreSection.style.display='none';
    let pageToFetch=1;
    async function fetchImages(pageNum){
        try {
            const response = await fetch(`https://picsum.photos/v2/list?page=${pageNum}&limit=6`);
            if (!response.ok){
                throw new Error("네트워크 응답에 문제가 있습니다.");
            }
            const data=await response.json();
            makeImageList(data);
        }catch (err){
            console.log(err);
            alert("사진 가져오기에 실패하였습니다");
        }
    }
    function makeImageList(datas){
        datas.forEach((items)=>{
            catListImg.innerHTML+=`<img src="${items.download_url}" alt="" class="catImg">`;
        })
        window.addEventListener('scroll',()=>{
            if(window.innerHeight+document.documentElement.scrollTop+10>=document.documentElement.offsetHeight){
                fetchImages(pageToFetch++);
            }
        })
    }
    fetchImages(pageToFetch);
})