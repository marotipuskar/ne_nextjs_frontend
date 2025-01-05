// import Image from "next/image";
// // import Home from "@/Home";

// export default function Home() {
//   return (
//     // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//     //   <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
//     //     <Image
//     //       className="dark:invert"
//     //       src="/next.svg"
//     //       alt="Next.js logo"
//     //       width={180}
//     //       height={38}
//     //       priority
//     //     />
//     //     <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
//     //       <li className="mb-2">
//     //         Get started by editing{" "}
//     //         <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
//     //           src/app/page.js
//     //         </code>
//     //         .
//     //       </li>

//     //       <li>Save and see your changes instantly.</li>
//     //       <li>Save and see your changes instantly.</li>
//     //     </ol>

//     //     <div className="flex gap-4 items-center flex-col sm:flex-row">
//     //       <a
//     //         className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
//     //         href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//     //         target="_blank"
//     //         rel="noopener noreferrer"
//     //       >
//     //         <Image
//     //           className="dark:invert"
//     //           src="/vercel.svg"
//     //           alt="Vercel logomark"
//     //           width={20}
//     //           height={20}
//     //         />
//     //         Deploy now
//     //       </a>
//     //       <a
//     //         className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
//     //         href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//     //         target="_blank"
//     //         rel="noopener noreferrer"
//     //       >
//     //         Read our docs
//     //       </a>
//     //     </div>
//     //   </main>
//     //   <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
//     //     <a
//     //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//     //       href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//     //       target="_blank"
//     //       rel="noopener noreferrer"
//     //     >
//     //       <Image
//     //         aria-hidden
//     //         src="/file.svg"
//     //         alt="File icon"
//     //         width={16}
//     //         height={16}
//     //       />
//     //       Learn
//     //     </a>
//     //     <a
//     //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//     //       href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//     //       target="_blank"
//     //       rel="noopener noreferrer"
//     //     >
//     //       <Image
//     //         aria-hidden
//     //         src="/window.svg"
//     //         alt="Window icon"
//     //         width={16}
//     //         height={16}
//     //       />
//     //       Examples
//     //     </a>
//     //     <a
//     //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//     //       href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//     //       target="_blank"
//     //       rel="noopener noreferrer"
//     //     >
//     //       <Image
//     //         aria-hidden
//     //         src="/globe.svg"
//     //         alt="Globe icon"
//     //         width={16}
//     //         height={16}
//     //       />
//     //       Go to nextjs.org →
//     //     </a>
//     //   </footer>
//     // </div>
//     <div>
//       {/* <h1>
//         hi
//       </h1> */}
//       {/* <Home/> */}
//     </div>
//   );
// }
"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        guests: '',
        name: '',
        contact: '',
    });

    const [bookings, setBookings] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/bookings');
            if (response && response.data) {
                setBookings(response.data);
            } else {
                setMessage('No bookings found.');
            }
        } catch (error) {
            setMessage('Failed to fetch bookings.');
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/bookings', formData);
            setMessage(response.data.message);
            fetchBookings(); // Refresh bookings
        } catch (error) {
            setMessage(error.response?.data?.message || 'Something went wrong.');
        }
    };
    const handleDeleteBooking = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/bookings/${id}`);
            setMessage(response.data.message);
            fetchBookings(); // Refresh bookings after deletion
        } catch (error) {
            setMessage('Failed to delete booking.');
        }
    };


    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Restaurant Table Booking</h1>

            <form onSubmit={handleFormSubmit} className="space-y-4">
                <input
                    type="date"
                    name="date"
                    className="border p-2 w-full"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="time"
                    name="time"
                    className="border p-2 w-full"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="number"
                    name="guests"
                    className="border p-2 w-full"
                    value={formData.guests}
                    onChange={handleInputChange}
                    placeholder="Number of Guests"
                    required
                />
                <input
                    type="text"
                    name="name"
                    className="border p-2 w-full"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter Your Name"
                    required
                />
                <input
                    type="tel"
                    name="contact"
                    className="border p-2 w-full"
                    value={formData.contact}
                    onChange={handleInputChange}
                    placeholder="Contact Details"
                    required
                />
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                    Book Table
                </button>
            </form>

            <p className="mt-4 text-red-500">{message}</p>

            <h2 className="text-xl font-semibold mt-6">Existing Bookings </h2>
            <ul className="list-disc pl-6">
                {bookings.map((booking) => (
                    <li key={booking.id} className="mb-2">
                        {booking.date} at {booking.time} for {booking.guests} guests ({booking.name})
                        <button
                            onClick={() => handleDeleteBooking(booking.id)}
                            className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
