import React, { useState } from "react";
import ReactTags from "react-tag-autocomplete";
import "./styles.css";


const FormulaInput = () => {
  const [tags, setTags] = useState([{ id: 1, name: "English" }]);

  const [suggestions, setSuggestions] = useState([
    { id: 1, name: "payment processing fees" },
    { id: 2, name: "payment fees" },
    { id: 3, name: "payroll bonus " },
    { id: 4, name: "dental" },
    { id: 5, name: "vision" },
    { id: 6, name: "spain" },
    { id: 14, name: "sum", type: "special" },
    { id: 11, name: "sub", type: "special" },
    { id: 12, name: "mul", type: "special" },
    { id: 13, name: "Div", type: "special" },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleDelete = (id) => {
    const index = tags?.findIndex((tag) => +tag?.id == +id);
    if (index >= 0) {
      tags.splice(index, 1);

      setTags([...tags]);
    } else {
      const tags1 = tags.slice(0);
      tags1.splice(index, 1);
      setTags([...tags1]);
    }
  };
  const specialChar=["sum","sub","mul","div"]
  const handleAddition = (tag) => {
    const tags1 = [].concat(tags, tag);
    setTags([...tags1]);

    if (specialChar?.includes(tag?.name)) {
      const abc = [...tags1, { name: "(" }, { name: ")" }];
      setTags([...abc]);
    }
  };
  const handleInputChange = (input) => {
    setInputValue(input);
  };
  const renderTag = (tag) => {
    console.log('tag', tag)
    const isTagRemovable = tag?.tag?.id;

    return isTagRemovable ? (
      <span key={tag.id} className="data-tag">
        {tag.tag.name}{" "}
        {!specialChar?.includes(tag?.tag?.name) && (
          <i
            className="fa fa-times"
            style={{ cursor: "pointer" }}
            onClick={() => handleDelete(tag?.tag?.id)}
          />
        )}
      </span>
    ) : (
      <span key={tag.id}>{tag.tag.name} </span>
    );
  };

  return (
    <React.Fragment>
      <ReactTags
        tags={tags}
        suggestions={suggestions}
        onDelete={handleDelete}
        onAddition={handleAddition}
        allowNew
        tagComponent={renderTag}
        placeholder="add formula"
        ariaLabelText={inputValue}
        autoresize={false}
        handleInputChange={handleInputChange}
      />
    </React.Fragment>
  );
};

export default FormulaInput;
