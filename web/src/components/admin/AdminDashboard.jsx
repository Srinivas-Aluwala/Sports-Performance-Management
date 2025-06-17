import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { pages } from "../../routes/pages";
import { useQuery } from "@tanstack/react-query";

const AdminDashboard = () => {

    const navigate = useNavigate();

    const createEventHandler = () => {

        navigate(pages.root.children.admin.path + "/" + pages.root.children.admin.children.createEvent.path)

    }
    const createMeetHandler = () => {

        navigate(pages.root.children.admin.path + "/" + pages.root.children.admin.children.createMeet.path)

    }
    const shortListCandidateHandler = () => {

        navigate(pages.root.children.admin.path + "/" + pages.root.children.admin.children.manage_Athletes.path)

    }
    const publishResultHandler = () => {

        navigate(pages.root.children.admin.path + "/" + pages.root.children.admin.children.manage_Results.path)

    }

    const { data } = useQuery({
        queryKey: [],
        queryFn: () => { },

    })

    const meetList = [
         { meetId: "M_0001", meet: "meet 1" },
  { meetId: "M_0002", meet: "meet 2" },
  { meetId: "M_0003", meet: "meet 3" },
  { meetId: "M_0004", meet: "meet 4" },
  { meetId: "M_0005", meet: "meet 5" },
  { meetId: "M_0006", meet: "meet 6" },
  { meetId: "M_0007", meet: "meet 7" },
  { meetId: "M_0008", meet: "meet 8" },
  { meetId: "M_0009", meet: "meet 9" }
    ]


    return (<>
        <h1 className=" flex item-center justify-flexStart mx-auto text-4xl text-black px-24 pt-8">Admin Dashboard</h1>
        <div className="flex align-center justify-center mx-auto gap-5 py-16">
            <Button secondary content='Create Event' onClick={createEventHandler} />
            <Button secondary content='Create Meet' onClick={createMeetHandler} />
            <Button secondary content='Shortlist Candidate' onClick={shortListCandidateHandler} />
            <Button secondary content='Publish Results' onClick={publishResultHandler} />

        </div>
        <div className="mx-auto px-20 flex flex-col gap-5 ">
        <h1 className="text-2xl font-semibold ">Created Meets</h1>
         <div className="flex flex-col justify-center ">
        <div  className="flex justify-flexstart  w-full border-2 border-black-500 px-1 py-3 bg-gray-100">
          <div className="text-lg font-bold min-w-96"> Meet Id </div>
          <div className="text-lg font-bold"> Meet Name </div>
        </div>
        {meetList.map((meet) => {
          return <div key={meet.meetId} className="flex justify-around w-full border-b-2 border-l-2 border-r-2 border-black-500 p-1">
            <div  className="text-lg font-bold">
              {meet.meetId}
            </div>
           
            <div  className="text-lg font-bold">
              {meet.meet}
            </div>
            
          </div>
        })}
      </div>
              </div>

        <Outlet />
    </>)
}
export default AdminDashboard;