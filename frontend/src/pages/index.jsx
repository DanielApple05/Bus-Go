import NavBar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/features";
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';

const Index = () => {

  const navigate = useNavigate();
  const { updateBooking } = useBooking();

  const handleSearch = ({ tripType, from, to, date, returnDate }) => {
    if (!from || !to || !date) return;
    updateBooking({ tripType, from, to, date, returnDate });
    navigate('/buses');
  };
  return (
    <>
      <NavBar />
      <Hero onSearch={handleSearch} />
      <Features />
    </>
  );
}

export default Index;
