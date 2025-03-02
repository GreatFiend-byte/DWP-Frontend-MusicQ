import React from 'react';
import { Input as AntdInput } from 'antd';


const Input = (props) => {
  return (
    <AntdInput 
      style={{ 
        borderRadius: '4px', 
        ...props.style 
      }} 
      {...props} 
    />
  );
};

export default Input;
