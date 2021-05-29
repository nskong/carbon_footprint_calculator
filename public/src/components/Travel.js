import { Button } from 'antd';
import { useHistory } from 'react-router';

/**
 * Travel category of emissions. Step 2 of the applications and allows a user to pick a
 * emissions category within the travel subsection
 */
export default function Travel() {
    const history = useHistory();

    const navigateToBus = () => {
        history.push('/Bus')
    }

    const navigateToFlying = () => {
        history.push('/Flying')
    }

    const navigateToRail = () => {
        history.push('/Rail')
    }

    const navigateToVehicle = () => {
        history.push('/Vehicle')
    }

    return (
        <div className="Travel">
            <div className="Title-text">2. Choose a Travel Category</div>

            <Button size="large" type="primary" onClick={navigateToBus}>Bus</Button>
            <Button size="large" type="primary" onClick={navigateToFlying}>Flying</Button>
            <Button size="large" type="primary" onClick={navigateToRail}>Rail</Button>
            <Button size="large" type="primary" onClick={navigateToVehicle}>Taxi</Button>
            <Button size="large" type="primary" onClick={navigateToVehicle}>Vehicle</Button>
        </div>
    );
}