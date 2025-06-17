import { useNavigate } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { pages } from "../../routes/pages";

const AthletesHome = () => {

     const navigate = useNavigate();

    const athleteList = [
         { id: "A_0001", name: "athlete 1" },
  { id: "A_0002", name: "athlete 2" },
  { id: "A_0003", name: "athlete 3" },
  { id: "A_0004", name: "athlete 4" },
  { id: "A_0005", name: "athlete 5" },
  { id: "A_0006", name: "athlete 6" },
  { id: "A_0007", name: "athlete 7" },
  { id: "A_0008", name: "athlete 8" },
  { id: "A_0009", name: "athlete 9" }
    ];

    const viewProfileHandler = () => {

        console.log(pages.root.children.athletes.children.profile.path);
        
        navigate(pages.root.children.athletes.children.profile.path);

    }




    return(<>
 <div className="flex flex-col px-28 py-12 gap-5">
    <h1 className="text-2xl font-semibold ">Athletes</h1>
     
         <div className="flex flex-col justify-center ">
        <div  className="flex justify-around  w-full border-2 border-black-500 px-1 py-3 bg-gray-100">
          <div className="text-lg font-bold "> Athlete Id </div>
          <div className="text-lg font-bold"> Athlete Name </div>
          <div className="text-lg font-bold"> Actions </div>
        </div>
        {athleteList.map((athlete) => {
          return <div key={athlete.id} className="flex justify-around w-full border-b-2 border-l-2 border-r-2 border-black-500 p-1">
            <div  className="text-lg font-bold">
              {athlete.id}
            </div>
           
            <div  className="text-lg font-bold">
              {athlete.name}
            </div>
            <div>
                <Button secondary content={'View Profile'} onClick={viewProfileHandler} />
            </div>
          </div>
        })}
      </div>
      </div>    </>)
}
export default AthletesHome;