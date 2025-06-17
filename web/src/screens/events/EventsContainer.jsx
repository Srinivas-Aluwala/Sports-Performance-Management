
const EventsContainer = () => {
    const events = [{
            "title": "Lady with a Teddy",
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4IQqXRDL9XKL8IsR9knNhe1KoSyvEuuDNeA&s",
            "date" : "16/10/2024"
		},
        {
            "title": "Girl with camera",
            "image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-vVW9lcg2HBMI6U5AluVffM67bR3anoW1fw&s",
                        "date" : "16/10/2024",
                        "Meet" : "Meet name",
                        "Category" : "Category name"
        },
        {
            "title": "Beautiful Girl with Glasses",
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpbzGIaQ3Wz38IsA57Gq4zn16hIXjhjFUHZQ&s",
                        "date" : "16/10/2024",
                        "Meet" : "Meet name",
                        "Category" : "Category name"
        },
        {
            "title": "Redhead with frackles",
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw4YPeU-khOtGO772yUYODaqOyLig6t5XKBw&s",
                        "date" : "16/10/2024",
                        "Meet" : "Meet name",
                        "Category" : "Category name"
        },
        {
            "title": "Girl in black dress",
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR-V0YX-t8RORfyk_ttbBZ3EuNMYMs2Iqg-A&s",
                        "date" : "16/10/2024",
                        "Meet" : "Meet name",
                        "Category" : "Category name"
        },
        {
            "title": "Girl Sitting on Chair",
            "image": "https://localmedia.org/wp-content/uploads/2021/06/events-1.png",
                        "date" : "16/10/2024",
                        "Meet" : "Meet name",
                        "Category" : "Category name"
        },
        {
            "title": "Lady with a red umbrella",
            "image": "https://gighub.club/mediafiles/cache/cf/a0/cfa037f489f9554b5d31b444b5ee2231.webp",
                        "date" : "16/10/2024",
                        "Meet" : "Meet name",
                        "Category" : "Category name"
        },
        {
            "title": "Flowers and some fruits",
            "image": "https://blogs.tripzygo.in/wp-content/uploads/2025/02/holi-events-in-hyderabad.jpg",
                        "date" : "16/10/2024",
                        "Meet" : "Meet name",
                        "Category" : "Category name"
        },
        {
            "title": "Beautiful scenery",
            "image": "https://media-exp1.licdn.com/dms/image/C4D1BAQFAC3o2eHS_vA/company-background_10000/0/1565182814457?e=2159024400&v=beta&t=zWT-JPXEhmCFr0L8eTn0LswSz82VWuuJBkRuPAvLN-Q",
                        "date" : "16/10/2024",
                        "Meet" : "Meet name",
                        "Category" : "Category name"
        },
        {
            "title": "Some kind of bird",
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5rRQUwRDyQ_eR8EDb-ivnRKcuKBjvLkegFA&s",
                        "date" : "16/10/2024",
                        "Meet" : "Meet name",
                        "Category" : "Category name"
        },
        {
            "title": "The attack of dragons",
            "image": "https://localmedia.org/wp-content/uploads/2021/06/events-1.png",
                        "date" : "16/10/2024",
                        "Meet" : "Meet name",
                        "Category" : "Category name"
        }
        ];
  
    return (<>
        <div className="flex flex-wrap p-16 justify-center mx-auto">
        {
            events.map((event) => {
                return (<div className="m-2  w-96 shadow-md rounded-lg">
                       <div className="h-48 w-full ">
                         <img className="h-full w-full object-cover rounded-t-lg" src={event.image} ></img>
                       </div>
                       <div className="flex flex-col pb-5 pt-2 px-2">
                        <div className="text-2xl font-semibold pb-2">{event.title}</div>
                        <div className="text-lg text-gray-500 font-semibold pb-1">Date : {event.date}</div>
                        <div className="text-lg text-gray-500 font-semibold pb-1">Meet : {event.Meet}</div>
                        <div className="text-lg text-gray-500 font-semibold pb-1">Category : {event.Category}</div>
</div>

                </div>)
            })
        }
        </div>
    </>)
}
export default EventsContainer;