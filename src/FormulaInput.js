import React, { useState } from "react";
import ReactTags from "react-tag-autocomplete";
import "./styles.css";

const mainSuggestions=[
  { id: 1, name: "payment processing fees" },
  {id:2, name:'payment fees'},
  { id: 3, name: "payroll bonus " },
  { id: 4, name: "dental" },
  { id: 5, name: "vision" },
  { id: 6, name: "spain" },
  { id: 14, name: "sum", type:'special' },
  { id: 11, name: "sub", type:'special' },
  { id: 12, name: "mul", type:'special' },
  { id: 13, name: "Div", type:'special' }

]


const FormulaInput = () => {
  const [tags, setTags] = useState([{ id: 1, name: "English" }]);
  const allSuggestions=[...mainSuggestions]
  const [suggestions, setSuggestions] = useState( [
    ...allSuggestions
  ])
  const [inputValue, setInputValue] = useState("");

  const handleDelete=(id)=> {
    const index=tags?.findIndex((tag)=>+tag?.id==+id)
    console.log('id', index)
    if(index >= 0 ){
      tags.splice(index, 1);
 
      setTags([...tags ]);
    }else{
      const tags1 = tags.slice(0);
      tags1.splice(index, 1);
      setTags([...tags1]);
  }
  }
  const handleAddition = (tag) => {
    const tags1 = [].concat(tags, tag);
    setTags([...tags1]);
 
    if(tag?.type=="special"){
      const abc = [...tags1, {name:'('},{name:')'}];
      setTags([...abc]);
    }     
  };

  const handleInputChange = (input) => {
   
  
    if (input.length > 0) {
      const lastChar = input.charAt(input.length - 1);
      const filteredSuggestions = allSuggestions.filter((suggestion) =>
      suggestion.name.startsWith(lastChar)
      );
     if(filteredSuggestions?.length > 0 ) {
      setInputValue(lastChar);
     }else{

       setInputValue(input)
     }
      setSuggestions(filteredSuggestions);
    } else {
      setInputValue(input)
      setSuggestions(allSuggestions);
    }
  };
  const renderTag = (tag) => {

    const isTagRemovable = tag?.tag?.id;

    return  isTagRemovable ? 
        <span key={tag.id} className="data-tag">
        {tag.tag.name}{" "}
        {tag?.tag?.type!=="special" &&  <i
            className="fa fa-times"
            style={{ cursor: "pointer" }}
            onClick={() => handleDelete(tag?.tag?.id)}
          />}

      </span>
      :
      <span key={tag.id}>
      {tag.tag.name}{" "}
    
    </span>
    
    
  };
  const renderTagNew = (tag) => {
    console.log('tag3333', tag)
    const isTagRemovable = tag?.tag?.id;

    return  isTagRemovable ? 
        <span key={tag.id} className="data-tag">
        {tag.tag.name}{" "}
        {tag?.tag?.type!=="special" &&  <i
            className="fa fa-times"
            style={{ cursor: "pointer" }}
            onClick={() => handleDelete(tags.findIndex((t) => t.id === tag.id))}
          />}

      </span>
      :
      <span key={tag.id}>
      {tag.tag.name}{" "}
    
    </span>
    
    
  };
console.log('inputValue', inputValue)
  return (
    <React.Fragment>
      <ReactTags
          tags={tags}
          suggestions={suggestions}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          allowNew
          tagComponent={renderTag}
          placeholder="add formula"
          ariaLabelText={inputValue}
          minQueryLength={1}
          trigger="@"
          autoresize={false}
          // inputValue={inputValue}
          handleInputChange={handleInputChange}
        />
    

     
     
    </React.Fragment>
  );
};

export default FormulaInput;
