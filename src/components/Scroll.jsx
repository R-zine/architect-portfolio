function Scroll({ mode }) {
  return (
    <div aria-hidden="true" className={mode ? "Scroll transform" : "Scroll"} />
  );
}

export default Scroll;
