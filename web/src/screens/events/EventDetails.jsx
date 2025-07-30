import EventItem from "./EventItem";

const EventDetails = () => {
  const event ={
        "id": 1,
        "title": "Lady with a Teddy",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4IQqXRDL9XKL8IsR9knNhe1KoSyvEuuDNeA&s",
        "date": "16/10/2024",
        "Meet": "Meet name",
        "Category": "Category name"
    };

    console.log("jhiihiih");
    
    return (<>
    <h1>Event Details </h1>
    <EventItem event={event}/>
    </>)
}
export default EventDetails;

// export const loader =()=>{

// } ;
// export const action =()=>{

// } ;
