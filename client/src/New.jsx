import { useState } from "react";

function Addques() {
  const [link, setLink] = useState("");

  const handleSubmit = async () => {
    if (link.trim() === "") {
      alert("Please enter a valid link");
      return;
    }

    try {
      const response = await fetch("https://leet-server-od2t.vercel.app/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ link }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.msg);
        setLink(""); // Clear input after successful submission
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong while submitting.");
    }
  };

  return (
    <div className="flex items-center justify-center p-6 rounded-lg  ">
      <input
        type="text"
        placeholder="Enter the link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        className="border border-gray-300 rounded-l-md p-2 w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white rounded-r-md px-4 py-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </div>
  );
}

export default Addques;
