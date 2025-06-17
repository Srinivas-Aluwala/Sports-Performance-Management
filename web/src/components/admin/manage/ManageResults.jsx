import { Button, Input } from "semantic-ui-react";

const ManageResults = () => {

    
  const eventList = [
    { id: "E_0001", title: "event 1", meet: "meet 1" },
    { id: "E_0002", title: "event 2", meet: "meet 1" },
    { id: "E_0003", title: "event 3", meet: "meet 1" },
    { id: "E_0004", title: "event 4", meet: "meet 1" },
    { id: "E_0005", title: "event 5", meet: "meet 1" },

    { id: "E_0006", title: "event 6", meet: "meet 2" },
    { id: "E_0007", title: "event 7", meet: "meet 2" },
    { id: "E_0008", title: "event 8", meet: "meet 2" },
    { id: "E_0009", title: "event 9", meet: "meet 2" },
    { id: "E_0010", title: "event 10", meet: "meet 2" },

    { id: "E_0011", title: "event 11", meet: "meet 3" },
    { id: "E_0012", title: "event 12", meet: "meet 3" },
    { id: "E_0013", title: "event 13", meet: "meet 3" },
    { id: "E_0014", title: "event 14", meet: "meet 3" },
    { id: "E_0015", title: "event 15", meet: "meet 3" },

    { id: "E_0016", title: "event 16", meet: "meet 4" },
    { id: "E_0017", title: "event 17", meet: "meet 4" },
    { id: "E_0018", title: "event 18", meet: "meet 4" },
    { id: "E_0019", title: "event 19", meet: "meet 4" },
    { id: "E_0020", title: "event 20", meet: "meet 4" },

    { id: "E_0021", title: "event 21", meet: "meet 5" },
    { id: "E_0022", title: "event 22", meet: "meet 5" },
    { id: "E_0023", title: "event 23", meet: "meet 5" },
    { id: "E_0024", title: "event 24", meet: "meet 5" },
    { id: "E_0025", title: "event 25", meet: "meet 5" },
  ];

    return (<>
     <div className="flex flex-col px-24 py-2">

      <h1 className="text-3xl font-bold py-2">Event Results</h1>
      <Input
        fluid
        placeholder="Search by meet name or event title"
        className="py-5"
      />
      <div className="flex flex-col justify-center ">
        <div  className="flex justify-around w-full border-2 border-black-500 px-1 py-3 bg-gray-100">
          <div className="text-lg font-bold"> Event Id </div>
          <div className="text-lg font-bold"> Event Title </div>
          <div className="text-lg font-bold"> Meet Name </div>
          <div className="text-lg font-bold"> Actions </div>
        </div>
        {eventList.map((event) => {
          return <div key={event.id} className="flex justify-around w-full border-b-2 border-l-2 border-r-2 border-black-500 p-1">
            <div  className="text-lg font-bold">
              {event.id}
            </div>
            <div  className="text-lg font-bold">
              {event.title}
            </div>
            <div  className="text-lg font-bold">
              {event.meet}
            </div>
            <div>
              <Button color="red" content={"Publish Result"} />
            </div>
          </div>
        })}
      </div>
    </div>
    </>)
}
export default ManageResults;