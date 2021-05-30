import { InputNumber, Button } from 'antd';
import { useState } from 'react';
import { useHistory } from 'react-router';

/**
 * Calculations page for fuel, prompts user for usage and allows a user to choose between
 * natural gas, heating oil, and lpg
 */
export default function Fuel() {
    const history = useHistory();
    const [emissions, setEmissions] = useState(null);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const [type, setType] = useState("naturalGas");

    const navigateToHome = () => {
        history.push('/')
    }

    // Displays an error message. Times out the error message after 10 seconds
    const displayErrorMessage = () => {
        setShowErrorMessage(true);
        setTimeout( function() { 
            setShowErrorMessage(false);
        }, 10000);
    }

    // Calculates the emissions given input. Shows an error message if response
    // code is 400
    const calculateEmissions = (value) => {
        let unit = value.target.value;
        fetch("/fuel/emissions?type=" + type + "&unit=" + unit, {
            method: 'GET'
        }).then((response) => {
            if (response.status == 400) { 
                displayErrorMessage();
            } else {
                return response.json();
            }
        }).then((data) => {
            setEmissions(data);
        })
    }

    return (
        <div className="Fuel">
            <div className="Title-text">3. Calculate Your Carbon Emissions</div>

            {
                showErrorMessage && 
                <p className="Error-message">Please input a valid number</p>
            }

            {/* Natural gas as selected fuel type */}
            {
                (type === "naturalGas") &&
                <div>
                    <Button size="large" type="primary">Natural Gas</Button>
                    <Button size="large" type="default" onClick={() => {setType("oil")}}>Heating Oil</Button>
                    <Button size="large" type="default" onClick={() => { setType("lpg") }}>LPG</Button>

                    <InputNumber
                        size='large'
                        placeholder='enter your usage in therm'
                        onPressEnter={calculateEmissions}>
                    </InputNumber>
                </div>
            }

            {/* Show heating oil as selected fuel type */}
            {
                (type === "oil") &&
                <div>
                    <Button size="large" type="default" onClick={() => {setType("naturalGas")}}>Natural Gas</Button>
                    <Button size="large" type="primary">Heating Oil</Button>
                    <Button size="large" type="default" onClick={() => {setType("lpg")}}>LPG</Button>

                    <InputNumber
                        size='large'
                        placeholder='enter your usage in litres'
                        onPressEnter={calculateEmissions}>
                    </InputNumber>
                </div>
            }

            {/* Show LPG as selected fuel type */}
            {
                (type === "lpg") &&
                <div>
                    <Button size="large" type="default" onClick={() => {setType("naturalGas")}}>Natural Gas</Button>
                    <Button size="large" type="default" onClick={() => {setType("oil")}}>Heating Oil</Button>
                    <Button size="large" type="primary">LPG</Button>

                    <InputNumber
                        size='large'
                        placeholder='enter your usage in litres'
                        onPressEnter={calculateEmissions}>
                    </InputNumber>
                </div>
            }

            {
                (emissions) &&
                <div>
                    <p className="Results">You emitted {emissions} kg CO2e</p>
                    <Button size="large" type="primary" onClick={navigateToHome}>Restart</Button>
                </div>
            }
        </div>
  );
}