import React, { useContext, useState } from "react";
import { Context } from "./Context";

const App = () => {
  const { input, setInput, getAnswers } = useContext(Context);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const ans = await getAnswers(input);
    setMessage(ans);
    setLoading(false);
    setQuestions([...questions, { question: input, answer: ans }]);
    setInput("");
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-black">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-1 pt-2 text-white min-vh-100 d-grid gap-2">
              <a
                href="/"
                className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
              >
                <span className="fs-5 d-none d-sm-inline">Chat GPT</span>
              </a>
              <ul className="nav nav-pills text-light d-grid gap-2" id="menu">
                <li className="d-grid gap-2">
                  {questions.map((question, index) => (
                    <button
                      className="btn btn-secondary d-grid gap-2"
                      key={index}
                      onClick={() => setMessage(question.answer)}
                    >
                      {question.question.length > 20
                        ? `${question.question.slice(0, 25)}...`
                        : question.question}
                    </button>
                  ))}
                </li>
              </ul>
              <hr />
              {/* <div className="dropdown pb-4">
                <a
                  href="#"
                  className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                  id="dropdownUser1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="https://github.com/mdo.png"
                    alt="hugenerd"
                    width={30}
                    height={30}
                    className="rounded-circle"
                  />
                  <span className="d-none d-sm-inline mx-1">My Name</span>
                </a>
                <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                  <li>
                    <a className="dropdown-item" href="#">
                      New project...
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Sign out
                    </a>
                  </li>
                </ul>
              </div> */}
            </div>
          </div>
          <div className="container col py-3 d-flex align-items-center flex-column justify-content-between bg-dark text-light">
            <div className="d-flex align-items-center text-light">
              {loading ? (
                <div className="d-flex justify-content-center">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <>
                  {message ? (
                    <p className="p-4">
                      {message.length > 500
                        ? `${message.substring(0, 4000)}...`
                        : message}
                    </p>
                  ) : (
                    <h1>How can I help you today?</h1>
                  )}
                </>
              )}
            </div>
            <div className="container-fluid">
              <form
                className="d-flex bg-dark text-light"
                role="search"
                onSubmit={handleSubmit}
              >
                <input
                  className="form-control me-2 bg-dark text-light"
                  aria-label="Search"
                  type="text"
                  placeholder="Message ChatGPT..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button className="btn btn-light" type="submit">
                  <i className="bi bi-arrow-up-circle-fill"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
