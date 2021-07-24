import React, { useState } from 'react';

import '../style.css';

function Calculator() {
  /* eslint no-eval: 0 */

  const [input, setInput] = useState('');
  const [output, setOutput] = useState('0');
  const buttons = [
    { id: 'nine', value: 9 },
    { id: 'eight', value: 8 },
    { id: 'seven', value: 7 },
    { id: 'six', value: 6 },
    { id: 'five', value: 5 },
    { id: 'four', value: 4 },
    { id: 'three', value: 3 },
    { id: 'two', value: 2 },
    { id: 'one', value: 1 },
    { id: 'zero', value: 0 },
    { id: 'decimal', value: '.' },
    { id: 'percent', value: '%' },
  ];
  const calcBtns = buttons.map((item) => (
    <button
      onClick={(e) => {
        if (output.includes('.') && e.target.value === '.') {
          return;
        }
        setInput(input + e.target.value);

        if (output === '0' || output === '+' || output === '-' || output === '*' || output === '/' || output === '%') {
          setOutput(e.target.value);
        } else if (output.includes('.') && e.target.value === '.') {
          return;
        } else {
          setOutput(output + e.target.value);
        }
      }}
      value={item.value}
      key={item.value}
      id={item.id}
    >
      {' '}
      {item.value}
    </button>
  ));

  // eslint-disable-next-line
  const endsWithOperator = /[\*+-/]$/;
  const nondigits = /\D+/;
  const zeros = /(\.\d*?[1-9])0+$/g;

  const operatorClick = (e) => {
    if (endsWithOperator.test(input)) {
      setInput(input.replace(nondigits, '') + e.target.value);
      setOutput(e.target.value);
    } else {
      setInput(input + e.target.value);
      setOutput(e.target.value);
    }
  };

  const equalClick = () => {
    try {
      setOutput(String(eval(input)).length > 3 && String(eval(input)).includes('.') ? String(eval(input.replace(zeros, '$1'))) : String(eval(input)));
      setInput(String(eval(input)).length > 3 && String(eval(input)).includes('.') ? String(eval(input.replace(zeros, '$1'))) : String(eval(input)));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className='wrapper'>
      {' '}
      <div className='show-input'>{input}</div>
      <div className='show-output' id='display'>
        {output}
      </div>
      <div className='digits flex'>{calcBtns}</div>
      <div className='modifiers subgrid'>
        {/* clear button */}

        <button onClick={() => setInput(input.substr(0, input.length - 1))}>Clear</button>

        {/* clear all */}
        <button
          id='clear'
          onClick={() => {
            setInput('');
            setOutput('0');
          }}
          value=''
        >
          AC
        </button>
      </div>
      <div className='operations subgrid'>
        {/* add button */}
        <button id='add' onClick={operatorClick} value='+'>
          +
        </button>

        {/* minus btn */}
        <button
          id='subtract'
          onClick={(e) => {
            setInput(input + e.target.value);
            setOutput(e.target.value);
          }}
          value='-'
        >
          {' '}
          -{' '}
        </button>

        <button id='multiply' onClick={operatorClick} value='*'>
          {' '}
          *
        </button>

        <button id='divide' onClick={operatorClick} value='/'>
          {' '}
          /
        </button>
        {/* "=" btn */}
        <button id='equals' onClick={equalClick} value='='>
          =
        </button>
      </div>
    </div>
  );
}

export default Calculator;
