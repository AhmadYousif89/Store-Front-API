import React from "react";

function OrderItem(props: any) {
  return (
    <div className="order">
      <div>{new Date()}</div>
      <h3>{props.order.status}</h3>
    </div>
  );
}

export default OrderItem;
