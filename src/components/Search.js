import { MdOutlineSearch } from "react-icons/md";

export default function Search() {
  
  return(
    <form className="p-2 flex items-center bg-slate-800 rounded-lg">
      <MdOutlineSearch className="inline-block text-2xl mx-2 text-gray-400"/>
      <input type="text" placeholder="Search for a city..." className="bg-transparent outline-none text-white flex-grow p-1" />
    </form>
  )
}