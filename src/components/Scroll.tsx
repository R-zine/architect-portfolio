interface ScrollProps {
  mode: boolean;
}

function Scroll({ mode }: ScrollProps) {
  return (
    <div aria-hidden="true" className={mode ? "Scroll transform" : "Scroll"} />
  );
}

export default Scroll;
