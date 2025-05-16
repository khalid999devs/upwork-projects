import { htmlToFragment,escapeHtml } from '../utils/htmlConvertionUtils.js';
import client from '../utils/kernexClient.js';
import { createSpinnerLoader } from '../templates/loaders.js';


const fetchPosts=async(skip=0,limit=7,mode="default")=>{
  const newsPostContainer=document.querySelector('.news-posts-container')
  if(!newsPostContainer)return;
  const spinnerEl=createSpinnerLoader().firstElementChild;
  newsPostContainer.appendChild(spinnerEl);
   const response=await client.resource('newsroom-posts').find({
        "$limit": limit,
        "$skip":skip,
        "$sort": {
          "year": -1
        },
        "$select": [
          "_id",
          "createdAt",
          "updatedAt",
          "year",
          "title",
          "postLink",
          "thumbnailImg"
        ]
      })
  const posts=response.data;
  if(posts.length){
    const itemsHTML=posts.slice(0,6).map((post,index)=>`
    <div class="w-full min-h-[350px] bg-white relative per-news-post-item transition-all duration-500 hover:scale-[1.01]" id=${post._id} key=${post._id}>
        ${index===0 && mode==="default" ? `<div
        class="headingDiv"
        >
         <h2 class="text-xl font-semibold tracking-wide">Newsroom</h2>
        </div>` : ''}
        <div class="max-h-[280px] h-full w-full news-post-caurosel-container relative">
          <img src="${post.thumbnailImg[0].url}" class="w-full h-full object-cover news-post-caurosel-item" alt="">
          <div class="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.6)] to-transparent"></div>
        </div>
        <div class="w-full flex flex-col py-4 pr-2 gap-3 font-[600] ">
          <p class="text-[var(--dark-text)]">${escapeHtml(post.year)}</p>
          <p class="text-[var(--dark-text)]">${escapeHtml(post.title)}</p>
        </div>
      </div>
    `).join('');
    const newsItemsFragment=htmlToFragment(itemsHTML)
    newsPostContainer.removeChild(spinnerEl);
    newsPostContainer.appendChild(newsItemsFragment);
    const morePostBtn=document.querySelector('.more-post-btn');

    if(posts.length>6){
        morePostBtn.classList.remove('hidden');
    }else{
        if(!(morePostBtn.classList.contains('hidden'))){
            morePostBtn.classList.add('hidden');
        }
    }
  }

}

document.addEventListener('DOMContentLoaded', () => {
    fetchPosts();
    document.querySelector('.more-post-btn').addEventListener('click',()=>{
      const length=document.querySelectorAll('.per-news-post-item').length;
      fetchPosts(length,7,"more");
    })
    
})

