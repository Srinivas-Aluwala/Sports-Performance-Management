import AthletesHome from "../athletes/AthletesHome";
import FloatingButton from "../helpers/FloatingButton";
import ProfileCard from "../helpers/ProfileCard";

const AthleteDashboard = () => {
    const profileDetails = {
        name: "Liam Carter",
        dob: "10/10/2000",
        height: "170 CM",
        weight: "60 KG",
        gender: "Male",
        coache: "N/A",
        category: "100M",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlhEUgJngdPQGK0SGD1obtP_dSLcbl4ejdWQ&s"

    };

        const profileStyle = 'h-full w-full rounded-lg'



    return (<>

        <h1>AthleteDashboard</h1>
        <div className="flex align-top justify-between mr-20">
        <div className="px-40">
            <ProfileCard  profileStyle={profileStyle}  details={profileDetails} />
            </div>
            <FloatingButton />
</div>
            </>)
}
            export default AthleteDashboard;