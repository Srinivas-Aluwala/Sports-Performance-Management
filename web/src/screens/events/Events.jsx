
import React from 'react'
import {
    ModalContent,
    ModalActions,
    Button,
    Header,
    Icon,
    Modal,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import { useQueries, useQuery } from '@tanstack/react-query';
import { fetchEventImages, fetchEvents } from '../../api/publicApis';
import api from '../../util/axiosInstance';
import { baseUrl } from '../../util/constants';

const Events = () => {


    const { data, error, isLoading, isSuccess } = useQuery({
        queryKey : "events",
        queryFn : fetchEvents,
        retry: false
    })

    console.log(data);
    



const events = [
  {
    eventId: 1,
    eventName: "Lady with a Teddy",
    photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4IQqXRDL9XKL8IsR9knNhe1KoSyvEuuDNeA&s",
    eventDate: "16/10/2024",
    meetName: "Meet name",
    category: "Category name"
  },
  {
    eventId: 2,
    eventName: "Girl with camera",
    photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-vVW9lcg2HBMI6U5AluVffM67bR3anoW1fw&s",
    eventDate: "16/10/2024",
    meetName: "Meet name",
    category: "Category name"
  },
  {
    eventId: 3,
    eventName: "Beautiful Girl with Glasses",
    photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpbzGIaQ3Wz38IsA57Gq4zn16hIXjhjFUHZQ&s",
    eventDate: "16/10/2024",
    meetName: "Meet name",
    category: "Category name"
  },
  {
    eventId: 4,
    eventName: "Redhead with frackles",
    photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw4YPeU-khOtGO772yUYODaqOyLig6t5XKBw&s",
    eventDate: "16/10/2024",
    meetName: "Meet name",
    category: "Category name"
  },
  {
    eventId: 5,
    eventName: "Girl in black dress",
    photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR-V0YX-t8RORfyk_ttbBZ3EuNMYMs2Iqg-A&s",
    eventDate: "16/10/2024",
    meetName: "Meet name",
    category: "Category name"
  },
  {
    eventId: 6,
    eventName: "Girl Sitting on Chair",
    photoUrl: "https://localmedia.org/wp-content/uploads/2021/06/events-1.png",
    eventDate: "16/10/2024",
    meetName: "Meet name",
    category: "Category name"
  },
  {
    eventId: 7,
    eventName: "Lady with a red umbrella",
    photoUrl: "https://gighub.club/mediafiles/cache/cf/a0/cfa037f489f9554b5d31b444b5ee2231.webp",
    eventDate: "16/10/2024",
    meetName: "Meet name",
    category: "Category name"
  },
  {
    eventId: 8,
    eventName: "Flowers and some fruits",
    photoUrl: "https://blogs.tripzygo.in/wp-content/uploads/2025/02/holi-events-in-hyderabad.jpg",
    eventDate: "16/10/2024",
    meetName: "Meet name",
    category: "Category name"
  },
  {
    eventId: 9,
    eventName: "Beautiful scenery",
    photoUrl: "https://media-exp1.licdn.com/dms/image/C4D1BAQFAC3o2eHS_vA/company-background_10000/0/1565182814457?e=2159024400&v=beta&t=zWT-JPXEhmCFr0L8eTn0LswSz82VWuuJBkRuPAvLN-Q",
    eventDate: "16/10/2024",
    meetName: "Meet name",
    category: "Category name"
  },
  {
    eventId: 10,
    eventName: "Some kind of bird",
    photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5rRQUwRDyQ_eR8EDb-ivnRKcuKBjvLkegFA&s",
    eventDate: "16/10/2024",
    meetName: "Meet name",
    category: "Category name"
  },
  {
    eventId: 11,
    eventName: "The attack of dragons",
    photoUrl: "https://localmedia.org/wp-content/uploads/2021/06/events-1.png",
    eventDate: "16/10/2024",
    meetName: "Meet name",
    category: "Category name"
  }
];




    return (<>
<div>
    <img src="E:\SportsManagement\events\images\1\phc.jpg"></img>
</div>
        <div className="flex flex-wrap p-16 justify-center mx-auto">
            {
                data?.map((event) => {

                const photoUrl = `${baseUrl}/api/fetchEventImages/${event.eventId}`;
                    return (
                        <Link to={(event.eventId.toString())} state={{ event }} key={event.eventId} >
                            <div className="m-2  w-96 shadow-md rounded-lg transform transition duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2">
                                <div className="h-48 w-full ">
                                    <img className="h-full w-full object-cover rounded-t-lg" alt='Image' src={photoUrl} ></img>
                                </div>
                                <div className="flex flex-col pb-5 pt-2 px-2">
                                    <div className="text-2xl font-semibold pb-2">{event.eventName}</div>
                                    <div className="text-lg text-gray-500 font-semibold pb-1">Date : {event.eventDate}</div>
                                    <div className="text-lg text-gray-500 font-semibold pb-1">Meet : {event.meetName}</div>
                                    <div className="text-lg text-gray-500 font-semibold pb-1">Category : {event.category}</div>
                                </div>

                            </div>
                        </Link>)
                })
            }
        </div>
    </>)
}
export default Events;