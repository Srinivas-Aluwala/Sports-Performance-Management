import ProfileCard from "../helpers/ProfileCard";

const AthleteProfile = () => {

    const profileDetails= {
            name : "Liam Carter",
            dob : "10/10/2000",
            height:  "170 CM", 
            weight :  "60 KG",
            gender : "Male",
            coache : "N/A",
            category : "100M",
            image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlhEUgJngdPQGK0SGD1obtP_dSLcbl4ejdWQ&s"

        };

    return (<>
    <div className="px-40">
        <ProfileCard  details={profileDetails}/>
        <div>

        </div>
        <div className=" py-10">
            <h1 className="text-3xl font-semibold pb-5"> Top Performance</h1>
            
        <table className="flex flex-col justify-around ">

        <tr  className="flex justify-around w-full border-b-2 border-black-500 px-1 py-3 bg-gray-50">
                    <th>MEET NAME</th>
                    <th>EVENT NAME</th>
                    <th>SCORE</th>
                    <th>REMARKS </th>

                </tr>
                <tr className="flex justify-around w-full border-black-500 p-1">
                    <td className="text-lg font-bold">Lightning Bolt Championship</td>
                    <td className="text-lg font-bold">DiscusForce throw</td>
                    <td className="text-lg font-bold">100</td>
                    <td className="text-lg font-bold">Good</td>
                </tr>
            </table>
        </div>
         <div className=" py-10">
            <h1 className="text-3xl font-semibold pb-5"> Performance Results</h1>
        <table className="flex flex-col justify-around ">
        <tr  className="flex justify-around w-full border-b-2 border-black-500 px-1 py-3 bg-gray-50">
                    <th>MEET NAME</th>
                    <th>EVENT NAME</th>
                    <th>CATEGORY</th>
                    <th>VENUE </th>
                    <th>SCORE</th>
                    <th>REMARKS </th>

                </tr>
                <tr className="flex justify-around w-full  border-black-500 p-1">
                    <td className="text-lg font-bold">Lightning Bolt Championship</td>
                    <td className="text-lg font-bold">DiscusForce throw</td>
                    <td className="text-lg font-bold">Throw</td>
                    <td className="text-lg font-bold">Paris</td>
                    <td className="text-lg font-bold">100</td>
                    <td className="text-lg font-bold">Good</td>
                </tr>
            </table>
        </div>
    </div>
    </>)
}
export default AthleteProfile;