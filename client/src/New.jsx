import { useState } from "react";

function Addques() {
  const [link, setLink] = useState("");

  const handleSubmit = async () => {
    if (link.trim() === "") {
      alert("Please enter a valid link");
      return;
    }

    try {
      const response = await fetch("http://localhost:5040/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ link }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.msg);
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong while submitting.");
    }
  };

  return (
    <>
      <input
        placeholder="enter the link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}

export default Addques;
