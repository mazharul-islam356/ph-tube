const headerInfo = () => {
    const headerInfo = document.getElementById('headerInfo')
    headerInfo.innerHTML=`
    <div class="flex items-center gap-10 justify-center mt-10 items-center">
    <div class="flex">
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
        
        <button class="btn btn-wide mx-60">Sort by view</button>
        <a href = "http://127.0.0.1:5500/blog.html" target="_blank" class="bg-red-500 btn px-8 rounded-lg text-center text-white">BLOG</a>
        
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

    const blankData = document.getElementById('blank-data');
    
    const data = await res.json();
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
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = ""

    data.data.forEach((card) => {
        // console.log(card);
        // console.log(cardContainer)
        const div = document.createElement('div');
        
        div.innerHTML = `
        <div class="card bg-base-100 shadow-xl pt-6">
            <figure><img class= "h-[200px]" src="${card.thumbnail}" alt="#" /></figure>
            <div class="card-body">
  
              <div class="flex gap-4">
                <div>
                  <img class="rounded-full w-14 h-14" src="${card.authors[0].profile_picture}" alt="#">
                </div>
                <div>
                  <h2 class="text-xl font-semibold">${card.title}</h2>               
  
                  <div class="flex gap-2">
                    <div>
                      <p>${card.authors[0].profile_name}</p>
                     </div>
                     <div>
                      <p>badge</p>
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

handleClick ()
handleLoadCard(1000)

