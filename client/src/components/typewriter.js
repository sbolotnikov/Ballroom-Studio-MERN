
import React from 'react';
import Item from "./typewriter-item";

function Typewriter(props) {
  var textArr=props.text.split("");
  return (
    <span>
      {textArr.map((charItem, i) => <Item charItem={charItem} key={"item-" + i} />)}
    </span>
  )
}

export default Typewriter;