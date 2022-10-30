import React, {useEffect, useState} from "react";
import './App.css';
import axios from "axios";
import {
    MDBBtn,
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBTable,
    MDBTableBody,
    MDBTableHead,
    MDBPagination,
    MDBPaginationItem,
    MDBPaginationLink
} from "mdb-react-ui-kit";
import {Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import TicketService from "./TicketService";
import {logDOM} from "@testing-library/react";

function App() {
    const [data, setData] = useState([]);
    const [dataCard, setDataCard] = useState([]);
    const [value, setValue] = useState({filters: [], sort: {}, limit: 5, page: 1});
    const [name, setName] = useState("");
    const [x, setX] = useState("");
    const [y, setY] = useState("");
    const [price, setPrice] = useState("");
    const [type, setType] = useState("");
    const [venue, setVenue] = useState("");
    const [ticket, setTicket] = useState("");
    const url = "https://localhost:10981";
    const sortOptions = ["id", "name", "creationDate", "price"];
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showView, setShowView] = useState(false);
    const [showSale, setShowSale] = useState(false);
    const [showEvent, setShowEvent] = useState(false);
    const [priceColor, setPriceColor] = useState("red");
    const [nameColor, setNameColor] = useState("red");
    const [personColor, setPersonColor] = useState("red");
    const [xColor, setXColor] = useState("red");
    const [yColor, setYColor] = useState("red");

    const [eventOptionalList, setEventOptionalList] = useState();
    const [venueOptionalList, setVenueOptionalList] = useState();
    const [personOptionalList, setPersonOptionalList] = useState();
    const [ticketOptionalList, setTicketOptionalList] = useState();
    const [idTicket, setIdTicket] = useState();
    const [nameTicket, setNameTicket] = useState();
    const [eventTicket, setEventTicket] = useState();
    const [priceTicket, setPriceTicket] = useState();
    const [xTicket, setXTicket] = useState();
    const [yTicket, setYTicket] = useState();
    const [personTicket, setPersonTicket] = useState();
    const [personTicketNewId, setPersonTicketNewId] = useState();
    const [personTicketNewName, setPersonTicketNewName] = useState();
    const [typeTicket, setTypeTicket] = useState();
    const [venueTicket, setVenueTicket] = useState();
    const [validPrice, setValidPrice] = useState(false);
    const [validName, setValidName] = useState(false);
    const [validPerson, setValidPerson] = useState(false);
    const [validX, setValidX] = useState(false);
    const [validY, setValidY] = useState(false);
    const [tempId, setTempId] = useState(1);


    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true)
        setPriceColor("red")
        setNameColor("red")
        setPersonColor("red")
        setXColor("red")
        setYColor("red")
    };
    const handleEditShow = () => {
        setShowEdit(true)
        setPriceColor("green")
        setNameColor("green")
        setPersonColor("green")
        setXColor("green")
        setYColor("green")
    };
    const handleEditClose = () => setShowEdit(false);
    const handleViewClose = () => setShowView(false);
    const handleSaleShow = () => {
        setShowSale(true)
        setPriceColor("red")
    };
    const handleSaleClose = () => setShowSale(false);
    const handleEventShow = () => setShowEvent(true);
    const handleEventClose = () => setShowEvent(false);

    const loadTicketsData = async () => {
        return await axios.post(url + "/tickets/filter", value)
            .then((responce) => setData(responce.data.content)).catch((err) => console.log(err));
    }

    const loadListTickets = async () => {
        let ticketOptions = []
        return await axios.get(url + "/tickets")
            .then((responce) => {
                responce.data.map((t) => ticketOptions.push(<option key={t.id} value={t.id}>{t.name}</option>));
                setTicketOptionalList(ticketOptions);
                if (responce.data.length !== 0) {
                    setTicket(responce.data[0].id)
                    console.log(responce.data[0].id)
                }
            })

            .catch((err) => console.log(err));
    }


    const loadPersonList = async () => {
        let personOptions = []
        setPersonTicket(1);
        return await axios.get(url + "/person")
            .then((responce) => {
                responce.data.map((p) => personOptions.push(<option key={p.id} value={p.id}>{p.name}</option>));
                setPersonOptionalList(personOptions);
            })
            .catch((err) => console.log(err));
    }


    const loadEventList = async () => {
        let eventOptions = []
        return await axios.get(url + "/event")
            .then((responce) => {
                responce.data.map((e) =>
                    eventOptions.push(<option key={e.id} value={e.id}>{e.name}</option>)
                );
                setEventOptionalList(eventOptions)
                if (responce.data.length !== 0) {
                    console.log("setEvent")
                    setEventTicket(responce.data[0].id)
                    console.log(responce.data[0].id)
                }
            })
            .catch((err) => console.log(err));

    }


    useEffect(() => {
        loadTicketsData();
        setTypeTicket("VIP");
        setEventTicket(1);
        loadPersonList();
        loadListTickets();
        loadEventList();
        let venueOptions = []
        setVenueTicket(1)
        TicketService.getVenue().then((res) => {
            res.data.map((v) => venueOptions.push(<option key={v.id} value={v.id}>{v.name}</option>))
        })
        setVenueOptionalList(venueOptions)
    }, []);

// useEffect(() => {
//     loadTicketsData();
// }, [data])


    const getMaxName = async () => {
        return await axios.get(url + "/ticket/name/max")
            .then((responce) => {
                console.log("data", responce.data[0]);
                // setData([]);
                setData(responce.data);

            }).catch((err) => console.log(err));
    }

    const saveTicket = () => {
        if (validName === false || validPrice === false || validPerson === false || validX === false || validY === false) {
            console.log("Введите корректную сумму")
            alert("Не все поля заполнены или введены некорректные данные")
        } else {
            setShow(false);
            console.log(venueTicket)
            console.log(eventTicket)
            let venueSave = {
                id: venueTicket
            }
            let eventSave = {
                id: eventTicket
            }
            let personSave = {
                name: personTicketNewName
            }
            let coordinatesSave = {
                x: xTicket,
                y: yTicket
            }
            let ticket = {
                name: nameTicket,
                price: priceTicket,
                type: typeTicket,
                venue: venueSave,
                event: eventSave,
                person: personSave,
                coordinates: coordinatesSave
            };
            saveTicketAsync(ticket);
            setEventTicket(1);
            setVenueTicket(1);
            setPersonTicketNewName("");
            setNameTicket("");
            setPriceTicket("");
            setYTicket("");
            setXTicket("");
            setTypeTicket("VIP");
            setValidX(false);
            setValidY(false);
            setValidPerson(false);
            setValidPrice(false);
            setValidName(false);
            loadTicketsData();
            loadListTickets();
            loadPersonList();
            console.log("check")
        }
    };


    const updateTicket = () => {
        if (validName === false || validPrice === false || validPerson === false || validX === false || validY === false) {
            console.log("Введите корректную сумму")
            alert("Не все поля заполнены или введены некорректные данные")
        } else {
            setShowEdit(false);
            console.log(venueTicket);
            console.log(eventTicket);
            let venueSave = {
                id: venueTicket
            };

            let eventSave = {
                id: eventTicket
            };

            let personSave = {
                name: personTicketNewName
            };
            let coordinatesSave = {
                x: xTicket,
                y: yTicket
            }

            let ticket = {
                id: idTicket,
                name: nameTicket,
                price: priceTicket,
                type: typeTicket,
                venue: venueSave,
                event: eventSave,
                person: personSave,
                coordinates: coordinatesSave
            };
            updateTicketAsync(ticket);
            setIdTicket("");
            setEventTicket(1);
            setVenueTicket(1);
            setPersonTicketNewName("");
            setNameTicket("");
            setPriceTicket("");
            setYTicket("");
            setXTicket("");
            setTypeTicket("VIP");
            setValidX(false);
            setValidY(false);
            setValidPerson(false);
            setValidPrice(false);
            setValidName(false);
            loadTicketsData();
            loadListTickets();
            loadPersonList();
            console.log("person name", personTicketNewName)
            console.log("person price", priceTicket)
        }
    };

    const saveTicketAsync = async (ticket) => {
        return await axios.post(url + "/ticket", ticket)
            .then((responce) => {
                    loadTicketsData();
                    loadListTickets();
                    loadPersonList()
                }
            ).catch((err) => console.log(err));
    }


    const updateTicketAsync = async (ticket) => {
        return await axios.put(url + "/ticket", ticket)
            .then((responce) => {
                loadTicketsData();
                loadListTickets();
                loadPersonList()
            }).catch((err) => console.log(err));
    }

    const deleteTicketAsync = async (id) => {
        return await axios.delete(url + "/ticket/" + id)
            .then((responce) => {
                    loadTicketsData();
                    loadListTickets();
                    loadPersonList();
                }
            ).catch((err) => console.log(err));
    }

    const cancelEventAsync = async () => {
        setShowEvent(false);
        let eventId = eventTicket;
        return await axios.delete(url + "/event/" + eventId + "/cancel")
            .then((responce) => {
                loadTicketsData();
                loadListTickets();
                loadPersonList();
                loadEventList();
            }).catch((err) => console.log(err));
    }


    const getTicketStartingName = async (param) => {
        const query = new URLSearchParams();
        query.set("name", param);
        return await axios.get(url + `/tickets/name?${query}`)
            .then((responce) => {
                console.log("data", responce.data[0]);
                setData(responce.data);

            }).catch((err) => console.log(err));
    }

    const sellTicket = () => {
        if (validPrice === false) {
            console.log("Введите корректную сумму")
            alert("Введите корректную сумму")
        } else {
            let ticketId = ticket;
            let personId = personTicket;
            let price = priceTicket;
            sellTicketAsync(ticketId, personId, price);

            setTicket(1);
            setPersonTicket(1);
            setPriceTicket("");
            setValidPrice(false);
        }
    }

    const sellTicketAsync = async (ticketId, personId, price) => {
        console.log(ticketId)
        console.log(personId)
        console.log(price)
        const query = new URLSearchParams();
        query.set("price", price);
        return await axios.get(url + "/sell/" + ticketId + "/" + personId + `/price?${query}`)
            .then((responce) => {
                handleSaleClose();
                loadTicketsData()
                loadListTickets()
                loadPersonList()

            }).catch((err) => console.log(err));
    }


    const handleSearch = async (e) => {
        e.preventDefault();
        return await axios.post(url + "/tickets/filter", value)
            .then((responce) => {
                setData(responce.data.content);
            })
            .catch(err => console.log(err));
    };


    const handleReset = () => {
        setValue({filters: [], sort: {}});
        setName("");
        setPrice("");
        setType("");
        setVenue("");
        setX("");
        setY("");
        loadTicketsData();
    };

    const handleSort = async (e) => {
        e.preventDefault();
        return await axios.post(url + "/tickets/filter", value)
            .then((responce) => {
                setData(responce.data.content);
            }).catch(err => console.log(err));
    };

    const validatePrice = (price) => {
        return price >= 1;
    }
    const validateName = (name) => {
        return name.length >= 1;
    }

    const onPriceChange = async (price) => {
        let val = price;
        console.log(validatePrice(val))
        setValidPrice(validatePrice(val));
        if (validatePrice(val) === true) {
            setPriceColor("green")
        } else {
            setPriceColor("red")
        }
    }

    const onXChange = async (x) => {
        let val = x;
        console.log(validatePrice(val))
        setValidX(validatePrice(val));
        if (validatePrice(val) === true) {
            setXColor("green")
        } else {
            setXColor("red")
        }
    }

    const onYChange = async (y) => {
        let val = y;
        console.log(validatePrice(val))
        setValidY(validatePrice(val));
        if (validatePrice(val) === true) {
            setYColor("green")
        } else {
            setYColor("red")
        }
    }
    const onNameChange = async (name) => {
        let val = name;
        console.log(validateName(val))
        setValidName(validateName(val));
        if (validateName(val) === true) {
            setNameColor("green")
        } else {
            setNameColor("red")
        }
    }

    const onPersonChange = async (person) => {
        let val = person;
        console.log(validateName(val))
        setValidPerson(validateName(val));
        if (validateName(val) === true) {
            setPersonColor("green")
        } else {
            setPersonColor("red")
        }
    }

    return (
        <MDBContainer>
            <Button variant="primary" onClick={handleShow} style={{marginTop: "30px", marginLeft: "10px"}}>
                Добавить билет
            </Button>
            <Button variant="primary" onClick={getMaxName} style={{marginTop: "30px", marginLeft: "10px"}}>
                Get max name ticket
            </Button>
            <input style={{
                margin: '10px', height: '39px',
                width: 'auto'
            }} type="text"
                   className="form-control"
                   placeholder="Write name" onChange={(e) => {
                getTicketStartingName(e.target.value)
            }}/>
            <Button variant="primary" onClick={handleSaleShow} style={{marginTop: "30px", marginLeft: "10px"}}>
                Продать билет
            </Button>
            <Modal show={showSale} onHide={handleSaleClose}>
                <Modal.Header>
                    <Modal.Title>Продажа билета</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <label>Билет</label>
                    <select onChange={(e) => {
                        console.log(e.target.value)
                        setTicket(e.target.value)
                    }}>{ticketOptionalList}</select>


                    <label>Человек</label>
                    <select onChange={(e) => {
                        setPersonTicket(e.target.value)
                    }}>{personOptionalList}</select>

                    <label>Цена</label>

                    <input type="text" onChange={(e) => {
                        setPriceTicket(e.target.value)
                        onPriceChange(e.target.value)
                    }} style={{borderColor: priceColor}}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleSaleClose}>
                        Закрыть
                    </Button>

                    <Button variant="primary" onClick={sellTicket}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>

            <Button variant="primary" onClick={handleEventShow} style={{marginTop: "30px", marginLeft: "10px"}}>
                Cancel event
            </Button>
            <Modal show={showEvent} onHide={handleEventClose}>
                <Modal.Header>
                    <Modal.Title>Cancel event</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <label>Событие</label>
                    <select onChange={(e) => {
                        setEventTicket(e.target.value)
                        console.log(e.target.value)
                    }}>{eventOptionalList}</select>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleEventClose}>
                        Отмена
                    </Button>

                    <Button variant="primary" onClick={cancelEventAsync}>
                        Отменить событие
                    </Button>
                </Modal.Footer>
            </Modal>


            <Modal show={show} onHide={handleShow}>
                <Modal.Header>
                    <Modal.Title>Создание билета</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>Название билета</label>
                    <input type="text" onChange={(e) => {
                        console.log(e.target.value)
                        setNameTicket(e.target.value)
                        onNameChange(e.target.value)
                    }} style={{borderColor: nameColor}}/>

                    <label>Событие</label>
                    <select onChange={(e) => {
                        console.log(e.target.value)
                        setEventTicket(e.target.value)
                    }}>{eventOptionalList}</select>

                    <label>Цена</label>
                    <input type="text" onChange={(e) => {
                        setPriceTicket(e.target.value)
                        onPriceChange(e.target.value)
                    }} style={{borderColor: priceColor}}/>

                    <label>Тип билета</label>
                    <select onChange={(e) => {
                        setTypeTicket(e.target.value)
                    }}>
                        <option value="VIP">VIP</option>
                        <option value="USUAL">USUAL</option>
                        <option value="BUDGETARY">BUDGETARY</option>
                        <option value="CHEAP">CHEAP</option>
                    </select>

                    <label>Место проведения</label>
                    <select onChange={(e) => {
                        setVenueTicket(e.target.value)
                    }}>{venueOptionalList}</select>

                    <label>Имя покупателя</label>
                    <input type="text"
                           onChange={(e) => {
                               setPersonTicketNewName(e.target.value)
                               onPersonChange(e.target.value)
                           }} style={{borderColor: personColor}}/>
                    <label>X = </label>
                    <input type="number"
                           onChange={(e) => {
                               setXTicket(e.target.value)
                               onXChange(e.target.value)
                           }} style={{borderColor: xColor}}/>
                    <div>
                        <label>Y = </label>
                        <input type="number"
                               onChange={(e) => {
                                   setYTicket(e.target.value)
                                   onYChange(e.target.value)
                               }} style={{borderColor: yColor}}/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={saveTicket}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>
            <form style={{
                // margin: "auto",
                // padding: "15px",
                // maxWidth: "400px",
                // alignContent: "center"
            }}
                  className="d-flex input-group w-auto"
                  onSubmit={handleSearch}>
                <div style={{margin: '10px'}}>
                    <input type="text"
                           className="form-control"
                           placeholder="Search x"
                           value={x}
                           onChange={(e) => {
                               setX(e.target.value)
                               let ticketFilter = value
                               let updateName = false;
                               ticketFilter.filters.map((el) => {
                                   if (el.name === "coordinatesX") {
                                       updateName = true
                                   }
                                   return el;
                               });
                               if (updateName) {
                                   ticketFilter.filters.map((el) => {
                                       if (el.name === "coordinatesX") {
                                           el.value = e.target.value;
                                       }
                                       return el;
                                   })
                               } else {
                                   ticketFilter.filters.push({
                                       name: "coordinatesX",
                                       type: "EQUALLY",
                                       value: e.target.value
                                   })
                               }
                               let emptyIndex = ticketFilter.filters.findIndex((el) => el.value === "");
                               if (emptyIndex !== -1) {
                                   ticketFilter.filters.splice(emptyIndex, 1)
                               }
                               setValue(ticketFilter)
                           }}/>
                </div>

                <div style={{margin: '10px'}}>
                    <input type="text"
                           className="form-control"
                           placeholder="Search y"
                           value={y}
                           onChange={(e) => {
                               setY(e.target.value)
                               let ticketFilter = value
                               let updateName = false;
                               ticketFilter.filters.map((el) => {
                                   if (el.name === "coordinatesY") {
                                       updateName = true
                                   }
                                   return el;
                               });
                               if (updateName) {
                                   ticketFilter.filters.map((el) => {
                                       if (el.name === "coordinatesY") {
                                           el.value = e.target.value;
                                       }
                                       return el;
                                   })
                               } else {
                                   ticketFilter.filters.push({
                                       name: "coordinatesY",
                                       type: "EQUALLY",
                                       value: e.target.value
                                   })
                               }
                               let emptyIndex = ticketFilter.filters.findIndex((el) => el.value === "");
                               if (emptyIndex !== -1) {
                                   ticketFilter.filters.splice(emptyIndex, 1)
                               }
                               setValue(ticketFilter)
                           }}/>
                </div>

                <div style={{margin: '10px'}}>
                    <input type="text"
                           className="form-control"
                           placeholder="Search name"
                           value={name}
                           onChange={(e) => {
                               setName(e.target.value)
                               let ticketFilter = value
                               let updateName = false;
                               ticketFilter.filters.map((el) => {
                                   if (el.name === "name") {
                                       updateName = true
                                   }
                                   return el;
                               });
                               if (updateName) {
                                   ticketFilter.filters.map((el) => {
                                       if (el.name === "name") {
                                           el.value = e.target.value;
                                       }
                                       return el;
                                   })
                               } else {
                                   ticketFilter.filters.push({
                                       name: "name",
                                       type: "EQUALLY",
                                       value: e.target.value
                                   })
                               }
                               let emptyIndex = ticketFilter.filters.findIndex((el) => el.value === "");
                               if (emptyIndex !== -1) {
                                   ticketFilter.filters.splice(emptyIndex, 1)
                               }
                               setValue(ticketFilter)
                           }}/>
                </div>
                <div style={{margin: '10px'}}>
                    <input type="text"
                           className="form-control"
                           placeholder="Search price"
                           value={price}
                           onChange={(e) => {
                               setPrice(e.target.value)
                               let ticketFilter = value
                               let updateName = false;
                               ticketFilter.filters.map((el) => {
                                   if (el.name === "price") {
                                       updateName = true
                                   }
                                   return el;
                               });
                               if (updateName) {
                                   ticketFilter.filters.map((el) => {
                                       if (el.name === "price") {
                                           el.value = e.target.value;
                                       }
                                       return el;
                                   })
                               } else {
                                   ticketFilter.filters.push({
                                       name: "price",
                                       type: "EQUALLY",
                                       value: e.target.value
                                   })
                               }

                               let emptyIndex = ticketFilter.filters.findIndex((el) => el.value === "");
                               if (emptyIndex !== -1) {
                                   ticketFilter.filters.splice(emptyIndex, 1)
                               }
                               setValue(ticketFilter)
                           }}/>
                </div>
                <div style={{margin: '10px'}}>
                    <select style={{width: "100%", borderRadius: "2px", height: "35px"}} value={type}
                            onChange={(e) => {
                                setType(e.target.value)
                                let ticketFilter = value
                                let updateName = false;
                                ticketFilter.filters.map((el) => {
                                    if (el.name === "type") {
                                        updateName = true
                                    }
                                    return el;
                                });
                                if (updateName) {
                                    ticketFilter.filters.map((el) => {
                                        if (el.name === "type") {
                                            el.value = e.target.value;
                                        }
                                        return el;
                                    })
                                } else {
                                    ticketFilter.filters.push({
                                        name: "type",
                                        type: "EQUALLY",
                                        value: e.target.value
                                    })
                                }

                                let emptyIndex = ticketFilter.filters.findIndex((el) => el.value === "");
                                if (emptyIndex !== -1) {
                                    ticketFilter.filters.splice(emptyIndex, 1)
                                }
                                setValue(ticketFilter)
                            }}>

                        <option>VIP</option>
                        <option>USUAL</option>
                        <option>BUDGETARY</option>
                        <option>CHEAP</option>
                    </select>
                </div>

                <div style={{margin: '10px'}}>
                    <select style={{width: "100%", borderRadius: "2px", height: "35px"}} value={venue}
                            onChange={(e) => {
                                setVenue(e.target.value)
                                let ticketFilter = value
                                let updateName = false;
                                ticketFilter.filters.map((el) => {
                                    if (el.name === "venueId") {
                                        updateName = true
                                    }
                                    return el;
                                });
                                if (updateName) {
                                    console.log(e.target.value);
                                    ticketFilter.filters.map((el) => {
                                        if (el.name === "venueId") {
                                            el.value = e.target.value;
                                        }
                                        return el;
                                    })
                                } else {
                                    console.log(e.target.value);
                                    ticketFilter.filters.push({
                                        name: "venueId",
                                        type: "EQUALLY",
                                        value: e.target.value
                                    })
                                }

                                let emptyIndex = ticketFilter.filters.findIndex((el) => el.value === "");
                                if (emptyIndex !== -1) {
                                    ticketFilter.filters.splice(emptyIndex, 1)
                                }
                                setValue(ticketFilter)
                            }}>
                        {venueOptionalList}
                    </select>
                </div>

                <div style={{margin: '10px'}}>
                    <MDBBtn type="submit" color="dark">
                        Search
                    </MDBBtn>
                    <MDBBtn className="mx-2" color="info" onClick={(() => handleReset())}>
                        Reset
                    </MDBBtn>
                </div>
            </form>
            <form onSubmit={handleSort}>
                <h5>Sort by</h5>
                <select style={{width: "30%", borderRadius: "2px", height: "35px"}}
                        onChange={(e) => {
                            let filterSort = value;
                            console.log("e", e.target.value);
                            filterSort.sort.name = e.target.value;
                            filterSort.sort.sortType = "LESS_TO_MORE";
                            setValue(filterSort)
                        }
                        }
                >
                    {sortOptions.map((item, index) => (
                        <option value={item} key={index}>{item}</option>
                    ))}
                </select>
                <div style={{margin: '10px'}}>
                    <MDBBtn type="submit" color="dark">
                        Sort
                    </MDBBtn>

                </div>
                <div className="item">
                    <main>
                        {data.map((item, index) => (
                            <div key={index}>
                                <h2>{item.name}</h2>
                                <p>Price: {item.price}</p>
                                <p>Event: {item.event.name}</p>
                                <p>Coordinates: x = {item.coordinates.x} y = {item.coordinates.y}</p>


                                <div className="add-to-card" onClick={() => {
                                    setShowEdit(true)
                                    setIdTicket(item.id)
                                    setNameTicket(item.name)
                                    setPriceTicket(item.price)
                                    setTypeTicket(item.type)
                                    setEventTicket(item.event.id)
                                    setVenueTicket(item.venue.id)
                                    setXTicket(item.coordinates.x)
                                    setYTicket(item.coordinates.y)
                                    setPersonTicketNewName(item.person.name)
                                    setValidName(true)
                                    setValidPrice(true)
                                    setValidPerson(true)
                                    setValidX(true)
                                    setValidY(true)
                                    handleEditShow()
                                    console.log("ven", venueTicket)
                                    console.log("ev", eventTicket)
                                }}>
                                    <img src="https://img.icons8.com/ios-glyphs/30/000000/edit--v1.png"/></div>
                                <Modal show={showEdit} onHide={handleEditShow}>
                                    <Modal.Header>
                                        <Modal.Title>Редиктирование билета</Modal.Title>

                                    </Modal.Header>
                                    <Modal.Body>
                                        <label>Название билета</label>
                                        <input type="text" value={nameTicket}
                                               onChange={(e) => {
                                                   setNameTicket(e.target.value)
                                                   onNameChange(e.target.value)
                                               }} style={{borderColor: nameColor}}/>


                                        <label>Событие</label>
                                        <select value={eventTicket} onChange={(e) => {
                                            setEventTicket(e.target.value)
                                        }}>{eventOptionalList}</select>


                                        <label>Цена</label>
                                        <input type="text" value={priceTicket} onChange={(e) => {
                                            setPriceTicket(e.target.value)
                                            onPriceChange(e.target.value)
                                        }} style={{borderColor: priceColor}}/>

                                        <label>Тип билета</label>
                                        <select value={typeTicket} onChange={(e) => {
                                            setTypeTicket(e.target.value)
                                        }}>
                                            <option value="VIP">VIP</option>
                                            <option value="USUAL">USUAL</option>
                                            <option value="BUDGETARY">BUDGETARY</option>
                                            <option value="CHEAP">CHEAP</option>
                                        </select>

                                        <label>Место проведения</label>
                                        <select value={venueTicket} onChange={(e) => {
                                            setVenueTicket(e.target.value)
                                        }}>{venueOptionalList}</select>

                                        <label>Имя покупателя</label>
                                        <input type="text" value={personTicketNewName}
                                               onChange={(e) => {
                                                   setPersonTicketNewName(e.target.value)
                                                   onPersonChange(e.target.value)
                                               }} style={{borderColor: personColor}}/>
                                        <label>X = </label>
                                        <input type="number" value={xTicket}
                                               onChange={(e) => {
                                                   setXTicket(e.target.value)
                                                   onXChange(e.target.value)
                                               }} style={{borderColor: xColor}}/>
                                        <div>
                                            <label>Y = </label>
                                            <input type="number" value={yTicket}
                                                   onChange={(e) => {
                                                       setYTicket(e.target.value)
                                                       onYChange(e.target.value)
                                                   }} style={{borderColor: yColor}}/>
                                        </div>

                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleEditClose}>
                                            Закрыть
                                        </Button>
                                        <Button variant="primary" onClick={updateTicket}>
                                            Сохранить
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                                <div className="delete-card" onClick={() => {
                                    deleteTicketAsync(item.id)
                                }}>
                                    <img
                                        src="https://img.icons8.com/material-outlined/24/000000/filled-trash.png"/>
                                </div>
                                <div className="view-card" onClick={() => {
                                    setShowView(true);
                                }}>
                                    <img src="https://img.icons8.com/ios-glyphs/30/000000/details.png"/></div>
                                <Modal show={showView} onHide={handleViewClose}>
                                    <Modal.Header>
                                        <Modal.Title>Описание билета</Modal.Title>

                                    </Modal.Header>
                                    <Modal.Body>
                                        <p>Number: {item.id}</p>
                                        <p>Name: {item.name}</p>
                                        <p>Price: {item.price}</p>
                                        <p>Type: {item.type}</p>
                                        <p>Coordinates: x: {item.coordinates.x}, y: {item.coordinates.y}</p>
                                        <p>Creation Date: {item.creationDate}</p>
                                        <p>Event: name: {item.event.name}, members: {item.event.members}</p>
                                        <p>Venue: name: {item.venue.name}, capacity: {item.venue.capacity}</p>
                                        <p>Person: name: {item.person.name}</p>

                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleViewClose}>
                                            Закрыть
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>)
                        )}
                    </main>
                </div>
            </form>

            {/*<div style={{marginTop: "100px"}}>*/}
            {/*    <MDBRow>*/}
            {/*        <h2>Tickets List</h2>*/}
            {/*        <MDBCol size="12">*/}

            {/*            <MDBTable>*/}
            {/*                <MDBTableHead dark>*/}
            {/*                    <tr>*/}
            {/*                        <th>Ticket number</th>*/}
            {/*                        <th>Name</th>*/}
            {/*                        <th>Creation date</th>*/}
            {/*                        <th>Price</th>*/}
            {/*                        <th>Type</th>*/}
            {/*                        <th>Venue</th>*/}
            {/*                        <th>Event</th>*/}
            {/*                        <th>Actions</th>*/}
            {/*                    </tr>*/}
            {/*                </MDBTableHead>*/}
            {/*                {data.length === 0 ? (*/}
            {/*                    <MDBTableBody className="align-center mb-0">*/}
            {/*                        <tr>*/}
            {/*                            <td colSpan={8} className="text-center mb-0"> No data found</td>*/}
            {/*                        </tr>*/}
            {/*                    </MDBTableBody>*/}
            {/*                ) : (data.map((item, index) => (*/}
            {/*                        <MDBTableBody key={index}>*/}
            {/*                            <tr>*/}
            {/*                                <th scope="row">{index + 1}</th>*/}
            {/*                                <td>{item.name}</td>*/}
            {/*                                <td>{item.creationDate}</td>*/}
            {/*                                <td>{item.price}</td>*/}
            {/*                                <td>{item.type}</td>*/}
            {/*                                <td>{item.venue.id}</td>*/}
            {/*                                <td>{item.event.id}</td>*/}
            {/*                            </tr>*/}
            {/*                        </MDBTableBody>*/}
            {/*                    ))*/}
            {/*                )}*/}
            {/*            </MDBTable>*/}
            {/*        </MDBCol>*/}
            {/*    </MDBRow>*/}
            {/*</div>*/}
            <div style={{
                margin: 'auto', height: '150px',
                width: '200px'
            }}>
                <select value={value.limit}
                        onChange={(e) => {
                            value.limit = parseInt(e.target.value)

                            setValue(value)
                            loadTicketsData()
                        }}>
                    <option>1</option>
                    <option>5</option>
                    <option>10</option>
                    <option>15</option>
                    <option>20</option>
                </select>
            </div>
        </MDBContainer>
    )
        ;
}

export default App;
