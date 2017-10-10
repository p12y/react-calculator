import React, { Component } from 'react';
import './App.css';
import CalculatorDisplay from './components/calculator_display';
import CalculatorButton from './components/calculator_button';
import ClickNHold from 'react-click-n-hold';

function formatNumber(num) {
  let operands = num.toString().split(/(\+|\x|\-|\÷)/);

  let result = operands.map(operand => {
    let parts = operand.split(".");
    parts[0] = parts[0].replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  });

  return result.join('');
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {result: null, calculation: "", currentNum: "", operator: "", charCount: 0};
    this.handleInputClick = this.handleInputClick.bind(this);
    this.handleControlClick = this.handleControlClick.bind(this);
    this.clearScreen = this.clearScreen.bind(this);
  }

  handleInputClick(number) {
    let stringNum = number.toString();
    let result = "";
    let str = this.state.calculation.concat(stringNum);
    let numStreak = this.state.numStreak;
    let calculation;
    let currentNum = formatNumber(this.state.currentNum.concat(stringNum));

    calculation = str.replace(/×/g, '*').replace(/÷/g, '/').replace(/,/g, "").replace(/[.]$/, "").replace(/[/+*-]$/, "");
    
    if (this.state.operator) {
      result = parseFloat(eval(calculation).toFixed(6)).toLocaleString();
    }
    
    str = formatNumber(str);
    str = str.slice(0, str.length - currentNum.length).concat(formatNumber(currentNum));


    this.setState(
                  {
                    calculation: str,
                    currentNum: currentNum,
                    result: result,
                    prevButtonType: 'number',
                    charCount: str.length
                  }
                  );
  }

  handleControlClick(control) {
    let result = '';
    let str, calculation;

    this.setState({numStreak: 0});

    switch(control) {
      case 'DEL': {
        str = this.state.calculation.slice(0, this.state.calculation.length - 1);
        calculation = str.replace(/×/g, '*').replace(/÷/g, '/').replace(/[/+*-]$/, "").replace(/,/g, "");

        if (calculation.length > 1) {
          str = str.replace(/,/g, '');
          str = formatNumber(str);
          result = parseFloat(calculation);
        } else {
          result = calculation;
        }
        this.setState({calculation: str, result: result, currentNum: str, charCount: str.length});
        break;
      }
      case '+': {
        str = this.state.calculation.replace(/[+÷x-]$/, "");
        calculation = this.state.calculation.length > 0 ? str.concat('+') : '';
        this.setState({calculation: calculation, operator: true, currentNum: ""});
        break;
      }
      case '=': {
        str = this.state.calculation;
        str = str.replace(/×/g, '*').replace(/÷/g, '/').replace(/,/g, "").replace(/[/+*-]$/, "").replace(/[.]$/, "");
        result = parseFloat(eval(str).toFixed(6)).toLocaleString();
        this.setState({calculation: result, result: "", operator: false, currentNum: "", charCount: result.length });
        break;
      }
      case '−': {
        str = this.state.calculation.replace(/[+÷x-]$/, "");
        this.setState({calculation: str.concat('-'), operator: true, currentNum: ""});
        break;
      }
      case '×': {
        str = this.state.calculation.replace(/[+÷x-]$/, "");
        calculation = this.state.calculation.length > 0 ? str.concat('×') : '';
        this.setState({calculation: calculation, operator: true, currentNum: ""});
        break;
      }
      case '÷': {
        str = this.state.calculation.replace(/[+÷x-]$/, "");
        calculation = this.state.calculation.length > 0 ? str.concat('÷') : '';
        this.setState({calculation: calculation, operator: true, currentNum: ""});
        break;
      }
    }
  }

  clearScreen() {
    this.setState({calculation: "", result: null, currentNum: "", operator: false});
  }

  render() {
    return (
        <div className="App">
        <div className="Calculator">
            <div className="calculator-display">
              <CalculatorDisplay result={this.state.result} calculation={this.state.calculation} charCount={this.state.charCount} />
            </div>
            <div className="calculator-inputs">
              <div className="column">
                <ClickNHold
                  time={0.5}
                  onClickNHold={this.clearScreen}
                >
                  <CalculatorButton 
                    value="DEL" 
                    className="calculator-control" 
                    onClick={this.handleControlClick}
                  />
                </ClickNHold>
                <CalculatorButton 
                  value="&divide;" 
                  className="calculator-control" 
                  onClick={this.handleControlClick}
                />
                <CalculatorButton 
                  value="&times;" 
                  className="calculator-control" 
                  onClick={this.handleControlClick}
                />
                <CalculatorButton 
                  value="&minus;" 
                  className="calculator-control" 
                  onClick={this.handleControlClick}
                />
                <CalculatorButton 
                  value="+" 
                  className="calculator-control bottom-right" 
                  onClick={this.handleControlClick}
                />
              </div>
              <div className="row">
                <CalculatorButton onClick={this.handleInputClick} value={7} />
                <CalculatorButton onClick={this.handleInputClick} value={8} />
                <CalculatorButton onClick={this.handleInputClick} value={9} />
              </div>
              <div className="row">
                <CalculatorButton onClick={this.handleInputClick} value={4} />
                <CalculatorButton onClick={this.handleInputClick} value={5} />
                <CalculatorButton onClick={this.handleInputClick} value={6} />
              </div>
              <div className="row">
                <CalculatorButton onClick={this.handleInputClick} value={1} />
                <CalculatorButton onClick={this.handleInputClick} value={2} />
                <CalculatorButton onClick={this.handleInputClick} value={3} />
              </div>
              <div className="row">
                <CalculatorButton onClick={this.handleInputClick} value='.' className="bottom-left" />
                <CalculatorButton onClick={this.handleInputClick} value={0} />
                <CalculatorButton value="=" onClick={this.handleControlClick} />
              </div>
            </div>
        </div>
      </div>
    );
  }
}

export default App;
