const headerInfo = () => {
    const headerInfo = document.getElementById('headerInfo')
    headerInfo.innerHTML=`
    <div class="flex lg:gap-10 justify-center mt-10 items-center">
    <div class="flex lg:flex-row flex-col">
    
    <div class = "flex lg:ml-0 ml-12">
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
        <g clip-path="url(#clip0_13_1170)">
          <path d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z" fill="#FF6B6B"/>
          <path d="M32 16H0C0 24.8366 7.16344 32 16 32C24.8366 32 32 24.8366 32 16Z" fill="#FF1F3D"/>
          <path d="M11.6249 25.0625C11.4791 25.0625 11.3329 25.0286 11.1982 24.9597C10.8847 24.7994 10.6875 24.4771 10.6875 24.125V7.875C10.6875 7.52294 10.8848 7.20056 11.1982 7.04031C11.5116 6.88006 11.8884 6.90888 12.1739 7.115L23.4239 15.24C23.6679 15.4163 23.8125 15.699 23.8125 16C23.8125 16.301 23.6679 16.5838 23.4239 16.76L12.1739 24.885C12.0111 25.0026 11.8185 25.0625 11.6249 25.0625Z" fill="#F9F9F9"/>
          <path d="M10.6875 16V24.125C10.6875 24.4771 10.8848 24.7994 11.1982 24.9597C11.3328 25.0286 11.4791 25.0625 11.6249 25.0625C11.8184 25.0625 12.0111 25.0026 12.1739 24.885L23.4239 16.76C23.6679 16.5838 23.8125 16.301 23.8125 16H10.6875Z" fill="#E2DFF4"/>
        </g>
        <defs>
          <clipPath id="clip0_13_1170">
            <rect width="32" height="32" fill="white"/>
          </clipPath>
        </defs>
      </svg>
    </div>
    <div>
      <h1 class="text-3xl font-bold" ><span class="text-[#FF1F3D]">PH</span>TUBE</h1>
    </div>
    
    </div>
        
        <button onclick = "handleSortButton()" class="btn btn-wide lg:my-0 my-2 lg:mx-60">Sort by view</button>
        <a href = "./blog.html" target="_blank" class="bg-red-500 btn px-8 rounded-lg text-center text-white">BLOG</a>
        
      </div> <br>
      <hr>
    `   
}
headerInfo()


const handleClick = async () => {
  const res = await fetch ('https://openapi.programming-hero.com/api/videos/categories');
  
  const data = await res.json();
  
  const tabContainer = document.getElementById('tabContainer')

  const catagoryData = data.data;  

  catagoryData.forEach((catagory) => {

      const div = document.createElement('div')
      div.classList='gap-4'
      div.innerHTML=`
      <a onclick="handleLoadCard('${catagory.category_id}')" class="tab">${catagory.category}</a>
      `    
 
      tabContainer.appendChild(div)     
       
  });
  

}


const handleLoadCard = async (catagoryId) =>{
    const res = await fetch (` https://openapi.programming-hero.com/api/videos/category/${catagoryId}`)
    const data = await res.json();


    const cardContainer = document.getElementById('cardContainer');
    const blankData = document.getElementById('blank-data');
    
    blankData.innerText = '';
    if(data.data.length === 0){
      const p = document.createElement('p')
      p.innerHTML = `
       
      <div class="text-center lg:mt-44 mt-12 lg:mb-0 mb-20 grid items-center justify-center">
      
          <img class="w-28 ml-28" src="./images/not-video.png" alt="">
        <h1 class="text-xl font-bold">Oops!! Sorry, There is no content here</h1>
        
        </div>
      `
      
      blankData.appendChild(p)
    }
    
    cardContainer.innerHTML = ""

    data.data.forEach((card) => {
    
      // ----------time st-------
      const convertSecToTime = (sec) => {
        var sec = parseInt(sec);
        var hrs = Math.floor(sec / 3600);
        var mins = Math.floor((sec % 3600) / 60);
    
        return (` <div">
        <p class="bg-black p-1 rounded-lg text-white">
        ${`${hrs}hours ${mins}minute`}</p>
        </div>`);
    }
    // ---------time end----------
        const div = document.createElement('div');
        
        div.innerHTML = `
        <div class="card bg-base-100 shadow-xl pt-6">
            <figure><img class= "h-[150px] relative" src="${card.thumbnail}" alt="#" />

            <div class = "absolute right-8 bottom-36" >
                  ${(card?.others?.posted_date) ? convertSecToTime (card?.others?.posted_date) : ''}

            </figure>

            <div class="card-body flex flex-row">  
              <div class="flex gap-4">

                <div>
                  <img class="rounded-full w-14 h-14" src="${card.authors[0].profile_picture}" alt="#">
                  </div>

                </div>
                
                <div>
                  <h2 class="text-xl font-semibold">${card.title}</h2>               

                  <div class="flex gap-2">
                    <div>
                      <p>${card.authors[0].profile_name}</p>
                     </div>
                     <div>
                      <p>${card.authors[0].verified === true ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <g clip-path="url(#clip0_11_215)">
                        <path d="M19.375 10.0001C19.375 10.8001 18.3922 11.4595 18.1953 12.197C17.9922 12.9595 18.5063 14.022 18.1203 14.6892C17.7281 15.3673 16.5484 15.4486 15.9984 15.9986C15.4484 16.5486 15.3672 17.7282 14.6891 18.1204C14.0219 18.5064 12.9594 17.9923 12.1969 18.1954C11.4594 18.3923 10.8 19.3751 10 19.3751C9.2 19.3751 8.54062 18.3923 7.80312 18.1954C7.04062 17.9923 5.97813 18.5064 5.31094 18.1204C4.63281 17.7282 4.55156 16.5486 4.00156 15.9986C3.45156 15.4486 2.27187 15.3673 1.87969 14.6892C1.49375 14.022 2.00781 12.9595 1.80469 12.197C1.60781 11.4595 0.625 10.8001 0.625 10.0001C0.625 9.20012 1.60781 8.54075 1.80469 7.80325C2.00781 7.04075 1.49375 5.97825 1.87969 5.31106C2.27187 4.63293 3.45156 4.55168 4.00156 4.00168C4.55156 3.45168 4.63281 2.272 5.31094 1.87981C5.97813 1.49387 7.04062 2.00793 7.80312 1.80481C8.54062 1.60793 9.2 0.625122 10 0.625122C10.8 0.625122 11.4594 1.60793 12.1969 1.80481C12.9594 2.00793 14.0219 1.49387 14.6891 1.87981C15.3672 2.272 15.4484 3.45168 15.9984 4.00168C16.5484 4.55168 17.7281 4.63293 18.1203 5.31106C18.5063 5.97825 17.9922 7.04075 18.1953 7.80325C18.3922 8.54075 19.375 9.20012 19.375 10.0001Z" fill="#2568EF"/>
                        <path d="M12.7094 7.20637L9.14062 10.7751L7.29062 8.92669C6.88906 8.52512 6.23749 8.52512 5.83593 8.92669C5.43437 9.32825 5.43437 9.97981 5.83593 10.3814L8.43124 12.9767C8.82187 13.3673 9.45624 13.3673 9.84687 12.9767L14.1625 8.66106C14.5641 8.2595 14.5641 7.60794 14.1625 7.20637C13.7609 6.80481 13.1109 6.80481 12.7094 7.20637Z" fill="#FFFCEE"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_11_215">
                          <rect width="20" height="20" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>` : '' } </p>
                     </div>
                  </div>
                <p>${card.others.views}</p>
                </div>
  
              </div>
  
            </div>
          </div>
        `
        
        cardContainer.appendChild(div);       

    });

}


// ----------------sort views section-----------------

const handleSortButton = async ()=>{
  const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/1000`)
  const data = await res.json()

  data.data.sort((a,b)=>parseFloat(b.others.views) - parseFloat(a.others.views))
  displayData(data)

}

// ---------display data-------

const displayData = (data) =>{

    const cardContainer = document.getElementById('cardContainer');
    const blankData = document.getElementById('blank-data');
    
    blankData.innerText = '';
    if(data.data.length === 0){
    const p = document.createElement('p')
    p.innerHTML = `
       
      <div class="text-center mt-44 grid items-center justify-center">
      
        <img class="w-28 ml-28" src="./images/not-video.png" alt="">
        <h1 class="text-xl font-bold">Oops!! Sorry, There is no content here</h1>
        
      </div>
      `
      
      blankData.appendChild(p)
    }
    
    cardContainer.innerHTML = ""

    data.data.forEach((card) => {
    
      // ----------time st-------
      const convertSecToTime = (sec) => {
        var sec = parseInt(sec);
        var hrs = Math.floor(sec / 3600);
        var mins = Math.floor((sec % 3600) / 60);
    
        return (` <div">
        <p class="bg-black p-1 rounded-lg text-white">
        ${`${hrs}hours ${mins}minute`}</p>
        </div>`);
    }
    // ---------time end----------
      const div = document.createElement('div');
        
        div.innerHTML = `
        <div class="card bg-base-100 shadow-xl pt-6">
            <figure><img class= "h-[150px] relative" src="${card.thumbnail}" alt="#" />

            <div class = "absolute right-8 bottom-36" >
                  ${(card?.others?.posted_date) ? convertSecToTime (card?.others?.posted_date) : ''}

            </figure>

            <div class="card-body flex flex-row">  
              <div class="flex gap-4">

                <div>
                  <img class="rounded-full w-14 h-14" src="${card.authors[0].profile_picture}" alt="#">
                  </div>

                </div>
                
                <div>
                  <h2 class="text-xl font-semibold">${card.title}</h2>               

                  <div class="flex gap-2">
                    <div>
                      <p>${card.authors[0].profile_name}</p>
                     </div>
                     <div>
                      <p>${card.authors[0].verified === true ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <g clip-path="url(#clip0_11_215)">
                        <path d="M19.375 10.0001C19.375 10.8001 18.3922 11.4595 18.1953 12.197C17.9922 12.9595 18.5063 14.022 18.1203 14.6892C17.7281 15.3673 16.5484 15.4486 15.9984 15.9986C15.4484 16.5486 15.3672 17.7282 14.6891 18.1204C14.0219 18.5064 12.9594 17.9923 12.1969 18.1954C11.4594 18.3923 10.8 19.3751 10 19.3751C9.2 19.3751 8.54062 18.3923 7.80312 18.1954C7.04062 17.9923 5.97813 18.5064 5.31094 18.1204C4.63281 17.7282 4.55156 16.5486 4.00156 15.9986C3.45156 15.4486 2.27187 15.3673 1.87969 14.6892C1.49375 14.022 2.00781 12.9595 1.80469 12.197C1.60781 11.4595 0.625 10.8001 0.625 10.0001C0.625 9.20012 1.60781 8.54075 1.80469 7.80325C2.00781 7.04075 1.49375 5.97825 1.87969 5.31106C2.27187 4.63293 3.45156 4.55168 4.00156 4.00168C4.55156 3.45168 4.63281 2.272 5.31094 1.87981C5.97813 1.49387 7.04062 2.00793 7.80312 1.80481C8.54062 1.60793 9.2 0.625122 10 0.625122C10.8 0.625122 11.4594 1.60793 12.1969 1.80481C12.9594 2.00793 14.0219 1.49387 14.6891 1.87981C15.3672 2.272 15.4484 3.45168 15.9984 4.00168C16.5484 4.55168 17.7281 4.63293 18.1203 5.31106C18.5063 5.97825 17.9922 7.04075 18.1953 7.80325C18.3922 8.54075 19.375 9.20012 19.375 10.0001Z" fill="#2568EF"/>
                        <path d="M12.7094 7.20637L9.14062 10.7751L7.29062 8.92669C6.88906 8.52512 6.23749 8.52512 5.83593 8.92669C5.43437 9.32825 5.43437 9.97981 5.83593 10.3814L8.43124 12.9767C8.82187 13.3673 9.45624 13.3673 9.84687 12.9767L14.1625 8.66106C14.5641 8.2595 14.5641 7.60794 14.1625 7.20637C13.7609 6.80481 13.1109 6.80481 12.7094 7.20637Z" fill="#FFFCEE"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_11_215">
                          <rect width="20" height="20" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>` : '' } </p>
                     </div>
                  </div>
                <p>${card.others.views}</p>
                </div>
  
              </div>
  
            </div>
          </div>
        `
        
        cardContainer.appendChild(div);       

    });



}


handleSortButton()
handleClick ()
handleLoadCard(1000)

