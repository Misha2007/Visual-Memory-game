const Card = (props) => {
  return (
    <div
      className={`block ${props.active} ${
        props.clicked ? "clicked-color" : ""
      }`}
      onClick={!props.disabled ? props.onClick : undefined}
      style={{ pointerEvents: props.disabled ? "none" : "auto" }}
    ></div>
  );
};

export default Card;
