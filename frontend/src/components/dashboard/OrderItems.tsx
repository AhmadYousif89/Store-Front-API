function OrderItem(props: any) {
  return (
    <div className="order_list grid">
      {props.orders.map((order: any) => (
        <ul key={order.order_id} className="order">
          <li>
            <p>order number : {order.order_id}</p>
            <p>order status : {order.order_status}</p>
            <p>created_at : {order.created_at}</p>
          </li>
        </ul>
      ))}
    </div>
  );
}

export default OrderItem;
