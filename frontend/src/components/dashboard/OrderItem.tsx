function OrderItem(props: any) {
  const time = new Date().getMonth().toLocaleString();
  return (
    <div className="order">
      <div>{time}</div>
      <h3>{props.order}</h3>
    </div>
  );
}

export default OrderItem;
