import { InputNumber, Button } from 'antd';
import { useState } from 'react';
import { useHistory } from 'react-router';

export default function Rail() {
    const history = useHistory();
    const [emissions, setEmissions] = useState(null);
    const [transitIsSelected, setTransitIsSelected] = useState(true);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

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

    // Calculates the emissions given the mileage. Shows an error message if response
    // code is 400. Sends different route to backend based on which type of rail is 
    // selected
    const calculateEmissions = (value) => {
        let miles = value.target.value;
        let category = "";

        if (transitIsSelected) { 
            category = "transit";
        } else { 
            category = "commuter";
        }

        fetch("/rail/" + category + "/emissions?miles=" + miles, {
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

    // Switches boolean value of type of rail
    const toggleRailType = () => {
        setTransitIsSelected(!transitIsSelected);
    }

    return (
        <div className="Rail">
            <div className="Title-text">3. Calculate Your Carbon Emissions</div>

            {
                showErrorMessage && 
                <p className="Error-message">Please input a valid number</p>
            }

            {
                transitIsSelected &&
                <div>
                    <Button size="large" type="primary">Transit Rail</Button>
                    <Button size="large" type="default" onClick={toggleRailType}>Commuter Rail</Button>
                </div>
            }

            {
                !transitIsSelected &&
                <div>
                    <Button size="large" type="default" onClick={toggleRailType}>Transit Rail</Button>
                    <Button size="large" type="primary">Commuter Rail</Button>
                </div>
            }

            <InputNumber
                id='rail-input'
                size='large'
                placeholder='enter the miles traveled here'
                onPressEnter={calculateEmissions}>
            </InputNumber>

            {
                (emissions) &&
                <div>
                    <p className="Results">You emitted {emissions} kg CO2</p>
                    <Button size="large" type="primary" onClick={navigateToHome}>Restart</Button>
                </div>
            }
        </div>
  );
}