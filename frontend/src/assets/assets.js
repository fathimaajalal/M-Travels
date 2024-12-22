import logo from './logo.png'
import searchicon from './searchicon.png'
import profile_icon from './profile_icon.png'
import cart_icon from './cart_icon.png'
import menu_icon from './menu_icon.jpg'
import dropdown_icon from './dropdown_icon.png'
import hero_img from './hero_img.png'
import conty from './conty.png'
import conty_rr from './conty_rr.png'
import conty_sarah from './conty_sarah.png'
import gypsy_willys from './gypsy_willys.png'
import mtravels from './mtravels.mp4'
import mtravels_2 from './mtravels_2.mp4'
import rr from './rr.png'
import sarah from './sarah.png'
import vagamon from './vagamon.png'
import f138 from './f138.png'
import conty2 from './conty2.png'
import padmini from './padmini.png'
import gypsy from './gypsy.png'
import chethak from './chethak.png'
import willys from './willys.png'
import willys_grey from './willys_grey.png'
import support_icon from './support_icon.png'
import payment_icon from './payment_icon.png'
import cancel_icon from './cancel_icon.png'
import star_icon from './star_icon.png'
import star_dull from './star_dull.png'
import about_img from './about_img.png'

export const assets = {
  logo,
  about_img,
  searchicon,
  profile_icon,
  cart_icon,
  menu_icon,
  dropdown_icon,
  hero_img,
  gypsy_willys,
  conty,
  conty_rr,
  conty_sarah,
  rr,
  sarah,
  mtravels,
  mtravels_2,
  vagamon,
  f138,
  conty2,
  padmini,
  gypsy,
  chethak,
  willys,
  willys_grey,
  support_icon,
  payment_icon,
  cancel_icon,
  star_dull,
  star_icon
}

export const busRoutes = [
    {
      _id: "1",
      name: "Ernakulam to Thrissur",
      description: "A scenic 70km route passing through Aluva and Angamaly.",
      price: 55,
      image: [
       sarah,
        conty_rr,
      ],
      departureTime: "07:00 AM",
      arrivalTime: "09:30 AM",
      totalSeats: 40,
      availableSeats: 12,
      seating: "Seats Available",
      category: "Regular",
    },
    {
      _id: "2",
      name: "Munnar to Adimali",
      description: "A mountain ride through picturesque tea estates.",
      price: 45,
      image: [
        rr,
        conty_rr,
      ],
      departureTime: "08:30 AM",
      arrivalTime: "10:00 AM",
      totalSeats: 30,
      availableSeats: 0,
      seating: "Standing Only",
      category: "Regular",
    },
    {
      _id: "3",
      name: "Perumbavoor to Kothamangalam",
      description: "Quick 30-minute trip on a busy local route.",
      price: 20,
      image: [
        vagamon
      ],
      departureTime: "06:45 AM",
      arrivalTime: "07:15 AM",
      totalSeats: 25,
      availableSeats: 5,
      seating: "Seats Available",
      category: "Regular",
    },
     // Tourist Bus
     {
      _id: "3",
      name: "Thekkady to Vagamon",
      description: "A breathtaking 3-hour journey through rolling hills and lush green plantations.",
      price: 100,
      image: [vagamon],
      category: "Tourist",
      departureTime: "06:00 AM",
      arrivalTime: "09:00 AM",
      totalSeats: 50,
      availableSeats: 15,
      seating: "Seats Available",
    },
    {
      _id: "4",
      name: "Kochi to Alleppey",
      description: "A 2-hour serene ride along the coastal road, perfect for exploring houseboats.",
      price: 75,
      image: [vagamon],
      category: "Tourist",
      departureTime: "10:00 AM",
      arrivalTime: "12:00 PM",
      totalSeats: 40,
      availableSeats: 20,
      seating: "Seats Available",
    },
// Vehicles for Shoots
{
  _id: "5",
  name: "HM Contessa",
  description: "An iconic luxury sedan from the '80s, perfect for vintage shoots.",
  price: 700,
  image: [conty2,conty,conty_rr, conty_sarah], // Replace with the actual image import
  category: "Shoot",
  seating: "Retro Seating",
  availableSeats: 4,
  totalSeats: 4,
  departureTime: "N/A",
  arrivalTime: "N/A",
},
{
  _id: "6",
  name: "Fiat 180",
  description: "A retro-styled car ideal for wedding and heritage-themed photoshoots.",
  price: 600,
  image: [padmini], // Replace with the actual image import
  category: "Shoot",
  seating: "Retro Seating",
  availableSeats: 4,
  totalSeats: 4,
  departureTime: "N/A",
  arrivalTime: "N/A",
},
{
  _id: "7",
  name: "Gypsy",
  description: "A rugged off-road vehicle, perfect for outdoor and adventure photoshoots.",
  price: 800,
  image: [gypsy], // Replace with the actual image import
  category: "Shoot",
  seating: "Adventure Seating",
  availableSeats: 4,
  totalSeats: 4,
  departureTime: "N/A",
  arrivalTime: "N/A",
},
{
  _id: "8",
  name: "Chetak",
  description: "A classic green Chetak scooter, ideal for quirky and fun shoots.",
  price: 200,
  image: [chethak], // Replace with the actual image import
  category: "Shoot",
  seating: "Two-Seater",
  color: ["green", "blue"],
  availableSeats: 2,
  totalSeats: 2,
  departureTime: "N/A",
  arrivalTime: "N/A",
valTime: "N/A",
},
{
  _id: "10",
  name: "Fiat 138",
  description: "A compact car with timeless charm, perfect for nostalgic-themed shoots.",
  price: 500,
  image: [f138], // Replace with the actual image import
  category: "Shoot",
  seating: "Retro Seating",
  availableSeats: 4,
  totalSeats: 4,
  departureTime: "N/A",
  arrivalTime: "N/A",
},
// Offroad Vehicles
{
  _id: "17",
  name: "Willys Jeep (Red)",
  description: "Classic off-road vehicle with a striking red finish.",
  price: 1200,
  image: [willys], // Replace with the actual image import or URL
  category: "Offroad",
  seating: "Open Seating",
  availableSeats: 4,
  totalSeats: 4,
  departureTime: "N/A",
  arrivalTime: "N/A",
},
{
  _id: "18",
  name: "Willys Jeep (Grey)",
  description: "Classic off-road vehicle in an elegant grey finish.",
  price: 1200,
  image: [willys_grey], // Replace with the actual image import or URL
  category: "Offroad",
  seating: "Open Seating",
  availableSeats: 4,
  totalSeats: 4,
  departureTime: "N/A",
  arrivalTime: "N/A",
},
{
  _id: "16",
  name: "Maruti Gypsy",
  description: "Lightweight off-road SUV designed for rugged terrains.",
  price: 1000,
  image: [gypsy], // Replace with the actual image import or URL
  category: "Offroad",
  seating: "Compact Seating",
  availableSeats: 4,
  totalSeats: 4,
  departureTime: "N/A",
  arrivalTime: "N/A",
},


  ];
  