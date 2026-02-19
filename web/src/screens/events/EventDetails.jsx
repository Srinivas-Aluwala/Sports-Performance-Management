import { useLocation } from "react-router-dom";
import EventItem from "./EventItem";

const EventDetails = () => {

  const location = useLocation();
  const { event } = location.state;


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
