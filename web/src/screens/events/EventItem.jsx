import { baseUrl } from "../../util/constants";

const EventItem = ({event}) => {
  

    return (<>
    
       <div className="m-2  w-96 shadow-md rounded-lg">
                        <div className="h-48 w-full ">
                            <img className="h-full w-full object-cover rounded-t-lg" src={`${baseUrl}/api/fetchEventImages/${event.eventId}`} ></img>
                        </div>
                        <div className="flex flex-col pb-5 pt-2 px-2">
                            <div className="text-2xl font-semibold pb-2">{event.eventName}</div>
                            <div className="text-lg text-gray-500 font-semibold pb-1">Date : {event.eventDate}</div>
                            <div className="text-lg text-gray-500 font-semibold pb-1">Meet : {event.meetName}</div>
                            <div className="text-lg text-gray-500 font-semibold pb-1">Category : {event.category}</div>
                        </div>

                    </div>
             
    </>)
}
export default EventItem;