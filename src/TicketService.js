import axios from 'axios';

const MAIN_URI = "https://localhost:10981"
const TICKET_API_BASE_URL = MAIN_URI + "/tickets"
const TICKET_API_BASE_URL_CREATE = MAIN_URI + "/ticket"
const TICKET_API_BASE_URL_VENUE = MAIN_URI + "/venue"
const TICKET_API_BASE_URL_EVENT = MAIN_URI + "/event"
const TICKET_API_BASE_URL_NAME_MAX = MAIN_URI + "/ticket/name/max"
const TICKET_API_BASE_URL_DELETE_EVENT = MAIN_URI + "/event"
const TICKET_API_BASE_URL_PERSON = MAIN_URI + "/person"


class TicketService {
    getTickets() {
        return axios.get(TICKET_API_BASE_URL);
    }

    createTicket(ticket) {
        return axios.post(TICKET_API_BASE_URL_CREATE, ticket)
    }

    getTicketById(ticketId) {
        return axios.get(TICKET_API_BASE_URL_CREATE + '/' + ticketId);

    }

    updateTicket(ticket) {
        return axios.put(TICKET_API_BASE_URL_CREATE, ticket);
    }

    deleteTicket(ticketId) {
        return axios.delete(TICKET_API_BASE_URL_CREATE + '/' + ticketId);
    }
    getVenue(){
        return axios.get(TICKET_API_BASE_URL_VENUE);
    }

    getEvent(){
        return axios.get(TICKET_API_BASE_URL_EVENT);
    }

    getPerson(){
        return axios.get(TICKET_API_BASE_URL_PERSON);
    }

    getVenueById(personId){
        return axios.get(TICKET_API_BASE_URL_PERSON + '/' + personId);
    }

    getVenueById(venueId){
        return axios.get(TICKET_API_BASE_URL_VENUE + '/' + venueId);
    }

    getEventById(eventId){
        return axios.get(TICKET_API_BASE_URL_EVENT + '/' + eventId);
    }
    getTicketWithMaxName() {
        return axios.get(TICKET_API_BASE_URL_NAME_MAX);
    }
    getTicketStartWithName(name) {
        return axios.get(TICKET_API_BASE_URL+ + '/name?name=' + name);
    }
    deleteEvent(eventId) {
        return axios.delete(TICKET_API_BASE_URL_DELETE_EVENT + '/' + eventId + '/cancel');
    }
    filterTickets(filter){
        return axios.post(TICKET_API_BASE_URL + '/filter'+filter);
    }

}


export default new TicketService()

