import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewTweet } from "./store/tweet";

const CreateTweet = () => {
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();


    let current = new Date();
    let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
    let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
    let dateTime = cDate + ' ' + cTime;

    if (message) {
      console.log(message)
      const newTweet = {
        message: message,
        createdAt: dateTime,
        updatedAt: dateTime
      };

      dispatch(addNewTweet(newTweet));

      reset();
    }
  }

  const reset = () => {
    setMessage("");
  };

  return (
    <div className="inputBox">
      <h1>Create Tweet</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          placeholder="Message"
          name="message"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateTweet;