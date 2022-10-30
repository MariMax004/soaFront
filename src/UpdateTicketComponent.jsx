import React, {Component} from 'react';
import {Link} from "react-router-dom";
import TicketService from "./TicketService";



class UpdateTicketComponent extends Component {
    constructor(props) {
        super(props)

        let {id} = props.params;
        this.state = {
            id: id,
            name: '',
            creationDate: '',
            price: '',
            type: '',
            venues: [],
            venueId: '',
            eventse: [],
            eventId: ''

        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeCreationDateHandler = this.changeCreationDateHandler.bind(this);
        this.changePriceHandler = this.changePriceHandler.bind(this);
        this.updateTicket = this.updateTicket.bind(this);
        this.changeSelect = this.changeSelect.bind(this);
        this.changeVenueSelect = this.changeVenueSelect.bind(this);
        this.changeEventSelect = this.changeEventSelect.bind(this);

    }

    componentDidMount() {
        TicketService.getVenue().then((res) => {
            this.setState({venues: res.data});
        });
        TicketService.getEvent().then((res) => {
            this.setState({eventse: res.data});
        });

        TicketService.getTicketById(this.state.id).then((res) => {
            let ticket = res.data;
            console.log("tic_venue", ticket.venue.id);
            console.log("tic_event", ticket.event.id);
            this.setState({
                name: ticket.name,
                creationDate: ticket.creationDate,
                price: ticket.price,
                type: ticket.type,
                venue: {
                    id: ticket.venue.id
                },
                event: {
                    id: ticket.event.id
                },
                venueId: ticket.venue.id,
                eventId: ticket.event.id
            });
        });
    }

    changeSelect = (event) => {
        this.setState({type: event.target.value});
    }
    changeVenueSelect(event) {
        console.log("venue", this.state.venueId);
        this.setState({venueId: event.target.value});
    }
    changeEventSelect =  (event) =>{
        console.log("event", this.state.eventId);
        this.setState({eventId: event.target.value});
    }

    updateTicket() {
        console.log("venue", this.state.venueId);
        console.log("event", this.state.eventId);
        let ticket = {
            id: this.state.id,
            name: this.state.name,
            creationDate: this.state.creationDate,
            price: this.state.price,
            type: this.state.type,
            venue:  {
                id: this.state.venueId
            },
            event:  {
                id: this.state.eventId
            }
        };
        console.log('ticket =>' + JSON.stringify(ticket));
        TicketService.updateTicket(ticket).then(res => {
            window.location.reload();
        });

    }

    changeNameHandler = (event) => {
        this.setState({name: event.target.value});
    }
    changeCreationDateHandler = (event) => {
        this.setState({creationDate: event.target.value});
    }
    changePriceHandler = (event) => {
        this.setState({price: event.target.value});
    }


    cancel() {
        this.props.history.push('/tickets');
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Update ticket</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>Ticket name</label>
                                        <input placeholder="name" name="name" className="form-control"
                                               value={this.state.name} onChange={this.changeNameHandler}/>
                                        <label>Ticket creation date</label>
                                        <input placeholder="creationDate" name="creationDate"
                                               className="form-control"
                                               value={this.state.creationDate}
                                               onChange={this.changeCreationDateHandler}/>
                                        <label>Ticket price</label>
                                        <input placeholder="price" name="price" className="form-control"
                                               value={this.state.price} onChange={this.changePriceHandler}/>
                                        <label>Ticket type</label>
                                        <div>
                                            <select value={this.state.type} onChange={this.changeSelect}>
                                                <option>VIP</option>
                                                <option>USUAL</option>
                                                <option>BUDGETARY</option>
                                                <option>CHEAP</option>
                                            </select>
                                        </div>
                                        <div>
                                            <select value={this.state.venueId}
                                                    onChange={this.changeVenueSelect}>{
                                                this.state.venues.map((ven )=>
                                                    <option key={ven.id}>{ven.id} </option>
                                                )
                                            } </select>
                                        </div>
                                        <div>
                                            <select value={this.state.eventId}
                                                    onChange={this.changeEventSelect}>{
                                                this.state.eventse.map((ev )=>
                                                    <option key={ev.id}>{ev.id} </option>
                                                )
                                            } </select>
                                        </div>

                                    </div>
                                    <Link to="/tickets">
                                        <button className="btn btn-success"
                                                onClick={this.updateTicket.bind(this)}>Update
                                        </button>
                                    </Link>
                                    <Link to="/tickets">
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)}
                                                style={{marginLeft: "10px"}}
                                        >Cancel
                                        </button>
                                    </Link>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        )

    }
}

export default (UpdateTicketComponent);

