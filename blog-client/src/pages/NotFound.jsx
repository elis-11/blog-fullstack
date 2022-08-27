import { NavLink } from "react-router-dom";
import "../styles/App.scss";
import { enable, disable, isEnabled } from "cursor-flashlight";

export const NotFound = () => {
  const handleToggleFlashlight = () => {
    if (isEnabled()) {
      disable();
    } else {
      enable({ size: "15vmax" });
    }
  };
  return (
    <div className="NotFound">
      {/* <img alt="card" 
      src={`https://source.unsplash.com/1000x1000/`} /> */}
      <h2>Page not found</h2>
      {/* <button onClick={handleToggleFlashlight}>Flashlight</button> */}
      <div className="light"></div>
      <p>Hmmm, the page you were looking for doesn't seem to exist anymore.</p>
      <NavLink to="/">Back to Home</NavLink>
    </div>
  );
};

/* Flashlight Overlay */
// :root {
//   cursor: none;
//   --cursorX: 50vw;
//   --cursorY: 50vh;
// }
// :root:before {
//   content: '';
//   display: block;
//   width: 100%;
//   height: 100%;
//   position: fixed;
//   pointer-events: none;
//   background: radial-gradient(
//     circle 10vmax at var(--cursorX) var(--cursorY),
//     rgba(0,0,0,0) 0%,
//     rgba(0,0,0,.5) 80%,
//     rgba(0,0,0,.95) 100%
//   )
// }
//  ---------CHANGED-----------
/* Flashlight Overlay */
// :root {
//   cursor: none;
//   --cursorX: 50vw;
//   --cursorY: 50vh;
// }
// :root:before {
//   content: '';
//   display: block;
//   width: 100%;
//   height: 100%;
//   position: fixed;
//   pointer-events: none;
//   background: radial-gradient(
//     circle 20vmax at var(--cursorX) var(--cursorY),
//     rgba(0,0,0,0) 0%,
//     rgba(0,0,0,.5) 0%,
//     rgba(0,0,0,.95) 100%
//   )
// }

// function update(e){
//   var x = e.clientX || e.touches[0].clientX
//   var y = e.clientY || e.touches[0].clientY

//   document.documentElement.style.setProperty('--cursorX', x + 'px')
//   document.documentElement.style.setProperty('--cursorY', y + 'px')
// }

// document.addEventListener('mousemove',update)
// document.addEventListener('touchmove',update)
