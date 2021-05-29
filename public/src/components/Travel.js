import { Button } from 'antd';
import { useHistory } from 'react-router';

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

    const navigateToTaxi = () => {
        history.push('/Taxi')
    }

    return (
        <div className="Travel">
            <div className="Title-text">2. Choose a Travel Category</div>

            <Button size="large" type="primary" onClick={navigateToBus}>Bus</Button>
            <Button size="large" type="primary" onClick={navigateToFlying}>Flying</Button>
            <Button size="large" type="primary" onClick={navigateToRail}>Rail</Button>
            <Button size="large" type="primary" onClick={navigateToTaxi}>Taxi</Button>
            <Button size="large" type="primary" onClick={navigateToTaxi}>Vehicle</Button>
        </div>
    );
}