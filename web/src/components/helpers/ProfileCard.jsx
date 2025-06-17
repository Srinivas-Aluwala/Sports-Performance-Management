const ProfileCard = ({details}) => {









    return(<>
    <div className="flex justify-start gap-40 px-20 py-20 mx-auto">
        <div className=" h-52 w-52">
            <img className='h-full w-full  rounded-full' src={details.image} />
        </div>
        <div>
            <div className="text-2xl font-semibold">{details.name}</div>
            <div className="text-xl font-medium">Date of birth : {details.dob}</div>
            <div className="text-xl font-medium">Gender : {details.gender}</div>
            <div className="text-xl font-medium">Height : {details.height}</div>
            <div className="text-xl font-medium">Weight : {details.weight}</div>
            <div className="text-xl font-medium">Category : {details.category}</div>
            <div className="text-xl font-medium">Coache : {details.coache}</div>
        </div>
    </div>
    </>)
}
export default ProfileCard;