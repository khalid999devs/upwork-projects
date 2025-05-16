import { htmlToFragment } from '../utils/htmlConvertionUtils.js';
import client from '../utils/kernexClient.js';
import { createSpinnerLoader } from '../templates/loaders.js';

export const fetchSetAwardsAsync=async(contentContainer=".times-images",pageSlug="india-bistro")=>{    
  const awardsContainer=document.querySelector(contentContainer)

  if(!awardsContainer)return;
  const spinnerEl=createSpinnerLoader().firstElementChild;
  awardsContainer.appendChild(spinnerEl);
   const response=await client.resource(pageSlug).find({
    "$limit": 1,
    "$skip": 0,
    "$select": [
      "_id",
      "createdAt",
      "updatedAt",
      "awards"
    ]
  })
  const awards=response.data[0]?.awards || [];
  
  if(awards.length){
    const itemsHTML=awards.map((award,index)=>`
        <div class="w-[280px] times-item" key=${award._id} id=${award._id}>
              <img
                src="${award.url}"
                alt="times-img"
                class="w-full object-contain"
              />
            </div>`).join('');
    const awardsItemsFragment=htmlToFragment(itemsHTML)
    awardsContainer.removeChild(spinnerEl);
    awardsContainer.appendChild(awardsItemsFragment);
  }
}

