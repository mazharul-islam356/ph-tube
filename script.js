const headerInfo = () => {
    const headerInfo = document.getElementById('headerInfo')
    headerInfo.innerHTML=`
    <div class="flex gap-72 justify-center mt-10 items-center">
        <h1 class="text-3xl font-bold" ><span class="text-[#FF1F3D]">PH</span>TUBE</h1>
        <button class="btn btn-wide">Sort by view</button>
        <h1 class="bg-red-500 px-8 rounded-lg text-center text-white">BLOG</h1>
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
        // console.log(catagory)
        tabContainer.appendChild(div)

    });

}

const handleLoadCard = async (catagoryId) =>{
    const res = await fetch (` https://openapi.programming-hero.com/api/videos/category/${catagoryId}`)

    const data = await res.json();
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = ""

    data.data.forEach((card) => {
        console.log(card);
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

