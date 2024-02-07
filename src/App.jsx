import { useEffect, useState } from "react";
import ListCard from "./components/ListCard";

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/region/europe"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        setCountries(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-800">
      <div className="max-w-7xl mx-auto py-20 px-4">
        <h1 className="text-gray-50 text-4xl">Europe countries Data.</h1>
        <p className="text-gray-100 text-xl mb-8">
          Click on a card to reveal a country's information
        </p>
        {countries && (
          <ul className="grid min-[450px]:grid-col-2 md:grid-cols-3 lg:grid-cols-4 gap-10 auto-rows-[200px]">
            {countries &&
              countries.map((country, index) => (
                <ListCard key={index} country={country} />
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
