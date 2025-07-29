import { Alert, Button } from "react-bootstrap";
import { Clock, GeoAlt, Calendar2Check, Pencil, Trash } from 'react-bootstrap-icons'

const ItemDetails = ({item}) => {
    return(
        <Alert key={item.id} variant={item.status === 'ORDERED' ? 'success' : 'warning'}>
            <Alert.Heading>
                { item.status === 'ORDERED' | 'SCHEDULED' ? <Calendar2Check /> : <Clock/> }
                { item.status === 'ORDERED' ? ' Ordered' : item.status === 'SCHEDULED' ? ' Scheduled' : ' Lined-Up' }
            </Alert.Heading>
            <p>1 Jumbo / 4 Half</p>
            <hr />
            <div className="d-flex">
                <p>
                    <GeoAlt /> {item.prefecture}, {item.city}, {item.town} #{item.postalCode}
                </p>
                <Button size="sm" className="ms-auto" onClick={() => setShow(false)} variant="outline-success">
                    <Pencil />
                </Button>
                <Button size="sm" className="ms-1" onClick={() => setShow(false)} variant="outline-success">
                    <Trash />
                </Button>
            </div>
        </Alert>
    );
}

export default ItemDetails;