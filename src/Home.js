// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const Home = () => {
//     const [formData, setFormData] = useState({
//         date: '',
//         time: '',
//         guests: '',
//         name: '',
//         contact: '',
//     });

//     const [bookings, setBookings] = useState([]);
//     const [message, setMessage] = useState('');

//     useEffect(() => {
//         fetchBookings();
//     }, []);

//     const fetchBookings = async () => {
//         const response = await axios.get('http://localhost:5000/api/bookings');
//         setBookings(response.data);
//     };

//     const handleInputChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleFormSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await axios.post('http://localhost:5000/api/bookings', formData);
//             setMessage(response.data.message);
//             fetchBookings(); // Refresh bookings
//         } catch (error) {
//             setMessage(error.response.data.message || 'Something went wrong.');
//         }
//     };

//     return (
//         <div>
//             <h1>Restaurant Table Booking</h1>

//             <form onSubmit={handleFormSubmit}>
//                 <input
//                     type="date"
//                     name="date"
//                     value={formData.date}
//                     onChange={handleInputChange}
//                     required
//                 />
//                 <input
//                     type="time"
//                     name="time"
//                     value={formData.time}
//                     onChange={handleInputChange}
//                     required
//                 />
//                 <input
//                     type="number"
//                     name="guests"
//                     value={formData.guests}
//                     onChange={handleInputChange}
//                     placeholder="Number of Guests"
//                     required
//                 />
//                 <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     placeholder="Your Name"
//                     required
//                 />
//                 <input
//                     type="tel"
//                     name="contact"
//                     value={formData.contact}
//                     onChange={handleInputChange}
//                     placeholder="Contact Details"
//                     required
//                 />
//                 <button type="submit">Book Table</button>
//             </form>

//             <p>{message}</p>

//             <h2>Existing Bookings</h2>
//             <ul>
//                 {bookings.map((booking) => (
//                     <li key={booking.id}>
//                         {booking.date} at {booking.time} for {booking.guests} guests ({booking.name})
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default Home;