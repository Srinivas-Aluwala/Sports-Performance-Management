
const EventItem = ({event}) => {
  

    return (<>
    
       <div className="m-2  w-96 shadow-md rounded-lg">
                        <div className="h-48 w-full ">
                            <img className="h-full w-full object-cover rounded-t-lg" src={event.image} ></img>
                        </div>
                        <div className="flex flex-col pb-5 pt-2 px-2">
                            <div className="text-2xl font-semibold pb-2">{event.title}</div>
                            <div className="text-lg text-gray-500 font-semibold pb-1">Date : {event.date}</div>
                            <div className="text-lg text-gray-500 font-semibold pb-1">Meet : {event.Meet}</div>
                            <div className="text-lg text-gray-500 font-semibold pb-1">Category : {event.Category}</div>
                        </div>

                    </div>
             
    </>)
}
export default EventItem;