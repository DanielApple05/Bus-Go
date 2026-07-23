import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import BusCard from '../components/BusCard';
import { useBooking } from '../context/BookingContext';
import { getAvailability } from '../../api/buses';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BusCardSkeleton from '../components/busCardSkeleton';



const AvailableBuses = ({ route, date, onBack }) => {

   const navigate = useNavigate();
  const { booking, updateBooking } = useBooking();
  const [ loading, setLoading] = useState(false)

  const onSelectBus = (bus) => {
    updateBooking({ bus });
    navigate('/select-seat');
  };

  const [buses, setBuses] = useState([]);

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        setLoading(true)
        const data = await getAvailability(booking.from, booking.to, booking.date);
        console.log(data);
        setBuses(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false)
      }
    };
    if (booking.from && booking.to && booking.date) {
      fetchBuses();
    }
  }, [booking.from, booking.to, booking.date]);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-10">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-orange-600 mb-4">
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-2xl font-bold text-slate-900">Available Buses</h1>
        <p className="text-slate-500 text-sm mt-1">
          {booking?.from} &rarr; {booking?.to} &nbsp;&bull;&nbsp; {booking?.date}
        </p>
      {  loading ? (<BusCardSkeleton/>) : 
        (<div className="flex flex-col gap-4 mt-6">
          {buses.map((bus) => (
            <BusCard key={bus._id} bus={bus} onSelect={onSelectBus} />
          ))}
        </div> )}
      </div>
    </div>
  );
}

export default AvailableBuses;