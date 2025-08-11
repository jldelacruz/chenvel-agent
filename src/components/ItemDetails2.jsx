import React, { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import {
  Clock,
  GeoAlt,
  Calendar2Check,
  Pencil,
  Trash,
  XCircle,
} from "react-bootstrap-icons";

const ItemDetails = ({ item, setShow }) => {
  const isOrderedOrScheduled = () => {
    let color = "";

    if (item.status === "DELIVERED") color = "success";
    else color = "warning";
    return color;
  };

  return (
    <Alert key={item.id} variant={isOrderedOrScheduled()}>
      <Alert.Heading>
        {isOrderedOrScheduled() === "success" ? (
          <Calendar2Check />
        ) : isOrderedOrScheduled() === "warning" ? (
          <Clock />
        ) : (
          <XCircle />
        )}
        {item.status === "PACKING LIST"
          ? " Arrived at Japan Warehouse"
          : item.departureDate !== "" && item.arrivalDate === ""
          ? " Departed"
          : item.status === "REMAINING"
          ? " Arrived at Philippine Warehouse"
          : item.status === "WITH DR"
          ? " Preparing for delivery"
          : item.status === "DELIVERED"
          ? " Delivered"
          : ""}
      </Alert.Heading>
      <p>
        Actual Departure: {item.departureDate} {" - "} Estimated Arrival:{" "}
        {item.arrivalDate} {" - "} Actual Arrival: {item.arrivalDate} {" - "}{" "}
        Date Out: {item.dateOut} {" - "} Date Delivered: {item.dateDelivered}
      </p>
      <p>
        Tracking #: {item.trackNo} - Receiver Name: {item.receiverFullName}
      </p>
      <p>
        Driver: {item.driver} - Contact #: {item.deliveryPhone}
      </p>
      <p></p>
      <hr />
      <div className="d-flex">
        <p>
          <GeoAlt /> {item.receiverState}, {item.receiverCity},{" "}
          {item.receiverAddress}
        </p>
        <Button
          size="sm"
          className="ms-auto"
          onClick={() => setShow(false)}
          variant="outline-success"
        >
          <Pencil />
        </Button>
        <Button
          size="sm"
          className="ms-1"
          onClick={() => setShow(false)}
          variant="outline-success"
        >
          <Trash />
        </Button>
      </div>
    </Alert>
  );
};

export default ItemDetails;
