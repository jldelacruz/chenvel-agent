import React, { useState } from "react";
import { Form, ListGroup, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const AutocompleteDropdown = () => {
  const options = [
    { label: "Apple", value: 1 },
    { label: "Banana", value: 2 },
    { label: "Cane", value: 3 },
  ];

  const [input, setInput] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (value.length === 0) {
      setFiltered([]);
      setShowDropdown(false);
    } else {
      const filteredOptions = options.filter((opt) =>
        opt.label.toLowerCase().includes(value.toLowerCase())
      );
      setFiltered(filteredOptions);
      setShowDropdown(true);
    }
  };

  const handleSelect = (label) => {
    setInput(label);
    setFiltered([]);
    setShowDropdown(false);
  };

  return (
    <Form.Group as={Col} {...addlProps}>
      <Form.Group>
        <Form.Label>Choose a fruit</Form.Label>
        <Form.Control
          type="text"
          value={input}
          onChange={handleChange}
          onBlur={() => setTimeout(() => setShowDropdown(false), 100)} // Delay to allow click
          onFocus={() => input && setShowDropdown(true)}
          placeholder="Start typing..."
        />
      </Form.Group>
      {showDropdown && (
        <ListGroup
          style={{ position: "absolute", zIndex: 1000, width: "100%" }}
        >
          {filtered.map((item) => (
            <ListGroup.Item
              key={item.value}
              action
              onClick={() => handleSelect(item.label)}
            >
              {item.label}
            </ListGroup.Item>
          ))}
          {filtered.length === 0 && (
            <ListGroup.Item>No results found</ListGroup.Item>
          )}
        </ListGroup>
      )}
    </Form.Group>
  );
};

export default AutocompleteDropdown;
