const Card = (props) => {
  return (
    <div className={`block ${props.active}`} onClick={props.onClick}></div>
  );
};

export default Card;
