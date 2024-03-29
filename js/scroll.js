// 고양이 사진 모음 div
let catImgList = document.querySelector('.catImgList');
let initialImgList = '';
for (let i = 1; i < 7; i++) {
    initialImgList += `<img src="img/고양이${i}.png" class="catImg">`;
}
catImgList.innerHTML = initialImgList;

//사진 가져오기 함수
async function fetchImages(pageNum) {
    try {
        const response = await fetch(`https://picsum.photos/v2/list?page=${pageNum}&limit=6`);
        if (!response.ok) {
            throw new Error("네트워크 응답에 문제가 있습니다.");
        }
        const data = await response.json();
        makeImageList(data);
    } catch (err) {
        console.log(err);
        alert("사진 가져오기에 실패하였습니다");
    }
}

//이미지 리스트 데이터화
function makeImageList(datas) {
    datas.forEach((items) => {
        catImgList.innerHTML += `<img src="${items.download_url}" alt="" class="catImg">`;
    });
}

// 무한 스크롤링
function infinityScroll() {
    if (catImgList.scrollHeight - catImgList.scrollTop <= catImgList.clientHeight + 10) {
        fetchImages(pageToFetch+=1);
    }
}

//쓰로틀링
const throttling = (callback, delay) => {
    let timer = null;
    return () => {
        if (timer === null) {
            timer = setTimeout(() => {
                callback();
                timer = null;
            }, delay);
        }
    };
};
let showMoreButton = document.querySelector('.showMoreButton');
let pageToFetch = '';
showMoreButton.addEventListener('click', () => {
    let text=document.querySelector(".showMore>p");
    if (showMoreButton.innerHTML === "Show more") {
        //페이지 1로 초기화
        pageToFetch=1;
        //ShowMore버튼 text가 Hide로 바뀐다.
        showMoreButton.innerHTML = "Hide";
        //버튼 위에 text가 사라진다
        text.style.display="none";
        //고양이 사진 모음 div의 높이가 커지고, scroll이 생긴다
        catImgList.className='moreCatImgList';
        document.body.style.overflow='hidden';

        //스크롤 이동
        window.scrollTo({
            //catImgList의 위쪽 부분
            top: catImgList.offsetTop+1100,
            behavior:'smooth'
        });
        //이미지 가져오기
        fetchImages(pageToFetch);
    }else{
        //고양이 사진 모음 설정 원상 복구
        showMoreButton.innerHTML = "Show more";
        text.style.display='';
        catImgList.className='catImgList';
        document.body.style.overflow='auto';
        //imgList 고양이 사진으로 초기화
        catImgList.innerHTML = initialImgList;
    }
});

catImgList.addEventListener('scroll',
    //0.2초마다 infinityScroll을 실행한다.
    throttling(infinityScroll, 200));